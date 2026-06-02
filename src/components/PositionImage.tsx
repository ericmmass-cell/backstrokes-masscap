/**
 * PositionImage — the position illustration, rendered as a tasteful brand
 * duotone (oxblood -> cream) by default. The duotone is the public treatment:
 * the position reads clearly, but it is stylized editorial art, not raw
 * photorealistic nudity. No gate.
 *
 * Art is CC-BY-SA (Seedfeeder / Wikimedia Commons); credit is shown.
 */
import { type CSSProperties } from "react";

/** The brand duotone filter (oxblood -> cream). Render once per page. */
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
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          filter: "url(#bs-duotone)",
        }}
      />
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
    </figure>
  );
}

export default PositionImage;
