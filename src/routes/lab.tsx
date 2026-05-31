import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mannequin } from "@/components/Mannequin";

/**
 * /lab — throwaway direction-approval page for the shared animated mannequin
 * language. NOT linked in nav. Shows one exercise (curl-up) and one position
 * (spoon) in the SAME visual language, both moving, side by side, so the
 * direction can be approved before it scales to every move and position.
 */
export const Route = createFileRoute("/lab")({
  component: Lab,
  head: () => ({ meta: [{ title: "Lab · BackStroke" }] }),
});

function Lab() {
  const [paused, setPaused] = useState(false);
  return (
    <div style={{ minHeight: "100vh", background: "#F4EFE3", color: "#2a2620", padding: "48px 24px" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#b07d2b" }}>
          ◆ Direction check · one language, both moving
        </p>
        <h1 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 40, margin: "10px 0 4px" }}>
          The same studio.
        </h1>
        <p style={{ fontFamily: "Georgia, serif", fontSize: 16, color: "rgba(42,38,32,0.7)", maxWidth: 560 }}>
          Left: an exercise. Right: a position. Same jointed mannequin, same stage, both animated. If this direction is right, every other move and position gets built in it.
        </p>

        <button
          onClick={() => setPaused((p) => !p)}
          style={{ marginTop: 18, fontFamily: "ui-monospace, monospace", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", padding: "8px 16px", borderRadius: 999, border: "1px solid #722B2B", background: paused ? "#722B2B" : "transparent", color: paused ? "#F4EFE3" : "#722B2B", cursor: "pointer" }}
        >
          {paused ? "▶ play" : "⏸ pause"}
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 30, marginTop: 28, maxWidth: 560 }}>
          <figure style={{ margin: 0 }}>
            <figcaption style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(42,38,32,0.6)", marginBottom: 8 }}>
              Exercise · Curl-up
            </figcaption>
            <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #e2d7bf", boxShadow: "0 1px 0 rgba(42,38,32,0.04)" }}>
              <Mannequin kind="curl-up" paused={paused} />
            </div>
          </figure>

          <figure style={{ margin: 0 }}>
            <figcaption style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(42,38,32,0.6)", marginBottom: 8 }}>
              Position · Spoon
            </figcaption>
            <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #e2d7bf", boxShadow: "0 1px 0 rgba(42,38,32,0.04)" }}>
              <Mannequin kind="spoon" paused={paused} />
            </div>
          </figure>
        </div>
      </div>
    </div>
  );
}
