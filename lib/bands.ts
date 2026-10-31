// Raw score → band conversion. These are the widely published approximate tables;
// the official conversion varies slightly from one test version to another.

type Row = [minCorrect: number, band: number];

const listening: Row[] = [
  [39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6], [18, 5.5],
  [16, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5], [3, 2], [2, 1.5], [1, 1],
];
const academicReading: Row[] = [
  [39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6], [19, 5.5],
  [15, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5], [3, 2], [2, 1.5], [1, 1],
];
const generalReading: Row[] = [
  [40, 9], [39, 8.5], [37, 8], [36, 7.5], [34, 7], [32, 6.5], [30, 6], [27, 5.5],
  [23, 5], [19, 4.5], [15, 4], [12, 3.5], [9, 3], [6, 2.5], [4, 2], [2, 1.5], [1, 1],
];

export type ScoreTable = "listening" | "academicReading" | "generalReading";
const tables: Record<ScoreTable, Row[]> = { listening, academicReading, generalReading };

/** Band for a raw score out of 40 (0 for 0 correct). */
export function rawToBand(correct: number, table: ScoreTable): number {
  const n = Math.max(0, Math.min(40, Math.floor(correct)));
  return tables[table].find(([min]) => n >= min)?.[1] ?? 0;
}

/** Scales a short practice set (e.g. 9/13) to the 40-question scale, then converts it. */
export function estimateBand(correct: number, total: number, table: ScoreTable): number {
  if (total <= 0) return 0;
  return rawToBand(Math.round((correct / total) * 40), table);
}

/**
 * Overall band: mean of the four skills rounded to the nearest half band,
 * with .25 rounding up to .5 and .75 rounding up to the next whole band.
 */
export function overallBand(scores: number[]): number {
  if (scores.length !== 4 || scores.some((s) => !Number.isFinite(s) || s < 0 || s > 9)) return NaN;
  const mean = scores.reduce((a, b) => a + b, 0) / 4;
  const whole = Math.floor(mean);
  const frac = mean - whole;
  if (frac < 0.25) return whole;
  if (frac < 0.75) return whole + 0.5;
  return whole + 1;
}

export const bandLabels: Record<number, string> = {
  9: "Expert user",
  8: "Very good user",
  7: "Good user",
  6: "Competent user",
  5: "Modest user",
  4: "Limited user",
  3: "Extremely limited user",
  2: "Intermittent user",
  1: "Non-user",
  0: "Did not attempt",
};
export const bandLabel = (band: number) => bandLabels[Math.floor(band)] ?? "";

export const formatBand = (band: number) => (Number.isNaN(band) ? "–" : band.toFixed(1));

/** Words in an essay, the way examiners count them (hyphenated words and numbers count as one). */
export function countWords(text: string): number {
  return (text.trim().match(/[\p{L}\p{N}]+(?:[-'’][\p{L}\p{N}]+|(?<=\p{N})[.,]\p{N}+)*/gu) || []).length;
}
