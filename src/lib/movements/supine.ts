import { deg, type Movement, type SubjectPose } from "@/lib/pose";

/**
 * Supine breath / decompression. Same posture, gentle breath cycle.
 * 8-second cycle matches the 4-7-8 breath plus a beat for the diaphragm drop.
 */

const SUPINE_EXHALE: SubjectPose = {
  rootPosition: [0, 0.1, 0],
  rootRotation: [Math.PI / 2, 0, 0],
  // Spine neutral
  spineLumbar: [0, 0, 0],
  spineThoracic: [0, 0, 0],
  spineCervical: [0, 0, 0],
  head: [0, 0, 0],
  // Knees up, feet flat
  thighL: [deg(-50), 0, 0],
  shinL: [deg(80), 0, 0],
  footL: [deg(-30), 0, 0],
  thighR: [deg(-50), 0, 0],
  shinR: [deg(80), 0, 0],
  footR: [deg(-30), 0, 0],
  // Arms by sides, palms up
  upperArmL: [0, deg(15), 0],
  forearmL: [deg(5), 0, 0],
  upperArmR: [0, deg(-15), 0],
  forearmR: [deg(5), 0, 0],
};

const SUPINE_INHALE: SubjectPose = {
  ...SUPINE_EXHALE,
  // Subtle breath expansion · head settles back slightly
  spineCervical: [deg(-3), 0, 0],
  spineThoracic: [deg(-1), 0, 0],
};

export const SUPINE_BREATH: Movement = {
  id: "supine-breath",
  label: "Supine · breath",
  duration: 8,
  loop: true,
  keyframes: [
    { time: 0, pose: { a: SUPINE_EXHALE } },
    { time: 4, ease: "easeInOut", pose: { a: SUPINE_INHALE } },
    { time: 8, ease: "easeInOut", pose: { a: SUPINE_EXHALE } },
  ],
};
