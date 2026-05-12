import { deg, type Movement, type SubjectPose } from "@/lib/pose";

/**
 * Curl-up. Supine. Head and shoulders lift 20° over 1 sec, hold 2 sec,
 * return over 1 sec. 4-sec rep cycle, loops indefinitely.
 *
 * Root is the pelvis. The whole body lies along the X-axis with rootRotation
 * tipping it onto its back, so positive bone X rotations curl the spine.
 */

const SUPINE_ROOT = {
  rootPosition: [0, 0.1, 0] as [number, number, number],
  rootRotation: [Math.PI / 2, 0, 0] as [number, number, number],
};

const RESTING: SubjectPose = {
  ...SUPINE_ROOT,
  // Spine neutral
  spineLumbar: [0, 0, 0],
  spineThoracic: [0, 0, 0],
  spineCervical: [0, 0, 0],
  head: [0, 0, 0],
  // Right knee bent up (foot on floor)
  thighR: [deg(-90), 0, 0],
  shinR: [deg(120), 0, 0],
  footR: [deg(-30), 0, 0],
  // Left leg long on floor
  thighL: [0, 0, 0],
  shinL: [0, 0, 0],
  footL: [0, 0, 0],
  // Hands toward lumbar (under back)
  shoulderL: [0, 0, 0],
  upperArmL: [deg(-60), deg(40), 0],
  forearmL: [deg(80), 0, 0],
  handL: [0, 0, 0],
  shoulderR: [0, 0, 0],
  upperArmR: [deg(-60), deg(-40), 0],
  forearmR: [deg(80), 0, 0],
  handR: [0, 0, 0],
};

const CURLED: SubjectPose = {
  ...RESTING,
  spineLumbar: [0, 0, 0], // lumbar stays flat — never flex
  spineThoracic: [deg(14), 0, 0], // thoracic flexes
  spineCervical: [deg(10), 0, 0], // chin tucks
  head: [deg(6), 0, 0],
};

export const CURL_UP: Movement = {
  id: "curl-up",
  label: "Curl-up",
  duration: 4,
  loop: true,
  keyframes: [
    { time: 0, pose: { a: RESTING } },
    { time: 1, ease: "easeInOut", pose: { a: CURLED } },
    { time: 3, ease: "linear", pose: { a: CURLED } },
    { time: 4, ease: "easeInOut", pose: { a: RESTING } },
  ],
};
