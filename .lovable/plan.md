# Homepage rework: story arc, problem framing, sharper voice

## What's wrong now

The page front-loads outcomes and stats before the reader knows what BackStroke is for. The thesis ("same pelvis, two jobs") is buried 7 sections deep. There are two competing terminal CTAs (mid-page pre-signup and bottom App Store). Some sections repeat each other, and the hero's voice is dense, not witty.

## New section order (problem → insight → proof → action)

```
01  HERO              Name the problem. Tease the thesis. One CTA.
02  THE PROBLEM       Indict the category. Punch up at Goop, kegel apps, supplement bros.
03  THE INSIGHT       "Same pelvis. Two jobs." The anatomical reveal.
04  METHODOLOGY       Two editorial spreads: how we train the back / the bedroom.
05  THE WORK          Tangible move lists, click-to-expand. Proof of substance.
06  LIVE PROTOCOL     Try the actual product surface, interactively.
07  FIELD NOTES       Testimonials + the three headline outcome numbers.
08  PRE-SIGNUP        Single terminal CTA. Cohort framing.
09  FOOTER
```

Cut: the standalone "WHY NOW" market-sizing slab (folds into THE PROBLEM), the mid-page App Store/Google Play CTA (replaced by pre-signup as the only real ask, since the app isn't public yet), the marquee strip (decorative, no narrative job).

## Section-by-section copy direction

**01 Hero.** Drop the wall of text under the headline. Name the problem in one line ("Your back hurts. Your sex life knows."), follow with the thesis tease ("Same pelvis. Same eight muscles. One protocol."), one outcome stat, one CTA ("Get on the list"). Move the three-up stat strip down into Field Notes where proof belongs. Keep the editorial photo + phone mockup.

**02 The Problem.** New section. Three beats:
- The category split: spine clinic on Tuesday, pelvic-floor PT on Thursday, neither talks to the other.
- The receipts: 619M people with back pain, 1 in 4 reporting sexual avoidance, market answer is a $48 magnesium gummy in eucalyptus.
- The villains, named with affection: Goop, the kegel app counting reps like Duolingo, the guy in a weighted vest with opinions about discipline.

**03 The Insight.** Current "After Dark" section, retitled and tightened. The eight-muscle anatomy reveal as the hinge of the whole site. Cut from three paragraphs to two. Keep "Train the body. Presence is downstream."

**04 Methodology.** Keep the two editorial spreads (back / bedroom). Tighten captions.

**05 The Work.** Keep the two-column move list with click-to-expand modals. Trim intro copy.

**06 Live Protocol.** Keep as-is. It's the interactive demo.

**07 Field Notes.** Testimonials + the three hero stats (-63% back-pain days, +58% rate sex enjoyable, -71% report pain as distraction) absorbed in as a header strip above the quotes. One number, one quote, repeating pattern.

**08 Pre-signup.** Promote to terminal CTA. Bigger type, single column, email field front and centre. Remove the App Store buttons (no shipping app to download yet).

**09 Footer.** Unchanged.

## Voice direction

Per project memory: smartest McGill-trained PT in the room, dbrand-adjacent, deadpan, specific, numbers over adjectives. No em dashes, no exclamation, no banned words (wellness, ritual, journey, etc.). Punch up at the category, never at the user. Each section gets at most one quotable aside; no piling on.

Concrete examples of the rewrite tone:

- Hero subhead now: "Two outcomes. A back that goes quiet. Sex you're sincerely into. Same pelvis, same nerves, same eight muscles. Your anatomy was never going to keep them in separate rooms. The wellness category insisted on it for tax reasons."
- Hero subhead after: "Your back hurts. Your sex life knows. Same pelvis, same eight muscles, one protocol. The category sells you two."

- Problem section aside: "The kegel app charging $9.99 to count reps like Duolingo. The supplement stack that fits in a small UPS truck. The candle. Always the candle."

- Insight section aside: "Your PT knows. Your GP knows. The app charging $9.99 to count kegels knows. They will not put it on the homepage, because someone in legal is on a call about it."

## Files

- `src/routes/index.tsx` — re-order JSX sections, rewrite hero / problem / insight copy, fold market stats into problem section, remove marquee + App Store CTA, promote pre-signup.
- No new components. No new assets. No backend changes. Pure presentation rework.

## Out of scope

- No new images (reuse existing 8 assets).
- No changes to MoveLibrary, LiveProtocol, MobileImageCarousel, EarlyAccessForm internals.
- No SEO/meta changes unless copy demands it.
- No actual app shipping flow.
