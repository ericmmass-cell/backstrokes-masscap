import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { createCheckout, type Sku } from "@/lib/stripe-checkout";

/**
 * /buy · the only place money changes hands.
 *
 * Tiers (charter pricing; the recurring three are the grid, founding is demoted):
 *   1. Couples annual.   $129/yr, two linked seats (the hero).
 *   2. Solo annual.      $79/yr (the default).
 *   3. Solo monthly.     $14/mo (pay more to commit less).
 *   4. Founding.         $249 once, capped at 200, counted as runway not MRR.
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
  .inputValidator((data: { sku: Sku; clinicId?: string }) => data)
  .handler(async (ctx) => {
    const { sku, clinicId } = ctx.data;
    return createCheckout(sku, clinicId);
  });

export const Route = createFileRoute("/buy")({
  component: Buy,
  head: () => ({
    meta: [
      { title: "Buy · BackStroke" },
      {
        name: "description",
        content:
          "Plain pricing. No upsells, no supplements, no data sale. A couples plan, a solo plan, and a capped founding tier. Either it is worth it or it is not.",
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

// The recurring tiers, in the order the charter wants them read: couples is the
// hero (back pain is a two-person problem; bill it that way), solo-annual is the
// sensible default, monthly is the small "pay more to commit less" option. The
// lifetime SKU is demoted to a quiet capped line below the grid, on purpose:
// every lifetime sale permanently removes an MRR customer.
const SKUS: Array<{
  sku: Sku;
  eyebrow: string;
  name: string;
  price: string;
  cadence: string;
  pitch: string;
  fine: string;
  primary?: boolean;
}> = [
  {
    sku: "couples",
    eyebrow: "Two people · one spine problem · a shared interest in the outcome",
    name: "$129",
    price: "$129",
    cadence: "per year, two seats",
    pitch:
      "Back pain in bed is a negotiation between two people, and the one who feels the relief is usually not the one who bought the app. Two linked accounts, two Indexes, one price. The partner gets their own login, which is also the single best reason either of you sticks with it.",
    fine: "Billed annually, covers two linked accounts. Cancel any time. About $5.40 a month each.",
    primary: true,
  },
  {
    sku: "annual",
    eyebrow: "Solo · the sensible one",
    name: "$79",
    price: "$79",
    cadence: "per year",
    pitch:
      "One account, billed once a year, which is the honest cadence for a back: you do not renew your interest in not being in pain every thirty days. Works out to about $6.58 a month, paid before the flare-up-and-forget cycle can talk you out of it.",
    fine: "Billed annually. Cancel any time. Refund window 30 days.",
  },
  {
    sku: "monthly",
    eyebrow: "Solo · for the commitment-averse",
    name: "$14",
    price: "$14",
    cadence: "per month",
    pitch:
      "For people who treat commitment the way they treat their lumbar spine: warily. It costs more over a year than the annual plan, which is the universe's gentle way of rewarding people who plan ahead. The cancel button is one screen deep, not a hostage negotiation.",
    fine: "Billed monthly. Cancel any time. The button is in your account, not a phone tree.",
  },
];

// Demoted, capped, and counted as runway rather than MRR.
const FOUNDING: { sku: Sku; price: string; pitch: string; fine: string } = {
  sku: "founding",
  price: "$249",
  pitch:
    "A one-time pre-sale to fund the build, for the first 200 people who decide on day one. Lifetime access, no renewal, founder mark on the account. We are not making this the loud option, because a lifetime sale is your best annuity sold for about six months of its own value. When the 200 are gone, it is gone.",
  fine: "One-time payment, hard-capped at 200, then closed for good. Not a recurring price.",
};

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
      // Carry the clinician-referral code (from an /rx/ link) into checkout so
      // the charter's lowest-CAC line is attributable in Stripe.
      let clinicId: string | undefined;
      try {
        const rx = JSON.parse(localStorage.getItem("bs.rx") ?? "null");
        if (rx && typeof rx.code === "string") clinicId = rx.code;
      } catch {}
      const result = await createCheckoutSession({ data: { sku, clinicId } });
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
          className="font-serif-display italic mt-6 leading-[1.5] max-w-[640px]"
          style={{ fontSize: "clamp(17px, 1.3vw, 20px)", color: OXBLOOD }}
        >
          The wellness industry has sold you a $66 jade egg, a $400 standing
          desk you stand at twice, and a fascia gun that lives in a drawer. We
          are asking for less than the jade egg, and unlike the jade egg, this
          one has a mechanism of action.
        </p>

        <p
          className="font-serif-display mt-5 leading-[1.5] max-w-[640px]"
          style={{ fontSize: "clamp(18px, 1.4vw, 21px)", color: PAPER_INK, opacity: 0.9 }}
        >
          No supplement at the end. No "premium" tier with the actually useful
          content behind it. No data sale. Either it is worth what we are
          asking, or it is not, and you should not buy it.
        </p>

        {/* pricing grid · the recurring tiers */}
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

        {/* Founding · demoted to a quiet line, not a hero card */}
        <div
          className="mt-5 border px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          style={{ borderColor: RULE, background: "oklch(0.96 0.012 80)" }}
        >
          <div className="max-w-[640px]">
            <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: OXBLOOD }}>
              Founding · {FOUNDING.price} once · 200 spots, then closed for good
            </p>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: PAPER_INK, opacity: 0.85 }}>
              {FOUNDING.pitch}
            </p>
            <p className="mt-1.5 text-[12px] italic" style={{ color: PAPER_MUTED }}>{FOUNDING.fine}</p>
          </div>
          <button
            type="button"
            onClick={() => go(FOUNDING.sku)}
            disabled={loading !== null && loading !== FOUNDING.sku}
            className="shrink-0 inline-flex items-center justify-center rounded-full font-semibold text-sm transition hover:opacity-90 disabled:opacity-40"
            style={{ background: "transparent", color: OXBLOOD, border: `1.5px solid ${OXBLOOD}`, padding: "11px 22px" }}
          >
            {loading === FOUNDING.sku ? "Starting…" : `Claim a founding spot · ${FOUNDING.price}`}
          </button>
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
            <li>The Engine. Three-act plan for tonight, in five taps.</li>
            <li>The 8-minute protocol. Three moves. Bench-tested.</li>
            <li>Forty positions. Scored by spine load, not by influencer.</li>
            <li>Decompression for flare days, not just endurance for good ones.</li>
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
            className="font-serif-display mt-4 leading-[1.55] max-w-[680px]"
            style={{ fontSize: "18px", color: PAPER_INK, opacity: 0.92 }}
          >
            We will not invent a Pro tier whose only feature is the search bar.
            We will not email you a re-engagement campaign written by a growth
            intern who has never met your back. And we will not, under any
            circumstances, sell you a $90 jade egg, a $300 posture-correcting
            bra strap, or a subscription to breathing.
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
