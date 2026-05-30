/**
 * AnimatedExercise — real, looping motion studies for the five rehab moves.
 *
 * The static Pk0001 illustrations looked like people but did not
 * demonstrate anything: the screen said "looping" while the figure sat
 * still. These are hand-authored inline SVGs where the moving body part
 * actually articulates around its real joint, on a loop, honoring the
 * paused state and prefers-reduced-motion.
 *
 * Style register (approved on curl-up): solid filled oxblood body masses
 * on cream paper, a slim gold mat, a soft grounding shadow, a generous
 * head — a confident pictogram, not a stick figure, not a 3D blob.
 *
 * Each figure pins the parts that should not move (per McGill spine
 * mechanics) and articulates only the working segment around its true
 * joint:
 *   curl-up      — upper spine curls at the waist; lumbar + pelvis pinned
 *   side-plank   — rigid body lifts at the down elbow
 *   bird-dog     — far arm reaches forward + far leg reaches back
 *   dead bug     — one arm lowers overhead + opposite leg extends
 *   glute bridge — pelvis peels up off the mat from the shoulders
 */

import type { CSSProperties } from "react";
import type { PictogramKey } from "./Pictogram";

export const ANIMATED_KEYS = new Set<PictogramKey>([
  "curl-up",
  "side-plank",
  "bird-dog",
  "breath", // Dead bug
  "decomp", // Glute bridge
]);

const PAPER = "#F4EFE3";
const OX = "#722B2B"; // oxblood — primary body
const OXD = "#5e2222"; // deep oxblood — far/active limbs, depth
const MAT = "#e2c452";
const MAT_EDGE = "#c0a338";
const RULE = "rgba(42,38,32,0.22)";
const MUTED = "rgba(42,38,32,0.55)";
const FAINT = "rgba(42,38,32,0.40)";
const SHADOW = "rgba(42,38,32,0.10)";

/* Shared floor: soft shadow + slim isometric gold mat. */
function Mat() {
  return (
    <>
      <ellipse cx="248" cy="258" rx="178" ry="11" fill={SHADOW} />
      <polygon points="104,250 404,250 430,268 130,268" fill={MAT} />
      <polygon points="130,268 430,268 430,282 130,282" fill={MAT_EDGE} />
      <line x1="104" y1="250" x2="404" y2="250" stroke={RULE} strokeWidth="1.1" />
    </>
  );
}

const CSS = `
/* ---- curl-up: upper spine curls at the waist ---- */
@keyframes bsCurl {
  0% { transform: rotate(2deg); } 26% { transform: rotate(15deg); }
  58% { transform: rotate(15deg); } 84% { transform: rotate(2deg); }
  100% { transform: rotate(2deg); }
}
.bs-curl-mover { transform-box: view-box; transform-origin: 244px 244px; transform: rotate(11deg); }
.bs-run .bs-curl-mover { animation: bsCurl 3.8s ease-in-out infinite; }

/* ---- side plank: hips lift to straighten the line, then dip
       (pivot at the shoulder; the forearm + head stay planted) ---- */
@keyframes bsPlank {
  0% { transform: rotate(0deg); } 28% { transform: rotate(13deg); }
  60% { transform: rotate(13deg); } 86% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}
.bs-plank-mover { transform-box: view-box; transform-origin: 214px 198px; transform: rotate(7deg); }
.bs-run .bs-plank-mover { animation: bsPlank 4.2s ease-in-out infinite; }

/* ---- bird dog: far arm forward + far leg back ---- */
@keyframes bsDogArm {
  0% { transform: rotate(40deg); } 24% { transform: rotate(0deg); }
  60% { transform: rotate(0deg); } 84% { transform: rotate(40deg); }
  100% { transform: rotate(40deg); }
}
@keyframes bsDogLeg {
  0% { transform: rotate(50deg); } 24% { transform: rotate(0deg); }
  60% { transform: rotate(0deg); } 84% { transform: rotate(50deg); }
  100% { transform: rotate(50deg); }
}
.bs-dog-arm { transform-box: view-box; transform-origin: 196px 204px; transform: rotate(18deg); }
.bs-dog-leg { transform-box: view-box; transform-origin: 300px 204px; transform: rotate(22deg); }
.bs-run .bs-dog-arm { animation: bsDogArm 4.2s ease-in-out infinite; }
.bs-run .bs-dog-leg { animation: bsDogLeg 4.2s ease-in-out infinite; }

/* ---- dead bug: far arm reaches overhead + far leg extends out (the
       resting pose IS the extended frame, the recognizable dead-bug shape) ---- */
@keyframes bsBugArm {
  0% { transform: rotate(-96deg); } 32% { transform: rotate(0deg); }
  56% { transform: rotate(0deg); } 88% { transform: rotate(-96deg); }
  100% { transform: rotate(-96deg); }
}
@keyframes bsBugLeg {
  0% { transform: rotate(100deg); } 32% { transform: rotate(0deg); }
  56% { transform: rotate(0deg); } 88% { transform: rotate(100deg); }
  100% { transform: rotate(100deg); }
}
.bs-bug-arm { transform-box: view-box; transform-origin: 158px 236px; transform: rotate(-96deg); }
.bs-bug-leg { transform-box: view-box; transform-origin: 252px 240px; transform: rotate(100deg); }
.bs-run .bs-bug-arm { animation: bsBugArm 4.4s ease-in-out infinite; }
.bs-run .bs-bug-leg { animation: bsBugLeg 4.4s ease-in-out infinite; }

/* ---- glute bridge: pelvis peels up from the shoulders ---- */
@keyframes bsBridge {
  0% { transform: rotate(0deg); } 28% { transform: rotate(-15deg); }
  60% { transform: rotate(-15deg); } 86% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}
.bs-bridge-mover { transform-box: view-box; transform-origin: 330px 250px; transform: rotate(-8deg); }
.bs-run .bs-bridge-mover { animation: bsBridge 4s ease-in-out infinite; }

/* arcs visible only while running */
.bs-arc { opacity: 0; transition: opacity 300ms ease; }
.bs-run .bs-arc { opacity: 0.4; }

@media (prefers-reduced-motion: reduce) {
  .bs-run .bs-curl-mover, .bs-run .bs-plank-mover, .bs-run .bs-dog-arm,
  .bs-run .bs-dog-leg, .bs-run .bs-bug-arm, .bs-run .bs-bug-leg,
  .bs-run .bs-bridge-mover { animation: none; }
}
`;

type FigProps = { paused: boolean };

function svgProps(paused: boolean, label: string) {
  return {
    viewBox: "0 0 480 360",
    xmlns: "http://www.w3.org/2000/svg",
    role: "img" as const,
    "aria-label": label,
    className: paused ? "bs-fig" : "bs-fig bs-run",
    style: { position: "absolute", inset: 0, width: "100%", height: "100%" } as CSSProperties,
  };
}

/* ============================ CURL-UP ============================ */
function CurlUp({ paused }: FigProps) {
  return (
    <svg {...svgProps(paused, "Curl-up: from lying flat with knees bent, the shoulder blades lift a small amount off the mat, hold, then lower. The lumbar stays neutral; this is not a sit-up.")}>
      <rect width="480" height="360" fill={PAPER} />
      <Mat />
      <path className="bs-arc" d="M 150 214 A 96 96 0 0 1 182 180" fill="none" stroke={OX} strokeWidth="2" strokeDasharray="3 7" strokeLinecap="round" />
      {/* static: far leg, pelvis, near bent leg */}
      <g>
        <path d="M 280 248 L 384 250" stroke={OXD} strokeWidth="18" strokeLinecap="round" />
        <path d="M 382 250 L 400 247" stroke={OXD} strokeWidth="11" strokeLinecap="round" />
        <path d="M 244 230 C 268 227 291 231 300 240 C 306 248 301 257 289 259 C 267 261 250 259 244 256 Z" fill={OX} />
        <path d="M 286 246 L 322 182" stroke={OX} strokeWidth="28" strokeLinecap="round" />
        <path d="M 322 184 L 350 248" stroke={OX} strokeWidth="23" strokeLinecap="round" />
        <circle cx="322" cy="183" r="13.5" fill={OX} />
        <path d="M 348 250 L 382 250" stroke={OX} strokeWidth="13" strokeLinecap="round" />
      </g>
      {/* moving: chest + neck + head + near arm, pivot at the waist */}
      <g className="bs-curl-mover">
        <path d="M 178 222 C 210 219 240 222 250 230 L 250 256 C 240 259 208 259 182 257 C 167 255 165 227 178 222 Z" fill={OX} />
        <path d="M 176 234 L 158 230" stroke={OX} strokeWidth="18" strokeLinecap="round" />
        <circle cx="140" cy="226" r="22" fill={OX} />
        <path d="M 188 240 L 216 256 L 246 250" stroke={OXD} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="247" cy="250" r="5.5" fill={OXD} />
      </g>
    </svg>
  );
}

/* ============================ SIDE PLANK ============================ */
/* Drawn so the recognizable triangle reads: forearm planted on the mat,
   upper arm rising to the shoulder, the body a diagonal down to the
   knees, top arm raised to the ceiling. The hips lift and lower. */
function SidePlank({ paused }: FigProps) {
  return (
    <svg {...svgProps(paused, "Side plank from the knees: propped on one forearm with the top arm raised, the hips lift so the body makes one straight line from shoulder to knee, hold, then lower. The hips stay stacked, not rolled forward.")}>
      <rect width="480" height="360" fill={PAPER} />
      <Mat />
      <path className="bs-arc" d="M 300 236 A 80 80 0 0 1 312 206" fill="none" stroke={OX} strokeWidth="2" strokeDasharray="3 7" strokeLinecap="round" />
      {/* STATIC: planted forearm, upper arm up to the shoulder, head,
          raised top arm — everything above the shoulder pivot stays put */}
      <g>
        {/* forearm flat on the mat */}
        <path d="M 150 250 L 206 250" stroke={OXD} strokeWidth="15" strokeLinecap="round" />
        <circle cx="148" cy="250" r="7" fill={OXD} />
        {/* upper arm: elbow up to shoulder */}
        <path d="M 206 250 L 214 200" stroke={OX} strokeWidth="17" strokeLinecap="round" />
        {/* head, just past the shoulder */}
        <circle cx="200" cy="182" r="19" fill={OX} />
        {/* top arm raised toward the ceiling — the unmistakable side-plank cue */}
        <path d="M 214 200 L 232 142" stroke={OX} strokeWidth="14" strokeLinecap="round" />
        <circle cx="234" cy="139" r="6.5" fill={OX} />
      </g>
      {/* MOVING: torso → hip → thigh → knee → shin, swung at the shoulder.
          The open space beneath the diagonal torso is the triangle. */}
      <g className="bs-plank-mover">
        {/* torso: shoulder down to hip */}
        <path d="M 214 200 C 244 206 276 216 300 228 C 308 233 305 244 295 244 C 268 240 236 224 210 212 C 202 206 206 199 214 200 Z" fill={OX} />
        {/* hip block */}
        <ellipse cx="300" cy="236" rx="18" ry="13" fill={OX} />
        {/* thigh down to the knee on the mat */}
        <path d="M 300 236 L 344 250" stroke={OX} strokeWidth="25" strokeLinecap="round" />
        {/* knee + shin folded back along the mat (from-the-knees regression) */}
        <circle cx="346" cy="250" r="12" fill={OX} />
        <path d="M 346 250 L 392 256" stroke={OXD} strokeWidth="19" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* ============================ BIRD DOG ============================ */
function BirdDog({ paused }: FigProps) {
  return (
    <svg {...svgProps(paused, "Bird-dog on hands and knees: the opposite arm reaches forward and the opposite leg reaches straight back to hip height, holds, then returns. The spine stays still and level.")}>
      <rect width="480" height="360" fill={PAPER} />
      <Mat />
      {/* arcs */}
      <path className="bs-arc" d="M 150 232 A 60 60 0 0 1 120 200" fill="none" stroke={OX} strokeWidth="2" strokeDasharray="3 7" strokeLinecap="round" />
      <path className="bs-arc" d="M 330 232 A 60 60 0 0 0 372 206" fill="none" stroke={OX} strokeWidth="2" strokeDasharray="3 7" strokeLinecap="round" />
      {/* moving far limbs (drawn first so support limbs overlap them) */}
      <g className="bs-dog-arm">
        <path d="M 196 204 L 126 196" stroke={OXD} strokeWidth="13" strokeLinecap="round" />
        <circle cx="123" cy="196" r="6" fill={OXD} />
      </g>
      <g className="bs-dog-leg">
        <path d="M 300 204 L 384 202" stroke={OXD} strokeWidth="14" strokeLinecap="round" />
        <circle cx="386" cy="202" r="6.5" fill={OXD} />
      </g>
      {/* static support: near arm, back, head, near leg */}
      <g>
        {/* near support arm */}
        <path d="M 192 206 L 186 250" stroke={OX} strokeWidth="18" strokeLinecap="round" />
        <circle cx="186" cy="251" r="7" fill={OX} />
        {/* back / torso bar */}
        <path d="M 196 190 C 236 186 270 186 302 190 L 302 214 C 270 218 236 218 196 214 C 184 210 184 195 196 190 Z" fill={OX} />
        {/* head + neck forward */}
        <path d="M 196 200 L 178 197" stroke={OX} strokeWidth="15" strokeLinecap="round" />
        <circle cx="164" cy="194" r="18" fill={OX} />
        {/* near support leg */}
        <path d="M 300 206 L 300 250" stroke={OX} strokeWidth="20" strokeLinecap="round" />
        <circle cx="300" cy="251" r="7.5" fill={OX} />
        <path d="M 300 251 L 326 251" stroke={OX} strokeWidth="13" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* ============================ DEAD BUG ============================ */
/* Supine, head LEFT. The "held" pair stays in tabletop (arm vertical,
   leg bent knee-over-hip). The "working" pair (deep tone) reaches away:
   arm back overhead, opposite leg straight out low — the classic
   dead-bug silhouette — then returns to vertical and repeats. */
function DeadBug({ paused }: FigProps) {
  return (
    <svg {...svgProps(paused, "Dead bug: lying on the back with the knees stacked over the hips and the arms reaching up, one arm lowers back overhead while the opposite leg extends straight out low, slowly, then both return. The lower back stays pinned to the mat the whole time.")}>
      <rect width="480" height="360" fill={PAPER} />
      <Mat />
      {/* supine torso on the mat */}
      <g>
        <circle cx="120" cy="240" r="18" fill={OX} />
        <path d="M 138 231 C 176 228 218 231 252 236 L 252 250 C 218 252 176 252 138 249 C 128 244 128 236 138 231 Z" fill={OX} />
        <ellipse cx="252" cy="242" rx="17" ry="13" fill={OX} />
      </g>
      {/* HELD pair — tabletop. Arm vertical; leg bent (thigh up, shin over). */}
      <g>
        <path d="M 150 234 L 150 176" stroke={OX} strokeWidth="13" strokeLinecap="round" />
        <circle cx="150" cy="174" r="6" fill={OX} />
        <path d="M 250 238 L 250 182" stroke={OX} strokeWidth="20" strokeLinecap="round" />
        <path d="M 250 182 L 300 178" stroke={OX} strokeWidth="17" strokeLinecap="round" />
        <circle cx="303" cy="178" r="7.5" fill={OX} />
      </g>
      {/* WORKING arm (deep) — pivots at the shoulder, reaches back overhead.
          Drawn pointing UP; CSS rotates it to -96° (flat over the head). */}
      <g className="bs-bug-arm">
        <path d="M 158 236 L 158 176" stroke={OXD} strokeWidth="13" strokeLinecap="round" />
        <circle cx="158" cy="174" r="6" fill={OXD} />
      </g>
      {/* WORKING leg (deep) — pivots at the hip, extends straight out low.
          Drawn pointing UP; CSS rotates it to 100° (out to the right). */}
      <g className="bs-bug-leg">
        <path d="M 252 240 L 252 168" stroke={OXD} strokeWidth="16" strokeLinecap="round" />
        <circle cx="252" cy="166" r="7.5" fill={OXD} />
      </g>
    </svg>
  );
}

/* ============================ GLUTE BRIDGE ============================ */
function GluteBridge({ paused }: FigProps) {
  return (
    <svg {...svgProps(paused, "Glute bridge: lying on the back with knees bent and feet flat, the hips drive up until shoulder, hip, and knee stack in one line, hold, then lower one vertebra at a time. The shoulders and feet stay planted.")}>
      <rect width="480" height="360" fill={PAPER} />
      <Mat />
      <path className="bs-arc" d="M 250 238 A 60 60 0 0 1 268 206" fill="none" stroke={OX} strokeWidth="2" strokeDasharray="3 7" strokeLinecap="round" />
      {/* static: head, shoulders/upper back on the mat, planted feet + shins */}
      <g>
        <circle cx="112" cy="240" r="18" fill={OX} />
        <path d="M 130 232 C 158 229 188 231 210 236 L 210 250 C 188 252 158 252 132 250 C 122 244 121 237 130 232 Z" fill={OX} />
        {/* planted feet + shins up to knees */}
        <path d="M 316 250 L 350 250" stroke={OXD} strokeWidth="13" strokeLinecap="round" />
        <path d="M 330 250 L 300 206" stroke={OX} strokeWidth="22" strokeLinecap="round" />
        <circle cx="300" cy="205" r="11" fill={OX} />
      </g>
      {/* moving: lower torso + pelvis + thigh peel up, pivot near the feet */}
      <g className="bs-bridge-mover">
        <path d="M 200 236 C 226 232 250 234 264 240 L 262 252 C 240 254 214 252 200 250 C 192 246 192 240 200 236 Z" fill={OX} />
        <ellipse cx="262" cy="241" rx="18" ry="13" fill={OX} />
        <path d="M 262 240 L 300 206" stroke={OX} strokeWidth="26" strokeLinecap="round" />
      </g>
    </svg>
  );
}

const FIGURES: Partial<Record<PictogramKey, { Comp: (p: FigProps) => React.ReactNode; caption: string }>> = {
  "curl-up": { Comp: CurlUp, caption: "Curl-up · Lumbar neutral · 20° lift only" },
  "side-plank": { Comp: SidePlank, caption: "Side plank · Hips stacked · Forearm support" },
  "bird-dog": { Comp: BirdDog, caption: "Bird dog · Opposite arm + leg · Spine still" },
  breath: { Comp: DeadBug, caption: "Dead bug · Supine · Spine-neutral core" },
  decomp: { Comp: GluteBridge, caption: "Glute bridge · Supine · Posterior chain" },
};

type Props = {
  moveKey: PictogramKey;
  paused?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function AnimatedExercise({ moveKey, paused = false, className, style }: Props) {
  const entry = FIGURES[moveKey];
  if (!entry) return null;
  const { Comp, caption } = entry;

  return (
    <div
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: PAPER, ...style }}
    >
      <Comp paused={paused} />

      {/* motion-study marker — top-left eyebrow */}
      <div style={{ position: "absolute", left: 18, top: 16, fontFamily: "var(--font-mono, ui-monospace, monospace)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: FAINT, pointerEvents: "none" }}>
        {paused ? "◆ Motion study · paused" : "◆ Motion study · looping"}
      </div>
      {/* descriptive caption — bottom-left */}
      <div style={{ position: "absolute", left: 18, bottom: 14, fontFamily: "var(--font-mono, ui-monospace, monospace)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, pointerEvents: "none" }}>
        {caption}
      </div>

      <style>{CSS}</style>
    </div>
  );
}

export default AnimatedExercise;
