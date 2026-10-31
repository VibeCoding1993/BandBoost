import { lessons } from "@/content/lessons";
import { practiceTests } from "@/content/practice";
import { sectionInfo, type Section } from "@/content/types";
import { disclaimer, site } from "./site";

/** llms.txt (https://llmstxt.org): a Markdown map of the site for AI assistants. */
export function llmsTxt() {
  const sections = Object.keys(sectionInfo) as Section[];
  return `# ${site.name}

> ${site.description}

${site.name} is a free, independent IELTS preparation website (no sign-up, no paywall). All lessons, practice tests and model answers are original. ${disclaimer}

## Lessons
${sections
  .map(
    (s) =>
      `\n### ${sectionInfo[s].label}\n` +
      lessons
        .filter((l) => l.section === s)
        .map((l) => `- [${l.title}](${site.url}/lessons/${l.slug}/): ${l.description}`)
        .join("\n"),
  )
  .join("\n")}

## Practice tests
${practiceTests.map((t) => `- [${t.title}](${site.url}/practice/${t.slug}/): ${t.description}`).join("\n")}

## Free tools
- [IELTS band score calculator](${site.url}/tools/band-score-calculator/): converts Listening and Reading raw scores (out of 40) to bands for Academic and General Training, and calculates the overall band with the official rounding rule.
- [Writing timer and word counter](${site.url}/tools/writing-practice/): timed Task 1 and Task 2 practice with original prompts.
- [Vocabulary flashcards](${site.url}/tools/vocabulary/): essential IELTS words and collocations by topic with spaced repetition.
- [Essay checker and speaking practice](${site.url}/ai-feedback/): instant checks on length, paragraphs, linking, repetition and common errors; timed Part 2 speaking practice.

## Optional
- [Full text of all lessons](${site.url}/llms-full.txt)
- [About and editorial policy](${site.url}/about/)
`;
}

/** llms-full.txt: every lesson in full, for assistants that prefer one document. */
export function llmsFullTxt() {
  return (
    `# ${site.name}: all lessons\n\n> ${site.description}\n\n` +
    lessons
      .map((l) => `---\n\n# ${l.title}\n\nURL: ${site.url}/lessons/${l.slug}/\nLevel: ${l.level} · Updated: ${l.updated}\n\n${l.body.trim()}\n`)
      .join("\n")
  );
}
