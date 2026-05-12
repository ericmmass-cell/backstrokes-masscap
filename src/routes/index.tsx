import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import sheetGrip from "@/assets/sheet-grip.jpg";
import mcgillStudy from "@/assets/mcgill-study.jpg";
import { COUNCIL } from "./council";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "BackStroke. The protocol you'd write if you had two PTs in the room." },
      {
        name: "description",
        content:
          "Eight minutes a day. One protocol. The back you used to have, and the bedroom you forgot was negotiable.",
      },
      {
        property: "og:title",
        content: "BackStroke. Same pelvis, two jobs, finally on speaking terms.",
      },
      {
        property: "og:description",
        content:
          "Eight minutes a day. Built and signed off by four clinicians who would rather keep their license.",
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
      {/* ───────── Nav — slim, paper, almost invisible ───────── */}
      <header
        className="sticky top-0 z-30 backdrop-blur-xl"
        style={{ background: "oklch(0.94 0.018 78 / 0.78)", borderBottom: "1px solid oklch(0.85 0.02 70)" }}
      >
        <div className="max-w-[1180px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <svg width="22" height="22" viewBox="0 0 22 22" style={{ color: "var(--brand-oxblood)" }}>
              <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
              <circle cx="11" cy="11" r="3" fill="currentColor" />
            </svg>
            <span className="font-serif-display text-xl tracking-tight italic" style={{ color: PAPER_INK }}>
              Back<span style={{ color: "var(--brand-oxblood)" }}>Stroke</span>
            </span>
            <sup className="font-mono-label text-[8px] ml-0.5" style={{ color: PAPER_MUTED }}>
              ℠
            </sup>
          </Link>
          <nav className="hidden md:flex items-center gap-7 font-mono-label text-[10px] tracking-[0.18em] uppercase">
            <a href="#problem" style={{ color: PAPER_MUTED }} className="hover:opacity-80 transition">
              Problem
            </a>
            <a href="#work" style={{ color: PAPER_MUTED }} className="hover:opacity-80 transition">
              Work
            </a>
            <Link to="/council" style={{ color: PAPER_MUTED }} className="hover:opacity-80 transition">
              Council
            </Link>
            <Link to="/science" style={{ color: PAPER_MUTED }} className="hover:opacity-80 transition">
              Science
            </Link>
          </nav>
          <Link
            to="/dashboard"
            className="text-[12px] tracking-[0.14em] uppercase font-mono-label px-4 py-2 rounded-full hover:opacity-90 transition"
            style={{ background: PAPER_INK, color: PAPER }}
          >
            Try a session
          </Link>
        </div>
      </header>

      {/* ───────── HERO ───────── */}
      <section className="px-6 md:px-10 pt-24 md:pt-32 pb-24 md:pb-28 relative overflow-hidden">
        <div className="max-w-[1180px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 relative">
            <p
              className="font-mono-label text-[10px] tracking-[0.22em] uppercase mb-8"
              style={{ color: "var(--brand-oxblood)" }}
            >
              ◆ A members' protocol for the body that stopped negotiating
            </p>
            <h1
              className="font-serif-display leading-[0.94] tracking-[-0.025em]"
              style={{ fontSize: "clamp(56px, 8.4vw, 124px)", color: PAPER_INK }}
            >
              Same pelvis.
              <br />
              <span className="italic" style={{ color: "var(--brand-oxblood)" }}>
                Two jobs.
              </span>
              <br />
              Eight minutes.
            </h1>

            <p
              className="mt-9 font-serif-display italic leading-snug max-w-xl"
              style={{ fontSize: "clamp(20px, 2.0vw, 26px)", color: PAPER_INK, opacity: 0.86 }}
            >
              The protocol your spine PT and your pelvic-floor PT would have written together — if they were ever in the same room. They weren't. We put them there.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold transition hover:opacity-90"
                style={{ background: PAPER_INK, color: PAPER, boxShadow: "0 12px 30px -10px oklch(0.18 0.01 40 / 0.4)" }}
              >
                Run the baseline · 7 min <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="#what-you-pay-for"
                className="font-mono-label text-[10px] tracking-[0.22em] uppercase hover:opacity-80 transition"
                style={{ color: PAPER_MUTED }}
              >
                Or read what you're paying for →
              </a>
            </div>

            <p className="mt-8 text-sm italic max-w-md leading-relaxed" style={{ color: PAPER_MUTED }}>
              No app store. No download. No candle. No "Hey friend" newsletters from a guy named Brayden.
            </p>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative">
              <img
                src={portrait}
                alt=""
                className="w-full aspect-[4/5] object-cover rounded-sm"
                style={{ boxShadow: "0 40px 80px -20px oklch(0.18 0.01 40 / 0.35)" }}
              />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono-label text-[9px] tracking-[0.22em] uppercase text-white/85">
                <span>SUBJECT 04 · DAY 42 · L4-L5</span>
                <span style={{ color: AMBER }}>● ON SPEAKING TERMS</span>
              </div>
              <span
                className="absolute -top-6 -right-3 font-script text-3xl rotate-[5deg] hidden md:block"
                style={{ color: "var(--brand-oxblood)" }}
              >
                quieter than yesterday
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── PROOF STRIP — four numbers, gold foil on cream ───────── */}
      <section className="border-y" style={{ borderColor: "oklch(0.86 0.025 70)", background: PAPER_2 }}>
        <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {[
            ["8 min", "a day. Floor optional."],
            ["1 protocol", "back + bedroom, one chart."],
            ["4 clinicians", "each with a veto."],
            ["0 candles", "0 jade eggs. 0 ashwagandha."],
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

      {/* ───────── PROBLEM — one dark editorial break ───────── */}
      <section id="problem" className="px-6 md:px-10 py-24 md:py-32 relative" style={{ background: "var(--brand-ink)" }}>
        <div className="max-w-[1100px] mx-auto">
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: AMBER }}>
            ◆ The category answer is a stretch reel and a $48 magnesium gummy in eucalyptus
          </p>
          <h2
            className="font-serif-display mt-6 leading-[1.0] tracking-[-0.02em] max-w-4xl"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "white" }}
          >
            Your spine PT and your pelvic-floor PT have never met.{" "}
            <span className="italic" style={{ color: AMBER }}>
              Your pelvis would like a word.
            </span>
          </h2>
          <p className="mt-10 text-lg md:text-xl leading-relaxed max-w-2xl italic" style={{ color: "oklch(0.85 0.02 50)" }}>
            The protocol that fixes your back lives in one building. The protocol that fixes your sex life lives in another. The two clinicians have never been in the same chart. The market is fine with this. Your pelvis is not.
          </p>

          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            {[
              ["619M", "people with active back pain"],
              ["1 in 4", "report sexual avoidance"],
              ["$140B", "spent yearly on the wrong things"],
            ].map(([v, l]) => (
              <div key={l} className="border-l-2 pl-5" style={{ borderColor: AMBER }}>
                <p className="font-serif-display text-4xl md:text-5xl tracking-tight" style={{ color: AMBER }}>
                  {v}
                </p>
                <p className="mt-2 text-sm leading-snug" style={{ color: "oklch(0.78 0.02 50)" }}>
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── WHAT YOU PAY FOR — back to paper ───────── */}
      <section id="what-you-pay-for" className="px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-[1100px] mx-auto">
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--brand-oxblood)" }}>
            ◆ What you're paying for
          </p>
          <h2
            className="font-serif-display mt-5 leading-[1.0] tracking-[-0.02em] max-w-3xl"
            style={{ fontSize: "clamp(38px, 5vw, 68px)", color: PAPER_INK }}
          >
            The shortest membership we could responsibly sell.
          </h2>
          <p className="mt-8 max-w-2xl leading-relaxed text-lg italic" style={{ color: PAPER_INK, opacity: 0.78 }}>
            Eight minutes a day. The exact eight your spine and your pelvic floor were already arguing about, finally on the same chart. We are not adding work to your life. We are subtracting time you were already spending wrong.
          </p>

          <ol className="mt-14 grid md:grid-cols-3 gap-px" style={{ background: "oklch(0.86 0.025 70)", border: "1px solid oklch(0.86 0.025 70)" }}>
            {[
              {
                num: "01",
                head: "Eight minutes",
                body: "The McGill big-3 — curl-up, side plank, bird dog — at the dose the disc trials actually use. Not the YouTube version.",
              },
              {
                num: "02",
                head: "One pelvic floor",
                body: "Down-train first. Up-train second. Eccentric control is the metric, not rep count. Most apps got this wrong on purpose.",
              },
              {
                num: "03",
                head: "Four clinicians",
                body: "A spine PT, a pelvic-health PT, a urologist, an AASECT sex therapist. Each owns a veto. None of them are influencers.",
              },
            ].map((p) => (
              <li key={p.num} className="px-7 py-8 md:py-10" style={{ background: PAPER }}>
                <p
                  className="font-serif-display tracking-tight"
                  style={{
                    fontSize: "44px",
                    background: "var(--gradient-text)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {p.num}
                </p>
                <h3 className="font-serif-display text-2xl mt-2 leading-tight" style={{ color: PAPER_INK }}>
                  {p.head}
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: PAPER_INK, opacity: 0.72 }}>
                  {p.body}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-10 font-script text-2xl md:text-3xl italic max-w-2xl" style={{ color: "var(--brand-oxblood)" }}>
            Strong back. Steady breath. <span style={{ color: AMBER }}>Hot life.</span>
          </p>
        </div>
      </section>

      {/* ───────── THE WORK — two image cards ───────── */}
      <section id="work" className="px-6 md:px-10 pb-24 md:pb-28">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-6">
          {[
            {
              src: mcgillStudy,
              tag: "◆ FOR THE BACK · 8 MIN",
              head: "A quieter lumbar in two weeks.",
              body: "Endurance, not range. The protocol that beat lumbar surgery in head-to-head trials, finally taught properly.",
              color: AMBER,
            },
            {
              src: sheetGrip,
              tag: "◆ FOR THE BEDROOM · 7 MIN",
              head: "Reverse kegel before kegel.",
              body: "Erections and lubrication are the floor, not the ceiling. A chronically gripping pelvic floor is why arousal stalls.",
              color: BLUSH,
            },
          ].map((c) => (
            <article
              key={c.head}
              className="relative overflow-hidden"
              style={{ boxShadow: "0 30px 60px -20px oklch(0.18 0.01 40 / 0.35)", border: "1px solid oklch(0.86 0.025 70)" }}
            >
              <div className="relative aspect-[5/6]">
                <img src={c.src} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg, transparent 40%, oklch(0.1 0 0 / 0.85) 100%)" }}
                />
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                  <span className="font-mono-label text-[9px] tracking-[0.22em] uppercase text-white/85">
                    {c.tag}
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="font-serif-display text-3xl md:text-4xl italic leading-[1.05]" style={{ color: "white" }}>
                    {c.head}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/85 max-w-sm">{c.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ───────── THE COUNCIL — slim, named, no hagiography ───────── */}
      <section className="px-6 md:px-10 py-24 md:py-28" style={{ background: PAPER_2 }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--brand-oxblood)" }}>
                ◆ The council · four clinicians · each with a veto
              </p>
              <h2
                className="font-serif-display mt-5 leading-[1.0] tracking-[-0.02em] max-w-3xl"
                style={{ fontSize: "clamp(34px, 4.4vw, 56px)", color: PAPER_INK }}
              >
                People with letters after their name and a license they would prefer to keep.
              </h2>
            </div>
            <Link
              to="/council"
              className="font-mono-label text-[10px] tracking-[0.22em] uppercase hover:opacity-80 transition"
              style={{ color: PAPER_INK }}
            >
              Read the full profiles →
            </Link>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "oklch(0.86 0.025 70)", border: "1px solid oklch(0.86 0.025 70)" }}>
            {COUNCIL.map((m) => (
              <li key={m.slot} className="p-6" style={{ background: PAPER }}>
                <div
                  className="w-16 h-16 rounded-full grid place-items-center font-mono-label text-[9px] tracking-[0.18em] uppercase"
                  style={{ background: "oklch(0.88 0.03 70)", color: PAPER_MUTED }}
                  aria-hidden
                >
                  TBD
                </div>
                <p
                  className="font-mono-label text-[10px] tracking-[0.22em] uppercase mt-5"
                  style={{ color: "var(--brand-oxblood)" }}
                >
                  {m.slot}
                </p>
                <p className="font-serif-display text-lg mt-2 leading-snug" style={{ color: PAPER_INK }}>
                  {m.name}
                </p>
                <p className="text-xs mt-3 leading-relaxed italic" style={{ color: PAPER_INK, opacity: 0.7 }}>
                  {m.bioShort}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-xs italic" style={{ color: PAPER_MUTED }}>
            ◆ Photos commissioned. Subjects' lawyers reviewing. Names land before public launch.
          </p>
        </div>
      </section>

      {/* ───────── SCIENCE — one line, one CTA ───────── */}
      <section className="px-6 md:px-10 py-24 md:py-28">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--brand-oxblood)" }}>
              ◆ The numbers, with the asterisks attached
            </p>
            <h2
              className="font-serif-display mt-5 leading-[1.02] tracking-[-0.02em]"
              style={{ fontSize: "clamp(34px, 4.4vw, 56px)", color: PAPER_INK }}
            >
              412 people. Internal cohort. <span className="italic" style={{ color: "var(--brand-oxblood)" }}>Not peer-reviewed.</span>
            </h2>
            <p className="mt-7 max-w-xl leading-relaxed text-lg italic" style={{ color: PAPER_INK, opacity: 0.78 }}>
              We don't put the headline numbers in the hero. Hero numbers without their methodology are advertising. The methodology is on the science page, attached to every cell.
            </p>
            <Link
              to="/science"
              className="mt-9 inline-flex items-center gap-2 font-mono-label text-[10px] tracking-[0.22em] uppercase border-b pb-1 transition hover:opacity-80"
              style={{ color: PAPER_INK, borderColor: PAPER_INK }}
            >
              See the cohort data · with methodology →
            </Link>
          </div>
          <div className="md:col-span-5">
            <div
              className="grid grid-cols-2 gap-px"
              style={{ background: "oklch(0.86 0.025 70)", border: "1px solid oklch(0.86 0.025 70)" }}
            >
              {[
                ["−63%", "back-pain days · wk 8"],
                ["+58%", "rate sex 'enjoyable' · wk 10"],
                ["2.4×", "morning erections · wk 12"],
                ["−47%", "pain as a barrier · wk 12"],
              ].map(([v, l]) => (
                <div key={l} className="p-5" style={{ background: PAPER }}>
                  <p
                    className="font-serif-display tracking-tight leading-none"
                    style={{
                      fontSize: "clamp(28px, 3.4vw, 44px)",
                      background: "var(--gradient-text)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {v}
                  </p>
                  <p className="font-mono-label text-[9px] tracking-[0.18em] uppercase mt-3" style={{ color: PAPER_MUTED }}>
                    {l}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[11px] italic leading-relaxed" style={{ color: PAPER_MUTED }}>
              Self-reported. Internal in-app cohort. Uncontrolled. Not peer-reviewed. Methodology on every number — read it.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── FIELD NOTES — illustrative, three lines ───────── */}
      <section className="px-6 md:px-10 py-20 md:py-24" style={{ background: PAPER_2 }}>
        <div className="max-w-[1100px] mx-auto">
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--brand-oxblood)" }}>
            ◆ Field notes · illustrative · in brand voice
          </p>
          <div className="mt-10 grid md:grid-cols-3 gap-px" style={{ background: "oklch(0.86 0.025 70)", border: "1px solid oklch(0.86 0.025 70)" }}>
            {[
              {
                q: "I scheduled my life around my lower back for four years. I don't anymore. Make of that what you will.",
                a: "Jake, 32 — illustrative",
              },
              {
                q: "Two weeks of the breath work and I stopped bracing for everything. Including, eventually, my husband. He noticed before I did.",
                a: "Maya, 29 — illustrative",
              },
              {
                q: "First thing I've used that told me what to do today, in a tone that didn't make me consider throwing my phone into a river.",
                a: "Chris, 35 — illustrative",
              },
            ].map((t) => (
              <figure key={t.a} className="p-8" style={{ background: PAPER }}>
                <blockquote
                  className="font-serif-display text-lg md:text-xl leading-snug italic"
                  style={{ color: PAPER_INK }}
                >
                  &ldquo;{t.q}&rdquo;
                </blockquote>
                <figcaption className="mt-6 font-mono-label text-[10px] tracking-[0.18em] uppercase" style={{ color: PAPER_MUTED }}>
                  {t.a}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-xs italic" style={{ color: PAPER_MUTED }}>
            ◆ Real testimonials replace these in v2. Until then, we label them.
          </p>
        </div>
      </section>

      {/* ───────── FINAL CTA — dark, declarative ───────── */}
      <section className="px-6 md:px-10 py-28 md:py-36" style={{ background: "var(--brand-ink)" }}>
        <div className="max-w-[900px] mx-auto text-center">
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: AMBER }}>
            ◆ Eight minutes is shorter than this homepage
          </p>
          <h2
            className="font-serif-display mt-6 leading-[0.96] tracking-[-0.025em]"
            style={{ fontSize: "clamp(44px, 6vw, 88px)", color: "white" }}
          >
            Don't let your back<br />
            be the reason{" "}
            <span className="italic" style={{ color: AMBER }}>
              you stayed in.
            </span>
          </h2>
          <p className="mt-8 max-w-xl mx-auto text-lg leading-relaxed italic" style={{ color: "oklch(0.82 0.02 50)" }}>
            Two weeks free. $24.99 a month after, cancel any time. Web-first — no app store, no download, no review process, no shame screen.
          </p>
          <div className="mt-12 flex items-center justify-center gap-5 flex-wrap">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-9 py-5 rounded-full text-base font-semibold transition hover:opacity-90"
              style={{
                background: AMBER,
                color: "var(--brand-ink)",
                boxShadow: "0 0 32px oklch(0.78 0.13 78 / 0.35)",
              }}
            >
              Run the 7-minute baseline <ArrowUpRight className="w-5 h-5" />
            </Link>
            <Link
              to="/science"
              className="font-mono-label text-[10px] tracking-[0.22em] uppercase hover:opacity-80 transition"
              style={{ color: "oklch(0.78 0.02 50)" }}
            >
              Or read the science first →
            </Link>
          </div>
          <p
            className="mt-16 text-xs max-w-xl mx-auto leading-relaxed italic font-serif-display"
            style={{ color: "oklch(0.7 0.02 50)" }}
          >
            Not a medical device. If your back is screaming, see a PT. If sex hurts, if arousal has quietly left the chat, if your erection has been MIA for three months: see the relevant specialist. We are coaches, not your doctor.
          </p>
        </div>
      </section>

      {/* ───────── Footer — slim ───────── */}
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
            <Link to="/positions" className="hover:opacity-80 transition">Positions</Link>
            <Link to="/conversation" className="hover:opacity-80 transition">Scripts</Link>
            <Link to="/science" className="hover:opacity-80 transition">Science</Link>
            <Link to="/council" className="hover:opacity-80 transition">Council</Link>
            <Link to="/podcast" className="hover:opacity-80 transition">Podcast</Link>
          </div>
          <span>℠ MMXXVI · no candle revenue</span>
        </div>
      </footer>
    </div>
  );
}
