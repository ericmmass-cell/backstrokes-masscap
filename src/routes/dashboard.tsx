import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Eyebrow, MonoTag } from "@/components/editorial";
import { SiteHeader } from "@/components/SiteHeader";
import { todaysDistraction, THEME_LABEL } from "@/lib/distractions";
import { CheckIn, type CheckInResult } from "@/components/CheckIn";
import mcgillStudy from "@/assets/mcgill-study.jpg";

/**
 * Dashboard, lean version (no subject chooser).
 *
 * One hero card: editorial photo on the left, Index + letter + CTA on the
 * right. Below: three lean tiles. Below that: the shelf. At the bottom: a
 * one-line "today's distraction" teaser pointing at the Roman-quotes feature
 * inside the session player.
 */

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Today · BackStroke" }] }),
});

type SessionState = {
  name: string | null;
  index: number;
  prevIndex: number;
  streak: number;
  signedIn: boolean;
  flareSwapped: boolean;
};

const PREVIEW: SessionState = {
  name: "Eric",
  index: 71,
  prevIndex: 68,
  streak: 12,
  signedIn: false,
  flareSwapped: false,
};

function loadState(): SessionState {
  try {
    const raw = localStorage.getItem("bs.user");
    if (!raw) return PREVIEW;
    return { ...PREVIEW, ...(JSON.parse(raw) as Partial<SessionState>), signedIn: true };
  } catch {
    return PREVIEW;
  }
}

/** Rotating P.S. line. Eight variants, picks one by day-of-year. */
function ps(): string {
  const day = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000,
  );
  const bank = [
    "P.S. Still no candle revenue. Three weeks in. The lumbar has not requested one.",
    "P.S. The hotel-room chair in your office. We see it. Your spine sees it. You did not pick it. Someone in 2007 picked it.",
    "P.S. Your standing desk is plugged in, not engaged. We can tell by the curve.",
    "P.S. The kegel app went quiet last Tuesday. So did the floor it spent four years drilling.",
    "P.S. Nobody on the council owns a ring light. This is on purpose. We checked.",
    "P.S. The Pilates instructor on TikTok is statistically wrong about your floor. The statistics are not on her side. The lighting is.",
    "P.S. The fascia influencer is a graphic designer with a foam roller and twelve scarves.",
    "P.S. The brand whose name is a misspelled adjective is not a clinician. Worth confirming, occasionally.",
  ];
  return bank[day % bank.length];
}

function letterFor(state: SessionState): { lede: string; signer: string; role: string } {
  const dow = new Date().getDay();
  if (state.flareSwapped) {
    return {
      lede: "Flare day. We move to down-train. The streak is unaffected because the streak was never the point. Pain is loud today. Loud is not the same as in charge.",
      signer: "Floor desk",
      role: "down-train protocol",
    };
  }
  const map: Record<number, string> = {
    0: "The rest day is a myth with excellent packaging. The lumbar adapts to micro-doses of movement. Remove them for 36 hours and Monday becomes a small courtroom drama. Eight minutes. Then go be alive.",
    1: "Monday. The lumbar has opened negotiations in better faith than expected. Do not reward that by sitting like a shrimp in an expensive chair for nine hours. Eight minutes below. Same dose. Same boring answer. Boring answers are usually the ones that survive discovery.",
    2: "Tuesday. The disc's litigation day. This is consistent with the data, not a personal grudge. If you are down, it is probably the chair, the sleep position, or the recreational optimism. We do the eight minutes anyway. Cumulative load is the only thing that moves this number.",
    3: "Wednesday. Floor day. Inhale, let the pelvic floor drop. Exhale, return to rest. If you are squeezing, congratulations, you have recreated the mistake eight million downloads agreed on. Stop that. Release first. Strength later.",
    4: "Thursday. The 30/3 rule is the intervention. Stand three minutes every thirty. Walk if possible. Hinge if trapped. We are not adding wellness. We are removing time spent at the angle where office furniture quietly became a public health problem.",
    5: "Friday. Run the protocol before the social part of the evening, not afterward when your lumbar has joined the conversation as an uninvited consultant. The weekend version is identical. The disc does not respect brunch.",
    6: "The rest day is a myth with excellent packaging. The lumbar adapts to micro-doses of movement. Remove them for 36 hours and Monday becomes a small courtroom drama. Eight minutes. Then go be alive.",
  };
  return { lede: map[dow], signer: dow === 3 ? "Floor desk" : "Spine desk", role: dow === 3 ? "down-train protocol" : "endurance protocol" };
}

/* ───────── Hero card ───────── */

function HeroCard({ state }: { state: SessionState }) {
  const letter = letterFor(state);
  const diff = state.index - state.prevIndex;
  const trend = diff > 0 ? "+" + diff : diff < 0 ? String(diff) : "·";
  const trendColor = diff > 0 ? "var(--brand-amber)" : diff < 0 ? "var(--brand-blush)" : "var(--muted-foreground)";

  return (
    <article className="relative grid lg:grid-cols-12 border border-border overflow-hidden" style={{ boxShadow: "var(--shadow-lift)" }}>
      {/* LEFT: editorial photo */}
      <div className="lg:col-span-6 relative aspect-[4/5] lg:aspect-auto lg:min-h-[560px]">
        <img src={mcgillStudy} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, oklch(0.18 0.01 40 / 0.78) 100%)" }} />

        <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
          <MonoTag>FIG. M-04 · OVERHEAD STUDY · DAY {state.streak + 1}</MonoTag>
          <span className="font-mono-label text-[9px] tracking-[0.22em] uppercase" style={{ color: "var(--brand-amber)" }}>
            ● TODAY · {new Date().toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()}
          </span>
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <p className="font-serif-display text-2xl md:text-3xl italic leading-tight text-white">
            Today, the body has filed a memo.
          </p>
          <p className="font-serif-display text-base italic text-white/85 mt-1 leading-snug">
            Three minutes if that is all today has. Eight when it does not. The spine does not need creativity. It needs the same boring things done well, like a pension fund with nerve endings.
          </p>
        </div>
      </div>

      {/* RIGHT: Index + letter + CTA */}
      <div className="lg:col-span-6 px-8 md:px-12 py-10 md:py-14 relative" style={{ background: "linear-gradient(180deg, var(--brand-paper) 0%, oklch(0.92 0.022 76) 100%)", color: "var(--brand-paper-ink)" }}>
        <div className="flex items-center justify-between">
          <Eyebrow>Index · {new Date().toLocaleDateString("en-US", { weekday: "long" })}</Eyebrow>
          <MonoTag muted>Day {state.streak + 1}</MonoTag>
        </div>

        <div className="mt-5 flex items-baseline gap-4">
          <p
            className="font-serif-display leading-none tracking-tight"
            style={{
              fontSize: "clamp(96px, 13vw, 160px)",
              background: "var(--gradient-text)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {state.index}
          </p>
          <p className="font-mono-label text-base tracking-[0.18em]" style={{ color: trendColor }}>
            {trend}
          </p>
        </div>

        <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
          yesterday · {state.prevIndex}
        </p>

        <p className="mt-7 font-serif-display italic leading-snug" style={{ fontSize: "clamp(20px, 1.9vw, 26px)" }}>
          {state.name && <span style={{ color: "var(--brand-amber)" }}>{state.name}. </span>}
          {letter.lede}
        </p>

        <p className="mt-5 font-serif-display text-base italic leading-snug" style={{ color: "var(--muted-foreground)" }}>
          {ps()}
        </p>

        <p className="mt-4 font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--brand-blush)" }}>
          {letter.signer} · {letter.role}
        </p>

        <Link
          to="/session"
          className="mt-9 inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full text-base font-semibold text-[var(--brand-ink)] hover:opacity-90 transition group"
          style={{ background: "var(--brand-amber)", boxShadow: "var(--glow-teal)" }}
        >
          <span>◆ Begin</span>
          <span className="font-mono-label text-[10px] tracking-[0.22em] uppercase opacity-80">8 min</span>
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>

        <p className="mt-5 font-mono-label text-[9px] tracking-[0.22em] uppercase text-muted-foreground">
          ● log it after, not before. The work is the work. The log is paperwork, and paperwork has had quite enough influence on the human body already.
        </p>
      </div>
    </article>
  );
}

/* ───────── Below-hero tiles ───────── */

function BelowStrip({ state }: { state: SessionState }) {
  const diff = state.index - state.prevIndex;
  return (
    <div className="grid sm:grid-cols-3 gap-px bg-border border border-border">
      <div className="bg-background p-6">
        <MonoTag muted>YESTERDAY</MonoTag>
        <p className="font-serif-display text-2xl italic mt-2 leading-tight">
          {state.prevIndex}{" "}
          <span className="text-muted-foreground text-base not-italic">
            · {diff >= 0 ? "you held the line" : "the chair won, mostly"}.
          </span>
        </p>
      </div>
      <div className="bg-background p-6">
        <MonoTag muted>STREAK · UNCELEBRATED</MonoTag>
        <p className="font-serif-display text-2xl italic mt-2 leading-tight">
          {state.streak}{" "}
          <span className="text-muted-foreground text-base not-italic">
            days. We don't make a thing of this.
          </span>
        </p>
      </div>
      <div className="bg-background p-6">
        <MonoTag muted>COHORT · PENDING</MonoTag>
        <p className="font-serif-display text-2xl italic mt-2 leading-tight">
          You.{" "}
          <span className="text-muted-foreground text-base not-italic">
            The protocol. The chair you did not pick. Cohort metrics return when the cohort exists.
          </span>
        </p>
      </div>
    </div>
  );
}

/* ───────── Engine card — push the money feature on the daily home ───────── */

function EngineCard({ state }: { state: SessionState }) {
  // Tag the recommendation by the user's current Index band
  const indexBand = state.index >= 70 ? "green" : state.index >= 50 ? "amber" : "red";
  const bandCopy: Record<string, string> = {
    green: "Quiet enough for a next-step option. Quiet is not permission to become an acrobat with unresolved chair trauma.",
    amber: "Amber tonight. The plan stays low-flexion, low-thrust, release-first unless you insist on making orthopaedics a spectator sport.",
    red: "Red. Bedroom plan is release-first only. That is not a punishment. It is the product refusing to let optimism drive without insurance.",
  };
  return (
    <article
      className="grid lg:grid-cols-12 border border-border overflow-hidden"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <div
        className="lg:col-span-7 px-7 md:px-10 py-9 md:py-11"
        style={{ background: "linear-gradient(140deg, oklch(0.96 0.012 80) 0%, oklch(0.92 0.022 76) 100%)" }}
      >
        <p
          className="font-mono-label text-[10px] tracking-[0.28em] uppercase"
          style={{ color: "var(--brand-oxblood)" }}
        >
          ◆ TONIGHT'S GEOMETRY · POSITION INTELLIGENCE ENGINE
        </p>
        <h3
          className="font-serif-display italic mt-3 leading-tight"
          style={{ fontSize: "clamp(28px, 3vw, 40px)" }}
        >
          Build tonight's plan{" "}
          <span style={{ color: "var(--brand-oxblood)" }}>in six taps.</span>
        </h3>
        <p className="mt-4 text-base leading-relaxed text-foreground/85 max-w-xl">
          {bandCopy[indexBand]} Tell the engine where the pain is, how the floor feels, what the evening is for. It returns a warm-up, a main course, and a dessert option, with escalate / hold / de-escalate at every act.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <a
            href="/engine.html"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition hover:opacity-90"
            style={{ background: "var(--brand-oxblood)", color: "var(--brand-paper)" }}
          >
            Build tonight's plan →
          </a>
          <span
            className="font-mono-label text-[10px] tracking-[0.22em] uppercase"
            style={{ color: "var(--muted-foreground)" }}
          >
            Index {state.index} · cap is {indexBand}
          </span>
        </div>
      </div>

      {/* Right rail: a tiny preview of what the output looks like */}
      <aside
        className="lg:col-span-5 px-6 py-7 border-l border-border"
        style={{ background: "oklch(0.92 0.022 76)" }}
      >
        <p className="font-mono-label text-[9px] tracking-[0.28em] uppercase" style={{ color: "var(--brand-oxblood)" }}>
          What you get back
        </p>
        <ul className="mt-4 space-y-3">
          {[
            ["WARM-UP", "Two minutes of breath, side-lying."],
            ["MAIN", "The geometry your back can sign off on."],
            ["DESSERT", "Climax-conservative, or the next step if quiet."],
          ].map(([label, body]) => (
            <li key={label} className="flex gap-3">
              <span
                className="font-mono-label text-[9px] tracking-[0.22em] uppercase shrink-0 pt-1"
                style={{ color: "var(--brand-oxblood)", width: 64 }}
              >
                {label}
              </span>
              <span className="font-serif-display text-sm italic leading-snug text-foreground/85">
                {body}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-5 pt-4 border-t border-border text-[11px] italic leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          Each act has escalate, hold, or de-escalate. The next act re-routes from your choice. No forced crescendo.
        </p>
      </aside>
    </article>
  );
}

/* ───────── Today's distraction — Roman quote teaser ───────── */

function DistractionTeaser() {
  const d = todaysDistraction();
  const isQuote = d.kind === "quote" || !d.kind;
  return (
    <div className="border border-border px-6 py-5 flex items-start justify-between gap-6 flex-wrap" style={{ background: "linear-gradient(180deg, oklch(0.95 0.018 78), oklch(0.92 0.022 76))" }}>
      <div className="flex-1 min-w-0">
        <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--brand-amber)" }}>
          ◆ Today's distraction · {THEME_LABEL[d.theme]}
        </p>
        <p className="font-serif-display text-xl md:text-2xl italic mt-2 leading-snug">
          {isQuote ? `“${d.text}”` : d.text}{" "}
          <span className="text-muted-foreground not-italic font-mono-label text-[10px] tracking-[0.22em] uppercase ml-2">
            · {d.attribution} · {d.era}
          </span>
        </p>
      </div>
      <Link
        to="/session"
        className="font-mono-label text-[10px] tracking-[0.22em] uppercase hover:opacity-80 transition shrink-0 self-end"
        style={{ color: "var(--brand-amber)" }}
      >
        more in the session →
      </Link>
    </div>
  );
}

/* ───────── Shelf ───────── */

function Shelf() {
  const items = [
    { label: "Engine", sub: "build tonight's plan, six taps", to: "/engine.html", external: true },
    { label: "Positions", sub: "scored by spine", to: "/positions" },
    { label: "Scripts", sub: "ready-to-copy adult sentences", to: "/conversation" },
    { label: "Partner", sub: "the second user, addressed", to: "/partner" },
    { label: "Science", sub: "public record + sources", to: "/science" },
  ];
  return (
    <nav className="grid sm:grid-cols-5 gap-px bg-border border border-border">
      {items.map((i) =>
        i.external ? (
          <a
            key={i.to}
            href={i.to}
            className="bg-background p-5 hover:bg-card/40 transition group flex items-baseline justify-between gap-3"
          >
            <div>
              <p className="font-serif-display text-lg leading-tight">{i.label}</p>
              <p className="font-mono-label text-[9px] tracking-[0.22em] uppercase text-muted-foreground mt-1">{i.sub}</p>
            </div>
            <span className="font-mono-label text-[10px] tracking-[0.22em] uppercase shrink-0 group-hover:translate-x-0.5 transition" style={{ color: "var(--brand-oxblood)" }}>
              →
            </span>
          </a>
        ) : (
          <Link
            key={i.to}
            to={i.to}
            className="bg-background p-5 hover:bg-card/40 transition group flex items-baseline justify-between gap-3"
          >
            <div>
              <p className="font-serif-display text-lg leading-tight">{i.label}</p>
              <p className="font-mono-label text-[9px] tracking-[0.22em] uppercase text-muted-foreground mt-1">{i.sub}</p>
            </div>
            <span className="font-mono-label text-[10px] tracking-[0.22em] uppercase shrink-0 group-hover:translate-x-0.5 transition" style={{ color: "var(--brand-oxblood)" }}>
              →
            </span>
          </Link>
        )
      )}
    </nav>
  );
}

/* ───────── Page ───────── */

function Dashboard() {
  const [state, setState] = useState<SessionState>(PREVIEW);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  const signIn = () => {
    try {
      localStorage.setItem("bs.user", JSON.stringify({ ...PREVIEW, signedIn: true }));
    } catch {}
    setState({ ...PREVIEW, signedIn: true });
  };
  const signOut = () => {
    localStorage.removeItem("bs.user");
    setState(PREVIEW);
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SiteHeader active="today" />

      <main className="px-6 md:px-10 py-8 md:py-12">
        <div className="max-w-[1280px] mx-auto space-y-8">
          <HeroCard state={state} />
          <CheckIn
            baselineIndex={state.prevIndex}
            onSubmit={(r: CheckInResult) => {
              const next = { ...state, index: r.newIndex };
              setState(next);
              try {
                localStorage.setItem("bs.user", JSON.stringify(next));
              } catch {}
            }}
          />
          <BelowStrip state={state} />
          <EngineCard state={state} />
          <DistractionTeaser />
          <Shelf />
        </div>
      </main>

      <footer className="px-6 md:px-10 py-8 border-t border-border">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between flex-wrap gap-4 font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
          <span>◆ BackStroke · today</span>
          <span className="font-serif-display italic normal-case tracking-normal text-foreground/70">
            Eight minutes a day. The rent your spine pays.
          </span>
          <span className="flex items-center gap-4">
            {hydrated && (
              <button
                onClick={state.signedIn ? signOut : signIn}
                className="opacity-60 hover:opacity-100 transition"
                title="Demo controls — real auth ships before launch"
              >
                {state.signedIn ? "demo · sign out" : "demo · sign in"}
              </button>
            )}
            <span>℠ MMXXVI</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
