// Instant, offline essay checks: objective signals examiners notice, computed in the browser.
// They complement (never replace) a teacher or the AI feedback.
import { countWords } from "./bands";

export type Check = { id: string; level: "good" | "warn" | "bad"; title: string; detail: string };
export type EssayReport = { words: number; paragraphs: number; sentences: number; avgSentence: number; checks: Check[] };

const STOP = new Set(
  "the a an and or but of to in on at for with by from as is are was were be been being it its this that these those there their they them he she we you i my our your his her not no so than then also can could would should will may might must have has had do does did which who whom what when where why how more most many much some any all each other such into about over after before because while if very".split(" "),
);
const MECHANICAL = ["firstly", "secondly", "thirdly", "moreover", "furthermore", "in addition", "additionally", "lastly"];
const LINKERS = ["however", "therefore", "as a result", "consequently", "for example", "for instance", "although", "whereas", "while", "nevertheless", "on the other hand", "in contrast", "admittedly", "in conclusion", "overall", "this means", "which", "despite"];
const INFORMAL: [RegExp, string][] = [
  [/\bkids?\b/gi, "children"],
  [/\ba lot of\b|\blots of\b/gi, "a large number of / a great deal of"],
  [/\bstuff\b/gi, "things / items"],
  [/\bgonna\b|\bwanna\b/gi, "going to / want to"],
  [/\bok(ay)?\b/gi, "acceptable"],
  [/\bget(s|ting)? (better|worse)\b/gi, "improve / deteriorate"],
  [/\bnowadays everybody\b/gi, "many people today"],
];
const ERRORS: [RegExp, string][] = [
  [/\b(informations|advices|researches|equipments|furnitures|knowledges|evidences)\b/gi, "uncountable noun: no -s (information, advice, research…)"],
  [/\bdespite of\b/gi, "“despite” takes no “of”"],
  [/\bpeople is\b/gi, "“people” is plural: people are"],
  [/\bthe number of [a-z]+ (have|are)\b/gi, "“the number of…” is singular: has / is"],
  [/\bdiscuss about\b/gi, "“discuss” takes a direct object: discuss the issue"],
  [/\bin the other hand\b/gi, "the phrase is “on the other hand”"],
  [/\bmore better\b|\bmore easier\b/gi, "double comparative: better / easier"],
  [/\b(can|could|should|must|will|would) to\b/gi, "no “to” after a modal verb"],
];

const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? "" : "s"}`;

export function checkEssay(text: string, minWords: number, isLetter = false): EssayReport {
  const words = countWords(text);
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim()).length;
  const sentenceList = text.split(/(?<=[.!?])\s+/).filter((s) => countWords(s) > 0);
  const sentences = sentenceList.length;
  const avgSentence = sentences ? Math.round((words / sentences) * 10) / 10 : 0;
  const lower = text.toLowerCase();
  const checks: Check[] = [];

  checks.push(
    words >= minWords
      ? { id: "length", level: "good", title: "Length", detail: `${words} words: above the ${minWords}-word minimum.` }
      : { id: "length", level: "bad", title: "Too short", detail: `${words} words. Answers under ${minWords} words lose marks for Task Achievement/Response.` },
  );
  if (words > minWords * 1.6)
    checks.push({ id: "long", level: "warn", title: "Very long", detail: "Extra length earns no marks and usually adds errors. Aim for about 10–20% above the minimum." });

  const expected = isLetter ? 4 : 4;
  checks.push(
    paragraphs >= 3
      ? { id: "paras", level: "good", title: "Paragraphs", detail: `${plural(paragraphs, "paragraph")}: clear organisation.` }
      : { id: "paras", level: "bad", title: "Paragraphing", detail: `Only ${plural(paragraphs, "paragraph")}. Use about ${expected} (leave a blank line between them): examiners check paragraphing under Coherence and Cohesion.` },
  );

  if (avgSentence > 32) checks.push({ id: "sent", level: "warn", title: "Long sentences", detail: `Average ${avgSentence} words per sentence. Very long sentences often hide grammar errors; split some of them.` });
  else if (avgSentence > 0 && avgSentence < 11) checks.push({ id: "sent", level: "warn", title: "Short sentences", detail: `Average ${avgSentence} words per sentence. Combine some ideas with relative clauses or linking words to show grammatical range.` });
  else if (avgSentence) checks.push({ id: "sent", level: "good", title: "Sentence length", detail: `Average ${avgSentence} words per sentence: a good mix for readability.` });

  const mech = MECHANICAL.reduce((n, w) => n + (lower.match(new RegExp(`\\b${w}\\b`, "g")) || []).length, 0);
  const varied = LINKERS.filter((w) => new RegExp(`\\b${w}\\b`).test(lower)).length;
  if (mech >= 4) checks.push({ id: "mech", level: "warn", title: "Mechanical linking", detail: `“Firstly / Moreover / Furthermore”-type words used ${mech} times. Overuse is typical of band 6; connect ideas with reference words (this, such) and cause–effect links instead.` });
  checks.push(
    varied >= 4
      ? { id: "link", level: "good", title: "Linking variety", detail: `${varied} different linking expressions (e.g. however, as a result, although).` }
      : { id: "link", level: "warn", title: "Limited linking", detail: "Few contrast or cause–effect links. Try: however, as a result, although, whereas, this means that." },
  );

  const counts = new Map<string, number>();
  for (const w of lower.match(/[a-z][a-z'-]{3,}/g) || []) if (!STOP.has(w)) counts.set(w, (counts.get(w) || 0) + 1);
  const limit = Math.max(4, Math.round(words / 60));
  const repeated = [...counts.entries()].filter(([, n]) => n > limit).sort((a, b) => b[1] - a[1]).slice(0, 5);
  if (repeated.length)
    checks.push({ id: "repeat", level: "warn", title: "Repeated words", detail: `Used many times: ${repeated.map(([w, n]) => `“${w}” ×${n}`).join(", ")}. Use synonyms or reference words to show lexical range.` });

  if (!isLetter) {
    const informal = INFORMAL.flatMap(([re, fix]) => (text.match(re) || []).slice(0, 1).map((m) => `“${m}” → ${fix}`));
    if (informal.length) checks.push({ id: "informal", level: "warn", title: "Informal language", detail: informal.join("; ") });
    const contractions = (text.match(/\b\w+'(t|s|re|ve|ll|d|m)\b/gi) || []).filter((c) => !/'s$/i.test(c) || /^(it|that|there|what|he|she)'s$/i.test(c));
    if (contractions.length) checks.push({ id: "contract", level: "warn", title: "Contractions", detail: `Write in full in an essay: ${[...new Set(contractions)].slice(0, 4).join(", ")}.` });
  }

  const errors = ERRORS.flatMap(([re, why]) => (text.match(re) || []).slice(0, 1).map((m) => `“${m}”: ${why}`));
  if (errors.length) checks.push({ id: "errors", level: "bad", title: "Common errors found", detail: errors.join("; ") });
  else checks.push({ id: "errors", level: "good", title: "Common errors", detail: "None of the most frequent IELTS errors detected (this check covers common patterns only)." });

  if (!/\b(i believe|in my (view|opinion)|i (would )?argue|i am convinced|i (strongly )?(agree|disagree)|on balance)\b/i.test(text) && !isLetter)
    checks.push({ id: "opinion", level: "warn", title: "Position", detail: "No clear opinion phrase found. Most Task 2 questions require a clear position in the introduction and conclusion." });

  return { words, paragraphs, sentences, avgSentence, checks };
}

const FILLERS = /\b(um+|uh+|erm+|er|you know|i mean|like,|kind of|sort of|basically|actually)\b/gi;

/** Instant checks for a spoken answer transcript (Speaking Part 2). */
export function checkSpeech(text: string, seconds: number): EssayReport {
  const words = countWords(text);
  const minutes = seconds / 60;
  const wpm = minutes > 0.2 ? Math.round(words / minutes) : 0;
  const checks: Check[] = [];
  if (seconds >= 15) {
    checks.push(
      seconds >= 100
        ? { id: "time", level: "good", title: "Speaking time", detail: `You spoke for ${Math.round(seconds)} seconds: close to the full two minutes.` }
        : { id: "time", level: seconds >= 60 ? "warn" : "bad", title: "Speaking time", detail: `You spoke for ${Math.round(seconds)} seconds. Aim for the full two minutes: add details, an example and a reflection at the end.` },
    );
    if (wpm)
      checks.push(
        wpm < 90
          ? { id: "rate", level: "warn", title: "Speaking rate", detail: `${wpm} words per minute: quite slow, with long pauses likely. Practise the same card several times to build fluency.` }
          : wpm > 190
            ? { id: "rate", level: "warn", title: "Speaking rate", detail: `${wpm} words per minute: very fast. Slow down slightly so your pronunciation stays clear.` }
            : { id: "rate", level: "good", title: "Speaking rate", detail: `${wpm} words per minute: a natural, fluent pace.` },
      );
  }
  const fillers = text.match(FILLERS) || [];
  if (fillers.length > Math.max(3, words / 40))
    checks.push({ id: "fillers", level: "warn", title: "Filler words", detail: `${fillers.length} fillers (${[...new Set(fillers.map((f) => f.toLowerCase()))].slice(0, 4).join(", ")}). Replace some with short pauses or phrases such as “Let me think…”.` });
  else checks.push({ id: "fillers", level: "good", title: "Filler words", detail: "Few hesitation words: good for Fluency and Coherence." });
  const base = checkEssay(text, 0, true).checks.filter((c) => c.id === "repeat" || c.id === "link" || c.id === "errors");
  return { words, paragraphs: 1, sentences: 0, avgSentence: wpm, checks: [...checks, ...base] };
}
