/**
 * PositionScene3D · biomechanics view in REAL 3D (raw three.js).
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
import { OrbitControls, RoomEnvironment } from "three-stdlib";
import type { PictogramKey } from "./Pictogram";

const TONE = {
  rx: "#b0463f", // receiver, oxblood
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
  // RECEIVER · front, on left side, head -X, knees drawn up and forward (+Z).
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
  // PARTNER · behind (−Z) and a touch higher, nested. Top arm + leg draped
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

/** Premium matte-clay material with a soft porcelain sheen. One per figure, shared. */
function bodyMat(color: string) {
  return new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.46,
    metalness: 0,
    clearcoat: 0.3,
    clearcoatRoughness: 0.62,
    sheen: 0.5,
    sheenColor: new THREE.Color(color).offsetHSL(0, 0, 0.08),
    sheenRoughness: 0.7,
    envMapIntensity: 0.9,
  });
}

/** A limb as a rounded capsule. Caps overlap the joints, so the body reads as one continuous piece. */
function addBone(group: THREE.Object3D, a: V3, b: V3, radius: number, mat: THREE.Material) {
  const av = new THREE.Vector3(...a);
  const bv = new THREE.Vector3(...b);
  const len = av.distanceTo(bv) || 0.001;
  // capsule middle = len, caps add radius at each end -> slight overlap into the joint = smooth blend
  const geo = new THREE.CapsuleGeometry(radius, len, 6, 18);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.copy(av).add(bv).multiplyScalar(0.5);
  const dir = bv.clone().sub(av).normalize();
  if (dir.lengthSq() > 0) mesh.quaternion.setFromUnitVectors(UP, dir);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);
}

function addSphere(group: THREE.Object3D, p: V3, radius: number, mat: THREE.Material, scale?: V3) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 24, 20), mat);
  mesh.position.set(...p);
  if (scale) mesh.scale.set(...scale);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);
}

/** build a figure; returns the pelvis sub-group (for thrust animation) */
function buildFigure(parent: THREE.Object3D, spec: FigureSpec): THREE.Group {
  const mat = bodyMat(TONE[spec.tone]);
  const pelvisSet = new Set(spec.pelvis ?? []);
  const pelvisGroup = new THREE.Group();
  parent.add(pelvisGroup);

  const target = (j: string) => (pelvisSet.has(j) ? pelvisGroup : parent);
  const J = spec.joints;

  // spine (a touch heavier than the limbs)
  (spec.spineBones ?? []).forEach(([a, b]) => {
    const g = pelvisSet.has(a) && pelvisSet.has(b) ? pelvisGroup : parent;
    addBone(g, J[a], J[b], 0.06, mat);
  });
  // limb bones
  spec.bones.forEach(([a, b, r]) => {
    const g = pelvisSet.has(a) && pelvisSet.has(b) ? pelvisGroup : parent;
    addBone(g, J[a], J[b], r ?? 0.04, mat);
  });
  // joints: same-tone fills so the body reads as one sculpted piece (no clinical dots or rings)
  Object.entries(J).forEach(([name, p]) => {
    if (name === "head") return; // head drawn below
    addSphere(target(name), p, 0.05, mat);
  });
  // head · a soft faceless ovoid
  addSphere(parent, J.head, 0.108, mat, [0.92, 1.12, 0.92]);
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
    scene.background = null; // transparent canvas; the CSS radial gradient shows through

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    container.appendChild(renderer.domElement);

    // image-based lighting: soft studio reflections for a premium clay look
    const pmrem = new THREE.PMREMGenerator(renderer);
    const RoomEnv = RoomEnvironment as unknown as new () => THREE.Scene;
    const envRT = pmrem.fromScene(new RoomEnv(), 0.04);
    scene.environment = envRT.texture;
    pmrem.dispose();

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

    // env handles the soft ambient; a low hemisphere just warms it
    scene.add(new THREE.HemisphereLight(0xfff3df, 0xb89a78, 0.35));
    const key = new THREE.DirectionalLight(0xfff1dc, 2.1);
    key.position.set(2.4, 4.4, 2.8);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.bias = -0.0004;
    key.shadow.normalBias = 0.02;
    key.shadow.radius = 6;
    key.shadow.camera.left = -2; key.shadow.camera.right = 2;
    key.shadow.camera.top = 2; key.shadow.camera.bottom = -2;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xb88d7a, 0.5);
    fill.position.set(-2.2, 2, -1.6);
    scene.add(fill);
    // rim/back light to separate the figures from the cream background
    const rim = new THREE.DirectionalLight(0xfff6ea, 1.1);
    rim.position.set(-1.4, 2.6, -3.0);
    scene.add(rim);

    // invisible shadow-catcher: the figures float in the gradient with just a soft contact shadow
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 10),
      new THREE.ShadowMaterial({ opacity: 0.16 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0.04;
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
      scene.environment = null;
      envRT.dispose();
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
