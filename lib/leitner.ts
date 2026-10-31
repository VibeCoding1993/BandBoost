// Spaced repetition with Leitner boxes: a word moves up a box when you know it and back to box 0 when you don't.
// Lower boxes come back sooner, so difficult words are seen more often.
export type Boxes = Record<string, number>;
export const MASTERED = 3;

export function grade(boxes: Boxes, word: string, known: boolean): Boxes {
  const current = boxes[word] ?? 0;
  return { ...boxes, [word]: known ? Math.min(4, current + 1) : 0 };
}

/** Next word to study: lowest box first, never the word just shown (if there is a choice). */
export function nextWord(words: string[], boxes: Boxes, previous?: string, random = Math.random): string | undefined {
  const pool = words.length > 1 ? words.filter((w) => w !== previous) : words;
  if (!pool.length) return undefined;
  const lowest = Math.min(...pool.map((w) => boxes[w] ?? 0));
  // Mostly the lowest box, sometimes a higher one for review.
  const candidates = random() < 0.8 ? pool.filter((w) => (boxes[w] ?? 0) === lowest) : pool;
  return candidates[Math.floor(random() * candidates.length)];
}

export const masteredCount = (words: string[], boxes: Boxes) => words.filter((w) => (boxes[w] ?? 0) >= MASTERED).length;
