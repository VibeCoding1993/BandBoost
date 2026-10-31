import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  CheckCircle2,
  Headphones,
  Layers,
  Mic,
  PenLine,
  Sparkles,
} from "lucide-react";
import { HeroQuiz } from "@/components/HeroQuiz";
import { lessons } from "@/content/lessons";
import { practiceTests } from "@/content/practice";
import { vocabulary } from "@/content/vocabulary";
import { aiOn, site } from "@/lib/site";

const featured = [
  "ielts-band-scores-explained",
  "true-false-not-given",
  "writing-task-2-essay-structure",
  "speaking-part-2-cue-card",
  "writing-task-1-academic-line-graph",
  "ielts-study-plan",
];

const topics = [
  "Education", "Environment", "Technology", "Health", "Work", "Cities", "Crime", "Tourism",
  "Media", "Science", "Family", "Culture", "Transport", "Food", "Sport", "Globalisation",
];

const sectionIcon = {
  general: <Sparkles size={18} aria-hidden />,
  listening: <Headphones size={18} aria-hidden />,
  reading: <BookOpen size={18} aria-hidden />,
  writing: <PenLine size={18} aria-hidden />,
  speaking: <Mic size={18} aria-hidden />,
  vocabulary: <Layers size={18} aria-hidden />,
};

export default function Home() {
  const jsonLd = { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url, description: site.description };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="hero mesh">
        <div className="mesh-blob b1" aria-hidden />
        <div className="mesh-blob b2" aria-hidden />
        <div className="mesh-blob b3" aria-hidden />
        <div className="grid-overlay" aria-hidden />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="pill-badge">
              <span className="dot" aria-hidden /> 100% free · no sign-up
            </span>
            <h1>
              Reach your target band <span className="gradient-text">without paying for a course.</span>
            </h1>
            <p className="lead">
              Clear lessons for every section, original practice tests with instant scores, and{" "}
              {aiOn ? "AI feedback" : "instant checks"} on your writing and speaking, for learners everywhere.
            </p>
            <div className="btn-row" style={{ marginTop: 28 }}>
              <Link href="/practice/" className="btn primary shine">
                Take a free practice test <ArrowRight size={18} aria-hidden />
              </Link>
              <Link href="/ai-feedback/" className="btn ghost">
                <Sparkles size={18} aria-hidden /> {aiOn ? "Get AI feedback" : "Check my essay"}
              </Link>
            </div>
            <ul className="hero-checks">
              {["Academic & General Training", "Instant band estimates", "Works on any phone"].map((t) => (
                <li key={t}>
                  <CheckCircle2 size={16} aria-hidden /> {t}
                </li>
              ))}
            </ul>
          </div>
          <HeroQuiz />
        </div>
        <div className="container">
          <dl className="stats-strip reveal">
            <div><dt>Lessons</dt><dd>{lessons.length}</dd></div>
            <div><dt>Practice tests</dt><dd>{practiceTests.length}</dd></div>
            <div><dt>Key words</dt><dd>{vocabulary.length}</dd></div>
            <div><dt>Price</dt><dd>$0</dd></div>
          </dl>
        </div>
      </section>

      <div className="marquee" aria-label="Common IELTS topics">
        <div className="marquee-track">
          {[...topics, ...topics].map((t, i) => (
            <span key={i} aria-hidden={i >= topics.length}>{t}</span>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Everything you need</span>
            <h2>One place to prepare for every section</h2>
          </div>
          <div className="bento">
            <Link href="/practice/" className="bento-card b-wide glow-card reveal">
              <span className="icon-chip good"><Headphones size={22} aria-hidden /></span>
              <h3>Practice tests that feel real</h3>
              <p>Timed Listening and Reading tests with original questions, explanations for every answer and an instant band.</p>
              <div className="mini-score" aria-hidden>
                <span className="mini-ring"><b>7.0</b></span>
                <ul>
                  <li><span className="ok">✓</span> True / False / Not Given</li>
                  <li><span className="ok">✓</span> Matching headings</li>
                  <li><span className="ko">✗</span> Sentence completion</li>
                </ul>
              </div>
            </Link>
            <Link href="/ai-feedback/" className="bento-card b-tall glow-card accent reveal">
              <span className="icon-chip accent"><Sparkles size={22} aria-hidden /></span>
              <h3>{aiOn ? "AI feedback in seconds" : "Instant essay checker"}</h3>
              <p>{aiOn ? "Paste an essay or record a Part 2 answer. Get a band for each criterion and line-by-line corrections." : "Paste an essay or record a Part 2 answer. Get instant checks on length, linking, repetition and common errors."}</p>
              <div className="mini-correction" aria-hidden>
                <s>an advice</s> → <b>a piece of advice</b>
                <small>“advice” is uncountable</small>
              </div>
              {aiOn && (
              <div className="mini-bars" aria-hidden>
                {[["Task Response", 78], ["Coherence", 72], ["Vocabulary", 67], ["Grammar", 61]].map(([k, v]) => (
                  <div key={k as string}>
                    <span>{k}</span>
                    <i style={{ width: `${v}%` }} />
                  </div>
                ))}
              </div>
              )}
            </Link>
            <Link href="/lessons/" className="bento-card glow-card reveal">
              <span className="icon-chip"><BookOpen size={22} aria-hidden /></span>
              <h3>{lessons.length} in-depth lessons</h3>
              <p>Strategies and band 8 model answers.</p>
            </Link>
            <Link href="/tools/band-score-calculator/" className="bento-card glow-card reveal">
              <span className="icon-chip warn"><Calculator size={22} aria-hidden /></span>
              <h3>Band calculator</h3>
              <p>Raw scores to bands, with official rounding.</p>
            </Link>
            <Link href="/tools/vocabulary/" className="bento-card b-full glow-card reveal">
              <span className="icon-chip good"><Layers size={22} aria-hidden /></span>
              <h3>Flashcards that remember what you forget</h3>
              <p>{vocabulary.length} essential words and collocations with spaced repetition. Difficult words come back more often.</p>
              <div className="mini-cards" aria-hidden>
                <span>mitigate</span>
                <span>sedentary</span>
                <span>exacerbate</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Start here</span>
            <h2>Most popular lessons</h2>
          </div>
          <div className="card-grid">
            {featured
              .map((slug) => lessons.find((l) => l.slug === slug)!)
              .map((l) => (
                <Link key={l.slug} href={`/lessons/${l.slug}/`} className="card link-card glow-card reveal">
                  <span className={"tag " + l.section}>
                    {sectionIcon[l.section]} {l.minutes} min read
                  </span>
                  <h3>{l.title}</h3>
                  <p>{l.description}</p>
                  <span className="more">Read lesson →</span>
                </Link>
              ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 28 }}>
            <Link href="/lessons/" className="btn ghost">
              See all {lessons.length} lessons <ArrowRight size={18} aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">How it works</span>
            <h2>A simple routine, four steps</h2>
          </div>
          <ol className="steps">
            {[
              { t: "Find your level", d: "Take a practice test and convert your score with the band calculator.", href: "/practice/" },
              { t: "Learn the technique", d: "Read the lessons for your weakest section and study the model answers.", href: "/lessons/" },
              { t: "Practise with feedback", d: aiOn ? "Write timed essays and record Part 2 answers, then check them with AI." : "Write timed essays and record Part 2 answers, then run the instant checks.", href: "/ai-feedback/" },
              { t: "Build vocabulary daily", d: "Ten minutes of flashcards a day adds up to hundreds of words.", href: "/tools/vocabulary/" },
            ].map((s, i) => (
              <li key={s.t} className="reveal">
                <span className="step-num">{i + 1}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <Link href={s.href}>Go →</Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container">
        <div className="cta-band reveal">
          <div>
            <h2>Ready to find your band?</h2>
            <p>Start with a 20-minute Reading test. No account, no payment: just your browser.</p>
          </div>
          <Link href="/practice/" className="btn light shine">
            Start now <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
