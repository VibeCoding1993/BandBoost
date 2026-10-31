import { test } from "node:test";
import assert from "node:assert/strict";
import { countWords, estimateBand, overallBand, rawToBand } from "../lib/bands";

test("raw scores convert with each table", () => {
  assert.equal(rawToBand(40, "listening"), 9);
  assert.equal(rawToBand(30, "listening"), 7);
  assert.equal(rawToBand(29, "listening"), 6.5);
  assert.equal(rawToBand(30, "academicReading"), 7);
  assert.equal(rawToBand(30, "generalReading"), 6);
  assert.equal(rawToBand(0, "listening"), 0);
  assert.equal(rawToBand(55, "listening"), 9);
});

test("short practice sets are scaled to 40 questions", () => {
  assert.equal(estimateBand(13, 13, "academicReading"), 9);
  assert.equal(estimateBand(10, 13, "academicReading"), 7); // 30.8 → 31
  assert.equal(estimateBand(0, 0, "listening"), 0);
});

test("overall band rounding follows the quarter-band rule", () => {
  assert.equal(overallBand([6.5, 6.5, 5, 7]), 6.5); // 6.25 → 6.5
  assert.equal(overallBand([6.5, 6.5, 6.5, 7]), 6.5); // 6.625 → 6.5
  assert.equal(overallBand([7, 7, 7, 6]), 7); // 6.75 → 7
  assert.equal(overallBand([6, 6, 6, 6.5]), 6); // 6.125 → 6
  assert.ok(Number.isNaN(overallBand([6, 6, 6])));
  assert.ok(Number.isNaN(overallBand([6, 6, 6, 9.5])));
});

test("word count treats contractions and hyphenated words as one", () => {
  assert.equal(countWords("  It's a well-known fact that 2,000 people agree.  "), 8);
  assert.equal(countWords(""), 0);
});
