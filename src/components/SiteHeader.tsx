import { Link } from "@tanstack/react-router";

/**
 * One shared header across the app. Same links, same order, same brand mark
 * on every screen so the user never has to relearn navigation between pages.
 *
 * Visual: cream paper with a hairline rule. Active item is oxblood. Engine
 * is the conversion CTA on the right (it is the money feature, per Bible §4).
 */

type NavItem = { to: string; label: string; href?: never } | { href: string; label: string; to?: never };

const NAV: NavItem[] = [
  { to: "/dashboard", label: "Today" },
  { href: "/engine.html", label: "Engine" },
  { to: "/positions", label: "Positions" },
  { to: "/conversation", label: "Scripts" },
  { to: "/partner", label: "Partner" },
  { to: "/science", label: "Science" },
];

export function SiteHeader({ active }: { active?: string }) {
  return (
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

        <Link
          to="/dashboard"
          className="text-[12px] tracking-[0.14em] uppercase font-mono-label px-4 py-2 rounded-full hover:opacity-90 transition shrink-0"
          style={{
            background: "var(--brand-oxblood)",
            color: "var(--brand-paper)",
          }}
        >
          Begin
        </Link>
      </div>
    </header>
  );
}
