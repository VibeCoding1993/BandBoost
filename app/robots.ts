import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

// Search engines and AI assistants are explicitly welcome: being cited by ChatGPT, Perplexity,
// Claude or Gemini depends on their crawlers being allowed to read the lessons.
const aiCrawlers = [
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT browsing on behalf of a user
  "GPTBot",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended", // Gemini
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
  "DuckAssistBot",
  "MistralAI-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }, ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" }))],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
