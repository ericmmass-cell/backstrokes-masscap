import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/podcast")({
  component: Podcast,
  head: () => ({
    meta: [
      { title: "The BackStroke Podcast" },
      {
        name: "description",
        content:
          "The PT and the sex therapist, in the same room, on the record. Episodes drop weekly.",
      },
    ],
  }),
});

type Episode = {
  num: string;
  title: string;
  duration: string;
  guests: string;
  blurb: string;
  status: "tbd" | "live";
};

const EPISODES: Episode[] = [
  {
    num: "01",
    title: "Same pelvis, two jobs. Why your PT and your sex therapist have never met.",
    duration: "00:00",
    guests: "TBD spine PT · TBD AASECT therapist",
    blurb:
      "The opening volley. Why the two clinics don't talk, what gets lost in the gap, and what the protocol does about it.",
    status: "tbd",
  },
  {
    num: "02",
    title: "Down-train first. The mistake eight million downloads agreed on.",
    duration: "00:00",
    guests: "TBD pelvic-health PT",
    blurb:
      "Why the kegel-counting apps trained the wrong muscle in the wrong direction. What an over-tonic floor actually feels like, and why it ruins sex before it ruins anything else.",
    status: "tbd",
  },
  {
    num: "03",
    title: "The McGill protocol, untouched by influencers.",
    duration: "00:00",
    guests: "TBD spine PT",
    blurb:
      "The endurance trio. Why three moves outperform thirty. The studies the stretch-reel crowd cites and what those studies actually said.",
    status: "tbd",
  },
];

function Podcast() {
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
            THE PODCAST · WEEKLY · WHEREVER YOU LISTEN
          </p>
          <h1 className="font-serif-display text-5xl md:text-7xl mt-5 leading-[0.98] tracking-[-0.025em] max-w-3xl">
            The PT and the sex therapist, <span className="italic" style={{ color: "var(--brand-amber)" }}>in the same room, on the record.</span>
          </h1>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-3xl">
            The chart that should have always been one chart, finally read out loud. Each episode pairs a clinician from the spine side with a clinician from the bedroom side. No supplements. No life coaches. No sponsor that sells a tincture. No host who quit medicine to become an entrepreneur.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-10 py-12 border-b border-border">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-3 gap-px bg-border border border-border">
          {EPISODES.map((e) => (
            <article key={e.num} className="bg-background p-7 md:p-9">
              <div
                className="aspect-square w-full bg-card/40 border border-border grid place-items-center font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground"
                aria-hidden
              >
                EP {e.num} · ART TBD
              </div>
              <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)] mt-6">
                EPISODE {e.num} · {e.duration}
              </p>
              <h3 className="font-serif-display text-2xl mt-3 leading-snug">{e.title}</h3>
              <p className="font-mono-label text-[10px] tracking-[0.18em] uppercase text-muted-foreground mt-3">
                {e.guests}
              </p>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{e.blurb}</p>
              <p className="font-mono-label text-[9px] tracking-[0.22em] uppercase mt-6" style={{ color: "var(--brand-blush)" }}>
                Coming soon
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 py-20">
        <div className="max-w-[900px] mx-auto text-center">
          <p className="font-script text-2xl md:text-3xl italic" style={{ color: "var(--brand-blush)" }}>
            One feed. Two clinicians. <span style={{ color: "var(--brand-amber)" }}>Zero ashwagandha discount codes.</span>
          </p>
        </div>
      </section>
    </div>
  );
}
