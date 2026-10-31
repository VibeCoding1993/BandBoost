import { CheckCircle2, Lightbulb, PenLine } from "lucide-react";
import { bandLabel, formatBand } from "@/lib/bands";

export type Feedback = {
  overall: number;
  criteria: { name: string; band: number; comment: string }[];
  summary: string;
  strengths: string[];
  improvements: string[];
  corrections: { original: string; corrected: string; explanation: string }[];
  improvedExample: string;
};

export function FeedbackResult({ f }: { f: Feedback }) {
  return (
    <section aria-live="polite" style={{ display: "grid", gap: 18, marginTop: 24 }}>
      <div className="tool-layout">
        <div className="card result-panel">
          <span className="eyebrow">Estimated band</span>
          <div className="big-band">{formatBand(f.overall)}</div>
          <p>
            <strong>{bandLabel(f.overall)}</strong>
          </p>
          <p className="small muted">{f.summary}</p>
        </div>
        <div className="card" style={{ display: "grid", gap: 12 }}>
          {f.criteria.map((c) => (
            <div key={c.name}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <strong>{c.name}</strong>
                <strong style={{ color: "var(--brand)" }}>{formatBand(c.band)}</strong>
              </div>
              <div className="bar" aria-hidden>
                <span style={{ width: `${(c.band / 9) * 100}%` }} />
              </div>
              <p className="small muted" style={{ margin: "6px 0 0" }}>
                {c.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="card-grid">
        <div className="card">
          <h3>
            <CheckCircle2 size={18} aria-hidden style={{ verticalAlign: -3, color: "var(--good)" }} /> What you did well
          </h3>
          <ul>{f.strengths.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
        <div className="card">
          <h3>
            <Lightbulb size={18} aria-hidden style={{ verticalAlign: -3, color: "var(--accent)" }} /> How to improve
          </h3>
          <ul>{f.improvements.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
      </div>
      {f.corrections.length > 0 && (
        <div className="card prose">
          <h3>Corrections</h3>
          <table>
            <thead>
              <tr>
                <th>You wrote</th>
                <th>Better</th>
                <th>Why</th>
              </tr>
            </thead>
            <tbody>
              {f.corrections.map((c, i) => (
                <tr key={i}>
                  <td><s className="muted">{c.original}</s></td>
                  <td><strong>{c.corrected}</strong></td>
                  <td className="small">{c.explanation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {f.improvedExample && (
        <div className="card">
          <h3>
            <PenLine size={18} aria-hidden style={{ verticalAlign: -3 }} /> A band 7+ version of one passage
          </h3>
          <blockquote className="notice good" style={{ margin: 0 }}>{f.improvedExample}</blockquote>
        </div>
      )}
      <p className="small muted">
        This is an automatic estimate to guide your practice, not an official IELTS score. AI can make mistakes: use the
        feedback alongside our lessons and, if possible, a teacher.
      </p>
    </section>
  );
}
