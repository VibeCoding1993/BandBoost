import type { ScoreTable } from "@/lib/bands";

export type ChoiceQuestion = {
  kind: "choice";
  id: number;
  text: string;
  options: string[];
  /** Exact text of the correct option. */
  answer: string;
  explanation: string;
};
export type GapQuestion = {
  kind: "gap";
  id: number;
  /** Sentence with ____ where the answer goes. */
  text: string;
  /** Every accepted spelling or variant. */
  accept: string[];
  explanation: string;
};
export type Question = ChoiceQuestion | GapQuestion;

export type QuestionGroup = {
  title: string;
  instructions: string;
  /** "select" shows a dropdown (matching tasks); "buttons" shows chips; "list" shows a vertical list. */
  display?: "buttons" | "select" | "list";
  /** Optional box shown above the questions (list of headings, word box…). */
  box?: string[];
  questions: Question[];
};

export type ScriptLine = { speaker: string; voice: "female" | "male"; text: string };

export type PracticeTest = {
  slug: string;
  skill: "reading" | "listening";
  title: string;
  description: string;
  minutes: number;
  table: ScoreTable;
  level: string;
  /** Reading: Markdown passage. */
  passage?: string;
  /** Listening: lines read aloud by the browser. */
  script?: ScriptLine[];
  groups: QuestionGroup[];
};

/** Lower-case, trimmed, single spaces, no final full stop: how gap answers are compared. */
export const normaliseAnswer = (s: string) => {
  const t = s.toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, " ").trim().replace(/[.]$/, "").replace(/^[£$€]\s*/, "").trim();
  // Phone numbers and other digit strings: spacing does not matter.
  return /^[\d\s-]+$/.test(t) ? t.replace(/[\s-]/g, "") : t;
};

export function isCorrect(q: Question, given: string | undefined): boolean {
  if (!given) return false;
  if (q.kind === "choice") return given === q.answer;
  const g = normaliseAnswer(given);
  return q.accept.some((a) => normaliseAnswer(a) === g);
}

export const questionCount = (t: PracticeTest) => t.groups.reduce((n, g) => n + g.questions.length, 0);
