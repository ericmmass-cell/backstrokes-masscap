import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Eyebrow, MonoTag } from "@/components/editorial";
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

/** Rotating P.S. line. Six variants, picks one by day-of-year. */
function ps(): string {
  const day = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000,
  );
  const bank = [
    "P.S. Still no candle revenue. Three weeks in and the lumbar has not asked for one once.",
    "P.S. The hotel-room chair in your office. We see it. Your spine sees it. You did not pick it.",
    "P.S. Your standing desk is plugged in, not engaged. We can tell by the curve.",
    "P.S. The kegel app went quiet last Tuesday. So did the floor it trained.",
    "P.S. Nobody on the council owns a ring light. This is on purpose.",
    "P.S. The Pilates instructor on TikTok is statistically wrong about your floor. Statistically.",
  ];
  return bank[day % bank.length];
}

function letterFor(state: SessionState): { lede: string; signer: string; role: string } {
  const dow = new Date().getDay();
  if (state.flareSwapped) {
    return {
      lede: "Flare day. We move to the down-train; the streak is unaffected, because the streak was never the point.",
      signer: "K.R.",
      role: "pelvic-health PT",
    };
  }
  const map: Record<number, string> = {
    0: "The 'rest day' is a myth the supplement industry sells, alongside a tincture you are now subscribed to. The lumbar adapts to micro-doses of movement. Remove them for 36 hours and you will feel it Monday. Eight minutes below. If you can read this, you can do it. If you cannot, you have other problems.",
    1: "Monday. The lumbar woke up first and is, against its own advice, willing to be reasonable. Hold the dose.",
    2: "Tuesday. The disc files motions on Tuesdays. This is consistent with the data, not a personal grudge. The cause is below in the drivers; usually it's the chair, which you would not have chosen for any other reason. We do the eight minutes anyway. Cumulative load is the only thing that moves this number, and the only thing that has ever moved it. No new advice today.",
    3: "Wednesday. The floor's day. Add the reverse kegel and diaphragmatic breath to the spine block. The inhale lengthens, the exhale releases, nothing should feel like effort. If you can't feel the drop, you are doing a kegel, which is the thing the eight-million-download apps trained you to do. Four sets of ten breaths, seven minutes, after the big-3 not before.",
    4: "Thursday. The 30/3 rule is the only intervention that touches sitting hours. Stand three minutes every thirty, walk the corridor if there is one, do one hip-hinge set if there isn't. Today's session is unchanged. We are not adding work. We are subtracting time spent at 90°, which is the angle the human body lost an argument with in 1958 and has been losing it since.",
    5: "Friday. The protocol works on Saturdays too. Statistically, this is news to most users. Run it before the social part of the evening, not at midnight after.",
    6: "The 'rest day' is a myth the supplement industry sells, alongside a tincture you are now subscribed to. The lumbar adapts to micro-doses of movement. Remove them for 36 hours and you will feel it Monday. Eight minutes below. If you can read this, you can do it. If you cannot, you have other problems.",
  };
  return { lede: map[dow], signer: dow === 3 ? "K.R." : "D.G.", role: dow === 3 ? "pelvic-health PT" : "spine PT" };
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
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 45%, oklch(0.08 0 0 / 0.7) 100%)" }} />

        <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
          <MonoTag>FIG. M-04 · OVERHEAD STUDY · DAY {state.streak + 1}</MonoTag>
          <span className="font-mono-label text-[9px] tracking-[0.22em] uppercase" style={{ color: "var(--brand-amber)" }}>
            ● TODAY · {new Date().toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()}
          </span>
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <p className="font-serif-display text-2xl md:text-3xl italic leading-tight text-white">
            Eight minutes for the spine.
          </p>
          <p className="font-serif-display text-base italic text-white/85 mt-1 leading-snug">
            The rent your back pays. Non-negotiable. We don't make the rules. Gravity does.
          </p>
        </div>
      </div>

      {/* RIGHT: Index + letter + CTA */}
      <div className="lg:col-span-6 px-8 md:px-12 py-10 md:py-14 relative" style={{ background: "linear-gradient(180deg, oklch(0.155 0.018 26) 0%, var(--brand-ink) 100%)" }}>
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
          ● log it after, not before. The work is the work. The log is paperwork.
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
        <MonoTag muted>COHORT · LIVE</MonoTag>
        <p className="font-serif-display text-2xl italic mt-2 leading-tight">
          142{" "}
          <span className="text-muted-foreground text-base not-italic">
            of you, before 9am. We see you.
          </span>
        </p>
      </div>
    </div>
  );
}

/* ───────── Today's distraction — Roman quote teaser ───────── */

function DistractionTeaser() {
  const d = todaysDistraction();
  const isQuote = d.kind === "quote" || !d.kind;
  return (
    <div className="border border-border bg-background px-6 py-5 flex items-start justify-between gap-6 flex-wrap" style={{ background: "linear-gradient(180deg, oklch(0.135 0.012 28), var(--brand-ink))" }}>
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
    { label: "Positions", sub: "scored by spine", to: "/positions" },
    { label: "Scripts", sub: "F.07, AASECT-supervised", to: "/conversation" },
    { label: "Science", sub: "cohort data + sources", to: "/science" },
    { label: "Council", sub: "four clinicians, four vetoes", to: "/council" },
  ];
  return (
    <nav className="grid sm:grid-cols-4 gap-px bg-border border border-border">
      {items.map((i) => (
        <Link
          key={i.to}
          to={i.to}
          className="bg-background p-5 hover:bg-card/40 transition group flex items-baseline justify-between gap-3"
        >
          <div>
            <p className="font-serif-display text-lg leading-tight">{i.label}</p>
            <p className="font-mono-label text-[9px] tracking-[0.22em] uppercase text-muted-foreground mt-1">{i.sub}</p>
          </div>
          <span className="font-mono-label text-[10px] tracking-[0.22em] uppercase shrink-0 group-hover:translate-x-0.5 transition" style={{ color: "var(--brand-amber)" }}>
            →
          </span>
        </Link>
      ))}
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
            <sup className="font-mono-label text-[8px] text-muted-foreground ml-0.5">℠</sup>
          </Link>
          <nav className="flex items-center gap-5 font-mono-label text-[10px] tracking-[0.18em] uppercase">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition">Home</Link>
            <Link to="/positions" className="text-muted-foreground hover:text-foreground transition">Positions</Link>
            <Link to="/science" className="text-muted-foreground hover:text-foreground transition">Science</Link>
            {hydrated && state.signedIn ? (
              <button onClick={signOut} className="text-muted-foreground hover:text-foreground transition">
                Sign out
              </button>
            ) : (
              <button onClick={signIn} className="px-4 py-2 rounded-full bg-foreground text-background hover:opacity-90 transition">
                Sign in · demo
              </button>
            )}
          </nav>
        </div>
      </header>

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
          <span>℠ MMXXVI</span>
        </div>
      </footer>
    </div>
  );
}
