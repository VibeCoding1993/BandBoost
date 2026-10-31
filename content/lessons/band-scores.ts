import type { Lesson } from "../types";

export const lesson: Lesson = {
  slug: "ielts-band-scores-explained",
  title: "IELTS Band Scores Explained: How Your Overall Score Is Calculated",
  description: "What bands 5 to 9 mean, how raw scores become bands and how the overall band is rounded, with worked examples.",
  section: "general",
  level: "All levels",
  minutes: 7,
  updated: "2026-10-31",
  body: `
IELTS does not give you a pass or a fail. Instead, you receive a **band score from 0 to 9** for each of the four skills and an **overall band**. Knowing exactly how those numbers are produced helps you set a realistic target and decide where to spend your study time.

## What each band means

| Band | Description | In practice |
|---|---|---|
| 9 | Expert user | Full, flexible and accurate command of English |
| 8 | Very good user | Occasional inaccuracies in unfamiliar situations |
| 7 | Good user | Handles complex language well, with some errors |
| 6 | Competent user | Effective in familiar situations despite errors |
| 5 | Modest user | Partial command; frequent mistakes |
| 4 | Limited user | Basic competence in familiar situations only |

Most universities ask for an overall band between **6.0 and 7.5**, often with a minimum in each skill (for example, "6.5 overall with no band below 6.0"). Professional registration bodies and some visa programmes ask for 7.0 or more in every skill.

## Listening and Reading: from raw score to band

Listening and Reading each have 40 questions, and every correct answer is worth one mark. Your raw score out of 40 is then converted to a band using a conversion table. The table changes slightly from one test version to another to keep difficulty fair, but typical values look like this:

| Band | Listening (/40) | Academic Reading (/40) | General Reading (/40) |
|---|---|---|---|
| 9 | 39–40 | 39–40 | 40 |
| 8 | 35–36 | 35–36 | 37–38 |
| 7 | 30–31 | 30–32 | 34–35 |
| 6 | 23–25 | 23–26 | 30–31 |
| 5 | 16–17 | 15–18 | 23–26 |

Notice that **General Training Reading needs more correct answers** for the same band, because its texts are easier. You can convert any score with our [band score calculator](/tools/band-score-calculator/).

## Writing and Speaking: assessed against descriptors

Writing and Speaking are marked by trained examiners using public **band descriptors**. Each has four criteria, all equally weighted:

- **Writing:** Task Achievement or Task Response, Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy.
- **Speaking:** Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, Pronunciation.

In Writing, Task 2 carries twice the weight of Task 1. So if you score 6 in Task 1 and 7 in Task 2, your Writing band is calculated as (6 + 7 + 7) ÷ 3 = 6.67, reported as **6.5**.

## How the overall band is rounded

Your overall band is the **average of the four skill bands**, rounded to the nearest half band:

- an average ending in **.25** is rounded **up** to the next half band (6.25 → 6.5);
- an average ending in **.75** is rounded **up** to the next whole band (6.75 → 7.0);
- anything lower stays down (6.125 → 6.0, 6.625 → 6.5).

### Worked examples

| Listening | Reading | Writing | Speaking | Average | Overall |
|---|---|---|---|---|---|
| 6.5 | 6.5 | 5.0 | 7.0 | 6.25 | **6.5** |
| 7.0 | 7.0 | 7.0 | 6.0 | 6.75 | **7.0** |
| 6.0 | 6.0 | 6.0 | 6.5 | 6.125 | **6.0** |

> **Strategy:** because of rounding, raising one weak skill by half a band can lift your overall score. Find the cheapest half band, which is often Listening or Reading, where practice brings quick gains.

## How to use this when you study

1. Take a [practice test](/practice/) and record a band for each skill.
2. Compare each band with your target. The biggest gap is your priority.
3. For Writing and Speaking, study the criteria in our lessons on [Task 2 structure](/lessons/writing-task-2-essay-structure/) and [Speaking Part 2](/lessons/speaking-part-2-cue-card/). Examiners reward specific features, not just "good English".
4. Re-test every two to three weeks to measure progress.

## FAQ

### What is a good IELTS score?
It depends on your goal. Most universities ask for 6.0 to 7.5 overall, often with a minimum in each skill. Professional registration and some visa routes require 7.0 or more in every skill. Check the exact requirement of the organisation you are applying to.

### How is the IELTS overall band rounded?
The four skill bands are averaged. An average ending in .25 rounds up to the next half band, an average ending in .75 rounds up to the next whole band, and anything else rounds down to the nearest half or whole band. For example, 6.25 becomes 6.5 and 6.75 becomes 7.0.

### How many correct answers do I need for band 7 in Listening?
Usually around 30 out of 40. The exact conversion varies slightly between test versions.

Practice scores on any website are estimates. Only an official test result is valid for applications.
`,
};
