import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/science")({
  component: Science,
  head: () => ({
    meta: [
      { title: "Science · BackStroke" },
      {
        name: "description",
        content:
          "Cohort numbers, methodology, and the published clinical work that informs the BackStroke protocol. Self-reported, internal, uncontrolled — and labeled as such.",
      },
    ],
  }),
});

type Cohort = {
  v: string;
  l: string;
  n?: string;
  method: string;
};

const COHORT_BACK: Cohort[] = [
  {
    v: "−63%",
    l: "back-pain days at week 8",
    n: "n=412",
    method:
      "Self-reported pain-day count, in-app daily log. Internal cohort, uncontrolled, not peer-reviewed.",
  },
  {
    v: "+58%",
    l: "rate sex 'genuinely enjoyable' at week 10",
    n: "n=412",
    method:
      "Self-reported, 5-point Likert collapsed to a binary. Internal cohort, no control arm, not peer-reviewed.",
  },
  {
    v: "2.4×",
    l: "morning erections at week 12",
    n: "subset, men, n≈180",
    method:
      "Self-reported weekly count vs. baseline week. Subset of male users who completed the 12-week run. Internal, uncontrolled, not peer-reviewed.",
  },
  {
    v: "−71%",
    l: "report pain as a distraction in bed at week 12",
    n: "n=412",
    method:
      "Self-reported, weekly check-in. Internal cohort, uncontrolled, not peer-reviewed.",
  },
];

const COHORT_LIFE: Cohort[] = [
  {
    v: "+34%",
    l: "intimate frequency vs. baseline week",
    n: "n=412",
    method: "Self-reported weekly count. Internal, uncontrolled, not peer-reviewed.",
  },
  {
    v: "−47%",
    l: "report pain 'as a barrier' to intimacy",
    n: "n=412",
    method:
      "Self-reported, weekly check-in, single-item. Internal, uncontrolled, not peer-reviewed.",
  },
  {
    v: "2.1×",
    l: "self-rated confidence in initiating",
    n: "n=412",
    method:
      "Self-reported, 1–10 scale, ratio of week 10 vs. baseline. Internal, uncontrolled, not peer-reviewed.",
  },
];

const SOURCES = [
  {
    title: "McGill spine endurance protocols",
    note:
      "Endurance-over-flexibility approach to non-specific low-back pain. Informs the spine big-3 (curl-up, side plank, bird-dog).",
  },
  {
    title: "NIH NIDDK pelvic floor (2023)",
    note:
      "Down-train-first sequencing for over-tonic pelvic floors. Informs reverse-kegel / diaphragm-drop work before any concentric kegel training.",
  },
  {
    title: "ISSWSH female sexual function consensus",
    note:
      "Defines outcomes (lubrication, arousal, satisfaction, pain) and methodological standards for sexual-function reporting in women.",
  },
  {
    title: "AUA erectile and ejaculatory guidelines",
    note:
      "Defines workup, red flags, and referral criteria for men. Informs the in-app screening prompts and the 'see a urologist' routing logic.",
  },
];

function StatBlock({ stats, accent }: { stats: Cohort[]; accent: "amber" | "blush" }) {
  const color = accent === "amber" ? "var(--brand-amber)" : "var(--brand-blush)";
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
      {stats.map((s) => (
        <div key={s.l} className="bg-background p-6">
          <p className="font-serif-display text-4xl md:text-5xl tracking-tight" style={{ color }}>
            {s.v}
          </p>
          <p className="text-xs text-muted-foreground mt-3 leading-snug">{s.l}</p>
          {s.n && (
            <p className="font-mono-label text-[9px] tracking-[0.18em] uppercase text-muted-foreground mt-2">
              {s.n}
            </p>
          )}
          <p className="text-[11px] text-muted-foreground/80 mt-4 leading-relaxed border-t border-border/60 pt-3 italic">
            {s.method}
          </p>
        </div>
      ))}
    </div>
  );
}

function Science() {
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

      <section className="px-6 md:px-10 py-16 md:py-24 border-b border-border">
        <div className="max-w-[1280px] mx-auto">
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">
            SCIENCE · COHORT DATA · METHODOLOGY · SOURCES
          </p>
          <h1 className="font-serif-display text-5xl md:text-7xl mt-5 leading-[0.98] tracking-[-0.025em] max-w-3xl">
            The numbers, with the asterisks <span className="italic" style={{ color: "var(--brand-amber)" }}>actually attached.</span>
          </h1>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Everything on this page is from an internal in-app cohort. It is self-reported. There is no control arm. It has not been peer-reviewed. We are publishing it because we'd rather you see the raw shape — and the caveats — than the numbers alone on a hero panel where they read like a clinical trial.
          </p>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-3xl italic">
            None of this is a substitute for a clinician. If your back is screaming, if sex hurts, if arousal has quietly left the chat, see one. We list the published work that informs the protocol separately, below the cohort numbers, so the two are not confused.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-10 py-20 border-b border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-10 flex items-end justify-between flex-wrap gap-6">
            <div>
              <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">
                COHORT 01 · BACK + BEDROOM · 12-WEEK RUN
              </p>
              <h2 className="font-serif-display text-3xl md:text-5xl mt-4 leading-[1.02] tracking-tight max-w-2xl">
                Back pain and arousal, measured on the same calendar.
              </h2>
            </div>
            <p className="font-mono-label text-[10px] text-muted-foreground max-w-xs leading-relaxed normal-case tracking-wide">
              Each cell shows the value, the cohort size, and the methodology for that specific number. Read the italic line.
            </p>
          </div>
          <StatBlock stats={COHORT_BACK} accent="amber" />
        </div>
      </section>

      <section className="px-6 md:px-10 py-20 border-b border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-10">
            <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--brand-blush)" }}>
              COHORT 01 · INTIMACY MEASURES · WEEK 10
            </p>
            <h2 className="font-serif-display text-3xl md:text-5xl mt-4 leading-[1.02] tracking-tight max-w-2xl">
              <span className="italic" style={{ color: "var(--brand-blush)" }}>What the spine work did</span> to the rest of the evening.
            </h2>
          </div>
          <StatBlock stats={COHORT_LIFE} accent="blush" />
        </div>
      </section>

      <section className="px-6 md:px-10 py-20 border-b border-border">
        <div className="max-w-[1280px] mx-auto">
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">
            PUBLISHED CLINICAL WORK · SEPARATE FROM THE COHORT NUMBERS
          </p>
          <h2 className="font-serif-display text-3xl md:text-5xl mt-4 leading-[1.02] tracking-tight max-w-2xl">
            What the protocol is built on, not what the cohort proves.
          </h2>
          <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-2xl">
            These are the bodies of work that informed the design. They are <span className="italic">not</span> evidence for the cohort numbers above. They are listed so the protocol is auditable, not so the numbers borrow their credibility.
          </p>

          <ul className="mt-10 grid md:grid-cols-2 gap-px bg-border border border-border">
            {SOURCES.map((s) => (
              <li key={s.title} className="bg-background p-6">
                <p className="font-serif-display text-xl leading-snug">{s.title}</p>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{s.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 md:px-10 py-20">
        <div className="max-w-[900px] mx-auto text-center">
          <p className="font-script text-3xl italic" style={{ color: "var(--brand-blush)" }}>
            Numbers are not the protocol. <span style={{ color: "var(--brand-amber)" }}>The protocol is the protocol.</span>
          </p>
          <div className="mt-8 flex items-center justify-center gap-5">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--brand-amber)] text-[var(--brand-ink)] text-sm font-semibold hover:opacity-90 transition"
            >
              ← read the manifesto
            </Link>
            <Link
              to="/council"
              className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition"
            >
              meet the council →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
