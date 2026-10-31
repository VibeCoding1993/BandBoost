import type { Metadata } from "next";
import Link from "next/link";
import { WritingPractice } from "@/components/WritingPractice";

export const metadata: Metadata = {
  title: "IELTS Writing Practice: Timer, Word Counter and Prompts",
  description: "Practise IELTS Writing Task 1 letters and Task 2 essays with a real-time timer, live word counter and original prompts.",
  alternates: { canonical: "/tools/writing-practice/" },
};

export default function Page() {
  return (
    <div className="container">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link> › <Link href="/tools/">Tools</Link>
      </nav>
      <header className="page-head">
        <span className="eyebrow">Writing practice</span>
        <h1>Writing timer and word counter</h1>
        <p className="lead">
          Choose a prompt, start the clock and write. The word count follows the way examiners count, and your draft is
          saved automatically in your browser.
        </p>
      </header>
      <WritingPractice />
      <section className="section narrow prose">
        <h2>How to use timed practice</h2>
        <p>
          In the test you have 60 minutes for both tasks. Most candidates spend about 20 minutes on Task 1 and 40 on
          Task 2, because Task 2 counts twice as much. Plan for the first five minutes, write, and keep five minutes at the
          end to check grammar and spelling.
        </p>
        <p>
          Before you start, review the <Link href="/lessons/writing-task-2-essay-structure/">Task 2 essay structure</Link>{" "}
          or the guide to <Link href="/lessons/writing-task-1-general-letters/">General Training letters</Link>.
        </p>
      </section>
    </div>
  );
}
