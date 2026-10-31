// Lesson registry: the order here is the reading order inside each section.
import type { Lesson, Section } from "./types";
import { lesson as l0 } from "./lessons/test-format";
import { lesson as l1 } from "./lessons/band-scores";
import { lesson as l2 } from "./lessons/study-plan";
import { lesson as l3 } from "./lessons/listening-tips";
import { lesson as l4 } from "./lessons/listening-spelling";
import { lesson as l5 } from "./lessons/tfng";
import { lesson as l6 } from "./lessons/headings";
import { lesson as l7 } from "./lessons/skimming";
import { lesson as l8 } from "./lessons/task1-academic";
import { lesson as l9 } from "./lessons/task1-letters";
import { lesson as l10 } from "./lessons/task2-structure";
import { lesson as l11 } from "./lessons/task2-model";
import { lesson as l12 } from "./lessons/cohesion";
import { lesson as l13 } from "./lessons/speaking1";
import { lesson as l14 } from "./lessons/speaking2";
import { lesson as l15 } from "./lessons/speaking3";
import { lesson as l16 } from "./lessons/grammar7";
import { lesson as l17 } from "./lessons/vocab-topics";
import { lesson as l18 } from "./lessons/mistakes";

export const lessons: Lesson[] = [l0, l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12, l13, l14, l15, l16, l17, l18];

export const lessonBySlug = (slug: string) => lessons.find((l) => l.slug === slug);

export const lessonsBySection = (section: Section) => lessons.filter((l) => l.section === section);

/** Previous and next lessons in reading order, for navigation at the end of an article. */
export function neighbours(slug: string) {
  const i = lessons.findIndex((l) => l.slug === slug);
  return { prev: i > 0 ? lessons[i - 1] : undefined, next: i >= 0 && i < lessons.length - 1 ? lessons[i + 1] : undefined };
}
