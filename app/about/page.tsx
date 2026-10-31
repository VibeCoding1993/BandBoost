import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { aiOn, disclaimer, site } from "@/lib/site";
import { lessons } from "@/content/lessons";
import { practiceTests } from "@/content/practice";

export const metadata: Metadata = { title: "About Us", description: `Who we are and why ${site.name} offers free IELTS preparation.`, alternates: { canonical: "/about/" } };

export default function Page() {
  return (
    <LegalPage
      eyebrow="About"
      title={`About ${site.name}`}
      body={`
${site.name} is a free IELTS preparation website. Our goal is simple: everyone preparing for IELTS should have access to clear, honest and high-quality material, whatever their country or budget.

## What we offer

- **${lessons.length} in-depth lessons** for Listening, Reading, Writing and Speaking, written in plain English and focused on what examiners actually reward.
- **${practiceTests.length} original practice tests** with explanations for every answer and an instant estimated band.
- **Free tools**: a band score calculator, a timed writing environment with a word counter, and vocabulary flashcards with spaced repetition.
${aiOn ? "- **AI feedback** on writing and speaking answers, so that learners who cannot afford a teacher still get specific, actionable comments." : "- **An essay checker and speaking practice tool** that give instant, objective checks on length, organisation, linking, repetition and common errors."}

## Our principles

1. **Everything is original.** We never copy official test material. Our passages, recordings, questions and model answers are written for this site.
2. **Honest estimates.** Practice scores${aiOn ? " and AI feedback" : ""} are estimates to guide your study, and we say so clearly.
3. **Free for learners.** The site is funded by advertising, so that lessons and tools can stay free for everyone.
4. **Privacy first.** No account is needed. Your practice progress is stored in your own browser.

## How we create our content

- **Based on the public test specification.** Lessons follow the published IELTS format and assessment criteria, explained in our own words with our own examples.
- **Original examples.** Every passage, recording script, question and model answer is written for this site. We never reproduce official test papers or other publishers' material.
- **Checked for accuracy.** Each practice question has a written explanation, and our automated checks verify that answers respect the stated word limits and that every internal link works.
- **Kept up to date.** Each lesson shows the date it was last updated. If test rules change, we revise the affected pages.
- **Corrections welcome.** If you spot an error, tell us through the [contact page](/contact/) and we will fix it.

## Independence

${disclaimer}

Questions, corrections or suggestions? Visit our [contact page](/contact/). We read every message.
`}
    />
  );
}
