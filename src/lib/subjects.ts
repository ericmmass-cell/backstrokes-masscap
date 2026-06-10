import maraImg from "@/assets/testimonial-2.jpg";
import danielImg from "@/assets/testimonial-1.jpg";
import juneImg from "@/assets/meditation.jpg";
import theoImg from "@/assets/testimonial-3.jpg";

/**
 * BackStroke "subjects" · the people you do the protocol alongside.
 *
 * They are not fitness influencers, gurus, or stock-photo amateurs. They are
 * real-feeling adults who happen to be doing this work too, and they look like
 * it: warm light, no leggings logos, no thumbs up.
 *
 * Each subject has one portrait now (the chooser image). In production each
 * gets three additional shots · curl-up, side-plank, bird-dog · and three more
 * for the down-train. For now the portrait stands in for every move.
 */

export type Subject = {
  id: "mara" | "daniel" | "june" | "theo";
  name: string;
  age: number;
  /** One-line bio in brand voice. Sexy because specific, not because thirsty. */
  bio: string;
  /** A second line you only see on the chooser hover. */
  detail: string;
  /** Chooser portrait. */
  image: string;
  /** Per-move images · placeholder for now, all set to the portrait. */
  moves: { curlUp: string; sidePlank: string; birdDog: string };
  accent: "amber" | "blush";
};

export const SUBJECTS: Subject[] = [
  {
    id: "mara",
    name: "Mara",
    age: 34,
    bio: "Says her L4 has opinions she didn't ask for.",
    detail: "Does the protocol with a coffee, often before deciding to. Cohort 03 · day 47.",
    image: maraImg,
    moves: { curlUp: maraImg, sidePlank: maraImg, birdDog: maraImg },
    accent: "blush",
  },
  {
    id: "daniel",
    name: "Daniel",
    age: 41,
    bio: "Runs it before email, like a person.",
    detail: "Stops one rep before he wants to. Has, against expectations, become a side-plank guy.",
    image: danielImg,
    moves: { curlUp: danielImg, sidePlank: danielImg, birdDog: danielImg },
    accent: "amber",
  },
  {
    id: "june",
    name: "June",
    age: 38,
    bio: "Postpartum return. Doesn't care about the streak.",
    detail: "Decompression week 6. The supine breath finally clicked on a Tuesday she didn't expect it to.",
    image: juneImg,
    moves: { curlUp: juneImg, sidePlank: juneImg, birdDog: juneImg },
    accent: "blush",
  },
  {
    id: "theo",
    name: "Theo",
    age: 36,
    bio: "Sciatica, mostly retired. The hinge re-pattern did the talking.",
    detail: "Won't be drawn on the candle question. Tipped his foam roller into a river last spring.",
    image: theoImg,
    moves: { curlUp: theoImg, sidePlank: theoImg, birdDog: theoImg },
    accent: "amber",
  },
];

export function getSubject(id: string | null): Subject | null {
  if (!id) return null;
  return SUBJECTS.find((s) => s.id === id) ?? null;
}

export function getStoredSubject(): Subject | null {
  try {
    return getSubject(localStorage.getItem("bs.subject"));
  } catch {
    return null;
  }
}

export function setStoredSubject(id: Subject["id"]) {
  try {
    localStorage.setItem("bs.subject", id);
  } catch {}
}
