import { test } from "node:test";
import assert from "node:assert/strict";
import { grade, masteredCount, nextWord } from "../lib/leitner";

test("grading moves words between boxes", () => {
  let b = grade({}, "a", true);
  b = grade(b, "a", true);
  assert.equal(b.a, 2);
  b = grade(b, "a", false);
  assert.equal(b.a, 0);
  for (let i = 0; i < 9; i++) b = grade(b, "c", true);
  assert.equal(b.c, 4);
  assert.equal(masteredCount(["a", "c"], b), 1);
});

test("the next word comes from the lowest box and is not repeated immediately", () => {
  const boxes = { a: 2, b: 0, c: 0 };
  assert.equal(nextWord(["a", "b", "c"], boxes, "b", () => 0), "c");
  assert.equal(nextWord(["a"], boxes, "a", () => 0), "a");
  assert.equal(nextWord([], boxes), undefined);
});
