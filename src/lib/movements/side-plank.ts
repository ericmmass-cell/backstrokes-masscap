import { deg, type Movement, type SubjectPose } from "@/lib/pose";

/**
 * Side plank. Body lies on left side along X-axis. Forearm down at one end
 * acts as the support. The whole body lifts at the hips during the active
 * phase, then lowers. 4-sec cycle.
 */

const RESTING: SubjectPose = {
  rootPosition: [0, 0.16, 0],
  rootRotation: [0, 0, deg(90)],
  spineLumbar: [0, 0, 0],
  spineThoracic: [0, 0, 0],
  spineCervical: [0, 0, 0],
  head: [0, 0, 0],
  // Support arm · left, forearm flat on floor (the elbow is the pivot)
  upperArmL: [0, 0, deg(-90)],
  forearmL: [0, 0, deg(70)],
  handL: [0, 0, 0],
  // Top arm · right, resting on side
  upperArmR: [0, 0, deg(-15)],
  forearmR: [0, 0, deg(20)],
  handR: [0, 0, 0],
  // Legs together with knees slightly bent (week 1)
  thighL: [0, 0, deg(15)],
  shinL: [0, 0, deg(30)],
  footL: [0, 0, 0],
  thighR: [0, 0, deg(15)],
  shinR: [0, 0, deg(30)],
  footR: [0, 0, 0],
};

const LIFTED: SubjectPose = {
  ...RESTING,
  rootPosition: [0, 0.4, 0], // hips lift
  rootRotation: [0, 0, deg(90)],
  // Top arm raises overhead
  upperArmR: [0, 0, deg(-160)],
  forearmR: [0, 0, deg(10)],
  // Body straightens into a line
  spineLumbar: [0, 0, deg(-2)],
  spineThoracic: [0, 0, deg(-2)],
  thighL: [0, 0, deg(5)],
  shinL: [0, 0, deg(10)],
  thighR: [0, 0, deg(5)],
  shinR: [0, 0, deg(10)],
};

export const SIDE_PLANK: Movement = {
  id: "side-plank",
  label: "Side plank",
  duration: 4,
  loop: true,
  keyframes: [
    { time: 0, pose: { a: RESTING } },
    { time: 1, ease: "easeInOut", pose: { a: LIFTED } },
    { time: 3, ease: "linear", pose: { a: LIFTED } },
    { time: 4, ease: "easeInOut", pose: { a: RESTING } },
  ],
};
