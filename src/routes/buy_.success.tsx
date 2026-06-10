import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";

/**
 * /buy/success: Stripe's redirect target on successful payment.
 *
 * Stripe appends ?session_id=cs_test_... and our ?sku=... query string.
 * We fire a `checkout.completed` event with both so the event store has
 * a permanent record of which SKU was purchased and when. The next time
 * the dashboard loads, the Index continues to include this user's
 * activity, and a future `getFoundingMemberCount()` query against
 * Supabase can compute the actual spots-remaining number live.
 */

export const Route = createFileRoute("/buy_/success")({
  component: Success,
  validateSearch: (s) =>
    ({
      session_id: typeof s.session_id === "string" ? s.session_id : undefined,
      sku: typeof s.sku === "string" ? s.sku : undefined,
    } as { session_id?: string; sku?: string }),
  head: () => ({
    meta: [{ title: "Welcome · BackStroke" }],
  }),
});

const PAPER = "oklch(0.94 0.018 78)";
const PAPER_INK = "oklch(0.18 0.01 40)";
const PAPER_MUTED = "oklch(0.45 0.02 40)";
const RULE = "oklch(0.86 0.025 70)";
const OXBLOOD = "var(--brand-oxblood)";

function Success() {
  const { session_id, sku } = Route.useSearch();

  useEffect(() => {
    import("@/lib/events").then(({ track }) => {
      track("checkout.completed", { sku, session_id });
    });
    // Mark the local user as signed in so the dashboard greets them.
    try {
      const raw = localStorage.getItem("bs.user");
      const prior = raw ? JSON.parse(raw) : {};
      localStorage.setItem(
        "bs.user",
        JSON.stringify({ ...prior, signedIn: true, sku, since: new Date().toISOString() })
      );
    } catch {}
  }, [session_id, sku]);

  return (
    <main style={{ background: PAPER, color: PAPER_INK }} className="min-h-screen">
      <SiteHeader />

      <article className="max-w-[720px] mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-24">
        <p
          className="font-mono-label text-[10px] tracking-[0.28em] uppercase"
          style={{ color: OXBLOOD }}
        >
          Payment received · Account created
        </p>

        <h1
          className="font-serif-display italic tracking-[-0.025em] leading-[0.98] mt-6"
          style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
        >
          You are in.
        </h1>

        <p
          className="font-serif-display mt-6 leading-[1.55]"
          style={{ fontSize: "clamp(18px, 1.4vw, 21px)", color: PAPER_INK, opacity: 0.92 }}
        >
          {sku === "founding"
            ? "Founding member, locked in. The price does not change for you. Ever. The receipt is on its way from Stripe."
            : "Your account is active. The first invoice receipt is on its way from Stripe."}
        </p>

        <p
          className="font-serif-display italic mt-5 leading-[1.55]"
          style={{ fontSize: "clamp(16px, 1.2vw, 18px)", color: PAPER_MUTED }}
        >
          Confirmation reference:{" "}
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}>
            {session_id ?? "·"}
          </span>
        </p>

        <div
          className="mt-12 border-t pt-10"
          style={{ borderColor: RULE }}
        >
          <p
            className="font-mono-label text-[10px] tracking-[0.28em] uppercase"
            style={{ color: PAPER_MUTED }}
          >
            What happens next
          </p>
          <ol
            className="font-serif-display mt-5 space-y-3 leading-[1.55]"
            style={{ fontSize: 18, color: PAPER_INK }}
          >
            <li>
              <b style={{ color: OXBLOOD }}>01.</b> Take the first check-in.
              Two minutes. Establishes your baseline Index.
            </li>
            <li>
              <b style={{ color: OXBLOOD }}>02.</b> Run the Engine for
              tonight. Five taps. Get a plan.
            </li>
            <li>
              <b style={{ color: OXBLOOD }}>03.</b> Print the nightstand
              card. Leave it. Forget about us until tomorrow.
            </li>
          </ol>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link
            to="/dashboard"
            className="font-mono-label text-[12px] tracking-[0.18em] uppercase px-5 py-3 transition hover:opacity-90"
            style={{ background: OXBLOOD, color: "var(--brand-paper)" }}
          >
            Take the first check-in →
          </Link>
          <a
            href="/engine.html"
            className="font-mono-label text-[12px] tracking-[0.18em] uppercase px-5 py-3 transition hover:opacity-90"
            style={{ border: `1px solid ${OXBLOOD}`, color: OXBLOOD }}
          >
            Open the Engine
          </a>
        </div>
      </article>
    </main>
  );
}
