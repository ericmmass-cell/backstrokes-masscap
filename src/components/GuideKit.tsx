/**
 * GuideKit — shared building blocks for the public guide / clinician / study
 * pages. One brand surface: paper, oxblood, serif-display headings, mono labels.
 * (Separate from the legacy Editorial.tsx, which uses the older dark vocabulary.)
 */
import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import type { Block, Faq } from "@/content/guide";

export const OX = "var(--brand-oxblood, #722B2B)";
export const PAPER = "var(--brand-paper, #F4EFE3)";
export const INK = "var(--brand-paper-ink, #2a2620)";
export const RULE = "var(--brand-rule, #d9ccae)";
export const MUTED = "oklch(0.5 0.02 40)";

export function GuideShell({ children }: { children: ReactNode }) {
  return (
    <main style={{ minHeight: "100vh", background: PAPER, color: INK }}>
      <div className="mx-auto px-6 md:px-10 py-12 md:py-16" style={{ maxWidth: 760 }}>
        <Link to="/guide" className="font-mono-label text-[11px] tracking-[0.28em] uppercase" style={{ color: OX }}>
          BackStroke · Guide
        </Link>
        {children}
        <footer className="mt-16 pt-6" style={{ borderTop: `1px solid ${RULE}` }}>
          <p className="text-xs italic leading-relaxed" style={{ color: MUTED }}>
            Information, not a diagnosis. BackStroke organizes public-source biomechanics; it is not medical care or
            sex therapy. If a position hurts, that is a no, and no ranking overrides it. New leg symptoms, numbness, or
            bladder or bowel changes are a see-a-clinician signal.
          </p>
        </footer>
      </div>
    </main>
  );
}

export function PageEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono-label text-[11px] tracking-[0.26em] uppercase mt-10" style={{ color: OX }}>
      {children}
    </p>
  );
}

export function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-serif-display italic mt-4 leading-[1.0] tracking-[-0.02em]" style={{ fontSize: "clamp(32px, 5.4vw, 60px)" }}>
      {children}
    </h1>
  );
}

export function Dek({ children }: { children: ReactNode }) {
  return (
    <p className="mt-5 text-base md:text-lg leading-relaxed" style={{ color: "oklch(0.42 0.02 40)" }}>
      {children}
    </p>
  );
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="mt-8 flex flex-col gap-5">
      {blocks.map((b, i) => {
        if (b.type === "h2")
          return (
            <h2 key={i} className="font-serif-display leading-[1.1] tracking-[-0.01em] mt-6" style={{ fontSize: "clamp(24px, 3.4vw, 34px)", color: INK }}>
              {b.text}
            </h2>
          );
        if (b.type === "callout")
          return (
            <p key={i} className="font-serif-display italic leading-snug pl-5 my-2" style={{ fontSize: "clamp(19px, 2.2vw, 24px)", borderLeft: `3px solid ${OX}`, color: INK }}>
              {b.text}
            </p>
          );
        if (b.type === "list")
          return (
            <ul key={i} className="flex flex-col gap-2.5">
              {b.items.map((it, j) => (
                <li key={j} className="flex gap-3 leading-relaxed" style={{ fontSize: 16.5 }}>
                  <span aria-hidden className="shrink-0" style={{ color: OX }}>&middot;</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          );
        return (
          <p key={i} className="leading-relaxed" style={{ fontSize: 16.5, color: "oklch(0.3 0.015 40)" }}>
            {b.text}
          </p>
        );
      })}
    </div>
  );
}

export function Faqs({ items }: { items: Faq[] }) {
  return (
    <section className="mt-14">
      <p className="font-mono-label text-[11px] tracking-[0.24em] uppercase" style={{ color: OX }}>
        Questions people actually ask
      </p>
      <div className="mt-6 flex flex-col">
        {items.map((f, i) => (
          <div key={i} className="py-5" style={{ borderTop: `1px solid ${RULE}` }}>
            <h3 className="font-serif-display leading-snug" style={{ fontSize: 19, color: INK }}>{f.q}</h3>
            <p className="mt-2 leading-relaxed" style={{ fontSize: 15.5, color: "oklch(0.4 0.015 40)" }}>{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Sources({ items }: { items: string[] }) {
  return (
    <section className="mt-12 pt-6" style={{ borderTop: `1px solid ${RULE}` }}>
      <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: MUTED }}>Sources</p>
      <ul className="mt-3 flex flex-col gap-2">
        {items.map((s, i) => (
          <li key={i} className="text-xs leading-relaxed italic" style={{ color: MUTED }}>{s}</li>
        ))}
      </ul>
    </section>
  );
}

/** the conversion button: into the free ranker */
export function RankerCTA({ line }: { line?: string }) {
  return (
    <div className="mt-12 rounded-2xl p-7" style={{ border: `1px solid ${RULE}`, background: "#FBF7EC" }}>
      {line && (
        <p className="font-serif-display italic leading-snug" style={{ fontSize: "clamp(20px, 2.6vw, 27px)" }}>{line}</p>
      )}
      <Link
        to="/rank"
        search={{ t: undefined, r: undefined }}
        className="mt-5 inline-flex items-center gap-2 rounded-full font-semibold text-sm transition hover:opacity-90"
        style={{ background: OX, color: PAPER, padding: "14px 26px" }}
      >
        Rank my positions · free →
      </Link>
    </div>
  );
}
