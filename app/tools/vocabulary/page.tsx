import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { Flashcards } from "@/components/Flashcards";
import { vocabulary, vocabularyTopics } from "@/content/vocabulary";

export const metadata: Metadata = {
  title: "IELTS Vocabulary Flashcards: 96 Essential Words by Topic",
  description: "Learn 96 essential IELTS words and collocations by topic with free flashcards and spaced repetition, plus definitions and example sentences.",
  alternates: { canonical: "/tools/vocabulary/" },
};

export default function Page() {
  return (
    <div className="container">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link> › <Link href="/tools/">Tools</Link>
      </nav>
      <header className="page-head">
        <span className="eyebrow">Vocabulary</span>
        <h1>IELTS vocabulary flashcards</h1>
        <p className="lead">
          {vocabulary.length} words and collocations that appear again and again in IELTS topics. Tap a card to see its
          meaning, then say whether you knew it.
        </p>
      </header>
      <Flashcards />
      <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_TOOL} />
      <section className="section prose">
        <h2>The full word list</h2>
        <p>
          Prefer to study from a list? Here are all the words with definitions and examples. For tips on learning them
          effectively, read <Link href="/lessons/ielts-vocabulary-by-topic/">IELTS vocabulary by topic</Link>.
        </p>
        {vocabularyTopics.map((t) => (
          <div key={t}>
            <h3>{t}</h3>
            <table>
              <thead>
                <tr>
                  <th>Word</th>
                  <th>Meaning</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                {vocabulary
                  .filter((w) => w.topic === t)
                  .map((w) => (
                    <tr key={w.word}>
                      <td>
                        <strong>{w.word}</strong> <span className="muted small">({w.type})</span>
                      </td>
                      <td>{w.definition}</td>
                      <td>
                        <em>{w.example}</em>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </section>
    </div>
  );
}
