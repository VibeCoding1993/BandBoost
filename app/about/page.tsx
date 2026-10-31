import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { disclaimer, site } from "@/lib/site";

export const metadata: Metadata = { title: "About Us", description: `Who we are and why ${site.name} offers free IELTS preparation.`, alternates: { canonical: "/about/" } };

export default function Page() {
  return (
    <LegalPage
      eyebrow="About"
      title={`About ${site.name}`}
      body={`
${site.name} is a free IELTS preparation website. Our goal is simple: everyone preparing for IELTS should have access to clear, honest and high-quality material, whatever their country or budget.

## What we offer

- **In-depth lessons** for Listening, Reading, Writing and Speaking, written in plain English and focused on what examiners actually reward.
- **Original practice tests** with explanations for every answer and an instant estimated band.
- **Free tools**: a band score calculator, a timed writing environment with a word counter, and vocabulary flashcards with spaced repetition.
- **AI feedback** on writing and speaking answers, so that learners who cannot afford a teacher still get specific, actionable comments.

## Our principles

1. **Everything is original.** We never copy official test material. Our passages, recordings, questions and model answers are written for this site.
2. **Honest estimates.** Practice scores and AI feedback are estimates to guide your study, and we say so clearly.
3. **Free for learners.** The site is funded by advertising, so that lessons and tools can stay free for everyone.
4. **Privacy first.** No account is needed. Your practice progress is stored in your own browser.

## Independence

${disclaimer}

Questions, corrections or suggestions? Visit our [contact page](/contact/). We read every message.
`}
    />
  );
}
