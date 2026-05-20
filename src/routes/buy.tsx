import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { createCheckout, type Sku } from "@/lib/stripe-checkout";

/**
 * /buy — the only place money changes hands.
 *
 * Three SKUs:
 *   1. Founding member.  $199 one-time, lifetime. 200 spots.
 *   2. Annual.           $399/year (the steady-state price).
 *   3. Monthly.          $39/month (the try-it option).
 *
 * Each button hits the `createCheckoutSession` server fn, which creates
 * a Stripe Checkout Session server-side and returns a redirect URL. The
 * browser then redirects to Stripe. After payment, Stripe redirects to
 * /buy/success (or /buy/cancel). No card details ever touch our origin.
 *
 * Until Stripe credentials are configured, the server fn returns a
 * structured error and the UI shows a contact-the-founder fallback.
 */

const createCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((data: { sku: Sku }) => data)
  .handler(async (ctx) => {
    const { sku } = ctx.data;
    return createCheckout(sku);
  });

export const Route = createFileRoute("/buy")({
  component: Buy,
  head: () => ({
    meta: [
      { title: "Buy · BackStroke" },
      {
        name: "description",
        content:
          "One price. No upsells. No supplements. No data sale. Either it's worth $199 to you or it isn't.",
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

const SKUS: Array<{
  sku: Sku;
  eyebrow: string;
  name: string;
  price: string;
  cadence: string;
  pitch: string;
  fine: string;
  primary?: boolean;
  spotsLeft?: number;
}> = [
  {
    sku: "founding",
    eyebrow: "Founding member · 200 spots · 174 left",
    name: "$199",
    price: "$199",
    cadence: "once. forever.",
    pitch:
      "Locks in the lifetime price for the first 200 humans to read this page and decide. No renewal. No fee creep. Founder mark on your account.",
    fine: "One-time payment. Full lifetime access including everything in the next two years.",
    primary: true,
    spotsLeft: 174,
  },
  {
    sku: "annual",
    eyebrow: "Steady state",
    name: "$399",
    price: "$399",
    cadence: "per year",
    pitch:
      "What this product costs after the founding window closes. Yearly renewal so we never have to count downloads as the metric.",
    fine: "Billed annually. Cancel any time. Refund window 30 days.",
  },
  {
    sku: "monthly",
    eyebrow: "Try it",
    name: "$39",
    price: "$39",
    cadence: "per month",
    pitch:
      "The smallest commitment we can offer without it being a free trial we have to gamify back. Cancel from one screen, no email, no chat.",
    fine: "Billed monthly. Cancel any time. The button is in your account, not a phone tree.",
  },
];

function Buy() {
  const [loading, setLoading] = useState<Sku | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function go(sku: Sku) {
    setError(null);
    setLoading(sku);
    try {
      // Best-effort instrumentation: fires before redirect leaves the page.
      const { track } = await import("@/lib/events");
      track("checkout.started", { sku });
      const result = await createCheckoutSession({ data: { sku } });
      if (!result.ok || !result.url) {
        setError(result.error ?? "Could not start checkout.");
        setLoading(null);
        return;
      }
      window.location.href = result.url;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      setLoading(null);
    }
  }

  return (
    <main style={{ background: PAPER, color: PAPER_INK }} className="min-h-screen">
      <SiteHeader active="buy" />

      <article className="max-w-[1100px] mx-auto px-6 md:px-10 pt-12 md:pt-20 pb-24">
        {/* eyebrow */}
        <p
          className="font-mono-label text-[10px] tracking-[0.28em] uppercase"
          style={{ color: OXBLOOD }}
        >
          Buy · One transaction · No upsells
        </p>

        <h1
          className="font-serif-display italic tracking-[-0.025em] leading-[0.95] mt-5"
          style={{ fontSize: "clamp(44px, 7vw, 96px)" }}
        >
          One price.
          <br />
          <span style={{ color: OXBLOOD }}>One product.</span>
        </h1>

        <p
          className="font-serif-display mt-6 leading-[1.5] max-w-[640px]"
          style={{ fontSize: "clamp(18px, 1.4vw, 21px)", color: PAPER_INK, opacity: 0.9 }}
        >
          No supplement at the end. No "premium" tier with the actually useful
          content behind it. No data sale. Either it is worth what we are
          asking, or it is not, and you should not buy it.
        </p>

        {/* pricing grid */}
        <div className="grid md:grid-cols-3 gap-5 mt-14">
          {SKUS.map((s) => (
            <PriceCard
              key={s.sku}
              tier={s}
              busy={loading === s.sku}
              disabled={loading !== null && loading !== s.sku}
              onBuy={() => go(s.sku)}
            />
          ))}
        </div>

        {error && (
          <div
            className="mt-8 border p-5 text-sm font-mono-label tracking-[0.04em]"
            style={{
              borderColor: OXBLOOD,
              background: "oklch(0.96 0.04 28 / 0.6)",
              color: PAPER_INK,
            }}
          >
            <div style={{ color: OXBLOOD, textTransform: "uppercase", letterSpacing: "0.22em", fontSize: 10 }}>
              Checkout not available
            </div>
            <div className="mt-2 leading-relaxed">{error}</div>
            <div className="mt-3 opacity-80">
              In the meantime, email{" "}
              <a href="mailto:eric@backstroke.app" style={{ color: OXBLOOD }}>
                eric@backstroke.app
              </a>{" "}
              and we will hold your founding spot manually.
            </div>
          </div>
        )}

        {/* the promise block */}
        <section
          className="mt-20 border-t pt-12"
          style={{ borderColor: RULE }}
        >
          <p
            className="font-mono-label text-[10px] tracking-[0.28em] uppercase"
            style={{ color: OXBLOOD }}
          >
            What every tier includes
          </p>
          <ul
            className="mt-6 grid sm:grid-cols-2 gap-x-10 gap-y-4 font-serif-display"
            style={{ fontSize: "18px", color: PAPER_INK }}
          >
            <li>The Index. Your back, scored daily, in one number.</li>
            <li>The Engine. Three-act plan for tonight, in six taps.</li>
            <li>The 8-minute protocol. Three moves. Bench-tested.</li>
            <li>Forty positions. Scored by spine load, not by influencer.</li>
            <li>Down-train when the floor is loud, not just up-train.</li>
            <li>Partner scripts you can read without flinching.</li>
            <li>The full library of recovery moves for flare days.</li>
            <li>Export your data. Delete your account. Both work the first time.</li>
          </ul>
        </section>

        {/* What we won't do */}
        <section
          className="mt-16 border-t pt-12"
          style={{ borderColor: RULE }}
        >
          <p
            className="font-mono-label text-[10px] tracking-[0.28em] uppercase"
            style={{ color: OXBLOOD }}
          >
            What we will not do, ever
          </p>
          <p
            className="font-serif-display mt-5 leading-[1.55] max-w-[680px]"
            style={{ fontSize: "19px", color: PAPER_INK, opacity: 0.92 }}
          >
            We will not sell supplements. We will not sell devices. We will
            not run an ad business pretending to be a health business. We
            will not sell your check-ins, ever, to anyone, for any amount of
            money, including the amount that would otherwise save the
            company. If the company has to go away because we will not sell
            the data, the company has to go away.
          </p>
          <p
            className="font-serif-display mt-4 italic"
            style={{ fontSize: "17px", color: OXBLOOD }}
          >
            That is the actual promise. It is not a marketing line. It is the
            constraint that ate two thirds of the venture conversations.
          </p>
        </section>

        {/* exits */}
        <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono-label text-[11px] tracking-[0.18em] uppercase">
          <Link to="/" className="hover:opacity-70 transition" style={{ color: PAPER_MUTED }}>
            ← Home
          </Link>
          <span style={{ color: RULE }}>·</span>
          <Link to="/manifesto" className="hover:opacity-70 transition" style={{ color: PAPER_MUTED }}>
            Why this exists
          </Link>
          <span style={{ color: RULE }}>·</span>
          <Link to="/about" className="hover:opacity-70 transition" style={{ color: PAPER_MUTED }}>
            Who made it
          </Link>
        </div>
      </article>
    </main>
  );
}

function PriceCard({
  tier,
  busy,
  disabled,
  onBuy,
}: {
  tier: (typeof SKUS)[number];
  busy: boolean;
  disabled: boolean;
  onBuy: () => void;
}) {
  return (
    <div
      className="border flex flex-col p-7 transition"
      style={{
        background: tier.primary ? "oklch(0.96 0.012 80)" : PAPER_2,
        borderColor: tier.primary ? OXBLOOD : RULE,
        borderWidth: tier.primary ? 1.5 : 1,
      }}
    >
      <div
        className="font-mono-label text-[10px] tracking-[0.22em] uppercase"
        style={{ color: tier.primary ? OXBLOOD : PAPER_MUTED }}
      >
        {tier.eyebrow}
      </div>

      <div className="mt-6 flex items-baseline gap-2">
        <div
          className="font-serif-display italic leading-none"
          style={{
            fontSize: 64,
            color: tier.primary ? OXBLOOD : PAPER_INK,
            letterSpacing: "-0.02em",
          }}
        >
          {tier.price}
        </div>
        <div
          className="font-mono-label text-[11px] tracking-[0.14em] uppercase"
          style={{ color: PAPER_MUTED }}
        >
          {tier.cadence}
        </div>
      </div>

      <p
        className="font-serif-display mt-5 leading-[1.5]"
        style={{ fontSize: 16, color: PAPER_INK, opacity: 0.9, minHeight: 96 }}
      >
        {tier.pitch}
      </p>

      <button
        onClick={onBuy}
        disabled={busy || disabled}
        className="mt-6 font-mono-label text-[12px] tracking-[0.18em] uppercase px-5 py-3 transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: tier.primary ? OXBLOOD : "transparent",
          color: tier.primary ? "var(--brand-paper)" : OXBLOOD,
          border: `1px solid ${OXBLOOD}`,
        }}
      >
        {busy ? "Redirecting to Stripe…" : tier.primary ? "Claim a founding spot →" : "Continue to Stripe →"}
      </button>

      <p
        className="mt-5 font-mono-label text-[9px] tracking-[0.16em] uppercase"
        style={{ color: PAPER_MUTED }}
      >
        {tier.fine}
      </p>
    </div>
  );
}
