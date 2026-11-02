"use client";
import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { formatBand, overallBand } from "@/lib/bands";
import { clbFor } from "@/lib/clb";
import { skillNames, type Skills, type Target } from "@/content/requirement-types";

const bands = Array.from({ length: 19 }, (_, i) => i / 2).reverse();

/** Which skills fall short of a target, and by how much. */
export function shortfalls(scores: Skills, target: Target) {
  const skills = scores.flatMap((s, i) => (s < target.min[i]! ? [{ skill: skillNames[i]!, gap: target.min[i]! - s }] : []));
  const overall = overallBand(scores);
  const overallGap = target.overall && overall < target.overall ? target.overall - overall : 0;
  return { skills, overallGap, ok: skills.length === 0 && overallGap === 0 };
}

/** "Do my scores meet this requirement?" Scores stay in the browser. */
export function RequirementChecker({ targets, clb }: { targets: Target[]; clb?: boolean }) {
  const [scores, setScores] = useState<Skills>([6.5, 6.5, 6, 6.5]);
  const overall = overallBand(scores);
  return (
    <section className="card" aria-labelledby="checker-title" style={{ display: "grid", gap: 18 }}>
      <div>
        <h2 id="checker-title" style={{ margin: 0, fontSize: "1.25rem" }}>
          Do my scores meet this requirement?
        </h2>
        <p className="small muted" style={{ margin: "6px 0 0" }}>
          Enter your IELTS bands (real or practice). Nothing is sent anywhere.
        </p>
      </div>
      <div className="form-grid">
        {skillNames.map((name, i) => (
          <label key={name}>
            {name}
            <select
              value={scores[i]}
              onChange={(e) => setScores((s) => s.map((v, j) => (j === i ? Number(e.target.value) : v)) as Skills)}
            >
              {bands.map((b) => (
                <option key={b} value={b}>
                  {formatBand(b)}
                </option>
              ))}
            </select>
            {clb && <span className="small muted">→ CLB {clbFor(i as 0 | 1 | 2 | 3, scores[i]!) || "below 4"}</span>}
          </label>
        ))}
      </div>
      <p style={{ margin: 0 }}>
        Overall band: <strong>{formatBand(overall)}</strong>
      </p>
      <ul className="checker-results" aria-live="polite">
        {targets.map((t) => {
          const r = shortfalls(scores, t);
          return (
            <li key={t.label} className={r.ok ? "ok" : "short"}>
              {r.ok ? <CheckCircle2 size={20} aria-hidden /> : <XCircle size={20} aria-hidden />}
              <div>
                <strong>{t.label}</strong>
                <span className="sr-only">{r.ok ? ": met" : ": not met"}</span>
                <div className="small">
                  {r.ok
                    ? "Your scores meet this requirement."
                    : [
                        ...r.skills.map((s) => `${s.skill} +${formatBand(s.gap)}`),
                        ...(r.overallGap ? [`overall +${formatBand(r.overallGap)}`] : []),
                      ].join(" · ") + " needed"}
                </div>
                {t.note && <div className="small muted">{t.note}</div>}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
