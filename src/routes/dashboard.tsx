import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { copy } from "@/lib/copy";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [{ title: "Today · BackStroke" }],
  }),
});

type SessionState = {
  index: number;
  prevIndex: number;
  streak: number;
  todayPain: number | null;
  todayEnergy: "ok" | "low" | null;
  sessionPlanned: string;
  sessionDuration: string;
  mobilityDelta: number;
  sittingHours: number;
  sleepPositionCorrect: boolean;
  signedIn: boolean;
  flareSwapped: boolean;
};

const PREVIEW: SessionState = {
  index: 71,
  prevIndex: 68,
  streak: 12,
  todayPain: 2,
  todayEnergy: "ok",
  sessionPlanned: "Spine big-3 + reverse kegel",
  sessionDuration: "8 min",
  mobilityDelta: 2,
  sittingHours: 5,
  sleepPositionCorrect: true,
  signedIn: false,
  flareSwapped: false,
};

function loadState(): SessionState {
  try {
    const raw = localStorage.getItem("bs.user");
    if (!raw) return PREVIEW;
    const stored = JSON.parse(raw) as Partial<SessionState>;
    return { ...PREVIEW, ...stored, signedIn: true };
  } catch {
    return PREVIEW;
  }
}

function saveState(s: SessionState) {
  try {
    localStorage.setItem("bs.user", JSON.stringify(s));
  } catch {}
}

/** Build the under-score annotation (item 11 + item 15). */
function indexDiffLine(s: SessionState): string {
  const diff = s.index - s.prevIndex;
  if (diff === 0) return `${s.index} today. Holding pattern. Same plan, no narrative required.`;
  const drivers: string[] = [];
  if (s.mobilityDelta !== 0)
    drivers.push(`Mobility ${s.mobilityDelta > 0 ? "+" : ""}${s.mobilityDelta}`);
  drivers.push(`Sitting hours ${s.sittingHours > 6 ? "up to " : "down to "}${s.sittingHours}`);
  if (s.sleepPositionCorrect) drivers.push("Sleep position correct");
  else drivers.push("Sleep position off");

  if (diff > 0) {
    return `Plus ${diff} today. ${drivers.join(", ")}. Quiet wins.`;
  }
  return `Minus ${Math.abs(diff)} today. ${drivers.join(", ")}. Same plan, slightly more patience.`;
}

function PainPicker({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: 11 }, (_, i) => i).map((n) => {
        const active = value === n;
        const isFlare = n >= 7;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`w-9 h-9 rounded-full font-mono-label text-[11px] tracking-tight border transition ${
              active
                ? "bg-foreground text-background border-foreground"
                : isFlare
                  ? "border-[var(--brand-blush)] text-muted-foreground hover:text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
            }`}
            aria-label={`Pain ${n}`}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}

function TodayWidget({
  state,
  onLaunchSession,
}: {
  state: SessionState;
  onLaunchSession: () => void;
}) {
  return (
    <article className="rounded-2xl border border-border bg-card/40 p-7 md:p-10">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">
            {state.signedIn ? "TODAY · LIVE" : "TODAY · PREVIEW"}
          </p>
          <p className="font-serif-display text-7xl md:text-8xl mt-3 leading-none tracking-tight">
            {state.index}
          </p>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-md italic">
            {indexDiffLine(state)}
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
            Streak
          </p>
          <p className="font-serif-display text-3xl mt-1" style={{ color: "var(--brand-amber)" }}>
            {state.streak}
            <span className="text-sm text-muted-foreground ml-1">days</span>
          </p>
        </div>
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
          Today's session · {state.sessionDuration}
        </p>
        <h2 className="font-serif-display text-3xl md:text-4xl mt-2 leading-tight">
          {state.sessionPlanned}
          {state.flareSwapped && (
            <span className="block text-base font-mono-label tracking-[0.22em] uppercase mt-3" style={{ color: "var(--brand-blush)" }}>
              ◆ FLARE DAY · DOWN-TRAIN
            </span>
          )}
        </h2>

        {state.flareSwapped && (
          <p className="text-sm text-muted-foreground mt-3 italic leading-relaxed">
            {copy("flareSwap")}
          </p>
        )}

        <button
          type="button"
          onClick={onLaunchSession}
          className="mt-6 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[var(--brand-amber)] text-[var(--brand-ink)] text-sm font-semibold hover:opacity-90 transition"
        >
          {state.signedIn ? "Start session →" : "Run preview session →"}
        </button>
      </div>
    </article>
  );
}

const COUNCIL_Q_BANK = [
  {
    q: "If kegels are not the answer, what is the answer for a woman with stress incontinence?",
    a: "Down-train first. An over-tonic floor and a weak one feel identical from the outside. We start with diaphragmatic breath and reverse kegels for two weeks, screen for prolapse with a colleague, and only then introduce graded eccentric load. Most leakage I see in the clinic resolves in the first phase, before a single concentric rep.",
    aPara2:
      "If symptoms persist past four weeks of down-training, it is a clinic visit, not a longer down-train. Apps cannot palpate. Apps cannot rule out prolapse. We can teach 80 percent of the work and route the rest, and that is exactly what we do here.",
    sig: "— APTA pelvic-health PT (TBD)",
  },
  {
    q: "Why does my back feel worse on rest days?",
    a: "Two things tend to be happening at once. Static load — sitting, couch, car — does more cumulative damage than a single bad lift, and a 'rest day' often means more sitting. The lumbar adapts to micro-doses of movement. Take them away for 36 hours and you'll feel it.",
    aPara2:
      "The fix is not training harder on rest days; the fix is the 30/3 rule and a sleep audit. Stand three minutes every thirty. Pillow under the knees. The protocol does not care that it is Saturday.",
    sig: "— McGill-trained spine PT (TBD)",
  },
  {
    q: "I've finished prostate surgery. When can I start kegels?",
    a: "After the catheter is out, after your urologist has cleared you, not before. Timing varies — open versus robotic, continence status, lymph involvement. The general window is two to six weeks post-op, and the first phase is always submaximal: short, light contractions paired with diaphragmatic breath, not 'as hard as you can.'",
    aPara2:
      "The instinct after surgery is to over-train the floor to prove something. Don't. Eccentric control beats peak force every time, and the floor needs to learn how to release before it can learn how to contract reliably under spinal load.",
    sig: "— Urologist (TBD)",
  },
];

function DailyQuestionCard({ index }: { index: number }) {
  const q = COUNCIL_Q_BANK[index % COUNCIL_Q_BANK.length];
  return (
    <article className="rounded-2xl border border-border bg-background p-7 md:p-9">
      <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">
        DAILY QUESTION · COUNCIL ROTATION
      </p>
      <h3 className="font-serif-display text-2xl md:text-3xl mt-3 leading-snug">
        {q.q}
      </h3>
      <div className="mt-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
        <p>{q.a}</p>
        <p>{q.aPara2}</p>
      </div>
      <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase mt-6" style={{ color: "var(--brand-blush)" }}>
        {q.sig}
      </p>
    </article>
  );
}

function QuestionSubmit() {
  const [q, setQ] = useState("");
  const [initials, setInitials] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    try {
      const list = JSON.parse(localStorage.getItem("bs.questions") ?? "[]");
      list.push({ q, initials: initials || "anon", t: Date.now() });
      localStorage.setItem("bs.questions", JSON.stringify(list));
    } catch {}
    setQ("");
    setInitials("");
    setSent(true);
    setTimeout(() => setSent(false), 2400);
  };

  return (
    <form onSubmit={submit} className="rounded-2xl border border-border bg-background p-7">
      <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
        ASK THE COUNCIL · WE CREDIT BY INITIAL ONLY
      </p>
      <textarea
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="The thing your PT never had time for."
        rows={3}
        className="mt-4 w-full px-4 py-3 rounded-md bg-background border border-border focus:border-foreground/40 focus:outline-none text-sm placeholder:text-muted-foreground/60"
      />
      <div className="mt-3 flex gap-3">
        <input
          type="text"
          maxLength={3}
          value={initials}
          onChange={(e) => setInitials(e.target.value.toUpperCase())}
          placeholder="Initials"
          className="w-24 px-3 py-2 rounded-md bg-background border border-border text-sm placeholder:text-muted-foreground/60"
        />
        <button
          type="submit"
          className="flex-1 px-5 py-2 rounded-full font-mono-label text-[10px] tracking-[0.22em] uppercase bg-foreground text-background hover:opacity-90 transition"
        >
          {sent ? "✓ in the queue" : "Send to the council"}
        </button>
      </div>
    </form>
  );
}

function Dashboard() {
  const [state, setState] = useState<SessionState>(PREVIEW);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  const onSelectPain = (n: number) => {
    const flare = n >= 7 || state.todayEnergy === "low";
    const next: SessionState = {
      ...state,
      todayPain: n,
      flareSwapped: flare,
      sessionPlanned: flare
        ? "Down-train: 4-7-8 breath + supported decompression"
        : "Spine big-3 + reverse kegel",
      sessionDuration: flare ? "6 min" : "8 min",
    };
    setState(next);
    if (state.signedIn) saveState(next);
  };

  const onSelectEnergy = (e: "ok" | "low") => {
    const flare = e === "low" || (state.todayPain !== null && state.todayPain >= 7);
    const next: SessionState = {
      ...state,
      todayEnergy: e,
      flareSwapped: flare,
      sessionPlanned: flare
        ? "Down-train: 4-7-8 breath + supported decompression"
        : "Spine big-3 + reverse kegel",
      sessionDuration: flare ? "6 min" : "8 min",
    };
    setState(next);
    if (state.signedIn) saveState(next);
  };

  const onLaunchSession = () => {
    // Routes to the existing baseline scaffold; replace with the actual session player when built.
    window.location.href = "/protocol";
  };

  const signIn = () => {
    const seeded: SessionState = { ...PREVIEW, signedIn: true };
    saveState(seeded);
    setState(seeded);
  };

  const signOut = () => {
    localStorage.removeItem("bs.user");
    setState(PREVIEW);
  };

  const questionRotationIndex = useMemo(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000,
    );
    return dayOfYear;
  }, []);

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
          <nav className="flex items-center gap-5 font-mono-label text-[10px] tracking-[0.18em] uppercase">
            <Link to="/positions" className="text-muted-foreground hover:text-foreground transition">Positions</Link>
            <Link to="/conversation" className="text-muted-foreground hover:text-foreground transition">Scripts</Link>
            {hydrated && state.signedIn ? (
              <button onClick={signOut} className="text-muted-foreground hover:text-foreground transition">
                Sign out
              </button>
            ) : (
              <button onClick={signIn} className="px-4 py-2 rounded-full bg-foreground text-background hover:opacity-90 transition">
                Sign in (demo)
              </button>
            )}
          </nav>
        </div>
      </header>

      <section className="px-6 md:px-10 py-10 md:py-16">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <TodayWidget state={state} onLaunchSession={onLaunchSession} />

            <div className="mt-8 rounded-2xl border border-border bg-background p-7 md:p-9">
              <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">
                DAILY LOGGER · FLARE-AWARE
              </p>
              <h3 className="font-serif-display text-2xl md:text-3xl mt-3 leading-snug">
                Where's the spine at today?
              </h3>

              <div className="mt-6">
                <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
                  Pain · 0 to 10
                </p>
                <PainPicker value={state.todayPain} onChange={onSelectPain} />
              </div>

              <div className="mt-6">
                <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
                  Energy
                </p>
                <div className="flex gap-2">
                  {(["ok", "low"] as const).map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => onSelectEnergy(e)}
                      className={`px-4 py-2 rounded-full font-mono-label text-[10px] tracking-[0.22em] uppercase transition ${
                        state.todayEnergy === e
                          ? "bg-foreground text-background"
                          : "border border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {e === "ok" ? "Available" : "Low energy"}
                    </button>
                  ))}
                </div>
              </div>

              {state.flareSwapped && (
                <div className="mt-6 border-t border-border pt-5">
                  <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--brand-blush)" }}>
                    ◆ AUTO-SWAP · DOWN-TRAIN
                  </p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                    {copy("flareSwap")}
                  </p>
                </div>
              )}
            </div>
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <DailyQuestionCard index={questionRotationIndex} />
            <QuestionSubmit />

            <div className="rounded-2xl border border-border bg-card/30 p-7">
              <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                Tools
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link to="/positions" className="hover:text-foreground transition flex items-center justify-between">
                    Position library, scored by spine
                    <span className="text-muted-foreground">→</span>
                  </Link>
                </li>
                <li>
                  <Link to="/conversation" className="hover:text-foreground transition flex items-center justify-between">
                    F.07 — conversation script generator
                    <span className="text-muted-foreground">→</span>
                  </Link>
                </li>
                <li>
                  <Link to="/share/demo" className="hover:text-foreground transition flex items-center justify-between">
                    Partner-share, demo preview
                    <span className="text-muted-foreground">→</span>
                  </Link>
                </li>
                <li>
                  <Link to="/science" className="hover:text-foreground transition flex items-center justify-between">
                    Cohort data + sources
                    <span className="text-muted-foreground">→</span>
                  </Link>
                </li>
              </ul>
            </div>

            {!state.signedIn && (
              <div className="rounded-2xl border border-border bg-background p-7">
                <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--brand-amber)" }}>
                  YOU'RE IN PREVIEW
                </p>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  This dashboard is showing dated demo data. Click "Sign in (demo)" up top to write changes to localStorage and try the live widget. Stripe + real auth land next pass.
                </p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
