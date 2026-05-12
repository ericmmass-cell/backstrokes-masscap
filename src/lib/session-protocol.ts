/**
 * V1 protocol - hardcoded 8-minute block.
 * Easy to swap for future personalization tracks.
 */
export type Block = {
  id: string;
  name: string;
  detail: string;
  cue: string;
  durationSec: number;
};

export const PROTOCOL_V1: Block[] = [
  {
    id: "curl-up",
    name: "McGill curl-up",
    detail: "3 × 20s holds, 10s rest.",
    cue: "Hands under low back. Lift head + shoulders one inch. Brace.",
    durationSec: 90,
  },
  {
    id: "side-plank",
    name: "Side plank - both sides",
    detail: "2 × 20s each side.",
    cue: "Elbow under shoulder. Hips stacked. Don't let them sag.",
    durationSec: 90,
  },
  {
    id: "bird-dog",
    name: "Bird dog",
    detail: "2 × 30s each side.",
    cue: "Opposite arm and leg. Slow. The spine stays neutral the whole time.",
    durationSec: 90,
  },
  {
    id: "reverse-kegel",
    name: "Reverse kegel + breath",
    detail: "8 cycles · 4s in / 6s out.",
    cue: "Inhale into the floor. Let it drop. Exhale, soft. No squeeze.",
    durationSec: 90,
  },
  {
    id: "hip-hinge",
    name: "Hip hinge reset",
    detail: "10 reps, slow.",
    cue: "Hinge at the hips. Spine stays long. This is how you pick things up now.",
    durationSec: 90,
  },
  {
    id: "down-regulate",
    name: "Down-regulate",
    detail: "Box breath · 4-4-4-4.",
    cue: "Eyes closed. In four. Hold four. Out four. Hold four. Done.",
    durationSec: 30,
  },
];

export const PROTOCOL_TOTAL_SEC = PROTOCOL_V1.reduce((s, b) => s + b.durationSec, 0);

export const STREAK_KEY = "bs.sessions.completed";

export function readStreak(): number {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem(STREAK_KEY);
  const n = raw ? parseInt(raw, 10) : 0;
  return Number.isFinite(n) ? n : 0;
}

export function incrementStreak(): number {
  if (typeof window === "undefined") return 0;
  const next = readStreak() + 1;
  window.localStorage.setItem(STREAK_KEY, String(next));
  return next;
}
