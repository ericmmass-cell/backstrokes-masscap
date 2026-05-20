/**
 * HumanFigure — proper filled human silhouettes.
 *
 * Replaces the wireframe stick figures that did not read as bodies.
 * Every figure is a single closed SVG path filled with body color so
 * it reads as a human form at a glance. Side-profile views. Cream-paper
 * palette: warm ink for receiver, oxblood for partner.
 *
 * The silhouettes are exercise-specific. For positions, see the engine
 * prototype (public/engine.html).
 */

import type { CSSProperties } from "react";

const INK = "#3a342c";
const OX = "#722B2B";
const RULE = "rgba(42,38,32,0.22)";
const AMBER = "#8a6520";

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
        padding: "16px",
        background: `radial-gradient(ellipse at 30% 25%, rgba(138,101,32,0.14) 0%, transparent 55%), linear-gradient(160deg, rgba(42,38,32,0.04) 0%, rgba(214,202,176,0.45) 100%)`,
        ...style,
      }}
    >
      <svg
        viewBox="0 0 480 300"
        style={{ width: "100%", height: "100%", maxHeight: 380, display: "block" }}
        aria-label={`${moveKey} demonstration`}
      >
        <defs>
          <linearGradient id="hf-mat" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(42,38,32,0.09)" />
            <stop offset="100%" stopColor="rgba(42,38,32,0.04)" />
          </linearGradient>
        </defs>

        {/* Floor / mat */}
        <rect x="30" y="240" width="420" height="22" rx="3" fill="url(#hf-mat)" stroke={RULE} strokeWidth="1" />
        <line x1="30" y1="244" x2="450" y2="244" stroke="rgba(42,38,32,0.40)" strokeWidth="1.5" />

        <g className={paused ? "" : "hf-breathe"} style={{ transformOrigin: "center center" }}>
          {renderPose(moveKey)}
        </g>

        {labelFor(moveKey)}
      </svg>

      <style>{`
        @keyframes hf-breathe {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.012); opacity: 0.97; }
        }
        .hf-breathe { animation: hf-breathe 4.2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SILHOUETTE PATHS — exercise-specific, filled, side-profile bodies
// ─────────────────────────────────────────────────────────────────────

/**
 * Curl-up: supine, one knee bent, head and shoulders lifted ~20° off
 * the floor. Side profile. Head on left, feet on right.
 */
function PathCurlUp({ color }: { color: string }) {
  return (
    <g>
      {/* Body: torso lying flat, head/shoulders curled up */}
      <path
        fill={color}
        d="
          M 40 178
          C 30 174, 26 168, 30 158
          C 34 148, 44 142, 56 140
          C 70 138, 84 138, 100 136
          C 100 132, 102 128, 106 124
          C 110 120, 116 118, 122 118
          C 130 118, 134 122, 138 128
          C 142 134, 144 138, 148 140
          C 174 142, 220 144, 270 146
          C 310 148, 330 150, 340 152
          L 340 168
          C 320 170, 290 172, 250 174
          C 200 176, 140 180, 90 182
          C 70 184, 54 184, 46 182
          C 42 181, 40 180, 40 178 Z
        "
      />
      {/* Head: clearly lifted off ground, chin tucked */}
      <circle cx="125" cy="118" r="14" fill={color} />
      {/* Bent knee — right leg lifted */}
      <path
        fill={color}
        d="
          M 320 152
          C 332 150, 348 148, 358 142
          C 368 136, 374 128, 374 118
          C 374 110, 370 106, 364 108
          C 360 110, 358 116, 354 122
          C 350 130, 344 138, 332 148
          Z
        "
      />
      {/* Lower leg of bent knee */}
      <path
        fill={color}
        d="
          M 364 116
          C 370 114, 378 116, 382 124
          C 386 134, 386 148, 384 162
          C 382 170, 378 174, 372 174
          C 368 174, 364 170, 362 162
          C 360 152, 360 138, 362 126
          C 362 122, 363 118, 364 116 Z
        "
      />
      {/* Hand under lumbar (small bump under torso) */}
      <ellipse cx="220" cy="166" rx="14" ry="5" fill={color} opacity="0.6" />
    </g>
  );
}

/**
 * Side plank: forearm down, body in one diagonal line from forearm to
 * knees (week 1) or feet (week 2). Side profile.
 */
function PathSidePlank({ color }: { color: string }) {
  return (
    <g>
      {/* Diagonal body — head upper-left, knees lower-right */}
      <path
        fill={color}
        d="
          M 84 78
          C 80 70, 84 60, 92 56
          C 100 52, 110 56, 114 62
          L 144 102
          C 152 110, 160 118, 170 124
          L 280 198
          C 290 204, 302 208, 314 208
          C 326 208, 334 212, 336 220
          C 338 230, 334 240, 322 240
          L 280 240
          C 268 240, 256 234, 246 228
          L 162 168
          C 152 162, 142 152, 132 142
          L 102 100
          C 92 92, 84 86, 84 78 Z
        "
      />
      {/* Head */}
      <circle cx="98" cy="62" r="13" fill={color} />
      {/* Forearm support — vertical from shoulder to floor */}
      <path
        fill={color}
        d="
          M 90 76
          C 86 78, 80 82, 76 90
          C 72 100, 70 124, 70 156
          C 70 184, 72 208, 78 218
          C 82 226, 90 230, 96 226
          C 102 222, 102 216, 98 208
          C 92 196, 88 184, 88 168
          C 88 152, 90 132, 96 110
          C 100 96, 100 86, 98 82
          C 96 78, 94 76, 90 76 Z
        "
      />
      {/* Bottom of forearm + hand on floor */}
      <ellipse cx="84" cy="222" rx="22" ry="6" fill={color} />
    </g>
  );
}

/**
 * Bird-dog: quadruped, opposite arm forward and opposite leg extended
 * back. Side profile.
 */
function PathBirdDog({ color }: { color: string }) {
  return (
    <g>
      {/* Torso: horizontal back */}
      <path
        fill={color}
        d="
          M 120 130
          C 110 128, 102 130, 100 138
          C 98 146, 102 154, 112 156
          C 130 158, 170 156, 210 154
          C 250 152, 290 152, 320 154
          C 332 156, 340 152, 342 144
          C 344 136, 338 130, 326 128
          C 290 124, 250 122, 210 124
          C 180 126, 150 128, 120 130 Z
        "
      />
      {/* Head */}
      <circle cx="116" cy="124" r="13" fill={color} />
      {/* Supporting arm (down to floor, on the receiver side) */}
      <path
        fill={color}
        d="
          M 132 152
          C 128 158, 128 178, 130 196
          C 132 214, 136 230, 144 232
          C 154 234, 158 226, 156 214
          C 154 200, 152 184, 152 168
          C 152 158, 152 152, 146 150
          C 140 148, 134 150, 132 152 Z
        "
      />
      {/* Hand at floor */}
      <ellipse cx="142" cy="234" rx="18" ry="5" fill={color} />
      {/* Supporting knee (down to floor) */}
      <path
        fill={color}
        d="
          M 296 154
          C 292 162, 292 184, 296 204
          C 300 222, 308 232, 318 232
          C 326 232, 328 222, 322 204
          C 316 184, 312 168, 312 158
          C 312 152, 308 150, 302 150
          C 298 150, 296 152, 296 154 Z
        "
      />
      <ellipse cx="312" cy="234" rx="20" ry="5" fill={color} />
      {/* Extended arm forward — opposite side, reaches up-forward */}
      <path
        fill={color}
        d="
          M 110 130
          C 102 124, 92 118, 80 110
          C 70 102, 60 96, 52 92
          C 46 88, 44 84, 48 80
          C 52 76, 60 78, 70 82
          C 86 88, 100 96, 116 108
          C 124 114, 128 120, 124 126
          C 122 130, 116 132, 110 130 Z
        "
      />
      {/* Extended leg back — opposite to forward arm */}
      <path
        fill={color}
        d="
          M 330 148
          C 340 146, 354 144, 372 142
          C 388 140, 402 140, 410 142
          C 416 144, 418 148, 414 152
          C 410 156, 402 158, 388 158
          C 372 158, 354 160, 340 162
          C 332 162, 328 160, 328 156
          C 328 152, 328 150, 330 148 Z
        "
      />
    </g>
  );
}

/**
 * Supine with knees bent + hands on chest/belly. Side profile.
 * Used for breath, reverse-kegel, decomp (with variations).
 */
function PathSupineKnees({
  color,
  armsOverhead = false,
  showHands = false,
}: {
  color: string;
  armsOverhead?: boolean;
  showHands?: boolean;
}) {
  return (
    <g>
      {/* Torso lying flat */}
      <path
        fill={color}
        d="
          M 70 168
          C 60 168, 54 174, 56 184
          C 58 192, 64 196, 78 196
          C 100 198, 160 200, 220 200
          C 240 200, 250 198, 250 192
          C 250 186, 246 182, 234 180
          C 220 178, 190 176, 158 174
          C 132 172, 110 170, 92 168
          C 84 168, 76 168, 70 168 Z
        "
      />
      {/* Head */}
      <circle cx="72" cy="160" r="13" fill={color} />
      {/* Bent knees — upper thigh */}
      <path
        fill={color}
        d="
          M 246 188
          C 256 186, 274 180, 290 168
          C 306 156, 318 144, 322 138
          C 324 134, 322 130, 316 128
          C 310 126, 302 130, 290 140
          C 278 152, 262 168, 246 180 Z
        "
      />
      {/* Lower leg of bent knee */}
      <path
        fill={color}
        d="
          M 318 132
          C 322 124, 332 118, 344 112
          C 358 106, 372 102, 380 104
          C 386 106, 388 110, 384 116
          C 378 124, 362 132, 348 138
          C 336 144, 324 146, 320 142
          C 316 138, 316 134, 318 132 Z
        "
      />
      {/* Feet flat */}
      <ellipse cx="378" cy="138" rx="14" ry="6" fill={color} />

      {/* Arms */}
      {armsOverhead ? (
        // Arms reaching back overhead, palms up
        <>
          <path
            fill={color}
            d="
              M 80 174
              C 70 170, 56 164, 40 154
              C 26 144, 14 136, 8 134
              C 2 132, -2 134, 0 140
              C 2 146, 12 154, 26 164
              C 42 176, 58 184, 72 188
              C 80 190, 84 186, 82 180
              C 82 176, 82 174, 80 174 Z
            "
          />
        </>
      ) : (
        // Arms at sides, hands on torso
        showHands && (
          <>
            {/* Hand on lower ribs */}
            <ellipse cx="118" cy="178" rx="10" ry="5" fill={color} />
            {/* Hand on belly */}
            <ellipse cx="170" cy="184" rx="10" ry="5" fill={color} />
          </>
        )
      )}
    </g>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Per-move scene composition
// ─────────────────────────────────────────────────────────────────────

function renderPose(moveKey: MoveKey) {
  switch (moveKey) {
    case "curl-up":
      return (
        <>
          {/* Optional small head-rest pillow */}
          <ellipse cx="90" cy="186" rx="22" ry="8" fill="rgba(58,52,44,0.18)" stroke="rgba(58,52,44,0.32)" strokeWidth="1" />
          <g transform="translate(20, 50)">
            <PathCurlUp color={INK} />
          </g>
          {/* Hold arc indicator */}
          <path d="M 230 90 Q 240 76 250 90" fill="none" stroke={OX} strokeWidth="2" strokeLinecap="round" />
        </>
      );
    case "side-plank":
      return (
        <g transform="translate(70, 0)">
          <PathSidePlank color={INK} />
        </g>
      );
    case "bird-dog":
      return (
        <g transform="translate(30, 0)">
          <PathBirdDog color={INK} />
        </g>
      );
    case "breath":
      return (
        <>
          <ellipse cx="68" cy="172" rx="22" ry="8" fill="rgba(58,52,44,0.18)" stroke="rgba(58,52,44,0.32)" strokeWidth="1" />
          <PathSupineKnees color={INK} showHands />
          {/* Breath waveform overhead */}
          <g stroke={OX} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.85">
            <path d="M 120 100 Q 160 60 200 100 Q 240 140 280 100 Q 320 60 360 100" />
          </g>
        </>
      );
    case "reverse-kegel":
      return (
        <>
          <ellipse cx="68" cy="172" rx="22" ry="8" fill="rgba(58,52,44,0.18)" stroke="rgba(58,52,44,0.32)" strokeWidth="1" />
          <PathSupineKnees color={INK} showHands />
          {/* Floor-drop arrow at pelvis */}
          <g stroke={OX} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="220" y1="208" x2="220" y2="232" />
            <polyline points="206,222 220,238 234,222" />
          </g>
        </>
      );
    case "decomp":
      return (
        <>
          {/* Pillow under knees */}
          <ellipse cx="320" cy="190" rx="32" ry="9" fill="rgba(58,52,44,0.18)" stroke="rgba(58,52,44,0.32)" strokeWidth="1" />
          <ellipse cx="68" cy="172" rx="22" ry="8" fill="rgba(58,52,44,0.18)" stroke="rgba(58,52,44,0.32)" strokeWidth="1" />
          <PathSupineKnees color={INK} armsOverhead />
        </>
      );
  }
}

function labelFor(moveKey: MoveKey) {
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
      x="240"
      y="285"
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

// Export the silhouette primitives so other components can use them.
export { PathCurlUp, PathSidePlank, PathBirdDog, PathSupineKnees };
