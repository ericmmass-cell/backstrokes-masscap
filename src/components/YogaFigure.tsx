/**
 * Yoga-silhouette figures for the session player.
 *
 * Replaces the procedural Three.js rig with the same SVG language used
 * in the Position Intelligence Engine. Static-but-breathing: a single
 * SVG with a subtle scale-pulse animation so the screen does not feel
 * dead while the user holds.
 *
 * The cream-paper palette matches the rest of the app. Receiver is warm
 * ink. Partner, when present, is oxblood. No two figures touch in a way
 * that would read as erotic — these are exercise demonstrations.
 */

import type { CSSProperties } from "react";

const INK = "#3a342c";
const OX = "#722B2B";
const RULE = "rgba(42,38,32,0.22)";
const AMBER = "#8a6520";
const CREAM_GLOW = "rgba(138,101,32,0.14)";

type MoveKey =
  | "curl-up"
  | "side-plank"
  | "bird-dog"
  | "breath"
  | "reverse-kegel"
  | "decomp";

type Props = {
  moveKey: MoveKey;
  paused?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function YogaFigure({ moveKey, paused, className, style }: Props) {
  const breath = paused ? "" : "yoga-breathe";
  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
        background: `radial-gradient(ellipse at 30% 25%, ${CREAM_GLOW} 0%, transparent 55%), linear-gradient(160deg, rgba(42,38,32,0.04) 0%, rgba(214,202,176,0.45) 100%)`,
        ...style,
      }}
    >
      <svg
        viewBox="0 0 420 260"
        style={{ width: "100%", height: "100%", maxHeight: 360, display: "block" }}
        aria-label={`${moveKey} demonstration figure`}
      >
        <defs>
          <linearGradient id="yoga-mat" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(42,38,32,0.09)" />
            <stop offset="100%" stopColor="rgba(42,38,32,0.04)" />
          </linearGradient>
        </defs>

        {/* Mat */}
        <rect x="20" y="208" width="380" height="22" rx="3" fill="url(#yoga-mat)" stroke={RULE} strokeWidth="1" />
        <line x1="20" y1="210" x2="400" y2="210" stroke="rgba(42,38,32,0.40)" strokeWidth="1.5" />

        <g className={breath} style={{ transformOrigin: "center center" }}>
          {renderFigure(moveKey)}
        </g>
      </svg>

      <style>{`
        @keyframes yoga-breathe {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.015); opacity: 0.96; }
        }
        .yoga-breathe { animation: yoga-breathe 4.2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

function pillowEl(cx: number, cy: number, rx = 22, ry = 10, opacity = 0.22) {
  return (
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry}
      fill="#3a342c" fillOpacity={opacity}
      stroke="#3a342c" strokeOpacity={0.32} strokeWidth="1.2" />
  );
}

function motionArrowH(x1: number, y: number, x2: number, label?: string) {
  const dir = x2 > x1 ? 1 : -1;
  return (
    <g>
      <g style={{ animation: "yoga-pulse 2.4s ease-in-out infinite" }}>
        <line x1={x1} y1={y} x2={x2} y2={y} stroke={AMBER} strokeWidth="2" strokeLinecap="round" />
        <polyline points={`${x2 - 7 * dir},${y - 6} ${x2},${y} ${x2 - 7 * dir},${y + 6}`} stroke={AMBER} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {label && (
        <text x={(x1 + x2) / 2} y={y - 12} fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" fill={AMBER} opacity="0.85" textAnchor="middle" letterSpacing="1.8">{label}</text>
      )}
      <style>{`@keyframes yoga-pulse { 0%,100%{opacity:.5} 50%{opacity:1} }`}</style>
    </g>
  );
}

// --- figure renderers ----------------------------------------------------

function renderFigure(moveKey: MoveKey) {
  switch (moveKey) {
    case "curl-up":
      return (
        <g>
          {pillowEl(86, 198, 26, 10)}
          {/* Supine torso with curled head/shoulders */}
          <g stroke={INK} strokeWidth="2.4" strokeLinecap="round" fill="none">
            {/* Body lying flat */}
            <line x1="80" y1="196" x2="320" y2="196" />
            {/* Head + shoulders curled up ~20° */}
            <path d="M 80 196 Q 88 178 100 174" />
            <circle cx="104" cy="170" r="9" fill="#3a342c" fillOpacity="0.16" stroke={INK} strokeWidth="1.8" />
            {/* Bent knee */}
            <path d="M 250 196 L 270 158 L 290 196" />
            {/* Hands under lumbar */}
            <line x1="180" y1="196" x2="180" y2="208" />
            <line x1="200" y1="196" x2="200" y2="208" />
          </g>
          {/* Hold marker */}
          <text x="210" y="146" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" letterSpacing="1.8" fill={OX}>HOLD · 8 SEC</text>
        </g>
      );
    case "side-plank":
      return (
        <g>
          <g stroke={INK} strokeWidth="2.4" strokeLinecap="round" fill="none">
            {/* Diagonal body, forearm down */}
            <line x1="80" y1="100" x2="340" y2="200" />
            {/* Forearm */}
            <line x1="80" y1="100" x2="100" y2="180" />
            <line x1="100" y1="180" x2="140" y2="180" />
            {/* Knee bent (week 1) */}
            <line x1="340" y1="200" x2="310" y2="200" />
            {/* Head */}
            <circle cx="74" cy="94" r="9" fill="#3a342c" fillOpacity="0.16" stroke={INK} strokeWidth="1.8" />
          </g>
          <text x="220" y="84" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" letterSpacing="1.8" fill={OX}>RIBS STACKED · 8 SEC</text>
        </g>
      );
    case "bird-dog":
      return (
        <g>
          <g stroke={INK} strokeWidth="2.4" strokeLinecap="round" fill="none">
            {/* Quadruped torso */}
            <line x1="100" y1="160" x2="300" y2="160" />
            {/* Left arm and right knee (planted) */}
            <line x1="120" y1="160" x2="120" y2="200" />
            <line x1="280" y1="160" x2="280" y2="200" />
            {/* Opposite arm forward + opposite leg back (extended) */}
            <line x1="100" y1="160" x2="60" y2="130" />
            <line x1="300" y1="160" x2="350" y2="135" />
            {/* Head */}
            <circle cx="94" cy="156" r="8" fill="#3a342c" fillOpacity="0.16" stroke={INK} strokeWidth="1.8" />
          </g>
          {motionArrowH(360, 132, 388, "TRACE")}
          <text x="200" y="92" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" letterSpacing="1.8" fill={OX}>OPPOSITE ARM + LEG · NO LUMBAR SWAY</text>
        </g>
      );
    case "breath":
      return (
        <g>
          {pillowEl(86, 198, 26, 10)}
          <g stroke={INK} strokeWidth="2.4" strokeLinecap="round" fill="none">
            <line x1="80" y1="196" x2="320" y2="196" />
            <circle cx="80" cy="190" r="9" fill="#3a342c" fillOpacity="0.16" stroke={INK} strokeWidth="1.8" />
            {/* Knees bent */}
            <path d="M 240 196 L 264 152 L 288 196" />
            {/* Hands: ribs + belly */}
            <circle cx="170" cy="184" r="4" fill={OX} />
            <circle cx="200" cy="184" r="4" fill={OX} />
          </g>
          {/* Breath waveform above */}
          <g stroke={OX} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.85">
            <path d="M 110 120 Q 140 90 170 120 Q 200 150 230 120 Q 260 90 290 120 Q 320 150 340 120" />
          </g>
          <text x="220" y="78" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" letterSpacing="1.8" fill={OX}>INHALE 4 · HOLD 7 · EXHALE 8</text>
        </g>
      );
    case "reverse-kegel":
      return (
        <g>
          {pillowEl(86, 198, 26, 10)}
          <g stroke={INK} strokeWidth="2.4" strokeLinecap="round" fill="none">
            <line x1="80" y1="196" x2="320" y2="196" />
            <circle cx="80" cy="190" r="9" fill="#3a342c" fillOpacity="0.16" stroke={INK} strokeWidth="1.8" />
            <path d="M 240 196 L 264 152 L 288 196" />
          </g>
          {/* Floor drop indicator — downward chevron pulse from pelvis */}
          <g stroke={OX} strokeWidth="2.2" fill="none" strokeLinecap="round">
            <line x1="220" y1="196" x2="220" y2="226" opacity="0.5" />
            <polyline points="208,218 220,232 232,218" />
          </g>
          <text x="220" y="246" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" letterSpacing="1.8" fill={OX}>THE DROP IS THE REP</text>
        </g>
      );
    case "decomp":
      return (
        <g>
          {pillowEl(280, 198, 28, 10)}
          <g stroke={INK} strokeWidth="2.4" strokeLinecap="round" fill="none">
            <line x1="80" y1="196" x2="320" y2="196" />
            <circle cx="80" cy="190" r="9" fill="#3a342c" fillOpacity="0.16" stroke={INK} strokeWidth="1.8" />
            {/* Knees over pillow */}
            <path d="M 250 196 L 280 178 L 310 196" />
            {/* Arms overhead palms up */}
            <line x1="80" y1="196" x2="40" y2="166" />
          </g>
          <text x="200" y="90" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" letterSpacing="1.8" fill={OX}>SUPPORTED · BREATHE THROUGH IT</text>
        </g>
      );
    default:
      return null;
  }
}
