/**
 * RiggedFigure — drives a real Mixamo-rigged GLB humanoid with the same
 * pose data the procedural Humanoid uses.
 *
 * The README in src/lib/movements documents this swap path verbatim. The
 * pose data is bone-name-driven, not skeleton-specific. We just need a
 * mapping table from BackStroke bone names to whatever names the GLB
 * skeleton uses. For Mixamo (and Mixamo-derived rigs like Three.js's
 * Soldier.glb and Ready Player Me) the mapping is:
 *
 *   BackStroke           Mixamo
 *   ──────────────────── ──────────────────────
 *   pelvis               mixamorigHips
 *   spineLumbar          mixamorigSpine
 *   spineThoracic        mixamorigSpine1
 *   spineCervical        mixamorigSpine2
 *   head                 mixamorigHead    (neck handled by Spine2/Neck)
 *   shoulderL/R          mixamorigLeft/RightShoulder
 *   upperArmL/R          mixamorigLeft/RightArm
 *   forearmL/R           mixamorigLeft/RightForeArm
 *   handL/R              mixamorigLeft/RightHand
 *   thighL/R             mixamorigLeft/RightUpLeg
 *   shinL/R              mixamorigLeft/RightLeg
 *   footL/R              mixamorigLeft/RightFoot
 *
 * Pose rotations were authored against the BackStroke procedural rig.
 * The Mixamo bind pose orients limbs differently — the procedural rig
 * has limbs extending along the bone's local +Y, while Mixamo bones
 * have varied local orientations baked in. So pose data WILL look
 * slightly off until the offsets are calibrated. We capture the bind
 * pose at first frame and apply our rotations RELATIVE to it.
 */

import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";
import {
  type BoneName,
  BONE_NAMES,
  type Pose,
  type SubjectPose,
  evaluateMovement,
} from "@/lib/pose";
import { getMovement } from "@/lib/movements";
import type { MoveKey } from "./MovementDemo";
import { getClipFor } from "@/lib/clips";

const MODEL_URL = "/3d/soldier.glb";

/** BackStroke bone → Mixamo bone. */
const BONE_MAP: Record<BoneName, string> = {
  pelvis: "mixamorigHips",
  spineLumbar: "mixamorigSpine",
  spineThoracic: "mixamorigSpine1",
  spineCervical: "mixamorigSpine2",
  head: "mixamorigHead",
  shoulderL: "mixamorigLeftShoulder",
  upperArmL: "mixamorigLeftArm",
  forearmL: "mixamorigLeftForeArm",
  handL: "mixamorigLeftHand",
  shoulderR: "mixamorigRightShoulder",
  upperArmR: "mixamorigRightArm",
  forearmR: "mixamorigRightForeArm",
  handR: "mixamorigRightHand",
  thighL: "mixamorigLeftUpLeg",
  shinL: "mixamorigLeftLeg",
  footL: "mixamorigLeftFoot",
  thighR: "mixamorigRightUpLeg",
  shinR: "mixamorigRightLeg",
  footR: "mixamorigRightFoot",
};

type BoneRefs = Partial<Record<BoneName | "root", THREE.Object3D | null>> & {
  /** Bind-pose rotations captured on first load. */
  bind?: Partial<Record<BoneName, THREE.Euler>>;
};

/**
 * Find a bone in a scene by suffix-tolerant name match. Some rigs prefix
 * with "mixamorig:", "mixamorig_", or just "mixamorig". This finds any.
 */
function findBone(root: THREE.Object3D, mixamoName: string): THREE.Object3D | null {
  let found: THREE.Object3D | null = null;
  const base = mixamoName.replace(/^mixamorig:?/, "");
  root.traverse((o) => {
    if (found) return;
    const n = o.name.replace(/^mixamorig:?/, "").replace(/^mixamorig_/, "");
    if (n === base) found = o;
  });
  return found;
}

/**
 * Apply a BackStroke pose to mapped bones, RELATIVE to the captured
 * bind pose. We add our authored rotation to the bind rotation rather
 * than overwriting, so the model's natural arm-out T-pose is preserved
 * as the zero state.
 */
function applyPoseRelative(refs: BoneRefs, pose: SubjectPose) {
  // Root transform applies directly (no bind-pose dependence for root).
  if (refs.root && pose.rootPosition) {
    refs.root.position.set(...pose.rootPosition);
  }
  if (refs.root && pose.rootRotation) {
    refs.root.rotation.set(...pose.rootRotation);
  }
  if (!refs.bind) return;
  for (const name of BONE_NAMES) {
    const rot = pose[name];
    const ref = refs[name];
    const bind = refs.bind[name];
    if (ref && rot && bind) {
      ref.rotation.set(bind.x + rot[0], bind.y + rot[1], bind.z + rot[2]);
    } else if (ref && rot) {
      ref.rotation.set(rot[0], rot[1], rot[2]);
    }
  }
}

function captureBindPose(refs: BoneRefs) {
  const bind: Partial<Record<BoneName, THREE.Euler>> = {};
  for (const name of BONE_NAMES) {
    const ref = refs[name];
    if (ref) bind[name] = ref.rotation.clone();
  }
  refs.bind = bind;
}

/**
 * One rigged figure. Loads the GLB, captures bone refs and bind pose,
 * then drives the bones per frame from the active movement (subject a or b).
 */
export function RiggedFigure({
  moveKey,
  subject,
  paused = false,
  scale = 1.0,
}: {
  moveKey: MoveKey;
  subject: "a" | "b";
  paused?: boolean;
  scale?: number;
}) {
  const gltf = useGLTF(MODEL_URL);
  const refs = useRef<BoneRefs>({});
  const tRef = useRef(0);
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionRef = useRef<THREE.AnimationAction | null>(null);

  // Clone the scene so two figures don't share the same skeleton.
  // CRITICAL: use SkeletonUtils.clone, NOT scene.clone(true). The latter
  // copies the hierarchy but leaves SkinnedMesh.skeleton pointing at the
  // original skeleton's bones. That means your bone rotations have no
  // visible effect on the cloned mesh — the model stays in T-pose forever.
  // SkeletonUtils.clone rebinds the skeleton to the cloned bones.
  const sceneClone = useMemo(() => {
    const c = SkeletonUtils.clone(gltf.scene);
    c.traverse((o) => {
      if ((o as THREE.SkinnedMesh).isSkinnedMesh) {
        const sm = o as THREE.SkinnedMesh;
        sm.castShadow = true;
        sm.receiveShadow = true;
        // Replace material with our brand-tinted skin to match the cream-paper register
        if (sm.material) {
          sm.material = new THREE.MeshStandardMaterial({
            color: "#d8a989",
            roughness: 0.7,
            metalness: 0.0,
          });
        }
      }
    });
    return c;
  }, [gltf.scene]);

  // After mount, walk the scene and capture refs by Mixamo bone name.
  // Then, if a hand-authored clip exists for this move/subject, mount
  // an AnimationMixer to drive the skeleton from the clip. Otherwise
  // fall back to per-frame pose-data application below.
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    refs.current.root = group;
    for (const bsName of BONE_NAMES) {
      const mxName = BONE_MAP[bsName];
      refs.current[bsName] = findBone(sceneClone, mxName);
    }
    captureBindPose(refs.current);

    // Try to set up a clip-driven animation for this move/subject.
    const clip = getClipFor(moveKey, subject);
    if (clip) {
      const mixer = new THREE.AnimationMixer(sceneClone);
      const action = mixer.clipAction(clip);
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.play();
      mixerRef.current = mixer;
      actionRef.current = action;
    } else {
      mixerRef.current = null;
      actionRef.current = null;
    }

    return () => {
      mixerRef.current?.stopAllAction();
      mixerRef.current = null;
      actionRef.current = null;
    };
  }, [sceneClone, moveKey, subject]);

  useFrame((_, delta) => {
    if (!paused) tRef.current += delta;
    // Clip-driven path: AnimationMixer applies the keyframes
    if (mixerRef.current) {
      if (!paused) mixerRef.current.update(delta);
      return;
    }
    // Pose-data fallback path
    const movement = getMovement(moveKey);
    const pose: Pose = evaluateMovement(movement, tRef.current);
    const sub = subject === "a" ? pose.a : pose.b;
    if (sub) applyPoseRelative(refs.current, sub);
  });

  return (
    <group ref={groupRef} scale={scale}>
      <primitive object={sceneClone} />
    </group>
  );
}

// Preload the model so the first canvas mount doesn't show a flash of empty.
// Client-only — preload uses fetch which isn't available in the SSR worker.
if (typeof window !== "undefined") {
  useGLTF.preload(MODEL_URL);
}
