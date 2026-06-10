/**
 * The Index. A single 0–100 number that says how quiet the back is.
 *
 * Computed from the event store, on demand, in the browser. Pure function
 * of recent events. No server math required. If the underlying events
 * change, the Index updates the next time it's read. There is no cache
 * to invalidate.
 *
 * Weighting philosophy: the Index is a rolling 7-day weighted score where
 * each day's contribution decays by half over the prior week. Today is
 * weight 1.0; yesterday 0.85; two days ago 0.72; and so on. This makes the
 * number responsive to the last 48 hours without being whiplashed by a
 * single hard day.
 *
 * The number is *signal*, not diagnosis. It is the user's number. We do
 * not show it to a clinician. We do not benchmark it against other users.
 * It exists so the user can answer one question every morning: am I
 * trending up, holding, or trending down.
 */

import { allEvents, type BSEvent } from "./events";

export interface IndexReading {
  /** 0–100. Higher is quieter back. */
  value: number;
  /** Δ from yesterday. Positive = improving. */
  delta: number;
  /** Confidence band, 0–1. Goes up with more recent events. */
  confidence: number;
  /** Why the number is what it is, in one short line. */
  rationale: string;
  /** When the Index was last computed (now). */
  computed_at: string;
}

/* Per-event signed contribution to the daily score. Calibrated against
 * Eric's own beta cohort. Recalibrate after the next 100 users. */
const CONTRIBUTIONS: Record<string, number> = {
  "checkin.submitted": 0, // handled specially · uses props
  "move.completed": +6,
  "move.skipped": -2,
  "session.completed": +12,
  "engine.plan.generated": +1,
  "engine.plan.printed": +2, // someone who prints is someone who'll do it
  "flare.flagged": -25,
  "stop.invoked": -8,
};

const HALF_LIFE_DAYS = 3.5; // weight decays by half every ~3.5 days.

function daysAgo(iso: string, ref: Date): number {
  const ms = ref.getTime() - new Date(iso).getTime();
  return ms / 86_400_000;
}

function decayWeight(d: number): number {
  if (d < 0) return 0;
  return Math.pow(0.5, d / HALF_LIFE_DAYS);
}

/**
 * Score one event. Most events use a fixed value; check-in submissions
 * compute from the user's own pain/sleep/sex answers. The floor axis
 * was removed in May 2026 to narrow the product to back pain → sex.
 */
function scoreEvent(e: BSEvent): number {
  if (e.event_name === "checkin.submitted") {
    const p = e.props as Record<string, number | undefined>;
    // Each component is 0–10. Higher pain = worse, higher sleep/sex = better.
    // Weights re-balanced after removing the floor axis: pain gets more
    // weight, sex gets more weight, sleep stays the same.
    const pain = typeof p.pain === "number" ? p.pain : 5;
    const sleep = typeof p.sleep === "number" ? p.sleep : 5;
    const sex = typeof p.sex === "number" ? p.sex : 5;
    const painComp = (5 - pain) * 2.0;
    const sleepComp = (sleep - 5) * 1.2;
    const sexComp = (sex - 5) * 1.4;
    return painComp + sleepComp + sexComp;
  }
  return CONTRIBUTIONS[e.event_name] ?? 0;
}

/** Compute the Index for `ref` (defaults to now) from local events. */
export function computeIndex(ref: Date = new Date()): IndexReading {
  const events = allEvents();
  if (events.length === 0) {
    return {
      value: 50,
      delta: 0,
      confidence: 0,
      rationale: "No data yet. The first check-in will move this number.",
      computed_at: ref.toISOString(),
    };
  }

  // Sum decayed contributions in a ±7-day window around ref.
  let weightedSum = 0;
  let weightTotal = 0;
  let mostRecentMs = 0;
  for (const e of events) {
    const d = daysAgo(e.client_ts, ref);
    if (d > 7 || d < -1) continue;
    const w = decayWeight(d);
    const s = scoreEvent(e);
    weightedSum += s * w;
    weightTotal += Math.abs(w);
    const ms = new Date(e.client_ts).getTime();
    if (ms > mostRecentMs) mostRecentMs = ms;
  }

  // Normalize: map weighted sum to 0–100 around a baseline of 50.
  // Saturate around ±60 input range.
  const normalized = Math.max(-60, Math.min(60, weightedSum));
  const value = Math.round(50 + (normalized / 60) * 50);

  // Confidence: more events in the last 48h = higher confidence.
  const recent48h = events.filter((e) => daysAgo(e.client_ts, ref) <= 2).length;
  const confidence = Math.min(1, recent48h / 8);

  // Delta from yesterday: compute yesterday's index using same algo.
  const yesterday = new Date(ref);
  yesterday.setDate(yesterday.getDate() - 1);
  const yValue = computeYesterday(events, yesterday);
  const delta = value - yValue;

  return {
    value,
    delta,
    confidence,
    rationale: makeRationale(events, value, delta, ref),
    computed_at: ref.toISOString(),
  };
}

function computeYesterday(events: BSEvent[], ref: Date): number {
  let weightedSum = 0;
  for (const e of events) {
    const d = daysAgo(e.client_ts, ref);
    if (d > 7 || d < 0) continue;
    weightedSum += scoreEvent(e) * decayWeight(d);
  }
  const normalized = Math.max(-60, Math.min(60, weightedSum));
  return Math.round(50 + (normalized / 60) * 50);
}

function makeRationale(
  events: BSEvent[],
  value: number,
  delta: number,
  ref: Date
): string {
  const recent = events.filter((e) => daysAgo(e.client_ts, ref) <= 2);
  const flares = recent.filter((e) => e.event_name === "flare.flagged").length;
  const stops = recent.filter((e) => e.event_name === "stop.invoked").length;
  const completed = recent.filter(
    (e) => e.event_name === "move.completed" || e.event_name === "session.completed"
  ).length;

  if (flares > 0) return `${flares} flare flagged in last 48h.`;
  if (stops > 0) return `${stops} session stopped early.`;
  if (delta > 5) return `${completed} sessions this week. Trend up.`;
  if (delta < -5) return `Quiet days last week. Trend down.`;
  if (value >= 70) return `Holding steady in the green.`;
  if (value <= 35) return `Below your baseline. Easy week recommended.`;
  return `Within your normal range.`;
}
