import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";

/**
 * /buy/cancel · Stripe's redirect target when the user closes the
 * Checkout window or hits "back" before paying. No moralizing. No
 * "are you sure?" pop-up. We just say: the door is still open.
 */

export const Route = createFileRoute("/buy_/cancel")({
  component: Cancel,
  validateSearch: (s) =>
    ({ sku: typeof s.sku === "string" ? s.sku : undefined } as { sku?: string }),
  head: () => ({ meta: [{ title: "Not yet · BackStroke" }] }),
});

const PAPER = "oklch(0.94 0.018 78)";
const PAPER_INK = "oklch(0.18 0.01 40)";
const PAPER_MUTED = "oklch(0.45 0.02 40)";
const RULE = "oklch(0.86 0.025 70)";
const OXBLOOD = "var(--brand-oxblood)";

function Cancel() {
  const { sku } = Route.useSearch();
  useEffect(() => {
    import("@/lib/events").then(({ track }) => {
      track("checkout.cancelled", { sku });
    });
  }, [sku]);

  return (
    <main style={{ background: PAPER, color: PAPER_INK }} className="min-h-screen">
      <SiteHeader />

      <article className="max-w-[680px] mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-24">
        <p
          className="font-mono-label text-[10px] tracking-[0.28em] uppercase"
          style={{ color: OXBLOOD }}
        >
          Checkout closed · No charge made
        </p>

        <h1
          className="font-serif-display italic tracking-[-0.025em] leading-[0.98] mt-6"
          style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
        >
          Take your time.
        </h1>

        <p
          className="font-serif-display mt-6 leading-[1.55]"
          style={{ fontSize: "clamp(18px, 1.4vw, 21px)", color: PAPER_INK, opacity: 0.92 }}
        >
          Nothing was charged. The founding window is still open. If you
          want to think about it for a week, the page will be here. If you
          want a question answered first, the email below is a real inbox
          that gets read.
        </p>

        <p
          className="font-serif-display italic mt-5"
          style={{ fontSize: 18, color: OXBLOOD }}
        >
          <a href="mailto:eric@backstroke.app" className="hover:opacity-70 transition">
            eric@backstroke.app
          </a>
        </p>

        <div
          className="mt-12 border-t pt-10"
          style={{ borderColor: RULE }}
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono-label text-[11px] tracking-[0.18em] uppercase">
            <Link to="/buy" className="hover:opacity-70 transition" style={{ color: OXBLOOD }}>
              ← Back to pricing
            </Link>
            <span style={{ color: RULE }}>·</span>
            <Link to="/" className="hover:opacity-70 transition" style={{ color: PAPER_MUTED }}>
              Home
            </Link>
            <span style={{ color: RULE }}>·</span>
            <Link to="/manifesto" className="hover:opacity-70 transition" style={{ color: PAPER_MUTED }}>
              Read the manifesto
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
