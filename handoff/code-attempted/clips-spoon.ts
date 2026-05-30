/**
 * Spoon position. Two figures lying on their right sides, the back
 * person curled lightly around the front person. Both figures' spines
 * neutral or slightly flexed. Lumbar in slight flexion (the McGill
 * "low-load" spine geometry).
 *
 * Authoring strategy: each track targets a Mixamo bone by name. The
 * AnimationMixer's PropertyBinding traverses the scene from the root
 * given to `mixer.clipAction(clip, root)` to find each bone. Since the
 * cloned scene has standard Mixamo names (mixamorigHips, etc.), the
 * binding "just works."
 *
 * Coordinates: Mixamo bind pose has the figure standing along +Y,
 * facing -Z, arms out at sides in T-pose. Local axes for each bone
 * are aligned with the bone's bind direction, NOT world axes. Bone
 * rotations are RELATIVE to bind, so [0,0,0] means "as authored in
 * the bind pose."
 *
 * Pivot for whole-figure orientation: mixorigHips. Rotating Hips
 * around world Z by -PI/2 rolls a standing figure onto her right
 * side. Then we offset along world X to nest the two figures.
 */

import * as THREE from "three";

type Subject = "a" | "b";

const PI = Math.PI;

/** Quick helper: build a static (one-keyframe) quaternion track for a bone. */
function quatTrack(boneName: string, euler: THREE.Euler): THREE.QuaternionKeyframeTrack {
  const q = new THREE.Quaternion().setFromEuler(euler);
  return new THREE.QuaternionKeyframeTrack(
    `${boneName}.quaternion`,
    [0],
    [q.x, q.y, q.z, q.w],
  );
}

/** Static (one-keyframe) position track for a bone. */
function posTrack(boneName: string, v: [number, number, number]): THREE.VectorKeyframeTrack {
  return new THREE.VectorKeyframeTrack(
    `${boneName}.position`,
    [0],
    [v[0], v[1], v[2]],
  );
}

export function buildClip(subject: Subject): THREE.AnimationClip {
  const tracks: THREE.KeyframeTrack[] = [];

  // Subject A is the back of the spoon (slightly behind on Z, pelvis
  // tilted slightly forward toward partner). Subject B is the front
  // (slightly in front, body forming the inner curve).
  const isBack = subject === "a";

  // Offset both figures so they nest. Mixamo soldier is ~1.8m tall in
  // meters at scale 1.0. Lying on side, body axis becomes world X.
  // Two figures separated by ~12cm on Z so their torsos almost touch.
  const zOffset = isBack ? -0.12 : 0.12;

  // Hips: this is the "root" bone of the rig. Translating + rotating
  // Hips translates the whole body. We roll -PI/2 around Z to put the
  // figure on her right side (so left side faces up). Then add a small
  // hip flexion (rotation around X) for the curl.
  const hipsEuler = new THREE.Euler(0, 0, -PI / 2, "XYZ");
  tracks.push(quatTrack("mixamorigHips", hipsEuler));
  // Position Hips at ~95cm Y (lying down, hips that high off the floor
  // because the figure is on its side, so hips is hip-bone-radius above
  // the ground from this orientation). Z offset nests the two figures.
  tracks.push(posTrack("mixamorigHips", [0, 0.18, zOffset]));

  // Spine chain — slight flexion (curl) for the inner figure, more
  // for the outer figure (it wraps around). Negative X rotation =
  // flexion (forward bend) in Mixamo bone local frame.
  const spineFlex = isBack ? -0.25 : -0.12;
  tracks.push(quatTrack("mixamorigSpine", new THREE.Euler(spineFlex, 0, 0, "XYZ")));
  tracks.push(quatTrack("mixamorigSpine1", new THREE.Euler(spineFlex * 0.6, 0, 0, "XYZ")));
  tracks.push(quatTrack("mixamorigSpine2", new THREE.Euler(spineFlex * 0.4, 0, 0, "XYZ")));

  // Head — small forward tuck toward partner.
  tracks.push(quatTrack("mixamorigNeck", new THREE.Euler(-0.15, 0, 0, "XYZ")));
  tracks.push(quatTrack("mixamorigHead", new THREE.Euler(-0.1, 0, 0, "XYZ")));

  // Arms: in spoon, the bottom arm (right, since lying on right side)
  // tucks under the head; the top arm (left) drapes forward over partner.

  // RIGHT arm (the side they're lying on). Tuck up under head.
  tracks.push(quatTrack("mixamorigRightShoulder", new THREE.Euler(0, 0, 0, "XYZ")));
  // Pull upper arm forward and slightly up (in bone local frame).
  tracks.push(quatTrack("mixamorigRightArm", new THREE.Euler(0, 0, -0.6, "XYZ")));
  // Bend at elbow.
  tracks.push(quatTrack("mixamorigRightForeArm", new THREE.Euler(0, -1.2, 0, "XYZ")));

  // LEFT arm — draped forward.
  tracks.push(quatTrack("mixamorigLeftShoulder", new THREE.Euler(0, 0, 0, "XYZ")));
  // Bring upper arm in front of body.
  const leftArmFwd = isBack ? -1.1 : -0.6;
  tracks.push(quatTrack("mixamorigLeftArm", new THREE.Euler(0, 0, leftArmFwd, "XYZ")));
  // Slight bend at elbow.
  tracks.push(quatTrack("mixamorigLeftForeArm", new THREE.Euler(0, -0.5, 0, "XYZ")));

  // Legs: both bent at hips and knees for the curl. Right leg straighter
  // (it's the down leg), left leg bent more (it's the top leg, comes
  // forward toward partner).
  // Right leg
  tracks.push(quatTrack("mixamorigRightUpLeg", new THREE.Euler(-0.4, 0, 0, "XYZ")));
  tracks.push(quatTrack("mixamorigRightLeg", new THREE.Euler(0.6, 0, 0, "XYZ")));
  tracks.push(quatTrack("mixamorigRightFoot", new THREE.Euler(0.2, 0, 0, "XYZ")));

  // Left leg — pulled up tighter (closer to chest)
  const leftHipFlex = isBack ? -0.7 : -0.5;
  const leftKneeFlex = isBack ? 1.1 : 0.8;
  tracks.push(quatTrack("mixamorigLeftUpLeg", new THREE.Euler(leftHipFlex, 0, 0, "XYZ")));
  tracks.push(quatTrack("mixamorigLeftLeg", new THREE.Euler(leftKneeFlex, 0, 0, "XYZ")));
  tracks.push(quatTrack("mixamorigLeftFoot", new THREE.Euler(0.2, 0, 0, "XYZ")));

  // Single keyframe at t=0, duration 1s (mixer loops by default)
  return new THREE.AnimationClip(`spoon_${subject}`, 1, tracks);
}
