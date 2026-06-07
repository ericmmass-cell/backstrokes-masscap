/**
 * Code-drawn position diagrams (joint data for PoseFigure). One entry per
 * position that lacks a photo strip. Clinical, tasteful, deterministic.
 * OX = the receiving partner (LIGHT tone), INK = the other (DARK tone). High
 * contrast so the two bodies never merge. `motion` rocks the active partner so
 * the movement of the position reads, not just a breath.
 */
import type { Pose } from "@/components/PoseFigure";

const OX = "#d2a06e"; // receiver, light
const INK = "#2f2820"; // partner, dark
const SURFACE = 452;

const supineReceiver = (knee: [number, number], ankle: [number, number], wrist: [number, number] = [118, 446]) => ({
  color: OX, headR: 38,
  joints: { head: [92, 388] as [number, number], neck: [166, 380] as [number, number], elbow: [150, 418] as [number, number], wrist, pelvis: [300, 380] as [number, number], knee, ankle },
});
const kneelingPartner = {
  color: INK, headR: 38,
  joints: { head: [372, 196] as [number, number], neck: [366, 250] as [number, number], elbow: [332, 300] as [number, number], wrist: [320, 352] as [number, number], pelvis: [360, 360] as [number, number], knee: [372, 430] as [number, number], ankle: [402, 442] as [number, number] },
};
const ROCK_PARTNER = { figure: 1, dx: -7, dy: 0, period: 2.6 };

export const POSES: Record<string, Pose> = {
  p03: { motion: ROCK_PARTNER, props: [{ kind: "surface", y: SURFACE }, { kind: "pillow", x: 300, y: 352, w: 70, h: 30 }], figures: [supineReceiver([352, 300], [322, 372]), kneelingPartner] },
  p06: { motion: ROCK_PARTNER, props: [{ kind: "surface", y: SURFACE }, { kind: "wedge", x: 250, y: 372, w: 90, h: 46 }], figures: [supineReceiver([356, 296], [330, 368]), kneelingPartner] },
  p22: { motion: ROCK_PARTNER, props: [{ kind: "surface", y: SURFACE }, { kind: "pillow", x: 300, y: 350, w: 66, h: 28 }, { kind: "pillow", x: 232, y: 372, w: 60, h: 26 }], figures: [supineReceiver([350, 302], [322, 372]), kneelingPartner] },
  p25: { motion: ROCK_PARTNER, props: [{ kind: "surface", y: SURFACE }], figures: [supineReceiver([300, 288], [262, 322], [292, 300]), kneelingPartner] },
  p29: { motion: ROCK_PARTNER, props: [{ kind: "surface", y: SURFACE }], figures: [supineReceiver([362, 382], [432, 384]), kneelingPartner] },
  p34: { motion: ROCK_PARTNER, props: [{ kind: "surface", y: SURFACE }], figures: [supineReceiver([350, 330], [410, 360], [220, 408]), kneelingPartner] },
  p38: { motion: ROCK_PARTNER, props: [{ kind: "surface", y: SURFACE }], figures: [supineReceiver([336, 332], [300, 392]), kneelingPartner] },

  // rear family: receiver on hands-and-knees, partner kneeling behind
  p09: {
    motion: { figure: 1, dx: -8, dy: -2, period: 2.4 },
    props: [{ kind: "surface", y: SURFACE }],
    figures: [
      { color: OX, headR: 38, joints: { head: [112, 326], neck: [180, 334], elbow: [184, 430], wrist: [240, 448], pelvis: [300, 334], knee: [322, 430], ankle: [356, 448] } },
      { color: INK, headR: 38, joints: { head: [394, 214], neck: [388, 266], elbow: [352, 312], wrist: [334, 352], pelvis: [378, 362], knee: [388, 438], ankle: [414, 448] } },
    ],
  },
  p19: {
    motion: { figure: 1, dx: -8, dy: -2, period: 2.4 },
    props: [{ kind: "surface", y: SURFACE }, { kind: "pillow", x: 296, y: 420, w: 64, h: 24 }],
    figures: [
      { color: OX, headR: 38, joints: { head: [112, 326], neck: [180, 334], elbow: [184, 428], wrist: [240, 446], pelvis: [300, 332], knee: [322, 416], ankle: [356, 436] } },
      { color: INK, headR: 38, joints: { head: [394, 214], neck: [388, 266], elbow: [352, 312], wrist: [334, 352], pelvis: [378, 362], knee: [388, 438], ankle: [414, 448] } },
    ],
  },
  p30: {
    motion: { figure: 1, dx: -8, dy: -2, period: 2.4 },
    props: [{ kind: "surface", y: SURFACE }, { kind: "pillow", x: 44, y: 150, w: 22, h: 200 }],
    figures: [
      { color: OX, headR: 38, joints: { head: [128, 300], neck: [186, 320], elbow: [140, 300], wrist: [86, 262], pelvis: [304, 332], knee: [326, 430], ankle: [360, 448] } },
      { color: INK, headR: 38, joints: { head: [396, 214], neck: [390, 266], elbow: [354, 312], wrist: [336, 352], pelvis: [380, 362], knee: [390, 438], ankle: [416, 448] } },
    ],
  },

  // side-lying T
  p04: {
    motion: { figure: 1, dx: -6, dy: 0, period: 2.6 },
    props: [{ kind: "surface", y: SURFACE }],
    figures: [
      { color: OX, headR: 38, joints: { head: [108, 360], neck: [182, 366], elbow: [158, 404], wrist: [130, 432], pelvis: [300, 374], knee: [352, 320], ankle: [386, 356] } },
      { color: INK, headR: 38, joints: { head: [368, 212], neck: [364, 262], elbow: [336, 308], wrist: [322, 352], pelvis: [360, 364], knee: [372, 436], ankle: [400, 448] } },
    ],
  },

  // standing, kept separated by height
  p26: {
    motion: { figure: 1, dx: 8, dy: 0, period: 2.6 },
    props: [{ kind: "surface", y: 556 }],
    figures: [
      { color: OX, headR: 36, joints: { head: [318, 132], neck: [322, 198], elbow: [300, 268], wrist: [292, 330], pelvis: [330, 356], knee: [326, 458], ankle: [330, 548] } },
      { color: INK, headR: 36, joints: { head: [178, 300], neck: [190, 350], elbow: [228, 384], wrist: [272, 404], pelvis: [212, 446], knee: [196, 548], ankle: [166, 556] } },
    ],
  },
  p32: {
    motion: { figure: 0, dx: -8, dy: 0, period: 2.5 },
    props: [{ kind: "surface", y: 556 }, { kind: "pillow", x: 78, y: 286, w: 96, h: 16 }],
    figures: [
      { color: INK, headR: 36, joints: { head: [300, 150], neck: [304, 214], elbow: [274, 268], wrist: [250, 320], pelvis: [296, 360], knee: [300, 458], ankle: [296, 548] } },
      { color: OX, headR: 36, joints: { head: [182, 178], neck: [196, 236], elbow: [158, 262], wrist: [118, 286], pelvis: [236, 360], knee: [230, 460], ankle: [236, 548] } },
    ],
  },
};
