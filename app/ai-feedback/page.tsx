import type { Metadata } from "next";
import Link from "next/link";
import { AiFeedback } from "@/components/AiFeedback";

export const metadata: Metadata = {
  title: "Free AI Feedback for IELTS Writing and Speaking",
  description: "Get an estimated IELTS band, criterion-by-criterion comments and corrections for your Writing Task 1, Task 2 or Speaking answer, free.",
  alternates: { canonical: "/ai-feedback/" },
};

export default function Page() {
  return (
    <div className="container">
      <header className="page-head section" style={{ paddingBottom: 20 }}>
        <span className="eyebrow">AI feedback</span>
        <h1>Instant feedback on your writing and speaking</h1>
        <p className="lead">
          Write an essay or record a Part 2 answer and get an estimated band for each IELTS criterion, specific corrections
          and a model rewrite of one passage.
        </p>
        <p className="small muted">
          Your text is sent to Google's Gemini AI to produce the feedback and is not stored on our servers. Don't include
          personal information. Free use is limited to a few requests per hour. See our{" "}
          <Link href="/privacy/">privacy policy</Link>.
        </p>
      </header>
      <AiFeedback />
      <section className="section narrow prose">
        <h2>How accurate is AI feedback?</h2>
        <p>
          The AI is instructed to follow the public IELTS band descriptors and to be conservative, but it is not a
          certified examiner. Use the estimate to spot patterns, such as repeated grammar errors or underdeveloped ideas,
          rather than as a promise of your test result. The criteria are explained in{" "}
          <Link href="/lessons/writing-task-2-essay-structure/">our Task 2 guide</Link> and{" "}
          <Link href="/lessons/speaking-part-2-cue-card/">our Speaking Part 2 guide</Link>.
        </p>
      </section>
    </div>
  );
}
