import type { ReactNode } from "react";

/**
 * BackStroke editorial primitives.
 *
 * The brand is dry, dark, observational. These components enforce the
 * magazine-grade vocabulary the original hero earned: FIG.-numbered figure
 * tags, mono-uppercase eyebrows, Fraunces display headlines, gold and blush
 * accents on amber-ink, gradient and glow flourishes.
 *
 * Rule: no new page ships without using these. Plain card grids are not part
 * of the brand and are not coming back.
 */

type Accent = "amber" | "blush";

const accentColor = (a: Accent = "amber") =>
  a === "blush" ? "var(--brand-blush)" : "var(--brand-amber)";

/* -------------------- Eyebrow + Display header -------------------- */

export function Eyebrow({
  children,
  accent = "amber",
  className = "",
}: {
  children: ReactNode;
  accent?: Accent;
  className?: string;
}) {
  return (
    <p
      className={`font-mono-label text-[10px] tracking-[0.22em] uppercase ${className}`}
      style={{ color: accentColor(accent) }}
    >
      {children}
    </p>
  );
}

export function MonoTag({
  children,
  muted = false,
}: {
  children: ReactNode;
  muted?: boolean;
}) {
  return (
    <span
      className={`font-mono-label text-[9px] tracking-[0.22em] uppercase ${
        muted ? "text-muted-foreground" : ""
      }`}
    >
      {children}
    </span>
  );
}

export function EyebrowHeader({
  eyebrow,
  title,
  body,
  accent = "amber",
  align = "left",
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  accent?: Accent;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
      <Eyebrow accent={accent}>{eyebrow}</Eyebrow>
      <h2 className="font-serif-display text-4xl md:text-6xl mt-4 leading-[0.98] tracking-[-0.025em]">
        {title}
      </h2>
      {body && (
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{body}</p>
      )}
    </div>
  );
}

/* -------------------- FIG. figure panel -------------------- */

export function FigurePanel({
  src,
  alt = "",
  figLabel,
  rightTag,
  rightTagColor,
  bottomEyebrow,
  bottomTitle,
  aspect = "5/4",
  accent = "amber",
}: {
  src?: string;
  alt?: string;
  figLabel: string;
  rightTag?: string;
  rightTagColor?: string;
  bottomEyebrow?: string;
  bottomTitle?: ReactNode;
  aspect?: "5/4" | "4/5" | "16/10" | "1/1";
  accent?: Accent;
}) {
  const aspectClass =
    aspect === "4/5"
      ? "aspect-[4/5]"
      : aspect === "16/10"
        ? "aspect-[16/10]"
        : aspect === "1/1"
          ? "aspect-square"
          : "aspect-[5/4]";

  return (
    <figure className="relative overflow-hidden" style={{ boxShadow: "var(--shadow-lift)" }}>
      <div className={`relative ${aspectClass}`}>
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background:
                "radial-gradient(ellipse at 30% 30%, oklch(0.22 0.04 30), var(--brand-ink) 70%), linear-gradient(180deg, transparent, oklch(0.08 0 0))",
            }}
          />
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(180deg, transparent 50%, oklch(0.08 0 0 / 0.65) 100%)" }}
        />

        <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono-label text-[9px] text-white/80 tracking-[0.2em] uppercase">
          <span>{figLabel}</span>
          {rightTag && (
            <span style={{ color: rightTagColor ?? accentColor(accent) }}>{rightTag}</span>
          )}
        </div>

        {(bottomEyebrow || bottomTitle) && (
          <figcaption className="absolute bottom-4 left-5 right-5">
            {bottomEyebrow && (
              <p
                className="font-mono-label text-[10px] tracking-[0.22em] uppercase mb-1"
                style={{ color: accentColor(accent) }}
              >
                {bottomEyebrow}
              </p>
            )}
            {bottomTitle && (
              <h3
                className="font-serif-display text-2xl md:text-3xl italic leading-[1.05]"
                style={{ color: accent === "blush" ? accentColor(accent) : "white" }}
              >
                {bottomTitle}
              </h3>
            )}
          </figcaption>
        )}
      </div>
    </figure>
  );
}

/* -------------------- Editorial stat -------------------- */

export function EditorialStat({
  value,
  blurb,
  methodology,
  cohort,
  accent = "amber",
}: {
  value: ReactNode;
  blurb: ReactNode;
  methodology?: ReactNode;
  cohort?: ReactNode;
  accent?: Accent;
}) {
  return (
    <div className="bg-background p-7 md:p-9">
      <p
        className="font-serif-display text-5xl md:text-6xl tracking-tight"
        style={{ color: accentColor(accent) }}
      >
        {value}
      </p>
      <p className="font-serif-display text-base italic text-foreground/90 mt-4 leading-snug">
        {blurb}
      </p>
      {cohort && (
        <p className="font-mono-label text-[9px] tracking-[0.22em] uppercase text-muted-foreground mt-3">
          {cohort}
        </p>
      )}
      {methodology && (
        <p className="text-[11px] text-muted-foreground/80 mt-5 leading-relaxed italic border-t border-border/60 pt-4">
          {methodology}
        </p>
      )}
    </div>
  );
}

/* -------------------- Gold grid strip -------------------- */

export function GoldGridStrip({
  items,
  accent = "amber",
}: {
  items: Array<[ReactNode, ReactNode]>;
  accent?: Accent;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border border-border">
      {items.map(([v, l], i) => (
        <div key={i} className="bg-background/80 px-4 py-4">
          <p
            className="font-serif-display text-2xl md:text-3xl tracking-tight"
            style={{ color: accentColor(accent) }}
          >
            {v}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{l}</p>
        </div>
      ))}
    </div>
  );
}

/* -------------------- Neon stamp -------------------- */

export function NeonStamp({
  children,
  accent = "blush",
  size = 140,
  rotate = 6,
  className = "",
}: {
  children: ReactNode;
  accent?: Accent;
  size?: number;
  rotate?: number;
  className?: string;
}) {
  const color = accentColor(accent);
  const glow = accent === "blush" ? "var(--glow-pink)" : "var(--glow-teal)";
  return (
    <div
      className={`grid place-items-center text-center rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        border: `1px solid ${color}`,
        boxShadow: glow,
        background: "oklch(0.14 0.008 60 / 0.65)",
        backdropFilter: "blur(6px)",
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <div
        className="font-display-bold text-[11px] leading-[1.18] tracking-[0.04em] px-4"
        style={{ color }}
      >
        {children}
      </div>
    </div>
  );
}

/* -------------------- Dry empty state -------------------- */

export function DryEmptyState({
  eyebrow,
  title,
  body,
  accent = "amber",
  cta,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  accent?: Accent;
  cta?: ReactNode;
}) {
  return (
    <div
      className="rounded-2xl border border-border bg-background/40 p-8 md:p-10"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <Eyebrow accent={accent}>{eyebrow}</Eyebrow>
      <p className="font-serif-display text-2xl md:text-3xl italic mt-4 leading-snug">
        {title}
      </p>
      {body && (
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-md">
          {body}
        </p>
      )}
      {cta && <div className="mt-6">{cta}</div>}
    </div>
  );
}

/* -------------------- Section frame -------------------- */

export function EditorialSection({
  id,
  children,
  variant = "plain",
  className = "",
}: {
  id?: string;
  children: ReactNode;
  variant?: "plain" | "velvet" | "ember";
  className?: string;
}) {
  const style: React.CSSProperties =
    variant === "velvet"
      ? {
          background:
            "linear-gradient(180deg, oklch(0.155 0.018 26), oklch(0.125 0.012 28))",
        }
      : variant === "ember"
        ? {
            background:
              "radial-gradient(ellipse at 70% 40%, oklch(0.22 0.05 25) 0%, var(--brand-ink) 60%)",
          }
        : {};

  return (
    <section
      id={id}
      className={`relative px-6 md:px-10 py-20 md:py-28 border-b border-border overflow-hidden ${className}`}
      style={style}
    >
      <div className="max-w-[1280px] mx-auto relative">{children}</div>
    </section>
  );
}
