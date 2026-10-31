export type Section = "general" | "listening" | "reading" | "writing" | "speaking" | "vocabulary";

export type Lesson = {
  slug: string;
  title: string;
  /** Meta description: one or two sentences, under 160 characters. */
  description: string;
  section: Section;
  level: "All levels" | "Band 5–6" | "Band 6–7" | "Band 7+";
  minutes: number;
  updated: string;
  body: string;
};

export const sectionInfo: Record<Section, { label: string; blurb: string }> = {
  general: { label: "Getting started", blurb: "How the test works, how it is scored and how to plan your preparation." },
  listening: { label: "Listening", blurb: "Four recordings, forty questions: strategies for every question type." },
  reading: { label: "Reading", blurb: "Three long passages in sixty minutes: techniques that save time and marks." },
  writing: { label: "Writing", blurb: "Task 1 and Task 2 explained step by step, with original model answers." },
  speaking: { label: "Speaking", blurb: "What examiners listen for in Parts 1, 2 and 3, and how to sound natural." },
  vocabulary: { label: "Grammar & vocabulary", blurb: "The language that moves you from band 6 to band 7 and beyond." },
};
