import { test } from "node:test";
import assert from "node:assert/strict";
import { checkEssay } from "../lib/essay-check";

const ids = (r: ReturnType<typeof checkEssay>, level: string) => r.checks.filter((c) => c.level === level).map((c) => c.id);

test("a short single-paragraph essay with typical errors is flagged", () => {
  const r = checkEssay("Nowadays kids spends a lot of time online. Despite of the risks people is happy. Firstly it is fun. Moreover it is cheap. Furthermore it is easy. Lastly it is fast.", 250);
  assert.ok(ids(r, "bad").includes("length"));
  assert.ok(ids(r, "bad").includes("paras"));
  assert.ok(ids(r, "bad").includes("errors"));
  assert.ok(ids(r, "warn").includes("mech"));
  assert.ok(ids(r, "warn").includes("informal"));
  assert.ok(ids(r, "warn").includes("opinion"));
});

test("a well-formed essay passes the main checks", () => {
  const para = "Although remote work has clear benefits, it also creates challenges for teams. However, careful management can reduce them, which means that companies benefit overall. As a result, employees save time on commuting, and productivity often improves.";
  const essay = ["I believe that remote work is positive. " + para, para.replace("remote", "flexible"), para.replace("teams", "managers"), "In conclusion, on balance the advantages are greater. " + para].join("\n\n");
  const r = checkEssay(essay, 150);
  assert.equal(r.paragraphs, 4);
  assert.ok(ids(r, "good").includes("length"));
  assert.ok(ids(r, "good").includes("paras"));
  assert.ok(ids(r, "good").includes("link"));
  assert.ok(ids(r, "good").includes("errors"));
  assert.ok(!ids(r, "warn").includes("opinion"));
});

test("letters are not penalised for informal language or contractions", () => {
  const r = checkEssay("Hi Sam,\n\nI'm so happy you're coming. It's going to be great, and the kids can't wait.\n\nSee you soon,\nAnna", 150, true);
  assert.ok(!r.checks.some((c) => c.id === "informal" || c.id === "contract"));
});
