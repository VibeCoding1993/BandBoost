// Small HTTP API for AI feedback. No dependencies; deploy as a Node web service.
// Env: GEMINI_API_KEY (required), ALLOWED_ORIGINS (comma-separated site origins), PORT,
//      LIMIT_PER_HOUR (default 6), LIMIT_PER_DAY (default 15), GLOBAL_PER_DAY (default 600).
import http from "node:http";
import { getFeedback, parseInput } from "./feedback.mjs";

/** Fixed-window counters kept in memory (reset when the service restarts, which is acceptable here). */
export function createLimiter({ perHour, perDay, globalPerDay }, now = () => Date.now()) {
  const hits = new Map();
  let global = { day: 0, count: 0 };
  return function allow(ip) {
    const t = now();
    const hour = Math.floor(t / 3_600_000);
    const day = Math.floor(t / 86_400_000);
    if (global.day !== day) global = { day, count: 0 };
    const h = hits.get(ip) || { hour, hourCount: 0, day, dayCount: 0 };
    if (h.hour !== hour) Object.assign(h, { hour, hourCount: 0 });
    if (h.day !== day) Object.assign(h, { day, dayCount: 0 });
    if (global.count >= globalPerDay) return "global";
    if (h.hourCount >= perHour || h.dayCount >= perDay) return "user";
    h.hourCount++;
    h.dayCount++;
    global.count++;
    hits.set(ip, h);
    if (hits.size > 50_000) hits.clear();
    return "ok";
  };
}

const messages = {
  user: "You have reached the free feedback limit for now. Please try again later: the limit resets every hour.",
  global: "Our free AI feedback is very popular today and has reached its daily limit. Please come back tomorrow.",
  QUOTA: "The AI service is busy right now. Please try again in a minute.",
  BUSY: "The AI service is busy right now. Please try again in a minute.",
  BAD_RESPONSE: "The AI returned an unexpected answer. Please try again.",
  UNAVAILABLE: "AI feedback is temporarily unavailable. Please try again later.",
};

export function createServer({ env = process.env, feedback = getFeedback } = {}) {
  const origins = (env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim().replace(/\/$/, "")).filter(Boolean);
  const allow = createLimiter({
    perHour: Number(env.LIMIT_PER_HOUR || 6),
    perDay: Number(env.LIMIT_PER_DAY || 15),
    globalPerDay: Number(env.GLOBAL_PER_DAY || 600),
  });

  return http.createServer(async (req, res) => {
    const origin = req.headers.origin || "";
    const cors = origins.includes(origin)
      ? { "Access-Control-Allow-Origin": origin, Vary: "Origin", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" }
      : {};
    const send = (status, body) => {
      res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...cors });
      res.end(JSON.stringify(body));
    };
    const path = (req.url || "/").split("?")[0];
    if (req.method === "GET" && (path === "/" || path === "/health")) return send(200, { status: "ok", ai: !!env.GEMINI_API_KEY });
    if (path !== "/feedback") return send(404, { error: "Not found." });
    if (req.method === "OPTIONS") {
      res.writeHead(origins.includes(origin) ? 204 : 403, cors);
      return res.end();
    }
    if (req.method !== "POST") return send(405, { error: "Method not allowed." });
    // Only our own website may call the API from a browser.
    if (!origins.includes(origin)) return send(403, { error: "Origin not allowed." });

    let raw = "";
    for await (const chunk of req) {
      raw += chunk;
      if (raw.length > 40_000) return send(413, { error: "Your answer is too long." });
    }
    let body;
    try {
      body = JSON.parse(raw);
    } catch {
      return send(400, { error: "Invalid request." });
    }
    const input = parseInput(body);
    if (input.error) return send(400, { error: input.error });

    const ip = String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim();
    const verdict = allow(ip);
    if (verdict !== "ok") return send(429, { error: messages[verdict] });

    try {
      return send(200, await feedback(input, { env }));
    } catch (e) {
      const code = e instanceof Error && e.message in messages ? e.message : "UNAVAILABLE";
      return send(code === "QUOTA" ? 429 : 503, { error: messages[code] });
    }
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT || 8787);
  createServer().listen(port, "0.0.0.0", () => console.log(`Feedback API listening on ${port} (AI ${process.env.GEMINI_API_KEY ? "on" : "off"})`));
}
