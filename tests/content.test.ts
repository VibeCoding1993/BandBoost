import { test } from "node:test";
import assert from "node:assert/strict";
import { lessons } from "../content/lessons";
import { practiceTests } from "../content/practice";
import { requirements } from "../content/requirements";
import { clbFor } from "../lib/clb";
import { shortfalls } from "../components/RequirementChecker";
import { isCorrect, normaliseAnswer, questionCount } from "../content/practice-types";
import { countWords } from "../lib/bands";

const staticRoutes = [
  "/", "/lessons/", "/practice/", "/requirements/", "/tools/", "/tools/band-score-calculator/", "/tools/writing-practice/",
  "/tools/vocabulary/", "/ai-feedback/", "/about/", "/contact/", "/privacy/", "/terms/",
];
const routes = new Set([
  ...staticRoutes,
  ...lessons.map((l) => `/lessons/${l.slug}/`),
  ...practiceTests.map((t) => `/practice/${t.slug}/`),
  ...requirements.map((r) => `/requirements/${r.slug}/`),
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

test("requirements: unique slugs, sources, enough content, valid links", () => {
  assert.equal(new Set(requirements.map((r) => r.slug)).size, requirements.length);
  for (const r of requirements) {
    assert.ok(r.description.length <= 170, `${r.slug}: description too long (${r.description.length})`);
    assert.ok(countWords(r.body) >= 450, `${r.slug}: only ${countWords(r.body)} words`);
    assert.match(r.checked, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(r.sources.length > 0 && r.sources.every((s) => s.url.startsWith("https://")), `${r.slug}: needs official sources`);
    for (const t of r.targets) assert.ok(t.min.every((m) => m >= 0 && m <= 9 && m * 2 === Math.round(m * 2)), `${r.slug}: bad band in ${t.label}`);
    for (const [, href] of r.body.matchAll(/\]\((\/[^)#\s]*)(?:#[^)]*)?\)/g)) assert.ok(routes.has(href!), `${r.slug}: broken link ${href}`);
  }
});

test("CLB conversion follows the IRCC chart", () => {
  assert.equal(clbFor(0, 8), 9); // Listening 8.0 → CLB 9
  assert.equal(clbFor(0, 7.5), 8);
  assert.equal(clbFor(1, 7), 9); // Reading 7.0 → CLB 9
  assert.equal(clbFor(2, 6), 7);
  assert.equal(clbFor(3, 3.5), 0); // below CLB 4
});

test("requirement checker: per-skill and overall shortfalls", () => {
  const gmc = { label: "GMC", min: [7, 7, 7, 7] as [number, number, number, number], overall: 7.5 };
  assert.equal(shortfalls([7, 7, 7, 7], gmc).ok, false); // overall only 7.0
  assert.equal(shortfalls([8, 7.5, 7, 7], gmc).ok, true); // 7.375 → 7.5
  assert.deepEqual(shortfalls([8, 8, 6.5, 8], gmc).skills, [{ skill: "Writing", gap: 0.5 }]);
});
