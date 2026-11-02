import type { Metadata } from "next";
import Link from "next/link";
import { requirements } from "@/content/requirements";
import type { Requirement } from "@/content/requirement-types";

export const metadata: Metadata = {
  title: "IELTS Score Requirements for Visas, Nursing and Universities",
  description:
    "The IELTS scores you need for Canada Express Entry, UK and Australian visas, New Zealand residence, nursing and medical registration, and university entry.",
  alternates: { canonical: "/requirements/" },
};

const groups: { category: Requirement["category"]; title: string; text: string }[] = [
  { category: "Migration", title: "Work and migration", text: "Permanent residence and work visas. Most of these rules set a minimum in every skill." },
  { category: "Study", title: "Study abroad", text: "Student visas and university entry. Your university's requirement is usually higher than the visa's." },
  { category: "Healthcare", title: "Nurses and doctors", text: "Professional registration, with some of the strictest score rules of all." },
];

export default function RequirementsPage() {
  return (
    <div className="container">
      <header className="page-head section">
        <span className="eyebrow">Score requirements</span>
        <h1>What IELTS score do you need?</h1>
        <p className="lead">
          Clear, sourced guides to the IELTS scores required by governments, regulators and universities, each with a
          checker that tells you which skill to improve.
        </p>
      </header>
      {groups.map((g) => (
        <section key={g.category} className="section" style={{ paddingTop: 0 }}>
          <h2>{g.title}</h2>
          <p className="muted">{g.text}</p>
          <div className="card-grid">
            {requirements
              .filter((r) => r.category === g.category)
              .map((r) => (
                <Link key={r.slug} href={`/requirements/${r.slug}/`} className="card link-card glow-card reveal">
                  <span className="tag general">{r.country}</span>
                  <h3>{r.title}</h3>
                  <p>{r.description}</p>
                  <span className="more">See the scores →</span>
                </Link>
              ))}
          </div>
        </section>
      ))}
      <section className="section narrow" style={{ paddingTop: 0 }}>
        <h2>How we keep these pages accurate</h2>
        <p>
          Every figure on these pages comes from the official source named at the bottom of the page: the immigration
          department, the professional regulator or the visa authority. Each page shows the date we last checked it.
          Requirements change, so always confirm the current rule with the official source before you book a test or
          apply. These guides are general information, not legal or immigration advice. If you notice an outdated figure,
          please <Link href="/contact/">let us know</Link>.
        </p>
      </section>
    </div>
  );
}
