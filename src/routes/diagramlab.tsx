import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PositionGuide, type Role } from "@/components/PositionGuide";
import { PositionDiagram } from "@/components/PositionDiagram";
import type { PictogramKey } from "@/components/Pictogram";

/** /diagramlab — polished position-library review page. NOT in nav. */
export const Route = createFileRoute("/diagramlab")({
  component: DiagramLab,
  head: () => ({ meta: [{ title: "Position library · BackStroke" }] }),
});

const ALL: { key: PictogramKey; label: string }[] = [
  { key: "spoon", label: "Spoon" },
  { key: "cowgirl-upright", label: "Receiver on top" },
  { key: "doggy-kneeling", label: "Rear-entry, kneeling" },
  { key: "scissor", label: "Side-lying scissor" },
  { key: "seated-lap", label: "Seated lap" },
  { key: "side-T", label: "Side-lying T" },
  { key: "supine-knees-up", label: "Modified missionary" },
  { key: "missionary", label: "Missionary" },
  { key: "edge-bed", label: "Edge of bed" },
  { key: "doggy-supported", label: "Supported rear-entry" },
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
    <main style={{ minHeight: "100vh", background: "var(--brand-paper, #F4EFE3)", color: "var(--brand-paper-ink, #2a2620)" }}>
      <div className="mx-auto px-6 md:px-10 py-12 md:py-16" style={{ maxWidth: 1180 }}>
        {/* ── header ── */}
        <header style={{ maxWidth: 760 }}>
          <p className="font-mono-label text-[11px] tracking-[0.28em] uppercase" style={{ color: "var(--brand-oxblood)" }}>
            The position library
          </p>
          <h1
            className="font-serif-display italic mt-4 leading-[0.98] tracking-[-0.02em]"
            style={{ fontSize: "clamp(34px, 6vw, 64px)" }}
          >
            Sex, ranked by what your spine will sign off on.
          </h1>
          <p className="mt-5 text-base md:text-lg leading-relaxed" style={{ color: "oklch(0.42 0.02 40)" }}>
            Everyone knows the positions. Nobody tells you which ones quietly wreck a lower back,
            or how to run the good ones so they stay good. We do. And because the same position is
            a gift for one of you and a trap for the other, you tell us whose back is the problem.
          </p>
        </header>

        {/* ── role control ── */}
        <div className="mt-9 flex flex-col gap-3">
          <p className="font-mono-label text-[10px] tracking-[0.24em] uppercase" style={{ color: "oklch(0.5 0.02 40)" }}>
            Whose back are we saving?
          </p>
          <div
            role="radiogroup"
            aria-label="Whose back to protect"
            className="inline-flex p-1 rounded-full w-fit"
            style={{ border: "1px solid var(--brand-rule, #cdbf9f)", background: "rgba(255,255,255,0.4)" }}
          >
            {ROLES.map((r) => {
              const active = role === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setRole(r.id)}
                  className="font-mono-label text-[12px] tracking-[0.14em] uppercase rounded-full transition-all"
                  style={{
                    padding: "10px 22px",
                    cursor: "pointer",
                    border: "none",
                    background: active ? "var(--brand-oxblood, #722B2B)" : "transparent",
                    color: active ? "#F4EFE3" : "oklch(0.45 0.02 40)",
                  }}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── cards ── */}
        <div className="mt-12 grid gap-7" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))" }}>
          {keys.map(({ key, label }) => (
            <article
              key={key}
              className="group flex flex-col overflow-hidden rounded-2xl transition-transform duration-200 hover:-translate-y-1"
              style={{
                border: "1px solid var(--brand-rule, #d9ccae)",
                background: "#FBF7EC",
                boxShadow: "0 1px 0 rgba(0,0,0,0.03)",
              }}
            >
              {/* banner: abstract diagram, no depiction */}
              <div
                style={{
                  aspectRatio: "4 / 3",
                  background: "linear-gradient(135deg, #f7f2e7, #efe6d2)",
                  borderBottom: "1px solid var(--brand-rule, #e2d7bf)",
                }}
              >
                <PositionDiagram positionKey={key} />
              </div>

              {/* body */}
              <div className="p-6 flex flex-col">
                <h2 className="font-serif-display italic leading-none tracking-[-0.01em]" style={{ fontSize: 26 }}>
                  {label}.
                </h2>
                <div className="mt-5">
                  <PositionGuide pkey={key} role={role} />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── footer ── */}
        <footer className="mt-14 pt-6" style={{ borderTop: "1px solid var(--brand-rule, #d9ccae)" }}>
          <p className="text-xs italic leading-relaxed" style={{ color: "oklch(0.5 0.02 40)", maxWidth: 620 }}>
            Diagrams are schematic: they show arrangement and motion, not anatomy. Information, not a diagnosis.
            Your body keeps the gavel. If a position hurts, it is a no, and no amount of pillow geometry overrides that.
          </p>
        </footer>
      </div>
    </main>
  );
}
