/**
 * MovementDemo — clinical pose system, RAW three.js edition.
 *
 * Background: Perplexity recommended option (f) — a real Mixamo soldier
 * rig, posed not animated, with calibrated bone offsets per move and a
 * restrained loop layer for breath-driven moves. The recommended
 * implementation used @react-three/fiber.
 *
 * However: R3F's <Canvas> component does NOT render in this TanStack
 * Start + Cloudflare Workers setup. The <canvas> element mounts to the
 * DOM, the WebGL context initializes, but the render loop never starts
 * (verified by readPixels returning [0,0,0,0] indefinitely on a scene
 * with mesh primitives). Raw three.js with the same scene contents
 * renders correctly. So we use raw three.js — verbose but actually
 * working — to drive the GLB, the bones, the lights, and the camera.
 *
 * Reuses the existing /public/3d/soldier.glb.
 *
 * Adding a new move:
 *   1. Add the key to MoveKey
 *   2. Add a new branch in poseFor(moveKey) with rootPosition,
 *      rootRotation, bones, camera
 *   3. If it benefits from a loop, add a rule in tickPose
 */

import { useEffect, useRef, type CSSProperties } from "react";
import * as THREE from "three";
import { GLTFLoader, SkeletonUtils } from "three-stdlib";

export type MoveKey =
  | "curl-up"
  | "side-plank"
  | "bird-dog"
  | "breath"
  | "decomp";

type MovementDemoProps = {
  moveKey: MoveKey;
  paused?: boolean;
  className?: string;
  style?: CSSProperties;
};

const MODEL_URL = "/3d/soldier.glb";
const CREAM = "#F4EFE3";
const PAPER = "#EFE7D2";
const OXBLOOD = "#722B2B";
const FIGURE = "#6f5648"; // warm walnut editorial silhouette

const BONES = {
  hips: "mixamorigHips",
  spine: "mixamorigSpine",
  spine1: "mixamorigSpine1",
  spine2: "mixamorigSpine2",
  neck: "mixamorigNeck",
  head: "mixamorigHead",
  leftShoulder: "mixamorigLeftShoulder",
  leftArm: "mixamorigLeftArm",
  leftForeArm: "mixamorigLeftForeArm",
  leftHand: "mixamorigLeftHand",
  rightShoulder: "mixamorigRightShoulder",
  rightArm: "mixamorigRightArm",
  rightForeArm: "mixamorigRightForeArm",
  rightHand: "mixamorigRightHand",
  leftUpLeg: "mixamorigLeftUpLeg",
  leftLeg: "mixamorigLeftLeg",
  leftFoot: "mixamorigLeftFoot",
  rightUpLeg: "mixamorigRightUpLeg",
  rightLeg: "mixamorigRightLeg",
  rightFoot: "mixamorigRightFoot",
} as const;

type BoneKey = keyof typeof BONES;

type BoneRefs = {
  byKey: Partial<Record<BoneKey, THREE.Object3D>>;
  bind: Partial<Record<BoneKey, THREE.Quaternion>>;
  root: THREE.Object3D;
};

type PoseSpec = {
  rootPosition: [number, number, number];
  rootRotation: [number, number, number];
  bones: Partial<Record<BoneKey, [number, number, number]>>;
  camera: {
    position: [number, number, number];
    target: [number, number, number];
    fov: number;
  };
};

/* ---------- per-move calibrated poses ---------- */

function poseFor(moveKey: MoveKey): PoseSpec {
  if (moveKey === "curl-up") {
    return {
      rootPosition: [0, 0.22, 0],
      rootRotation: [0, 0, -Math.PI / 2],
      bones: {
        spine: [-0.02, 0, 0],
        spine1: [0.12, 0, 0],
        spine2: [0.2, 0, 0],
        neck: [0.16, 0, 0],
        head: [0.12, 0, 0],
        leftArm: [0.1, 0.1, -1.18],
        leftForeArm: [0, -0.75, 0],
        rightArm: [0.08, -0.08, 1.18],
        rightForeArm: [0, 0.75, 0],
        rightUpLeg: [-1.18, 0, 0],
        rightLeg: [1.52, 0, 0],
        rightFoot: [-0.24, 0, 0],
        leftUpLeg: [0.08, 0, 0],
        leftLeg: [0.02, 0, 0],
      },
      camera: { position: [2.45, 1.15, 1.85], target: [0, 0.34, 0], fov: 33 },
    };
  }
  if (moveKey === "side-plank") {
    return {
      rootPosition: [0, 0.34, 0],
      rootRotation: [0, 0, -Math.PI / 2],
      bones: {
        spine: [0.02, 0, 0],
        spine1: [0.03, 0, 0],
        spine2: [0.02, 0, 0],
        neck: [0.02, 0, 0],
        head: [0.02, 0, 0],
        rightShoulder: [0, 0, 0.18],
        rightArm: [0, 0, -1.32],
        rightForeArm: [0, 0.08, -0.22],
        leftArm: [0, 0, 0.9],
        leftForeArm: [0, -0.25, 0],
        rightUpLeg: [-0.92, 0, 0],
        rightLeg: [1.15, 0, 0],
        leftUpLeg: [-0.9, 0, 0.08],
        leftLeg: [1.08, 0, 0],
        leftFoot: [0.1, 0, 0],
        rightFoot: [0.08, 0, 0],
      },
      camera: { position: [2.35, 0.92, 1.48], target: [0, 0.46, 0], fov: 34 },
    };
  }
  if (moveKey === "bird-dog") {
    return {
      rootPosition: [0, 0.02, 0.04],
      rootRotation: [0, 0, 0],
      bones: {
        spine: [1.42, 0, 0],
        spine1: [-0.06, 0, 0],
        spine2: [-0.02, 0, 0],
        neck: [0.04, 0, 0],
        head: [0.02, 0, 0],
        leftArm: [-1.45, 0, 0],
        leftForeArm: [0.08, 0, 0],
        rightArm: [-1.45, 0, 0],
        rightForeArm: [0.08, 0, 0],
        leftUpLeg: [1.68, 0, 0],
        leftLeg: [-1.4, 0, 0],
        leftFoot: [0.22, 0, 0],
        rightUpLeg: [1.68, 0, 0],
        rightLeg: [-1.4, 0, 0],
        rightFoot: [0.22, 0, 0],
      },
      camera: { position: [2.22, 1.04, 1.62], target: [0, 0.62, 0], fov: 34 },
    };
  }
  if (moveKey === "decomp") {
    return {
      rootPosition: [0, 0.2, 0],
      rootRotation: [0, 0, -Math.PI / 2],
      bones: {
        neck: [0.03, 0, 0],
        head: [0.02, 0, 0],
        leftArm: [0.06, 0.02, -0.26],
        leftForeArm: [0.06, -0.12, 0],
        rightArm: [0.06, -0.02, 0.26],
        rightForeArm: [0.06, 0.12, 0],
        leftUpLeg: [-1.08, 0, 0],
        leftLeg: [1.36, 0, 0],
        rightUpLeg: [-1.08, 0, 0],
        rightLeg: [1.36, 0, 0],
      },
      camera: { position: [2.4, 1.08, 1.8], target: [0, 0.32, 0], fov: 33 },
    };
  }
  // breath
  return {
    rootPosition: [0, 0.2, 0],
    rootRotation: [0, 0, -Math.PI / 2],
    bones: {
      spine1: [0.02, 0, 0],
      spine2: [0.02, 0, 0],
      neck: [0.04, 0, 0],
      head: [0.02, 0, 0],
      leftArm: [0.12, 0.1, -0.92],
      leftForeArm: [0.1, -0.62, 0],
      rightArm: [0.12, -0.08, 0.86],
      rightForeArm: [0.08, 0.58, 0],
      leftUpLeg: [-1.02, 0, 0],
      leftLeg: [1.28, 0, 0],
      rightUpLeg: [-1.02, 0, 0],
      rightLeg: [1.28, 0, 0],
    },
    camera: { position: [2.38, 1.08, 1.82], target: [0, 0.34, 0], fov: 33 },
  };
}

/* ---------- per-frame application ---------- */

const TMP_EULER = new THREE.Euler();
const TMP_QUAT = new THREE.Quaternion();

function setBoneEuler(
  bone: THREE.Object3D,
  bind: THREE.Quaternion,
  euler: [number, number, number],
) {
  TMP_EULER.set(euler[0], euler[1], euler[2], "XYZ");
  TMP_QUAT.setFromEuler(TMP_EULER);
  bone.quaternion.copy(bind).multiply(TMP_QUAT);
}

function applyPose(refs: BoneRefs, moveKey: MoveKey, t: number) {
  const pose = poseFor(moveKey);

  refs.root.position.set(...pose.rootPosition);
  refs.root.rotation.set(...pose.rootRotation);

  const bones: Partial<Record<BoneKey, [number, number, number]>> = {
    ...pose.bones,
  };

  // bird-dog: alternating contralateral extension
  if (moveKey === "bird-dog") {
    const phase = Math.sin(t * (Math.PI / 8));
    const rightReach = phase >= 0;
    if (rightReach) {
      bones.rightArm = [-2.72, 0.02, 0];
      bones.rightForeArm = [0.05, 0, 0];
      bones.leftUpLeg = [2.24, 0, 0];
      bones.leftLeg = [-1.02, 0, 0];
      bones.leftFoot = [0.12, 0, 0];
      bones.leftArm = [-1.38, 0, 0];
      bones.rightUpLeg = [1.62, 0, 0];
      bones.rightLeg = [-1.36, 0, 0];
    } else {
      bones.leftArm = [-2.72, 0.02, 0];
      bones.leftForeArm = [0.05, 0, 0];
      bones.rightUpLeg = [2.24, 0, 0];
      bones.rightLeg = [-1.02, 0, 0];
      bones.rightFoot = [0.12, 0, 0];
      bones.rightArm = [-1.38, 0, 0];
      bones.leftUpLeg = [1.62, 0, 0];
      bones.leftLeg = [-1.36, 0, 0];
    }
  }

  // breath / decomp: subtle thoracic lift cycle
  if (moveKey === "breath" || moveKey === "decomp") {
    const cycle = (Math.sin((t / 6) * Math.PI * 2 - Math.PI / 2) + 1) / 2;
    const chestLift = 0.035 * cycle;
    bones.spine1 = [(bones.spine1?.[0] ?? 0) + chestLift, 0, 0];
    bones.spine2 = [(bones.spine2?.[0] ?? 0) + chestLift * 0.8, 0, 0];
    refs.root.position.set(
      pose.rootPosition[0],
      pose.rootPosition[1] + cycle * 0.01,
      pose.rootPosition[2],
    );
  }

  (Object.keys(BONES) as BoneKey[]).forEach((key) => {
    const bone = refs.byKey[key];
    const bind = refs.bind[key];
    const euler = bones[key];
    if (!bone || !bind || !euler) return;
    setBoneEuler(bone, bind, euler);
  });
}

/* ---------- bone discovery on a loaded GLB ---------- */

function findBone(root: THREE.Object3D, target: string): THREE.Object3D | null {
  let found: THREE.Object3D | null = null;
  const want = target.replace(/^mixamorig:?/i, "");
  root.traverse((o) => {
    if (found) return;
    const name = o.name.replace(/^mixamorig:?/i, "");
    if (name === want) found = o;
  });
  return found;
}

function captureBones(scene: THREE.Object3D, rootGroup: THREE.Object3D): BoneRefs {
  const byKey: Partial<Record<BoneKey, THREE.Object3D>> = {};
  const bind: Partial<Record<BoneKey, THREE.Quaternion>> = {};
  (Object.entries(BONES) as [BoneKey, string][]).forEach(([key, name]) => {
    const b = findBone(scene, name);
    if (b) {
      byKey[key] = b;
      bind[key] = b.quaternion.clone();
    }
  });
  return { byKey, bind, root: rootGroup };
}

/* ---------- module-level model cache ---------- */

let cachedGLB: Promise<THREE.Object3D> | null = null;
function loadModel(): Promise<THREE.Object3D> {
  if (cachedGLB) return cachedGLB;
  cachedGLB = new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      MODEL_URL,
      (gltf) => resolve(gltf.scene),
      undefined,
      (err) => reject(err),
    );
  });
  return cachedGLB;
}

/* ---------- React component ---------- */

export function MovementDemo({
  moveKey,
  paused = false,
  className,
  style,
}: MovementDemoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Hold the latest props in refs so the long-lived render loop sees them
  // without restart on every prop change.
  const moveKeyRef = useRef(moveKey);
  const pausedRef = useRef(paused);
  useEffect(() => {
    moveKeyRef.current = moveKey;
  }, [moveKey]);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 360;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(CREAM);
    scene.fog = new THREE.Fog(CREAM, 5.5, 10);

    // Camera
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(2.4, 1.1, 1.8);
    camera.lookAt(0, 0.5, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xfff3df, 1.1));
    const key = new THREE.DirectionalLight(0xfff1dc, 1.5);
    key.position.set(2.8, 4.8, 2.6);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.bias = -0.0003;
    key.shadow.camera.left = -3;
    key.shadow.camera.right = 3;
    key.shadow.camera.top = 3;
    key.shadow.camera.bottom = -3;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xb88d7a, 0.42);
    fill.position.set(-2.2, 2.2, -1.4);
    scene.add(fill);

    // Paper floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 6),
      new THREE.MeshStandardMaterial({ color: PAPER, roughness: 1, metalness: 0 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Oxblood mat ring
    const mat = new THREE.Mesh(
      new THREE.RingGeometry(0.78, 1.5, 80),
      new THREE.MeshBasicMaterial({
        color: OXBLOOD,
        transparent: true,
        opacity: 0.08,
      }),
    );
    mat.rotation.x = -Math.PI / 2;
    mat.position.y = 0.002;
    scene.add(mat);

    // Optional bolster prop for supine moves
    const bolster = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.16, 0.3),
      new THREE.MeshStandardMaterial({ color: "#d8cfbe", roughness: 1, metalness: 0 }),
    );
    bolster.position.set(0.52, 0.085, -0.22);
    bolster.rotation.z = 0.06;
    bolster.castShadow = true;
    bolster.receiveShadow = true;
    scene.add(bolster);

    const setBolsterVisible = (mk: MoveKey) => {
      bolster.visible = mk === "decomp" || mk === "curl-up" || mk === "breath";
    };
    setBolsterVisible(moveKeyRef.current);

    // Figure group + GLB load
    const figureGroup = new THREE.Group();
    figureGroup.scale.setScalar(1.02);
    scene.add(figureGroup);

    let refs: BoneRefs | null = null;
    let cancelled = false;

    loadModel()
      .then((sourceScene) => {
        if (cancelled) return;
        const clone = SkeletonUtils.clone(sourceScene);
        clone.traverse((o) => {
          const mesh = o as THREE.Mesh;
          if (mesh.isMesh || (o as THREE.SkinnedMesh).isSkinnedMesh) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.material = new THREE.MeshStandardMaterial({
              color: FIGURE,
              roughness: 0.92,
              metalness: 0.02,
            });
          }
        });
        figureGroup.add(clone);
        refs = captureBones(clone, figureGroup);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error("[MovementDemo] GLB load failed", err);
      });

    // Resize observer — keep canvas matching the container
    const ro = new ResizeObserver(() => {
      const w = container.clientWidth || 480;
      const h = container.clientHeight || 360;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    ro.observe(container);

    // Animation loop
    let t = 0;
    let last = performance.now();
    let raf = 0;
    const camTarget = new THREE.Vector3(0, 0.5, 0);
    const camPos = new THREE.Vector3();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!pausedRef.current) t += dt;

      const mk = moveKeyRef.current;
      setBolsterVisible(mk);
      const pose = poseFor(mk);

      // Lerp camera toward the per-move target
      camPos.set(...pose.camera.position);
      // Smooth approach (15%/frame at 60fps)
      camera.position.lerp(camPos, 1 - Math.pow(0.85, dt * 60));
      camera.fov = pose.camera.fov;
      camera.updateProjectionMatrix();
      camTarget.set(...pose.camera.target);
      camera.lookAt(camTarget);

      if (refs) applyPose(refs, mk, t);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      // Best-effort scene teardown
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (mat) {
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat.dispose();
        }
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
        background:
          "radial-gradient(ellipse 90% 62% at 50% 28%, #F4EFE3 0%, #EFE7D2 62%, #E6DCC7 100%)",
        borderRadius: 24,
        overflow: "hidden",
        ...style,
      }}
    />
  );
}

export default MovementDemo;
