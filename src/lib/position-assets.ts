/**
 * Position art registry. The web no longer draws bodies in code; each position
 * points to a real, externally-produced asset (illustration, short loop, or
 * Lottie). Until those land, every key is absent and PositionVisual shows a
 * clean, figure-free placeholder.
 *
 * To add a real asset:
 *   1. Drop the file in /public/positions-art/<key>.<ext>
 *   2. Add an entry below, e.g.
 *        "spoon": { kind: "image", src: "/positions-art/spoon.webp" }
 *        "missionary": { kind: "video", src: "/positions-art/missionary.webm", poster: "/positions-art/missionary.webp" }
 *
 * Quality from here is set by the asset, not by code.
 */
import type { PictogramKey } from "@/components/Pictogram";

export type PositionAsset = {
  kind: "image" | "video" | "lottie";
  src: string;
  /** still frame shown before a video loads */
  poster?: string;
};

/** Empty by design until real assets are produced. */
export const POSITION_ASSETS: Partial<Record<PictogramKey, PositionAsset>> = {};

export const hasPositionAsset = (key: PictogramKey) => key in POSITION_ASSETS;
