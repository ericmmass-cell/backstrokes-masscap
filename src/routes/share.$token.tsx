import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/share/$token")({
  component: SharePage,
  head: () => ({
    meta: [
      { title: "A short note from your partner · BackStroke" },
      {
        name: "description",
        content:
          "A two-screen note explaining one specific thing (a position, a script, a breath cue) and what it means for tonight. No login, no install.",
      },
    ],
  }),
});

type SharedItem = {
  kind: "conversation" | "position" | "concept";
  topicId?: string;
  topicLabel?: string;
  line?: string;
  t: number;
  token: string;
};

const FALLBACK: SharedItem = {
  kind: "concept",
  topicLabel: "Reverse kegel, in one paragraph",
  line:
    "It is the opposite of the kegel everyone has heard of. Instead of contracting the pelvic floor, you let it drop on the inhale. A chronically gripping floor is why arousal stalls, why penetration hurts, and why the $9.99 app you tried for two months made it worse. Down-train first, always.",
  t: Date.now(),
  token: "demo",
};

function readShared(token: string): SharedItem | null {
  try {
    const list = JSON.parse(localStorage.getItem("bs.partnerLinks") ?? "[]") as SharedItem[];
    return list.find((i) => i.token === token) ?? null;
  } catch {
    return null;
  }
}

function SharePage() {
  const { token } = useParams({ from: "/share/$token" });
  const [item, setItem] = useState<SharedItem | null>(null);
  const [screen, setScreen] = useState<0 | 1>(0);

  useEffect(() => {
    if (token === "demo") {
      setItem(FALLBACK);
    } else {
      setItem(readShared(token));
    }
  }, [token]);

  if (item === null) {
    return (
      <div className="min-h-screen bg-background text-foreground antialiased flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
            LINK NOT FOUND
          </p>
          <h1 className="font-serif-display text-4xl mt-4 leading-snug">
            This note may have expired, or the link's wrong.
          </h1>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            Ask your partner to resend. We don't store these on a server. The link lives in the device that made it.
          </p>
          <Link to="/" className="inline-block mt-8 font-mono-label text-[10px] tracking-[0.22em] uppercase underline-offset-4 hover:underline">
            ◆ go to BackStroke
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased flex items-center justify-center px-6 py-16">
      <div className="max-w-xl w-full">
        <div className="flex items-center justify-between mb-10">
          <Link to="/" className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 22 22" className="text-[var(--brand-amber)]">
              <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
              <circle cx="11" cy="11" r="3" fill="currentColor" />
            </svg>
            <span className="font-serif-display text-base italic">
              Back<span style={{ color: "var(--brand-amber)" }}>Stroke</span>
            </span>
          </Link>
          <p className="font-mono-label text-[9px] tracking-[0.22em] uppercase text-muted-foreground">
            {screen === 0 ? "1 of 2" : "2 of 2"}
          </p>
        </div>

        {screen === 0 ? (
          <article>
            <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">
              A short note · for tonight · no install required
            </p>
            <h1 className="font-serif-display text-4xl md:text-5xl mt-5 leading-[1.02] tracking-[-0.01em]">
              Your partner wanted you to read this once.
            </h1>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed">
              <span className="italic">What this is.</span> {item.topicLabel}. One specific concept from the BackStroke protocol, written in plain language. Two screens. No quiz at the end.
            </p>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              <span className="italic">Why it matters.</span> Your partner is working on the part of the protocol that talks. They are not asking you to download anything. They are asking you to read this so the conversation lands easier.
            </p>
            <button
              type="button"
              onClick={() => setScreen(1)}
              className="mt-10 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[var(--brand-amber)] text-[var(--brand-ink)] text-sm font-semibold hover:opacity-90 transition"
            >
              Read the line →
            </button>
          </article>
        ) : (
          <article>
            <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">
              The line · in their voice
            </p>
            <blockquote className="font-serif-display text-3xl md:text-4xl mt-6 leading-snug italic">
              &ldquo;{item.line}&rdquo;
            </blockquote>
            <p className="mt-8 text-sm text-muted-foreground leading-relaxed">
              <span className="italic">What it means for tonight.</span> Nothing dramatic. Your partner picked it because it's specific. If you want to talk about it, talk about it. If you don't, having read it is enough.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setScreen(0)}
                className="px-5 py-3 rounded-full font-mono-label text-[10px] tracking-[0.22em] uppercase border border-border hover:bg-card/40 transition"
              >
                ← back to context
              </button>
              <Link
                to="/"
                className="px-5 py-3 rounded-full font-mono-label text-[10px] tracking-[0.22em] uppercase bg-foreground text-background hover:opacity-90 transition"
              >
                What's BackStroke?
              </Link>
            </div>
          </article>
        )}

        <p className="mt-16 text-[10px] text-muted-foreground/70 leading-relaxed border-t border-border pt-6">
          BackStroke · sent by your partner · no account, no app install, no follow-up email
        </p>
      </div>
    </div>
  );
}
