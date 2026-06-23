/**
 * Anti-achievements. The anti-gamification IS the gamification: a streak that
 * refuses to flatter you is stickier than confetti, and the badge that declines
 * to be impressed is the one people screenshot. Derived entirely from the event
 * ledger, in the browser. No points, no levels, no confetti, on purpose.
 *
 * Every badge is correct and studiously unimpressed. Punches up at the genre of
 * fitness-app flattery, never down at the user, who is, after all, doing the work.
 */

import type { BSEvent } from "./events";

export type Badge = { key: string; label: string; tip: string };

const dayKey = (iso: string) => iso.slice(0, 10);

/** Distinct calendar days with a completed session. */
function sessionDays(events: BSEvent[]): Set<string> {
  return new Set(
    events.filter((e) => e.event_name === "session.completed").map((e) => dayKey(e.client_ts)),
  );
}

/** Consecutive completed-session days counting back from today. Mirrors the
 * dashboard's streak so the badge and the header never disagree. */
function currentStreak(events: BSEvent[], ref: Date): number {
  const days = sessionDays(events);
  if (days.size === 0) return 0;
  const d = new Date(ref);
  const iso = (x: Date) => x.toISOString().slice(0, 10);
  if (!days.has(iso(d))) d.setDate(d.getDate() - 1);
  let streak = 0;
  while (days.has(iso(d))) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

/**
 * The badges earned so far, in display order. Only what the ledger can prove.
 */
export function earnedBadges(events: BSEvent[], ref: Date = new Date()): Badge[] {
  const out: Badge[] = [];
  const sessions = events.filter((e) => e.event_name === "session.completed").length;
  const days = sessionDays(events);
  const streak = currentStreak(events, ref);
  const flaggedHonestly = events.some((e) => e.event_name === "flare.flagged");

  if (sessions >= 1)
    out.push({
      key: "first",
      label: "First session · logged",
      tip: "You did the eight minutes once. The bar was on the floor and you cleared it. Genuinely, well done.",
    });
  if (streak >= 7)
    out.push({
      key: "streak7",
      label: `${streak}-day streak · adequate`,
      tip: "The spine has noticed and declined to comment, which from the spine is applause.",
    });
  if (days.size >= 30)
    out.push({
      key: "day30",
      label: "30 days · no confetti",
      tip: "The spine adapts on a calendar, not a leaderboard. No confetti. Confetti is for people who are surprised.",
    });
  if (flaggedHonestly)
    out.push({
      key: "honest",
      label: "Honest flare · respect",
      tip: "Most people lie to their fitness apps. You did not. Weird flex, respect.",
    });

  return out;
}
