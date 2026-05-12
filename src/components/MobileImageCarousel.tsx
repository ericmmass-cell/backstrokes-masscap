import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ZoomIn, X } from "lucide-react";

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

type Props = {
  images: GalleryImage[];
  accent: "amber" | "blush";
  topLabel: string;
  bottomEyebrow: string;
  bottomTitle: string;
};

export function MobileImageCarousel({
  images,
  accent,
  topLabel,
  bottomEyebrow,
  bottomTitle,
}: Props) {
  const [active, setActive] = useState(0);
  const accentVar = accent === "amber" ? "var(--brand-amber)" : "var(--brand-blush)";

  return (
    <div className="relative">
      {/* horizontal snap carousel */}
      <div
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none"
        onScroll={(e) => {
          const el = e.currentTarget;
          const idx = Math.round(el.scrollLeft / el.clientWidth);
          if (idx !== active) setActive(idx);
        }}
      >
        {images.map((img, i) => (
          <div key={i} className="relative shrink-0 w-full snap-center aspect-[4/3] overflow-hidden">
            <Dialog>
              <DialogTrigger asChild>
                <button type="button" className="block w-full h-full text-left">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, transparent 40%, oklch(0.12 0.012 30) 100%)" }}
                  />
                  {/* zoom hint */}
                  <span
                    className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/55 backdrop-blur-sm font-mono-label text-[9px] tracking-[0.18em] uppercase text-white/85"
                  >
                    <ZoomIn className="w-3 h-3" /> tap to zoom
                  </span>
                  {/* per-image caption */}
                  <span className="absolute bottom-3 left-4 font-mono-label text-[9px] tracking-[0.22em] uppercase text-white/70">
                    {img.caption}
                  </span>
                  {/* top label only on first slide */}
                  {i === 0 && (
                    <span className="absolute top-3 left-4 font-mono-label text-[9px] text-white/70 tracking-[0.18em] uppercase">
                      {topLabel}
                    </span>
                  )}
                  {/* bottom title only on first slide */}
                  {i === 0 && (
                    <div className="absolute bottom-9 left-4 right-4">
                      <p
                        className="font-mono-label text-[10px] tracking-[0.22em] uppercase mb-1"
                        style={{ color: accentVar }}
                      >
                        {bottomEyebrow}
                      </p>
                      <h3
                        className="font-serif-display text-2xl italic leading-[1.05]"
                        style={accent === "blush" ? { color: accentVar } : undefined}
                      >
                        {bottomTitle}
                      </h3>
                    </div>
                  )}
                </button>
              </DialogTrigger>
              <DialogContent
                className="max-w-[100vw] w-screen h-[100dvh] sm:h-auto sm:max-w-3xl p-0 bg-black border-0 rounded-none sm:rounded-lg overflow-hidden"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-contain" />
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-white/80">
                      {img.caption}
                    </p>
                    <p className="text-white/60 text-xs mt-1">{img.alt}</p>
                  </div>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      aria-label="Close"
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </DialogTrigger>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>

      {/* dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
        {images.map((_, i) => (
          <span
            key={i}
            className="h-1 rounded-full transition-all"
            style={{
              width: i === active ? 16 : 6,
              background: i === active ? accentVar : "rgba(255,255,255,0.45)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
