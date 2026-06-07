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

  // ---- rear family: receiver on hands-and-knees, partner kneeling behind ----
  // p09 quadruped, forearms down
  p09: {
    props: [{ kind: "surface", y: SURFACE }],
    figures: [
      { color: OX, headR: 38, joints: { head: [112, 326], neck: [180, 334], elbow: [184, 430], wrist: [240, 448], pelvis: [300, 334], knee: [322, 430], ankle: [356, 448] } },
      { color: INK, headR: 38, joints: { head: [394, 214], neck: [388, 266], elbow: [352, 312], wrist: [334, 352], pelvis: [378, 362], knee: [388, 438], ankle: [414, 448] } },
    ],
  },
  // p19 rear on bed, knees on a pillow
  p19: {
    props: [{ kind: "surface", y: SURFACE }, { kind: "pillow", x: 296, y: 420, w: 64, h: 24 }],
    figures: [
      { color: OX, headR: 38, joints: { head: [112, 326], neck: [180, 334], elbow: [184, 428], wrist: [240, 446], pelvis: [300, 332], knee: [322, 416], ankle: [356, 436] } },
      { color: INK, headR: 38, joints: { head: [394, 214], neck: [388, 266], elbow: [352, 312], wrist: [334, 352], pelvis: [378, 362], knee: [388, 438], ankle: [414, 448] } },
    ],
  },
  // p30 rear, hands reaching to the headboard
  p30: {
    props: [{ kind: "surface", y: SURFACE }, { kind: "pillow", x: 44, y: 150, w: 22, h: 200 }],
    figures: [
      { color: OX, headR: 38, joints: { head: [128, 300], neck: [186, 320], elbow: [140, 300], wrist: [86, 262], pelvis: [304, 332], knee: [326, 430], ankle: [360, 448] } },
      { color: INK, headR: 38, joints: { head: [396, 214], neck: [390, 266], elbow: [354, 312], wrist: [336, 352], pelvis: [380, 362], knee: [390, 438], ankle: [416, 448] } },
    ],
  },

  // ---- side-lying T: receiver on side, top leg up; partner kneeling at right angle ----
  p04: {
    props: [{ kind: "surface", y: SURFACE }],
    figures: [
      { color: OX, headR: 38, joints: { head: [108, 360], neck: [182, 366], elbow: [158, 404], wrist: [130, 432], pelvis: [300, 374], knee: [352, 320], ankle: [386, 356] } },
      { color: INK, headR: 38, joints: { head: [368, 212], neck: [364, 262], elbow: [336, 308], wrist: [322, 352], pelvis: [360, 364], knee: [372, 436], ankle: [400, 448] } },
    ],
  },
};
