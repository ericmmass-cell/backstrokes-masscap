/**
 * PopAtlas, the headline feature. A live anatomical back-map filters the
 * 39-position library, and every position resolves into the POP meter: two
 * honest rows, RELIEF (the relief pop) over HEAT (the good pop), both derived
 * from the axes already scored in position-library.ts.
 *
 * Safety leads: the default order is matchToTodaysBack (gates by today's load
 * cap); POP only decorates and offers optional sorts, and every sort is applied
 * AFTER the same over-cap partition, so a high-heat shape can never float above
 * the line on a flare day. The cap never removes a position (inform, don't
 * enforce): over-cap cards drop below a divider with the RELIEF row dimmed,
 * still fully openable.
 *
 * The double meaning is deployed twice (the dek and the legend) then trusted;
 * the literal "pop pop pop" lives only as the small amber eyebrow glyphs.
 */

import { useMemo, useState } from "react";
import {
  POSITIONS,
  maxLoadForIndex,
  roleLoad,
  roleLoadNote,
  loadBearerFor,
  conditionsFor,
  reliefFor,
  heatFor,
  popFor,
  popPips,
  popSweetSpot,
  painAreasFor,
  PAIN_AREAS,
  CONDITIONS,
  type Position,
  type Role,
  type PainArea,
} from "@/lib/position-library";
import { Pictogram, type PictogramKey } from "./Pictogram";
import { PopMeter } from "./PopMeter";
import { BackMap } from "./BackMap";

const OX = "#722B2B";
const AMBER = "#b07d2b";

const ROLES: { key: Role; label: string }[] = [
  { key: "either", label: "Either / depends on the day" },
  { key: "penetrator", label: "Penetrating" },
  { key: "receiver", label: "Receiving" },
];

type AtlasSort = "match" | "pop" | "heat" | "relief";
const SORTS: { key: AtlasSort; label: string }[] = [
  { key: "match", label: "Kindest first" },
  { key: "pop", label: "Most POP" },
  { key: "heat", label: "Hottest" },
  { key: "relief", label: "Most relief" },
];

/* position → illustration family. Mirrors positions.tsx ILLUSTRATION_BY_ID. */
const ILLUSTRATION_BY_ID: Record<string, PictogramKey> = {
  p01: "spoon", p23: "spoon", p28: "spoon", p36: "spoon",
  p03: "missionary", p13: "missionary", p34: "missionary",
  p02: "supine-knees-up", p06: "supine-knees-up", p22: "supine-knees-up", p25: "supine-knees-up", p29: "supine-knees-up", p33: "supine-knees-up", p38: "supine-knees-up",
  p04: "side-T", p18: "side-T",
  p07: "scissor", p14: "scissor",
  p11: "cowgirl-upright", p12: "cowgirl-upright", p27: "cowgirl-upright", p37: "cowgirl-upright",
  p09: "doggy-supported", p10: "doggy-supported",
  p19: "doggy-kneeling", p30: "doggy-kneeling",
  p08: "standing", p15: "standing", p24: "standing", p32: "standing", p39: "standing",
  p16: "edge-bed", p26: "edge-bed", p31: "edge-bed",
  p05: "seated-lap", p17: "seated-lap", p35: "seated-lap",
};
const illustrationFor = (p: Position): PictogramKey => ILLUSTRATION_BY_ID[p.id] ?? "supine-knees-up";

/** whose back works, one short line with a role glyph */
function whoseBack(p: Position, role: Role): string {
  const bearer = loadBearerFor(p);
  if (bearer === "shared") return "Shared load. both spines work here.";
  if (role === "either") return bearer === "penetrator" ? "The penetrating partner's back carries this." : "The receiving partner's back carries this.";
  const youBearIt = (role === "penetrator" && bearer === "penetrator") || (role === "receiver" && bearer === "receiver");
  return youBearIt ? "Your back is the one working. mind the cap." : "Your back gets the easier side here.";
}

/** role-aware RELIEF caption for the detail line */
function reliefCaption(p: Position, role: Role): string {
  const bearer = loadBearerFor(p);
  if (bearer === "shared") return "Room is shared here. both spines get the same deal.";
  const youBearIt = (role === "penetrator" && bearer === "penetrator") || (role === "receiver" && bearer === "receiver");
  if (role === "either") return "How much room the easier role gets here.";
  return youBearIt ? "Release is rented, not owned: your back is the one working." : "Release is yours to claim here.";
}

function Pips({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center gap-[3px]" aria-label={`${n} of 3 pops`}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{ width: 5, height: 5, borderRadius: 999, background: i < n ? AMBER : "transparent", border: i < n ? "none" : `1px solid color-mix(in oklch, ${AMBER} 35%, transparent)` }}
        />
      ))}
    </span>
  );
}

function CondPills({ p, activeArea }: { p: Position; activeArea: PainArea | null }) {
  const conds = conditionsFor(p);
  const labels = conds.map((k) => CONDITIONS.find((c) => c.key === k)?.label).filter(Boolean) as string[];
  const areas = painAreasFor(p);
  const areaActive = activeArea !== null && areas.includes(activeArea);
  if (labels.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {labels.map((label) => {
        const isAreaTag =
          areaActive &&
          ((activeArea === "lumbar" && /disc|flare/i.test(label)) ||
            (activeArea === "si" && /si/i.test(label)) ||
            (activeArea === "sciatic" && /sciat/i.test(label)) ||
            (activeArea === "hip" && /hip/i.test(label)));
        return (
          <span
            key={label}
            className="font-mono-label text-[9px] tracking-[0.12em] uppercase px-2 py-0.5 rounded-full"
            style={
              isAreaTag
                ? { background: OX, color: "var(--brand-paper)" }
                : { background: "color-mix(in oklch, var(--brand-amber) 18%, transparent)", color: "var(--brand-ink)" }
            }
          >
            {label}
          </span>
        );
      })}
    </div>
  );
}

function PopCard({ p, role, overCap, index }: { p: Position; role: Role; overCap: boolean; index: number }) {
  const relief = reliefFor(p, role);
  const heat = heatFor(p);
  const pips = popPips(p, role);
  const sweet = popSweetSpot(p, role);
  return (
    <li
      className="pop-card pop-rise bg-background flex flex-col overflow-hidden rounded-2xl border border-border"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms`, opacity: overCap ? 0.92 : undefined }}
      tabIndex={0}
    >
      {/* still with ken-burns life on hover/focus */}
      <div style={{ aspectRatio: "4 / 3", overflow: "hidden" }}>
        <div className="pop-ken" style={{ width: "100%", height: "100%" }}>
          <Pictogram positionKey={illustrationFor(p)} showCaption={false} />
        </div>
      </div>

      <div className="p-5 md:p-6 flex flex-col">
        {/* eyebrow: id + the literal pop pop pop */}
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono-label text-[10px] tracking-[0.26em] uppercase" style={{ color: OX }}>
            {p.id.toUpperCase()} · {p.category.replace("-", " ")}
          </span>
          <Pips n={pips} />
        </div>

        <h3 className="font-serif-display text-xl md:text-2xl italic mt-2.5 leading-tight">{p.name}</h3>

        {/* the signature meter */}
        <div className="mt-4">
          <PopMeter relief={relief} heat={heat} size="card" overCap={overCap} style={{ width: "100%" }} />
        </div>

        {sweet && !overCap && (
          <p className="mt-3 font-mono-label text-[9px] tracking-[0.2em] uppercase inline-flex items-center gap-2" style={{ color: OX }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: OX }} /> POP sweet spot. hot and survivable at once.
          </p>
        )}

        {/* whose back works */}
        <p className="mt-3 font-mono-label text-[9px] tracking-[0.16em] uppercase leading-relaxed" style={{ color: AMBER }}>
          {whoseBack(p, role)}
        </p>

        <CondPills p={p} activeArea={null} />

        {/* council note */}
        <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground" style={{ borderLeft: `2px solid ${OX}`, paddingLeft: 12 }}>
          {p.councilNote}
        </p>
      </div>
    </li>
  );
}

export function PopAtlas() {
  const [role, setRole] = useState<Role>("either");
  const [index, setIndex] = useState(67);
  const [area, setArea] = useState<PainArea | null>(null);
  const [sort, setSort] = useState<AtlasSort>("match");

  const cap = maxLoadForIndex(index);

  // counts per area, over the whole library (for the back-map labels)
  const counts = useMemo(() => {
    const c: Record<PainArea, number> = { lumbar: 0, si: 0, sciatic: 0, hip: 0, thoracic: 0 };
    for (const p of POSITIONS) for (const a of painAreasFor(p)) c[a]++;
    return c;
  }, []);

  // 1) scope by area, 2) partition allowed vs over-cap, 3) sort each side
  const { allowed, overCap } = useMemo(() => {
    let pool = [...POSITIONS];
    if (area) pool = pool.filter((p) => painAreasFor(p).includes(area));

    const sorter = (a: Position, b: Position) => {
      if (sort === "pop") return popFor(b, role) - popFor(a, role);
      if (sort === "heat") return heatFor(b) - heatFor(a);
      if (sort === "relief") return reliefFor(b, role) - reliefFor(a, role);
      // match: lowest role-aware load first, then breath
      return roleLoad(a, role) - roleLoad(b, role) || b.breathAccess - a.breathAccess;
    };

    const allowed = pool.filter((p) => roleLoad(p, role) <= cap).sort(sorter);
    const overCap = pool.filter((p) => roleLoad(p, role) > cap).sort(sorter);
    return { allowed, overCap };
  }, [area, role, sort, cap]);

  return (
    <section className="px-6 md:px-10 py-16 md:py-20 border-b border-border" aria-labelledby="pop-atlas-heading" style={{ background: "var(--brand-paper)" }}>
      <div className="max-w-[1280px] mx-auto">
        {/* header */}
        <p className="pop-rise font-mono-label text-[10px] tracking-[0.28em] uppercase" style={{ color: AMBER }}>
          The POP Atlas · {POSITIONS.length} positions
        </p>
        <h2 id="pop-atlas-heading" className="pop-rise font-serif-display text-5xl md:text-7xl mt-4 leading-[0.98] tracking-[-0.025em] max-w-3xl" style={{ animationDelay: "60ms" }}>
          Two kinds of <span className="italic" style={{ color: OX }}>pop.</span>
        </h2>
        <p className="pop-rise mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl" style={{ animationDelay: "120ms" }}>
          The one you want, and the one your spine quietly needs. We score both. Point at where the back is loudest today and the Atlas sorts to what tends to spare it.
        </p>
        <p className="pop-rise mt-3 font-mono-label text-[10px] tracking-[0.18em] uppercase" style={{ animationDelay: "150ms", color: "var(--muted-foreground)" }}>
          <span style={{ color: OX }}>● Relief</span> the kind your back wants &nbsp;·&nbsp; <span style={{ color: AMBER }}>● Heat</span> the good kind of pop
        </p>

        {/* back-map hero */}
        <div className="pop-rise mt-10 p-6 md:p-8 rounded-3xl border border-border" style={{ animationDelay: "180ms", background: "var(--card)" }}>
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase mb-1" style={{ color: OX }}>
            Where is it today?
          </p>
          <p className="text-sm text-muted-foreground mb-5 max-w-xl leading-relaxed">
            Tap where your back is loudest. Information, not a diagnosis. your body keeps the gavel.
          </p>
          <BackMap value={area} onChange={setArea} counts={counts} />
        </div>

        {/* controls: role, index, sort */}
        <div className="mt-8 grid md:grid-cols-3 gap-6 items-end">
          <div>
            <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase mb-3" style={{ color: OX }}>Tonight you're</p>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Your role tonight">
              {ROLES.map((r) => {
                const active = role === r.key;
                return (
                  <button
                    key={r.key}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setRole(r.key)}
                    className="px-3 py-1.5 rounded-full font-mono-label text-[10px] tracking-[0.14em] uppercase transition"
                    style={active ? { background: OX, color: "var(--brand-paper)" } : { border: "1px solid var(--border)", color: "var(--muted-foreground)" }}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
              How is the back today? ({index})
            </label>
            <input
              type="range"
              min={20}
              max={100}
              value={index}
              onChange={(e) => setIndex(Number(e.target.value))}
              className="w-full mt-3 accent-[var(--brand-amber)]"
              aria-label="Today's Index"
            />
            <p className="font-mono-label text-[9px] tracking-[0.18em] uppercase text-muted-foreground mt-1">
              We would cap the load around {cap}/5 tonight
            </p>
          </div>

          <div>
            <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase mb-3 text-muted-foreground">Sort</p>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Sort the Atlas">
              {SORTS.map((s) => {
                const active = sort === s.key;
                return (
                  <button
                    key={s.key}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setSort(s.key)}
                    className="px-3 py-1.5 rounded-full font-mono-label text-[10px] tracking-[0.14em] uppercase transition"
                    style={active ? { background: AMBER, color: "var(--brand-ink)" } : { border: "1px solid var(--border)", color: "var(--muted-foreground)" }}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* allowed grid */}
        <p className="mt-10 mb-5 font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: AMBER }}>
          {allowed.length} your back can sign off on{area ? ` · ${PAIN_AREAS.find((a) => a.key === area)?.label}` : ""}
        </p>
        {allowed.length === 0 ? (
          <p className="font-serif-display text-xl italic text-muted-foreground max-w-md">
            Nothing in this slice clears today's line. Lower the read, or come back on a quieter-back day. The Atlas will still be here, unlike the optimism.
          </p>
        ) : (
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allowed.map((p, i) => (
              <PopCard key={p.id} p={p} role={role} overCap={false} index={i} />
            ))}
          </ul>
        )}

        {/* over-cap, below the line, never hidden */}
        {overCap.length > 0 && (
          <>
            <div className="mt-14 mb-5 flex items-center gap-4">
              <span className="h-px flex-1" style={{ background: "color-mix(in oklch, var(--brand-oxblood) 30%, transparent)" }} />
              <span className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: OX }}>Above today's line</span>
              <span className="h-px flex-1" style={{ background: "color-mix(in oklch, var(--brand-oxblood) 30%, transparent)" }} />
            </div>
            <p className="mb-5 text-sm italic text-muted-foreground max-w-2xl">
              Openable, and honest about it. These exceed tonight's load cap, so the relief read is dimmed. We do not hide them. We are not your mother.
            </p>
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {overCap.map((p, i) => (
                <PopCard key={p.id} p={p} role={role} overCap={true} index={i} />
              ))}
            </ul>
          </>
        )}

        {/* method + the one punch-up + the stop rule */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-border" style={{ background: "var(--card)" }}>
            <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase mb-2" style={{ color: OX }}>How we rate POP</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Relief is built from how much load your role carries and how freely you can breathe. Heat is built from how dynamic the shape is. Both come from a fixed library, not from you. We have never met your spine and will not pretend otherwise. Relief means how much room your back tends to get, not a treatment, a cure, or a correction.
            </p>
          </div>
          <div className="p-6 rounded-2xl border" style={{ background: "color-mix(in oklch, var(--brand-oxblood) 8%, transparent)", borderColor: "color-mix(in oklch, var(--brand-oxblood) 30%, transparent)" }}>
            <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase mb-2" style={{ color: OX }}>The part where we stop being charming</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--brand-ink)" }}>
              New numbness, a leg that gives out, or losing bladder or bowel control means close the app and call someone with a stethoscope. Goop will sell you a jade egg and one vague number. We scored the geometry and gave you two numbers and a stop rule.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PopAtlas;
