import { lessons } from "@/content/lessons";
import { practiceTests } from "@/content/practice";
import { sectionInfo } from "@/content/types";
import { ogImage } from "@/lib/og";

// Open Graph images exported as real .png files (/og/<slug>.png) so static hosting serves image/png.
export const dynamic = "force-static";
export const dynamicParams = false;

const cards: Record<string, { title: string; label: string }> = {
  home: { title: "Reach your target IELTS band, for free", label: "Free IELTS preparation" },
  ...Object.fromEntries(lessons.map((l) => [l.slug, { title: l.title, label: `IELTS ${sectionInfo[l.section].label} lesson` }])),
  ...Object.fromEntries(practiceTests.map((t) => [t.slug, { title: t.title, label: `Free ${t.skill} practice test` }])),
};

export function generateStaticParams() {
  return Object.keys(cards).map((slug) => ({ image: slug + ".png" }));
}

export async function GET(_: Request, { params }: { params: Promise<{ image: string }> }) {
  const card = cards[(await params).image.replace(/\.png$/, "")]!;
  return ogImage(card);
}
