import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { Markdown } from "@/components/Markdown";
import { TestRunner } from "@/components/TestRunner";
import { practiceTests, testBySlug } from "@/content/practice";
import { questionCount } from "@/content/practice-types";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return practiceTests.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const t = testBySlug((await params).slug);
  if (!t) return {};
  return { title: t.title, description: t.description, alternates: { canonical: `/practice/${t.slug}/` } };
}

export default async function PracticeTestPage({ params }: Params) {
  const test = testBySlug((await params).slug);
  if (!test) notFound();
  return (
    <div className="container">
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
    </div>
  );
}
