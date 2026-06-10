/**
 * PoseFigure · deterministic, code-drawn position diagrams you can actually read.
 *
 * Clarity rules (the whole point):
 *  - the two people are high-contrast: one LIGHT (receiver), one DARK (partner),
 *    so they never merge into a lump.
 *  - every limb has a cream halo + a crisp outline, so overlapping limbs stay
 *    legible.
 *  - visible hands and feet, so you can read orientation and what's bearing load.
 *  - the spine is drawn as the hero line (this is a back app).
 *  - motion shows the actual movement of the position (a gentle rhythmic rock of
 *    the active partner), not just breathing. Respects reduced motion.
 *
 * No external generation, no explicit anatomy. A pose is data (joints per figure).
 */
import type { CSSProperties } from "react";

export type Pt = [number, number];

export type FigureSpec = {
  color: string;
  headR: number;
  joints: { head: Pt; neck: Pt; elbow: Pt; wrist: Pt; pelvis: Pt; knee: Pt; ankle: Pt };
  spine?: boolean;
};

export type Prop =
  | { kind: "surface"; y: number }
  | { kind: "pillow"; x: number; y: number; w: number; h: number; rot?: number }
  | { kind: "wedge"; x: number; y: number; w: number; h: number };

/** motion: which figure is the active mover + the rock vector + period (s). */
export type Pose = { figures: FigureSpec[]; props?: Prop[]; motion?: { figure: number; dx: number; dy: number; period?: number } };

const STAGE = "linear-gradient(160deg, #f7f2e7, #efe6d2)";
const SURFACE = "#e7ddc6";
const SURFACE_LINE = "#d3c6a6";
const PILLOW = "#fbf6ea";
const PILLOW_LINE = "#c9b994";
const HALO = "#f4efe0";
const SPINE_ACCENT = "#fbf5e6";

// outline per body tone (keep in sync with position-poses colors)
const OUTLINE: Record<string, string> = { "#d2a06e": "#9a6736", "#2f2820": "#16110a" };
const outlineFor = (c: string) => OUTLINE[c] ?? "rgba(20,14,8,0.5)";

type Seg = { a: Pt; b: Pt; w: number };
const TORSO = 36;
const LIMB = 22;

function segs(f: FigureSpec): Seg[] {
  const j = f.joints;
  return [
    { a: j.pelvis, b: j.knee, w: LIMB },
    { a: j.knee, b: j.ankle, w: LIMB - 3 },
    { a: j.pelvis, b: j.neck, w: TORSO },
    { a: j.neck, b: j.head, w: TORSO - 14 },
    { a: j.neck, b: j.elbow, w: LIMB },
    { a: j.elbow, b: j.wrist, w: LIMB - 4 },
  ];
}

/** one pass of a whole figure (limbs, head, hands, feet) at a given grow + color */
function layer(f: FigureSpec, color: string, grow: number) {
  const j = f.joints;
  return (
    <g>
      {segs(f).map((s, i) => (
        <line key={i} x1={s.a[0]} y1={s.a[1]} x2={s.b[0]} y2={s.b[1]} stroke={color} strokeWidth={s.w + grow} strokeLinecap="round" />
      ))}
      {/* hands + feet as distinct nubs so orientation reads */}
      <circle cx={j.wrist[0]} cy={j.wrist[1]} r={(LIMB - 4) / 2 + 2 + grow / 2} fill={color} />
      <circle cx={j.ankle[0]} cy={j.ankle[1]} r={(LIMB - 3) / 2 + 2 + grow / 2} fill={color} />
      {/* head */}
      <circle cx={j.head[0]} cy={j.head[1]} r={f.headR + grow / 2} fill={color} />
    </g>
  );
}

function Spine({ pelvis, neck }: { pelvis: Pt; neck: Pt }) {
  const dx = neck[0] - pelvis[0], dy = neck[1] - pelvis[1];
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len, ny = dx / len;
  const ticks = [];
  for (let i = 1; i <= 5; i++) {
    const t = 0.16 + (i / 6) * 0.72;
    const cx = pelvis[0] + dx * t, cy = pelvis[1] + dy * t, r = 5.5;
    ticks.push(<line key={i} x1={cx - nx * r} y1={cy - ny * r} x2={cx + nx * r} y2={cy + ny * r} stroke={SPINE_ACCENT} strokeWidth={3} strokeLinecap="round" />);
  }
  return <g opacity={0.92}>{ticks}</g>;
}

function Figure({ f, idx, paused, motion }: { f: FigureSpec; idx: number; paused?: boolean; motion?: Pose["motion"] }) {
  const isMover = motion?.figure === idx;
  const anim = paused
    ? undefined
    : isMover
      ? `bsRock ${motion?.period ?? 2.6}s ease-in-out infinite`
      : `bsBreath ${4.4 + idx * 0.5}s ease-in-out ${idx * 0.3}s infinite`;
  const vars = isMover ? ({ ["--rx" as string]: `${motion?.dx ?? 0}px`, ["--ry" as string]: `${motion?.dy ?? 0}px` }) : undefined;
  return (
    <g style={{ transformBox: "fill-box", transformOrigin: "center", animation: anim, ...vars }}>
      {layer(f, HALO, 13)}
      {layer(f, outlineFor(f.color), 5)}
      {layer(f, f.color, 0)}
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
        <style>{`@keyframes bsBreath{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-3px) scale(1.012)}}@keyframes bsRock{0%,100%{transform:translate(0,0)}50%{transform:translate(var(--rx,0),var(--ry,0))}}@media (prefers-reduced-motion:reduce){g{animation:none!important}}`}</style>

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
          <Figure key={`f${i}`} f={f} idx={i} paused={paused} motion={pose.motion} />
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
