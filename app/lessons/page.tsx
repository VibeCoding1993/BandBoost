import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Headphones, Lightbulb, Mic, PenLine, Type } from "lucide-react";
import { lessonsBySection } from "@/content/lessons";
import { sectionInfo, type Section } from "@/content/types";

export const metadata: Metadata = {
  title: "Free IELTS Lessons for Every Section",
  description:
    "Free IELTS lessons for Listening, Reading, Writing and Speaking: strategies, model answers and grammar for band 7 and above.",
  alternates: { canonical: "/lessons/" },
};

const icons: Record<Section, React.ReactNode> = {
  general: <Lightbulb size={22} aria-hidden />,
  listening: <Headphones size={22} aria-hidden />,
  reading: <BookOpen size={22} aria-hidden />,
  writing: <PenLine size={22} aria-hidden />,
  speaking: <Mic size={22} aria-hidden />,
  vocabulary: <Type size={22} aria-hidden />,
};

export default function LessonsPage() {
  const sections = Object.keys(sectionInfo) as Section[];
  return (
    <div className="container">
      <header className="page-head section">
        <span className="eyebrow">Lessons</span>
        <h1>Free IELTS lessons</h1>
        <p className="lead">
          Clear, original guides for every part of the test, written to help you understand what examiners reward and how
          to practise it.
        </p>
      </header>
      {sections.map((s) => (
        <section key={s} id={s} className="section" style={{ paddingTop: 0 }}>
          <h2>
            <span className={"icon-chip"} style={{ display: "inline-grid", verticalAlign: "middle", marginRight: 12 }}>
              {icons[s]}
            </span>
            {sectionInfo[s].label}
          </h2>
          <p className="muted">{sectionInfo[s].blurb}</p>
          <div className="card-grid">
            {lessonsBySection(s).map((l) => (
              <Link key={l.slug} href={`/lessons/${l.slug}/`} className="card link-card glow-card reveal">
                <span className={"tag " + l.section}>
                  {l.level} · {l.minutes} min
                </span>
                <h3>{l.title}</h3>
                <p>{l.description}</p>
                <span className="more">Read lesson →</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
