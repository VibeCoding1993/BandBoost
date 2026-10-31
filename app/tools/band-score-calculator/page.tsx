import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { BandCalculator } from "@/components/BandCalculator";

export const metadata: Metadata = {
  title: "IELTS Band Score Calculator (Academic & General Training)",
  description: "Free IELTS band score calculator: convert Listening and Reading raw scores to bands and calculate your overall band with the official rounding rule.",
  alternates: { canonical: "/tools/band-score-calculator/" },
};

export default function Page() {
  return (
    <div className="container">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link> › <Link href="/tools/">Tools</Link>
      </nav>
      <header className="page-head">
        <span className="eyebrow">Calculator</span>
        <h1>IELTS band score calculator</h1>
        <p className="lead">
          Enter your Listening and Reading raw scores and your Writing and Speaking bands to see your overall band score.
        </p>
      </header>
      <BandCalculator />
      <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_TOOL} />
      <section className="section narrow prose">
        <h2>How the calculator works</h2>
        <p>
          Listening and Reading are marked out of 40 and converted to a band with a conversion table. The table varies
          slightly between test versions, so treat the result as a close estimate. General Training Reading needs more
          correct answers than Academic Reading for the same band, because its texts are less demanding.
        </p>
        <p>
          Your overall band is the average of the four skills, rounded to the nearest half band. An average ending in .25
          rounds up to the next half band, and one ending in .75 rounds up to the next whole band. For the full
          explanation and worked examples, read{" "}
          <Link href="/lessons/ielts-band-scores-explained/">IELTS band scores explained</Link>.
        </p>
        <h2>Frequently asked questions</h2>
        <h3>How many correct answers do I need for band 7 in Listening?</h3>
        <p>Usually 30 out of 40. Band 6 typically needs around 23, and band 8 around 35.</p>
        <h3>How is the Writing band calculated?</h3>
        <p>
          Task 2 counts twice as much as Task 1. Each task is marked on four equally weighted criteria, and the result is
          reported in half bands.
        </p>
        <h3>Is this an official calculator?</h3>
        <p>No. It uses widely published approximate tables. Only an official test result is valid for applications.</p>
      </section>
    </div>
  );
}
