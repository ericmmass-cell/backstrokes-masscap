/**
 * Position art registry. Real, externally-produced assets per position.
 * Clothed photo motion strips (8 frames, neutral set) live in
 * /public/demos/positions/ and animate as a crossfading flipbook. The strips
 * carry 4 sharp key poses on the even frames (0,2,4,6) with ghosted motion-blur
 * tweens on the odd frames; the player plays only the sharp keys.
 *
 * Two lookups:
 *  - POSITION_ASSETS_BY_ID: the Pop Atlas keys by library position id (p01..),
 *    so every card gets a DISTINCT photo (each strip used at most once). A
 *    position with no dedicated strip falls back to the clean placeholder
 *    rather than repeating another position's photo.
 *  - POSITION_ASSETS: keyed by the collapsed PictogramKey, for surfaces that
 *    only know the category (the ranker, etc.).
 */
import type { PictogramKey } from "@/components/Pictogram";

export type PositionAsset =
  | { kind: "image"; src: string }
  | { kind: "video"; src: string; poster?: string }
  | { kind: "strip"; src: string; frames: number; dwell?: number };

const strip = (name: string): PositionAsset => ({
  kind: "strip",
  src: `/demos/positions/${name}.jpg`,
  frames: 8,
});

/** Library position id -> its own photo. Each strip used once (no repeats). */
export const POSITION_ASSETS_BY_ID: Record<string, PositionAsset> = {
  p01: strip("side-spoon"),
  p02: strip("supine-support"),
  p05: strip("seated-upright"),
  p07: strip("side-facing"),
  p08: strip("standing-support"),
  p10: strip("quadruped-support"),
  p11: strip("reverse-cowgirl"),
  p12: strip("cowgirl-upright"),
  p13: strip("stirrup-missionary"),
  p15: strip("standing-wall"),
  p16: strip("edge-bed"),
  p18: strip("side-leg-held"),
  p33: strip("prone-pillow"),
  p35: strip("cradle-sitting"),
  p37: strip("squat-over"),
};

/** PictogramKey -> a representative photo (used where only the category is known). */
export const POSITION_ASSETS: Partial<Record<PictogramKey, PositionAsset>> = {
  spoon: strip("side-spoon"),
  "supine-knees-up": strip("supine-support"),
  missionary: strip("stirrup-missionary"),
  "side-T": strip("side-leg-held"),
  "edge-bed": strip("edge-bed"),
  "cowgirl-upright": strip("cowgirl-upright"),
  "doggy-supported": strip("quadruped-support"),
  "doggy-kneeling": strip("quadruped-support"),
  scissor: strip("side-facing"),
  "seated-lap": strip("seated-upright"),
  standing: strip("standing-wall"),
};

export const hasPositionAsset = (key: PictogramKey) => key in POSITION_ASSETS;
