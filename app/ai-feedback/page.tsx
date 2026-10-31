import type { Metadata } from "next";
import Link from "next/link";
import { AiFeedback } from "@/components/AiFeedback";
import { site } from "@/lib/site";

const aiOn = !!site.apiUrl;

export const metadata: Metadata = {
  title: "Free IELTS Essay Checker and Speaking Practice",
  description: "Check your IELTS essay or spoken answer instantly: length, paragraphs, linking, repetition, common errors and speaking rate, with timed Part 2 practice.",
  alternates: { canonical: "/ai-feedback/" },
};

export default function Page() {
  return (
    <div className="container">
      <header className="page-head section" style={{ paddingBottom: 20 }}>
        <span className="eyebrow">Feedback</span>
        <h1>Check your writing and speaking</h1>
        <p className="lead">
          Write an essay or record a Part 2 answer and get instant checks on length, organisation, linking, repetition and
          common errors{aiOn ? ", plus an AI estimate of your band for each criterion with corrections" : ""}.
        </p>
        <p className="small muted">
          {aiOn
            ? "Instant checks run in your browser. For the AI estimate, your text is sent to Google's Gemini AI and is not stored on our servers. "
            : "Everything runs in your browser: your text is not sent anywhere. "}
          Don't include personal information. See our <Link href="/privacy/">privacy policy</Link>.
        </p>
      </header>
      <AiFeedback />
      <section className="section narrow prose">
        <h2>What the checks look at</h2>
        <p>
          The instant checks measure objective features that examiners notice: whether you reached the minimum length,
          how you organised your paragraphs, whether your linking is varied or mechanical, which words you repeat, and
          frequent errors such as uncountable nouns with “s” or “despite of”. For speaking, they also measure your
          speaking time, speaking rate and filler words.
        </p>
        <p>
          They cannot judge the quality of your ideas, so compare your answer with our model answers, for example in{" "}
          <Link href="/lessons/writing-task-2-opinion-essay/">the band 8 opinion essay</Link> and{" "}
          <Link href="/lessons/speaking-part-2-cue-card/">the Speaking Part 2 guide</Link>, and read{" "}
          <Link href="/lessons/ielts-writing-band-descriptors-explained/">the Writing criteria explained</Link>.
        </p>
      </section>
    </div>
  );
}
