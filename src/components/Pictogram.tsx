/**
 * Pictogram — sex-position + exercise visualization.
 *
 * Sex positions: real CC-BY-SA 3.0 illustrations by User:Seedfeeder
 * (Wikimedia Commons), shown clean on a cream card. Files at
 * /public/positions/<key>.png.
 *
 * Exercises: real CC-BY-SA 4.0 line-art illustrations by Pk0001
 * (Wikimedia Commons), recolored to BackStroke's cream mat + brand
 * ink. Files at /public/exercises/<File>.svg.
 *
 * Solo position (supine-bolster): one hand-authored SVG — the set has
 * no rest-pose illustration.
 *
 * Both image families render through the same <PictogramFrame> chrome
 * with loading skeleton + typographic error fallback, so no broken-
 * image icon ever ships and the caption never shifts between states.
 *
 * History note: earlier hand-drawn SVG figures read as blobs and were
 * rejected. Real public-domain/CC illustrations of actual humans are
 * what demonstrate the move/position. Eric approved this register.
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
  | "doggy-kneeling"
  | "scissor"
  | "seated-lap"
  | "missionary"
  | "standing"
  // Solo position (hand-authored SVG)
  | "supine-bolster"
  // Exercises (Pk0001 SVG)
  | "curl-up"
  | "side-plank"
  | "bird-dog"
  | "breath"
  | "decomp";

type PictogramProps = {
  positionKey: PictogramKey;
  className?: string;
  style?: CSSProperties;
  /** "eager" for above-the-fold (hero). Default "lazy". */
  loading?: ImgHTMLAttributes<HTMLImageElement>["loading"];
  /** "high" for the hero image. Default "auto". */
  fetchPriority?: "high" | "low" | "auto";
};

/* ───────── metadata ───────── */

const POSITION_TITLES: Partial<Record<PictogramKey, { title: string; sub: string }>> = {
  spoon:               { title: "Spoon",                sub: "Lateral · Low spinal load" },
  "supine-knees-up":   { title: "Modified missionary",  sub: "Receiver supine · Knees over bolster" },
  "side-T":            { title: "Side-lying T",         sub: "Side-lying · Partner kneeling perpendicular" },
  "edge-bed":          { title: "Edge of bed",          sub: "Receiver supine at edge · Partner kneeling" },
  "cowgirl-upright":   { title: "Receiver on top",      sub: "Straddling · Partner supine" },
  "doggy-supported":   { title: "Supported rear-entry", sub: "Quadruped chest-down · Forearms supported" },
  "doggy-kneeling":    { title: "Rear-entry, kneeling", sub: "Receiver on hands and knees · Partner kneeling behind" },
  scissor:             { title: "Side-lying scissor",   sub: "Perpendicular · Both partners side-lying" },
  "seated-lap":        { title: "Seated lap embrace",   sub: "Both upright · Face to face · Stacked spines" },
  missionary:          { title: "Missionary",           sub: "Receiver supine · Partner above" },
  standing:            { title: "Standing, rear",       sub: "Both upright · Partner behind" },
  "supine-bolster":    { title: "Solo supine",          sub: "Hips elevated · Knees up · Acute-day default" },
};

const EXERCISE_META: Partial<
  Record<PictogramKey, { file: string; title: string; sub: string }>
> = {
  "curl-up":    { file: "Crunch_exercise.svg",       title: "Curl-up",      sub: "Lumbar neutral · 20° lift only" },
  "side-plank": { file: "Side_plank_exercise.svg",   title: "Side plank",   sub: "Hips lifted · Forearm support" },
  "bird-dog":   { file: "Birddog_exercise.svg",      title: "Bird dog",     sub: "Opposite arm + leg · Spine still" },
  breath:       { file: "Dead_bug_exercise.svg",     title: "Dead bug",     sub: "Supine · Spine-neutral core" },
  decomp:       { file: "Glute_bridge_exercise.svg", title: "Glute bridge", sub: "Supine · Posterior chain" },
};

const SEX_POSITION_KEYS: PictogramKey[] = [
  "spoon",
  "supine-knees-up",
  "side-T",
  "edge-bed",
  "cowgirl-upright",
  "doggy-supported",
  "doggy-kneeling",
  "scissor",
  "seated-lap",
  "missionary",
  "standing",
];

export function getPositionMeta(
  key: PictogramKey,
): { title: string; sub: string } | undefined {
  return POSITION_TITLES[key];
}

export function getExerciseMeta(
  key: PictogramKey,
): { title: string; sub: string } | undefined {
  const m = EXERCISE_META[key];
  return m ? { title: m.title, sub: m.sub } : undefined;
}

/** URLs for the illustrated (PNG-backed) positions — for <link rel="preload">. */
export function getIllustratedPositionUrls(): string[] {
  return SEX_POSITION_KEYS.map((k) => `/positions/${k}.png`);
}

/* ───────── shared chrome ───────── */

const SHIMMER_CSS = `
  @keyframes bs-shimmer {
    0%   { background-position: 0% 0%; }
    100% { background-position: -200% 0%; }
  }
  @media (prefers-reduced-motion: reduce) {
    [data-bs-skeleton] { animation: none !important; }
  }
`;

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

function Skeleton() {
  return (
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
      }}
    />
  );
}

function Fallback({ meta }: { meta: { title: string; sub: string } }) {
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
            fontSize: "clamp(34px, 5vw, 52px)",
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

/* ───────── sex positions: Seedfeeder PNGs, shown clean ───────── */

function IllustratedPosition({
  positionKey,
  loading = "lazy",
  fetchPriority = "auto",
  showCaption = true,
  annotate,
}: {
  positionKey: PictogramKey;
  loading?: ImgHTMLAttributes<HTMLImageElement>["loading"];
  fetchPriority?: "high" | "low" | "auto";
  showCaption?: boolean;
  annotate?: PositionAnnotateData;
}) {
  const meta = POSITION_TITLES[positionKey];
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");

  if (!meta) return <Fallback meta={{ title: positionKey, sub: "Unknown position key" }} />;
  if (state === "error") return <Fallback meta={meta} />;

  const caption = `${meta.title} · ${meta.sub}`;
  const altText = `Illustration of the ${meta.title.toLowerCase()} position: ${meta.sub.toLowerCase()}.`;

  return (
    <PictogramFrame caption={showCaption ? caption : undefined} attribution="Illus. Seedfeeder · CC-BY-SA 3.0">
      {state === "loading" && <Skeleton />}
      <img
        src={`/positions/${positionKey}.png`}
        alt={altText}
        loading={loading}
        // @ts-expect-error — fetchpriority is the lowercase HTML attribute
        fetchpriority={fetchPriority}
        decoding="async"
        width={800}
        height={600}
        // Cache race: a cached image can finish loading before React
        // attaches onLoad, so onLoad never fires and the figure stays
        // at opacity 0. Resolve completeness on the ref instead.
        ref={(el) => {
          if (el && el.complete && el.naturalWidth > 0) setState("loaded");
        }}
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
          // Show the artwork CLEAN — a heavy grayscale+sepia+multiply
          // treatment previously muddied it into a brown swamp. A hair
          // of restraint only, so it doesn't fight the cream page.
          filter: "saturate(0.96) contrast(1.02)",
        }}
      />
      {annotate && state === "loaded" && (
        <PositionAnnotation
          positionKey={positionKey}
          name={annotate.name}
          load={annotate.load}
          loadNote={annotate.loadNote}
        />
      )}
      <style>{SHIMMER_CSS}</style>
    </PictogramFrame>
  );
}

/* ───────── exercises: Pk0001 recolored SVGs ───────── */

function IllustratedExercise({ exerciseKey }: { exerciseKey: PictogramKey }) {
  const meta = EXERCISE_META[exerciseKey];
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");

  if (!meta) return <Fallback meta={{ title: exerciseKey, sub: "Unknown exercise key" }} />;
  if (state === "error") return <Fallback meta={{ title: meta.title, sub: meta.sub }} />;

  const caption = `${meta.title} · ${meta.sub}`;
  const altText = `Illustration demonstrating the ${meta.title.toLowerCase()}: ${meta.sub.toLowerCase()}.`;

  return (
    <PictogramFrame caption={caption} attribution="Illus. Pk0001 · CC-BY-SA 4.0">
      {state === "loading" && <Skeleton />}
      <img
        src={`/exercises/${meta.file}`}
        alt={altText}
        loading="lazy"
        decoding="async"
        width={800}
        height={520}
        // Cache race fix — resolve completeness on ref attach in case
        // the SVG loads before React binds onLoad.
        ref={(el) => {
          if (el && el.complete && el.naturalWidth > 0) setState("loaded");
        }}
        onLoad={() => setState("loaded")}
        onError={() => setState("error")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          padding: "28px 24px 52px",
          opacity: state === "loaded" ? 1 : 0,
          transition: "opacity 280ms ease",
        }}
      />
      <style>{SHIMMER_CSS}</style>
    </PictogramFrame>
  );
}

/* ───────── solo position: hand-authored SVG ───────── */

function SupineBolster() {
  return (
    <PictogramFrame caption="Solo supine · Hips elevated · Knees up">
      <svg
        viewBox="0 0 480 360"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        role="img"
        aria-label="Solo supine with the hips elevated on a bolster and knees up."
      >
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
    </PictogramFrame>
  );
}

/* ───────── dispatch ───────── */

export function Pictogram({
  positionKey,
  className,
  style,
  loading = "lazy",
  fetchPriority = "auto",
  showCaption = true,
  annotate,
}: PictogramProps) {
  const wrap = (child: React.ReactNode) => (
    <div className={className} style={{ width: "100%", height: "100%", ...style }}>
      {child}
    </div>
  );

  if (SEX_POSITION_KEYS.includes(positionKey)) {
    return wrap(
      <IllustratedPosition
        positionKey={positionKey}
        loading={loading}
        fetchPriority={fetchPriority}
        showCaption={showCaption}
        annotate={annotate}
      />,
    );
  }
  if (positionKey === "supine-bolster") {
    return wrap(<SupineBolster />);
  }
  if (EXERCISE_META[positionKey]) {
    return wrap(<IllustratedExercise exerciseKey={positionKey} />);
  }
  return null;
}

export default Pictogram;
