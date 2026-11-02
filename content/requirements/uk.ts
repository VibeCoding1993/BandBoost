import type { Requirement } from "../requirement-types";

const selt = {
  label: "GOV.UK: Prove your English with a Secure English Language Test (SELT)",
  url: "https://www.gov.uk/guidance/prove-your-english-language-abilities-with-a-secure-english-language-test-selt",
};

export const ukSkilledWorker: Requirement = {
  slug: "ielts-score-for-uk-skilled-worker-visa",
  title: "IELTS Score for the UK Skilled Worker Visa (B2 from 2026)",
  description:
    "The UK Skilled Worker visa now requires English at CEFR B2: what that means in IELTS for UKVI scores, who still needs only B1, and who is exempt.",
  country: "United Kingdom",
  category: "Migration",
  module: "IELTS for UKVI (a Secure English Language Test)",
  checked: "2026-11-02",
  targets: [
    { label: "B2: new Skilled Worker applicants", min: [5.5, 5.5, 5.5, 5.5] },
    { label: "B1: extending a visa held before 8 January 2026", min: [4, 4, 4, 4] },
  ],
  sources: [
    { label: "GOV.UK: Skilled Worker visa, knowledge of English", url: "https://www.gov.uk/skilled-worker-visa/knowledge-of-english" },
    selt,
    {
      label: "GOV.UK: English language requirement levels for immigration applications",
      url: "https://www.gov.uk/government/publications/english-language-requirement-levels-for-immigration-applications/english-language-requirement-levels-for-immigration-applications",
    },
  ],
  body: `
The English requirement for the UK Skilled Worker visa went up in 2026. New applicants now need to prove English at **level B2** of the Common European Framework of Reference (CEFR), instead of B1. If you plan to use IELTS, this page explains which test to take and what score you need.

## What score do I need?

The Home Office does not accept every IELTS test for visas. You need **IELTS for UKVI**, a Secure English Language Test (SELT) taken at an approved test centre. According to GOV.UK guidance on SELTs:

| CEFR level | IELTS for UKVI score |
|---|---|
| **B2** | at least **5.5 in each** of Listening, Reading, Writing and Speaking |
| **B1** | at least **4.0 in each** of the four skills |

The rule is per skill, not overall. A candidate with 7.0, 7.0, 7.0 and 5.0 does not meet B2, because Speaking is below 5.5.

## Who needs B2 and who needs B1?

- **New applicants:** B2.
- **Switching from another visa** to the Skilled Worker route: B2.
- **Extending or updating a Skilled Worker visa you held before 8 January 2026:** B1 is still accepted.
- **Switching from a Health and Care Worker visa:** you do not need to prove your English again.

## Who does not need a test?

You may not need to take IELTS at all if you:

- are a national of a country on the government's exempt list, such as Australia, Canada, New Zealand or the USA;
- have a degree taught in English (from the UK, or from abroad with an Ecctis assessment confirming it is equivalent to a UK bachelor's degree or higher);
- have a UK school qualification in English, such as a GCSE or A level, begun before age 18;
- are a doctor, dentist, nurse, midwife or vet who has already passed an English assessment accepted by your professional body.

## Academic or General Training?

IELTS for UKVI exists in both Academic and General Training versions. For a work visa, the General Training version is the usual choice, but check that your test centre is listed as approved for UKVI before you pay. A standard IELTS test (not UKVI) is not a SELT.

## How to make sure every skill reaches 5.5

Most candidates who miss B2 do so because of **one** weak skill, usually Writing or Speaking. Spend most of your preparation time there:

- learn the structure of [Writing Task 2 essays](/lessons/writing-task-2-essay-structure/) and practise under time pressure with the [writing timer](/tools/writing-practice/);
- avoid the errors that pull Writing below 5.5, listed in [common IELTS mistakes](/lessons/common-ielts-mistakes/);
- practise long turns in [Speaking Part 2](/lessons/speaking-part-2-cue-card/) until you can talk for two minutes without long pauses.

## Check before you apply

Immigration rules change regularly. Confirm the current requirement on GOV.UK (links below) before booking. This page is an independent study guide and not immigration advice.
`,
};

export const ukStudent: Requirement = {
  slug: "ielts-score-for-uk-student-visa",
  title: "IELTS Score for a UK Student Visa: B1, B2 and University Minimums",
  description:
    "The English level for a UK Student visa (B2 for degrees, B1 below degree level), the matching IELTS for UKVI scores, and why universities often ask for more.",
  country: "United Kingdom",
  category: "Study",
  module: "IELTS for UKVI, or the test your university accepts",
  checked: "2026-11-02",
  targets: [
    { label: "Degree level (B2) with IELTS for UKVI", min: [5.5, 5.5, 5.5, 5.5] },
    { label: "Below degree level (B1) with IELTS for UKVI", min: [4, 4, 4, 4] },
    { label: "Typical university entry: 6.5 overall, 6.0 each", min: [6, 6, 6, 6], overall: 6.5, note: "A common university requirement, not a visa rule. Your offer letter decides." },
  ],
  sources: [
    { label: "GOV.UK: Student visa, knowledge of English", url: "https://www.gov.uk/student-visa/knowledge-of-english" },
    selt,
  ],
  body: `
If you want to study in the UK, two different English requirements apply to you: the **visa** requirement set by the Home Office, and the **admission** requirement set by your university or college. They are not the same, and the higher one is the one that matters.

## The visa requirement

GOV.UK sets the level by the type of course:

- **Degree level or above** (bachelor's, master's, PhD): English **equivalent to CEFR B2**.
- **Below degree level** (for example a foundation course or pre-sessional English): **CEFR B1**.

If you prove this with **IELTS for UKVI**, GOV.UK's SELT guidance gives these scores:

| CEFR level | IELTS for UKVI |
|---|---|
| B2 | at least **5.5 in each** skill |
| B1 | at least **4.0 in each** skill |

## Your university can assess your English itself

For courses at degree level or above, your higher education provider can assess your English. It may accept a test other than IELTS for UKVI, such as a standard **IELTS Academic** result, as long as the level is at least B2. Your Confirmation of Acceptance for Studies (CAS) will state how your English was assessed. Below degree level, you normally need a SELT such as IELTS for UKVI.

## What universities usually ask for

Most universities set their admission requirement **above** the visa minimum. Common examples are:

- **6.0 overall with at least 5.5 in each skill** for many undergraduate courses;
- **6.5 overall with at least 6.0 in each skill** for many postgraduate courses;
- **7.0 or higher** for law, medicine, teaching, journalism and other language-heavy programs.

These are typical figures only. The score on your offer letter is the one you must meet, and it can include a separate minimum for Writing.

## IELTS for UKVI or standard IELTS Academic?

This is the most common source of confusion. Use this rule of thumb:

- If your university has told you in writing that it will assess your English itself and accepts **IELTS Academic**, a standard IELTS Academic test is usually enough.
- If you are going to a course **below degree level**, or your university asks for a **SELT**, book **IELTS for UKVI** at an approved centre.
- If in doubt, IELTS for UKVI Academic is accepted in both situations, because it is the same test with extra identity checks. It costs a little more, but it removes the risk of booking the wrong test.

## You do not need a test if...

You may be exempt if you are a national of a majority English-speaking country on the government's list, or if you already have a degree taught in English (with an Ecctis assessment for degrees from outside the UK). Check the full list on GOV.UK.

## How to prepare

Universities care most about **Writing**, because it predicts how well you will cope with essays. Work through [Writing Task 1](/lessons/writing-task-1-academic-line-graph/) and [Writing Task 2](/lessons/writing-task-2-opinion-essay/), learn [how examiners mark](/lessons/ielts-writing-band-descriptors-explained/), and test yourself on [Academic Reading](/practice/). Then use the checker on this page with your practice scores.

This page is an independent study guide. Confirm the rules on GOV.UK and with your university before you book a test.
`,
};

export const ukNurses: Requirement = {
  slug: "nmc-ielts-requirements-uk-nurses",
  title: "NMC IELTS Requirements for Nurses and Midwives in the UK",
  description:
    "The IELTS Academic scores the Nursing and Midwifery Council accepts (7.0, with 6.5 in Writing), and the rules for combining two test sittings.",
  country: "United Kingdom",
  category: "Healthcare",
  module: "IELTS Academic only",
  checked: "2026-11-02",
  targets: [{ label: "NMC registration", min: [7, 7, 6.5, 7] }],
  sources: [
    {
      label: "NMC: Accepted English language tests",
      url: "https://www.nmc.org.uk/registration/joining-the-register/english-language-requirements/accepted-tests/",
    },
  ],
  body: `
Nurses and midwives trained outside the UK must show the Nursing and Midwifery Council (NMC) that their English is good enough for safe practice. IELTS is one of the two accepted tests, and the scores are demanding, so it pays to know the exact rules before you book.

## The scores you need

The NMC accepts **IELTS Academic** only. General Training is not accepted. You need at least:

| Skill | Minimum |
|---|---|
| Listening | 7.0 |
| Reading | 7.0 |
| **Writing** | **6.5** |
| Speaking | 7.0 |

The NMC does not set a separate overall band. Every skill must reach its own minimum, so an 8.0 in Listening cannot make up for a 6.0 in Writing.

## Combining two test sittings

If you narrowly miss in one sitting, the NMC lets you combine results from **two** sittings, under strict conditions:

- the two tests must be taken **within 12 months** of each other;
- both must be **no more than two years old** when your application is assessed (the test date counts, not the certificate date);
- you must sit **all four skills** each time;
- across the two sittings you need at least one pass score in each skill;
- **no skill in either sitting may fall below the NMC's floor scores** (check the current minimums on the NMC page);
- you can only combine tests of the **same type**, so IELTS cannot be combined with OET.

## Where nurses usually lose marks

- **Writing Task 1** in the Academic test is a chart, graph, process or map, not a letter. Many nurses who practised General Training letters are surprised by this. Study [line graphs](/lessons/writing-task-1-academic-line-graph/), [bar charts](/lessons/writing-task-1-bar-chart/) and [process diagrams](/lessons/writing-task-1-process-diagram/).
- **Writing Task 2** needs a clear position and well-developed paragraphs. Use our [essay structure lesson](/lessons/writing-task-2-essay-structure/) and the [essay checker](/ai-feedback/).
- **Reading 7.0** in the Academic test needs about 30 correct answers out of 40. Practise [True/False/Not Given](/lessons/true-false-not-given/) and [matching headings](/lessons/matching-headings/), which cost the most marks.
- **Speaking 7.0** rewards fluency and natural linking. Our [Speaking Part 3 lesson](/lessons/speaking-part-3/) shows how to extend answers.

## FAQ

### Does the NMC accept IELTS General Training?
No. The NMC accepts IELTS Academic only. The other accepted test is the Occupational English Test (OET).

### Is there an overall score requirement?
The NMC sets a minimum for each skill (7.0 in Listening, Reading and Speaking, 6.5 in Writing) rather than a separate overall band.

### Can I combine IELTS with OET?
No. You can only combine two sittings of the same type of test, taken within 12 months of each other.

### How old can my results be?
Each test must be no more than two years old when your application is assessed. The NMC counts the test date, not the date on the certificate.

## Before you book

The NMC has reviewed its English requirements several times in recent years. Read the NMC's current guidance (linked below) before you book a test. This page is an independent study guide and not registration advice.
`,
};

export const ukDoctors: Requirement = {
  slug: "gmc-ielts-requirements-uk-doctors",
  title: "GMC IELTS Requirements for Doctors: 7.5 Overall, 7.0 Each",
  description:
    "The IELTS Academic scores the General Medical Council requires (7.5 overall and 7.0 in each skill, in one sitting), plus retake and validity rules.",
  country: "United Kingdom",
  category: "Healthcare",
  module: "IELTS Academic (in person or IELTS Online)",
  checked: "2026-11-02",
  targets: [{ label: "GMC registration", min: [7, 7, 7, 7], overall: 7.5 }],
  sources: [{ label: "General Medical Council: registration and licensing", url: "https://www.gmc-uk.org/" }],
  body: `
International medical graduates who want to work as doctors in the UK must prove their English to the General Medical Council (GMC). IELTS Academic is the most common way to do this, and the GMC's score rules are among the strictest of any regulator.

## The scores you need

The GMC requires, from **IELTS Academic**:

- an **overall score of at least 7.5**, and
- **at least 7.0 in each** of Listening, Reading, Writing and Speaking.

These scores must come from **the same test sitting**. Unlike some nursing regulators, the GMC does not let you combine the best skills from two different tests. The overall requirement was raised from 7.0 to 7.5 in 2014, so be careful with older advice.

## Which test formats are accepted

The GMC accepts IELTS Academic taken **in person** at a test centre and **IELTS Online**. It does not accept the IELTS Indicator test. The GMC also accepts the Occupational English Test (OET) as an alternative to IELTS.

## One Skill Retake

If you miss the requirement in one skill only, the GMC accepts the **IELTS One Skill Retake**, taken **within 60 days** of the original result. Check the conditions on the GMC website before you rely on it, because the retake must meet the same score rules as the full test.

## How long results are valid

IELTS results are generally valid for **two years**, and they must still be valid when you submit your application for registration.

## Why 7.5 overall is harder than it looks

The overall band is the average of your four skills, rounded to the nearest half band. With 7.0 in every skill, your overall is only 7.0. To reach 7.5 you need at least **two skills at 7.5 or above**, or one at 8.0 or above, while keeping the others at 7.0. Try different combinations in our [band score calculator](/tools/band-score-calculator/) or in the checker on this page.

For most doctors, Listening and Reading are the skills where 8.0 is realistic, which gives room for 7.0 in Writing and Speaking. Strengthen Reading speed with [skimming and scanning](/lessons/reading-skimming-scanning/), and use [grammar for band 7](/lessons/grammar-for-band-7/) and [cohesive devices](/lessons/cohesive-devices-linking-words/) to secure 7.0 in Writing.

## FAQ

### Can I combine scores from two IELTS tests for the GMC?
No. The GMC requires the overall and skill scores to come from the same test sitting. The IELTS One Skill Retake is the only way to improve a single skill, within 60 days of the original result.

### Does the GMC accept IELTS Online?
Yes. The GMC accepts IELTS Academic taken in person and IELTS Online. It does not accept the IELTS Indicator test.

### Is there an alternative to IELTS?
Yes. The GMC also accepts the Occupational English Test (OET), which uses medical scenarios. Some doctors find it closer to their daily work.

### My scores are 7.0 in every skill. Is that enough?
No. With 7.0 in each skill your overall band is 7.0, below the 7.5 the GMC requires. You need higher scores in at least some skills.

## Before you book

Check the GMC's current English language guidance before booking. This page is an independent study guide and not registration advice.
`,
};
