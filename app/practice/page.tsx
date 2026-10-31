import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Headphones } from "lucide-react";
import { practiceTests } from "@/content/practice";
import { questionCount } from "@/content/practice-types";

export const metadata: Metadata = {
  title: "Free IELTS Practice Tests with Instant Band Scores",
  description:
    "Free IELTS Listening and Reading practice tests with original questions, timers, explanations and an instant estimated band score.",
  alternates: { canonical: "/practice/" },
};

export default function PracticePage() {
  const groups = [
    { skill: "listening" as const, title: "Listening", icon: <Headphones size={22} aria-hidden />, text: "The recording is read aloud in your browser. Exam mode plays it once, as in the real test." },
    { skill: "reading" as const, title: "Reading", icon: <BookOpen size={22} aria-hidden />, text: "Original passages in the Academic and General Training styles, with a timer." },
  ];
  return (
    <div className="container">
      <header className="page-head section">
        <span className="eyebrow">Practice tests</span>
        <h1>Free IELTS practice tests</h1>
        <p className="lead">
          Every question is original and comes with an explanation. Your score is converted into an estimated band as soon
          as you finish.
        </p>
      </header>
      {groups.map((g) => (
        <section key={g.skill} className="section" style={{ paddingTop: 0 }}>
          <h2>
            <span className="icon-chip" style={{ display: "inline-grid", verticalAlign: "middle", marginRight: 12 }}>
              {g.icon}
            </span>
            {g.title}
          </h2>
          <p className="muted">{g.text}</p>
          <div className="card-grid">
            {practiceTests
              .filter((t) => t.skill === g.skill)
              .map((t) => (
                <Link key={t.slug} href={`/practice/${t.slug}/`} className="card link-card glow-card reveal">
                  <span className={"tag " + t.skill}>
                    {questionCount(t)} questions · {t.minutes} min · {t.level}
                  </span>
                  <h3>{t.title}</h3>
                  <p>{t.description}</p>
                  <span className="more">Start test →</span>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
