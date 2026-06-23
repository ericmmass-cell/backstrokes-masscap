/**
 * Stripe Checkout session creator.
 *
 * No Stripe SDK. We hit the REST API directly with fetch so the bundle
 * stays small and works on Cloudflare Workers without polyfills. The
 * server function in `src/routes/buy.tsx` calls this; the response is
 * `{ url }` and the browser is redirected.
 *
 * Env vars required (set in .env.local for dev, Cloudflare secrets for
 * production). The CHARTER amounts the Stripe Price objects must carry
 * (the IDs are pointers; the dollar figures live in Stripe and must be
 * created there to match the storefront copy in buy.tsx):
 *   STRIPE_SECRET_KEY              sk_test_... or sk_live_...
 *   STRIPE_PRICE_FOUNDING          one-time, $249 (lifetime, capped at 200)
 *   STRIPE_PRICE_MONTHLY           recurring, $14/mo (the impatient option)
 *   STRIPE_PRICE_ANNUAL            recurring, $79/yr (solo, the default)
 *   STRIPE_PRICE_COUPLES           recurring, $129/yr (two linked seats, the hero)
 *   PUBLIC_SITE_URL                e.g. https://backstroke.mass-cap.com
 *
 * When the keys are not present, the server fn returns a structured
 * error the UI can display ("Checkout is not configured yet") rather
 * than crashing. So while Stripe is unconfigured there is no risk of a
 * displayed price diverging from a charged price: nothing charges at all.
 */

export type Sku = "founding" | "monthly" | "annual" | "couples";

export interface CheckoutResult {
  ok: boolean;
  url?: string;
  error?: string;
}

interface StripeConfig {
  secret: string;
  prices: Record<Sku, string>;
  siteUrl: string;
}

function readConfig(): StripeConfig | { error: string } {
  // process.env is the standard interface on Node / Workers via @cloudflare/vite-plugin
  // env. import.meta.env doesn't expose secrets server-side in dev, so we use process.env.
  const e: Record<string, string | undefined> =
    typeof process !== "undefined" && process.env ? (process.env as Record<string, string | undefined>) : {};
  const secret = e.STRIPE_SECRET_KEY;
  const founding = e.STRIPE_PRICE_FOUNDING;
  const monthly = e.STRIPE_PRICE_MONTHLY;
  const annual = e.STRIPE_PRICE_ANNUAL;
  const couples = e.STRIPE_PRICE_COUPLES;
  const siteUrl = e.PUBLIC_SITE_URL ?? "http://localhost:8080";
  if (!secret) return { error: "STRIPE_SECRET_KEY is not set." };
  if (!founding || !monthly || !annual || !couples)
    return {
      error:
        "STRIPE_PRICE_FOUNDING, STRIPE_PRICE_MONTHLY, STRIPE_PRICE_ANNUAL, and STRIPE_PRICE_COUPLES must all be set.",
    };
  return {
    secret,
    prices: { founding, monthly, annual, couples },
    siteUrl,
  };
}

/**
 * Encode a JS object as application/x-www-form-urlencoded the way Stripe
 * expects. Nested keys use the bracket convention: line_items[0][price].
 */
function encodeForm(obj: Record<string, unknown>, prefix = ""): string {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const k = prefix ? `${prefix}[${key}]` : key;
    if (value === null || value === undefined) continue;
    if (Array.isArray(value)) {
      value.forEach((v, i) => {
        if (typeof v === "object" && v !== null) {
          parts.push(encodeForm(v as Record<string, unknown>, `${k}[${i}]`));
        } else {
          parts.push(`${encodeURIComponent(`${k}[${i}]`)}=${encodeURIComponent(String(v))}`);
        }
      });
    } else if (typeof value === "object") {
      parts.push(encodeForm(value as Record<string, unknown>, k));
    } else {
      parts.push(`${encodeURIComponent(k)}=${encodeURIComponent(String(value))}`);
    }
  }
  return parts.join("&");
}

/** Create a Stripe Checkout Session and return the redirect URL. `clinicId` is
 * the clinician-referral code (from an /rx/ link) carried into Stripe metadata
 * so the charter's lowest-CAC line can be attributed. */
export async function createCheckout(sku: Sku, clinicId?: string): Promise<CheckoutResult> {
  const cfg = readConfig();
  if ("error" in cfg) return { ok: false, error: cfg.error };

  const isRecurring = sku !== "founding";
  const body = encodeForm({
    mode: isRecurring ? "subscription" : "payment",
    line_items: [{ price: cfg.prices[sku], quantity: 1 }],
    success_url: `${cfg.siteUrl}/buy/success?session_id={CHECKOUT_SESSION_ID}&sku=${sku}`,
    cancel_url: `${cfg.siteUrl}/buy/cancel?sku=${sku}`,
    // Let people pay with anything Stripe supports in the account.
    automatic_tax: { enabled: true },
    allow_promotion_codes: true,
    metadata: { sku, clinic_id: clinicId && clinicId.length <= 120 ? clinicId : "" },
  });

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cfg.secret}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!res.ok) {
    let detail = "Stripe rejected the checkout request.";
    try {
      const json = (await res.json()) as { error?: { message?: string } };
      if (json.error?.message) detail = json.error.message;
    } catch {}
    return { ok: false, error: detail };
  }

  const json = (await res.json()) as { url?: string };
  if (!json.url) return { ok: false, error: "Stripe returned no redirect URL." };
  return { ok: true, url: json.url };
}
