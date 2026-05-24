import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  POSITIONS,
  matchToTodaysBack,
  maxLoadForIndex,
  type Position,
} from "@/lib/position-library";
import { PositionDemo } from "@/components/PositionDemo";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/positions")({
  component: PositionsPage,
  head: () => ({
    meta: [
      { title: "Position library, scored by spine · BackStroke" },
      {
        name: "description",
        content:
          "Forty positions, each scored on lumbar load, hip flexion, breath access, and partner mobility. Filter by your current Index. Sort by what your back can sign off on.",
      },
    ],
  }),
});

type SortKey = "lumbarLoad" | "breathAccess" | "hipFlexion" | "partnerMobility";

const CATEGORIES: Array<Position["category"] | "all"> = [
  "all",
  "low-load",
  "moderate",
  "high-load",
  "solo",
];

function Score({ v }: { v: number }) {
  return (
    <span className="inline-flex items-center gap-1 font-mono-label text-[10px] tracking-[0.18em] uppercase">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background:
              n <= v ? "var(--brand-amber)" : "oklch(0.3 0.01 30)",
          }}
        />
      ))}
    </span>
  );
}

function PositionRow({ p }: { p: Position }) {
  const cat = p.category.toUpperCase();
  return (
    <li className="bg-background flex flex-col">
      <PositionDemo positionId={p.id} />

      <div className="p-6 md:p-7 flex flex-col">
        {/* Eyebrow + ID */}
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-mono-label text-[10px] tracking-[0.28em] uppercase" style={{ color: "var(--brand-oxblood)" }}>
            {p.id.toUpperCase()} · {cat}
          </span>
          {p.lumbarLoad <= 2 && (
            <span className="font-mono-label text-[9px] tracking-[0.18em] uppercase" style={{ color: "var(--brand-oxblood)", opacity: 0.6 }}>
              acute-day safe
            </span>
          )}
        </div>

        {/* Title — serif italic editorial */}
        <h3 className="font-serif-display text-2xl md:text-[26px] italic mt-3 leading-tight">
          {p.name}
        </h3>

        {/* Council note as pull-quote */}
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground" style={{ borderLeft: "2px solid var(--brand-oxblood)", paddingLeft: 14 }}>
          {p.councilNote}
        </p>

        {/* Score grid */}
        <div className="mt-5 grid grid-cols-2 gap-3 text-[11px]">
          {[
            ["Lumbar load", p.lumbarLoad],
            ["Hip flexion", p.hipFlexion],
            ["Breath access", p.breathAccess],
            ["Partner mobility", p.partnerMobility],
          ].map(([label, v]) => (
            <div key={label as string} className="flex items-center justify-between gap-2">
              <span className="font-mono-label text-[9px] tracking-[0.18em] uppercase text-muted-foreground">{label}</span>
              <Score v={v as number} />
            </div>
          ))}
        </div>

        {/* Stop-if rule */}
        <div className="mt-5 pt-4 border-t border-border">
          <p className="font-mono-label text-[9px] tracking-[0.22em] uppercase mb-1.5" style={{ color: "var(--brand-oxblood)", opacity: 0.7 }}>
            Stop rule
          </p>
          <p className="text-[11px] italic leading-relaxed text-muted-foreground">
            Sharp pain. Radiating leg symptoms. Numbness. Pelvic guarding. The feeling that optimism is doing the steering.
          </p>
        </div>
      </div>
    </li>
  );
}

function PositionsPage() {
  const [index, setIndex] = useState(67);
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("all");
  const [sort, setSort] = useState<SortKey>("lumbarLoad");
  const [showMatch, setShowMatch] = useState(false);

  const cap = maxLoadForIndex(index);

  const rows = useMemo(() => {
    if (showMatch) return matchToTodaysBack(index, 3);
    return [...POSITIONS]
      .filter((p) => (category === "all" ? true : p.category === category))
      .filter((p) => p.lumbarLoad <= cap)
      .sort((a, b) => {
        if (sort === "lumbarLoad") return a.lumbarLoad - b.lumbarLoad;
        if (sort === "breathAccess") return b.breathAccess - a.breathAccess;
        if (sort === "hipFlexion") return a.hipFlexion - b.hipFlexion;
        return a.partnerMobility - b.partnerMobility;
      });
  }, [index, category, sort, showMatch, cap]);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SiteHeader active="positions" />

      <section className="px-6 md:px-10 py-16 md:py-20 border-b border-border">
        <div className="max-w-[1280px] mx-auto">
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">
            POSITION LIBRARY · 40 ENTRIES · SCORED BY SPINE
          </p>
          <h1 className="font-serif-display text-5xl md:text-7xl mt-5 leading-[0.98] tracking-[-0.025em] max-w-3xl">
            Bedroom geometry, <span className="italic" style={{ color: "var(--brand-amber)" }}>scored by spine.</span>
          </h1>
          <p className="mt-7 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Every position is scored for lumbar load, hip demand, breath access, and partner mobility. Filter by today's Index. If a position exceeds the cap, it drops out quietly. We do not make it a tragedy. We are not magazine editors.
          </p>
          <div
            className="mt-8 p-5 border-l-2 max-w-2xl flex flex-col sm:flex-row sm:items-center gap-5"
            style={{ borderColor: "var(--brand-oxblood)", background: "var(--card)" }}
          >
            <div className="flex-1 min-w-0">
              <p className="font-mono-label text-[9px] tracking-[0.22em] uppercase mb-1" style={{ color: "var(--brand-oxblood)" }}>
                Looking for a plan, not a list?
              </p>
              <p className="font-serif-display italic text-lg leading-snug">
                Six taps in the Position Intelligence Engine returns a warm-up, a main course, and a dessert option ranked for tonight's body.
              </p>
            </div>
            <a
              href="/engine.html"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition hover:opacity-90 shrink-0 self-start sm:self-auto"
              style={{ background: "var(--brand-oxblood)", color: "var(--brand-paper)" }}
            >
              Open the engine →
            </a>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="px-6 md:px-10 py-8 border-b border-border bg-card/30 sticky top-16 z-20 backdrop-blur-xl">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-4 gap-6 items-end">
          <div>
            <label className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
              Today's Index ({index})
            </label>
            <input
              type="range"
              min={20}
              max={100}
              value={index}
              onChange={(e) => {
                setShowMatch(false);
                setIndex(Number(e.target.value));
              }}
              className="w-full mt-3 accent-[var(--brand-amber)]"
              aria-label="Today's Index score"
            />
            <p className="font-mono-label text-[9px] tracking-[0.18em] uppercase text-muted-foreground mt-2">
              Max lumbar load tonight · {cap}/5
            </p>
          </div>

          <div>
            <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
              Category
            </p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setShowMatch(false);
                    setCategory(c);
                  }}
                  className={`px-3 py-1.5 rounded-full font-mono-label text-[10px] tracking-[0.18em] uppercase transition ${
                    category === c
                      ? "bg-foreground text-background"
                      : "border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
              Sort by
            </p>
            <select
              value={sort}
              onChange={(e) => {
                setShowMatch(false);
                setSort(e.target.value as SortKey);
              }}
              className="w-full px-3 py-2 rounded-md bg-background border border-border text-sm"
            >
              <option value="lumbarLoad">Lumbar load · ascending</option>
              <option value="breathAccess">Breath access · descending</option>
              <option value="hipFlexion">Hip flexion · ascending</option>
              <option value="partnerMobility">Partner mobility · ascending</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => setShowMatch((s) => !s)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[var(--brand-amber)] text-[var(--brand-ink)] text-sm font-semibold hover:opacity-90 transition"
          >
            {showMatch ? "Show all matches" : "Match to today's back →"}
          </button>
        </div>
      </section>

      {/* Results */}
      <section className="px-6 md:px-10 py-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-baseline justify-between mb-6">
            <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">
              {showMatch ? "Top 3 for tonight" : `${rows.length} of ${POSITIONS.length} positions`}
            </p>
            {showMatch && (
              <p className="font-mono-label text-[9px] tracking-[0.18em] uppercase text-muted-foreground">
                Ranked by lumbar load + breath access · Index {index}
              </p>
            )}
          </div>

          {rows.length === 0 ? (
            <p className="font-serif-display text-xl italic text-muted-foreground max-w-md">
              Nothing in this slice clears today's load cap. Lower the filter. Or pick solo, which the spine has fewer opinions about and the council has no notes on.
            </p>
          ) : (
            <ul className="grid md:grid-cols-2 gap-px bg-border border border-border">
              {rows.map((p) => (
                <PositionRow key={p.id} p={p} />
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
