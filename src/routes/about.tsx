import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

/**
 * /about — the founder page.
 *
 * Built for press, investors, and the user who Googles "who made BackStroke"
 * at 11pm and wants to know it is a real person with a name and a face and a
 * reason. Magazine-grade. One long column. No team grid. No press logos. No
 * "as featured in" until we are actually featured in.
 *
 * Photo: typographic placeholder until Eric supplies a real headshot. Drop a
 * file at /public/founder.jpg and update the <Portrait> img src.
 */

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "Who made this · BackStroke" },
      {
        name: "description",
        content:
          "Eric Mass built BackStroke after a decade of treating a herniated L4-L5 disc and discovering that no one in healthcare wanted to talk about the part that mattered most.",
      },
      { property: "og:title", content: "Who made BackStroke" },
      {
        property: "og:description",
        content:
          "Eric Mass built BackStroke after a decade of treating a herniated L4-L5 disc and discovering that no one in healthcare wanted to talk about the part that mattered most.",
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

function About() {
  return (
    <main style={{ background: PAPER, color: PAPER_INK }} className="min-h-screen">
      <SiteHeader active="about" />

      <article className="max-w-[760px] mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-28">
        {/* eyebrow */}
        <p
          className="font-mono-label text-[10px] tracking-[0.28em] uppercase"
          style={{ color: OXBLOOD }}
        >
          Founder · About
        </p>

        {/* headline */}
        <h1
          className="font-serif-display italic tracking-[-0.025em] leading-[1.0] mt-5"
          style={{
            fontSize: "clamp(40px, 6.4vw, 84px)",
            color: PAPER_INK,
          }}
        >
          The thing nobody
          <br />
          would write down.
        </h1>

        <p
          className="font-serif-display mt-7 leading-[1.5]"
          style={{
            fontSize: "clamp(19px, 1.5vw, 22px)",
            color: PAPER_INK,
            opacity: 0.9,
          }}
        >
          Eric Mass spent ten years trying to find one piece of paper, from
          one medical professional, that addressed the specific overlap of
          chronic low back pain and the rest of adult life. He never found it.
          BackStroke is the paper.
        </p>

        <Spacer h={56} />

        {/* portrait + caption */}
        <Portrait />

        <Spacer h={56} />

        {/* the story, in beats */}
        <Section eyebrow="2014">
          <H2>The injury.</H2>
          <P>
            A herniated L4-L5 disc, picked up the way most are: a normal
            adult morning, a normal adult bend, a sound the body should not
            make. The MRI was unremarkable to the radiologist and life
            altering to me. I started the standard tour: physical therapy,
            cortisone, sleep on the floor for a month, do not lift the
            child, do not lift the dog, do not lift.
          </P>
        </Section>

        <Section eyebrow="2015 — 2022">
          <H2>The tour.</H2>
          <P>
            Over the next eight years I saw three surgeons, four PTs, two
            chiropractors, one acupuncturist who was excellent, one
            functional medicine doctor who was not, and one sports medicine
            doctor who, in a single forty minute appointment, told me more
            useful information about how a back actually behaves under load
            than every other provider combined.
          </P>
          <P>
            None of them, ever, asked the question I most needed somebody to
            ask. Not the surgeon. Not the PT. Not the chiropractor. The
            sports medicine doctor asked it sideways, in the middle of
            something else, and I almost cried in her office.
          </P>
        </Section>

        <Pull>
          The question was: is this affecting your sex life. The answer was
          obviously yes. The follow up was nothing.
        </Pull>

        <Section eyebrow="2023">
          <H2>The search.</H2>
          <P>
            I went looking for the resource. The book, the app, the
            substack, the subreddit, the closed Facebook group, the
            something. I read everything in the National Library of
            Medicine database that touched the overlap of chronic low back
            pain and adult sex. I read the AASECT literature. I read the
            McGill volumes cover to cover. I read the chronic pain self
            help books, which are mostly about mindfulness, which is fine,
            which is not the question.
          </P>
          <P>
            What exists is a thousand articles on what positions to avoid,
            written in the tone of a high school health pamphlet, ending
            with the words "consult your doctor." The doctors will not
            consult on this. That is the entire problem.
          </P>
        </Section>

        <Section eyebrow="2024">
          <H2>The decision.</H2>
          <P>
            I am not a clinician. I am a person who spent a decade trying
            and failing to find this resource and finally accepted that the
            resource was not going to build itself. I assembled a small
            advisory bench: a sports medicine doctor, a board-certified
            orthopedic PT, a sex therapist, and a movement coach who has
            worked with back pain populations for twenty years. I wrote a
            first draft of the methodology. They tore it apart. I rewrote
            it. They tore it apart again. We did this for nine months.
          </P>
          <P>
            BackStroke is what came out the other side. It is a small,
            focused tool. It does not try to replace any of those four
            people. It tries to be the thing you read between
            appointments, and the thing you open at 10:47pm on a Tuesday
            when the back is loud and the question is whether tonight is
            the night.
          </P>
        </Section>

        <Section eyebrow="The principle">
          <H2>What we will not do.</H2>
          <P>
            We will not sell supplements. We will not sell devices. We will
            not run an ad business pretending to be a health business. We
            will not sell your check ins, ever, to anyone, for any amount
            of money, including the amount that would otherwise save the
            company. If the company has to go away because we will not sell
            the data, the company has to go away. That is the actual
            promise. It is not a marketing line. It is the constraint that
            ate two thirds of the venture conversations.
          </P>
        </Section>

        <Section eyebrow="The team">
          <H2>Who we are right now.</H2>
          <P>
            One full time engineer, who is me. One part time clinical
            advisor on retainer. One copy editor who has caught more
            inaccuracies than I would like to admit. The advisory bench
            above, reviewing the engine outputs monthly. Two beta users
            from week one who have told me what to delete and what to keep.
          </P>
          <P>
            It is a small operation, deliberately. The first version of
            this is one person at a desk in Cambridge with the right
            advisors. It is not a startup blitz. It is the smallest
            possible useful thing for the largest possible problem most
            people do not talk about.
          </P>
        </Section>

        <Spacer h={48} />

        {/* contact */}
        <div
          className="border-t pt-10"
          style={{ borderColor: RULE }}
        >
          <p
            className="font-mono-label text-[10px] tracking-[0.28em] uppercase"
            style={{ color: PAPER_MUTED }}
          >
            Contact
          </p>
          <p
            className="font-serif-display mt-3 leading-[1.55]"
            style={{ fontSize: "18px", color: PAPER_INK }}
          >
            Press, advising, clinical partnership, or a question that does
            not fit a form:{" "}
            <a
              href="mailto:eric@backstroke.app"
              className="hover:opacity-70 transition italic"
              style={{ color: OXBLOOD }}
            >
              eric@backstroke.app
            </a>
          </p>
          <p
            className="font-serif-display mt-4 leading-[1.55] italic"
            style={{ fontSize: "16px", color: PAPER_MUTED }}
          >
            I answer everything. It may take a week. It does get answered.
          </p>
        </div>

        <Spacer h={40} />

        {/* exits */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono-label text-[11px] tracking-[0.18em] uppercase">
          <Link
            to="/"
            className="hover:opacity-70 transition"
            style={{ color: PAPER_MUTED }}
          >
            ← Home
          </Link>
          <span style={{ color: RULE }}>·</span>
          <Link
            to="/manifesto"
            className="hover:opacity-70 transition"
            style={{ color: PAPER_MUTED }}
          >
            Read the manifesto
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

/* ---------- pieces ---------- */

function Spacer({ h }: { h: number }) {
  return <div style={{ height: h }} />;
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-serif-display leading-[1.05] tracking-[-0.02em] mt-3"
      style={{
        fontSize: "clamp(28px, 3.4vw, 40px)",
        color: PAPER_INK,
      }}
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-serif-display mt-5 leading-[1.6]"
      style={{
        fontSize: "clamp(17px, 1.3vw, 19px)",
        color: PAPER_INK,
        opacity: 0.92,
      }}
    >
      {children}
    </p>
  );
}

function Section({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <p
        className="font-mono-label text-[10px] tracking-[0.28em] uppercase"
        style={{ color: OXBLOOD }}
      >
        {eyebrow}
      </p>
      {children}
    </section>
  );
}

function Pull({ children }: { children: React.ReactNode }) {
  return (
    <blockquote
      className="font-serif-display italic leading-[1.2] tracking-[-0.015em] border-l-2 pl-6 mt-12"
      style={{
        fontSize: "clamp(24px, 3.2vw, 34px)",
        color: PAPER_INK,
        borderColor: OXBLOOD,
      }}
    >
      {children}
    </blockquote>
  );
}

/**
 * Typographic founder portrait. Until we have a real headshot, this is a
 * full-width plate with an oxblood monogram and the byline beneath. When
 * Eric drops /public/founder.jpg, swap the inner block for an <img>.
 */
function Portrait() {
  return (
    <figure>
      <div
        className="aspect-[4/3] w-full rounded-sm border flex items-center justify-center relative overflow-hidden"
        style={{
          background: PAPER_2,
          borderColor: RULE,
        }}
      >
        {/* faint cross-hatch so the plate doesn't look broken */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            background:
              "repeating-linear-gradient(45deg, var(--brand-oxblood) 0 1px, transparent 1px 8px)",
          }}
        />
        <div className="relative text-center">
          <div
            className="font-serif-display italic"
            style={{
              fontSize: "clamp(96px, 18vw, 220px)",
              color: OXBLOOD,
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
            }}
          >
            EM
          </div>
          <div
            className="font-mono-label text-[10px] tracking-[0.28em] uppercase mt-4"
            style={{ color: PAPER_MUTED }}
          >
            Portrait pending · headshot from the studio in two weeks
          </div>
        </div>
      </div>
      <figcaption
        className="mt-4 font-mono-label text-[10px] tracking-[0.18em] uppercase flex items-center justify-between"
        style={{ color: PAPER_MUTED }}
      >
        <span>Eric Mass · Founder · Cambridge, MA</span>
        <span>2026</span>
      </figcaption>
    </figure>
  );
}
