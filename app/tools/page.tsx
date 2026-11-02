import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, Layers, PenLine, Sparkles } from "lucide-react";
import { aiOn } from "@/lib/site";
import { Markdown } from "@/components/Markdown";

export const metadata: Metadata = {
  title: "Free IELTS Tools: Band Calculator, Writing Timer, Flashcards",
  description: "Free IELTS study tools: band score calculator, timed writing practice with word counter, vocabulary flashcards and an essay checker.",
  alternates: { canonical: "/tools/" },
};

const tools = [
  { href: "/tools/band-score-calculator/", icon: <Calculator size={22} aria-hidden />, tone: "", title: "Band score calculator", text: "Convert Listening and Reading raw scores to bands and work out your overall score with the official rounding rule." },
  { href: "/tools/writing-practice/", icon: <PenLine size={22} aria-hidden />, tone: "accent", title: "Writing timer & word counter", text: "Practise Task 1 and Task 2 under real time limits with a live word count and original prompts." },
  { href: "/tools/vocabulary/", icon: <Layers size={22} aria-hidden />, tone: "good", title: "Vocabulary flashcards", text: "96 essential IELTS words and collocations by topic, with spaced repetition that remembers what you find hard." },
  { href: "/ai-feedback/", icon: <Sparkles size={22} aria-hidden />, tone: "warn", title: aiOn ? "AI writing & speaking feedback" : "Essay checker & speaking practice", text: aiOn ? "Get an estimated band and specific corrections for your essay or spoken answer in seconds." : "Instant checks on length, paragraphs, linking, repetition and common errors, plus timed Part 2 speaking practice." },
];

export default function ToolsPage() {
  return (
    <div className="container">
      <header className="page-head section">
        <span className="eyebrow">Free tools</span>
        <h1>Free IELTS study tools</h1>
        <p className="lead">Simple tools that make your daily practice faster and more focused. No sign-up needed.</p>
      </header>
      <div className="card-grid">
        {tools.map((t) => (
          <Link key={t.href} href={t.href} className="card link-card glow-card reveal">
            <span className={"icon-chip " + t.tone}>{t.icon}</span>
            <h3>{t.title}</h3>
            <p>{t.text}</p>
            <span className="more">Open tool →</span>
          </Link>
        ))}
      </div>
      <section className="section narrow">
        <h2>How to use these tools in your study plan</h2>
        <Markdown
          source={`
Tools are most useful when they support a clear routine. A simple weekly pattern that works for most learners:

1. **Take a practice test** from our [practice section](/practice/) and convert your raw score with the **band score calculator**. This tells you which skill is furthest from your target.
2. **Learn the strategy** for that weakness in our [lessons](/lessons/), then practise it the same day.
3. **Write under time pressure** with the **writing timer**: 20 minutes for Task 1 and 40 minutes for Task 2, aiming for at least 150 and 250 words. Writing without a timer gives you a false picture of your level.
4. **Check your draft** with the ${aiOn ? "AI feedback tool" : "essay checker"} and rewrite the weakest paragraph. Rewriting teaches more than writing a new essay every time.
5. **Review vocabulary for ten minutes a day** with the flashcards. Spaced repetition brings back the words you find hard more often, so short daily sessions beat long weekly ones.

All tools work in your browser without an account, and your progress is saved on your own device. Scores and checks are estimates to guide your practice, not official IELTS results.
`}
        />
      </section>
    </div>
  );
}
