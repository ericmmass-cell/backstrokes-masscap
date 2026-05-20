import { createFileRoute, Link } from "@tanstack/react-router";

/**
 * /manifesto — the screenshot page.
 *
 * No nav. No buttons. No card chrome. Full-bleed cream paper. Full-bleed type.
 * Designed to be photographed, posted, sent to a friend, opened on a phone
 * in bed at 11pm. One scroll. Eleven beats. A single oxblood line at the end.
 *
 * Voice: dry, observational, magazine-grade. Punches up at the medical and
 * wellness establishments only. Never at the user, never at the body, never
 * at the partner. Read it aloud and it should sound like a person who has
 * thought about this for a long time and is finally tired of being polite.
 */

export const Route = createFileRoute("/manifesto")({
  component: Manifesto,
  head: () => ({
    meta: [
      { title: "The BackStroke manifesto" },
      {
        name: "description",
        content:
          "Your back should not be the third person in bed. A manifesto for the people who were told to stretch, to breathe, to wait it out.",
      },
      { property: "og:title", content: "The BackStroke manifesto" },
      {
        property: "og:description",
        content:
          "Your back should not be the third person in bed. A manifesto for the people who were told to stretch, to breathe, to wait it out.",
      },
    ],
  }),
});

const PAPER = "oklch(0.94 0.018 78)";
const PAPER_INK = "oklch(0.18 0.01 40)";
const PAPER_MUTED = "oklch(0.45 0.02 40)";
const RULE = "oklch(0.86 0.025 70)";
const OXBLOOD = "var(--brand-oxblood)";

function Manifesto() {
  return (
    <main style={{ background: PAPER, color: PAPER_INK }} className="min-h-screen">
      {/* One tiny brand mark in the corner. Backdrop-blurred so it does not
          bleed into body type on mobile scroll. */}
      <div
        className="fixed top-3 left-3 z-10 font-mono-label text-[10px] tracking-[0.22em] uppercase backdrop-blur-md rounded-full px-3 py-1.5"
        style={{
          color: PAPER_MUTED,
          background: "oklch(0.94 0.018 78 / 0.82)",
          border: `1px solid ${RULE}`,
        }}
      >
        <Link to="/" className="hover:opacity-70 transition">
          Back<span style={{ color: OXBLOOD }}>Stroke</span> · manifesto
        </Link>
      </div>

      <article className="max-w-[820px] mx-auto px-6 md:px-10 pt-32 md:pt-44 pb-32">
        {/* I. The headline. The whole product condensed into one sentence. */}
        <h1
          className="font-serif-display italic tracking-[-0.025em] leading-[0.95]"
          style={{
            fontSize: "clamp(48px, 9vw, 128px)",
            color: PAPER_INK,
          }}
        >
          Your back
          <br />
          should not be
          <br />
          the third person
          <br />
          <span style={{ color: OXBLOOD }}>in bed.</span>
        </h1>

        <Spacer h={120} />

        {/* II. The setup. The thing nobody says out loud. */}
        <Beat n="i.">
          <p>
            For most adults with a serious back, sex stops being something they
            do and starts being something they audit.
          </p>
          <p>
            Which positions. Which angles. Which day of the cycle. Whether the
            mattress will forgive them in the morning. Whether the partner will
            ask if they are okay halfway through. Whether they will lie about
            the answer.
          </p>
        </Beat>

        <Beat n="ii.">
          <p>
            Nobody tells you this part. The orthopedic surgeon does not tell
            you. The physical therapist does not tell you. The pelvic floor
            specialist sometimes tells you, sideways, after the third
            appointment.
          </p>
          <p>
            The internet tells you to try the spoon position. The internet has
            been telling you to try the spoon position since 2009.
          </p>
        </Beat>

        <Beat n="iii.">
          <p>
            Meanwhile your back is fine for things you do not want to do. It is
            fine for the meeting. It is fine for the school pickup. It is fine
            for the four hours of laptop posture you owe somebody on Tuesday.
          </p>
          <p>
            It is loud only for the one thing you wanted to keep.
          </p>
        </Beat>

        <Spacer h={80} />

        {/* III. The pivot. What we believe. */}
        <Pull>
          The bedroom is not the symptom. It is the test.
        </Pull>

        <Spacer h={80} />

        <Beat n="iv.">
          <p>
            A back that cannot get through a Saturday morning will tell you so
            within a week.
          </p>
          <p>
            A back that cannot get through a Saturday night will tell you so
            within a marriage.
          </p>
        </Beat>

        <Beat n="v.">
          <p>
            We do not think this is a small problem. We do not think it is a
            taboo problem either. We think it is the problem most people with
            chronic pain are actually trying to solve, and have been quietly
            embarrassed about asking.
          </p>
        </Beat>

        <Beat n="vi.">
          <p>
            So we made a tool that takes the question seriously. Without the
            yoga lighting. Without the influencer in the half lotus. Without
            the supplement funnel at the end.
          </p>
        </Beat>

        <Spacer h={80} />

        <Pull>
          No app has earned the right to talk to you about your body the way
          the apps already do.
        </Pull>

        <Spacer h={80} />

        <Beat n="vii.">
          <p>
            We do not gamify recovery. We do not run a streak. We do not send a
            push notification at 8:14pm that says "you got this." We do not
            think you need to be told that.
          </p>
          <p>
            We send you a number. We send you a plan. We send you a position.
            We get out of the way.
          </p>
        </Beat>

        <Beat n="viii.">
          <p>
            We do not sell supplements. We do not sell devices. We do not sell
            a membership tier with the good content behind it. There is one
            price. It pays for the engineering, the writers, the clinicians who
            checked our work, and the hosting. It does not pay for an ad.
          </p>
        </Beat>

        <Beat n="ix.">
          <p>
            We do not collect data we do not need. We do not run an
            advertising business pretending to be a health business. We do not
            sell your check ins to anyone, ever, for any amount of money,
            including the amount that would otherwise save the company.
          </p>
          <p>
            If the company has to go away because we will not sell the data,
            the company has to go away.
          </p>
        </Beat>

        <Spacer h={80} />

        <Pull>
          What is in your bed is yours.
        </Pull>

        <Spacer h={80} />

        <Beat n="x.">
          <p>
            We are not here to make you feel seen. We are here to make you
            feel functional.
          </p>
          <p>
            The first one is a marketing budget. The second one is a product.
          </p>
        </Beat>

        <Beat n="xi.">
          <p>
            If we do this right, in five years there will be an entire
            category of software that takes the rest of adult life as
            seriously as it takes step counts. Pelvic floors. Sleep posture.
            The conversation a long-married couple has at 10:47pm about
            whether tonight is the night.
          </p>
          <p>
            BackStroke is the opening move. There will be others. We hope
            there are others. We hope they are better than us. We will not
            wait for them.
          </p>
        </Beat>

        <Spacer h={140} />

        {/* The signature line. One sentence, oxblood, italic. */}
        <div
          className="border-t pt-12 mt-12"
          style={{ borderColor: RULE }}
        >
          <p
            className="font-serif-display italic leading-[1.15] tracking-[-0.015em]"
            style={{
              fontSize: "clamp(28px, 4.4vw, 56px)",
              color: OXBLOOD,
            }}
          >
            Your back came home from work loud. We are going to make tonight
            quieter than that.
          </p>
          <p
            className="mt-8 font-mono-label text-[10px] tracking-[0.22em] uppercase"
            style={{ color: PAPER_MUTED }}
          >
            — BackStroke. Cambridge, Massachusetts. {new Date().getFullYear()}.
          </p>
        </div>

        <Spacer h={80} />

        {/* one quiet exit */}
        <div className="flex items-center gap-6 font-mono-label text-[11px] tracking-[0.18em] uppercase">
          <Link
            to="/"
            className="hover:opacity-70 transition"
            style={{ color: PAPER_MUTED }}
          >
            ← Home
          </Link>
          <span style={{ color: RULE }}>·</span>
          <Link
            to="/about"
            className="hover:opacity-70 transition"
            style={{ color: PAPER_MUTED }}
          >
            Who wrote this
          </Link>
          <span style={{ color: RULE }}>·</span>
          <Link
            to="/dashboard"
            className="hover:opacity-70 transition"
            style={{ color: OXBLOOD, fontWeight: 700 }}
          >
            Begin →
          </Link>
        </div>
      </article>
    </main>
  );
}

/* ---------- small building blocks ---------- */

function Spacer({ h }: { h: number }) {
  return <div style={{ height: h }} />;
}

function Beat({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <section className="mt-20 md:mt-24 first:mt-0">
      <p
        className="font-mono-label text-[11px] tracking-[0.28em] uppercase mb-5"
        style={{ color: OXBLOOD }}
      >
        {n}
      </p>
      <div
        className="font-serif-display leading-[1.4] space-y-5"
        style={{
          fontSize: "clamp(20px, 1.9vw, 26px)",
          color: PAPER_INK,
        }}
      >
        {children}
      </div>
    </section>
  );
}

function Pull({ children }: { children: React.ReactNode }) {
  return (
    <blockquote
      className="font-serif-display italic leading-[1.1] tracking-[-0.02em] border-l-2 pl-6 md:pl-8"
      style={{
        fontSize: "clamp(30px, 4.4vw, 52px)",
        color: PAPER_INK,
        borderColor: OXBLOOD,
      }}
    >
      {children}
    </blockquote>
  );
}
