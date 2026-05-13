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
      "No session logged today. The spine does not keep score. We do, gently. Open the app when you have eight minutes. Or do not, and we will be here tomorrow, equally gently.",
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
      "Noted: 8 out of 10 today. We are moving to the down-train. The work does not undo itself in one bad day. The disc is loud, not in charge.",
    doNotWrite: "Oh no, pain spike! Did you overdo it?",
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
    doNotWrite: "Yikes, your score dropped. Try harder tomorrow!",
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
      "Card declined. Nobody's spine cares. Update it when you can. Your protocol is still here.",
    doNotWrite: "Payment failed! Update now to keep your access!",
  },
  trialEnding: {
    key: "trialEnding",
    context: "Free trial has 3 days left.",
    write:
      "Three days left of the trial. After that it is $24.99 a month, which is less than one supplement you would not have bought twice. If your back is quieter, you have your answer.",
    doNotWrite: "Don't lose access — upgrade now!",
  },
  syncFailed: {
    key: "syncFailed",
    context: "Background sync to server fails.",
    write:
      "Could not reach the server. The session is saved locally. It will sync when you are back. The protocol does not require connectivity, which is the only thing the protocol has in common with the candle aisle.",
    doNotWrite: "Sync error! Please try again.",
  },
  internetLost: {
    key: "internetLost",
    context: "User goes offline mid-session.",
    write:
      "Offline. The protocol does not need a connection. Finish the set. We will sync when you are back.",
    doNotWrite: "You appear to be offline. Please reconnect.",
  },
  morningPush: {
    key: "morningPush",
    context: "Daily morning notification (7am local). Rotation A.",
    write: "Eight minutes of McGill. Before the day argues.",
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
  councilAudioFinished: {
    key: "councilAudioFinished",
    context: "User finishes a council audio (podcast or in-app).",
    write:
      "End of episode. The chart that should have always been one chart, now is. Tomorrow morning: the protocol. Tomorrow afternoon: the chair.",
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
      "First session in. The lumbar does not show up on day one. That is day nine. We will see you tomorrow. Bring the same back; we will use it.",
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
      "365 days. The body you had a year ago would not recognise this one. We will spare you the report. The report is also available, if you would like to feel something about it.",
    doNotWrite: "Happy BackStrokeversary! 🎊",
  },
  flareSwap: {
    key: "flareSwap",
    context: "Pain ≥ 7 or 'low energy' selected. Protocol auto-swaps to down-train.",
    write:
      "Flare day logged. We are switching to the down-train. The streak stays. The streak was never the point. We just know you needed to hear it.",
    doNotWrite: "Looks like you're hurting. Should we skip today?",
  },
};

export function copy(key: keyof typeof COPY): string {
  return COPY[key].write;
}
