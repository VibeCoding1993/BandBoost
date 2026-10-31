import { test } from "node:test";
import assert from "node:assert/strict";
import { lessons } from "../content/lessons";
import { practiceTests } from "../content/practice";
import { isCorrect, normaliseAnswer, questionCount } from "../content/practice-types";
import { countWords } from "../lib/bands";

const staticRoutes = [
  "/", "/lessons/", "/practice/", "/tools/", "/tools/band-score-calculator/", "/tools/writing-practice/",
  "/tools/vocabulary/", "/ai-feedback/", "/about/", "/contact/", "/privacy/", "/terms/",
];
const routes = new Set([
  ...staticRoutes,
  ...lessons.map((l) => `/lessons/${l.slug}/`),
  ...practiceTests.map((t) => `/practice/${t.slug}/`),
]);

test("lessons: unique slugs, sane metadata, enough content", () => {
  assert.equal(new Set(lessons.map((l) => l.slug)).size, lessons.length);
  for (const l of lessons) {
    assert.ok(l.description.length <= 170, `${l.slug}: description too long (${l.description.length})`);
    assert.ok(countWords(l.body) >= 550, `${l.slug}: only ${countWords(l.body)} words`);
    assert.match(l.updated, /^\d{4}-\d{2}-\d{2}$/);
  }
});

test("every internal link in lessons points to an existing page", () => {
  for (const l of lessons)
    for (const [, href] of l.body.matchAll(/\]\((\/[^)#\s]*)(?:#[^)]*)?\)/g)) {
      assert.ok(routes.has(href!), `${l.slug}: broken link ${href}`);
    }
});

test("practice tests: numbering, answers and word limits", () => {
  assert.equal(new Set(practiceTests.map((t) => t.slug)).size, practiceTests.length);
  for (const t of practiceTests) {
    const ids = t.groups.flatMap((g) => g.questions.map((q) => q.id));
    assert.deepEqual(ids, Array.from({ length: ids.length }, (_, i) => i + 1), `${t.slug}: questions must be numbered 1..n`);
    assert.equal(questionCount(t), ids.length);
    assert.ok(t.skill === "reading" ? t.passage : t.script?.length, `${t.slug}: missing passage or script`);
    for (const g of t.groups) {
      const limit = /ONE WORD ONLY/.test(g.instructions) ? 1 : /NO MORE THAN TWO WORDS/.test(g.instructions) ? 2 : /NO MORE THAN THREE WORDS/.test(g.instructions) ? 3 : 99;
      for (const q of g.questions) {
        if (q.kind === "choice") {
          assert.ok(q.options.includes(q.answer), `${t.slug} Q${q.id}: answer not among options`);
          assert.ok(isCorrect(q, q.answer));
        } else {
          assert.ok(q.accept.length > 0 && (q.text.match(/____/g) || []).length === 1, `${t.slug} Q${q.id}: one gap and at least one answer`);
          assert.ok(countWords(q.accept[0]!) <= limit, `${t.slug} Q${q.id}: "${q.accept[0]}" breaks the ${limit}-word limit`);
        }
        assert.ok(q.explanation.length > 10);
      }
    }
  }
});

test("gap answers are compared leniently on case, spacing and currency", () => {
  assert.equal(normaliseAnswer("  Bee   Hotels. "), "bee hotels");
  assert.equal(normaliseAnswer("07912 448 361"), "07912448361");
  assert.equal(normaliseAnswer("£120"), "120");
  const q = { kind: "gap" as const, id: 1, text: "x ____", accept: ["Thai"], explanation: "…………" };
  assert.ok(isCorrect(q, "thai"));
  assert.ok(!isCorrect(q, "Italian"));
  assert.ok(!isCorrect(q, undefined));
});

test("listening scripts are split into sentence-sized chunks", async () => {
  const { toChunks } = await import("../components/ListeningPlayer");
  const chunks = toChunks([{ speaker: "A", voice: "female", text: "Hello there. It's 3.30, isn't it? Yes!" }]);
  assert.deepEqual(chunks.map((c) => c.text), ["Hello there.", "It's 3.30, isn't it?", "Yes!"]);
  for (const t of practiceTests)
    for (const c of toChunks(t.script || [])) assert.ok(c.text.split(" ").length <= 45, `${t.slug}: chunk too long: ${c.text.slice(0, 40)}…`);
});
