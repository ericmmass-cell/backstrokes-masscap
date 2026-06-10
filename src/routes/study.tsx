/** /study · the number nobody measured. Thesis + method + privacy + the real survey instrument. */
import { createFileRoute } from "@tanstack/react-router";
import { STUDY } from "@/content/guide";
import { GuideShell, PageEyebrow, PageTitle, Dek, Blocks, OX, RULE, INK, MUTED, PAPER } from "@/components/GuideKit";

const SITE = "https://backstroke.mass-cap.com";

export const Route = createFileRoute("/study")({
  component: StudyPage,
  head: () => ({
    meta: [
      { title: `${STUDY.seoTitle}` },
      { name: "description", content: STUDY.seoDescription },
      { property: "og:title", content: STUDY.seoTitle },
      { property: "og:description", content: STUDY.seoDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/study` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function StudyPage() {
  const s = STUDY;
  return (
    <GuideShell>
      <PageEyebrow>{s.eyebrow}</PageEyebrow>
      <PageTitle>{s.h1}</PageTitle>
      <Dek>{s.dek}</Dek>

      <Blocks blocks={s.thesis} />

      {/* method */}
      <section className="mt-12">
        <p className="font-mono-label text-[11px] tracking-[0.24em] uppercase" style={{ color: OX }}>How it works</p>
        <ul className="mt-4 flex flex-col gap-2.5">
          {s.method.map((m, i) => (
            <li key={i} className="flex gap-3 leading-relaxed" style={{ fontSize: 16 }}>
              <span aria-hidden className="shrink-0" style={{ color: OX }}>&middot;</span>
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* privacy */}
      <section className="mt-10 rounded-2xl p-7" style={{ border: `1px solid ${RULE}`, background: "#FBF7EC" }}>
        <p className="font-mono-label text-[11px] tracking-[0.22em] uppercase" style={{ color: OX }}>Your privacy, plainly</p>
        <ul className="mt-4 flex flex-col gap-2.5">
          {s.privacy.map((p, i) => (
            <li key={i} className="flex gap-3 leading-relaxed" style={{ fontSize: 15.5, color: "oklch(0.38 0.015 40)" }}>
              <span aria-hidden className="shrink-0" style={{ color: OX }}>&middot;</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* the instrument */}
      <section className="mt-12">
        <p className="font-mono-label text-[11px] tracking-[0.24em] uppercase" style={{ color: OX }}>The questions we ask</p>
        <div className="mt-6 flex flex-col gap-7">
          {s.survey.map((q, i) => (
            <div key={i}>
              <p className="font-serif-display leading-snug" style={{ fontSize: 18, color: INK }}>
                <span className="font-mono-label text-[12px]" style={{ color: OX, marginRight: 8 }}>{i + 1}</span>
                {q.q}
              </p>
              {q.options.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {q.options.map((o, j) => (
                    <span key={j} className="text-[13px] rounded-full px-3 py-1.5" style={{ border: `1px solid ${RULE}`, color: "oklch(0.42 0.02 40)", background: "#FBF7EC" }}>
                      {o}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-[13px] italic" style={{ color: MUTED }}>Open text. Say as much or as little as you like.</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* results note + be counted */}
      <section className="mt-12 rounded-2xl p-7" style={{ border: `1px solid ${OX}`, background: "#FBF7EC" }}>
        <p className="text-sm leading-relaxed italic" style={{ color: "oklch(0.4 0.015 40)" }}>{s.resultsNote}</p>
        <p className="font-serif-display italic leading-snug mt-5" style={{ fontSize: "clamp(20px, 2.6vw, 26px)", color: INK }}>{s.cta}</p>
        <a
          href="mailto:eric@backstroke.app?subject=Count%20me%20in%20(BackStroke%20study)&body=I%20want%20to%20be%20counted%20when%20the%20survey%20opens."
          className="mt-5 inline-flex items-center gap-2 rounded-full font-semibold text-sm transition hover:opacity-90"
          style={{ background: OX, color: PAPER, padding: "14px 26px" }}
        >
          Be counted →
        </a>
        <p className="mt-4 text-xs italic" style={{ color: MUTED }}>
          Collection is opening shortly. This registers your interest, separate from the anonymous survey itself.
        </p>
      </section>
    </GuideShell>
  );
}
