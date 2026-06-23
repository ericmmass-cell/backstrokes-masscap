import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";

/**
 * /rx/$code · the patient landing for a clinician's "Prescribe BackStroke" link.
 *
 * The clinician's name + clinic are encoded in the code (base64url JSON, no
 * server). The patient sees who sent them, the clinic code is stored locally for
 * attribution so it can ride along to checkout, and they are routed into the free
 * ranker / diagnosis and then the product. The lowest-CAC line in the charter:
 * a doctor's recommendation is the one piece of marketing this category permits.
 */

export const Route = createFileRoute("/rx/$code")({
  component: Rx,
  head: () => ({
    meta: [
      { title: "Recommended by your clinician · BackStroke" },
      {
        name: "description",
        content:
          "Your clinician sent you here. Back pain and an active sex life are the same nervous system; this is where to start, free, no account.",
      },
    ],
  }),
});

const PAPER = "oklch(0.94 0.018 78)";
const INK = "oklch(0.18 0.01 40)";
const MUTED = "oklch(0.45 0.02 40)";
const RULE = "oklch(0.86 0.025 70)";
const OX = "var(--brand-oxblood)";

function decodeRx(code: string): { name: string; clinic: string } | null {
  try {
    const b64 = code.replace(/-/g, "+").replace(/_/g, "/");
    const obj = JSON.parse(decodeURIComponent(escape(atob(b64))));
    if (obj && typeof obj.n === "string" && obj.n) {
      return { name: obj.n, clinic: typeof obj.c === "string" ? obj.c : "" };
    }
  } catch {}
  return null;
}

function Rx() {
  const { code } = useParams({ from: "/rx/$code" });
  const [ref, setRef] = useState<{ name: string; clinic: string } | null>(null);

  useEffect(() => {
    const decoded = decodeRx(code);
    setRef(decoded);
    // Store the referral for attribution (read at checkout) and log the landing.
    try {
      localStorage.setItem("bs.rx", JSON.stringify({ code, name: decoded?.name ?? "", clinic: decoded?.clinic ?? "", t: Date.now() }));
    } catch {}
    import("@/lib/events").then(({ track }) => track("rx.landed", { code })).catch(() => {});
  }, [code]);

  const who = ref?.name || "your clinician";
  const clinicLine = ref?.clinic ? ` at ${ref.clinic}` : "";

  return (
    <main style={{ background: PAPER, color: INK }} className="min-h-screen">
      <SiteHeader />
      <article className="max-w-[680px] mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-24">
        <p className="font-mono-label text-[10px] tracking-[0.28em] uppercase" style={{ color: OX }}>
          ◆ Recommended by {who}{clinicLine}
        </p>
        <h1 className="font-serif-display italic tracking-[-0.025em] leading-[0.98] mt-5" style={{ fontSize: "clamp(36px, 5.5vw, 68px)" }}>
          They sent you to the honest one.
        </h1>
        <p className="font-serif-display mt-6 leading-[1.55]" style={{ fontSize: "clamp(18px, 1.4vw, 21px)", color: INK, opacity: 0.9 }}>
          {who} thinks your back and your sex life are the same nervous system, because they are. BackStroke is the
          part nobody in the exam room has time to walk you through: which positions your spine can actually tolerate,
          and the eight-minute protocol that widens that list over time. No supplement at the end. No lecture.
        </p>
        <p className="font-serif-display italic mt-5 leading-snug" style={{ fontSize: 18, color: MUTED }}>
          Start free. Nobody needs to know you were here, including us, more than necessary.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            to="/rank"
            search={{ t: undefined, r: undefined }}
            className="inline-flex items-center gap-2 rounded-full font-semibold text-sm transition hover:opacity-90"
            style={{ background: OX, color: PAPER, padding: "14px 26px" }}
          >
            Rank my positions free →
          </Link>
          <Link
            to="/diagnosis"
            className="inline-flex items-center gap-2 rounded-full font-semibold text-sm transition hover:opacity-90"
            style={{ background: "transparent", color: INK, border: `1.5px solid ${RULE}`, padding: "14px 26px" }}
          >
            Or the deadpan diagnosis first
          </Link>
        </div>

        <div className="mt-12 pt-8" style={{ borderTop: `1px solid ${RULE}` }}>
          <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
            When you are ready for the daily protocol and the full position engine, it lives here.{" "}
            <Link to="/buy" className="font-semibold underline underline-offset-4 hover:opacity-80 transition" style={{ color: OX }}>
              See what it costs →
            </Link>
          </p>
        </div>

        <p className="mt-10 text-xs italic leading-relaxed" style={{ color: MUTED }}>
          Education, not a diagnosis. If your back comes with numbness, weakness, fever, unexplained weight loss, or any
          loss of bladder or bowel control, this is the moment to call {who} back, today, not an app.
        </p>
      </article>
    </main>
  );
}
