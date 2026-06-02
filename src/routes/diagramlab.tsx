import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PositionGuide, type Role } from "@/components/PositionGuide";
import { PositionImage } from "@/components/PositionImage";
import type { PictogramKey } from "@/components/Pictogram";

/** which keys have a verified, accurate illustration */
const HAS_IMAGE = new Set<PictogramKey>([
  "spoon", "cowgirl-upright", "doggy-kneeling", "scissor", "seated-lap", "side-T",
]);

/** /diagramlab — throwaway review page. NOT in nav. Deleted before ship. */
export const Route = createFileRoute("/diagramlab")({
  component: DiagramLab,
  head: () => ({ meta: [{ title: "Position card lab" }] }),
});

const ALL: { key: PictogramKey; label: string }[] = [
  { key: "spoon", label: "Spoon" },
  { key: "supine-knees-up", label: "Modified missionary (bolster)" },
  { key: "missionary", label: "Missionary" },
  { key: "side-T", label: "Side-lying T" },
  { key: "edge-bed", label: "Edge of bed" },
  { key: "cowgirl-upright", label: "Receiver on top" },
  { key: "doggy-supported", label: "Supported rear-entry" },
  { key: "doggy-kneeling", label: "Rear-entry kneeling" },
  { key: "scissor", label: "Side-lying scissor" },
  { key: "seated-lap", label: "Seated lap" },
  { key: "standing", label: "Standing, rear" },
];

const ROLES: { id: Role; label: string }[] = [
  { id: "receiver", label: "Receiver" },
  { id: "giver", label: "Giver" },
  { id: "both", label: "Both" },
];

function DiagramLab() {
  const [role, setRole] = useState<Role>("receiver");
  const only =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("only")
      : null;
  const keys = only ? ALL.filter((k) => only.split(",").includes(k.key)) : ALL;
  return (
    <div style={{ minHeight: "100vh", background: "#F4EFE3", color: "#2a2620", padding: "28px 20px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "ui-monospace, monospace",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#8a4a3b",
            marginBottom: 14,
          }}
        >
          Position cards · whose back are we protecting?
        </p>
        {/* the dependency path: pick the role, the cards tailor to it */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28, position: "sticky", top: 0, paddingTop: 6, paddingBottom: 10, background: "#F4EFE3", zIndex: 2 }}>
          {ROLES.map((r) => {
            const active = role === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                style={{
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 12,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "9px 18px",
                  borderRadius: 999,
                  cursor: "pointer",
                  border: `1px solid ${active ? "#722B2B" : "#cdbf9f"}`,
                  background: active ? "#722B2B" : "transparent",
                  color: active ? "#F4EFE3" : "#6b5d48",
                }}
              >
                {r.label}
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          {keys.map(({ key, label }) => (
            <article
              key={key}
              style={{ border: "1px solid #d9ccae", borderRadius: 16, background: "#FBF7EC", padding: 24 }}
            >
              <h2
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontStyle: "italic",
                  fontSize: 30,
                  lineHeight: 1,
                  margin: "0 0 16px",
                }}
              >
                {label}.
              </h2>
              {HAS_IMAGE.has(key) ? (
                <div style={{ maxWidth: 360, marginBottom: 20 }}>
                  <PositionImage
                    src={`/positions/${key}.png`}
                    alt={`${label} illustration`}
                  />
                </div>
              ) : (
                <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "#9a7a5a", marginBottom: 20 }}>
                  Illustration: sourcing accurate art · placeholder removed
                </p>
              )}
              <PositionGuide pkey={key} role={role} />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
