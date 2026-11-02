// IELTS General Training → Canadian Language Benchmark (CLB), from IRCC's Express Entry
// language test page (checked 2 November 2026). Each skill is converted on its own.
import type { Skills } from "@/content/requirement-types";

/** [CLB, Listening, Reading, Writing, Speaking]: the minimum band in each skill for that level. */
const table: [number, ...Skills][] = [
  [10, 8.5, 8.0, 7.5, 7.5],
  [9, 8.0, 7.0, 7.0, 7.0],
  [8, 7.5, 6.5, 6.5, 6.5],
  [7, 6.0, 6.0, 6.0, 6.0],
  [6, 5.5, 5.0, 5.5, 5.5],
  [5, 5.0, 4.0, 5.0, 5.0],
  [4, 4.5, 3.5, 4.0, 4.0],
];

/** CLB level for one skill (index 0–3 = L, R, W, S); 0 means below CLB 4. */
export function clbFor(skill: 0 | 1 | 2 | 3, band: number): number {
  return table.find((row) => band >= row[skill + 1]!)?.[0] ?? 0;
}

export const clbTable = table;
