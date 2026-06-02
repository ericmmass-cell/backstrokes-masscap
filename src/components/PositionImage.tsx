/**
 * PositionImage — the position illustration with an 18+ gate.
 *
 * Default (public): the explicit illustration is blurred and covered, so the
 * open site shows a safe, non-explicit card. An adult opts in once ("I'm 18+")
 * and the choice is remembered (localStorage), after which the real
 * illustrations show everywhere. Free, uses the licensed Seedfeeder art.
 *
 * The art is CC-BY-SA (Seedfeeder / Wikimedia Commons); credit is shown.
 */
import { useEffect, useState, type CSSProperties } from "react";

const STORE_KEY = "bs-explicit-ok";

let listeners: Array<(v: boolean) => void> = [];
function readOk(): boolean {
  try {
    return localStorage.getItem(STORE_KEY) === "1";
  } catch {
    return false;
  }
}
function setOkGlobal() {
  try {
    localStorage.setItem(STORE_KEY, "1");
  } catch {
    /* ignore */
  }
  listeners.forEach((fn) => fn(true));
}

/** shared opt-in state so every image on the page reveals at once */
export function useExplicitOk(): [boolean, () => void] {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    setOk(readOk());
    const fn = (v: boolean) => setOk(v);
    listeners.push(fn);
    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  }, []);
  return [ok, setOkGlobal];
}

/** A brand duotone filter (oxblood -> cream) that stylizes the illustrations
 * into tasteful editorial art instead of raw photorealistic nudity. Render
 * once per page. */
export function DuotoneFilter() {
  return (
    <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <filter id="bs-duotone" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0.34 0.34 0.34 0 0  0.34 0.34 0.34 0 0  0.34 0.34 0.34 0 0  0 0 0 1 0"
          />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.37 0.96" />
            <feFuncG type="table" tableValues="0.13 0.94" />
            <feFuncB type="table" tableValues="0.13 0.89" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
}

export function PositionImage({
  src,
  alt,
  style,
}: {
  src: string;
  alt: string;
  style?: CSSProperties;
}) {
  const [ok, allow] = useExplicitOk();
  return (
    <figure
      style={{
        position: "relative",
        width: "100%",
        margin: 0,
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid #e2d7bf",
        background: "#efe7d2",
        aspectRatio: "4 / 3",
        ...style,
      }}
    >
      <img
        src={src}
        alt={ok ? alt : ""}
        loading="lazy"
        decoding="async"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          // revealed: tasteful brand duotone, not raw nudity. gated: blurred cover.
          filter: ok ? "url(#bs-duotone)" : "blur(26px) saturate(0.7)",
          transform: ok ? "none" : "scale(1.08)", // hide blurred edges
          transition: "filter 260ms ease",
        }}
      />
      {!ok && (
        <button
          type="button"
          onClick={allow}
          aria-label="Show explicit illustration. I am 18 or older."
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            cursor: "pointer",
            border: "none",
            background: "rgba(244,239,227,0.55)",
            backdropFilter: "blur(2px)",
          }}
        >
          <span
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#6b5d48",
            }}
          >
            Explicit illustration
          </span>
          <span
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#F4EFE3",
              background: "#722B2B",
              borderRadius: 999,
              padding: "8px 16px",
            }}
          >
            I&apos;m 18+ · show
          </span>
        </button>
      )}
      {ok && (
        <figcaption
          style={{
            position: "absolute",
            bottom: 4,
            right: 8,
            fontFamily: "ui-monospace, monospace",
            fontSize: 7,
            letterSpacing: "0.06em",
            color: "rgba(42,38,32,0.5)",
            pointerEvents: "none",
          }}
        >
          Illus. Seedfeeder · CC BY-SA
        </figcaption>
      )}
    </figure>
  );
}

export default PositionImage;
