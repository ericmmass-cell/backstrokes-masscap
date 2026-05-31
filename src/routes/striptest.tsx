import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { StripFlipbook } from "@/components/StripFlipbook";
import { LiveStill } from "@/components/LiveStill";

/**
 * /striptest — throwaway motion lab. NOT linked in nav. Compares the rejected
 * 4-panel strip flipbook against LiveStill (motion derived from one coherent
 * still). Delete after the direction call.
 */
export const Route = createFileRoute("/striptest")({
  component: StripTest,
  head: () => ({ meta: [{ title: "Motion test" }] }),
});

function StripTest() {
  const [paused, setPaused] = useState(false);
  return (
    <div style={{ minHeight: "100vh", background: "#F4EFE3", color: "#2a2620", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#b07d2b" }}>
          Position motion lab
        </p>
        <h1 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 32, margin: "8px 0 18px" }}>One coherent still, made alive.</h1>
        <button
          onClick={() => setPaused((p) => !p)}
          style={{ marginBottom: 18, fontFamily: "ui-monospace, monospace", fontSize: 12, padding: "8px 16px", borderRadius: 999, border: "1px solid #722B2B", background: paused ? "#722B2B" : "transparent", color: paused ? "#F4EFE3" : "#722B2B", cursor: "pointer" }}
        >
          {paused ? "play" : "pause"}
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <figure style={{ margin: 0 }}>
            <figcaption style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(42,38,32,0.6)", marginBottom: 8 }}>
              LiveStill · proof 1
            </figcaption>
            <div style={{ border: "1px solid #e2d7bf", borderRadius: 16, overflow: "hidden" }}>
              <LiveStill src="/positions-v2-proof/spoon-clothed-proof.png" aspect={1920 / 1088} tempo={2600} paused={paused} />
            </div>
          </figure>
          <figure style={{ margin: 0 }}>
            <figcaption style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(42,38,32,0.6)", marginBottom: 8 }}>
              LiveStill · proof 2
            </figcaption>
            <div style={{ border: "1px solid #e2d7bf", borderRadius: 16, overflow: "hidden" }}>
              <LiveStill src="/positions-v2-proof/spoon-clothed-proof-2.png" aspect={1920 / 1088} tempo={2400} paused={paused} />
            </div>
          </figure>
        </div>
      </div>
    </div>
  );
}
