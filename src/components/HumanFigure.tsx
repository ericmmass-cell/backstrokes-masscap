/**
 * HumanFigure — anatomically articulated body silhouettes.
 *
 * Replaces the prior single-blob figures. Each body is composed from
 * separately-drawn parts (head, torso, upper arm, forearm, hand, thigh,
 * shin, foot) with proper joint articulation visible at elbows, knees,
 * hips, shoulders. Two-tone fills add depth (shadow side slightly
 * darker). The result reads as an anatomy-textbook illustration in the
 * cream-paper register, not as a wireframe or a tube.
 *
 * Side profile. Cream paper palette. Warm ink body, oxblood accents.
 */

import type { CSSProperties } from "react";

// Palette
const INK = "#3a342c";
const INK_SHADOW = "#2a261f";        // ~12% darker than INK, for shadow side
const INK_HIGHLIGHT = "#4a4338";      // ~12% lighter, for top side
const OX = "#722B2B";
const OX_GLOW = "rgba(114,43,43,0.25)";
const PILLOW = "rgba(58,52,44,0.20)";
const PILLOW_STROKE = "rgba(58,52,44,0.42)";
const PILLOW_SHADOW = "rgba(42,38,32,0.12)";
const MAT_GRAD = "rgba(42,38,32,0.09)";
const MAT_LINE = "rgba(42,38,32,0.45)";

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

export function HumanFigure({ moveKey, paused, className, style }: Props) {
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
        padding: "20px",
        background: `radial-gradient(ellipse at 30% 25%, rgba(138,101,32,0.12) 0%, transparent 55%), linear-gradient(160deg, rgba(42,38,32,0.04) 0%, rgba(214,202,176,0.45) 100%)`,
        ...style,
      }}
    >
      <svg
        viewBox="0 0 560 320"
        style={{ width: "100%", height: "100%", maxHeight: 400, display: "block" }}
        aria-label={`${moveKey} demonstration figure`}
      >
        <defs>
          <linearGradient id="hf-mat-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={MAT_GRAD} />
            <stop offset="100%" stopColor="rgba(42,38,32,0.04)" />
          </linearGradient>
          <radialGradient id="hf-pillow-grad" cx="0.5" cy="0.4" r="0.7">
            <stop offset="0%" stopColor="rgba(248,242,229,1)" />
            <stop offset="100%" stopColor="rgba(214,202,176,0.7)" />
          </radialGradient>
          <linearGradient id="hf-head-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={INK_HIGHLIGHT} />
            <stop offset="100%" stopColor={INK_SHADOW} />
          </linearGradient>
        </defs>

        {/* Floor / mat */}
        <Mat />

        <g className={paused ? "" : "hf-breathe"} style={{ transformOrigin: "center center" }}>
          {renderPose(moveKey)}
        </g>

        <Label moveKey={moveKey} />
      </svg>

      <style>{`
        @keyframes hf-breathe {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.012); opacity: 0.97; }
        }
        .hf-breathe { animation: hf-breathe 4.6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────
   SCENE PRIMITIVES
   ─────────────────────────────────────────────────────────────────── */

function Mat() {
  return (
    <g>
      {/* Subtle floor shadow under mat */}
      <ellipse cx="280" cy="278" rx="240" ry="6" fill="rgba(42,38,32,0.10)" />
      <rect x="40" y="260" width="480" height="22" rx="4" fill="url(#hf-mat-grad)" stroke="rgba(42,38,32,0.22)" strokeWidth="1" />
      <line x1="40" y1="264" x2="520" y2="264" stroke={MAT_LINE} strokeWidth="1.5" />
      {/* Mat texture lines */}
      <path d="M 60 268 Q 140 270 220 268 T 380 268 T 510 268" stroke="rgba(42,38,32,0.18)" strokeWidth="0.6" fill="none" />
    </g>
  );
}

function Pillow({ cx, cy, rx = 28, ry = 9 }: { cx: number; cy: number; rx?: number; ry?: number }) {
  return (
    <g>
      {/* Drop shadow under pillow */}
      <ellipse cx={cx} cy={cy + ry - 2} rx={rx + 2} ry={ry * 0.4} fill={PILLOW_SHADOW} />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#hf-pillow-grad)" stroke={PILLOW_STROKE} strokeWidth="1.2" />
    </g>
  );
}

/* ───────────────────────────────────────────────────────────────────
   BODY PART PRIMITIVES — each is a separate filled path so joints
   articulate properly when overlapping. Two-tone via base + shadow.
   ─────────────────────────────────────────────────────────────────── */

function Head({ cx, cy, r = 16 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      {/* Subtle head shadow under chin/ear */}
      <ellipse cx={cx + r * 0.15} cy={cy + r * 0.3} rx={r * 0.95} ry={r * 0.95} fill={INK_SHADOW} />
      {/* Main head — slightly egg-shaped */}
      <ellipse cx={cx} cy={cy} rx={r} ry={r * 1.08} fill="url(#hf-head-grad)" />
      {/* Small chin/jaw line */}
      <path
        d={`M ${cx - r * 0.55} ${cy + r * 0.55} Q ${cx} ${cy + r * 1.05} ${cx + r * 0.55} ${cy + r * 0.55}`}
        fill="none" stroke={INK_SHADOW} strokeWidth="0.8" opacity="0.5"
      />
    </g>
  );
}

/**
 * Torso — supine (lying flat) with optional curl. The "curl" parameter
 * (0–1) controls how much the chest/shoulders are lifted off the
 * floor, used for the curl-up move.
 */
function TorsoSupine({
  x,
  y,
  scaleX = 1,
  curl = 0,
}: {
  x: number;
  y: number;
  scaleX?: number;
  curl?: number;
}) {
  // y = floor line for the back. Curl raises the chest end (left side).
  const w = 220;
  const liftY = -curl * 38;
  const shoulderY = y + liftY;
  return (
    <g transform={`translate(${x},0)`}>
      {/* Shadow on the underside of torso (between torso and mat) */}
      <path
        fill={INK_SHADOW}
        opacity="0.45"
        d={`
          M ${0} ${y + 24}
          Q ${w * 0.5} ${y + 28}, ${w} ${y + 24}
          L ${w} ${y + 30}
          Q ${w * 0.5} ${y + 34}, ${0} ${y + 30}
          Z
        `}
      />
      {/* Main torso shape — wider at chest, narrower at waist, wider at hips */}
      <path
        fill={INK}
        d={`
          M ${0} ${shoulderY + 8}
          C ${-4} ${shoulderY - 10}, ${10} ${shoulderY - 18}, ${28} ${shoulderY - 16}
          C ${50} ${shoulderY - 14}, ${66} ${shoulderY - 6 * (1 - curl)}, ${78} ${shoulderY + 6}
          C ${100} ${y + 16}, ${130} ${y + 14}, ${160} ${y + 12}
          C ${185} ${y + 12}, ${205} ${y + 16}, ${w} ${y + 22}
          C ${w + 8} ${y + 24}, ${w + 4} ${y + 34}, ${w - 6} ${y + 36}
          C ${190} ${y + 38}, ${160} ${y + 36}, ${130} ${y + 34}
          C ${100} ${y + 32}, ${78} ${y + 30}, ${60} ${y + 30}
          C ${42} ${y + 30}, ${22} ${y + 28}, ${10} ${y + 28}
          C ${0} ${y + 28}, ${-4} ${y + 22}, ${0} ${shoulderY + 8}
          Z
        `}
        style={{ transform: scaleX === -1 ? `scale(-1, 1) translate(-${w}px, 0)` : undefined }}
      />
      {/* Highlight on top of chest */}
      <path
        fill={INK_HIGHLIGHT}
        opacity="0.5"
        d={`
          M ${20} ${shoulderY - 8}
          Q ${50} ${shoulderY - 14}, ${78} ${shoulderY + 2}
          Q ${100} ${y + 8}, ${140} ${y + 8}
          Q ${100} ${y + 14}, ${78} ${y + 10}
          Q ${50} ${shoulderY - 4}, ${20} ${shoulderY - 2}
          Z
        `}
      />
    </g>
  );
}

/**
 * Limb — a tapered segment with rounded joint ends, useful for arms
 * and legs at any rotation. Drawn from (x1,y1) to (x2,y2) with the
 * specified widths at each end.
 */
function Limb({
  x1, y1, x2, y2, w1 = 16, w2 = 14, shadow = false,
}: {
  x1: number; y1: number; x2: number; y2: number;
  w1?: number; w2?: number; shadow?: boolean;
}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return null;
  // Perpendicular unit vector for thickness
  const nx = -dy / len;
  const ny = dx / len;
  // Corners of the tapered rectangle
  const ax1 = x1 + nx * w1, ay1 = y1 + ny * w1;
  const ax2 = x1 - nx * w1, ay2 = y1 - ny * w1;
  const bx1 = x2 + nx * w2, by1 = y2 + ny * w2;
  const bx2 = x2 - nx * w2, by2 = y2 - ny * w2;
  // Slightly tucked joint endpoints (for smoother curves)
  return (
    <g>
      {/* Rounded joint caps */}
      <circle cx={x1} cy={y1} r={w1} fill={shadow ? INK_SHADOW : INK} />
      <circle cx={x2} cy={y2} r={w2} fill={shadow ? INK_SHADOW : INK} />
      {/* Tapered body */}
      <path
        fill={shadow ? INK_SHADOW : INK}
        d={`M ${ax1} ${ay1} L ${bx1} ${by1} L ${bx2} ${by2} L ${ax2} ${ay2} Z`}
      />
    </g>
  );
}

function Hand({ cx, cy, r = 9 }: { cx: number; cy: number; r?: number }) {
  return <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.85} fill={INK} />;
}

function Foot({ cx, cy, w = 22, h = 9 }: { cx: number; cy: number; w?: number; h?: number }) {
  return <ellipse cx={cx} cy={cy} rx={w / 2} ry={h / 2} fill={INK} />;
}

/* ───────────────────────────────────────────────────────────────────
   POSE COMPOSITIONS
   ─────────────────────────────────────────────────────────────────── */

function renderPose(moveKey: MoveKey) {
  switch (moveKey) {
    case "curl-up":      return <PoseCurlUp />;
    case "side-plank":   return <PoseSidePlank />;
    case "bird-dog":     return <PoseBirdDog />;
    case "breath":       return <PoseBreath />;
    case "reverse-kegel": return <PoseReverseKegel />;
    case "decomp":       return <PoseDecomp />;
  }
}

function PoseCurlUp() {
  // Lying on back, chest curled up ~20°. Left knee bent up, right leg straight.
  // Floor line: y=252. Head left, feet right.
  const floor = 252;
  const torsoX = 110;
  const torsoTop = floor - 24;
  return (
    <g>
      <Pillow cx={140} cy={floor + 4} rx={30} ry={8} />

      {/* Straight (back) leg — under */}
      <Limb x1={340} y1={floor - 6} x2={430} y2={floor - 4} w1={20} w2={16} shadow />
      <Foot cx={438} cy={floor - 4} w={20} h={9} />

      {/* Torso (supine, chest lifted) */}
      <TorsoSupine x={torsoX} y={torsoTop} curl={0.55} />

      {/* Bent (front) knee — thigh up, shin down */}
      {/* Thigh: hip (330,238) to knee (360,200) */}
      <Limb x1={330} y1={floor - 14} x2={362} y2={floor - 60} w1={22} w2={18} />
      {/* Shin: knee (362,192) to foot (388,254) */}
      <Limb x1={362} y1={floor - 60} x2={392} y2={floor - 8} w1={18} w2={15} />
      <Foot cx={394} cy={floor - 4} w={22} h={9} />

      {/* Far arm tucked under — visible as shadow under torso */}
      <ellipse cx={230} cy={floor - 18} rx={32} ry={6} fill={INK_SHADOW} opacity="0.55" />

      {/* Near arm — bent, hand tucked under lumbar */}
      <Limb x1={130} y1={floor - 54} x2={170} y2={floor - 32} w1={14} w2={12} />
      <Limb x1={170} y1={floor - 32} x2={220} y2={floor - 22} w1={12} w2={10} />
      <Hand cx={222} cy={floor - 20} r={8} />

      {/* Head — lifted, chin tucked toward chest */}
      <Head cx={140} cy={floor - 78} r={16} />

      {/* 20° curl indicator arc — faint reference */}
      <path
        d={`M 120 ${floor - 5} A 80 80 0 0 0 200 ${floor - 25}`}
        fill="none" stroke={OX} strokeWidth="1.2" strokeDasharray="2 3" opacity="0.4"
      />
      <text x="210" y={floor - 28} fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" letterSpacing="1.5" fill={OX} opacity="0.7">20°</text>
    </g>
  );
}

function PoseSidePlank() {
  // Diagonal body, forearm down, knees bent (week 1).
  const floor = 252;
  return (
    <g>
      {/* Knees down */}
      <Limb x1={400} y1={floor - 6} x2={340} y2={floor - 70} w1={22} w2={20} />
      {/* Foot at floor */}
      <Foot cx={406} cy={floor - 4} w={22} h={9} />

      {/* Diagonal torso from hip (340, 180) up to shoulder (170, 90) */}
      {/* Hip-to-shoulder spine line via two limbs (back + chest) */}
      <Limb x1={340} y1={floor - 72} x2={172} y2={floor - 162} w1={32} w2={28} />

      {/* Top arm extended up */}
      <Limb x1={170} y1={floor - 158} x2={170} y2={floor - 220} w1={14} w2={11} />
      <Hand cx={170} cy={floor - 226} r={9} />

      {/* Supporting forearm — vertical from shoulder down to floor */}
      {/* Upper arm: shoulder (172, 92) to elbow (160, 160) */}
      <Limb x1={172} y1={floor - 162} x2={154} y2={floor - 90} w1={14} w2={13} />
      {/* Forearm: elbow (154, 160) down to floor (138, 250) */}
      <Limb x1={154} y1={floor - 90} x2={140} y2={floor - 6} w1={13} w2={13} />
      {/* Hand/forearm flat on floor */}
      <ellipse cx={130} cy={floor - 4} rx={32} ry={8} fill={INK} />

      {/* Head — slight forward tilt */}
      <Head cx={186} cy={floor - 184} r={15} />
    </g>
  );
}

function PoseBirdDog() {
  // Quadruped. Supporting left arm and right knee (both into floor).
  // Extended: right arm forward, left leg back.
  const floor = 252;
  const backY = floor - 80;
  return (
    <g>
      {/* Extended back leg — going up and back to right */}
      <Limb x1={400} y1={backY + 6} x2={490} y2={backY - 14} w1={22} w2={18} />
      <Foot cx={500} cy={backY - 16} w={22} h={9} />

      {/* Horizontal torso from shoulder (150, 172) to hip (400, 174) */}
      {/* Use two limbs to give shoulder/hip slight curvature */}
      <Limb x1={150} y1={backY} x2={400} y2={backY + 2} w1={30} w2={32} />

      {/* Supporting knee + shin down to floor */}
      <Limb x1={380} y1={backY + 16} x2={372} y2={floor - 6} w1={22} w2={18} />
      <Foot cx={378} cy={floor - 4} w={22} h={9} />

      {/* Supporting arm: from shoulder down to floor */}
      <Limb x1={170} y1={backY + 14} x2={162} y2={floor - 8} w1={14} w2={12} />
      <Hand cx={158} cy={floor - 4} r={10} />

      {/* Extended forward arm — reaching forward and slightly up */}
      <Limb x1={150} y1={backY - 4} x2={80} y2={backY - 30} w1={14} w2={12} />
      <Limb x1={80} y1={backY - 30} x2={30} y2={backY - 38} w1={12} w2={10} />
      <Hand cx={26} cy={backY - 38} r={9} />

      {/* Head — looking forward, neutral neck */}
      <Head cx={138} cy={backY - 22} r={15} />

      {/* Trace-square indicator at extended foot */}
      <rect x={486} y={backY - 28} width={28} height={28} fill="none" stroke={OX} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      <text x={500} y={backY - 36} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" letterSpacing="1.4" fill={OX} opacity="0.7">TRACE</text>
    </g>
  );
}

function PoseBreath() {
  // Supine flat, knees bent, hands on ribs + belly.
  const floor = 252;
  return (
    <g>
      <Pillow cx={140} cy={floor + 4} rx={30} ry={8} />

      {/* Bent knees */}
      <Limb x1={340} y1={floor - 14} x2={372} y2={floor - 72} w1={22} w2={18} />
      <Limb x1={372} y1={floor - 72} x2={400} y2={floor - 8} w1={18} w2={15} />
      <Foot cx={406} cy={floor - 4} w={22} h={9} />

      {/* Back leg slightly behind */}
      <Limb x1={336} y1={floor - 12} x2={368} y2={floor - 68} w1={20} w2={16} shadow />
      <Limb x1={368} y1={floor - 68} x2={388} y2={floor - 8} w1={16} w2={13} shadow />

      {/* Supine torso */}
      <TorsoSupine x={110} y={floor - 22} curl={0} />

      {/* Hands on body — one on ribs, one on belly */}
      <Hand cx={205} cy={floor - 36} r={11} />
      <Hand cx={260} cy={floor - 30} r={11} />

      {/* Head */}
      <Head cx={138} cy={floor - 30} r={16} />

      {/* Breath waveform above body */}
      <g stroke={OX} strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.85">
        <path d="M 100 140 Q 160 100 220 140 Q 280 180 340 140 Q 400 100 460 140" />
      </g>
      <circle cx={460} cy={140} r={4} fill={OX} />
    </g>
  );
}

function PoseReverseKegel() {
  // Same supine as breath, but with floor-drop arrow at pelvis
  const floor = 252;
  return (
    <g>
      <Pillow cx={140} cy={floor + 4} rx={30} ry={8} />

      {/* Knees bent */}
      <Limb x1={340} y1={floor - 14} x2={372} y2={floor - 72} w1={22} w2={18} />
      <Limb x1={372} y1={floor - 72} x2={400} y2={floor - 8} w1={18} w2={15} />
      <Foot cx={406} cy={floor - 4} w={22} h={9} />
      <Limb x1={336} y1={floor - 12} x2={368} y2={floor - 68} w1={20} w2={16} shadow />
      <Limb x1={368} y1={floor - 68} x2={388} y2={floor - 8} w1={16} w2={13} shadow />

      <TorsoSupine x={110} y={floor - 22} curl={0} />

      {/* One hand on belly */}
      <Hand cx={250} cy={floor - 32} r={11} />

      <Head cx={138} cy={floor - 30} r={16} />

      {/* Floor-drop arrow at pelvis — pulse down */}
      <g stroke={OX} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <line x1={300} y1={floor + 6} x2={300} y2={floor + 36} />
        <polyline points={`${288},${floor + 22} ${300},${floor + 40} ${312},${floor + 22}`} />
      </g>
      <circle cx={300} cy={floor + 50} r={10} fill="none" stroke={OX} strokeWidth="1.5" opacity="0.5" />
      <circle cx={300} cy={floor + 50} r={14} fill="none" stroke={OX} strokeWidth="1" opacity="0.3" />
    </g>
  );
}

function PoseDecomp() {
  // Supine, knees over pillow, arms overhead palms up.
  const floor = 252;
  return (
    <g>
      <Pillow cx={140} cy={floor + 4} rx={30} ry={8} />
      <Pillow cx={380} cy={floor - 24} rx={40} ry={11} />

      {/* Both legs draped over pillow — symmetric */}
      <Limb x1={340} y1={floor - 18} x2={380} y2={floor - 50} w1={22} w2={20} />
      <Limb x1={380} y1={floor - 50} x2={430} y2={floor - 18} w1={20} w2={18} />
      <Foot cx={432} cy={floor - 16} w={20} h={9} />
      <Limb x1={336} y1={floor - 16} x2={376} y2={floor - 48} w1={20} w2={18} shadow />
      <Limb x1={376} y1={floor - 48} x2={420} y2={floor - 16} w1={18} w2={16} shadow />

      <TorsoSupine x={110} y={floor - 22} curl={0} />

      {/* Arms reaching back overhead from shoulders */}
      <Limb x1={120} y1={floor - 38} x2={70} y2={floor - 60} w1={14} w2={12} />
      <Limb x1={70} y1={floor - 60} x2={20} y2={floor - 78} w1={12} w2={10} />
      <Hand cx={16} cy={floor - 80} r={9} />

      {/* Slightly back/shadow arm */}
      <Limb x1={118} y1={floor - 34} x2={74} y2={floor - 56} w1={13} w2={11} shadow />
      <Limb x1={74} y1={floor - 56} x2={26} y2={floor - 74} w1={11} w2={10} shadow />

      <Head cx={138} cy={floor - 30} r={16} />
    </g>
  );
}

function Label({ moveKey }: { moveKey: MoveKey }) {
  const labels: Record<MoveKey, string> = {
    "curl-up": "HOLD · 8 SEC · 20° ONLY",
    "side-plank": "RIBS STACKED · HOLD 8 SEC",
    "bird-dog": "OPPOSITE ARM + LEG · NO LUMBAR SWAY",
    breath: "INHALE 4 · HOLD 7 · EXHALE 8",
    "reverse-kegel": "THE DROP IS THE REP",
    decomp: "BREATHE THROUGH IT · 90 SEC",
  };
  return (
    <text
      x="280"
      y="308"
      textAnchor="middle"
      fontFamily="Inter, sans-serif"
      fontSize="11"
      fontWeight="600"
      letterSpacing="2.2"
      fill={OX}
    >
      {labels[moveKey]}
    </text>
  );
}

// Re-export deprecated names if anything imports them
export {};
