/**
 * Movement registry.
 *
 * Adding a new movement (exercise OR sex position):
 *   1. Create a file in this directory exporting a `Movement` object.
 *   2. Import it here and add to MOVEMENTS.
 *   3. Map a key in `MOVE_KEYS` to its ID.
 *   4. Done. The renderer reads the registry. No new code required.
 *
 * For sex positions: populate `pose.b` in every keyframe with a second
 * SubjectPose. The renderer auto-instantiates a second humanoid when `b`
 * is present.
 */

import type { Movement } from "@/lib/pose";

import { CURL_UP } from "./curl-up";
import { SIDE_PLANK } from "./side-plank";
import { BIRD_DOG } from "./bird-dog";
import { SUPINE_BREATH } from "./supine";

export const MOVEMENTS: Record<string, Movement> = {
  "curl-up": CURL_UP,
  "side-plank": SIDE_PLANK,
  "bird-dog": BIRD_DOG,
  "breath": SUPINE_BREATH,
  "reverse-kegel": SUPINE_BREATH,
  "decomp": SUPINE_BREATH,
};

export type MovementKey = keyof typeof MOVEMENTS;

export function getMovement(key: string): Movement {
  return MOVEMENTS[key] ?? SUPINE_BREATH;
}
