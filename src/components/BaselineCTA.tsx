import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

/**
 * Single-action CTA. Replaces App Store / Google Play badges (web-first PWA).
 * On click, routes to the 7-minute baseline. Stripe checkout is stubbed —
 * wire `STRIPE_PRICE_ID` and a server route under /api/checkout in a later pass.
 */
export function BaselineCTA({ size = "lg" }: { size?: "lg" | "md" }) {
  const pad = size === "lg" ? "px-8 py-5" : "px-6 py-3";
  const text = size === "lg" ? "text-base" : "text-sm";

  return (
    <div className="flex flex-col items-center sm:items-start gap-3">
      <Link
        to="/protocol"
        className={`inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-amber)] text-[var(--brand-ink)] font-semibold hover:opacity-90 transition ${pad} ${text}`}
        style={{ boxShadow: "var(--glow-teal)" }}
      >
        Run the 7-minute baseline
        <ArrowUpRight className="w-4 h-4" />
      </Link>
      <p className="font-mono-label text-[9px] tracking-[0.18em] uppercase text-muted-foreground">
        ◆ web-first · no app store · two weeks free · $24.99/mo after, billed monthly
      </p>
    </div>
  );
}
