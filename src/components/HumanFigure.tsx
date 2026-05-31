/**
 * HumanFigure — used by /session.
 *
 * DECISION (2026-05-31, Eric): use the REAL art, make it move. The hand-drawn
 * AnimatedExercise / Mannequin figures were rejected as not good enough.
 *
 * The repo already ships professional 4-frame motion photography for all five
 * moves at /public/demos/workout/<move>.jpg (rest → lift → hold → lower, on
 * the brand cream background). PhotoFlipbook steps through those real frames so
 * the move plays as a short looping clip of the actual movement. No drawing.
 */

import type { CSSProperties } from "react";
import { PhotoFlipbook, type FlipbookKey } from "./PhotoFlipbook";

const FLIPBOOK_KEYS = new Set<FlipbookKey>(["curl-up", "side-plank", "bird-dog", "breath", "decomp"]);

type Props = {
  moveKey: FlipbookKey;
  paused?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function HumanFigure({ moveKey, paused, className, style }: Props) {
  if (FLIPBOOK_KEYS.has(moveKey)) {
    return <PhotoFlipbook moveKey={moveKey} paused={paused} className={className} style={style} />;
  }
  // No photography for this key — render nothing rather than a broken figure.
  return null;
}

export type { FlipbookKey as MoveKey };

export default HumanFigure;
