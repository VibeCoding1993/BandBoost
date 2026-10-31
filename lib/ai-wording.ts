import { aiOn } from "./site";

// While the AI service is not configured, lesson text must not promise AI band estimates.
const replacements: [string | RegExp, string][] = [
  ["our [AI writing feedback](/ai-feedback/) gives a quick estimate between lessons", "our [essay checker](/ai-feedback/) gives quick automatic checks between lessons"],
  ["Get a criterion-by-criterion estimate of your own essay with our [AI writing feedback](/ai-feedback/).", "Check your own essay against these points with our [essay checker](/ai-feedback/)."],
  ["then get an estimated band from the [AI writing feedback](/ai-feedback/) tool", "then check it with our [essay checker](/ai-feedback/)"],
  ["Our [AI speaking feedback](/ai-feedback/) gives you a random cue card, a preparation timer and an estimated band for your answer.", "Our [speaking practice tool](/ai-feedback/) gives you a random cue card, a preparation timer and instant checks on your answer."],
  [/\[AI (?:writing |feedback )?tool\]\(\/ai-feedback\/\)/g, "[essay checker](/ai-feedback/)"],
  [/\[AI writing feedback\]\(\/ai-feedback\/\)/g, "[essay checker](/ai-feedback/)"],
  [/\[AI speaking feedback\]\(\/ai-feedback\/\)/g, "[speaking practice tool](/ai-feedback/)"],
  [/\[AI feedback\]\(\/ai-feedback\/\)/g, "[essay checker](/ai-feedback/)"],
];

export function adaptAiWording(markdown: string): string {
  if (aiOn) return markdown;
  return replacements.reduce((text, [from, to]) => (typeof from === "string" ? text.split(from).join(to) : text.replace(from, to)), markdown);
}
