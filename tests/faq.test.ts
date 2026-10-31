import { test } from "node:test";
import assert from "node:assert/strict";
import { extractFaq } from "../lib/faq";
import { lessons } from "../content/lessons";

test("FAQ sections are extracted with clean answers", () => {
  const md = "Intro\n\n## FAQ\n\n### Is it free?\nYes, **completely** free. See [tools](/tools/).\n\n### Second?\nAnswer two.\n\nTrailing paragraph.\n";
  assert.deepEqual(extractFaq(md), [
    { q: "Is it free?", a: "Yes, completely free. See tools." },
    { q: "Second?", a: "Answer two. Trailing paragraph." },
  ]);
  assert.deepEqual(extractFaq("No faq here"), []);
});

test("several lessons expose FAQs", () => {
  const withFaq = lessons.filter((l) => extractFaq(l.body).length >= 2);
  assert.ok(withFaq.length >= 8, `only ${withFaq.length} lessons with a FAQ`);
});
