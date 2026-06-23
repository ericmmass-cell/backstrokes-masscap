/** /for-clinicians · the practitioner bridge. The thing a PT / therapist hands the patient. */
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CLINICIAN } from "@/content/guide";
import { GuideShell, PageEyebrow, PageTitle, Dek, Blocks, RankerCTA, OX, RULE, INK } from "@/components/GuideKit";

const SITE = "https://backstroke.mass-cap.com";

/* ── "Prescribe BackStroke" Rx-pad generator ──────────────────────────────
 * The lowest-CAC line in the charter: a clinician enters their name once and
 * gets a coded link + QR their patient redeems. The patient sees "Recommended
 * by Dr. ___", converts to a normal sub, and the clinic code rides along for
 * attribution. The clinic pays nothing; the recommendation is the marketing a
 * banned-ad-rail category cannot otherwise buy. Encoded in the link, no server.
 */
function encodeRx(name: string, clinic: string): string {
  const payload = JSON.stringify({ n: name.trim(), c: clinic.trim() });
  return btoa(unescape(encodeURIComponent(payload)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function RxPad() {
  const [name, setName] = useState("");
  const [clinic, setClinic] = useState("");
  const [link, setLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (!name.trim()) return;
    const origin = typeof window !== "undefined" ? window.location.origin : SITE;
    const url = `${origin}/rx/${encodeRx(name, clinic)}`;
    setLink(url);
    setCopied(false);
    import("@/lib/events").then(({ track }) => track("rx.generated", {})).catch(() => {});
  };
  const copy = async () => {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {}
  };
  const qr = link
    ? `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(link)}`
    : null;

  return (
    <section className="rounded-2xl p-7 mt-8 print:border-0" style={{ border: `1px solid ${OX}`, background: "#FBF7EC" }}>
      <p className="font-mono-label text-[11px] tracking-[0.22em] uppercase" style={{ color: OX }}>
        ◆ Prescribe BackStroke · free, no account
      </p>
      <h3 className="font-serif-display italic mt-3 leading-tight" style={{ fontSize: "clamp(22px, 3vw, 30px)", color: INK }}>
        Make a patient link in ten seconds.
      </h3>
      <p className="mt-3 leading-relaxed" style={{ fontSize: 16, color: INK }}>
        Your name goes on it once. Print the card, scan the code in the room, or text the link. The patient lands on a
        page that says you sent them, ranks their own back, and never has to explain why they were on this website. You
        pay nothing. We are aware this is the entire business model.
      </p>

      <div className="mt-6 grid sm:grid-cols-2 gap-3 print:hidden">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Dr. Smith (required)"
          className="rounded-xl border px-4 py-3 bg-white"
          style={{ borderColor: RULE, fontSize: 16, color: INK }}
        />
        <input
          value={clinic}
          onChange={(e) => setClinic(e.target.value)}
          placeholder="Clinic or practice (optional)"
          className="rounded-xl border px-4 py-3 bg-white"
          style={{ borderColor: RULE, fontSize: 16, color: INK }}
        />
      </div>
      <button
        type="button"
        onClick={generate}
        disabled={!name.trim()}
        className="mt-4 inline-flex items-center gap-2 rounded-full font-semibold text-sm transition hover:opacity-90 disabled:opacity-40 print:hidden"
        style={{ background: OX, color: "#FBF7EC", padding: "12px 24px" }}
      >
        {link ? "Regenerate" : "Generate my Rx link →"}
      </button>

      {link && (
        <div className="mt-7 rounded-2xl border p-6 flex flex-col sm:flex-row gap-6 items-start" style={{ borderColor: RULE, background: "white" }}>
          {qr && (
            <img
              src={qr}
              alt="QR code linking to your BackStroke patient page"
              width={130}
              height={130}
              className="shrink-0 rounded-lg"
              style={{ border: `1px solid ${RULE}` }}
            />
          )}
          <div className="min-w-0">
            <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: OX }}>
              Recommended by {name.trim()}{clinic.trim() ? ` · ${clinic.trim()}` : ""}
            </p>
            <p className="font-serif-display italic mt-2 leading-snug" style={{ fontSize: 18, color: INK }}>
              "Your back and your sex life are the same nervous system. Start here."
            </p>
            <code className="block mt-3 text-[12px] break-all" style={{ color: OX }}>{link}</code>
            <div className="mt-4 flex flex-wrap gap-3 print:hidden">
              <button type="button" onClick={copy} className="rounded-full font-semibold text-sm transition hover:opacity-90" style={{ background: INK, color: "#FBF7EC", padding: "10px 20px" }}>
                {copied ? "Copied" : "Copy link"}
              </button>
              <button type="button" onClick={() => window.print()} className="rounded-full font-semibold text-sm transition hover:opacity-90" style={{ background: "transparent", color: INK, border: `1.5px solid ${RULE}`, padding: "10px 20px" }}>
                Print the card
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export const Route = createFileRoute("/for-clinicians")({
  component: ForClinicians,
  head: () => ({
    meta: [
      { title: `${CLINICIAN.seoTitle} · BackStroke` },
      { name: "description", content: CLINICIAN.seoDescription },
      { property: "og:title", content: CLINICIAN.seoTitle },
      { property: "og:description", content: CLINICIAN.seoDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/for-clinicians` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function ForClinicians() {
  const c = CLINICIAN;
  return (
    <GuideShell>
      <PageEyebrow>{c.eyebrow}</PageEyebrow>
      <PageTitle>{c.h1}</PageTitle>
      <Dek>{c.dek}</Dek>

      <Blocks blocks={c.body} />

      <p className="font-serif-display italic leading-snug my-10 pl-5" style={{ fontSize: "clamp(22px, 3vw, 30px)", borderLeft: `3px solid ${OX}`, color: INK }}>
        {c.pullquote}
      </p>

      {/* patient handout */}
      <section className="rounded-2xl p-7" style={{ border: `1px solid ${RULE}`, background: "#FBF7EC" }}>
        <p className="font-mono-label text-[11px] tracking-[0.22em] uppercase" style={{ color: OX }}>{c.handout.title}</p>
        <ul className="mt-4 flex flex-col gap-3">
          {c.handout.lines.map((l, i) => (
            <li key={i} className="flex gap-3 leading-relaxed" style={{ fontSize: 16 }}>
              <span aria-hidden className="shrink-0 font-mono-label text-[12px]" style={{ color: OX }}>{i + 1}</span>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </section>

      <RxPad />

      <RankerCTA line={c.cta} />
    </GuideShell>
  );
}
