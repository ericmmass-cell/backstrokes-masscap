/**
 * BackStroke copy library — empty, error, and notification states.
 *
 * Voice rule (read this before adding entries):
 *   Dry, observational, never punishing. The brand surrounds clinicians and
 *   users with the right tone; it does not perform either of them.
 *
 * Every entry includes a counterexample under `doNotWrite` so register
 * calibration stays explicit. If a contributor cannot articulate the
 * counterexample, they have not earned the entry.
 */

export type CopyEntry = {
  key: string;
  context: string;
  write: string;
  doNotWrite: string;
};

export const COPY: Record<string, CopyEntry> = {
  emptySessionLog: {
    key: "emptySessionLog",
    context: "User opens the session log and nothing has been logged today.",
    write:
      "No session logged today. The spine doesn't keep score. We do, gently. Open when you have eight minutes.",
    doNotWrite: "You skipped your workout. Consistency is everything.",
  },
  missedDayAfterStreak: {
    key: "missedDayAfterStreak",
    context: "A streak just broke. User returns the next day.",
    write:
      "Streak paused at 23. Spines don't track streaks. We restart it tonight, no apology required.",
    doNotWrite: "You lost your streak! Build it back!",
  },
  painSpike: {
    key: "painSpike",
    context: "User logs pain ≥ 7/10 or selects 'low energy.'",
    write:
      "Noted: 8/10 today. We're moving to the down-train. The work doesn't undo itself in one bad day.",
    doNotWrite: "Oh no — pain spike! Did you overdo it?",
  },
  scoreNewHigh: {
    key: "scoreNewHigh",
    context: "Index score sets a new personal high.",
    write:
      "Index 84. The highest you've logged. Sitting hours and sleep position did most of the work. Quiet wins.",
    doNotWrite: "Amazing! New high score!!",
  },
  scoreNewLow: {
    key: "scoreNewLow",
    context: "Index score sets a new personal low.",
    write:
      "Index 41. The lowest you've logged. Yesterday's body, plus some sitting. Same plan, slightly more patience.",
    doNotWrite: "Yikes — your score dropped. Try harder tomorrow!",
  },
  returnAfterAbsence: {
    key: "returnAfterAbsence",
    context: "User returns after more than 14 days away.",
    write:
      "Welcome back. We didn't move the protocol. Pick up where you left off, no narrative required.",
    doNotWrite: "We missed you! Here's why you should come back…",
  },
  paymentFailed: {
    key: "paymentFailed",
    context: "Stripe declines the monthly charge.",
    write:
      "Card declined. Nobody's spine cares. Update it when you can — your protocol is still here.",
    doNotWrite: "Payment failed! Update now to keep your access!",
  },
  trialEnding: {
    key: "trialEnding",
    context: "Free trial has 3 days left.",
    write:
      "Three days left of the trial. After that it's $24.99 a month. If you've already noticed your back is quieter, that's the answer.",
    doNotWrite: "Don't lose access — upgrade now!",
  },
  syncFailed: {
    key: "syncFailed",
    context: "Background sync to server fails.",
    write:
      "Couldn't reach the server. The session is saved locally — it'll sync when you're back.",
    doNotWrite: "Sync error! Please try again.",
  },
  internetLost: {
    key: "internetLost",
    context: "User goes offline mid-session.",
    write:
      "Offline. The protocol doesn't need a connection. Finish the set — we'll sync when you're back.",
    doNotWrite: "You appear to be offline. Please reconnect.",
  },
  morningPush: {
    key: "morningPush",
    context: "Daily morning notification (7am local).",
    write: "Eight minutes of McGill. Before the day argues.",
    doNotWrite: "Time for your daily workout!",
  },
  eveningPush: {
    key: "eveningPush",
    context: "Daily evening notification (9pm local).",
    write: "Sleep audit. Pillow under the knees. Tomorrow's lumbar writes you back.",
    doNotWrite: "Don't forget your evening routine!",
  },
  partnerConceptSaved: {
    key: "partnerConceptSaved",
    context: "User saves a concept to their partner share queue.",
    write: "Saved. Send it tonight, send it Sunday — your call.",
    doNotWrite: "Concept saved successfully!",
  },
  positionSaved: {
    key: "positionSaved",
    context: "User saves a position from the library.",
    write: "Saved to tonight's shortlist. Two more and we'll stop suggesting things.",
    doNotWrite: "Position added to favorites!",
  },
  councilAudioFinished: {
    key: "councilAudioFinished",
    context: "User finishes a council audio (podcast or in-app).",
    write:
      "End of episode. The chart that should have always been one chart. Tomorrow morning: the protocol.",
    doNotWrite: "Episode complete! Want to listen to another?",
  },
  baselineComplete: {
    key: "baselineComplete",
    context: "First-run 7-minute baseline assessment finishes.",
    write:
      "Baseline saved. Your starting Index is here. The protocol expects nothing from it. We just needed somewhere to begin.",
    doNotWrite: "Congratulations on completing your baseline!",
  },
  firstSessionComplete: {
    key: "firstSessionComplete",
    context: "First in-app session finishes.",
    write:
      "First session in. The lumbar doesn't show up on day one — that's day nine. We'll see you tomorrow.",
    doNotWrite: "Great job on your first session! 🎉",
  },
  weekOne: {
    key: "weekOne",
    context: "User completes 7 days of the protocol.",
    write:
      "Seven days in. The first drop in pain frequency, statistically, lands around now. If you noticed it, that's the work. If you didn't, also fine.",
    doNotWrite: "One week down! You're crushing it!",
  },
  monthOne: {
    key: "monthOne",
    context: "User completes 30 days of the protocol.",
    write:
      "Thirty days. The spine adapts on a calendar, not a leaderboard. The next thing to change is what you don't notice anymore.",
    doNotWrite: "30-day milestone unlocked! Share your progress!",
  },
  yearOne: {
    key: "yearOne",
    context: "User completes 365 days of the protocol.",
    write:
      "365 days. The body you had a year ago wouldn't recognize this one. We'll spare you the report — unless you want it.",
    doNotWrite: "Happy BackStrokeversary! 🎊",
  },
  flareSwap: {
    key: "flareSwap",
    context: "Pain ≥ 7 or 'low energy' selected — protocol auto-swaps to down-train.",
    write:
      "Flare day logged. We're switching to the down-train. Streak stays.",
    doNotWrite: "Looks like you're hurting — should we skip today?",
  },
};

export function copy(key: keyof typeof COPY): string {
  return COPY[key].write;
}
