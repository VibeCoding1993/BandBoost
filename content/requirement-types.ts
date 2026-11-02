// Score requirements for visas, professions and universities. Every figure must come from the official
// source listed in `sources`, and `checked` is the date it was last compared with that source.

/** Minimum band in each skill, in the order Listening, Reading, Writing, Speaking. */
export type Skills = [listening: number, reading: number, writing: number, speaking: number];

export type Target = {
  label: string;
  /** Per-skill minimums; 0 means no minimum for that skill. */
  min: Skills;
  /** Minimum overall band, when the rule sets one. */
  overall?: number;
  note?: string;
};

export type Requirement = {
  slug: string;
  title: string;
  /** Meta description, under 160 characters. */
  description: string;
  country: "Canada" | "United Kingdom" | "Australia" | "New Zealand" | "Worldwide";
  category: "Migration" | "Study" | "Healthcare";
  /** Which IELTS test the rule accepts, in one short phrase. */
  module: string;
  /** Date the figures were last checked against the official sources (YYYY-MM-DD). */
  checked: string;
  targets: Target[];
  /** Show the Canadian Language Benchmark level for each skill in the checker. */
  clb?: boolean;
  sources: { label: string; url: string }[];
  body: string;
};

export const skillNames = ["Listening", "Reading", "Writing", "Speaking"] as const;
