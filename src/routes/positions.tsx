import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  POSITIONS,
  matchToTodaysBack,
  maxLoadForIndex,
  type Position,
} from "@/lib/position-library";

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
  return (
    <li className="bg-background p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono-label text-[9px] tracking-[0.22em] uppercase text-muted-foreground">
            {p.id} · {p.category}
          </p>
          <h3 className="font-serif-display text-xl mt-1 leading-snug">{p.name}</h3>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
        <div>
          <p className="font-mono-label text-[9px] tracking-[0.18em] uppercase text-muted-foreground mb-1">
            Lumbar load
          </p>
          <Score v={p.lumbarLoad} />
        </div>
        <div>
          <p className="font-mono-label text-[9px] tracking-[0.18em] uppercase text-muted-foreground mb-1">
            Hip flexion
          </p>
          <Score v={p.hipFlexion} />
        </div>
        <div>
          <p className="font-mono-label text-[9px] tracking-[0.18em] uppercase text-muted-foreground mb-1">
            Breath access
          </p>
          <Score v={p.breathAccess} />
        </div>
        <div>
          <p className="font-mono-label text-[9px] tracking-[0.18em] uppercase text-muted-foreground mb-1">
            Partner mobility
          </p>
          <Score v={p.partnerMobility} />
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground leading-relaxed italic border-t border-border pt-3">
        {p.councilNote}
      </p>
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
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/70 border-b border-border/60">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <svg width="22" height="22" viewBox="0 0 22 22" className="text-[var(--brand-amber)]">
              <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
              <circle cx="11" cy="11" r="3" fill="currentColor" />
            </svg>
            <span className="font-serif-display text-xl tracking-tight italic">
              Back<span style={{ color: "var(--brand-amber)" }}>Stroke</span>
            </span>
          </Link>
          <Link to="/" className="font-mono-label text-[10px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition">
            ← back to home
          </Link>
        </div>
      </header>

      <section className="px-6 md:px-10 py-16 md:py-20 border-b border-border">
        <div className="max-w-[1280px] mx-auto">
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">
            POSITION LIBRARY · 40 ENTRIES · SCORED BY SPINE
          </p>
          <h1 className="font-serif-display text-5xl md:text-7xl mt-5 leading-[0.98] tracking-[-0.025em] max-w-3xl">
            Pick something <span className="italic" style={{ color: "var(--brand-amber)" }}>your back can sign off on.</span>
          </h1>
          <p className="mt-7 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Every entry has four scores and a one-line note from the clinical council. Filter by today's Index. If the lumbar load is over your cap, the position drops out of the list. We do not hide it dramatically, with a paywall and a candle.
          </p>
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
              <option value="lumbarLoad">Lumbar load — ascending</option>
              <option value="breathAccess">Breath access — descending</option>
              <option value="hipFlexion">Hip flexion — ascending</option>
              <option value="partnerMobility">Partner mobility — ascending</option>
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
