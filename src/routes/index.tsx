import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroSchematic, WorkSchematic } from "@/components/Schematic";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "BackStroke. The protocol your spine clinic forgot to mention." },
      {
        name: "description",
        content:
          "Eight muscles. Two jobs. One protocol. Eight minutes a day. Designed by clinicians, hostile to candles.",
      },
      {
        property: "og:title",
        content: "BackStroke. Eight muscles, two jobs, one protocol.",
      },
      {
        property: "og:description",
        content:
          "The protocol the medical establishment forgot to write, in the language the wellness aisle declines to use.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=Caveat:wght@500;700&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
});

const PAPER = "oklch(0.94 0.018 78)";
const PAPER_2 = "oklch(0.92 0.022 76)";
const PAPER_INK = "oklch(0.18 0.01 40)";
const PAPER_MUTED = "oklch(0.45 0.02 40)";
const AMBER = "var(--brand-amber)";
const BLUSH = "var(--brand-blush)";

function Index() {
  return (
    <div className="min-h-screen antialiased" style={{ background: PAPER, color: PAPER_INK }}>
      <SiteHeader active="home" />

      {/* ───────── HERO ───────── */}
      <section className="px-6 md:px-10 pt-24 md:pt-32 pb-24 md:pb-28 relative overflow-hidden">
        <div className="max-w-[1180px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 relative">
            <p
              className="font-mono-label text-[10px] tracking-[0.28em] uppercase mb-8"
              style={{ color: "var(--brand-oxblood)" }}
            >
              BACK PAIN + SEX · ONE PRIVATE PROTOCOL
            </p>
            <h1
              className="font-serif-display leading-[0.94] tracking-[-0.025em]"
              style={{ fontSize: "clamp(52px, 8vw, 116px)", color: PAPER_INK }}
            >
              Your back should
              <br />
              not be the{" "}
              <span className="italic" style={{ color: "var(--brand-oxblood)" }}>
                third person
              </span>
              <br />
              in bed.
            </h1>

            <p
              className="mt-9 font-serif-display italic leading-snug max-w-xl"
              style={{ fontSize: "clamp(19px, 1.9vw, 25px)", color: PAPER_INK, opacity: 0.86 }}
            >
              For the back that came home from work loud. For the floor that has been gripping since the second baby. For the couple that stopped trying because the cost of trying kept going up. One daily protocol, a smarter position plan, and the words for the conversation nobody was taught to have.
            </p>
            <p
              className="mt-5 font-serif-display italic leading-snug max-w-xl"
              style={{ fontSize: "clamp(16px, 1.4vw, 19px)", color: PAPER_INK, opacity: 0.7 }}
            >
              Three minutes if that is all today has. Eight when it does not. No gummies. No candle. No influencer explaining your pelvis from a ring light.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold transition hover:opacity-90"
                style={{ background: "var(--brand-oxblood)", color: PAPER, boxShadow: "0 12px 30px -10px oklch(0.18 0.01 40 / 0.4)" }}
              >
                Run the baseline · 7 min <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="/engine.html"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold transition hover:opacity-90"
                style={{
                  background: "transparent",
                  color: "var(--brand-oxblood)",
                  border: "1.5px solid var(--brand-oxblood)",
                }}
              >
                Build tonight's plan <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <p className="mt-8 text-sm italic max-w-md leading-relaxed" style={{ color: PAPER_MUTED }}>
              Built from public-source biomechanics and practical movement logic. Not medical care. Not sex therapy. Not a retreat with bad WiFi and worse boundaries.
            </p>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative" style={{ boxShadow: "0 40px 80px -20px oklch(0.18 0.01 40 / 0.18)" }}>
              <HeroSchematic />
              <span
                className="absolute -top-6 -right-3 font-script text-3xl rotate-[5deg] hidden md:block"
                style={{ color: "var(--brand-oxblood)" }}
              >
                quieter than the clinic
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── PROOF STRIP ───────── */}
      <section className="border-y" style={{ borderColor: "oklch(0.86 0.025 70)", background: PAPER_2 }}>
        <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {[
            ["8 min", "a day. Doesn't require a candle."],
            ["1 protocol", "back and bedroom, on the same chart, against the recommendation of two separate industries."],
            ["0 fabrications", "every claim cites the public literature. The wellness aisle should try this."],
            ["0 supplements", "0 jade eggs · 0 ashwagandha · 0 things sold in a hemp pouch."],
          ].map(([v, l]) => (
            <div key={String(l)}>
              <p
                className="font-serif-display tracking-tight leading-none"
                style={{
                  fontSize: "clamp(34px, 4vw, 52px)",
                  background: "var(--gradient-text)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {v}
              </p>
              <p className="mt-3 font-serif-display italic text-base leading-snug" style={{ color: PAPER_INK, opacity: 0.78 }}>
                {l}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── PROBLEM ───────── */}
      <section id="problem" className="px-6 md:px-10 py-24 md:py-32 relative" style={{ background: PAPER_2 }}>
        <div className="max-w-[1100px] mx-auto">
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--brand-oxblood)" }}>
            ◆ One body. Two invoices.
          </p>
          <h2
            className="font-serif-display mt-6 leading-[1.0] tracking-[-0.02em] max-w-4xl"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", color: PAPER_INK }}
          >
            Your body did not separate{" "}
            <span className="italic" style={{ color: "var(--brand-oxblood)" }}>
              back pain and sex. The industries did.
            </span>
          </h2>

          <div className="mt-12 grid md:grid-cols-2 gap-10 max-w-4xl">
            <div>
              <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase mb-3" style={{ color: "var(--brand-oxblood)" }}>
                Side one. The chart.
              </p>
              <p className="text-lg leading-relaxed italic" style={{ color: PAPER_INK, opacity: 0.85 }}>
                Medicine is excellent at the part it is asked, paid, and legally comfortable to see: pain score, reflex, range, imaging, discharge note. Sex is usually not on that note. It is in the life around the note, which is where humans inconveniently continue after appointments end.
              </p>
            </div>
            <div>
              <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase mb-3" style={{ color: "var(--brand-oxblood)" }}>
                Side two. The aisle.
              </p>
              <p className="text-lg leading-relaxed italic" style={{ color: PAPER_INK, opacity: 0.85 }}>
                The wellness aisle saw the silence and did what unregulated commerce does best: became expensive, scented, and certain. It sold the missing conversation back as magnesium, maca, mattress content, breathwork retreats, and a candle that smells like a divorce attorney with a Pilates reformer.
              </p>
            </div>
          </div>

          <div className="mt-14 max-w-4xl border-l-2 pl-7 py-5" style={{ borderColor: "var(--brand-oxblood)", background: PAPER }}>
            <p className="font-mono-label text-[10px] tracking-[0.28em] uppercase mb-3" style={{ color: "var(--brand-oxblood)" }}>
              PRODUCT ANSWER
            </p>
            <p className="font-serif-display text-xl md:text-2xl italic leading-snug" style={{ color: PAPER_INK }}>
              BackStroke puts the two charts together. Spine load. Pelvic-floor tone. Breath. Bedroom geometry. Recovery. One daily protocol, small enough to do and sharp enough to matter.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── WHAT YOU PAY FOR ───────── */}
      <section id="what-you-pay-for" className="px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-[1100px] mx-auto">
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--brand-oxblood)" }}>
            ◆ What you actually get
          </p>
          <h2
            className="font-serif-display mt-5 leading-[1.0] tracking-[-0.02em] max-w-3xl"
            style={{ fontSize: "clamp(38px, 5vw, 68px)", color: PAPER_INK }}
          >
            Five modules. One private control panel.
          </h2>
          <p className="mt-8 max-w-2xl leading-relaxed text-lg italic" style={{ color: PAPER_INK, opacity: 0.78 }}>
            Open the app to act, not browse. Each module answers a specific question your spine, your floor, your bedroom, or your skepticism has been asking. The default state is action. Education is there when you ask for it.
          </p>

          {/* Five modules — typographically dominant, the largest type on the page after the hero */}
          <ol className="mt-16 divide-y" style={{ borderColor: "oklch(0.86 0.025 70)" }}>
            {[
              {
                num: "I",
                head: "Today",
                body: "One number. One session. One small argument with gravity, already scheduled.",
                value: "You know what to do within five seconds.",
              },
              {
                num: "II",
                head: "Session",
                body: "Eight minutes of spine endurance, floor down-training, breath, and recovery. Boring where boring wins.",
                value: "Repeatable habit, no lifestyle bloat.",
              },
              {
                num: "III",
                head: "Engine",
                body: "Six taps in. Tonight's plan out. Warm-up, main course, dessert, with escalate / hold / de-escalate at every act.",
                value: "Bedroom geometry, ranked by your back.",
              },
              {
                num: "IV",
                head: "Scripts",
                body: "Adult sentences for the part of sex nobody was taught to say out loud. Pleasure-led and pain-aware.",
                value: "Less avoidance. Fewer crossed wires.",
              },
              {
                num: "V",
                head: "Science",
                body: "Public literature, asterisks visible, citations where the wellness aisle put a candle.",
                value: "Trust without borrowed white coats.",
              },
            ].map((p, i) => (
              <li
                key={p.num}
                className="grid grid-cols-12 gap-6 md:gap-10 py-10 md:py-14 items-start"
                style={{ borderColor: "oklch(0.86 0.025 70)", borderTopWidth: i === 0 ? 1 : 0 }}
              >
                {/* Roman numeral — large italic serif, the largest type after the hero */}
                <div className="col-span-2 md:col-span-1">
                  <span
                    className="font-serif-display italic block leading-none"
                    style={{
                      fontSize: "clamp(40px, 6vw, 84px)",
                      color: "var(--brand-oxblood)",
                    }}
                  >
                    {p.num}
                  </span>
                </div>

                {/* Module name — also editorial, second weight in the hierarchy */}
                <div className="col-span-10 md:col-span-3">
                  <h3
                    className="font-serif-display leading-[0.95] tracking-tight"
                    style={{ fontSize: "clamp(32px, 4vw, 52px)", color: PAPER_INK }}
                  >
                    {p.head}
                  </h3>
                </div>

                {/* Body */}
                <div className="col-span-12 md:col-span-5 md:pt-4">
                  <p
                    className="leading-relaxed"
                    style={{ fontSize: "clamp(15px, 1.3vw, 18px)", color: PAPER_INK, opacity: 0.85 }}
                  >
                    {p.body}
                  </p>
                </div>

                {/* Value line — small mono, oxblood, far right */}
                <div className="col-span-12 md:col-span-3 md:pt-5">
                  <p
                    className="font-mono-label text-[10px] tracking-[0.22em] uppercase leading-relaxed"
                    style={{ color: "var(--brand-oxblood)" }}
                  >
                    {p.value}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-10 font-script text-2xl md:text-3xl italic max-w-2xl" style={{ color: "var(--brand-oxblood)" }}>
            Strong back. Steady breath. <span style={{ color: AMBER }}>Hot life.</span> <span style={{ color: PAPER_MUTED, fontSize: "0.7em" }}>No candle revenue.</span>
          </p>
        </div>
      </section>

      {/* ───────── POSITION ENGINE — the money feature ───────── */}
      <section id="engine" className="px-6 md:px-10 py-28 md:py-36 relative" style={{ background: PAPER }}>
        <div className="max-w-[1180px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* LEFT: pitch */}
            <div className="lg:col-span-7">
              <p className="font-mono-label text-[10px] tracking-[0.28em] uppercase" style={{ color: "var(--brand-oxblood)" }}>
                ◆ THE POSITION INTELLIGENCE ENGINE
              </p>
              <h2
                className="font-serif-display mt-6 leading-[0.98] tracking-[-0.025em]"
                style={{ fontSize: "clamp(40px, 5.6vw, 72px)", color: PAPER_INK }}
              >
                Six taps in.{" "}
                <span className="italic" style={{ color: "var(--brand-oxblood)" }}>
                  Tonight's plan
                </span>
                <br />
                out.
              </h2>
              <p className="mt-8 leading-relaxed" style={{ fontSize: "clamp(18px, 1.6vw, 22px)", color: PAPER_INK, opacity: 0.88 }}>
                The engine asks where the pain lives, how the floor feels, what you have time for, and what kind of evening this is supposed to be. It returns a three-act plan: a warm-up, a main course, and a dessert option, ranked by lumbar load, hip demand, and breath access. You decide escalate, hold, or de-escalate at every act. The plan reroutes around what your back said, not what the magazine intern guessed.
              </p>

              {/* HOW IT WORKS — three steps */}
              <div className="mt-12">
                <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: PAPER_MUTED }}>
                  How it works
                </p>
                <ol className="mt-5 space-y-5">
                  {[
                    ["1", "You answer six questions.", "Where the pain is. What makes it worse. How the floor feels. Today's Index. What the evening is for. How much time you have. No diary. No diagnosis. No moral scoring."],
                    ["2", "The engine matches your inputs against 18+ scored positions.", "Each carries a hidden scorecard (flexion / extension / rotation / thrust / hip / floor) and visible badges. Your pain vector triggers mechanical exclusions, the Index sets a load cap, the goal shapes the dessert. Magic on the surface, transparent if tapped."],
                    ["3", "You see a warm-up, a main course, a dessert.", "Each act has a yoga-silhouette figure, a one-line geometry instruction, a partner-line drawer, and three buttons: escalate, hold, de-escalate. The next act re-routes from your choice. No forced crescendo. Recovery is a successful close."],
                  ].map(([n, h, b]) => (
                    <li key={n} className="flex gap-5">
                      <span
                        className="font-serif-display italic shrink-0 pt-0.5"
                        style={{ fontSize: "32px", color: "var(--brand-oxblood)", lineHeight: 1 }}
                      >
                        {n}
                      </span>
                      <div>
                        <p className="font-serif-display text-lg md:text-xl leading-tight" style={{ color: PAPER_INK }}>
                          {h}
                        </p>
                        <p className="mt-2 text-base leading-relaxed" style={{ color: PAPER_INK, opacity: 0.78 }}>
                          {b}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-5">
                <a
                  href="/engine.html"
                  className="inline-flex items-center justify-center gap-2 px-9 py-5 rounded-full text-base font-semibold transition hover:opacity-90"
                  style={{
                    background: "var(--brand-oxblood)",
                    color: PAPER,
                    boxShadow: "0 16px 40px -14px oklch(0.32 0.11 22 / 0.5)",
                  }}
                >
                  Build tonight's plan <ArrowUpRight className="w-5 h-5" />
                </a>
                <span className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: PAPER_MUTED }}>
                  Six taps · No sign-up required
                </span>
              </div>
            </div>

            {/* RIGHT: example output mock */}
            <div className="lg:col-span-5">
              <div
                className="border rounded-sm overflow-hidden"
                style={{
                  background: "oklch(0.96 0.012 80)",
                  borderColor: "oklch(0.86 0.025 70)",
                  boxShadow: "0 30px 80px -30px oklch(0.18 0.01 40 / 0.28)",
                }}
              >
                <div className="px-6 pt-5 pb-4 border-b" style={{ borderColor: "oklch(0.86 0.025 70)" }}>
                  <p className="font-mono-label text-[9px] tracking-[0.28em] uppercase" style={{ color: "var(--brand-oxblood)" }}>
                    EXAMPLE · TONIGHT'S PLAN
                  </p>
                  <p className="font-mono-label text-[9px] tracking-[0.18em] uppercase mt-2" style={{ color: PAPER_MUTED }}>
                    Inputs · right sciatica · gripping floor · amber · penetrative · 20 min
                  </p>
                </div>

                {[
                  {
                    label: "WARM-UP · 2 MIN",
                    name: "Side-lying breath, knees stacked",
                    geom: "Pillow between knees. One hand on lower ribs, one on lower abdomen. Inhale, let the floor drop. Exhale, return to rest. No squeezing.",
                    badges: ["low load", "low thrust", "release-first"],
                  },
                  {
                    label: "MAIN COURSE",
                    name: "Supported side-lie, low amplitude",
                    geom: "Affected side up, pillow between knees, pelvis stacked. Partner behind. Movement slow, range small. Spine stays neutral; affected leg stays unloaded.",
                    badges: ["low lumbar", "high control"],
                  },
                  {
                    label: "DESSERT · YOUR CHOICE",
                    name: "Spoon close with manual stimulation",
                    geom: "Climax-conservative. A closing geometry that does not introduce new load. Hold position from main course; partner adds external touch.",
                    badges: ["climax-friendly", "low load"],
                  },
                ].map((act, i) => (
                  <div
                    key={act.label}
                    className="px-6 py-5"
                    style={{ borderBottom: i < 2 ? "1px solid oklch(0.86 0.025 70)" : undefined }}
                  >
                    <p className="font-mono-label text-[9px] tracking-[0.28em] uppercase" style={{ color: "var(--brand-oxblood)" }}>
                      {act.label}
                    </p>
                    <p className="font-serif-display text-lg italic mt-2 leading-tight" style={{ color: PAPER_INK }}>
                      {act.name}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: PAPER_INK, opacity: 0.78 }}>
                      {act.geom}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {act.badges.map((b) => (
                        <span
                          key={b}
                          className="font-mono-label text-[9px] tracking-[0.06em] px-2 py-1 rounded-sm"
                          style={{
                            background: "oklch(0.92 0.022 76)",
                            color: PAPER_MUTED,
                            border: "1px solid oklch(0.86 0.025 70)",
                          }}
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                    {i === 1 && (
                      <p className="mt-4 pt-3 text-sm italic leading-snug border-t" style={{ color: "var(--brand-oxblood)", borderColor: "oklch(0.86 0.025 70)" }}>
                        Partner line: "Small. Slow. If my back starts speaking we stop and re-route."
                      </p>
                    )}
                  </div>
                ))}

                <div className="px-6 py-4 flex items-center gap-2 flex-wrap" style={{ background: "oklch(0.92 0.022 76)" }}>
                  <span className="font-mono-label text-[9px] tracking-[0.18em] uppercase" style={{ color: PAPER_MUTED }}>
                    Decision after each act:
                  </span>
                  {["↓ De-escalate", "→ Hold", "↑ Escalate"].map((d) => (
                    <span
                      key={d}
                      className="font-mono-label text-[9px] tracking-[0.18em] uppercase px-2.5 py-1 rounded-sm border"
                      style={{ borderColor: "var(--brand-oxblood)", color: "var(--brand-oxblood)" }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-xs italic leading-relaxed text-center" style={{ color: PAPER_MUTED }}>
                Real output, real positions. Tap the CTA to build yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── THE WORK ───────── */}
      <section id="work" className="px-6 md:px-10 pb-24 md:pb-28">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-6">
          {[
            {
              variant: "back" as const,
              head: "A quieter lumbar in two weeks.",
              body: "Endurance, not range. The protocol that beat lumbar surgery in head-to-head trials, finally taught at the dose the trials actually used.",
            },
            {
              variant: "bedroom" as const,
              head: "Reverse kegel before kegel.",
              body: "Erections, lubrication, continence are the floor, not the ceiling. A pelvic floor stuck in the on position is the reason none of it works. It is also the reason the eucalyptus bath salts on a quarterly subscription have not worked. Bath salts have never untensed a single anything.",
            },
          ].map((c) => (
            <article
              key={c.head}
              className="relative overflow-hidden flex flex-col"
              style={{
                boxShadow: "0 30px 60px -24px oklch(0.18 0.01 40 / 0.22)",
                border: "1px solid oklch(0.86 0.025 70)",
                background: PAPER,
              }}
            >
              <WorkSchematic variant={c.variant} />
              <div className="px-7 py-7 border-t" style={{ borderColor: "oklch(0.86 0.025 70)" }}>
                <h3 className="font-serif-display text-2xl md:text-3xl italic leading-[1.05]" style={{ color: PAPER_INK }}>
                  {c.head}
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: PAPER_INK, opacity: 0.78 }}>{c.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ───────── PUBLIC RECORD ───────── */}
      <section className="px-6 md:px-10 py-24 md:py-28" style={{ background: PAPER_2 }}>
        <div className="max-w-[1100px] mx-auto">
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--brand-oxblood)" }}>
            ◆ Trust, the slow way
          </p>
          <h2
            className="font-serif-display mt-5 leading-[1.02] tracking-[-0.02em] max-w-3xl"
            style={{ fontSize: "clamp(34px, 4.4vw, 56px)", color: PAPER_INK }}
          >
            Built from the public record. Caveats on the page, not under it.
          </h2>
          <p className="mt-7 max-w-2xl leading-relaxed text-lg italic" style={{ color: PAPER_INK, opacity: 0.78 }}>
            The biomechanics aren't ours. They're Nachemson 1966, Wilke 1999, McGill across three decades, Kegel 1948, the pelvic-health literature since, and a handful of cohort papers nobody outside two specialties reads. We do not borrow a clinician's white coat. We do not invent a council. We organize what is already there, in a register adults can read, with the asterisks visible.
          </p>
          <div className="mt-10 grid sm:grid-cols-3 gap-px" style={{ background: "oklch(0.86 0.025 70)", border: "1px solid oklch(0.86 0.025 70)" }}>
            {[
              ["Public literature", "Lumbar load, endurance, pelvic-floor down-training, breath and floor coupling. Each claim: source, what it supports, what it does not prove."],
              ["Cohort data, when we have it", "If and when there are numbers to report, they will be self-reported, uncontrolled, and not peer-reviewed. The caveat will be on the page, not under it."],
              ["The boundary", "The website is useful until it is the wrong tool. Knowing that is part of the product, not an apology for it."],
            ].map(([h, b]) => (
              <div key={h} className="p-7" style={{ background: PAPER }}>
                <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase mb-3" style={{ color: "var(--brand-oxblood)" }}>{h}</p>
                <p className="text-sm leading-relaxed italic" style={{ color: PAPER_INK, opacity: 0.85 }}>{b}</p>
              </div>
            ))}
          </div>
          <Link
            to="/science"
            className="mt-10 inline-flex items-center gap-2 font-mono-label text-[10px] tracking-[0.22em] uppercase border-b pb-1 transition hover:opacity-80"
            style={{ color: PAPER_INK, borderColor: PAPER_INK }}
          >
            Read the public record →
          </Link>
        </div>
      </section>

      {/* ───────── FINAL CTA ───────── */}
      <section className="px-6 md:px-10 py-28 md:py-36" style={{ background: PAPER_2 }}>
        <div className="max-w-[900px] mx-auto text-center">
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--brand-oxblood)" }}>
            ◆ Eight minutes is shorter than this homepage
          </p>
          <h2
            className="font-serif-display mt-6 leading-[0.96] tracking-[-0.025em]"
            style={{ fontSize: "clamp(44px, 6vw, 88px)", color: PAPER_INK }}
          >
            Do not let your back<br />
            be the reason{" "}
            <span className="italic" style={{ color: "var(--brand-oxblood)" }}>
              you stayed in.
            </span>
          </h2>
          <p className="mt-8 max-w-xl mx-auto text-lg leading-relaxed italic" style={{ color: PAPER_INK, opacity: 0.82 }}>
            Two weeks free. $39 a month after, or $399 a year. Cancel any time. Less than one drawer-abandoned supplement. More useful than pretending the third person in bed is part of the arrangement.
          </p>

          {/* Founding-member scarcity block */}
          <div
            className="mt-10 mx-auto max-w-xl border px-6 py-5"
            style={{
              borderColor: "var(--brand-oxblood)",
              background: "var(--card)",
            }}
          >
            <p
              className="font-mono-label text-[10px] tracking-[0.28em] uppercase"
              style={{ color: "var(--brand-oxblood)" }}
            >
              ◆ FOUNDING MEMBERS · 200 SPOTS · 174 LEFT
            </p>
            <p
              className="mt-3 font-serif-display italic leading-snug"
              style={{ fontSize: "clamp(20px, 2vw, 26px)", color: PAPER_INK }}
            >
              $199 once. Forever. Full Position Intelligence Engine, partner pairing, every future module shipped at no extra charge.
            </p>
            <p className="mt-3 text-sm leading-relaxed italic" style={{ color: PAPER_MUTED }}>
              The price exists because the brand survives by being uncheapened, and because the people who buy a serious product on day one deserve to be paid back when it works. After the two hundred, the price returns to $39 a month and stays there.
            </p>
          </div>

          <div className="mt-10 flex items-center justify-center gap-5 flex-wrap">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-9 py-5 rounded-full text-base font-semibold transition hover:opacity-90"
              style={{
                background: "var(--brand-oxblood)",
                color: PAPER,
                boxShadow: "0 14px 36px -12px oklch(0.18 0.01 40 / 0.45)",
              }}
            >
              Run the 7-minute baseline <ArrowUpRight className="w-5 h-5" />
            </Link>
            <Link
              to="/science"
              className="font-mono-label text-[10px] tracking-[0.22em] uppercase hover:opacity-80 transition"
              style={{ color: PAPER_MUTED }}
            >
              Or read the science first →
            </Link>
          </div>
          <p
            className="mt-16 text-xs max-w-xl mx-auto leading-relaxed italic font-serif-display"
            style={{ color: PAPER_MUTED }}
          >
            BackStroke is education and coaching, not diagnosis, treatment, sex therapy, or a substitute for individualized care. New, severe, neurological, pelvic, surgical, coercive, infectious, or frightening symptoms belong with the relevant professional. The website is useful until it is the wrong tool. Knowing that is part of the product.
          </p>
        </div>
      </section>

      {/* ───────── Footer ───────── */}
      <footer className="px-6 md:px-10 py-10" style={{ background: PAPER, borderTop: "1px solid oklch(0.86 0.025 70)" }}>
        <div className="max-w-[1180px] mx-auto flex items-center justify-between flex-wrap gap-6 font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: PAPER_MUTED }}>
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 22 22" style={{ color: "var(--brand-oxblood)" }}>
              <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
              <circle cx="11" cy="11" r="3" fill="currentColor" />
            </svg>
            <span className="font-serif-display text-base italic normal-case tracking-normal" style={{ color: PAPER_INK }}>
              Back<span style={{ color: "var(--brand-oxblood)" }}>Stroke</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-2 justify-center">
            <Link to="/dashboard" className="hover:opacity-80 transition">Today</Link>
            <Link to="/session" className="hover:opacity-80 transition">Session</Link>
            <a href="/engine.html" className="hover:opacity-80 transition">Engine</a>
            <Link to="/conversation" className="hover:opacity-80 transition">Scripts</Link>
            <Link to="/partner" className="hover:opacity-80 transition">Partner</Link>
            <Link to="/science" className="hover:opacity-80 transition">Science</Link>
          </div>
          <span>℠ MMXXVI · no candle revenue</span>
        </div>
        <div className="max-w-[1180px] mx-auto mt-8 pt-6 border-t" style={{ borderColor: "oklch(0.86 0.025 70)" }}>
          <p className="font-serif-display italic text-sm text-center leading-relaxed" style={{ color: PAPER_MUTED }}>
            We will not gamify your orgasms. We will not push notify your bedroom. We will not put your floor on a leaderboard.
          </p>
        </div>
      </footer>
    </div>
  );
}
