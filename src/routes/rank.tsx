/**
 * /rank · the free, ungated position ranker. The front door.
 *
 * Two questions (what sets your back off + which role you usually play), then
 * we score every position against YOUR spine: the green-light list and the
 * ones that end the night early. The role fork is the growth loop: the same
 * position is a gift for one of you and a trap for the other, so the result
 * ends with "run it for the other back" + a shareable link.
 *
 * Scoring is driven by the real per-role load data in POSITION_GUIDE plus a
 * direction tag (what each position provokes: flexion, extension, compression,
 * or neutral). Not medical advice. Dry voice. No em-dashes.
 */
import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PositionVisual } from "@/components/PositionVisual";
import { POSITION_GUIDE } from "@/components/PositionGuide";
import type { PictogramKey } from "@/components/Pictogram";
import ogImage from "@/assets/og-rank.png";

const SITE = "https://backstroke.mass-cap.com";
const OG = `${SITE}${ogImage}`;
const OG_TITLE = "Which positions will your back forgive?";
const OG_DESC =
  "Two questions. We rank them against your actual spine: the green list and the ones that end the night early. Free, no login.";

export const Route = createFileRoute("/rank")({
  validateSearch: (search: Record<string, unknown>) => ({
    t: typeof search.t === "string" ? search.t : undefined,
    r: typeof search.r === "string" ? search.r : undefined,
  }),
  component: RankTool,
  head: () => ({
    meta: [
      { title: `${OG_TITLE} · BackStroke` },
      { name: "description", content: OG_DESC },
      { property: "og:title", content: OG_TITLE },
      { property: "og:description", content: OG_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/rank` },
      { property: "og:image", content: OG },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: OG_TITLE },
      { name: "twitter:description", content: OG_DESC },
      { name: "twitter:image", content: OG },
    ],
  }),
});

/* ── types ── */
type Trigger = "flexion" | "extension" | "irritable";
type URole = "receiver" | "giver" | "switch";
type Provoke = "flexion" | "extension" | "compression" | "neutral";

const isTrigger = (v: unknown): v is Trigger => v === "flexion" || v === "extension" || v === "irritable";
const isURole = (v: unknown): v is URole => v === "receiver" || v === "giver" || v === "switch";

/* ── the scoring table: per position, per role, a load (1-4) and what it provokes ──
   Loads track the load reads in POSITION_GUIDE; provoke tags track the "watch out" notes. */
const DATA: Record<string, { r: { load: number; p: Provoke }; g: { load: number; p: Provoke } }> = {
  "scissor":         { r: { load: 1, p: "neutral" },     g: { load: 1, p: "neutral" } },
  "supine-knees-up": { r: { load: 1, p: "neutral" },     g: { load: 2, p: "neutral" } },
  "edge-bed":        { r: { load: 1, p: "neutral" },     g: { load: 2, p: "neutral" } },
  "spoon":           { r: { load: 2, p: "neutral" },     g: { load: 2, p: "neutral" } },
  "side-T":          { r: { load: 2, p: "neutral" },     g: { load: 2, p: "neutral" } },
  "doggy-supported": { r: { load: 2, p: "neutral" },     g: { load: 2, p: "neutral" } },
  "cowgirl-upright": { r: { load: 3, p: "extension" },   g: { load: 1, p: "neutral" } },
  "seated-lap":      { r: { load: 3, p: "compression" }, g: { load: 3, p: "compression" } },
  "missionary":      { r: { load: 2, p: "extension" },   g: { load: 4, p: "extension" } },
  "standing":        { r: { load: 3, p: "extension" },   g: { load: 4, p: "extension" } },
  "doggy-kneeling":  { r: { load: 4, p: "extension" },   g: { load: 2, p: "neutral" } },
};

const LABEL: Record<string, string> = {
  "scissor": "Side-lying scissor",
  "supine-knees-up": "Modified missionary",
  "edge-bed": "Edge of the bed",
  "spoon": "Spoon",
  "side-T": "Side-lying T",
  "doggy-supported": "Supported rear-entry",
  "cowgirl-upright": "Receiver on top",
  "seated-lap": "Seated lap",
  "missionary": "Missionary",
  "standing": "Standing, rear",
  "doggy-kneeling": "Rear-entry, kneeling",
};

/* a dry, true one-liner per position */
const VERDICT: Record<string, string> = {
  "scissor": "Both of you on your sides, both off the hook. Genuinely rare.",
  "supine-knees-up": "The decompression stretch, but fun. Your disc barely logs it as activity.",
  "edge-bed": "The mattress holds your entire spine. You are basically a guest at your own event.",
  "spoon": "The lazy masterpiece. You lie there doing nothing and your spine sends flowers.",
  "side-T": "You lie still and supported while the other one solves the geometry.",
  "doggy-supported": "Rear entry without your back holding up the tent.",
  "cowgirl-upright": "You set depth, speed, and exit strategy. Control is the back-friendly part.",
  "seated-lap": "Cozy and close, but it stacks weight on the disc. Sit tall or pay later.",
  "missionary": "A gift for the one underneath, a surprise plank audit for the one on top.",
  "standing": "Great for people with two healthy backs. You have brought one. The second you bend to reach, the bill arrives.",
  "doggy-kneeling": "On all fours the back already sags; then the drive sags it more. Extension's villain origin story.",
};

const ORDER = Object.keys(DATA);

function penalty(p: Provoke, t: Trigger): number {
  if (p === "neutral") return 0;
  if (t === "irritable") return 1.5;
  if (p === t) return 2;
  if (p === "compression") return t === "flexion" ? 1 : 0.3;
  return 0;
}

type Ranked = { key: string; label: string; role: "receiver" | "giver"; load: number; p: Provoke; score: number };

function rank(t: Trigger, ur: URole): Ranked[] {
  return ORDER.map((k) => {
    const d = DATA[k];
    const sr = d.r.load + penalty(d.r.p, t);
    const sg = d.g.load + penalty(d.g.p, t);
    let role: "receiver" | "giver", load: number, p: Provoke, score: number;
    if (ur === "switch") {
      if (sr <= sg) { role = "receiver"; load = d.r.load; p = d.r.p; score = sr; }
      else { role = "giver"; load = d.g.load; p = d.g.p; score = sg; }
    } else if (ur === "receiver") { role = "receiver"; load = d.r.load; p = d.r.p; score = sr; }
    else { role = "giver"; load = d.g.load; p = d.g.p; score = sg; }
    return { key: k, label: LABEL[k], role, load, p, score };
  }).sort((a, b) => a.score - b.score);
}

function reasonFor(x: Ranked, t: Trigger): string {
  if (x.p === t && t === "extension") return "It drives your low back into an arch, which is the exact thing setting you off.";
  if (x.p === t && t === "flexion") return "It rounds you forward, the one move your back is begging you to stop making.";
  if (x.p === "compression" && t === "flexion") return "Upright load stacks straight down on the disc. Sit tall or it bites.";
  if (t === "irritable" && x.p !== "neutral") return x.load >= 4 ? "Too much load for a flared back. Not tonight." : "Some load, some risk. Save it for a better day.";
  if (x.load >= 4) return "The most load on your spine in this role. Hard pass on a bad day.";
  if (t === "extension") return "Low load, and it never once asks your back to arch.";
  if (t === "flexion") return "Low load, and it keeps you up out of the slump.";
  return "Low load, supported, nothing to brace against.";
}

/* ── palette ── */
const OX = "var(--brand-oxblood, #722B2B)";
const PAPER = "var(--brand-paper, #F4EFE3)";
const INK = "var(--brand-paper-ink, #2a2620)";
const RULE = "var(--brand-rule, #d9ccae)";

const TRIGGERS: { id: Trigger; label: string; sub: string }[] = [
  { id: "flexion", label: "Sitting and bending forward", sub: "Worse after a long drive or a slumped night on the couch." },
  { id: "extension", label: "Standing and arching back", sub: "Worse standing around, better when you curl up." },
  { id: "irritable", label: "Honestly, everything right now", sub: "It is flared. We will keep the whole list cautious." },
];
const ROLES: { id: URole; label: string; sub: string }[] = [
  { id: "receiver", label: "The receiver", sub: "More often underneath, or being entered." },
  { id: "giver", label: "The giver", sub: "More often on top, or doing the driving." },
  { id: "switch", label: "You switch", sub: "Depends on the night. We pick the safer role per position." },
];

function RankTool() {
  const sp = Route.useSearch();
  const initT = isTrigger(sp.t) ? sp.t : null;
  const initR = isURole(sp.r) ? sp.r : null;
  // initialize from the shared-link params during render (SSR + client), so a
  // forwarded ?t=&r= link lands straight on the result with no intro flash.
  const [step, setStep] = useState<0 | 1 | 2 | 3>(initT && initR ? 3 : 0);
  const [trigger, setTrigger] = useState<Trigger | null>(initT);
  const [role, setRole] = useState<URole | null>(initR);
  const [copied, setCopied] = useState(false);

  // sync URL when results show
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (step === 3 && trigger && role) {
      const u = new URL(window.location.href);
      u.searchParams.set("t", trigger); u.searchParams.set("r", role);
      window.history.replaceState({}, "", u.toString());
    }
  }, [step, trigger, role]);

  const reset = () => { setStep(0); setTrigger(null); setRole(null); setCopied(false); if (typeof window !== "undefined") window.history.replaceState({}, "", window.location.pathname); };
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2200); } catch { /* ignore */ }
  };

  const ranked = trigger && role ? rank(trigger, role) : [];
  const green = ranked.slice(0, 5);
  const red = ranked.filter((x) => x.score >= 4).sort((a, b) => b.score - a.score).slice(0, 3);

  return (
    <main style={{ minHeight: "100vh", background: PAPER, color: INK }}>
      <div className="mx-auto px-6 md:px-10 py-12 md:py-20" style={{ maxWidth: 1080 }}>
        {/* brandline */}
        <Link to="/" className="font-mono-label text-[11px] tracking-[0.28em] uppercase" style={{ color: OX }}>
          BackStroke
        </Link>

        {/* ── intro ── */}
        {step === 0 && (
          <section className="mt-10" style={{ maxWidth: 760 }}>
            <p className="font-mono-label text-[11px] tracking-[0.28em] uppercase" style={{ color: "oklch(0.5 0.02 40)" }}>
              Free · No login · No candle
            </p>
            <h1 className="font-serif-display italic mt-5 leading-[0.98] tracking-[-0.02em]" style={{ fontSize: "clamp(38px, 6.5vw, 76px)" }}>
              Which positions will your back actually forgive?
            </h1>
            <p className="mt-6 text-base md:text-lg leading-relaxed" style={{ color: "oklch(0.42 0.02 40)" }}>
              Two questions. We rank them against your actual spine: the green-light list, and the ones that end
              the night early with a noise neither of you enjoys. Then you send it to the other back in the
              relationship, because the same position is a gift for one of you and a trap for the other.
            </p>
            <button type="button" onClick={() => setStep(1)} className="mt-9 inline-flex items-center gap-2 rounded-full font-semibold text-sm transition hover:opacity-90"
              style={{ background: OX, color: PAPER, padding: "15px 30px" }}>
              Rank them for me →
            </button>
            <p className="mt-5 text-xs italic" style={{ color: "oklch(0.55 0.02 40)" }}>
              Information, not a diagnosis. If a position hurts, that is a no, and no ranking overrides it.
            </p>
            <p className="mt-4 text-sm" style={{ color: "oklch(0.42 0.02 40)" }}>
              Want the deadpan version first?{" "}
              <Link to="/diagnosis" className="font-semibold underline underline-offset-4 hover:opacity-80 transition" style={{ color: OX }}>
                Diagnose your back, mock-clinically →
              </Link>
            </p>
          </section>
        )}

        {/* ── Q1: trigger ── */}
        {step === 1 && (
          <Question
            kicker="Question 1 of 2"
            title="What sets your back off?"
            options={TRIGGERS}
            onPick={(id) => { setTrigger(id as Trigger); setStep(2); }}
          />
        )}

        {/* ── Q2: role ── */}
        {step === 2 && (
          <Question
            kicker="Question 2 of 2"
            title="In bed, you are usually..."
            options={ROLES}
            onPick={(id) => { setRole(id as URole); setStep(3); }}
            onBack={() => setStep(1)}
          />
        )}

        {/* ── results ── */}
        {step === 3 && trigger && role && (
          <section className="mt-10">
            <p className="font-mono-label text-[11px] tracking-[0.26em] uppercase" style={{ color: OX }}>
              Your spine's verdict
            </p>
            <h1 className="font-serif-display italic mt-4 leading-[1.0] tracking-[-0.02em]" style={{ fontSize: "clamp(30px, 5vw, 56px)" }}>
              {role === "switch" ? "Whichever role you take," : role === "receiver" ? "As the receiver," : "As the giver,"} here is what holds up.
            </h1>
            <p className="mt-4 text-sm md:text-base italic" style={{ color: "oklch(0.5 0.02 40)" }}>
              Tuned for a back that hates {trigger === "flexion" ? "sitting and bending forward" : trigger === "extension" ? "standing and arching" : "everything at the moment"}.
            </p>

            {/* GREEN */}
            <h2 className="font-mono-label text-[12px] tracking-[0.24em] uppercase mt-12 mb-5" style={{ color: "#5a7a3a" }}>
              Green light
            </h2>
            <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
              {green.map((x, i) => (
                <ResultCard key={x.key} x={x} t={trigger} rank={i + 1} showRole={role === "switch"} tone="green" />
              ))}
            </div>

            {/* RED */}
            {red.length > 0 && (
              <>
                <h2 className="font-mono-label text-[12px] tracking-[0.24em] uppercase mt-14 mb-1" style={{ color: OX }}>
                  The Hall of Regret
                </h2>
                <p className="font-serif-display italic mb-5" style={{ fontSize: 15, color: "oklch(0.5 0.02 40)" }}>
                  Positions your spine will bill you for tomorrow.
                </p>
                <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
                  {red.map((x) => (
                    <ResultCard key={x.key} x={x} t={trigger} showRole={role === "switch"} tone="red" />
                  ))}
                </div>
              </>
            )}

            {/* the loop */}
            <div className="mt-16 rounded-2xl p-7 md:p-9" style={{ border: `1px solid ${RULE}`, background: "#FBF7EC" }}>
              <p className="font-serif-display italic leading-snug" style={{ fontSize: "clamp(22px, 3.2vw, 32px)" }}>
                That was for your back. The same position is a gift for one of you and a trap for the other.
              </p>
              <p className="mt-3 text-sm md:text-base leading-relaxed" style={{ color: "oklch(0.45 0.02 40)" }}>
                Run it for the other back in the relationship. It takes two answers and it might change tonight.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-full font-semibold text-sm transition hover:opacity-90"
                  style={{ background: OX, color: PAPER, padding: "13px 24px" }}>
                  Run it for the other back →
                </button>
                <button type="button" onClick={copyLink} className="inline-flex items-center gap-2 rounded-full font-semibold text-sm transition hover:opacity-90"
                  style={{ background: "transparent", color: OX, border: `1.5px solid ${OX}`, padding: "13px 24px" }}>
                  {copied ? "Link copied" : "Send them this result"}
                </button>
              </div>
            </div>

            {/* funnel */}
            <div className="mt-10 pt-8" style={{ borderTop: `1px solid ${RULE}` }}>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: "oklch(0.42 0.02 40)" }}>
                Want the red list to get shorter? The position plan buys you tonight. The daily protocol is the part
                that actually makes your back tolerate more of the list.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href="/engine.html" className="inline-flex items-center gap-2 rounded-full font-semibold text-sm transition hover:opacity-90"
                  style={{ background: OX, color: PAPER, padding: "13px 24px" }}>
                  Build tonight's full plan →
                </a>
                <Link to="/positions" className="inline-flex items-center gap-2 rounded-full font-semibold text-sm transition hover:opacity-90"
                  style={{ background: "transparent", color: INK, border: `1.5px solid ${RULE}`, padding: "13px 24px" }}>
                  See the whole library
                </Link>
              </div>
              <button type="button" onClick={reset} className="mt-6 font-mono-label text-[10px] tracking-[0.2em] uppercase underline" style={{ color: "oklch(0.55 0.02 40)" }}>
                Start over
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

/* ── a question screen ── */
function Question({
  kicker, title, options, onPick, onBack,
}: {
  kicker: string;
  title: string;
  options: { id: string; label: string; sub: string }[];
  onPick: (id: string) => void;
  onBack?: () => void;
}) {
  return (
    <section className="mt-10" style={{ maxWidth: 720 }}>
      <p className="font-mono-label text-[11px] tracking-[0.26em] uppercase" style={{ color: OX }}>{kicker}</p>
      <h1 className="font-serif-display italic mt-4 leading-[1.0] tracking-[-0.02em]" style={{ fontSize: "clamp(30px, 5vw, 54px)" }}>
        {title}
      </h1>
      <div className="mt-8 flex flex-col gap-3">
        {options.map((o) => (
          <button key={o.id} type="button" onClick={() => onPick(o.id)}
            className="group text-left rounded-xl p-5 transition hover:-translate-y-0.5"
            style={{ border: `1px solid ${RULE}`, background: "#FBF7EC" }}>
            <p className="font-serif-display text-xl md:text-2xl leading-tight" style={{ color: INK }}>{o.label}</p>
            <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "oklch(0.5 0.02 40)" }}>{o.sub}</p>
          </button>
        ))}
      </div>
      {onBack && (
        <button type="button" onClick={onBack} className="mt-6 font-mono-label text-[10px] tracking-[0.2em] uppercase underline" style={{ color: "oklch(0.55 0.02 40)" }}>
          ← Back
        </button>
      )}
    </section>
  );
}

/* ── a result card ── */
function ResultCard({
  x, t, rank, showRole, tone,
}: {
  x: Ranked;
  t: Trigger;
  rank?: number;
  showRole: boolean;
  tone: "green" | "red";
}) {
  const accent = tone === "green" ? "#5a7a3a" : OX;
  const cue = POSITION_GUIDE[x.key as PictogramKey]?.[x.role]?.protect?.[0];
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl" style={{ border: `1px solid ${RULE}`, background: "#FBF7EC" }}>
      <div style={{ aspectRatio: "4 / 3", background: "linear-gradient(135deg, #f7f2e7, #efe6d2)", borderBottom: `1px solid ${RULE}`, position: "relative" }}>
        <PositionVisual positionKey={x.key as PictogramKey} paused />
        {rank && (
          <span className="font-mono-label" style={{ position: "absolute", top: 10, left: 12, fontSize: 11, letterSpacing: "0.1em", color: accent }}>
            №{rank}
          </span>
        )}
        {showRole && (
          <span className="font-mono-label" style={{ position: "absolute", top: 10, right: 12, fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "oklch(0.5 0.02 40)" }}>
            safer as the {x.role}
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-serif-display italic leading-none" style={{ fontSize: 22 }}>{x.label}.</h3>
          <LoadPips load={x.load} />
        </div>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: accent }}>{reasonFor(x, t)}</p>
        <p className="mt-2.5 text-sm leading-relaxed" style={{ color: "oklch(0.42 0.02 40)" }}>{VERDICT[x.key]}</p>
        {cue && (
          <p className="mt-3 text-[13px] leading-snug" style={{ color: "oklch(0.45 0.02 40)" }}>
            <span className="font-mono-label" style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: OX, marginRight: 6 }}>Do this</span>
            {cue}
          </p>
        )}
      </div>
    </article>
  );
}

function LoadPips({ load }: { load: number }) {
  const color = (i: number) => (i <= 2 ? "#6b8f5e" : i === 3 ? "#cf9a3f" : "#9a2f2f");
  return (
    <span style={{ display: "inline-flex", gap: 3 }} aria-label={`spine load ${load} of 4`}>
      {[1, 2, 3, 4].map((i) => (
        <span key={i} style={{ width: 14, height: 5, borderRadius: 3, background: i <= load ? color(i) : "rgba(42,38,32,0.12)" }} />
      ))}
    </span>
  );
}
