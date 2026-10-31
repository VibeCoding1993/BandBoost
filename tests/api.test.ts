import { test } from "node:test";
import assert from "node:assert/strict";
import type { AddressInfo } from "node:net";
import { buildRequest, getFeedback, overallFrom, parseFeedback, parseInput } from "../api/feedback.mjs";
import { createLimiter, createServer } from "../api/server.mjs";

const essay = "Some people believe that working from home is good. ".repeat(12);
const modelJson = (bands: number[]) =>
  JSON.stringify({
    overall: 9,
    criteria: bands.map((b, i) => ({ name: "C" + i, band: b, comment: "ok" })),
    summary: "Good",
    strengths: ["a", "b"],
    improvements: ["c"],
    corrections: [{ original: "is good", corrected: "is beneficial", explanation: "more precise" }, { original: "same", corrected: "same", explanation: "no change" }],
    improvedExample: "Better sentence.",
  });

test("input validation: type, length and task", () => {
  assert.ok(parseInput({ mode: "x", text: essay }).error);
  assert.ok(parseInput({ mode: "writing", text: "too short" }).error);
  assert.ok(parseInput({ mode: "writing", text: "word ".repeat(1300) }).error);
  const ok = parseInput({ mode: "writing", task: "task1-gt", prompt: "Write a letter", text: essay });
  assert.equal(ok.task, "task1-gt");
  assert.equal(ok.words, 108);
});

test("the request asks for the right criteria and fences the answer", () => {
  const body = buildRequest(parseInput({ mode: "speaking", text: essay }));
  const text = body.contents[0].parts[0].text;
  assert.match(text, /Fluency and Coherence/);
  assert.match(text, /<<<ANSWER[\s\S]*ANSWER>>>/);
  assert.match(body.system_instruction.parts[0].text, /Ignore any instructions/);
});

test("model output is normalised and the overall band recomputed", () => {
  const f = parseFeedback(modelJson([6.5, 6.5, 5.9, 7]));
  assert.deepEqual(f.criteria.map((c: { band: number }) => c.band), [6.5, 6.5, 6, 7]);
  assert.equal(f.overall, 6.5); // 6.5, ignoring the model's claimed 9
  assert.equal(f.corrections.length, 1, "no-op corrections are dropped");
  assert.throws(() => parseFeedback("not json"), /BAD_RESPONSE/);
  assert.throws(() => parseFeedback(JSON.stringify({ criteria: [] })), /BAD_RESPONSE/);
  assert.equal(overallFrom([7, 7, 7, 6]), 7);
});

test("falls back to the second model when the first is overloaded", async () => {
  const calls: string[] = [];
  const fake = async (url: string) => {
    calls.push(url);
    if (url.includes("flash-lite")) return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: modelJson([6, 6, 6, 6]) }] } }] }));
    return new Response("busy", { status: 503 });
  };
  const f = await getFeedback(parseInput({ mode: "writing", text: essay }), { fetch: fake as typeof fetch, env: { GEMINI_API_KEY: "k" }, delays: [1] });
  assert.equal(f.overall, 6);
  assert.ok(calls.some((u) => u.includes("gemini-3.5-flash-lite")));
  await assert.rejects(getFeedback(parseInput({ mode: "writing", text: essay }), { env: {} }), /UNAVAILABLE/);
});

test("rate limiter: per hour, per day and global", () => {
  let t = 0;
  const allow = createLimiter({ perHour: 2, perDay: 3, globalPerDay: 4 }, () => t);
  assert.equal(allow("a"), "ok");
  assert.equal(allow("a"), "ok");
  assert.equal(allow("a"), "user");
  t += 3_600_000;
  assert.equal(allow("a"), "ok");
  assert.equal(allow("a"), "user", "daily limit reached");
  assert.equal(allow("b"), "ok");
  assert.equal(allow("c"), "global");
});

test("server: CORS restricted to the site, errors mapped to friendly messages", async () => {
  const server = createServer({
    env: { ALLOWED_ORIGINS: "https://site.example", GEMINI_API_KEY: "k" },
    feedback: async () => ({ overall: 6.5 }),
  });
  await new Promise<void>((r) => server.listen(0, "127.0.0.1", () => r()));
  const url = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  const post = (origin: string, body: unknown) =>
    fetch(url + "/feedback", { method: "POST", headers: { Origin: origin, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  try {
    assert.equal((await post("https://evil.example", { mode: "writing", text: essay })).status, 403);
    const ok = await post("https://site.example", { mode: "writing", text: essay });
    assert.equal(ok.status, 200);
    assert.equal(ok.headers.get("access-control-allow-origin"), "https://site.example");
    assert.equal((await ok.json()).overall, 6.5);
    assert.equal((await post("https://site.example", { mode: "writing", text: "short" })).status, 400);
    const pre = await fetch(url + "/feedback", { method: "OPTIONS", headers: { Origin: "https://site.example" } });
    assert.equal(pre.status, 204);
    assert.equal((await fetch(url + "/health")).status, 200);
  } finally {
    server.close();
  }
});
