/**
 * Position art registry. Each position points to a real, externally-produced
 * asset. The clothed photo motion strips (8 frames, neutral set, grey
 * loungewear) live in /public/demos/positions/ and animate as a flipbook.
 *
 * To add or change art: drop the file in /public/positions-art/ (or reuse the
 * demo strips) and add/adjust an entry here. Quality is set by the asset.
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
  dwell: 720,
});

/** PictogramKey -> real clothed photo strip. */
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
