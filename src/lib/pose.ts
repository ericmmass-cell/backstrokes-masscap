/**
 * Pose data pipeline.
 *
 * One humanoid skeleton, twenty bones. Each bone has a 3-axis euler rotation
 * (in radians). A "pose" is a snapshot. A "movement" is a sequence of poses
 * (keyframes) with timing; the player interpolates between them.
 *
 * Adding a new exercise or sex position never requires touching the renderer.
 * You add a `Movement` to `src/lib/movements/` — the player reads it.
 *
 *   For exercises:  one subject, `a`. Subject `b` left undefined.
 *   For positions:  both `a` and `b` populated, positioned relative.
 *
 * The renderer is bone-compatible with Mixamo / Ready Player Me skeletons.
 * Drop in a real rigged GLB and the same Movement JSONs drive it — see
 * `src/components/MovementDemo.tsx` for the swap path.
 */

export type Rot = [number, number, number]; // euler XYZ, radians
export type Vec3 = [number, number, number];

/** The full bone set the renderer recognises. All optional in a Pose. */
export const BONE_NAMES = [
  "pelvis",
  "spineLumbar",
  "spineThoracic",
  "spineCervical",
  "head",
  "shoulderL",
  "upperArmL",
  "forearmL",
  "handL",
  "shoulderR",
  "upperArmR",
  "forearmR",
  "handR",
  "thighL",
  "shinL",
  "footL",
  "thighR",
  "shinR",
  "footR",
] as const;

export type BoneName = (typeof BONE_NAMES)[number];

/** A pose for one subject. */
export type SubjectPose = Partial<Record<BoneName, Rot>> & {
  rootPosition?: Vec3;
  rootRotation?: Rot;
};

/** A pose for the scene — at minimum subject `a`. */
export type Pose = {
  a: SubjectPose;
  b?: SubjectPose;
};

export type Easing = "linear" | "easeInOut" | "easeIn" | "easeOut";

export type Keyframe = {
  /** Seconds from start of the cycle. */
  time: number;
  ease?: Easing;
  pose: Pose;
};

export type Movement = {
  id: string;
  label: string;
  /** Seconds for one complete cycle. */
  duration: number;
  loop: boolean;
  keyframes: Keyframe[];
};

/* ───────── Helpers ───────── */

export const deg = (d: number) => (d * Math.PI) / 180;
export const NEUTRAL: SubjectPose = {};

const easingFn = (e: Easing | undefined, t: number): number => {
  switch (e) {
    case "linear":
      return t;
    case "easeIn":
      return t * t;
    case "easeOut":
      return 1 - (1 - t) * (1 - t);
    case "easeInOut":
    default:
      return -(Math.cos(Math.PI * t) - 1) / 2;
  }
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpRot = (a: Rot | undefined, b: Rot | undefined, t: number): Rot => {
  const A = a ?? [0, 0, 0];
  const B = b ?? [0, 0, 0];
  return [lerp(A[0], B[0], t), lerp(A[1], B[1], t), lerp(A[2], B[2], t)];
};
const lerpVec = (a: Vec3 | undefined, b: Vec3 | undefined, t: number): Vec3 => {
  const A = a ?? [0, 0, 0];
  const B = b ?? [0, 0, 0];
  return [lerp(A[0], B[0], t), lerp(A[1], B[1], t), lerp(A[2], B[2], t)];
};

function lerpSubject(a: SubjectPose, b: SubjectPose, t: number): SubjectPose {
  const out: SubjectPose = {
    rootPosition: lerpVec(a.rootPosition, b.rootPosition, t),
    rootRotation: lerpRot(a.rootRotation, b.rootRotation, t),
  };
  for (const name of BONE_NAMES) {
    out[name] = lerpRot(a[name], b[name], t);
  }
  return out;
}

export function lerpPose(a: Pose, b: Pose, t: number): Pose {
  return {
    a: lerpSubject(a.a, b.a, t),
    b: a.b && b.b ? lerpSubject(a.b, b.b, t) : a.b ?? b.b,
  };
}

/** Evaluate a movement at time `t` seconds. Handles loop and clamping. */
export function evaluateMovement(movement: Movement, tSec: number): Pose {
  const dur = movement.duration;
  let t = tSec;
  if (movement.loop) {
    t = t % dur;
    if (t < 0) t += dur;
  } else {
    t = Math.max(0, Math.min(dur, t));
  }

  const kfs = movement.keyframes;
  if (kfs.length === 0) return { a: {} };
  if (kfs.length === 1) return kfs[0].pose;

  // Find the keyframe pair we sit between.
  let i = 0;
  for (let k = 0; k < kfs.length - 1; k++) {
    if (t >= kfs[k].time && t <= kfs[k + 1].time) {
      i = k;
      break;
    }
    if (t > kfs[kfs.length - 1].time) i = kfs.length - 1;
  }

  const a = kfs[i];
  const b = kfs[Math.min(i + 1, kfs.length - 1)];
  if (a === b) return a.pose;

  const span = b.time - a.time || 0.0001;
  const localT = (t - a.time) / span;
  const eased = easingFn(b.ease, Math.max(0, Math.min(1, localT)));
  return lerpPose(a.pose, b.pose, eased);
}
