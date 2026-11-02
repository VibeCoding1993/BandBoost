import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { Markdown } from "@/components/Markdown";
import { TestRunner } from "@/components/TestRunner";
import { practiceTests, testBySlug } from "@/content/practice";
import { questionCount } from "@/content/practice-types";
import { breadcrumbLd, ldJson } from "@/lib/seo";

const listeningGuide = `
**Before you play.** Read every question in the section and underline the key words. Decide what kind of answer each gap needs: a number, a date, a name that will be spelled out, or a noun. This prediction is the single habit that most improves Listening scores.

**While you listen.** Answers come in the same order as the questions. Speakers often give one detail and then correct it ("the 14th... no, sorry, the 15th"), so wait for the final version before you write. Respect the word limit: if the instructions say *no more than two words*, a three-word answer is marked wrong even when the meaning is right.

**After you submit.** Open the transcript and find the exact sentence that contains each answer you missed. Ask yourself why you missed it: a spelling mistake, a distractor, or losing your place. Then replay the recording in practice mode and listen for that sentence again.

**Next steps.** Read our [Listening tips](/lessons/ielts-listening-tips/) and the lesson on [form completion and spelling](/lessons/listening-form-completion-spelling/), then convert your result with the [band score calculator](/tools/band-score-calculator/).
`;

const readingGuide = `
**Before you read.** Spend about two minutes skimming the passage: read the title, the first sentence of each paragraph and any words in italics or capitals. You are building a map of where information is, not trying to understand every word.

**While you answer.** Questions of the same type usually follow the order of the text. Underline the key words in each question, think of synonyms the passage might use, then scan for them. For True/False/Not Given, compare the statement with the text, not with what you know about the topic.

**After you submit.** Read the explanation for every answer, including the ones you got right by guessing. Note which question types cost you the most marks; that tells you what to practise next. Keep strictly to the time limit on your next attempt so that your score reflects exam conditions.

**Next steps.** Our lessons on [skimming and scanning](/lessons/reading-skimming-scanning/), [True/False/Not Given](/lessons/true-false-not-given/) and [matching headings](/lessons/matching-headings/) explain the strategies behind these questions, and the [band score calculator](/tools/band-score-calculator/) converts your raw score.
`;

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return practiceTests.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const t = testBySlug((await params).slug);
  if (!t) return {};
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: `/practice/${t.slug}/` },
    openGraph: { title: t.title, description: t.description, url: `/practice/${t.slug}/`, images: [{ url: `/og/${t.slug}.png`, width: 1200, height: 630 }] },
  };
}

export default async function PracticeTestPage({ params }: Params) {
  const test = testBySlug((await params).slug);
  if (!test) notFound();
  return (
    <div className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ldJson(
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Practice tests", path: "/practice/" },
            { name: test.title, path: `/practice/${test.slug}/` },
          ]),
        )}
      />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link> › <Link href="/practice/">Practice tests</Link>
      </nav>
      <header className="page-head">
        <span className={"tag " + test.skill}>
          {test.skill === "listening" ? "Listening" : "Reading"} · {questionCount(test)} questions · {test.minutes} minutes
        </span>
        <h1 style={{ marginTop: 12 }}>{test.title}</h1>
        <p className="lead">{test.description}</p>
        {test.skill === "listening" && (
          <p className="notice small">
            Use headphones if you can. Read the questions before you press play: in the real test you have time to look
            at each section before you hear it.
          </p>
        )}
      </header>
      <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_PRACTICE} />
      <TestRunner test={test} passage={test.passage ? <Markdown source={test.passage} /> : undefined} />
      <section className="section narrow" aria-labelledby="how-to">
        <h2 id="how-to">How to get the most from this practice test</h2>
        <Markdown source={test.skill === "listening" ? listeningGuide : readingGuide} />
      </section>
    </div>
  );
}
