/**
 * PositionScene3D — biomechanics view in REAL 3D (raw three.js).
 *
 * Why raw three.js: R3F's <Canvas> does not run its render loop in this
 * TanStack Start + Cloudflare setup (see MovementDemo.tsx). Raw three.js
 * works, so we mirror that lifecycle here.
 *
 * The figures are 3D STICK SKELETONS: cylinder bones + sphere joints, a
 * visible spine, a pelvis girdle, and a highlighted SI joint. Two tones
 * (oxblood receiver, amber partner). The PELVIS is the driver: the
 * partner's pelvis group thrusts along a pose-defined axis while the
 * spine stays neutral. A 3/4 camera + gentle idle orbit make the body's
 * orientation (side-lying vs prone) unmistakable; drag to spin.
 */

import { useEffect, useRef, type CSSProperties } from "react";
import * as THREE from "three";
import { OrbitControls } from "three-stdlib";
import type { PictogramKey } from "./Pictogram";

const CREAM = "#F4EFE3";
const PAPER = "#EFE7D2";
const JOINTCOL = "#2a2620";
const SICOL = "#9a2f2f";
const TONE = {
  rx: "#b5524a", // receiver, oxblood
  pt: "#cf9a3f", // partner, amber
} as const;
type ToneKey = keyof typeof TONE;

type V3 = [number, number, number];
type Bone = [string, string, number?]; // jointA, jointB, radius
type FigureSpec = {
  tone: ToneKey;
  joints: Record<string, V3>;
  bones: Bone[];
  spineBones?: Bone[]; // drawn heavier
  si?: string; // joint name to highlight as the SI joint
  pelvis?: string[]; // joints that move with the thrust (the driver)
};
type PoseSpec = {
  figures: FigureSpec[];
  thrust?: { figure: number; dir: V3; amp: number };
  camera: { position: V3; target: V3; fov: number };
};

/* ───────── the spoon, in 3D (proof). X = body length, Y = up, Z = depth ───────── */
function poseFor(_key: PictogramKey): PoseSpec {
  const spine: Bone[] = [["neck", "chest"], ["chest", "lumbar"], ["lumbar", "sacrum"]];
  const limbs: Bone[] = [
    ["neck", "head", 0.05],
    ["sacrum", "hip", 0.05],
    ["hip", "knee", 0.045],
    ["knee", "ankle", 0.038],
    ["chest", "shoulder", 0.035],
    ["shoulder", "elbow", 0.034],
    ["elbow", "wrist", 0.03],
  ];
  // RECEIVER — front, on left side, head -X, knees drawn up and forward (+Z).
  const receiver: FigureSpec = {
    tone: "rx",
    si: "sacrum",
    spineBones: spine,
    bones: limbs,
    joints: {
      head: [-0.70, 0.26, 0.04],
      neck: [-0.52, 0.27, 0.04],
      chest: [-0.26, 0.28, 0.03],
      lumbar: [0.02, 0.27, 0.02],
      sacrum: [0.20, 0.26, 0.02],
      hip: [0.28, 0.24, 0.04],
      knee: [0.10, 0.24, 0.34],
      ankle: [0.30, 0.10, 0.30],
      shoulder: [-0.48, 0.30, 0.04],
      elbow: [-0.32, 0.16, 0.22],
      wrist: [-0.06, 0.10, 0.26],
    },
  };
  // PARTNER — behind (−Z) and a touch higher, nested. Top arm + leg draped
  // forward over the receiver. The PELVIS group drives.
  const partner: FigureSpec = {
    tone: "pt",
    si: "sacrum",
    pelvis: ["sacrum", "hip", "knee", "ankle"],
    spineBones: spine,
    bones: limbs,
    joints: {
      head: [-0.56, 0.40, -0.24],
      neck: [-0.38, 0.41, -0.24],
      chest: [-0.12, 0.42, -0.25],
      lumbar: [0.16, 0.41, -0.25],
      sacrum: [0.34, 0.40, -0.25],
      hip: [0.42, 0.38, -0.22],
      knee: [0.20, 0.40, 0.18],
      ankle: [0.42, 0.24, 0.14],
      shoulder: [-0.34, 0.44, -0.23],
      elbow: [-0.08, 0.30, -0.02],
      wrist: [0.18, 0.20, 0.06],
    },
  };
  return {
    figures: [partner, receiver], // partner first (behind)
    thrust: { figure: 0, dir: [-0.14, -0.14, 0.26], amp: 1 },
    camera: { position: [1.55, 1.0, 1.75], target: [-0.02, 0.27, 0.0], fov: 34 },
  };
}

/* ───────── three.js skeleton builders ───────── */
const UP = new THREE.Vector3(0, 1, 0);
function addBone(group: THREE.Object3D, a: V3, b: V3, radius: number, color: string) {
  const av = new THREE.Vector3(...a);
  const bv = new THREE.Vector3(...b);
  const len = av.distanceTo(bv) || 0.001;
  const geo = new THREE.CylinderGeometry(radius, radius, len, 12);
  const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color, roughness: 0.78, metalness: 0 }));
  mesh.position.copy(av).add(bv).multiplyScalar(0.5);
  const dir = bv.clone().sub(av).normalize();
  if (dir.lengthSq() > 0) mesh.quaternion.setFromUnitVectors(UP, dir);
  mesh.castShadow = true;
  group.add(mesh);
}
function addSphere(group: THREE.Object3D, p: V3, radius: number, color: string) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 16, 16), new THREE.MeshStandardMaterial({ color, roughness: 0.7 }));
  mesh.position.set(...p);
  mesh.castShadow = true;
  group.add(mesh);
}

/** build a figure; returns the pelvis sub-group (for thrust animation) */
function buildFigure(parent: THREE.Object3D, spec: FigureSpec): THREE.Group {
  const color = TONE[spec.tone];
  const pelvisSet = new Set(spec.pelvis ?? []);
  const pelvisGroup = new THREE.Group();
  parent.add(pelvisGroup);

  const target = (j: string) => (pelvisSet.has(j) ? pelvisGroup : parent);
  const J = spec.joints;

  // spine (heavier)
  (spec.spineBones ?? []).forEach(([a, b]) => {
    const g = pelvisSet.has(a) && pelvisSet.has(b) ? pelvisGroup : parent;
    addBone(g, J[a], J[b], 0.055, color);
  });
  // limb bones
  spec.bones.forEach(([a, b, r]) => {
    const g = pelvisSet.has(a) && pelvisSet.has(b) ? pelvisGroup : parent;
    addBone(g, J[a], J[b], r ?? 0.04, color);
  });
  // joints (spheres at every joint)
  Object.entries(J).forEach(([name, p]) => {
    if (name === "head") return; // head drawn larger below
    const isSI = name === spec.si;
    addSphere(target(name), p, isSI ? 0.05 : 0.028, isSI ? SICOL : JOINTCOL);
    if (isSI) {
      // bright outer ring for the SI joint
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.07, 0.012, 10, 24),
        new THREE.MeshStandardMaterial({ color: SICOL, emissive: SICOL, emissiveIntensity: 0.5, roughness: 0.5 }),
      );
      ring.position.set(...p);
      target(name).add(ring);
    }
  });
  // head
  addSphere(parent, J.head, 0.1, color);
  return pelvisGroup;
}

/* ───────── component (raw three.js lifecycle, mirrors MovementDemo) ───────── */
export function PositionScene3D({
  positionKey,
  paused = false,
  className,
  style,
}: {
  positionKey: PictogramKey;
  paused?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const keyRef = useRef(positionKey);
  const pausedRef = useRef(paused);
  useEffect(() => { keyRef.current = positionKey; }, [positionKey]);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(CREAM);

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 1.2;
    controls.maxDistance = 6;
    controls.minPolarAngle = Math.PI / 8;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    let userInteracting = false;
    controls.addEventListener("start", () => { userInteracting = true; });

    scene.add(new THREE.AmbientLight(0xfff3df, 1.05));
    const key = new THREE.DirectionalLight(0xfff1dc, 1.45);
    key.position.set(2.4, 4.4, 2.8);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.bias = -0.0004;
    key.shadow.camera.left = -2; key.shadow.camera.right = 2;
    key.shadow.camera.top = 2; key.shadow.camera.bottom = -2;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xb88d7a, 0.4);
    fill.position.set(-2.2, 2, -1.6);
    scene.add(fill);

    // bed/floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 6),
      new THREE.MeshStandardMaterial({ color: PAPER, roughness: 1, metalness: 0 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // build the pose
    let pose = poseFor(keyRef.current);
    let figureRoot = new THREE.Group();
    scene.add(figureRoot);
    const pelvisGroups: (THREE.Group | null)[] = [];
    const buildPose = () => {
      scene.remove(figureRoot);
      figureRoot = new THREE.Group();
      scene.add(figureRoot);
      pelvisGroups.length = 0;
      pose = poseFor(keyRef.current);
      pose.figures.forEach((f) => pelvisGroups.push(buildFigure(figureRoot, f)));
    };
    buildPose();
    let builtKey = keyRef.current;

    // camera in spherical terms around the target, for a clean idle orbit
    const tgt = new THREE.Vector3();
    let baseAz = 0, baseEl = 0.45, baseDist = 2.4;
    const computeCam = () => {
      tgt.set(...pose.camera.target);
      const off = new THREE.Vector3(...pose.camera.position).sub(tgt);
      baseDist = off.length();
      baseEl = Math.asin(THREE.MathUtils.clamp(off.y / baseDist, -1, 1));
      baseAz = Math.atan2(off.z, off.x);
      camera.fov = pose.camera.fov;
      camera.updateProjectionMatrix();
    };
    computeCam();
    camera.position.set(...pose.camera.position);
    controls.target.copy(tgt);

    const ro = new ResizeObserver(() => {
      const w = container.clientWidth || 480, h = container.clientHeight || 320;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    ro.observe(container);

    let t = 0, last = performance.now(), raf = 0;
    const thrustVec = new THREE.Vector3();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!pausedRef.current) t += dt;

      if (keyRef.current !== builtKey) { buildPose(); computeCam(); builtKey = keyRef.current; userInteracting = false; }

      // pelvis thrust
      if (pose.thrust) {
        const pg = pelvisGroups[pose.thrust.figure];
        if (pg) {
          const s = (Math.sin(t * 4.4) * 0.5 + 0.5); // 0..1, eased by sine
          const d = pose.thrust.dir;
          const mag = 0.07 * pose.thrust.amp * s;
          thrustVec.set(d[0], d[1], d[2]).normalize().multiplyScalar(mag);
          pg.position.copy(thrustVec);
        }
      }

      // gentle idle orbit around the target so the 3D reads, until grabbed
      if (!userInteracting) {
        const az = baseAz + t * 0.2; // slow continuous turn
        const ce = Math.cos(baseEl) * baseDist;
        camera.position.set(tgt.x + ce * Math.cos(az), tgt.y + Math.sin(baseEl) * baseDist, tgt.z + ce * Math.sin(az));
        camera.lookAt(tgt);
        controls.target.copy(tgt);
      }
      controls.update();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (mat) Array.isArray(mat) ? mat.forEach((x) => x.dispose()) : mat.dispose();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        minHeight: 280,
        background: "radial-gradient(ellipse 90% 62% at 50% 30%, #F4EFE3 0%, #EFE7D2 64%, #E6DCC7 100%)",
        borderRadius: 16,
        overflow: "hidden",
        ...style,
      }}
    />
  );
}

export default PositionScene3D;
