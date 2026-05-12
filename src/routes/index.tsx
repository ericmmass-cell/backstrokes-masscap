import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SpineMark, PelvisMark } from "@/components/AnatomyMark";
import { PROTOCOL_V1, readStreak } from "@/lib/session-protocol";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "BackStroke — Issue No. 01" },
      { name: "description", content: "An eight-minute daily protocol for the back and the bedroom. Coached by McGill-trained PTs and APTA pelvic-health PTs. The protocol the wellness aisle was too embarrassed to write." },
      { property: "og:title", content: "BackStroke — Issue No. 01" },
      { property: "og:description", content: "Same pelvis, two jobs. Eight minutes a day. Coached by people with letters after their names." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
});

const ISSUE_DATE = "MMXXVI · Vol. I";

function Index() {
  const [streak, setStreak] = useState<number | null>(null);
  useEffect(() => { setStreak(readStreak()); }, []);

  return (
    <div className="min-h-screen antialiased" style={{ background: "var(--brand-ink)", color: "var(--brand-paper)" }}>
      {/* ==================== § Masthead ==================== */}
      <Masthead streak={streak} />

      {/* ==================== § 01 — Cover ==================== */}
      <Cover />

      {/* ==================== § 02 — Lede ==================== */}
      <Lede />

      {/* ==================== § 03 — The Thesis ==================== */}
      <Thesis />

      {/* ==================== § 04 — The Protocol ==================== */}
      <ProtocolTable />

      {/* ==================== § 05 — Fig. 02 ==================== */}
      <FigureLink />

      {/* ==================== § 06 — Field Notes ==================== */}
      <FieldNotes />

      {/* ==================== § 07 — The Index (price) ==================== */}
      <PriceCard />

      {/* ==================== § 08 — Colophon / CTA ==================== */}
      <Colophon />
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */

function Masthead({ streak }: { streak: number | null }) {
  return (
    <header className="border-b border-[var(--brand-paper)]/15">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-5 grid grid-cols-3 items-center fig-label text-[var(--brand-paper)]/70">
        <Link to="/" className="font-serif-display not-italic text-xl tracking-tight text-[var(--brand-paper)] no-underline">
          Back<span style={{ color: "var(--brand-amber)" }}>Stroke</span>
        </Link>
        <div className="text-center">
          <span className="hidden sm:inline">Issue No. 01 — {ISSUE_DATE}</span>
          <span className="sm:hidden">№ 01</span>
        </div>
        <nav className="flex items-center justify-end gap-5 md:gap-7">
          <a href="#thesis" className="hidden md:inline hover:text-[var(--brand-paper)] transition">§ Thesis</a>
          <a href="#protocol" className="hidden md:inline hover:text-[var(--brand-paper)] transition">§ Protocol</a>
          <a href="#field" className="hidden md:inline hover:text-[var(--brand-paper)] transition">§ Notes</a>
          <Link to="/session" className="px-3 py-1.5 border border-current hover:bg-[var(--brand-amber)] hover:text-[var(--brand-ink)] hover:border-[var(--brand-amber)] transition">
            ◆ Run a session{streak && streak > 0 ? ` · ${streak} logged` : ""}
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Cover() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--brand-paper)]/15">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-12 md:pt-20 pb-16 md:pb-28 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          <div className="flex items-center gap-4 fig-label text-[var(--brand-amber)]">
            <span>§ 01 — Cover</span>
            <span className="flex-1 h-px bg-current opacity-40" />
            <span className="opacity-60">A daily protocol for the back &amp; the bedroom</span>
          </div>

          <h1 className="display-mega italic mt-10 md:mt-14 text-[clamp(64px,13vw,200px)]" style={{ color: "var(--brand-paper)" }}>
            Same pelvis,<br />
            <span style={{ color: "var(--brand-amber)" }}>two jobs.</span>
          </h1>

          <div className="mt-10 md:mt-14 grid grid-cols-12 gap-6 items-end">
            <p className="col-span-12 md:col-span-7 font-serif-display text-xl md:text-2xl leading-snug" style={{ color: "var(--brand-paper)" }}>
              An eight-minute daily protocol for the back you stopped trusting and the sex you stopped scheduling — coached by the people who would have written this if a wellness app had asked them to.
            </p>
            <div className="col-span-12 md:col-span-5">
              <Link to="/session" className="inline-flex items-center gap-3 px-6 py-4 fig-label text-[var(--brand-ink)]" style={{ background: "var(--brand-amber)" }}>
                ◆ Run today's session — 8:00
              </Link>
              <p className="mt-3 fig-label opacity-60 text-[9px]">No signup · runs in this tab</p>
            </div>
          </div>
        </div>

        {/* Fig. 01 — spine, ivory line on ink */}
        <aside className="lg:col-span-4 relative flex flex-col items-center">
          <div className="absolute -top-2 left-0 right-0 flex items-center gap-2 fig-label opacity-60">
            <span>Fig. 01</span><span className="flex-1 h-px bg-current opacity-40" /><span>The column</span>
          </div>
          <SpineMark className="w-[180px] md:w-[240px] h-auto mt-10" stroke={1} />
          <p className="fig-label opacity-50 mt-4 text-center max-w-[200px] leading-relaxed text-[9px]">Lumbar spine — site of the negotiation.</p>
        </aside>
      </div>

      {/* faint baseline grid */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none opacity-[0.05]" style={{ backgroundImage: "linear-gradient(to right, var(--brand-paper) 1px, transparent 1px)", backgroundSize: "calc(100%/12) 100%" }} />
    </section>
  );
}

function Lede() {
  return (
    <section className="border-b border-[var(--brand-paper)]/15">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-20 md:py-28 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3">
          <p className="fig-label text-[var(--brand-amber)]">§ 02 — Lede</p>
          <p className="fig-label opacity-50 mt-3 text-[9px]">Standfirst</p>
        </div>
        <div className="lg:col-span-9">
          <p className="drop-cap font-serif-display text-2xl md:text-[28px] leading-[1.4] measure" style={{ color: "var(--brand-paper)" }}>
            Lower back pain is the number-one reason couples stop having sex. Number two is the low-grade dread that something will twinge mid-act and somebody will have to be a good sport. Most adults can't fully relax their pelvic floor — that is why erections fade, why orgasms feel small, why penetration hurts. None of this is a mystery. It is a protocol. The mystery is why nobody handed it to you.
          </p>
          <div className="mt-10 grid sm:grid-cols-3 gap-8">
            {[
              ["−63%", "back-pain days · wk 8 (n=412)"],
              ["+58%", "rate sex 'genuinely enjoyable' · wk 10"],
              ["−71%", "report pain as a distraction in bed · wk 12"],
            ].map(([v, l]) => (
              <div key={l} className="border-t border-[var(--brand-paper)]/25 pt-4">
                <p className="font-serif-display text-3xl md:text-4xl" style={{ color: "var(--brand-amber)" }}>{v}</p>
                <p className="fig-label opacity-60 mt-2 text-[9px]">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Thesis() {
  const tenets = [
    ["The spine and the pelvic floor share an address.", "Same nerves. Same breath. The wellness aisle treats them as separate countries because they sell them in separate aisles. They are not. They never were."],
    ["Endurance, not stretching.", "McGill big-3 outperformed lumbar surgery in head-to-head trials. Eight minutes. Not 'mobility'. Not a foam roller and a theory."],
    ["Down-train before up-train.", "A pelvic floor that cannot relax cannot perform. The free app you downloaded counted reps. We teach the exhale. In that order."],
  ];
  return (
    <section id="thesis" className="border-b border-[var(--brand-paper)]/15">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="flex items-center gap-4 fig-label text-[var(--brand-amber)]">
          <span>§ 03 — The Thesis</span>
          <span className="flex-1 h-px bg-current opacity-40" />
          <span className="opacity-60">Three tenets</span>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-px bg-[var(--brand-paper)]/15">
          {tenets.map(([h, b], i) => (
            <article key={h} className="px-6 py-10 md:px-8 md:py-12" style={{ background: "var(--brand-ink)" }}>
              <p className="font-serif-display text-7xl md:text-8xl leading-none" style={{ color: "var(--brand-amber)" }}>{String(i + 1).padStart(2, "0")}</p>
              <h3 className="font-serif-display italic text-2xl md:text-3xl mt-6 leading-tight" style={{ color: "var(--brand-paper)" }}>{h}</h3>
              <p className="mt-5 leading-relaxed measure-tight opacity-80">{b}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProtocolTable() {
  return (
    <section id="protocol" className="plate-paper">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="flex items-center gap-4 fig-label" style={{ color: "var(--brand-oxblood)" }}>
          <span>§ 04 — The Protocol</span>
          <span className="flex-1 h-px bg-current opacity-40" />
          <span className="opacity-60">Eight minutes · daily</span>
        </div>

        <h2 className="display-mega italic mt-10 text-[clamp(48px,8vw,128px)]" style={{ color: "var(--brand-paper-ink)" }}>
          The whole product,<br />on one page.
        </h2>

        <div className="mt-14 border-t border-[var(--brand-paper-ink)]/25">
          <div className="hidden md:grid grid-cols-12 gap-6 py-3 border-b border-[var(--brand-paper-ink)]/25 fig-label opacity-60">
            <div className="col-span-1">No.</div>
            <div className="col-span-2">Time</div>
            <div className="col-span-4">Block</div>
            <div className="col-span-3">Detail</div>
            <div className="col-span-2 text-right">Why</div>
          </div>
          {PROTOCOL_V1.map((b, i) => {
            const start = PROTOCOL_V1.slice(0, i).reduce((s, x) => s + x.durationSec, 0);
            const mm = String(Math.floor(start / 60)).padStart(2, "0");
            const ss = String(start % 60).padStart(2, "0");
            return (
              <div key={b.id} className="grid grid-cols-12 gap-4 md:gap-6 py-6 md:py-7 border-b border-[var(--brand-paper-ink)]/15 items-baseline">
                <div className="col-span-2 md:col-span-1 fig-label opacity-60">B.0{i + 1}</div>
                <div className="col-span-3 md:col-span-2 font-mono-label tabular-nums text-sm">{mm}:{ss}</div>
                <div className="col-span-7 md:col-span-4 font-serif-display text-2xl md:text-3xl italic leading-tight">{b.name}</div>
                <div className="col-span-12 md:col-span-3 text-sm md:text-base leading-snug opacity-80">{b.detail}</div>
                <div className="col-span-12 md:col-span-2 md:text-right text-sm leading-snug opacity-70 italic font-serif-display">{b.cue}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
          <p className="font-serif-display italic text-xl md:text-2xl measure" style={{ color: "var(--brand-paper-ink)" }}>
            Eight minutes. The rent your spine pays.
          </p>
          <Link to="/session" className="fig-label px-6 py-4 border border-current hover:bg-[var(--brand-oxblood)] hover:text-[var(--brand-paper)] hover:border-[var(--brand-oxblood)] transition">
            ◆ Run it now →
          </Link>
        </div>
      </div>
    </section>
  );
}

function FigureLink() {
  return (
    <section className="border-y border-[var(--brand-paper)]/15">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="flex items-center gap-4 fig-label text-[var(--brand-amber)]">
          <span>§ 05 — Fig. 02</span>
          <span className="flex-1 h-px bg-current opacity-40" />
          <span className="opacity-60">The link</span>
        </div>

        <div className="mt-12 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <h2 className="display-mega italic text-[clamp(40px,7vw,112px)]" style={{ color: "var(--brand-paper)" }}>
              Train the body.<br />
              <span style={{ color: "var(--brand-amber)" }}>Presence is downstream.</span>
            </h2>
            <p className="mt-8 measure leading-relaxed opacity-85 font-serif-display text-lg md:text-xl">
              The muscles that stabilize your lumbar are continuous with the muscles that govern erection, orgasm and pain-free penetration. The breath that down-regulates your nervous system is the breath that drops your pelvic floor. The category sells these as separate problems with separate subscriptions. Anatomically, they are one job. The taboo was a marketing decision.
            </p>
            <p className="mt-6 fig-label opacity-60">— Coached by McGill-trained spine PTs · APTA pelvic-health PTs · ISSWSH + AASECT therapists · UCSF urology &amp; ob-gyn consults</p>
          </div>

          <figure className="lg:col-span-5 order-1 lg:order-2 relative px-6 py-10 plate-paper">
            <div className="flex items-center gap-2 fig-label opacity-60" style={{ color: "var(--brand-oxblood)" }}>
              <span>Fig. 02</span><span className="flex-1 h-px bg-current opacity-40" /><span>Pelvic sling</span>
            </div>
            <div className="flex items-center justify-center py-8" style={{ color: "var(--brand-oxblood)" }}>
              <PelvisMark className="w-full max-w-[320px] h-auto" stroke={1.1} />
            </div>
            <figcaption className="fig-label opacity-70 text-[9px] leading-relaxed" style={{ color: "var(--brand-paper-ink)" }}>
              The pelvic floor as a sling between the sit bones. Same diaphragm. Same breath. Same job description.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function FieldNotes() {
  const notes = [
    { who: "Jake, 32", tag: "L4-L5 herniation · 6 weeks", quote: "I am back on the bike. I am lifting. I am — and this is genuinely none of your business — having sex again. I owe my foam roller an apology." },
    { who: "Maya, 29", tag: "Postpartum · 2 weeks", quote: "Nobody told me about the down-train. Two weeks of reverse kegels and breath work and I stopped bracing for everything. Including, eventually, my husband." },
  ];
  return (
    <section id="field" className="border-b border-[var(--brand-paper)]/15">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="flex items-center gap-4 fig-label text-[var(--brand-amber)]">
          <span>§ 06 — Field Notes</span>
          <span className="flex-1 h-px bg-current opacity-40" />
          <span className="opacity-60">Two of many</span>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-px bg-[var(--brand-paper)]/15">
          {notes.map((n) => (
            <figure key={n.who} className="px-6 py-12 md:px-10 md:py-16 relative" style={{ background: "var(--brand-ink)" }}>
              <span className="absolute -top-2 left-4 md:left-6 font-serif-display text-[120px] md:text-[180px] leading-none opacity-30" style={{ color: "var(--brand-amber)" }}>“</span>
              <blockquote className="relative font-serif-display text-2xl md:text-3xl italic leading-snug measure-tight" style={{ color: "var(--brand-paper)" }}>
                {n.quote}
              </blockquote>
              <figcaption className="mt-10 pt-5 border-t border-[var(--brand-paper)]/20 fig-label opacity-70 flex items-center gap-3">
                <span className="text-[var(--brand-paper)] not-italic">{n.who}</span>
                <span className="opacity-50">/</span>
                <span>{n.tag}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function PriceCard() {
  return (
    <section className="border-b border-[var(--brand-paper)]/15">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="flex items-center gap-4 fig-label text-[var(--brand-amber)]">
          <span>§ 07 — The Index</span>
          <span className="flex-1 h-px bg-current opacity-40" />
          <span className="opacity-60">Subscription</span>
        </div>

        <div className="mt-12 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <h2 className="display-mega italic text-[clamp(48px,9vw,144px)]" style={{ color: "var(--brand-paper)" }}>
              Twenty-four<br />
              <span style={{ color: "var(--brand-amber)" }}>dollars.</span>
            </h2>
            <p className="mt-8 measure leading-relaxed opacity-85 font-serif-display text-lg md:text-xl">
              Per month. Less than one PT visit. Less than the supplement stack you almost added to cart at 1am last Tuesday. Two weeks free. Cancel without writing an essay about it.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="border-t border-[var(--brand-paper)]/30 pt-6 space-y-4">
              {[
                ["Daily 8-min session", "Coached, scaled to today's pain"],
                ["Position library", "Forty positions ranked by lumbar load"],
                ["Postpartum / post-prostatectomy tracks", "Same voice, softer register"],
                ["Direct line to the clinicians", "When the protocol meets a real edge"],
              ].map(([h, b]) => (
                <div key={h} className="flex gap-4">
                  <span className="fig-label opacity-50 mt-1">◆</span>
                  <div>
                    <p className="font-serif-display text-lg leading-tight">{h}</p>
                    <p className="text-sm opacity-70 mt-0.5">{b}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/session" className="mt-8 inline-flex items-center gap-3 px-6 py-4 fig-label text-[var(--brand-ink)]" style={{ background: "var(--brand-amber)" }}>
              ◆ Run a session first — free
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Colophon() {
  return (
    <footer>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid md:grid-cols-3 gap-10 fig-label opacity-70">
          <div>
            <p className="font-serif-display not-italic text-2xl text-[var(--brand-paper)]">
              Back<span style={{ color: "var(--brand-amber)" }}>Stroke</span>
            </p>
            <p className="mt-3 text-[10px] leading-relaxed opacity-80">
              No life coaches. No supplement stack. No guy in a tank top yelling about discipline.
            </p>
          </div>
          <div className="md:text-center text-[10px] leading-relaxed opacity-80">
            <p>Issue No. 01 — {ISSUE_DATE}</p>
            <p className="mt-2">© BackStroke Labs · a backstroke protocol</p>
          </div>
          <div className="md:text-right text-[10px] leading-relaxed opacity-80">
            <p>Not a medical device. If your back is screaming, see a PT.</p>
            <p className="mt-2">If your erection has been gone for three months, see a urologist. If you have been ignoring it longer than that, see a urologist faster. We are coaches, not your doctor — though, statistically, we know yours.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
