import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect, useRef, type KeyboardEvent } from "react";
import {
  POSITIONS,
  matchToTodaysBack,
  maxLoadForIndex,
  roleLoad,
  roleLoadNote,
  conditionsFor,
  CONDITIONS,
  type Position,
  type Role,
  type Condition,
} from "@/lib/position-library";

const ROLES: { key: Role; label: string; short: string }[] = [
  { key: "either", label: "Depends on the day", short: "Either role" },
  { key: "penetrator", label: "Penetrating partner", short: "Penetrating" },
  { key: "receiver", label: "Receiving partner", short: "Receiving" },
];
import { PositionDemo } from "@/components/PositionDemo";
import { Pictogram, type PictogramKey } from "@/components/Pictogram";
import { PositionGuide } from "@/components/PositionGuide";
import { SiteHeader } from "@/components/SiteHeader";
import { PopAtlas } from "@/components/PopAtlas";

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
    // Position figures are now inline-SVG diagrams (PositionDiagram), drawn in
    // the bundle. There is nothing to preload · switching is already instant.
  }),
});

type SortKey = "lumbarLoad" | "breathAccess" | "hipFlexion" | "partnerMobility";

const CATEGORIES: Array<Position["category"] | "all"> = [
  "all",
  "low-load",
  "moderate",
  "high-load",
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

/**
 * Explicit position → illustration map, hand-assigned by id.
 *
 * We have 8 real Seedfeeder illustrations for 37 catalogued positions,
 * so each illustration stands in
 * for its whole geometric FAMILY. Keyword matching was misfiring badly
 * ("Supine with wEDGE" matched /edge/ and drew the edge-of-bed couple),
 * so every entry is now assigned by hand to the figure that actually
 * shows its body geometry: who is supine vs. side-lying vs. on top vs.
 * on hands-and-knees, and where the spine load sits.
 *
 * Where a position has no true match in the set (standing, prone), it
 * borrows the nearest readable geometry and the card's name + scores +
 * note carry the specifics.
 */
const ILLUSTRATION_BY_ID: Record<string, PictogramKey> = {
  // Side-lying / spooning (one partner behind, both on their sides)
  p01: "spoon",          // Side-lying spoons, top knee supported
  p23: "spoon",          // Side-lying, receiver supported by wedge
  p28: "spoon",          // Side-by-side, facing same direction, spooning
  p36: "spoon",          // Side-lying, top leg straight back

  // True missionary · receiver supine, partner above
  p03: "missionary",      // Supine, knees over pillow, missionary
  p13: "missionary",      // Modified missionary, legs in stirrups
  p34: "missionary",      // Supine, partner kneeling, no lumbar load

  // Supine on the back (wedges, bolsters, knees-up · no partner shown above)
  p02: "supine-knees-up", // Supine with wedge under pelvis
  p06: "supine-knees-up", // Supine, hips elevated on bolster
  p22: "supine-knees-up", // Supine, double-pillow lumbar support
  p25: "supine-knees-up", // Supine, both knees pulled to chest
  p29: "supine-knees-up", // Supine, legs straight, ankles together
  p33: "supine-knees-up", // Lying on stomach, pillow under hips (nearest lying-flat)
  p38: "supine-knees-up", // Supine, one knee bent and externally rotated

  // Side-lying T / lifted-leg geometry
  p04: "side-T",          // Side-lying, T-position
  p18: "side-T",          // Side-lying, top leg in handheld stirrup

  // Side-lying scissor / interlocked legs, perpendicular
  p07: "scissor",         // Side-by-side, facing, knees interlocked
  p14: "scissor",         // Side-lying, scissor

  // Receiver on top (cowgirl / reverse / squat-over)
  p11: "cowgirl-upright", // Reverse cowgirl, receiving partner reclining
  p12: "cowgirl-upright", // Cowgirl, upright
  p27: "cowgirl-upright", // Cowgirl, leaning back on partner's thighs
  p37: "cowgirl-upright", // Squatting over partner

  // Quadruped, chest-down / forearms-supported
  p09: "doggy-supported", // Quadruped, forearms down
  p10: "doggy-supported", // Quadruped, chest on bolster

  // Quadruped, upright kneeling rear-entry
  p19: "doggy-kneeling",  // Doggy on the bed, knees on pillow
  p30: "doggy-kneeling",  // Quadruped, hands on headboard

  // Standing (both upright, partner behind or face-to-face)
  p08: "standing",        // Standing, receiving partner bent over support
  p15: "standing",        // Standing, both upright, back to wall
  p24: "standing",        // Standing, supported squat with partner
  p32: "standing",        // Standing, hands on counter, partner behind
  p39: "standing",        // Standing, both face-to-face, low partner squat

  // Edge-of-bed / reclined-at-edge
  p16: "edge-bed",        // Edge-of-bed, receiving partner supine
  p26: "edge-bed",        // Edge-of-bed, receiver standing, partner kneeling
  p31: "edge-bed",        // Couch edge, receiving partner reclined

  // Seated / upright face-to-face (lap, cradle)
  p05: "seated-lap",      // Seated, partner on lap, both upright
  p17: "seated-lap",      // Lap-sitting, facing, both upright
  p35: "seated-lap",      // Cradle-sitting, facing, both legs wrapped
};

function illustrationFor(p: Position): PictogramKey {
  return ILLUSTRATION_BY_ID[p.id] ?? "supine-knees-up";
}

/** First library position that renders with a given illustration family ·
 *  used to feed the showcase annotation layer representative clinical data. */
function representativeFor(key: PictogramKey): Position | undefined {
  return POSITIONS.find((p) => illustrationFor(p) === key);
}

/** Build the teaching-overlay payload for a position at a given role. */
function annotateData(p: Position, role: Role) {
  return { name: p.name, load: roleLoad(p, role), loadNote: roleLoadNote(p, role) };
}

function PositionRow({ p, role }: { p: Position; role: Role }) {
  const cat = p.category.toUpperCase();
  const yourLoad = roleLoad(p, role);
  const partnerLoad = role === "either" ? yourLoad : roleLoad(p, role === "penetrator" ? "receiver" : "penetrator");
  // "Acute-day safe" is a safety claim: never wear it on a high-load shape or
  // one whose other side carries 4+, no matter how easy YOUR side reads.
  const acuteSafe = yourLoad <= 2 && p.category !== "high-load" && partnerLoad < 4;
  const loadLabel = role === "either" ? "Lumbar load" : "Your lumbar load";
  const conds = conditionsFor(p);
  const condLabels = conds
    .map((k) => CONDITIONS.find((c) => c.key === k)?.label)
    .filter(Boolean) as string[];
  return (
    <li className="bg-background flex flex-col overflow-hidden rounded-2xl border border-border">
      <div style={{ aspectRatio: "3 / 4" }}>
        <Pictogram positionKey={illustrationFor(p)} assetId={p.id} showCaption={false} annotate={annotateData(p, role)} />
      </div>

      <div className="p-6 md:p-7 flex flex-col">
        {/* Eyebrow + ID */}
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-mono-label text-[10px] tracking-[0.28em] uppercase" style={{ color: "var(--brand-oxblood)" }}>
            {p.id.toUpperCase()} · {cat}
          </span>
          {acuteSafe && (
            <span className="font-mono-label text-[9px] tracking-[0.18em] uppercase" style={{ color: "var(--brand-oxblood)", opacity: 0.6 }}>
              acute-day safe
            </span>
          )}
        </div>

        {/* Title · the nickname is the headline, the clinical name the subtitle */}
        <h3 className="font-serif-display text-2xl md:text-[26px] italic mt-3 leading-tight">
          {p.nickname}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground leading-snug">{p.name}</p>

        {/* Council note as pull-quote */}
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground" style={{ borderLeft: "2px solid var(--brand-oxblood)", paddingLeft: 14 }}>
          {p.councilNote}
        </p>

        {/* Role-aware lumbar read · whose back is working */}
        <p className="mt-4 font-mono-label text-[9px] tracking-[0.18em] uppercase leading-relaxed" style={{ color: "var(--brand-amber)" }}>
          {roleLoadNote(p, role)}
        </p>

        {/* Condition suitability tags */}
        {condLabels.length > 0 && (
          <div className="mt-4">
            <p className="font-mono-label text-[9px] tracking-[0.22em] uppercase mb-1.5 text-muted-foreground">
              Tends to spare
            </p>
            <div className="flex flex-wrap gap-1.5">
              {condLabels.map((label) => (
                <span
                  key={label}
                  className="font-mono-label text-[9px] tracking-[0.12em] uppercase px-2 py-0.5 rounded-full"
                  style={{ background: "color-mix(in oklch, var(--brand-amber) 18%, transparent)", color: "var(--brand-ink)" }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Score grid */}
        <div className="mt-5 grid grid-cols-2 gap-3 text-[11px]">
          {[
            [loadLabel, yourLoad],
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

/* ───────── 3D position showcase (top of page) ───────── */
// Picker over the 4 calibrated Position3D positions. The library
// below this is still sprite-based for the full 30+ entries. The
// 3D system extends one position at a time; as more get calibrated
// they get added to PICKABLE.

type Pickable = { key: PictogramKey; label: string; sub: string };
const PICKABLE: Pickable[] = [
  { key: "spoon", label: "Spoon", sub: "Lateral · low spinal load" },
  { key: "supine-knees-up", label: "Modified missionary", sub: "Receiver supine · knees over bolster" },
  { key: "side-T", label: "Side-lying T", sub: "Side-lying · partner kneeling perpendicular" },
  { key: "edge-bed", label: "Edge of bed", sub: "Receiver supine at edge · partner kneeling" },
  { key: "cowgirl-upright", label: "Receiver on top, upright", sub: "Straddling · partner supine · highest receiver agency" },
  { key: "doggy-supported", label: "Supported rear-entry", sub: "Quadruped chest-down · forearms supported" },
  { key: "scissor", label: "Side-lying scissor", sub: "Perpendicular · both partners side-lying" },
  { key: "seated-lap", label: "Seated lap embrace", sub: "Both upright · face to face · stacked spines" },
];

/* ───────── PositionShowcase ─────────
 *
 * Hardened picker. ARIA radiogroup pattern, full keyboard nav
 * (ArrowUp/Down/Left/Right cycle, Home/End jump, Tab leaves the
 * group). Active item is announced via aria-checked; focus is
 * managed via roving tabindex so screen-reader and keyboard users
 * get one focusable item at a time and arrow keys cycle.
 *
 * Image preloading: link rel=preload tags injected via route head
 * (see Route.head()). Picker switching is instant in the cache-
 * warm case.
 */
function PositionShowcase() {
  const [pickIdx, setPickIdx] = useState(0);
  const pick = PICKABLE[pickIdx];
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Roving tabindex with arrow-key + Home/End nav.
  // Selection follows focus (matches ARIA radio pattern).
  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const max = PICKABLE.length - 1;
    let next = pickIdx;
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        next = pickIdx === max ? 0 : pickIdx + 1;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        next = pickIdx === 0 ? max : pickIdx - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = max;
        break;
      default:
        return;
    }
    e.preventDefault();
    setPickIdx(next);
    itemRefs.current[next]?.focus();
  };

  return (
    <section
      className="px-6 md:px-10 py-12 border-b"
      style={{ borderColor: "oklch(0.86 0.025 70)" }}
      aria-labelledby="position-showcase-heading"
    >
      <div className="max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 min-w-0">
          <div
            style={{ aspectRatio: "4 / 3", minHeight: 280 }}
            role="region"
            aria-label={`${pick.label} position illustration`}
          >
            <Pictogram
              positionKey={pick.key}
              annotate={(() => {
                const rep = representativeFor(pick.key);
                return rep ? annotateData(rep, "either") : undefined;
              })()}
            />
          </div>
          <PositionGuide pkey={pick.key} role="both" />
        </div>
        <div className="lg:col-span-5 flex flex-col min-w-0">
          <p
            className="font-mono-label text-[10px] tracking-[0.22em] uppercase"
            style={{ color: "var(--brand-oxblood)" }}
          >
            Drawn · {PICKABLE.length} of {POSITIONS.length} · arrow keys to browse
          </p>
          <h2
            id="position-showcase-heading"
            aria-live="polite"
            className="font-serif-display italic mt-3 leading-[1.0] tracking-[-0.02em]"
            style={{ fontSize: "clamp(28px, 3.4vw, 44px)" }}
          >
            {pick.label}.
          </h2>
          <p
            className="font-mono-label text-[10px] tracking-[0.22em] uppercase mt-3"
            style={{ color: "oklch(0.45 0.02 40)" }}
          >
            {pick.sub}
          </p>
          <div
            role="radiogroup"
            aria-label="Position picker"
            onKeyDown={handleKey}
            className="mt-6 flex flex-col gap-2"
          >
            {PICKABLE.map((p, i) => {
              const isActive = pickIdx === i;
              return (
                <button
                  key={p.key}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setPickIdx(i)}
                  onFocus={() => setPickIdx(i)}
                  className="text-left px-4 py-3 transition hover:bg-card/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-paper)]"
                  style={{
                    border: `1px solid ${isActive ? "var(--brand-oxblood)" : "oklch(0.86 0.025 70)"}`,
                    background: isActive ? "oklch(0.96 0.012 80)" : "transparent",
                    // @ts-expect-error - ring color via CSS var
                    "--tw-ring-color": "var(--brand-oxblood)",
                  }}
                >
                  <div
                    className="font-serif-display italic text-lg"
                    style={{ color: isActive ? "var(--brand-oxblood)" : "var(--brand-paper-ink)" }}
                  >
                    {p.label}
                  </div>
                  <div
                    className="font-mono-label text-[9px] tracking-[0.22em] uppercase mt-1"
                    style={{ color: "oklch(0.45 0.02 40)" }}
                  >
                    {p.sub}
                  </div>
                </button>
              );
            })}
          </div>
          <p
            className="mt-6 text-xs italic leading-relaxed"
            style={{ color: "oklch(0.45 0.02 40)" }}
          >
            The remaining 31 positions render below as scored library
            entries. Each gets its own calibrated illustration as the
            position library expands.
          </p>
        </div>
      </div>
    </section>
  );
}

function PositionsPage() {
  const [index, setIndex] = useState(67);
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("all");
  const [sort, setSort] = useState<SortKey>("lumbarLoad");
  const [role, setRole] = useState<Role>("either");
  const [condition, setCondition] = useState<Condition | "all">("all");
  const [showMatch, setShowMatch] = useState(false);
  const [query, setQuery] = useState("");

  const cap = maxLoadForIndex(index);

  const { rows, overCapRows } = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q) {
      // Text lookup runs across the whole library and ignores the load cap, so a
      // search always finds the position even on a flared-back day.
      const found = [...POSITIONS]
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.nickname.toLowerCase().includes(q) ||
            p.category.replace(/-/g, " ").toLowerCase().includes(q) ||
            (p.councilNote ?? "").toLowerCase().includes(q),
        )
        .sort((a, b) => roleLoad(a, role) - roleLoad(b, role));
      return { rows: found, overCapRows: [] as Position[] };
    }
    if (showMatch) return { rows: matchToTodaysBack(index, 3, role), overCapRows: [] as Position[] };
    const pool = [...POSITIONS]
      .filter((p) => (category === "all" ? true : p.category === category))
      .filter((p) => (condition === "all" ? true : conditionsFor(p).includes(condition)))
      .sort((a, b) => {
        if (sort === "lumbarLoad") return roleLoad(a, role) - roleLoad(b, role);
        if (sort === "breathAccess") return b.breathAccess - a.breathAccess;
        if (sort === "hipFlexion") return a.hipFlexion - b.hipFlexion;
        return a.partnerMobility - b.partnerMobility;
      });
    // The cap partitions; it never removes (inform, don't enforce). Over-cap
    // positions drop below the line, dimmed and honest, still fully openable.
    return {
      rows: pool.filter((p) => roleLoad(p, role) <= cap),
      overCapRows: pool.filter((p) => roleLoad(p, role) > cap),
    };
  }, [index, category, sort, role, condition, showMatch, cap, query]);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SiteHeader active="positions" />

      <PopAtlas
        role={role}
        index={index}
        onRoleChange={(r) => {
          setShowMatch(false);
          setRole(r);
        }}
        onIndexChange={(n) => {
          setShowMatch(false);
          setIndex(n);
        }}
      />

      <PositionShowcase />

      <section className="px-6 md:px-10 py-16 md:py-20 border-b border-border">
        <div className="max-w-[1280px] mx-auto">
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">
            POSITION LIBRARY · {POSITIONS.length} ENTRIES · SCORED BY SPINE
          </p>
          <h1 className="font-serif-display text-5xl md:text-7xl mt-5 leading-[0.98] tracking-[-0.025em] max-w-3xl">
            Bedroom geometry, <span className="italic" style={{ color: "var(--brand-amber)" }}>scored by spine.</span>
          </h1>
          <p className="mt-7 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Every position is scored for lumbar load, hip demand, breath access, and partner mobility. Filter by today's Index. If a position exceeds the cap, it drops below the line, dimmed and clearly marked. Nothing is hidden. We inform; your body decides.
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
                Five taps in the Position Intelligence Engine returns a warm-up, a main course, and a dessert option ranked for tonight's body.
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

      {/* Condition encyclopedia · quick lookup by what your back is dealing with */}
      <section className="px-6 md:px-10 py-7 border-b border-border" style={{ background: "var(--card)" }}>
        <div className="max-w-[1280px] mx-auto">
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase mb-1" style={{ color: "var(--brand-amber)" }}>
            Find what's good for your back
          </p>
          <p className="text-sm text-muted-foreground mb-3 max-w-2xl leading-relaxed">
            Tap a condition to see the positions that tend to spare it. Informational, not a diagnosis. your body has the final say.
          </p>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Filter by back condition">
            <button
              type="button"
              role="radio"
              aria-checked={condition === "all"}
              onClick={() => {
                setShowMatch(false);
                setCondition("all");
              }}
              className={`px-4 py-2 rounded-full font-mono-label text-[11px] tracking-[0.16em] uppercase transition ${
                condition === "all"
                  ? "text-background"
                  : "border border-border text-muted-foreground hover:text-foreground"
              }`}
              style={condition === "all" ? { background: "var(--brand-amber)", color: "var(--brand-ink)" } : undefined}
            >
              All conditions
            </button>
            {CONDITIONS.map((c) => {
              const active = condition === c.key;
              return (
                <button
                  key={c.key}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  title={c.blurb}
                  onClick={() => {
                    setShowMatch(false);
                    setCondition(active ? "all" : c.key);
                  }}
                  className={`px-4 py-2 rounded-full font-mono-label text-[11px] tracking-[0.16em] uppercase transition ${
                    active
                      ? "text-background"
                      : "border border-border text-muted-foreground hover:text-foreground"
                  }`}
                  style={active ? { background: "var(--brand-amber)", color: "var(--brand-ink)" } : undefined}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
          {condition !== "all" && (
            <p className="mt-3 text-sm italic leading-relaxed max-w-2xl" style={{ color: "var(--brand-oxblood)" }}>
              {CONDITIONS.find((c) => c.key === condition)?.blurb}
            </p>
          )}
        </div>
      </section>

      {/* Controls */}
      <section className="px-6 md:px-10 py-8 border-b border-border bg-card/30 sticky top-16 z-20 backdrop-blur-xl">
        {/* Role picker · whose back is working tonight */}
        <div className="max-w-[1280px] mx-auto mb-7">
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase mb-1" style={{ color: "var(--brand-oxblood)" }}>
            Tonight you're the . . .
          </p>
          <p className="text-sm text-muted-foreground mb-3 max-w-2xl leading-relaxed">
            The same position loads each partner's back differently. Pick your role and every score below re-reads for your spine.
          </p>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Your role tonight">
            {ROLES.map((r) => {
              const active = role === r.key;
              return (
                <button
                  key={r.key}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => {
                    setShowMatch(false);
                    setRole(r.key);
                  }}
                  className={`px-4 py-2 rounded-full font-mono-label text-[11px] tracking-[0.16em] uppercase transition ${
                    active
                      ? "text-background"
                      : "border border-border text-muted-foreground hover:text-foreground"
                  }`}
                  style={active ? { background: "var(--brand-oxblood)" } : undefined}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>

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
            <div className="flex justify-between font-mono-label text-[8px] tracking-[0.16em] uppercase text-muted-foreground mt-1">
              <span>← rough day</span>
              <span>quiet day →</span>
            </div>
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
              aria-label="Sort positions"
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
          {/* Text search across the whole library (ignores the load cap) */}
          <div className="mb-6">
            <label htmlFor="pos-search" className="sr-only">Search positions by name</label>
            <input
              id="pos-search"
              type="search"
              value={query}
              onChange={(e) => { setShowMatch(false); setQuery(e.target.value); }}
              placeholder="Search positions: spoon, standing, edge of bed..."
              className="w-full md:max-w-md px-4 py-3 rounded-full bg-background border border-border text-sm outline-none transition focus:border-[var(--brand-amber)]"
            />
          </div>

          <div className="flex items-baseline justify-between mb-6">
            <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">
              {query.trim()
                ? `${rows.length} match${rows.length === 1 ? "" : "es"} for "${query.trim()}"`
                : showMatch
                ? "Top 3 for tonight"
                : `${rows.length} of ${POSITIONS.length} positions`}
            </p>
            {showMatch && !query.trim() && (
              <p className="font-mono-label text-[9px] tracking-[0.18em] uppercase text-muted-foreground">
                Ranked by lumbar load + breath access · Index {index}
              </p>
            )}
          </div>

          {rows.length === 0 && overCapRows.length === 0 ? (
            <p className="font-serif-display text-xl italic text-muted-foreground max-w-md">
              {query.trim()
                ? `Nothing matches "${query.trim()}". Try a plainer word: spoon, standing, seated, edge.`
                : "Nothing in this slice matches the filters."}
            </p>
          ) : (
            <>
              {rows.length === 0 ? (
                <p className="font-serif-display text-xl italic text-muted-foreground max-w-md mb-8">
                  Nothing in this slice clears today's line. Everything below is over the cap, dimmed and honest.
                </p>
              ) : (
                <ul className="grid md:grid-cols-2 gap-px bg-border border border-border">
                  {rows.map((p) => (
                    <PositionRow key={p.id} p={p} role={role} />
                  ))}
                </ul>
              )}

              {/* Over-cap: below the line, never hidden. Same policy as the Atlas. */}
              {overCapRows.length > 0 && (
                <>
                  <div className="mt-12 mb-5 flex items-center gap-4">
                    <span className="h-px flex-1" style={{ background: "color-mix(in oklch, var(--brand-oxblood) 30%, transparent)" }} />
                    <span className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--brand-oxblood)" }}>
                      Above today's line
                    </span>
                    <span className="h-px flex-1" style={{ background: "color-mix(in oklch, var(--brand-oxblood) 30%, transparent)" }} />
                  </div>
                  <p className="mb-5 text-sm italic text-muted-foreground max-w-2xl">
                    These exceed tonight's load cap for the role you picked. Openable, and honest about it. We do not hide them.
                  </p>
                  <ul className="grid md:grid-cols-2 gap-px bg-border border border-border" style={{ opacity: 0.92 }}>
                    {overCapRows.map((p) => (
                      <PositionRow key={p.id} p={p} role={role} />
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
