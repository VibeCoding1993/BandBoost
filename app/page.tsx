import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, Headphones, Layers, Mic, PenLine, Sparkles } from "lucide-react";
import { lessons } from "@/content/lessons";
import { practiceTests } from "@/content/practice";
import { vocabulary } from "@/content/vocabulary";
import { site } from "@/lib/site";

const featured = [
  "ielts-band-scores-explained",
  "true-false-not-given",
  "writing-task-2-essay-structure",
  "speaking-part-2-cue-card",
  "writing-task-1-academic-line-graph",
  "ielts-study-plan",
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Free IELTS preparation</span>
            <h1>
              Reach your target band, <em>without paying for a course.</em>
            </h1>
            <p className="lead">
              Clear lessons for every section, original practice tests with instant scores, and AI feedback on your writing
              and speaking. Built for learners everywhere: no sign-up, no paywall.
            </p>
            <div className="btn-row" style={{ marginTop: 26 }}>
              <Link href="/practice/" className="btn primary">
                Take a free practice test <ArrowRight size={18} aria-hidden />
              </Link>
              <Link href="/lessons/" className="btn ghost">
                Browse lessons
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <b>{lessons.length}</b>
                <span>in-depth lessons</span>
              </div>
              <div>
                <b>{practiceTests.length}</b>
                <span>practice tests</span>
              </div>
              <div>
                <b>{vocabulary.length}</b>
                <span>key words</span>
              </div>
              <div>
                <b>100%</b>
                <span>free</span>
              </div>
            </div>
          </div>
          <div className="card band-card" aria-label="Example of a band score report">
            <span className="eyebrow">Example score report</span>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span className="big-band">7.5</span>
              <span className="muted">Overall band · Good user</span>
            </div>
            <ul className="skill-bars">
              {[
                ["Listening", 8],
                ["Reading", 7.5],
                ["Writing", 6.5],
                ["Speaking", 7.5],
              ].map(([k, v]) => (
                <li key={k}>
                  <span>{k}</span>
                  <span className="bar">
                    <span style={{ width: `${((v as number) / 9) * 100}%` }} />
                  </span>
                  <span>{(v as number).toFixed(1)}</span>
                </li>
              ))}
            </ul>
            <p className="small muted" style={{ marginTop: 18, marginBottom: 0 }}>
              Writing is usually the lowest band. Our <Link href="/ai-feedback/">AI feedback</Link> shows you exactly why.
            </p>
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="container">
          <span className="eyebrow">Everything you need</span>
          <h2>Four ways to prepare</h2>
          <div className="card-grid" style={{ marginTop: 24 }}>
            {[
              { href: "/lessons/", icon: <BookOpen size={22} aria-hidden />, tone: "", title: "Lessons", text: "Strategies for every question type, with original model answers and examiner insights." },
              { href: "/practice/", icon: <Headphones size={22} aria-hidden />, tone: "good", title: "Practice tests", text: "Timed Listening and Reading tests with explanations and an instant band estimate." },
              { href: "/tools/", icon: <Calculator size={22} aria-hidden />, tone: "warn", title: "Free tools", text: "Band calculator, writing timer with word counter, and spaced-repetition flashcards." },
              { href: "/ai-feedback/", icon: <Sparkles size={22} aria-hidden />, tone: "accent", title: "AI feedback", text: "Estimated bands and corrections for your essays and spoken answers in seconds." },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="card link-card">
                <span className={"icon-chip " + c.tone}>{c.icon}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <span className="more">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">Start here</span>
          <h2>Most popular lessons</h2>
          <div className="card-grid" style={{ marginTop: 24 }}>
            {featured
              .map((slug) => lessons.find((l) => l.slug === slug)!)
              .map((l) => (
                <Link key={l.slug} href={`/lessons/${l.slug}/`} className="card link-card">
                  <span className={"tag " + l.section}>{l.minutes} min read</span>
                  <h3>{l.title}</h3>
                  <p>{l.description}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="container hero-grid" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">How it works</span>
            <h2>A simple routine that works</h2>
            <ol className="prose" style={{ paddingLeft: "1.2em" }}>
              <li>
                <strong>Find your level.</strong> Take a <Link href="/practice/">practice test</Link> and convert your score
                with the <Link href="/tools/band-score-calculator/">band calculator</Link>.
              </li>
              <li>
                <strong>Learn the technique.</strong> Read the lessons for your weakest section.
              </li>
              <li>
                <strong>Practise and get feedback.</strong> Write timed essays, record Part 2 answers, and check them with{" "}
                <Link href="/ai-feedback/">AI feedback</Link>.
              </li>
              <li>
                <strong>Build vocabulary daily.</strong> Ten minutes of <Link href="/tools/vocabulary/">flashcards</Link> a
                day adds up fast.
              </li>
            </ol>
          </div>
          <div className="card">
            <h3>
              <PenLine size={18} aria-hidden style={{ verticalAlign: -3 }} /> Try it now
            </h3>
            <p className="muted">Write a Task 2 essay against the clock, then get an estimated band.</p>
            <div className="btn-row">
              <Link href="/tools/writing-practice/" className="btn primary sm">
                Writing practice
              </Link>
              <Link href="/ai-feedback/?tab=speaking" className="btn ghost sm">
                <Mic size={16} aria-hidden /> Speaking practice
              </Link>
              <Link href="/tools/vocabulary/" className="btn ghost sm">
                <Layers size={16} aria-hidden /> Flashcards
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
