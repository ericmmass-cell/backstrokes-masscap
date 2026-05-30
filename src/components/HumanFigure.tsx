/**
 * HumanFigure — used by /session.
 *
 * Was a passthrough to MovementDemo (the 3D rigged figure). The 3D
 * silhouette read as "Frankenstein in tactical gear" — the soldier
 * mesh bulges showed through as creepy outlines. Replaced with the
 * hand-authored SVG Pictogram, which the sex positions also use.
 * Same key mapping.
 */

import type { CSSProperties } from "react";
import { Pictogram, type PictogramKey } from "./Pictogram";
import { AnimatedExercise, ANIMATED_KEYS } from "./AnimatedExercise";

type Props = {
  moveKey: PictogramKey; // curl-up | side-plank | bird-dog | breath | decomp
  paused?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function HumanFigure({ moveKey, paused, className, style }: Props) {
  // Curl-up (and any other key in ANIMATED_KEYS) renders as a real
  // looping motion study instead of a static plate. Everything else
  // falls through to the static Pictogram illustration.
  if (ANIMATED_KEYS.has(moveKey)) {
    return (
      <AnimatedExercise
        moveKey={moveKey}
        paused={paused}
        className={className}
        style={style}
      />
    );
  }
  return <Pictogram positionKey={moveKey} className={className} style={style} />;
}

// Re-export the type so the route's old import path still resolves.
export type { PictogramKey as MoveKey };

export default HumanFigure;
