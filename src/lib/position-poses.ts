/**
 * Code-drawn position diagrams (joint data for PoseFigure). One entry per
 * position that lacks a photo strip. Clinical, tasteful, deterministic.
 * Two tones: OX = the receiving partner, INK = the other.
 */
import type { Pose } from "@/components/PoseFigure";

const OX = "#8a4242";
const INK = "#3a352c";
const SURFACE = 452;

// ---- supine family: receiver on back (head left), partner kneeling at right ----
const supineReceiver = (knee: [number, number], ankle: [number, number], wrist: [number, number] = [118, 446]) => ({
  color: OX, headR: 38,
  joints: { head: [92, 388] as [number, number], neck: [166, 380] as [number, number], elbow: [150, 418] as [number, number], wrist, pelvis: [300, 380] as [number, number], knee, ankle },
});
const kneelingPartner = {
  color: INK, headR: 38,
  joints: { head: [372, 196] as [number, number], neck: [366, 250] as [number, number], elbow: [332, 300] as [number, number], wrist: [320, 352] as [number, number], pelvis: [360, 360] as [number, number], knee: [372, 430] as [number, number], ankle: [402, 442] as [number, number] },
};

export const POSES: Record<string, Pose> = {
  // p03 supine, knees over pillow
  p03: { props: [{ kind: "surface", y: SURFACE }, { kind: "pillow", x: 300, y: 352, w: 70, h: 30 }], figures: [supineReceiver([352, 300], [322, 372]), kneelingPartner] },

  // p06 supine, hips elevated on bolster (wedge under pelvis)
  p06: { props: [{ kind: "surface", y: SURFACE }, { kind: "wedge", x: 250, y: 372, w: 90, h: 46 }], figures: [supineReceiver([356, 296], [330, 368]), kneelingPartner] },

  // p22 supine, double-pillow (knees + lumbar)
  p22: { props: [{ kind: "surface", y: SURFACE }, { kind: "pillow", x: 300, y: 350, w: 66, h: 28 }, { kind: "pillow", x: 232, y: 372, w: 60, h: 26 }], figures: [supineReceiver([350, 302], [322, 372]), kneelingPartner] },

  // p25 supine, knees pulled to chest (hands to knees)
  p25: { props: [{ kind: "surface", y: SURFACE }], figures: [supineReceiver([300, 288], [262, 322], [292, 300]), kneelingPartner] },

  // p29 supine, legs straight, ankles together
  p29: { props: [{ kind: "surface", y: SURFACE }], figures: [supineReceiver([362, 382], [432, 384]), kneelingPartner] },

  // p34 supine, fully relaxed, partner does the work (arms at sides, legs easy)
  p34: { props: [{ kind: "surface", y: SURFACE }], figures: [supineReceiver([350, 330], [410, 360], [220, 408]), kneelingPartner] },

  // p38 supine, one knee bent and externally rotated (frog leg), other straight
  p38: { props: [{ kind: "surface", y: SURFACE }], figures: [supineReceiver([336, 332], [300, 392]), kneelingPartner] },

  // side-lying / spoon / rear / standing / seated families: authored next pass.
  // Until then those positions keep their family photo strip.
};
