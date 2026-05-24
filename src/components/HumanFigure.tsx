import { MovementDemo, type MoveKey } from "./MovementDemo";
import type { CSSProperties } from "react";

type Props = {
  moveKey: MoveKey;
  paused?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function HumanFigure(props: Props) {
  return <MovementDemo {...props} />;
}

export default HumanFigure;
