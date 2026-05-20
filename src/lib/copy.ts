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
      "No tragedy detected. You missed yesterday. The work did not evaporate. Open when you have eight minutes.",
    doNotWrite: "You skipped your workout. Consistency is everything.",
  },
  missedDayAfterStreak: {
    key: "missedDayAfterStreak",
    context: "A streak just broke. User returns the next day.",
    write:
      "No tragedy detected. The streak paused. The work did not evaporate. We restart tonight, no apology required.",
    doNotWrite: "You lost your streak! Build it back!",
  },
  painSpike: {
    key: "painSpike",
    context: "User logs pain ≥ 7/10 or selects 'low energy.'",
    write:
      "Down-train day. Pain is loud today. Loud is not in charge. We moved the session accordingly.",
    doNotWrite: "Oh no, pain spike! Did you overdo it?",
  },
  scoreNewHigh: {
    key: "scoreNewHigh",
    context: "Index score sets a new personal high.",
    write:
      "Index 84. The highest you have logged. Sleep position and sitting hours did most of the work. Quiet wins.",
    doNotWrite: "Amazing! New high score!!",
  },
  scoreNewLow: {
    key: "scoreNewLow",
    context: "Index score sets a new personal low.",
    write:
      "Index 41. Yesterday's body, plus some sitting, plus possibly the chair you would not have chosen for any other reason. Same plan, slightly more patience.",
    doNotWrite: "Yikes, your score dropped. Try harder tomorrow!",
  },
  returnAfterAbsence: {
    key: "returnAfterAbsence",
    context: "User returns after more than 14 days away.",
    write:
      "The chair in the corner has been making decisions again. No judgment. Just supervision. Pick up where you left off.",
    doNotWrite: "We missed you! Here's why you should come back…",
  },
  paymentFailed: {
    key: "paymentFailed",
    context: "Stripe declines the monthly charge.",
    write:
      "Card declined. Nobody's spine cares. Update it when you can. Your protocol is still here.",
    doNotWrite: "Payment failed! Update now to keep your access!",
  },
  trialEnding: {
    key: "trialEnding",
    context: "Free trial has 3 days left.",
    write:
      "Three days left. After that it is $39 a month, or $199 for life if any founding-member spots are left. Both are less than a single supplement you would not have bought twice.",
    doNotWrite: "Don't lose access. Upgrade now!",
  },
  syncFailed: {
    key: "syncFailed",
    context: "Background sync to server fails.",
    write:
      "Saved locally. The server is currently being dramatic. Your session is safe and will sync when the machine returns to adulthood.",
    doNotWrite: "Sync error! Please try again.",
  },
  internetLost: {
    key: "internetLost",
    context: "User goes offline mid-session.",
    write:
      "Offline. The protocol does not need a connection. Finish the set. We sync when you are back.",
    doNotWrite: "You appear to be offline. Please reconnect.",
  },
  morningPush: {
    key: "morningPush",
    context: "Daily morning notification (7am local). Rotation A.",
    write: "Eight minutes. Then leave. The spine rent is due. Small payment. No candle accepted.",
    doNotWrite: "Time for your daily workout!",
  },
  morningPushB: {
    key: "morningPushB",
    context: "Daily morning notification (7am local). Rotation B.",
    write: "Eight minutes. Sit in the chair on purpose this time, not because your back asked you to.",
    doNotWrite: "Don't forget to log your workout!",
  },
  eveningPush: {
    key: "eveningPush",
    context: "Daily evening notification (9pm local).",
    write: "Sleep audit. Pillow under the knees. Tomorrow's lumbar writes you back. Statistically, in your favour.",
    doNotWrite: "Don't forget your evening routine!",
  },
  partnerConceptSaved: {
    key: "partnerConceptSaved",
    context: "User saves a concept to their partner share queue.",
    write: "Saved. Send it tonight, send it Sunday. Your call.",
    doNotWrite: "Concept saved successfully!",
  },
  positionSaved: {
    key: "positionSaved",
    context: "User saves a position from the library.",
    write: "Saved to tonight's shortlist. Two more and we will stop suggesting things. We are not Pinterest.",
    doNotWrite: "Position added to favorites!",
  },
  partnerRead: {
    key: "partnerRead",
    context: "Partner opens a shared script or position link.",
    write:
      "They read it. The line landed. What you do with that information is, mercifully, not a dashboard metric.",
    doNotWrite: "Your partner has viewed your shared content!",
  },
  baselineComplete: {
    key: "baselineComplete",
    context: "First-run 7-minute baseline assessment finishes.",
    write:
      "Baseline complete. Index {N}. The number is not a grade. It is a weather report from a small, overworked region of the body. Begin today.",
    doNotWrite: "Congratulations on completing your baseline!",
  },
  firstSessionComplete: {
    key: "firstSessionComplete",
    context: "First in-app session finishes.",
    write:
      "Done. The lumbar will not send flowers. It may, around day nine, stop interrupting meetings.",
    doNotWrite: "Great job on your first session!",
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
      "365 days. The body you had a year ago would not recognise this one. We will spare you the report. The report is also available, if you would like to feel something about it.",
    doNotWrite: "Happy BackStrokeversary! 🎊",
  },
  flareSwap: {
    key: "flareSwap",
    context: "Pain ≥ 7 or 'low energy' selected. Protocol auto-swaps to down-train.",
    write:
      "Flare day. Down-train. The streak is unaffected because the streak was never the point. Pain is loud today. Loud is not the same as in charge.",
    doNotWrite: "Looks like you're hurting. Should we skip today?",
  },
  loadingState: {
    key: "loadingState",
    context: "Generic loading screen.",
    write: "Loading. The server is stretching first, which is more than can be said for most of us.",
    doNotWrite: "Please wait while we load your data...",
  },
  genericError: {
    key: "genericError",
    context: "Catch-all error state.",
    write: "Something broke. Not you. Possibly us. Possibly the server, which has been making lifestyle choices.",
    doNotWrite: "An error occurred. Please try again.",
  },
  noPositionsClearedCap: {
    key: "noPositionsClearedCap",
    context: "Position-library filter returns zero matches under today's load cap.",
    write: "No positions clear today's load cap. This is not a sexual referendum. It is geometry having boundaries.",
    doNotWrite: "No results. Try a different filter.",
  },
  noScriptsSaved: {
    key: "noScriptsSaved",
    context: "Scripts page, user has no saved lines yet.",
    write: "No saved scripts yet. This is not a moral failure. Most adults were taught more about long division than desire.",
    doNotWrite: "You have no saved scripts. Start by saving one!",
  },
  subscriptionCancelled: {
    key: "subscriptionCancelled",
    context: "User cancels subscription.",
    write: "Cancelled. You keep access until {date}. We will not send twelve emails pretending to be concerned.",
    doNotWrite: "We're sorry to see you go. Are you sure?",
  },
};

export function copy(key: keyof typeof COPY): string {
  return COPY[key].write;
}
