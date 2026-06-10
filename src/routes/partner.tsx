import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import intimateImg from "@/assets/intimate.jpg";

export const Route = createFileRoute("/partner")({
  component: Partner,
  head: () => ({
    meta: [
      { title: "Partner · BackStroke" },
      {
        name: "description",
        content:
          "You were not signed up. You were invited. The partner side of BackStroke: tonight's line, the plan from your perspective, and the sentences that keep avoidance from doing what avoidance usually does.",
      },
    ],
  }),
});

const PAPER = "oklch(0.94 0.018 78)";
const PAPER_2 = "oklch(0.92 0.022 76)";
const PAPER_INK = "oklch(0.18 0.01 40)";
const PAPER_MUTED = "oklch(0.45 0.02 40)";
const RULE = "oklch(0.86 0.025 70)";
const OXBLOOD = "var(--brand-oxblood)";

function Partner() {
  return (
    <div className="min-h-screen antialiased" style={{ background: PAPER, color: PAPER_INK }}>
      <SiteHeader active="partner" />

      {/* HERO */}
      <section className="px-6 md:px-10 pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="max-w-[820px] mx-auto">
          <p
            className="font-mono-label text-[10px] tracking-[0.28em] uppercase"
            style={{ color: OXBLOOD }}
          >
            ◆ THE PARTNER SURFACE
          </p>
          <h1
            className="font-serif-display mt-5 leading-[0.96] tracking-[-0.025em]"
            style={{ fontSize: "clamp(44px, 6vw, 80px)", color: PAPER_INK }}
          >
            You were not signed up.{" "}
            <span className="italic" style={{ color: OXBLOOD }}>
              You were invited.
            </span>
          </h1>
          <p
            className="font-serif-display italic mt-6 leading-snug"
            style={{ fontSize: "clamp(18px, 1.7vw, 24px)", color: PAPER_MUTED }}
          >
            BackStroke is what your partner uses to make sex possible on the days their back is having an opinion. Your role here is not to manage anything. It is to be in the room more reliably. We have built a few things to make that easier. The rest is yours.
          </p>
        </div>
      </section>

      {/* EDITORIAL BAND — partnership, in one image */}
      <figure
        className="w-full"
        style={{ borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}` }}
      >
        <img
          src={intimateImg}
          alt="A couple resting close in low light, one hand resting over the other."
          className="w-full object-cover"
          style={{ height: "clamp(300px, 44vh, 560px)", objectPosition: "center 38%", display: "block" }}
        />
        <figcaption
          className="max-w-[820px] mx-auto px-6 md:px-10 py-4 font-mono-label text-[10px] tracking-[0.22em] uppercase"
          style={{ color: PAPER_MUTED }}
        >
          Being in the room, more reliably · the partner's whole job
        </figcaption>
      </figure>

      {/* WHAT THIS IS */}
      <section
        className="px-6 md:px-10 py-16 md:py-24"
        style={{ background: PAPER_2, borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}` }}
      >
        <div className="max-w-[820px] mx-auto">
          <p
            className="font-mono-label text-[10px] tracking-[0.22em] uppercase"
            style={{ color: OXBLOOD }}
          >
            §1 · What this is
          </p>
          <h2
            className="font-serif-display leading-[1.05] tracking-[-0.02em] mt-4"
            style={{ fontSize: "clamp(28px, 3.4vw, 42px)", color: PAPER_INK }}
          >
            For the partner who has been guessing. We have been thinking about this.
          </h2>
          <p className="mt-6 text-lg leading-relaxed" style={{ color: PAPER_INK, opacity: 0.85 }}>
            The partner side is a different home. Not a softened version of the user's home. A different home. The hero card here is the night's partner line, not the geometry. The geometry is for the user. The sentence is for you. That ordering is deliberate. What partners need at the moment of use is the sentence.
          </p>
        </div>
      </section>

      {/* THE FOUR FEATURES */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-[820px] mx-auto">
          <p
            className="font-mono-label text-[10px] tracking-[0.22em] uppercase"
            style={{ color: OXBLOOD }}
          >
            §2 · The four things · the build order, in writing
          </p>
          <h2
            className="font-serif-display leading-[1.05] tracking-[-0.02em] mt-4"
            style={{ fontSize: "clamp(28px, 3.4vw, 42px)", color: PAPER_INK }}
          >
            The partner home, the plan view, the partner-line library, and the partner-first filter. Described in present tense because the design is settled; labeled a roadmap because honesty is the brand.
          </h2>

          <div className="mt-12 space-y-10">
            {[
              {
                head: "Tonight's line, on the home card",
                body: "The first thing you see is the sentence for tonight. Save, screenshot, or open the full plan. If your partner has not built one yet, the home card shows the most recent line as evergreen reference. We built it to be the surface you open most.",
              },
              {
                head: "The plan, from your side",
                body: "Same three-card plan your partner sees, re-rendered for you. Where they read 'small movement, controlled by partner', you read 'you control the amplitude, and your job is to stay smaller than feels normal'. Same geometry. Different addressee.",
              },
              {
                head: "The partner-line library",
                body: "The full library of partner lines, sortable by pain vector and goal, available outside any specific session. The surface partners come back to even on nights with nothing planned.",
              },
              {
                head: "The partner-first filter, four taps",
                body: "When you are initiating tonight and want to know what is possible before bringing it up. Four taps, not six. The two it removes are the ones that require their interoception: hip mobility and precise pain vector. Those stay theirs to report. You see aggregates only.",
              },
            ].map((f) => (
              <div key={f.head} className="border-l-2 pl-6" style={{ borderColor: OXBLOOD }}>
                <h3
                  className="font-serif-display text-2xl md:text-3xl leading-tight"
                  style={{ color: PAPER_INK }}
                >
                  {f.head}
                </h3>
                <p className="mt-3 text-base leading-relaxed" style={{ color: PAPER_INK, opacity: 0.85 }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TWO RULES */}
      <section
        className="px-6 md:px-10 py-16 md:py-24"
        style={{ background: PAPER_2, borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}` }}
      >
        <div className="max-w-[820px] mx-auto">
          <p
            className="font-mono-label text-[10px] tracking-[0.22em] uppercase"
            style={{ color: OXBLOOD }}
          >
            §3 · Two rules, in writing, on the wall
          </p>
          <h2
            className="font-serif-display leading-[1.05] tracking-[-0.02em] mt-4"
            style={{ fontSize: "clamp(28px, 3.4vw, 42px)", color: PAPER_INK }}
          >
            No push notifications about sex, ever. Never a surveillance vector.
          </h2>
          <p className="mt-6 text-lg leading-relaxed" style={{ color: PAPER_INK, opacity: 0.85 }}>
            Push notifications about intimate content on a phone that may not be your sole device, on a phone that may be on a kitchen counter or in a meeting or in a car with a child in the back seat, is a customer-service incident waiting to happen. We have written this category as containing exactly zero acceptable notifications. In-app surfacing only. No badge counts on the app icon either.
          </p>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: PAPER_INK, opacity: 0.85 }}>
            Your partner can revoke your access at any time without notifying you. This is a safety feature, not a politeness feature. It exists because relationships change, and the product must not become a surveillance vector. Mental-health context and any body-scan assessment are private by default and stay private until they change that.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-[680px] mx-auto text-center">
          <p
            className="font-mono-label text-[10px] tracking-[0.22em] uppercase"
            style={{ color: OXBLOOD }}
          >
            ◆ The toggle that matters
          </p>
          <h2
            className="font-serif-display mt-5 leading-[1.0] tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px, 4vw, 56px)", color: PAPER_INK }}
          >
            Looped-in or co-author. Your choice. Reversible per session.
          </h2>
          <p className="mt-7 text-base leading-relaxed italic" style={{ color: PAPER_MUTED }}>
            Looped-in is the lower-friction default. You see the plan after they build it, you read partner lines, you confirm receipt. Co-author lets you build alongside, see their Index, and propose adjustments. They keep final say on every step. The toggle is per session, not a permanent setting. Nothing here is locked.
          </p>
          <div className="mt-10 flex items-center justify-center gap-5 flex-wrap">
            <a
              href="/engine.html"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold transition hover:opacity-90"
              style={{ background: OXBLOOD, color: PAPER }}
            >
              Open the engine →
            </a>
            <Link
              to="/conversation"
              className="font-mono-label text-[10px] tracking-[0.22em] uppercase hover:opacity-80 transition"
              style={{ color: PAPER_MUTED }}
            >
              Browse the conversation scripts →
            </Link>
          </div>
          <p className="mt-12 text-xs italic max-w-md mx-auto leading-relaxed" style={{ color: PAPER_MUTED }}>
            Education and coaching, not diagnosis or therapy. We do not gamify your orgasms. We do not push notify your bedroom. We do not put your back on a leaderboard.
          </p>
        </div>
      </section>
    </div>
  );
}
