import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import type { EssayReport } from "@/lib/essay-check";

const icon = { good: CheckCircle2, warn: AlertTriangle, bad: XCircle };

export function InstantChecks({ report, title = "Instant checks" }: { report: EssayReport; title?: string }) {
  const score = report.checks.filter((c) => c.level === "good").length;
  return (
    <section className="card" aria-live="polite" style={{ marginTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
        <h2 style={{ fontSize: "1.25rem", margin: 0 }}>{title}</h2>
        <span className="small muted">
          {score} of {report.checks.length} checks passed
        </span>
      </div>
      <ul className="check-list">
        {report.checks.map((c) => {
          const Icon = icon[c.level];
          return (
            <li key={c.id} className={"check " + c.level}>
              <Icon size={20} aria-hidden />
              <div>
                <strong>{c.title}</strong>
                <p>{c.detail}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="small muted" style={{ margin: 0 }}>
        These automatic checks look for objective signals examiners notice. They don't measure the quality of your ideas:
        compare your answer with our model answers in the lessons.
      </p>
    </section>
  );
}
