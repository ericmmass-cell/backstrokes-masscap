/**
 * Pictogram — sex position visualization as editorial SVG line art.
 *
 * Two figures per position. Hand-authored SVG paths. The visual
 * register is Olympic / AIGA wayfinding pictogram: bold geometric
 * curves, no shading, no detail noise. The shape IS the message.
 *
 * Color scheme:
 *   Front partner = oxblood (#722B2B) — brand accent
 *   Back partner  = deep ink (#2a2620)
 *   Bed silhouette = soft sand (#e8dcc1)
 *   Paper background = cream (#F4EFE3)
 *
 * Why this not 3D:
 *   3D rigging of a Mixamo soldier model produced a "blocky figure
 *   with tactical gear silhouette" that read as soldier even after
 *   pure black silhouette flat-shading. Pictograms drawn by hand
 *   give us 100% control over the contour, anatomy is implied by
 *   geometry rather than approximated by skinning. And it ships
 *   today, no calibration grind, no GLB to load.
 *
 * Each position is a function returning <svg>. Adding a new position
 * is one new function + a registry entry. No bone math, no Mixamo,
 * no scratched-out arm rotation values.
 */

import type { CSSProperties } from "react";

const INK = "#2a2620";
const OXBLOOD = "#722B2B";
const PAPER = "#F4EFE3";
const BED = "#e8dcc1";
const RULE = "#c8b89f";

export type PictogramKey =
  | "spoon"
  | "supine-knees-up"
  | "side-T"
  | "edge-bed"
  | "cowgirl-upright"
  | "doggy-supported"
  | "scissor"
  | "supine-bolster";

type PictogramProps = {
  positionKey: PictogramKey;
  className?: string;
  style?: CSSProperties;
};

/* ───────── individual position pictograms ───────── */

function Spoon() {
  // Side view. Both figures lying on right side, head end at LEFT.
  // Back figure (ink) cradles front figure (oxblood).
  return (
    <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Spoon position pictogram">
      <rect width="480" height="360" fill={PAPER} />

      {/* Bed silhouette */}
      <rect x="40" y="220" width="400" height="100" rx="10" fill={BED} />
      <line x1="40" y1="225" x2="440" y2="225" stroke={RULE} strokeWidth="1.2" />

      {/* Back partner — deep ink. Larger, behind, curls around */}
      {/* Body: a curving bean shape from butt to shoulder */}
      <g fill={INK}>
        {/* Head — circle */}
        <circle cx="135" cy="178" r="22" />
        {/* Neck connector */}
        <path d="M 130 198 Q 140 205 150 200" stroke={INK} strokeWidth="14" strokeLinecap="round" fill="none" />
        {/* Torso — slightly curled forward */}
        <path
          d="M 160 198
             C 180 188, 230 188, 270 195
             C 305 200, 335 215, 350 230
             C 360 240, 358 250, 345 250
             C 305 250, 250 240, 200 232
             C 175 230, 160 218, 160 198 Z"
        />
        {/* Top arm draped forward over front partner */}
        <path
          d="M 200 212
             C 260 200, 310 205, 355 215"
          stroke={INK}
          strokeWidth="22"
          strokeLinecap="round"
          fill="none"
        />
        {/* Hand at end of arm */}
        <circle cx="358" cy="217" r="11" />
        {/* Upper leg — bent forward at hip, knee in mid-air */}
        <path
          d="M 320 240
             C 350 235, 380 225, 405 215"
          stroke={INK}
          strokeWidth="32"
          strokeLinecap="round"
          fill="none"
        />
        {/* Lower leg — bent at knee, foot back toward bed */}
        <path
          d="M 400 218
             C 405 240, 395 260, 365 265"
          stroke={INK}
          strokeWidth="26"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Front partner — oxblood. In front, lying on side, knees gently bent */}
      <g fill={OXBLOOD}>
        {/* Head */}
        <circle cx="120" cy="220" r="20" />
        {/* Neck */}
        <path d="M 118 238 Q 130 244 142 240" stroke={OXBLOOD} strokeWidth="13" strokeLinecap="round" fill="none" />
        {/* Torso — slightly curled */}
        <path
          d="M 150 238
             C 175 232, 220 232, 260 238
             C 295 242, 320 252, 332 262
             C 340 270, 338 278, 326 278
             C 290 278, 240 270, 200 262
             C 175 258, 150 248, 150 238 Z"
        />
        {/* Upper leg — bent forward */}
        <path
          d="M 305 270
             C 330 270, 360 265, 385 258"
          stroke={OXBLOOD}
          strokeWidth="30"
          strokeLinecap="round"
          fill="none"
        />
        {/* Lower leg — bent at knee, foot back toward bed */}
        <path
          d="M 382 260
             C 388 280, 380 298, 350 305"
          stroke={OXBLOOD}
          strokeWidth="24"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

function SupineKneesUp() {
  // Receiver supine, knees over bolster. Top-down side view.
  return (
    <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Supine with knees up pictogram">
      <rect width="480" height="360" fill={PAPER} />
      <rect x="40" y="240" width="400" height="80" rx="10" fill={BED} />
      <line x1="40" y1="245" x2="440" y2="245" stroke={RULE} strokeWidth="1.2" />
      {/* Bolster */}
      <ellipse cx="320" cy="240" rx="50" ry="14" fill="#d4c5a8" />

      <g fill={OXBLOOD}>
        {/* Head */}
        <circle cx="90" cy="240" r="22" />
        {/* Torso lying flat */}
        <path
          d="M 110 245
             C 140 235, 200 233, 260 240
             C 300 245, 315 250, 312 258
             C 308 265, 290 268, 250 263
             C 200 258, 140 258, 110 250 Z"
        />
        {/* Arm at side */}
        <path d="M 175 250 C 200 258, 220 264, 230 270" stroke={OXBLOOD} strokeWidth="14" strokeLinecap="round" fill="none" />
        {/* Upper leg — bent up over bolster (knee at top of bolster) */}
        <path d="M 300 250 C 320 235, 330 220, 320 200" stroke={OXBLOOD} strokeWidth="30" strokeLinecap="round" fill="none" />
        {/* Lower leg — bent over bolster, foot down */}
        <path d="M 320 200 C 350 215, 365 240, 365 245" stroke={OXBLOOD} strokeWidth="24" strokeLinecap="round" fill="none" />
      </g>

      {/* Eyebrow text */}
      <text x="40" y="50" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="3" fill={OXBLOOD}>
        SUPINE · KNEES OVER BOLSTER
      </text>
    </svg>
  );
}

function SideT() {
  // Receiver side-lying, partner kneeling perpendicular.
  return (
    <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Side-lying T pictogram">
      <rect width="480" height="360" fill={PAPER} />
      <rect x="40" y="240" width="400" height="80" rx="10" fill={BED} />
      <line x1="40" y1="245" x2="440" y2="245" stroke={RULE} strokeWidth="1.2" />

      {/* Receiver — side-lying along the bed */}
      <g fill={OXBLOOD}>
        <circle cx="110" cy="245" r="20" />
        <path d="M 128 252 C 160 245, 220 245, 270 252 C 290 256, 295 262, 285 268 C 250 268, 180 265, 130 258 Z" />
        <path d="M 270 258 C 295 252, 315 250, 330 246" stroke={OXBLOOD} strokeWidth="26" strokeLinecap="round" fill="none" />
        <path d="M 325 248 C 335 268, 320 285, 295 290" stroke={OXBLOOD} strokeWidth="22" strokeLinecap="round" fill="none" />
      </g>

      {/* Partner — kneeling, facing receiver perpendicular (from front) */}
      <g fill={INK}>
        {/* Head */}
        <circle cx="365" cy="160" r="22" />
        {/* Torso vertical */}
        <path d="M 358 182 C 348 200, 348 225, 358 240 C 372 244, 388 244, 400 240 C 410 225, 410 200, 400 182 C 388 178, 372 178, 358 182 Z" />
        {/* Knees kneeling */}
        <path d="M 370 244 C 365 260, 370 280, 388 285" stroke={INK} strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M 388 244 C 393 260, 388 280, 370 285" stroke={INK} strokeWidth="28" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

function EdgeBed() {
  return (
    <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Edge of bed pictogram">
      <rect width="480" height="360" fill={PAPER} />
      {/* Bed with edge visible at right */}
      <rect x="20" y="220" width="300" height="100" rx="6" fill={BED} />
      <line x1="20" y1="225" x2="320" y2="225" stroke={RULE} strokeWidth="1.2" />
      <line x1="320" y1="225" x2="320" y2="320" stroke={RULE} strokeWidth="1.2" />

      {/* Receiver supine on bed, hips at edge */}
      <g fill={OXBLOOD}>
        <circle cx="65" cy="240" r="20" />
        <path d="M 82 246 C 130 238, 200 238, 280 246 C 295 250, 295 256, 282 262 C 220 262, 130 260, 82 252 Z" />
        {/* Knees up over the edge */}
        <path d="M 280 256 C 305 240, 325 215, 320 195" stroke={OXBLOOD} strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M 320 195 C 350 210, 370 235, 372 260" stroke={OXBLOOD} strokeWidth="22" strokeLinecap="round" fill="none" />
      </g>

      {/* Partner kneeling on the floor at the bed edge, facing the bed */}
      <g fill={INK}>
        <circle cx="385" cy="248" r="22" />
        <path d="M 378 270 C 368 290, 368 310, 380 320 C 395 322, 410 322, 422 320 C 432 310, 432 290, 422 270 C 410 266, 395 266, 378 270 Z" />
      </g>
    </svg>
  );
}

function CowgirlUpright() {
  return (
    <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Receiver on top, upright pictogram">
      <rect width="480" height="360" fill={PAPER} />
      <rect x="40" y="260" width="400" height="60" rx="10" fill={BED} />
      <line x1="40" y1="265" x2="440" y2="265" stroke={RULE} strokeWidth="1.2" />

      {/* Partner below — supine */}
      <g fill={INK}>
        <circle cx="90" cy="265" r="20" />
        <path d="M 108 270 C 140 263, 230 263, 290 270 C 305 274, 305 280, 292 284 C 220 284, 140 280, 108 274 Z" />
        <path d="M 290 278 C 320 274, 360 275, 395 280" stroke={INK} strokeWidth="24" strokeLinecap="round" fill="none" />
      </g>

      {/* Receiver above, straddling, upright */}
      <g fill={OXBLOOD}>
        <circle cx="240" cy="135" r="22" />
        {/* Torso upright */}
        <path d="M 222 157 C 215 185, 215 215, 222 240 C 235 248, 250 248, 262 245 C 270 220, 270 185, 263 157 C 252 152, 232 152, 222 157 Z" />
        {/* Knees bent (straddling) — flare out at hips */}
        <path d="M 225 245 C 200 252, 195 270, 215 280" stroke={OXBLOOD} strokeWidth="26" strokeLinecap="round" fill="none" />
        <path d="M 260 245 C 285 252, 290 270, 270 280" stroke={OXBLOOD} strokeWidth="26" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

function DoggySupported() {
  return (
    <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Supported rear-entry pictogram">
      <rect width="480" height="360" fill={PAPER} />
      <rect x="40" y="260" width="400" height="60" rx="10" fill={BED} />
      <line x1="40" y1="265" x2="440" y2="265" stroke={RULE} strokeWidth="1.2" />
      {/* Chest bolster */}
      <ellipse cx="320" cy="260" rx="60" ry="12" fill="#d4c5a8" />

      {/* Receiver — quadruped, chest down on bolster */}
      <g fill={OXBLOOD}>
        {/* Head down at far right */}
        <circle cx="370" cy="245" r="18" />
        {/* Torso angled down to chest */}
        <path d="M 200 215 C 230 210, 280 215, 330 240 C 345 248, 345 258, 330 260 C 280 260, 235 245, 200 230 Z" />
        {/* Front arms forward (forearms on bolster) */}
        <path d="M 330 245 C 350 248, 360 255, 360 262" stroke={OXBLOOD} strokeWidth="18" strokeLinecap="round" fill="none" />
        {/* Back legs kneeling */}
        <path d="M 210 225 C 195 240, 195 260, 215 275" stroke={OXBLOOD} strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M 215 275 C 200 282, 195 295, 215 305" stroke={OXBLOOD} strokeWidth="24" strokeLinecap="round" fill="none" />
      </g>

      {/* Partner behind — kneeling */}
      <g fill={INK}>
        <circle cx="90" cy="200" r="22" />
        <path d="M 75 222 C 65 245, 65 268, 80 280 C 100 285, 120 285, 138 280 C 152 268, 152 245, 142 222 C 125 215, 90 215, 75 222 Z" />
        <path d="M 85 280 C 80 295, 90 310, 110 312" stroke={INK} strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M 130 280 C 135 295, 125 310, 105 312" stroke={INK} strokeWidth="28" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

function Scissor() {
  return (
    <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Side-lying scissor pictogram">
      <rect width="480" height="360" fill={PAPER} />
      <rect x="40" y="220" width="400" height="100" rx="10" fill={BED} />
      <line x1="40" y1="225" x2="440" y2="225" stroke={RULE} strokeWidth="1.2" />

      {/* Two side-lying figures, hips crossing perpendicular at center */}
      {/* Partner A — head LEFT, body extends RIGHT (oxblood) */}
      <g fill={OXBLOOD}>
        <circle cx="100" cy="265" r="20" />
        <path d="M 118 270 C 150 263, 200 263, 240 273 C 248 280, 248 286, 235 290 C 200 290, 150 285, 118 278 Z" />
        {/* Legs scissor at center */}
        <path d="M 235 278 C 270 270, 320 270, 360 268" stroke={OXBLOOD} strokeWidth="26" strokeLinecap="round" fill="none" />
      </g>

      {/* Partner B — head TOP, body extends DOWN (ink), perpendicular */}
      <g fill={INK}>
        <circle cx="300" cy="160" r="20" />
        <path d="M 290 178 C 280 200, 280 230, 285 252 C 295 260, 315 260, 325 255 C 332 230, 332 200, 322 178 C 312 174, 295 174, 290 178 Z" />
        {/* Bottom leg extends across, crossing oxblood's leg */}
        <path d="M 295 255 C 280 270, 270 290, 250 310" stroke={INK} strokeWidth="26" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

function SupineBolster() {
  return (
    <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Solo supine with bolster pictogram">
      <rect width="480" height="360" fill={PAPER} />
      <rect x="40" y="240" width="400" height="80" rx="10" fill={BED} />
      <line x1="40" y1="245" x2="440" y2="245" stroke={RULE} strokeWidth="1.2" />
      {/* Hip bolster */}
      <ellipse cx="240" cy="240" rx="70" ry="16" fill="#d4c5a8" />

      <g fill={OXBLOOD}>
        <circle cx="85" cy="245" r="22" />
        <path d="M 105 252 C 145 244, 200 244, 240 252 C 245 256, 230 232, 240 232 C 230 232, 145 256, 105 256 Z" />
        {/* Knees up */}
        <path d="M 240 245 C 270 220, 295 205, 305 195" stroke={OXBLOOD} strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M 305 195 C 335 215, 350 240, 348 252" stroke={OXBLOOD} strokeWidth="22" strokeLinecap="round" fill="none" />
        {/* Arm at side */}
        <path d="M 175 250 C 195 258, 215 264, 225 270" stroke={OXBLOOD} strokeWidth="14" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

const REGISTRY: Record<PictogramKey, () => JSX.Element> = {
  spoon: Spoon,
  "supine-knees-up": SupineKneesUp,
  "side-T": SideT,
  "edge-bed": EdgeBed,
  "cowgirl-upright": CowgirlUpright,
  "doggy-supported": DoggySupported,
  scissor: Scissor,
  "supine-bolster": SupineBolster,
};

export function Pictogram({ positionKey, className, style }: PictogramProps) {
  const Comp = REGISTRY[positionKey];
  if (!Comp) return null;
  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: "100%",
        background: PAPER,
        borderRadius: 24,
        overflow: "hidden",
        position: "relative",
        ...style,
      }}
    >
      <Comp />
    </div>
  );
}

export default Pictogram;
