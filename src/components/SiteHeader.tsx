import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

/**
 * One shared header across the app. Same links, same order, same brand mark
 * on every screen so the user never has to relearn navigation between pages.
 *
 * Visual: cream paper with a hairline rule. Active item is oxblood. Begin
 * is the conversion CTA on the right (it sends users to /buy).
 *
 * Mobile: nav links collapse behind a single icon at the right of the header.
 * Tapping it opens a full-screen drawer that lists every nav item, stacked,
 * in editorial type. Closing options: tap any link, tap the X, or tap outside.
 */

type NavItem = { to: string; label: string; href?: never } | { href: string; label: string; to?: never };

const NAV: NavItem[] = [
  { to: "/dashboard", label: "Today" },
  { href: "/engine.html", label: "Engine" },
  { to: "/positions", label: "Positions" },
  { to: "/conversation", label: "Scripts" },
  { to: "/partner", label: "Partner" },
  { to: "/bedroom", label: "Bedroom" },
  { to: "/science", label: "Science" },
  { to: "/about", label: "About" },
  { to: "/manifesto", label: "Manifesto" },
];

export function SiteHeader({ active }: { active?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll while the mobile drawer is open. Otherwise the page
  // behind keeps scrolling on touch devices, which makes the drawer feel
  // like a janky overlay rather than a real screen.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (menuOpen) {
      const prior = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prior; };
    }
  }, [menuOpen]);

  // Esc closes the drawer.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <header
        className="sticky top-0 z-30 backdrop-blur-xl"
        style={{
          background: "oklch(0.94 0.018 78 / 0.82)",
          borderBottom: "1px solid oklch(0.86 0.025 70)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <svg width="22" height="22" viewBox="0 0 22 22" style={{ color: "var(--brand-oxblood)" }}>
              <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
              <circle cx="11" cy="11" r="3" fill="currentColor" />
            </svg>
            <span
              className="font-serif-display text-xl tracking-tight italic"
              style={{ color: "var(--brand-paper-ink)" }}
            >
              Back<span style={{ color: "var(--brand-oxblood)" }}>Stroke</span>
            </span>
            <sup
              className="font-mono-label text-[8px] ml-0.5"
              style={{ color: "oklch(0.45 0.02 40)" }}
            >
              ℠
            </sup>
          </Link>

          {/* Desktop nav: visible at md and up. */}
          <nav className="hidden md:flex items-center gap-6 font-mono-label text-[10px] tracking-[0.18em] uppercase">
            {NAV.map((item) => {
              const isActive = active === item.label.toLowerCase();
              const className = "hover:opacity-80 transition";
              const style: React.CSSProperties = {
                color: isActive ? "var(--brand-oxblood)" : "oklch(0.45 0.02 40)",
                fontWeight: isActive ? 700 : 500,
              };
              return item.href ? (
                <a key={item.label} href={item.href} className={className} style={style}>
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} to={item.to!} className={className} style={style}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/buy"
              className="text-[12px] tracking-[0.14em] uppercase font-mono-label px-4 py-2 rounded-full hover:opacity-90 transition"
              style={{
                background: "var(--brand-oxblood)",
                color: "var(--brand-paper)",
              }}
            >
              Begin · from $79/yr
            </Link>
            {/* Mobile burger: hidden at md and up. */}
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 -mr-2 hover:opacity-70 transition"
              style={{ color: "var(--brand-paper-ink)" }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
                <line x1="3" y1="7" x2="19" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3" y1="15" x2="19" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer. Full screen cream paper with editorial nav. */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          style={{ background: "oklch(0.94 0.018 78)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false); }}
        >
          <div className="flex items-center justify-between h-16 px-6 border-b" style={{ borderColor: "oklch(0.86 0.025 70)" }}>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" style={{ color: "var(--brand-oxblood)" }}>
                <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
                <circle cx="11" cy="11" r="3" fill="currentColor" />
              </svg>
              <span
                className="font-serif-display text-xl tracking-tight italic"
                style={{ color: "var(--brand-paper-ink)" }}
              >
                Back<span style={{ color: "var(--brand-oxblood)" }}>Stroke</span>
              </span>
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="p-2 -mr-2 hover:opacity-70 transition"
              style={{ color: "var(--brand-paper-ink)" }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
                <line x1="5" y1="5" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="17" y1="5" x2="5" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="px-8 pt-10 pb-8 flex flex-col gap-5">
            {NAV.map((item) => {
              const isActive = active === item.label.toLowerCase();
              const className = "font-serif-display italic tracking-[-0.01em] leading-none hover:opacity-70 transition";
              const style: React.CSSProperties = {
                color: isActive ? "var(--brand-oxblood)" : "var(--brand-paper-ink)",
                fontSize: 34,
                fontWeight: isActive ? 700 : 400,
              };
              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={className}
                  style={style}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.to!}
                  onClick={() => setMenuOpen(false)}
                  className={className}
                  style={style}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div
            className="absolute bottom-0 left-0 right-0 px-8 py-7 border-t"
            style={{ borderColor: "oklch(0.86 0.025 70)" }}
          >
            <Link
              to="/buy"
              onClick={() => setMenuOpen(false)}
              className="block text-center font-mono-label text-[12px] tracking-[0.18em] uppercase py-3.5 rounded-full hover:opacity-90 transition"
              style={{
                background: "var(--brand-oxblood)",
                color: "var(--brand-paper)",
              }}
            >
              Begin · from $79/yr
            </Link>
            <p
              className="mt-4 text-center font-mono-label text-[9px] tracking-[0.22em] uppercase"
              style={{ color: "oklch(0.45 0.02 40)" }}
            >
              ℠ MMXXVI · no candle revenue
            </p>
          </div>
        </div>
      )}
    </>
  );
}
