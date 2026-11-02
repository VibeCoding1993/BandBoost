import type { Requirement } from "../requirement-types";

export const canadaExpressEntry: Requirement = {
  slug: "ielts-score-for-canada-express-entry",
  title: "IELTS Score for Canada Express Entry: CLB Chart and Minimums",
  description:
    "The IELTS General Training scores you need for Express Entry, converted to CLB levels for each skill, with the minimum for each program.",
  country: "Canada",
  category: "Migration",
  module: "IELTS General Training only",
  checked: "2026-11-02",
  clb: true,
  targets: [
    { label: "Federal Skilled Worker: CLB 7", min: [6, 6, 6, 6], note: "Minimum in all four abilities for your first official language." },
    { label: "CLB 9 in every skill", min: [8, 7, 7, 7], note: "Not a minimum, but a common target because higher CLB levels earn more points." },
    { label: "Canadian Experience Class (TEER 2 or 3): CLB 5", min: [5, 4, 5, 5] },
    { label: "Federal Skilled Trades: CLB 5 / CLB 4", min: [5, 3.5, 4, 5], note: "CLB 5 for speaking and listening, CLB 4 for reading and writing." },
  ],
  sources: [
    {
      label: "IRCC: Express Entry language test results",
      url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/language-test.html",
    },
  ],
  body: `
Canada does not ask for an "overall" IELTS band. Immigration, Refugees and Citizenship Canada (IRCC) converts **each of your four scores separately** into a Canadian Language Benchmark (CLB) level, and every program sets a minimum CLB for every skill. A 7.5 overall can still fail if one skill is too low.

## Which IELTS test Canada accepts

For Express Entry, IRCC accepts **IELTS General Training** only. IELTS Academic is not accepted for this purpose, and IRCC states that it does **not accept the IELTS One Skill Retake** for Express Entry. Your results must be **less than two years old** both when you create your Express Entry profile and when you submit your application for permanent residence, so plan the date of your test carefully.

## IELTS to CLB conversion chart

| CLB level | Listening | Reading | Writing | Speaking |
|---|---|---|---|---|
| CLB 10 | 8.5 | 8.0 | 7.5 | 7.5 |
| CLB 9 | 8.0 | 7.0 | 7.0 | 7.0 |
| CLB 8 | 7.5 | 6.5 | 6.5 | 6.5 |
| CLB 7 | 6.0 | 6.0 | 6.0 | 6.0 |
| CLB 6 | 5.5 | 5.0 | 5.5 | 5.5 |
| CLB 5 | 5.0 | 4.0 | 5.0 | 5.0 |
| CLB 4 | 4.5 | 3.5 | 4.0 | 4.0 |

Notice that the scale is not the same for every skill. Listening is the hardest to convert: you need **8.0 in Listening** for CLB 9, but only 7.0 in the other three skills.

## Minimum CLB by program

- **Federal Skilled Worker Program:** CLB 7 in all four abilities, which means at least 6.0 in each skill.
- **Canadian Experience Class:** CLB 7 for jobs in NOC TEER 0 or 1, and CLB 5 for TEER 2 or 3.
- **Federal Skilled Trades Program:** CLB 5 for speaking and listening, and CLB 4 for reading and writing.

## Why candidates aim higher than the minimum

The minimum only makes you eligible. In the Express Entry pool, candidates are ranked, and language is one of the factors that earns the most points. That is why many applicants aim for **CLB 9 in every skill** (8.0 Listening and 7.0 in Reading, Writing and Speaking) rather than stopping at CLB 7. Use the checker on this page to see which skill is holding you back.

## How to reach CLB 9

- **Listening 8.0** usually means 35 or more correct answers out of 40. Train on spelling, numbers and distractors with our [Listening tips](/lessons/ielts-listening-tips/) and [form completion lesson](/lessons/listening-form-completion-spelling/).
- **Writing 7.0** in General Training includes a letter in Task 1. Study the [General Training letters lesson](/lessons/writing-task-1-general-letters/) and the [band descriptors explained](/lessons/ielts-writing-band-descriptors-explained/).
- **Speaking 7.0** depends on fluency and range more than accent. See [Speaking Part 2](/lessons/speaking-part-2-cue-card/) and [Part 3](/lessons/speaking-part-3/).
- **Reading 7.0** in General Training needs about 34 correct answers. Practise with our [General Training reading test](/practice/) and convert your raw score with the [band score calculator](/tools/band-score-calculator/).

## Before you book

Rules and score tables can change. Always confirm the current figures on the IRCC page linked below before you book a test or submit a profile. This page is an independent study guide and not legal or immigration advice.
`,
};
