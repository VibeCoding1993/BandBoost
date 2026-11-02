// Score-requirement guides, in the order shown on /requirements/.
import type { Requirement } from "./requirement-types";
import { canadaExpressEntry } from "./requirements/canada";
import { ukDoctors, ukNurses, ukSkilledWorker, ukStudent } from "./requirements/uk";
import { australiaNurses, australiaSkilled, australiaStudent, newZealandSkilled } from "./requirements/australia-nz";
import { university } from "./requirements/university";

export const requirements: Requirement[] = [
  canadaExpressEntry,
  ukSkilledWorker,
  ukStudent,
  australiaSkilled,
  australiaStudent,
  newZealandSkilled,
  ukNurses,
  ukDoctors,
  australiaNurses,
  university,
];
export const requirementBySlug = (slug: string) => requirements.find((r) => r.slug === slug);
