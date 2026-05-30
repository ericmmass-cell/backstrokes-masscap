import { deg, type Movement, type SubjectPose } from "@/lib/pose";

/**
 * Bird dog. Quadruped. Opposite arm and leg extend in 3-second cycles,
 * then switch sides. 6-second total cycle.
 */

const QUAD: SubjectPose = {
  rootPosition: [0, 0.55, 0],
  rootRotation: [deg(-90), 0, 0], // pelvis tipped to face down
  spineLumbar: [0, 0, 0],
  spineThoracic: [0, 0, 0],
  spineCervical: [deg(-20), 0, 0],
  head: [deg(10), 0, 0],
  // Arms — straight down to floor, supporting
  upperArmL: [deg(-90), 0, 0],
  forearmL: [0, 0, 0],
  handL: [0, 0, 0],
  upperArmR: [deg(-90), 0, 0],
  forearmR: [0, 0, 0],
  handR: [0, 0, 0],
  // Legs — bent at 90 (knees on floor, shins back)
  thighL: [deg(90), 0, 0],
  shinL: [deg(90), 0, 0],
  footL: [0, 0, 0],
  thighR: [deg(90), 0, 0],
  shinR: [deg(90), 0, 0],
  footR: [0, 0, 0],
};

const LEFT_ARM_RIGHT_LEG: SubjectPose = {
  ...QUAD,
  // Left arm reaches forward, parallel to floor
  upperArmL: [deg(-180), 0, 0],
  forearmL: [0, 0, 0],
  // Right leg extends back, parallel to floor
  thighR: [deg(180), 0, 0],
  shinR: [0, 0, 0],
};

const RIGHT_ARM_LEFT_LEG: SubjectPose = {
  ...QUAD,
  upperArmR: [deg(-180), 0, 0],
  forearmR: [0, 0, 0],
  thighL: [deg(180), 0, 0],
  shinL: [0, 0, 0],
};

export const BIRD_DOG: Movement = {
  id: "bird-dog",
  label: "Bird dog",
  duration: 6,
  loop: true,
  keyframes: [
    { time: 0, pose: { a: QUAD } },
    { time: 0.75, ease: "easeInOut", pose: { a: LEFT_ARM_RIGHT_LEG } },
    { time: 2.25, ease: "linear", pose: { a: LEFT_ARM_RIGHT_LEG } },
    { time: 3, ease: "easeInOut", pose: { a: QUAD } },
    { time: 3.75, ease: "easeInOut", pose: { a: RIGHT_ARM_LEFT_LEG } },
    { time: 5.25, ease: "linear", pose: { a: RIGHT_ARM_LEFT_LEG } },
    { time: 6, ease: "easeInOut", pose: { a: QUAD } },
  ],
};
