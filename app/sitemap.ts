import type { MetadataRoute } from "next";
import { lessons } from "@/content/lessons";
import { practiceTests } from "@/content/practice";
import { requirements } from "@/content/requirements";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/lessons/", "/practice/", "/requirements/", "/tools/", "/tools/band-score-calculator/", "/tools/writing-practice/", "/tools/vocabulary/", "/ai-feedback/", "/about/", "/contact/", "/privacy/", "/terms/"];
  return [
    ...pages.map((p) => ({ url: site.url + p, changeFrequency: "weekly" as const, priority: p === "/" ? 1 : 0.7 })),
    ...lessons.map((l) => ({ url: `${site.url}/lessons/${l.slug}/`, lastModified: l.updated, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...requirements.map((r) => ({ url: `${site.url}/requirements/${r.slug}/`, lastModified: r.checked, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...practiceTests.map((t) => ({ url: `${site.url}/practice/${t.slug}/`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
