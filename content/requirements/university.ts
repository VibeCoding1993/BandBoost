import type { Requirement } from "../requirement-types";

export const university: Requirement = {
  slug: "ielts-score-for-university",
  title: "What IELTS Score Do Universities Require? Typical Entry Scores",
  description:
    "Typical IELTS entry scores for undergraduate, postgraduate and competitive university programs, and how to read the requirement on your offer.",
  country: "Worldwide",
  category: "Study",
  module: "Usually IELTS Academic",
  checked: "2026-11-02",
  targets: [
    { label: "Typical undergraduate: 6.0 overall, 5.5 each", min: [5.5, 5.5, 5.5, 5.5], overall: 6 },
    { label: "Typical postgraduate: 6.5 overall, 6.0 each", min: [6, 6, 6, 6], overall: 6.5 },
    { label: "Competitive programs: 7.0 overall, 6.5 each", min: [6.5, 6.5, 6.5, 6.5], overall: 7 },
  ],
  sources: [
    { label: "GOV.UK: Student visa, knowledge of English", url: "https://www.gov.uk/student-visa/knowledge-of-english" },
    { label: "Home Affairs (Australia): English language visa requirements", url: "https://immi.homeaffairs.gov.au/help-support/meeting-our-requirements/english-language" },
  ],
  body: `
"What IELTS score do I need for university?" has no single answer: every university, and often every course, sets its own requirement. But the requirements follow clear patterns, and once you understand them you can set a realistic target before you even apply.

## Typical entry scores

These are typical figures seen across universities in the UK, Australia, Canada, Ireland, New Zealand and the United States. They are a guide, not a rule.

| Level of study | Typical overall | Typical minimum in each skill |
|---|---|---|
| Foundation or pathway | 5.0–5.5 | 4.5–5.0 |
| Undergraduate | 6.0–6.5 | 5.5–6.0 |
| Postgraduate (master's) | 6.5 | 6.0 |
| Competitive programs (law, medicine, teaching, journalism) | 7.0–7.5 | 6.5–7.0 |

## How to read a requirement

University requirements usually have **two parts**: an overall band, and a minimum for each skill. "6.5 overall with no less than 6.0 in any component" means that 7.5, 7.5, 6.0, 5.5 fails, even though the overall is 6.5, because Speaking is below 6.0.

Some programs add a **separate Writing minimum**, because written assignments are central to the course. Read the full sentence on the course page or offer letter, not just the first number.

## Academic or General Training?

Universities almost always require **IELTS Academic**. General Training is designed for work and migration. If you are not sure, read our guide to [Academic vs General Training](/lessons/ielts-academic-vs-general-training/).

## The visa requirement is separate

Your **student visa** has its own English rule, which is usually lower than the university's:

- **UK:** CEFR B2 for degree-level study (5.5 in each skill with IELTS for UKVI). See our [UK Student visa guide](/requirements/ielts-score-for-uk-student-visa/).
- **Australia:** 6.0 overall for a standalone course. See our [Australian Student visa guide](/requirements/ielts-score-for-australia-student-visa/).

Meeting the university requirement normally means you also meet the visa requirement, but check both.

## Test results and timing

Most universities accept results up to **two years** old. Plan to take the test early enough to retake it before your application deadline if needed. Many students need two attempts to reach a per-skill minimum.

## Planning your preparation

1. Take a timed [practice test](/practice/) and convert your scores with the [band calculator](/tools/band-score-calculator/).
2. Enter your four scores in the checker on this page and see which skill is furthest from your target.
3. Follow our [IELTS study plan](/lessons/ielts-study-plan/), giving most time to the weakest skill.
4. For Writing, learn [how examiners mark](/lessons/ielts-writing-band-descriptors-explained/) and practise with the [writing timer](/tools/writing-practice/).

## FAQ

### Is 6.5 a good IELTS score for university?
Yes. An overall 6.5 meets the entry requirement for many undergraduate and postgraduate courses, provided each skill also meets the course minimum, often 6.0.

### Can I study with a lower score?
Many universities offer pre-sessional English or foundation courses for students slightly below the requirement. You join the main course after completing the English course successfully.

### Do universities accept IELTS One Skill Retake?
Many do, but not all. Check the admissions page of each university before relying on a retake.

## Check before you apply

This page is an independent guide. Always confirm the exact requirement on your university's website or offer letter.
`,
};
