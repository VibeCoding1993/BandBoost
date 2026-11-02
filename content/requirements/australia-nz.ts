import type { Requirement } from "../requirement-types";

const homeAffairsEnglish = {
  label: "Department of Home Affairs: English language visa requirements",
  url: "https://immi.homeaffairs.gov.au/help-support/meeting-our-requirements/english-language",
};

export const australiaSkilled: Requirement = {
  slug: "ielts-score-for-australia-pr",
  title: "IELTS Score for Australia PR: Competent, Proficient and Superior English",
  description:
    "The IELTS scores for Competent (6), Proficient (7) and Superior (8) English in Australian skilled migration, and how they affect your points.",
  country: "Australia",
  category: "Migration",
  module: "IELTS Academic or General Training (not IELTS Online)",
  checked: "2026-11-02",
  targets: [
    { label: "Competent English", min: [6, 6, 6, 6], note: "The usual minimum for skilled visas. Earns no points." },
    { label: "Proficient English", min: [7, 7, 7, 7], note: "Earns 10 points in the points test." },
    { label: "Superior English", min: [8, 8, 8, 8], note: "Earns 20 points in the points test." },
  ],
  sources: [
    homeAffairsEnglish,
    { label: "Home Affairs: Proficient English", url: "https://immi.homeaffairs.gov.au/help-support/meeting-our-requirements/english-language/proficient-english" },
    { label: "Home Affairs: Superior English", url: "https://immi.homeaffairs.gov.au/help-support/meeting-our-requirements/english-language/superior-english" },
  ],
  body: `
Australia's skilled migration program describes English ability in levels: **Competent**, **Proficient** and **Superior**. Each level has a minimum IELTS score in **every** skill, and for points-tested visas a higher level adds points to your score.

## The IELTS scores for each level

| Level | Minimum IELTS score | Points |
|---|---|---|
| Competent English | **6.0 in each** skill | 0 |
| Proficient English | **7.0 in each** skill | 10 |
| Superior English | **8.0 in each** skill | 20 |

The Department of Home Affairs treats your **lowest** skill as your level. Its own example: a candidate with 9.0 Listening, 7.5 Reading, 7.0 Writing and 8.0 Speaking has Proficient English, because the lowest score is 7.0. The overall band does not matter here.

## Academic or General Training?

Home Affairs accepts both **IELTS Academic** and **IELTS General Training** for these levels, at the same scores. It does **not** accept tests delivered fully online or with remote supervision, which includes **IELTS Online**. Book a test at a centre (paper or computer-delivered).

## The August 2025 changes

On 7 August 2025, Home Affairs updated its approved English tests and score tables. The IELTS thresholds for Competent, Proficient and Superior did not change, but scores for some other tests (such as PTE Academic and TOEFL iBT) were recalibrated. If you took a test **before** 7 August 2025, check how long your result remains valid for the visa you are applying for.

## Why the jump from 7 to 8 is worth it

Many applicants are competing for a limited number of invitations, and 10 extra points can make a real difference. Superior English is hard, especially **8.0 in Writing and Speaking**. Plan your preparation around your weakest skill:

- **Writing:** learn exactly [what each band descriptor means](/lessons/ielts-writing-band-descriptors-explained/), master [paraphrasing](/lessons/paraphrasing-ielts/) and remove [common mistakes](/lessons/common-ielts-mistakes/).
- **Speaking:** extend your answers naturally in [Part 3](/lessons/speaking-part-3/) and build topic vocabulary with our [flashcards](/tools/vocabulary/).
- **Listening and Reading:** 8.0 needs about 35 correct answers out of 40 in Listening. Use our [practice tests](/practice/) and the [band calculator](/tools/band-score-calculator/) to track progress.

## Worked examples

- **6.5, 7.0, 6.0, 7.5:** the lowest skill is 6.0, so this is Competent English. It meets the minimum for most skilled visas but earns no points.
- **7.5, 8.0, 7.0, 7.0:** the lowest skill is 7.0, so this is Proficient English and earns 10 points.
- **8.5, 9.0, 7.5, 8.0:** an excellent result, but Writing is 7.5, so this is still Proficient English, not Superior. One more half band in Writing would be worth 10 extra points.

The last example is very common. Candidates with strong receptive skills often reach 8.0 or more in Listening and Reading, then miss Superior English by half a band in Writing or Speaking. If that is your situation, put almost all of your preparation time into the productive skills, and consider the IELTS One Skill Retake if it is accepted for your visa.

## Before you book

Your occupation, visa subclass and state nomination can add other requirements. Confirm the current rules on the Home Affairs website (links below). This page is an independent study guide and not migration advice.
`,
};

export const australiaStudent: Requirement = {
  slug: "ielts-score-for-australia-student-visa",
  title: "IELTS Score for an Australian Student Visa (Subclass 500)",
  description:
    "The minimum IELTS score for an Australian Student visa, why packaged courses can accept less, and what Australian universities usually ask for.",
  country: "Australia",
  category: "Study",
  module: "IELTS Academic or General Training (not IELTS Online)",
  checked: "2026-11-02",
  targets: [
    { label: "Student visa, standalone course: 6.0 overall", min: [0, 0, 0, 0], overall: 6, note: "Lower scores can apply when the course is packaged with English (ELICOS) or a foundation program." },
    { label: "Typical undergraduate entry: 6.5 overall, 6.0 each", min: [6, 6, 6, 6], overall: 6.5, note: "A common university requirement, not a visa rule." },
    { label: "Typical competitive program: 7.0 overall, 6.5 each", min: [6.5, 6.5, 6.5, 6.5], overall: 7, note: "Common for nursing, teaching, law and medicine." },
  ],
  sources: [
    homeAffairsEnglish,
    { label: "Home Affairs: Student visa (subclass 500)", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500" },
  ],
  body: `
To study in Australia you need to satisfy two English requirements: the one for the **Student visa (subclass 500)**, set by the Department of Home Affairs, and the one for **admission**, set by your university or college. Usually the university's requirement is higher.

## The visa requirement

For a standalone course, the Student visa minimum is an **IELTS overall band of 6.0**. Home Affairs accepts both **IELTS Academic** and **IELTS General Training** for the Student visa, but it does **not** accept tests taken fully online, including **IELTS Online**.

If your main course is **packaged** with an English language course (ELICOS) or a foundation or pathway program, a lower score can be accepted, because you will study English before your main course begins. The exact thresholds depend on the length of the English course. Ask your education provider which rule applies to your offer.

Some applicants are exempt from providing a test score, for example students enrolled in a standalone ELICOS course, students in registered postgraduate research courses, and those who have completed at least five years of study in an approved English-speaking country.

## The university requirement

Australian universities set their own entry scores, usually **per skill as well as overall**. Typical examples:

- **6.0 to 6.5 overall**, with no skill below 6.0, for many undergraduate and postgraduate courses;
- **7.0 overall** or more, with high minimums in Writing and Speaking, for nursing, teaching, law and medicine.

These are typical figures. The score on your Confirmation of Enrolment or offer is the one you must meet. Note that most universities require **IELTS Academic**, even though the visa itself accepts General Training.

## How to get there

University requirements often include a **minimum in each skill**, and Writing is the most common skill to fall short. Focus on:

- [Writing Task 1 for Academic](/lessons/writing-task-1-academic-line-graph/), including [pie charts](/lessons/writing-task-1-pie-chart/) and [maps](/lessons/writing-task-1-maps/);
- [Task 2 essay structure](/lessons/writing-task-2-essay-structure/) and [model essays](/lessons/writing-task-2-opinion-essay/);
- timed [Academic Reading practice](/practice/) to build speed.

If you are unsure whether to take Academic or General Training, read [Academic vs General Training](/lessons/ielts-academic-vs-general-training/).

## FAQ

### Is IELTS Online accepted for an Australian Student visa?
No. The Department of Home Affairs does not accept English tests delivered fully online or with remote supervision, which includes IELTS Online. Take IELTS on paper or on computer at a test centre.

### Can I use IELTS General Training for a Student visa?
For the visa itself, yes: Home Affairs accepts both Academic and General Training. But most universities require IELTS Academic for admission, so check your offer before booking.

### Is there a minimum score in each skill for the visa?
For a standalone course the visa requirement is expressed as an overall band of 6.0. Your university will usually add its own minimum in each skill, and that is the requirement you need to plan for.

### Do I need a test if I studied in English before?
Possibly not. Applicants who completed at least five years of study in an approved English-speaking country, among other groups, can be exempt. Check the exemption list with Home Affairs and your education provider.

## Before you book

Visa rules change, and Home Affairs updated its approved English tests in August 2025. Confirm the current figures on the Home Affairs website and with your provider. This page is an independent study guide and not migration advice.
`,
};

export const australiaNurses: Requirement = {
  slug: "ahpra-ielts-requirements-australia-nurses",
  title: "AHPRA IELTS Requirements for Nurses and Health Professionals",
  description:
    "The IELTS Academic scores AHPRA and the Nursing and Midwifery Board accept (7.0 overall, 6.5 in Writing), and the rules for two sittings and retakes.",
  country: "Australia",
  category: "Healthcare",
  module: "IELTS Academic only",
  checked: "2026-11-02",
  targets: [{ label: "AHPRA / NMBA registration", min: [7, 7, 6.5, 7], overall: 7 }],
  sources: [
    {
      label: "Ahpra: Accepted English language tests",
      url: "https://www.ahpra.gov.au/Registration/Registration-Standards/English-language-skills/Accepted-English-language-tests",
    },
  ],
  body: `
Nurses, midwives and most other health practitioners who want to register in Australia must meet the English language standard of the National Boards, administered by the Australian Health Practitioner Regulation Agency (Ahpra). This includes the Nursing and Midwifery Board of Australia (NMBA).

## The scores you need

Ahpra accepts **IELTS Academic** with:

| Component | Minimum |
|---|---|
| Overall | 7.0 |
| Listening | 7.0 |
| Reading | 7.0 |
| **Writing** | **6.5** |
| Speaking | 7.0 |

In April 2026 the National Boards updated the minimum scores for several accepted tests to match Home Affairs migration scores. For **IELTS**, the minimum scores did not change, so the table above applies whether you tested before or after 23 April 2026.

## Using two sittings

You can rely on **one** sitting, or on **two sittings within 12 months** of each other. If you use two:

- **each** sitting must reach an **overall score of 7.0**;
- across the two sittings you need at least 7.0 in Listening, Reading and Speaking, and 6.5 in Writing;
- **no component in either sitting can fall below 6.5**;
- results from different test providers cannot be combined.

## IELTS One Skill Retake

Ahpra accepts the IELTS One Skill Retake if you re-sit one component **within 60 days** of the result you are relying on, and all other components and requirements are met. A successful retake does not count as an extra sitting. If you combine two sittings with a retake, all three tests must fall within 12 months.

## How long results are valid

Your results must be from a test taken **within two years** before you lodge your application for registration.

## How to prepare

For most health professionals the hardest components are **Writing** and **Reading** in the Academic test. Academic Writing Task 1 asks you to describe data, not to write a letter. Prepare with [line graphs](/lessons/writing-task-1-academic-line-graph/), [process diagrams](/lessons/writing-task-1-process-diagram/), the [essay structure lesson](/lessons/writing-task-2-essay-structure/) and timed [Academic Reading practice](/practice/). Use the checker on this page with your practice results.

## FAQ

### Does AHPRA accept IELTS General Training?
No. The accepted IELTS test for registration is IELTS Academic.

### I scored 7.5, 7.5, 6.0, 7.5. Can I combine this with another test?
Not with this sitting. When you combine two sittings, no component in either sitting can fall below 6.5, so a 6.0 in Writing cannot be used. A One Skill Retake of Writing within 60 days may be an option instead.

### Did the April 2026 changes make IELTS easier or harder?
Neither. In April 2026 the National Boards updated minimum scores for several tests to match Home Affairs, but for IELTS the minimum scores stayed the same.

### Does this apply to other health professions?
The same accepted tests and minimum scores apply across the National Boards, with the exception noted by Ahpra for the Aboriginal and Torres Strait Islander Health Practice Board. Check your own board's page before applying.

## Before you book

Read the current Ahpra and NMBA guidance (linked below) before booking. This page is an independent study guide and not registration advice.
`,
};

export const newZealandSkilled: Requirement = {
  slug: "ielts-score-for-new-zealand-skilled-migrant",
  title: "IELTS Score for New Zealand's Skilled Migrant Category",
  description:
    "The IELTS score for a New Zealand Skilled Migrant Category resident visa: 6.5 overall for the main applicant and 5.0 for partners and children aged 16+.",
  country: "New Zealand",
  category: "Migration",
  module: "IELTS Academic or General Training, taken at a test centre",
  checked: "2026-11-02",
  targets: [
    { label: "Principal applicant: 6.5 overall", min: [0, 0, 0, 0], overall: 6.5 },
    { label: "Partner or dependent child aged 16+: 5.0 overall", min: [0, 0, 0, 0], overall: 5 },
  ],
  sources: [
    {
      label: "Immigration New Zealand: English language requirements for skilled residence visas",
      url: "https://www.immigration.govt.nz/process-to-apply/applying-for-a-visa/providing-evidence-and-documents-to-support-your-visa-application/english-language-requirements/english-language-requirements-for-skilled-residence-visas/",
    },
  ],
  body: `
New Zealand's Skilled Migrant Category (SMC) resident visa requires the main applicant to show a good standard of English. IELTS is the most widely used way to do it.

## The scores you need

According to Immigration New Zealand (INZ):

- **Principal applicant:** an IELTS **overall score of 6.5 or more**.
- **Partner or dependent child aged 16 or over:** an IELTS **overall score of 5.0 or more**.

Both **IELTS Academic** and **IELTS General Training** are accepted. The test must be taken **in person at a test centre**; at-home tests are not accepted. Your result should be **less than two years old** when you submit your application.

## Overall band, not each skill

Unlike Canada or Australia, the SMC rule for IELTS is based on your **overall** band. The overall band is the average of your four skills, rounded to the nearest half band. For example:

- 7.0, 6.5, 6.0, 6.5 → average 6.5 → overall **6.5** (meets the requirement);
- 7.0, 6.5, 5.5, 6.0 → average 6.25 → rounded up to **6.5** (meets the requirement);
- 6.5, 6.5, 5.5, 6.0 → average 6.125 → overall **6.0** (does not meet it).

Try your own scores in the checker on this page or in our [band score calculator](/tools/band-score-calculator/), which applies the same rounding rule.

## Exemptions

You may not need a test if you are a citizen of Canada, Ireland, the United Kingdom or the United States and have spent a qualifying period working or studying in one of those countries, Australia or New Zealand. Other English tests, such as TOEFL iBT, PTE Academic and Cambridge B2 First, are also accepted at their own scores. Check the exact conditions with INZ.

## How to get to 6.5

Because the overall band is an average, the quickest gains often come from your **strongest receptive skills**. Raising Listening and Reading by half a band each can lift your overall even if Writing stays the same. Practise with our [free tests](/practice/), sharpen [Listening strategy](/lessons/ielts-listening-tips/) and [Reading technique](/lessons/reading-skimming-scanning/), and keep Writing safe with the [Task 2 essay structure](/lessons/writing-task-2-essay-structure/).

## FAQ

### Do I need 6.5 in every skill for the Skilled Migrant Category?
No. For IELTS, Immigration New Zealand sets an overall score of 6.5 for the principal applicant. Your four skill scores are averaged and rounded, so one weaker skill can be balanced by stronger ones.

### Is IELTS Online accepted?
No. INZ requires the test to be taken in person at a test centre, so at-home online tests are not accepted.

### Does my partner need IELTS too?
A partner or dependent child aged 16 or over needs an overall score of 5.0 or more, unless they qualify for an exemption.

### Can I use Academic or General Training?
Both are accepted at the same score. Most applicants choose General Training, because its Reading and Writing tasks are closer to everyday and work English.

## Before you book

INZ updates its residence instructions through amendment circulars. Confirm the current requirement on the INZ website (linked below) before you book. This page is an independent study guide and not immigration advice.
`,
};
