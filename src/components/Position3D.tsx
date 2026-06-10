/**
 * Position3D · sex position visualization. Two figures, raw three.js.
 *
 * Same architecture as MovementDemo (raw three.js because R3F's Canvas
 * doesn't render in this TanStack Start setup). Loads the soldier rig
 * twice, one clone per subject, applies per-position calibrated bone
 * poses to each.
 *
 * First position: spoon (lateral, both partners on right sides, back
 * partner curling around the front partner).
 *
 * Adding more positions:
 *   1. Add the key to PositionKey
 *   2. Add a branch in subjectPoseFor(positionKey, 'a' | 'b')
 *   3. Add a per-position camera in cameraFor(positionKey)
 *
 * Design rules per Perplexity Prompt B:
 *   - Clear enough to be educational
 *   - Tasteful enough to be safe for work
 *   - Dignified enough to read as adult health content
 *   - Brand-aware: cream paper, oxblood, magazine-editorial register
 *
 * (Different file from PositionDemo.tsx · that one is sprite-based and
 * powers the /positions library route. This one is the 3D version for
 * hero placements where the rendered figure is part of the pitch.)
 */

import { useEffect, useRef, type CSSProperties } from "react";
import * as THREE from "three";
import { GLTFLoader, OrbitControls, SkeletonUtils } from "three-stdlib";

export type PositionKey =
  | "spoon"             // lateral nesting
  | "supine-knees-up"   // modified missionary, receiver supine, knees over bolster
  | "side-T"            // receiver side-lying, partner kneeling perpendicular
  | "edge-bed"          // receiver supine at bed edge, partner kneeling on floor
  | "cowgirl-upright"   // receiver on top, upright, partner supine
  | "doggy-supported"   // quadruped chest-down, partner kneeling behind
  | "scissor"           // side-lying scissor, both partners perpendicular
  | "supine-bolster";   // supine, hips elevated on a bolster, receiver only

type Position3DProps = {
  positionKey: PositionKey;
  className?: string;
  style?: CSSProperties;
};

const MODEL_URL = "/3d/soldier.glb";
const CREAM = "#F4EFE3";
const PAPER = "#EFE7D2";
const OXBLOOD = "#722B2B";
const FIGURE_A = "#2a2620"; // deep ink · back partner
const FIGURE_B = "#722B2B"; // oxblood · front partner (brand accent)

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

type SubjectPose = {
  rootPosition: [number, number, number];
  rootRotation: [number, number, number];
  bones: Partial<Record<BoneKey, [number, number, number]>>;
};

type CameraSpec = {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
};

/* ---------- pose data per position, per subject ---------- */

function subjectPoseFor(
  positionKey: PositionKey,
  subject: "a" | "b",
): SubjectPose {
  if (positionKey === "spoon") {
    // Both partners on their RIGHT sides (lying along X axis).
    // Soldier faces -Z in bind, so both partners face -Z after Z
    // rotation. "Behind" the front partner = +Z (further from -Z).
    // So: back partner at +Z, front partner at -Z. Body thickness
    // is ~0.15m so put them ~0.16m apart, surfaces touching.
    //
    // Pose asymmetry: front partner is more relaxed (legs slightly
    // bent, body open). Back partner is more curled (legs pulled
    // up against front partner's bottom, arm draped over).
    const back = subject === "a";
    return {
      rootPosition: [0, 0.45, back ? 0.16 : -0.04],
      rootRotation: [0, 0, -Math.PI / 2],
      bones: {
        spine: [0, 0, 0],
        spine1: [back ? 0.2 : 0.05, 0, 0],
        spine2: [back ? 0.15 : 0.02, 0, 0],
        neck: [back ? 0.1 : 0, 0, 0],
        head: [0, 0, 0],
        // Bottom (right) arm folded as a pillow under the head
        rightArm: [0, 0, 0.7],
        rightForeArm: [0, -1.4, 0],
        // Top (left) arm: try X-axis rotation to swing it forward
        // and down along the body axis (rather than up to the sky).
        // Both Z signs put it skyward; X rotation rotates around
        // the bone's perpendicular axis which should bring it
        // toward the body.
        leftArm: [-1.0, 0, 0],
        leftForeArm: [-0.5, 0, 0],
        // Bottom (right) leg: bent at ~30° knee, the "down" leg
        rightUpLeg: [-0.3, 0, 0],
        rightLeg: [0.6, 0, 0],
        // Top (left) leg: back partner curls knee high; front
        // partner has knee bent moderately.
        leftUpLeg: [back ? -1.1 : -0.55, 0, 0],
        leftLeg: [back ? 1.5 : 0.9, 0, 0],
      },
    };
  }
  if (positionKey === "supine-knees-up") {
    // Receiver supine, knees bent over bolster (the McGill-safe
    // missionary). Partner above in plank-over, weight on forearms.
    const below = subject === "a"; // receiver
    if (below) {
      return {
        rootPosition: [0, 0.1, 0],
        rootRotation: [Math.PI / 2, 0, 0],
        bones: {
          spine: [0, 0, 0],
          spine1: [0, 0, 0],
          spine2: [0, 0, 0],
          leftArm: [0, 0, 0.15],
          rightArm: [0, 0, -0.15],
          // Both knees bent up · feet off floor, bolster under
          leftUpLeg: [-1.4, 0, 0],
          leftLeg: [1.5, 0, 0],
          rightUpLeg: [-1.4, 0, 0],
          rightLeg: [1.5, 0, 0],
        },
      };
    }
    // Partner above: plank-over, weight on forearms, hovering over
    // receiver's hips. Translated up so they don't interpenetrate.
    return {
      rootPosition: [0.4, 0.8, 0],
      rootRotation: [Math.PI / 2, 0, 0],
      bones: {
        spine: [0, 0, 0],
        spine1: [0, 0, 0],
        // Forearms down, plank position
        leftArm: [0, 0, -0.9],
        leftForeArm: [0, -1.2, 0],
        rightArm: [0, 0, 0.9],
        rightForeArm: [0, 1.2, 0],
        // Legs back, weight forward
        leftUpLeg: [0.3, 0, 0],
        leftLeg: [-0.4, 0, 0],
        rightUpLeg: [0.3, 0, 0],
        rightLeg: [-0.4, 0, 0],
      },
    };
  }
  if (positionKey === "side-T") {
    // Side-lying T: receiver on right side; partner kneeling
    // facing her, perpendicular. Low spine load on the receiver.
    if (subject === "a") {
      // Receiver: side-lying on right side
      return {
        rootPosition: [0, 0.45, 0],
        rootRotation: [0, 0, -Math.PI / 2],
        bones: {
          spine: [0, 0, 0],
          spine1: [0.05, 0, 0],
          rightArm: [0, 0, 0.5],
          rightForeArm: [0, -1.0, 0],
          leftArm: [0, 0, -0.3],
          leftForeArm: [0, -0.2, 0],
          rightUpLeg: [-0.3, 0, 0],
          rightLeg: [0.5, 0, 0],
          // Top leg slightly raised
          leftUpLeg: [-0.6, 0, 0],
          leftLeg: [0.4, 0, 0],
        },
      };
    }
    // Partner: kneeling facing receiver
    return {
      rootPosition: [0.55, 0.55, 0],
      rootRotation: [0, -Math.PI / 2, 0],
      bones: {
        spine: [0, 0, 0],
        // Both legs in kneel
        leftUpLeg: [-1.4, 0, 0],
        leftLeg: [1.5, 0, 0],
        rightUpLeg: [-1.4, 0, 0],
        rightLeg: [1.5, 0, 0],
        // Arms forward / hands on receiver's thigh
        leftArm: [0, 0, -0.6],
        leftForeArm: [0, -0.4, 0],
        rightArm: [0, 0, 0.6],
        rightForeArm: [0, 0.4, 0],
      },
    };
  }
  if (positionKey === "cowgirl-upright") {
    // Receiver on top, upright (straddling); partner supine below.
    if (subject === "a") {
      return {
        rootPosition: [0, 0.1, 0],
        rootRotation: [Math.PI / 2, 0, 0],
        bones: {
          leftArm: [0, 0, 0.2],
          rightArm: [0, 0, -0.2],
          leftUpLeg: [-0.4, 0, 0],
          leftLeg: [0.5, 0, 0],
          rightUpLeg: [-0.4, 0, 0],
          rightLeg: [0.5, 0, 0],
        },
      };
    }
    return {
      rootPosition: [0, 0.65, 0],
      rootRotation: [0, Math.PI, 0],
      bones: {
        leftUpLeg: [-1.7, 0, 0],
        leftLeg: [1.7, 0, 0],
        rightUpLeg: [-1.7, 0, 0],
        rightLeg: [1.7, 0, 0],
        leftArm: [0, 0, -0.6],
        rightArm: [0, 0, 0.6],
      },
    };
  }
  if (positionKey === "doggy-supported") {
    if (subject === "a") {
      return {
        rootPosition: [0, 0.55, 0],
        rootRotation: [-Math.PI / 2, 0, 0],
        bones: {
          neck: [-0.2, 0, 0],
          leftArm: [0, 0, -1.55],
          leftForeArm: [1.0, 0, 0],
          rightArm: [0, 0, 1.55],
          rightForeArm: [1.0, 0, 0],
          leftUpLeg: [-1.55, 0, 0],
          leftLeg: [1.55, 0, 0],
          rightUpLeg: [-1.55, 0, 0],
          rightLeg: [1.55, 0, 0],
        },
      };
    }
    return {
      rootPosition: [-0.5, 0.55, 0],
      rootRotation: [0, 0, 0],
      bones: {
        leftUpLeg: [-1.55, 0, 0],
        leftLeg: [1.55, 0, 0],
        rightUpLeg: [-1.55, 0, 0],
        rightLeg: [1.55, 0, 0],
        leftArm: [0, 0, -0.4],
        rightArm: [0, 0, 0.4],
      },
    };
  }
  if (positionKey === "scissor") {
    if (subject === "a") {
      return {
        rootPosition: [0, 0.45, 0],
        rootRotation: [0, 0, -Math.PI / 2],
        bones: {
          rightArm: [0, 0, 0.5],
          rightForeArm: [0, -1.0, 0],
          leftArm: [-0.8, 0, 0],
          leftForeArm: [0, -0.3, 0],
          rightUpLeg: [-0.3, 0, 0],
          rightLeg: [0.4, 0, 0],
          leftUpLeg: [-0.3, 0, 0],
          leftLeg: [0.4, 0, 0],
        },
      };
    }
    return {
      rootPosition: [0, 0.45, 0.4],
      rootRotation: [-Math.PI / 2, 0, -Math.PI / 2],
      bones: {
        rightArm: [0, 0, 0.5],
        rightForeArm: [0, -1.0, 0],
        leftArm: [-0.8, 0, 0],
        leftForeArm: [0, -0.3, 0],
        rightUpLeg: [-0.3, 0, 0],
        rightLeg: [0.4, 0, 0],
        leftUpLeg: [-0.3, 0, 0],
        leftLeg: [0.4, 0, 0],
      },
    };
  }
  if (positionKey === "supine-bolster") {
    if (subject === "b") {
      // No second subject for solo · hide off-screen
      return { rootPosition: [0, -10, 0], rootRotation: [0, 0, 0], bones: {} };
    }
    return {
      rootPosition: [0, 0.25, 0],
      rootRotation: [Math.PI / 2, 0, 0],
      bones: {
        leftArm: [0, 0, 0.15],
        rightArm: [0, 0, -0.15],
        leftUpLeg: [-1.3, 0, 0],
        leftLeg: [1.4, 0, 0],
        rightUpLeg: [-1.3, 0, 0],
        rightLeg: [1.4, 0, 0],
      },
    };
  }
  if (positionKey === "edge-bed") {
    // Receiver supine at edge of bed; partner kneeling on floor
    // facing the bed. Receiver's lumbar fully supported on the bed.
    if (subject === "a") {
      // Receiver: supine, hips at edge (X near +1.4 ≈ bed edge)
      return {
        rootPosition: [-0.5, 0.1, 0],
        rootRotation: [Math.PI / 2, 0, 0],
        bones: {
          leftArm: [0, 0, 0.2],
          rightArm: [0, 0, -0.2],
          // Knees bent up over the edge · feet hanging
          leftUpLeg: [-1.5, 0, 0],
          leftLeg: [1.4, 0, 0],
          rightUpLeg: [-1.5, 0, 0],
          rightLeg: [1.4, 0, 0],
        },
      };
    }
    // Partner: kneeling on the floor at the bed edge
    return {
      rootPosition: [0.7, -0.7, 0],
      rootRotation: [0, Math.PI, 0],
      bones: {
        spine: [0.2, 0, 0],
        spine1: [0.1, 0, 0],
        // Kneeling
        leftUpLeg: [-1.5, 0, 0],
        leftLeg: [1.55, 0, 0],
        rightUpLeg: [-1.5, 0, 0],
        rightLeg: [1.55, 0, 0],
        leftArm: [0, 0, -0.4],
        rightArm: [0, 0, 0.4],
      },
    };
  }
  return {
    rootPosition: [0, 0, 0],
    rootRotation: [0, 0, 0],
    bones: {},
  };
}

function cameraFor(positionKey: PositionKey): CameraSpec {
  if (positionKey === "spoon") {
    // Spoon body axis is +X (feet at X=0, heads at X≈+1.7) at Y≈0.5.
    // Camera pulled well back, slightly elevated, slightly toward
    // foot-end, looking at body mid-length so both full bodies fit.
    // 3/4 angle from the foot-end side, slightly elevated. Looks
    // back along the body axis toward the heads, showing both
    // bodies nested. Body axis = +X (feet at X≈0, heads at X≈+1.7).
    return { position: [-1.5, 1.4, 2.6], target: [0.7, 0.5, 0], fov: 36 };
  }
  if (positionKey === "supine-knees-up") {
    return { position: [3.0, 1.6, 2.4], target: [0, 0.5, 0], fov: 36 };
  }
  if (positionKey === "side-T") {
    return { position: [2.6, 1.4, 2.8], target: [0.3, 0.5, 0], fov: 36 };
  }
  if (positionKey === "edge-bed") {
    return { position: [3.0, 1.0, 2.4], target: [0, 0.2, 0], fov: 38 };
  }
  if (positionKey === "cowgirl-upright") {
    return { position: [3.2, 1.6, 2.2], target: [0, 0.5, 0], fov: 36 };
  }
  if (positionKey === "doggy-supported") {
    return { position: [3.0, 1.3, 2.6], target: [-0.2, 0.55, 0], fov: 36 };
  }
  if (positionKey === "scissor") {
    return { position: [3.0, 2.2, 2.6], target: [0.5, 0.4, 0.2], fov: 38 };
  }
  if (positionKey === "supine-bolster") {
    return { position: [2.8, 1.2, 2.6], target: [0, 0.3, 0], fov: 36 };
  }
  return { position: [3, 1.5, 3], target: [0, 0.5, 0], fov: 36 };
}

/* ---------- bone discovery + application ---------- */

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

function applySubjectPose(
  refs: BoneRefs,
  pose: SubjectPose,
  breathPhase = 0,
) {
  refs.root.position.set(...pose.rootPosition);
  refs.root.rotation.set(...pose.rootRotation);

  // Subtle breathing: tiny chest expansion via spine1/spine2 overlay.
  // breathPhase in [0,1]. Magnitudes well below any pose value so it
  // reads as ambient motion, not a movement.
  const breath = breathPhase * 0.04;
  const bones: Partial<Record<BoneKey, [number, number, number]>> = {
    ...pose.bones,
  };
  if (breath !== 0) {
    bones.spine1 = [(bones.spine1?.[0] ?? 0) + breath, 0, 0];
    bones.spine2 = [(bones.spine2?.[0] ?? 0) + breath * 0.7, 0, 0];
  }

  (Object.keys(BONES) as BoneKey[]).forEach((key) => {
    const bone = refs.byKey[key];
    const bind = refs.bind[key];
    const euler = bones[key];
    if (!bone || !bind || !euler) return;
    setBoneEuler(bone, bind, euler);
  });
}

/* ---------- model cache ---------- */

let cachedGLB: Promise<THREE.Object3D> | null = null;
function loadModel(): Promise<THREE.Object3D> {
  if (cachedGLB) return cachedGLB;
  cachedGLB = new Promise((resolve, reject) => {
    new GLTFLoader().load(
      MODEL_URL,
      (gltf) => resolve(gltf.scene),
      undefined,
      (err) => reject(err),
    );
  });
  return cachedGLB;
}

/* ---------- component ---------- */

export function Position3D({
  positionKey,
  className,
  style,
}: Position3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const positionKeyRef = useRef(positionKey);
  useEffect(() => {
    positionKeyRef.current = positionKey;
  }, [positionKey]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(CREAM);
    scene.fog = new THREE.Fog(CREAM, 6, 12);

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // OrbitControls · let the user drag to rotate, scroll to zoom.
    // Constrained: no panning, polar angle limited to keep the
    // camera from going under the floor.
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 6; // ~30° from top
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // just above horizon
    controls.minDistance = 1.5;
    controls.maxDistance = 6;

    // Lights
    scene.add(new THREE.AmbientLight(0xfff3df, 1.1));
    const key = new THREE.DirectionalLight(0xfff1dc, 1.5);
    key.position.set(2.8, 4.8, 2.6);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.bias = -0.0003;
    key.shadow.camera.left = -4;
    key.shadow.camera.right = 4;
    key.shadow.camera.top = 4;
    key.shadow.camera.bottom = -4;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xb88d7a, 0.42);
    fill.position.set(-2.2, 2.2, -1.4);
    scene.add(fill);

    // Floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 8),
      new THREE.MeshStandardMaterial({ color: PAPER, roughness: 1, metalness: 0 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Bed silhouette
    const bed = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 0.06, 1.8),
      new THREE.MeshStandardMaterial({
        color: "#e8dcc1",
        roughness: 1,
        metalness: 0,
      }),
    );
    bed.position.y = 0.03;
    bed.receiveShadow = true;
    scene.add(bed);

    // Oxblood ring
    const mat = new THREE.Mesh(
      new THREE.RingGeometry(1.2, 1.9, 80),
      new THREE.MeshBasicMaterial({
        color: OXBLOOD,
        transparent: true,
        opacity: 0.08,
      }),
    );
    mat.rotation.x = -Math.PI / 2;
    mat.position.y = 0.062;
    scene.add(mat);

    // Two figures
    const groupA = new THREE.Group();
    const groupB = new THREE.Group();
    scene.add(groupA);
    scene.add(groupB);

    let refsA: BoneRefs | null = null;
    let refsB: BoneRefs | null = null;
    let cancelled = false;

    loadModel()
      .then((sourceScene) => {
        if (cancelled) return;
        // Pure silhouette rendering. Flat MeshBasicMaterial, no
        // lighting interaction, no surface detail visible. The
        // soldier's gear (helmet, vest, pockets) disappears into
        // the outline · what reads is the body's contour against
        // cream paper. Apple-iPod-ad approach: the shape carries
        // the meaning. Two figures get slightly different inks so
        // they're distinguishable when overlapping.
        const tint = (clone: THREE.Object3D, color: string) => {
          clone.traverse((o) => {
            const mesh = o as THREE.Mesh;
            if (mesh.isMesh || (o as THREE.SkinnedMesh).isSkinnedMesh) {
              mesh.castShadow = true;
              mesh.receiveShadow = false;
              mesh.material = new THREE.MeshBasicMaterial({
                color,
                fog: false,
              });
            }
          });
        };
        const cloneA = SkeletonUtils.clone(sourceScene);
        const cloneB = SkeletonUtils.clone(sourceScene);
        tint(cloneA, FIGURE_A);
        tint(cloneB, FIGURE_B);
        groupA.add(cloneA);
        groupB.add(cloneB);
        refsA = captureBones(cloneA, groupA);
        refsB = captureBones(cloneB, groupB);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error("[Position3D] GLB load failed", err);
      });

    const ro = new ResizeObserver(() => {
      const w = container.clientWidth || 480;
      const h = container.clientHeight || 600;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    ro.observe(container);

    // When the user interacts with OrbitControls, stop fighting them
    // with the per-position camera lerp. The lerp re-engages on the
    // next position change so each position gets its "intended" camera
    // as the starting frame, but the user can take over after.
    let userInteracting = false;
    let lastPositionKey: PositionKey | null = null;
    controls.addEventListener("start", () => {
      userInteracting = true;
    });

    // Loop
    let raf = 0;
    let last = performance.now();
    const camPos = new THREE.Vector3();
    const camTarget = new THREE.Vector3();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const pk = positionKeyRef.current;
      // Reset interaction lock when the position changes so the
      // camera flies to the new pose's intended angle.
      if (pk !== lastPositionKey) {
        userInteracting = false;
        lastPositionKey = pk;
      }

      const cam = cameraFor(pk);
      if (!userInteracting) {
        camPos.set(...cam.position);
        camera.position.lerp(camPos, 1 - Math.pow(0.85, dt * 60));
        camera.fov = cam.fov;
        camera.updateProjectionMatrix();
        camTarget.set(...cam.target);
        controls.target.copy(camTarget);
      }
      controls.update();

      // 6-second breath cycle, slight phase offset between partners
      // so they don't breathe in lockstep (more natural).
      const tNow = now / 1000;
      const breathA = (Math.sin((tNow / 6) * Math.PI * 2 - Math.PI / 2) + 1) / 2;
      const breathB = (Math.sin(((tNow + 1.2) / 6) * Math.PI * 2 - Math.PI / 2) + 1) / 2;
      if (refsA) applySubjectPose(refsA, subjectPoseFor(pk, "a"), breathA);
      if (refsB) applySubjectPose(refsB, subjectPoseFor(pk, "b"), breathB);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const m = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (m) {
          if (Array.isArray(m)) m.forEach((x) => x.dispose());
          else m.dispose();
        }
      });
    };
  }, []);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 400,
        background:
          "radial-gradient(ellipse 90% 62% at 50% 28%, #F4EFE3 0%, #EFE7D2 62%, #E6DCC7 100%)",
        borderRadius: 24,
        overflow: "hidden",
        ...style,
      }}
    >
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      <div
        style={{
          position: "absolute",
          bottom: 14,
          right: 14,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 9,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(106, 91, 70, 0.62)",
          pointerEvents: "none",
        }}
      >
        ◆ drag · rotate · scroll · zoom
      </div>
    </div>
  );
}

export default Position3D;
