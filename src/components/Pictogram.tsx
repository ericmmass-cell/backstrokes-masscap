/**
 * Pictogram — sex position + exercise visualization.
 *
 * Sex positions: real CC-BY-SA illustrations from Wikimedia Commons
 * (User:Seedfeeder), treated with CSS filters to push the colors
 * toward the BackStroke cream-paper register. Each file lives at
 * /public/positions/<key>.png. Attribution required by the license
 * is rendered in the corner of every position image.
 *
 * Exercises: still hand-authored SVG pictograms (PT-handout style).
 * Seedfeeder didn't draw McGill curl-up or bird-dog.
 *
 * Adding a new sex position:
 *   1. Find the Seedfeeder file on Commons
 *   2. Download to /public/positions/<position-key>.png
 *   3. Add the key to PictogramKey union
 *   4. Add an entry to POSITION_TITLES
 *
 * Why this not SVG hand-drawing: Claude's hand-drawn SVG figures
 * read as blobs, not people. Seedfeeder's illustrations are real
 * anatomically-articulated humans. The user (Eric) explicitly
 * approved this register on the homepage hero.
 */

import { useState, type CSSProperties, type ImgHTMLAttributes } from "react";

const INK = "#2a2620";
const OXBLOOD = "#722B2B";
const PAPER = "#F4EFE3";
const RULE = "#c8b89f";
const MUTED = "#8d806a";

export type PictogramKey =
  // Sex positions (Seedfeeder PNG)
  | "spoon"
  | "supine-knees-up"
  | "side-T"
  | "edge-bed"
  | "cowgirl-upright"
  | "doggy-supported"
  | "scissor"
  | "seated-lap"
  | "supine-bolster"
  // Exercises (hand-authored SVG)
  | "curl-up"
  | "side-plank"
  | "bird-dog"
  | "breath"
  | "decomp";

type PictogramProps = {
  positionKey: PictogramKey;
  className?: string;
  style?: CSSProperties;
  /**
   * "eager" for above-the-fold (homepage hero), "lazy" otherwise.
   * Maps to the native HTMLImageElement loading attribute. Default: "lazy".
   */
  loading?: ImgHTMLAttributes<HTMLImageElement>["loading"];
  /**
   * "high" for the hero image, "auto" or "low" otherwise. Hints to the
   * browser's resource scheduler. Default: "auto".
   */
  fetchPriority?: "high" | "low" | "auto";
};

/* ───────── public meta accessors (used by /positions picker, alt text) ───────── */

export function getPositionMeta(key: PictogramKey): { title: string; sub: string } | undefined {
  return POSITION_TITLES[key];
}

/**
 * URLs for all illustrated (PNG-backed) positions. Use for <link rel="preload">
 * on the /positions route so picker switching is instant.
 */
export function getIllustratedPositionUrls(): string[] {
  return SEX_POSITION_KEYS.filter((k) => k !== "supine-bolster").map(
    (k) => `/positions/${k}.png`,
  );
}

/* ───────── sex positions: real illustrations ───────── */

const POSITION_TITLES: Partial<Record<PictogramKey, { title: string; sub: string }>> = {
  spoon:               { title: "Spoon",                sub: "Lateral · Low spinal load" },
  "supine-knees-up":   { title: "Modified missionary",  sub: "Receiver supine · Knees over bolster" },
  "side-T":            { title: "Side-lying T",         sub: "Side-lying · Partner kneeling perpendicular" },
  "edge-bed":          { title: "Edge of bed",          sub: "Receiver supine at edge · Partner kneeling" },
  "cowgirl-upright":   { title: "Receiver on top",      sub: "Straddling · Partner supine" },
  "doggy-supported":   { title: "Supported rear-entry", sub: "Quadruped chest-down · Forearms supported" },
  scissor:             { title: "Side-lying scissor",   sub: "Perpendicular · Both partners side-lying" },
  "seated-lap":        { title: "Seated lap embrace",   sub: "Both upright · Face to face · Stacked spines" },
  "supine-bolster":    { title: "Solo supine",          sub: "Hips elevated · Knees up · Acute-day default" },
};

/**
 * Card chrome shared by every position/exercise pictogram so the
 * cream-paper frame, caption row, and attribution sit in identical
 * positions regardless of what's inside.
 */
function PictogramFrame({
  children,
  caption,
  attribution,
}: {
  children: React.ReactNode;
  caption?: string;
  attribution?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: PAPER,
        position: "relative",
        overflow: "hidden",
        borderRadius: 16,
      }}
    >
      {children}
      {caption && (
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 20,
            right: 20,
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 10,
            letterSpacing: "3px",
            color: MUTED,
            textTransform: "uppercase",
            pointerEvents: "none",
          }}
        >
          {caption}
        </div>
      )}
      {attribution && (
        <div
          style={{
            position: "absolute",
            bottom: 4,
            right: 8,
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 7,
            letterSpacing: "1px",
            color: MUTED,
            opacity: 0.55,
            pointerEvents: "none",
          }}
        >
          {attribution}
        </div>
      )}
    </div>
  );
}

/** Skeleton state — shimmer-free, cream-paper-toned, matches frame. */
function PositionSkeleton({ caption }: { caption?: string }) {
  return (
    <PictogramFrame caption={caption}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(120deg, rgba(200,184,159,0.18) 0%, rgba(200,184,159,0.32) 50%, rgba(200,184,159,0.18) 100%)",
          backgroundSize: "200% 100%",
          animation: "bs-shimmer 2.4s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes bs-shimmer {
          0%   { background-position: 0% 0%; }
          100% { background-position: -200% 0%; }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-bs-skeleton] { animation: none !important; }
        }
      `}</style>
    </PictogramFrame>
  );
}

/** Fallback when the image fails to load — typographic card. */
function PositionFallback({ meta }: { meta: { title: string; sub: string } }) {
  return (
    <PictogramFrame caption={`${meta.title} · ${meta.sub}`}>
      <div
        role="img"
        aria-label={`${meta.title}. Illustration unavailable.`}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 32,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Spectral, Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(36px, 5.5vw, 56px)",
            color: OXBLOOD,
            lineHeight: 1.0,
            marginBottom: 12,
          }}
        >
          {meta.title}
        </div>
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 10,
            letterSpacing: "3px",
            color: MUTED,
            textTransform: "uppercase",
          }}
        >
          Illustration unavailable
        </div>
      </div>
    </PictogramFrame>
  );
}

function IllustratedPosition({
  positionKey,
  loading = "lazy",
  fetchPriority = "auto",
}: {
  positionKey: PictogramKey;
  loading?: ImgHTMLAttributes<HTMLImageElement>["loading"];
  fetchPriority?: "high" | "low" | "auto";
}) {
  const meta = POSITION_TITLES[positionKey];
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");

  // No meta = key isn't in the registry. Render a hard fallback.
  if (!meta) {
    return (
      <PositionFallback
        meta={{ title: positionKey, sub: "Unknown position key" }}
      />
    );
  }

  if (state === "error") {
    return <PositionFallback meta={meta} />;
  }

  const caption = `${meta.title} · ${meta.sub}`;
  const altText = `Illustration of the ${meta.title.toLowerCase()} position: ${meta.sub.toLowerCase()}.`;

  return (
    <PictogramFrame
      caption={caption}
      attribution="Illus. Seedfeeder · CC-BY-SA 3.0"
    >
      {/* Skeleton sits behind the image and fades out when it loads.
          Stays mounted so the caption stays in position from the start. */}
      {state === "loading" && (
        <div
          aria-hidden="true"
          data-bs-skeleton
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(120deg, rgba(200,184,159,0.18) 0%, rgba(200,184,159,0.32) 50%, rgba(200,184,159,0.18) 100%)",
            backgroundSize: "200% 100%",
            animation: "bs-shimmer 2.4s ease-in-out infinite",
            transition: "opacity 220ms ease",
          }}
        />
      )}
      <img
        src={`/positions/${positionKey}.png`}
        alt={altText}
        loading={loading}
        // React 19 / typed-as-html attr. Pass-through to the DOM.
        // @ts-expect-error — fetchpriority is the lowercase HTML attribute
        fetchpriority={fetchPriority}
        decoding="async"
        // Intrinsic ratio so the box reserves space before the image
        // loads — eliminates layout shift (CLS).
        width={800}
        height={600}
        onLoad={() => setState("loaded")}
        onError={() => setState("error")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity: state === "loaded" ? 1 : 0,
          transition: "opacity 280ms ease",
          // Show the illustration CLEAN. The previous grayscale+sepia
          // +multiply treatment muddied the clear artwork into a brown
          // swamp. Only a hair of warmth so it doesn't fight the cream
          // page; the figures stay legible and demonstrate the position.
          filter: "saturate(0.96) contrast(1.02)",
        }}
      />
      <style>{`
        @keyframes bs-shimmer {
          0%   { background-position: 0% 0%; }
          100% { background-position: -200% 0%; }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-bs-skeleton] { animation: none !important; }
        }
      `}</style>
    </PictogramFrame>
  );
}

/* ───────── solo position: hand-authored SVG (no Seedfeeder file) ───────── */

function SupineBolster() {
  // Solo: supine, hips elevated on a bolster, knees up.
  // McGill-safe acute-day default. Single figure (oxblood silhouette).
  return (
    <div style={{ width: "100%", height: "100%", background: PAPER, position: "relative", overflow: "hidden", borderRadius: 16 }}>
      <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }} role="img" aria-label="Solo supine with bolster">
        <rect width="480" height="360" fill={PAPER} />
        <rect x="40" y="240" width="400" height="80" rx="10" fill="#e8dcc1" />
        <line x1="40" y1="245" x2="440" y2="245" stroke={RULE} strokeWidth="1.2" />
        <ellipse cx="240" cy="240" rx="70" ry="16" fill="#d4c5a8" />
        <g fill={OXBLOOD}>
          <circle cx="85" cy="245" r="22" />
          <path d="M 105 252 C 145 244, 200 244, 240 252 L 240 268 C 200 268, 145 268, 105 260 Z" />
          <path d="M 240 250 C 270 220, 295 205, 305 195" stroke={OXBLOOD} strokeWidth="28" strokeLinecap="round" fill="none" />
          <path d="M 305 195 C 335 215, 350 240, 348 252" stroke={OXBLOOD} strokeWidth="22" strokeLinecap="round" fill="none" />
          <path d="M 175 252 C 195 260, 215 264, 225 270" stroke={OXBLOOD} strokeWidth="14" strokeLinecap="round" fill="none" />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 20,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 10,
          letterSpacing: "3px",
          color: MUTED,
          textTransform: "uppercase",
          pointerEvents: "none",
        }}
      >
        Solo supine · Hips elevated · Knees up
      </div>
    </div>
  );
}

/* ───────── exercises: hand-authored SVG (PT-handout style) ───────── */

function ExerciseFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div style={{ width: "100%", height: "100%", background: PAPER, position: "relative", overflow: "hidden", borderRadius: 16 }}>
      <svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }} role="img" aria-label={label}>
        <rect width="480" height="320" fill={PAPER} />
        <line x1="20" y1="270" x2="460" y2="270" stroke={RULE} strokeWidth="1.4" />
        {children}
      </svg>
      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: 20,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 10,
          letterSpacing: "3px",
          color: MUTED,
          textTransform: "uppercase",
          pointerEvents: "none",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function CurlUp() {
  return (
    <ExerciseFrame label="Curl-up · McGill · Lumbar neutral">
      <g fill={INK}>
        <circle cx="80" cy="208" r="20" />
        <path d="M 96 222 Q 115 228 130 235" stroke={INK} strokeWidth="14" strokeLinecap="round" fill="none" />
        <path d="M 120 238 C 165 248, 240 250, 290 252 L 295 268 C 240 268, 165 266, 120 258 Z" />
        <circle cx="220" cy="262" r="8" fill={OXBLOOD} />
        <path d="M 295 258 C 340 256, 390 254, 430 252" stroke={INK} strokeWidth="22" strokeLinecap="round" fill="none" />
        <ellipse cx="436" cy="252" rx="14" ry="8" fill={INK} />
        <path d="M 290 250 C 320 230, 335 210, 330 188" stroke={INK} strokeWidth="22" strokeLinecap="round" fill="none" />
        <path d="M 330 188 C 350 200, 365 222, 365 250" stroke={INK} strokeWidth="20" strokeLinecap="round" fill="none" />
        <ellipse cx="367" cy="252" rx="14" ry="8" fill={INK} />
      </g>
      <path d="M 60 245 Q 65 220 92 198" stroke={OXBLOOD} strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
      <text x="40" y="260" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="2" fill={OXBLOOD}>20°</text>
    </ExerciseFrame>
  );
}

function SidePlank() {
  return (
    <ExerciseFrame label="Side plank · Hips lifted · Forearm support">
      <g fill={INK}>
        <circle cx="80" cy="190" r="20" />
        <path d="M 96 200 C 130 195, 200 200, 280 220 L 280 240 C 200 230, 130 220, 96 215 Z" />
        <path d="M 100 215 C 100 235, 100 255, 100 268" stroke={INK} strokeWidth="22" strokeLinecap="round" fill="none" />
        <path d="M 270 222 C 295 218, 320 216, 335 214" stroke={INK} strokeWidth="16" strokeLinecap="round" fill="none" />
        <path d="M 280 232 C 320 232, 360 232, 390 232" stroke={INK} strokeWidth="22" strokeLinecap="round" fill="none" />
        <path d="M 388 230 C 405 245, 405 258, 390 268" stroke={INK} strokeWidth="20" strokeLinecap="round" fill="none" />
      </g>
    </ExerciseFrame>
  );
}

function BirdDog() {
  return (
    <ExerciseFrame label="Bird-dog · Opposite arm/leg · Spine neutral">
      <g fill={INK}>
        <path d="M 150 205 C 200 200, 280 200, 330 205 L 330 225 C 280 230, 200 230, 150 225 Z" />
        <circle cx="345" cy="210" r="18" />
        <path d="M 175 220 C 175 240, 175 258, 175 268" stroke={INK} strokeWidth="20" strokeLinecap="round" fill="none" />
        <path d="M 300 224 C 300 245, 300 260, 300 268" stroke={INK} strokeWidth="22" strokeLinecap="round" fill="none" />
        <path d="M 320 210 C 360 195, 405 195, 440 195" stroke={INK} strokeWidth="18" strokeLinecap="round" fill="none" />
        <path d="M 165 210 C 125 195, 75 195, 35 195" stroke={INK} strokeWidth="22" strokeLinecap="round" fill="none" />
      </g>
    </ExerciseFrame>
  );
}

function Breath() {
  return (
    <ExerciseFrame label="Diaphragmatic breath · Ribs · Abdomen">
      <g fill={INK}>
        <circle cx="70" cy="240" r="20" />
        <path d="M 88 248 C 130 240, 220 240, 280 248 L 280 264 C 220 264, 130 262, 88 254 Z" />
        <circle cx="155" cy="244" r="11" fill={OXBLOOD} />
        <circle cx="220" cy="246" r="11" fill={OXBLOOD} />
        <path d="M 290 252 C 320 235, 340 215, 335 200" stroke={INK} strokeWidth="22" strokeLinecap="round" fill="none" />
        <path d="M 335 200 C 360 215, 375 240, 372 268" stroke={INK} strokeWidth="20" strokeLinecap="round" fill="none" />
        <path d="M 295 248 C 330 230, 360 215, 365 200" stroke={INK} strokeWidth="22" strokeLinecap="round" fill="none" />
        <path d="M 365 200 C 390 215, 405 240, 402 268" stroke={INK} strokeWidth="20" strokeLinecap="round" fill="none" />
      </g>
      <path d="M 185 215 Q 185 175 185 140" stroke={OXBLOOD} strokeWidth="2" fill="none" />
      <path d="M 178 150 L 185 138 L 192 150" stroke={OXBLOOD} strokeWidth="2" fill="none" strokeLinecap="round" />
      <text x="200" y="160" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="2" fill={OXBLOOD}>INHALE</text>
    </ExerciseFrame>
  );
}

function Decomp() {
  return (
    <ExerciseFrame label="Decompression · Knees over bolster · Body neutral">
      <ellipse cx="330" cy="265" rx="50" ry="14" fill="#d4c5a8" />
      <g fill={INK}>
        <circle cx="75" cy="240" r="20" />
        <path d="M 92 248 C 135 240, 220 240, 285 248 L 285 265 C 220 265, 135 262, 92 254 Z" />
        <path d="M 175 256 C 200 264, 220 268, 235 274" stroke={INK} strokeWidth="14" strokeLinecap="round" fill="none" />
        <path d="M 285 256 C 315 252, 335 250, 345 245" stroke={INK} strokeWidth="22" strokeLinecap="round" fill="none" />
        <path d="M 345 248 C 360 260, 365 270, 365 282" stroke={INK} strokeWidth="20" strokeLinecap="round" fill="none" />
      </g>
    </ExerciseFrame>
  );
}

/* ───────── dispatch ───────── */

const SEX_POSITION_KEYS: PictogramKey[] = [
  "spoon",
  "supine-knees-up",
  "side-T",
  "edge-bed",
  "cowgirl-upright",
  "doggy-supported",
  "scissor",
  "seated-lap",
];

export function Pictogram({
  positionKey,
  className,
  style,
  loading = "lazy",
  fetchPriority = "auto",
}: PictogramProps) {
  // Sex positions backed by Seedfeeder PNGs
  if (SEX_POSITION_KEYS.includes(positionKey)) {
    return (
      <div className={className} style={{ width: "100%", height: "100%", ...style }}>
        <IllustratedPosition
          positionKey={positionKey}
          loading={loading}
          fetchPriority={fetchPriority}
        />
      </div>
    );
  }
  // Solo position (hand-drawn SVG)
  if (positionKey === "supine-bolster") {
    return (
      <div className={className} style={{ width: "100%", height: "100%", ...style }}>
        <SupineBolster />
      </div>
    );
  }
  // Exercises — real recolored illustrations
  if (EXERCISE_META[positionKey]) {
    return (
      <div className={className} style={{ width: "100%", height: "100%", ...style }}>
        <IllustratedExercise exerciseKey={positionKey} />
      </div>
    );
  }
  return null;
}

export default Pictogram;
