/**
 * PoseFigure — deterministic, code-drawn position diagrams.
 *
 * A confident clinical illustration, not faux-realism: two abstract bodies as
 * rounded capsule limbs, each wrapped in a cream "halo" so overlapping figures
 * stay legible, the spine drawn as the hero line (this is a back app), support
 * props as simple shapes, on the brand cream stage. No explicit anatomy. Every
 * line is authored, so the position is always correct. Gentle breathing
 * animation; respects reduced motion. A pose is data (joints per figure).
 */
import type { CSSProperties } from "react";

export type Pt = [number, number];

export type FigureSpec = {
  color: string;
  headR: number;
  joints: {
    head: Pt;
    neck: Pt; // shoulder origin
    elbow: Pt;
    wrist: Pt;
    pelvis: Pt; // hip origin
    knee: Pt;
    ankle: Pt;
  };
  spine?: boolean;
};

export type Prop =
  | { kind: "surface"; y: number }
  | { kind: "pillow"; x: number; y: number; w: number; h: number; rot?: number }
  | { kind: "wedge"; x: number; y: number; w: number; h: number };

export type Pose = { figures: FigureSpec[]; props?: Prop[] };

const STAGE = "linear-gradient(160deg, #f7f2e7, #efe6d2)";
const SURFACE = "#e7ddc6";
const SURFACE_LINE = "#d3c6a6";
const PILLOW = "#fbf6ea";
const PILLOW_LINE = "#cdbf9f";
const HALO = "#f3eede";
const SPINE_ACCENT = "#f6efdd";

type Seg = { a: Pt; b: Pt; w: number };

function segments(f: FigureSpec): Seg[] {
  const j = f.joints;
  const T = 40; // torso width
  const L = 24; // limb width
  return [
    { a: j.pelvis, b: j.knee, w: L },
    { a: j.knee, b: j.ankle, w: L - 3 },
    { a: j.pelvis, b: j.neck, w: T },
    { a: j.neck, b: j.head, w: T - 14 },
    { a: j.neck, b: j.elbow, w: L },
    { a: j.elbow, b: j.wrist, w: L - 4 },
  ];
}

function strokeSet(segs: Seg[], head: { c: Pt; r: number }, color: string, grow: number, opacity = 1) {
  return (
    <g opacity={opacity}>
      {segs.map((s, i) => (
        <line key={i} x1={s.a[0]} y1={s.a[1]} x2={s.b[0]} y2={s.b[1]} stroke={color} strokeWidth={s.w + grow} strokeLinecap="round" />
      ))}
      <circle cx={head.c[0]} cy={head.c[1]} r={head.r + grow / 2} fill={color} />
    </g>
  );
}

function Spine({ pelvis, neck }: { pelvis: Pt; neck: Pt }) {
  const n = 5;
  const dx = neck[0] - pelvis[0];
  const dy = neck[1] - pelvis[1];
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const ticks = [];
  for (let i = 1; i <= n; i++) {
    const t = 0.12 + (i / (n + 1)) * 0.78;
    const cx = pelvis[0] + dx * t;
    const cy = pelvis[1] + dy * t;
    const r = 6;
    ticks.push(<line key={i} x1={cx - nx * r} y1={cy - ny * r} x2={cx + nx * r} y2={cy + ny * r} stroke={SPINE_ACCENT} strokeWidth={3.2} strokeLinecap="round" />);
  }
  return <g>{ticks}</g>;
}

function Figure({ f, idx, paused }: { f: FigureSpec; idx: number; paused?: boolean }) {
  const segs = segments(f);
  const head = { c: f.joints.head, r: f.headR };
  return (
    <g style={{ transformBox: "fill-box", transformOrigin: "center", animation: paused ? undefined : `bsBreath ${idx === 0 ? "4.6s" : "4.1s"} ease-in-out ${idx * 0.4}s infinite` }}>
      {strokeSet(segs, head, HALO, 12)}
      {strokeSet(segs, head, f.color, 0)}
      {strokeSet(segs, head, "rgba(255,255,255,0.07)", -18)}
      {f.spine !== false && <Spine pelvis={f.joints.pelvis} neck={f.joints.neck} />}
    </g>
  );
}

export function PoseFigure({ pose, paused, style }: { pose: Pose; paused?: boolean; style?: CSSProperties }) {
  const props = pose.props ?? [];
  const surface = props.find((p) => p.kind === "surface") as Extract<Prop, { kind: "surface" }> | undefined;
  return (
    <div style={{ position: "absolute", inset: 0, background: STAGE, ...style }}>
      <svg viewBox="0 0 480 640" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Position diagram">
        <style>{`@keyframes bsBreath{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-3px) scale(1.012)}}@media (prefers-reduced-motion:reduce){g{animation:none!important}}`}</style>

        {surface && (
          <g>
            <rect x={-20} y={surface.y} width={520} height={640 - surface.y + 20} fill={SURFACE} />
            <line x1={-20} y1={surface.y} x2={500} y2={surface.y} stroke={SURFACE_LINE} strokeWidth={3} strokeLinecap="round" />
          </g>
        )}

        {pose.figures.map((f, i) => (
          <ellipse key={`sh${i}`} cx={f.joints.pelvis[0]} cy={(surface?.y ?? 540) + 5} rx={150} ry={11} fill="rgba(60,45,30,0.09)" />
        ))}

        {props.filter((p) => p.kind === "wedge").map((p, i) => {
          const w = p as Extract<Prop, { kind: "wedge" }>;
          return <polygon key={`wd${i}`} points={`${w.x},${w.y + w.h} ${w.x + w.w},${w.y + w.h} ${w.x + w.w},${w.y}`} fill={PILLOW} stroke={PILLOW_LINE} strokeWidth={2} />;
        })}

        {pose.figures.map((f, i) => (
          <Figure key={`f${i}`} f={f} idx={i} paused={paused} />
        ))}

        {props.filter((p) => p.kind === "pillow").map((p, i) => {
          const pl = p as Extract<Prop, { kind: "pillow" }>;
          return (
            <g key={`pl${i}`} transform={`rotate(${pl.rot ?? 0} ${pl.x + pl.w / 2} ${pl.y + pl.h / 2})`}>
              <rect x={pl.x} y={pl.y} width={pl.w} height={pl.h} rx={pl.h / 2} fill={PILLOW} stroke={PILLOW_LINE} strokeWidth={2} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default PoseFigure;
