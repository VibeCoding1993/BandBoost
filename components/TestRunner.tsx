"use client";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { CheckCircle2, Clock, RotateCcw, XCircle } from "lucide-react";
import { bandLabel, estimateBand, formatBand } from "@/lib/bands";
import { isCorrect, questionCount, type PracticeTest, type Question, type QuestionGroup } from "@/content/practice-types";
import { ListeningPlayer } from "./ListeningPlayer";

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

function storeBest(slug: string, score: number) {
  try {
    const key = "bb-best-" + slug;
    const best = Number(localStorage.getItem(key) || 0);
    if (score > best) localStorage.setItem(key, String(score));
  } catch {
    // Storage unavailable (private mode): results are simply not remembered.
  }
}

export function TestRunner({ test, passage }: { test: PracticeTest; passage?: ReactNode }) {
  const total = questionCount(test);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [left, setLeft] = useState(test.minutes * 60);
  const [examMode, setExamMode] = useState(true);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (submitted) return;
    const t = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [submitted, attempt]);

  const all = useMemo(() => test.groups.flatMap((g) => g.questions), [test]);
  const score = all.filter((q) => isCorrect(q, answers[q.id])).length;
  const band = estimateBand(score, total, test.table);
  const answered = Object.values(answers).filter((v) => v.trim()).length;

  function submit() {
    setSubmitted(true);
    storeBest(test.slug, score);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function restart() {
    setAnswers({});
    setSubmitted(false);
    setLeft(test.minutes * 60);
    setAttempt((a) => a + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const set = (id: number, v: string) => !submitted && setAnswers((a) => ({ ...a, [id]: v }));

  return (
    <>
      {submitted && (
        <section className="card result-panel" aria-live="polite" style={{ marginBottom: 24 }}>
          <span className="eyebrow">Your result</span>
          <div className="big-band">{formatBand(band)}</div>
          <p>
            <strong>{bandLabel(band)}</strong> · {score} / {total} correct
          </p>
          <p className="small muted">
            Estimated band: your score is scaled to the 40-question test. Review the explanations below, then try again.
          </p>
          <div className="btn-row" style={{ justifyContent: "center" }}>
            <button type="button" className="btn primary" onClick={restart}>
              <RotateCcw size={18} aria-hidden /> Try again
            </button>
            <a className="btn ghost" href="/practice/">
              More tests
            </a>
          </div>
        </section>
      )}

      {test.skill === "listening" && test.script && (
        <div style={{ marginBottom: 24, display: "grid", gap: 12 }}>
          {!submitted && (
            <label className="small" style={{ display: "flex", gap: 8, alignItems: "center", fontWeight: 500 }}>
              <input type="checkbox" checked={!examMode} onChange={(e) => setExamMode(!e.target.checked)} />
              Practice mode (allow pause and replay)
            </label>
          )}
          <ListeningPlayer key={attempt + (examMode ? "e" : "p")} script={test.script} examMode={examMode && !submitted} />
          {submitted && (
            <details className="card">
              <summary style={{ cursor: "pointer", fontWeight: 700 }}>Show transcript</summary>
              <div style={{ marginTop: 12 }}>
                {test.script.map((l, i) => (
                  <p key={i}>
                    <strong>{l.speaker}:</strong> {l.text}
                  </p>
                ))}
              </div>
            </details>
          )}
        </div>
      )}

      <div className={passage ? "test-layout" : ""}>
        {passage && <div className="card passage">{passage}</div>}
        <div>
          {test.groups.map((g) => (
            <Group key={g.title} group={g} answers={answers} set={set} submitted={submitted} />
          ))}
        </div>
      </div>

      {!submitted && (
        <div className="sticky-bar">
          <div className="container">
            <span className={"timer" + (left < 120 ? " low" : "")} aria-live="off">
              <Clock size={18} aria-hidden style={{ verticalAlign: -3 }} /> {left > 0 ? fmt(left) : "Time's up"}
            </span>
            <span className="small muted">
              {answered} of {total} answered
            </span>
            <button type="button" className="btn accent" onClick={submit}>
              Check my answers
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Group({
  group,
  answers,
  set,
  submitted,
}: {
  group: QuestionGroup;
  answers: Record<number, string>;
  set: (id: number, v: string) => void;
  submitted: boolean;
}) {
  return (
    <section className="card question-group">
      <h3>{group.title}</h3>
      <p className="instructions">{group.instructions}</p>
      {group.box && (
        <ul className="notice small" style={{ listStyle: "none", margin: "0 0 12px" }}>
          {group.box.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      {group.questions.map((q) => (
        <QuestionRow key={q.id} q={q} display={group.display} value={answers[q.id] || ""} set={set} submitted={submitted} />
      ))}
    </section>
  );
}

function QuestionRow({
  q,
  display = "buttons",
  value,
  set,
  submitted,
}: {
  q: Question;
  display?: QuestionGroup["display"];
  value: string;
  set: (id: number, v: string) => void;
  submitted: boolean;
}) {
  const ok = submitted && isCorrect(q, value);
  const name = "q" + q.id;
  return (
    <div className={"question" + (submitted ? (ok ? " correct" : " wrong") : "")}>
      <div className="q-text">
        <span className="q-num" aria-hidden>
          {q.id}
        </span>
        <span>{q.kind === "gap" ? q.text.replace("____", "________") : q.text}</span>
      </div>
      {q.kind === "gap" ? (
        <div className="gap-input">
          <label className="sr-only" htmlFor={name}>
            Answer to question {q.id}
          </label>
          <input id={name} type="text" autoComplete="off" spellCheck={false} value={value} disabled={submitted} onChange={(e) => set(q.id, e.target.value)} />
        </div>
      ) : display === "select" ? (
        <div className="gap-input">
          <label className="sr-only" htmlFor={name}>
            Answer to question {q.id}
          </label>
          <select id={name} value={value} disabled={submitted} onChange={(e) => set(q.id, e.target.value)}>
            <option value="">Choose…</option>
            {q.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className={"options" + (display === "list" ? " stacked" : "")} role="radiogroup" aria-label={"Question " + q.id}>
          {q.options.map((o) => (
            <label key={o}>
              <input type="radio" name={name} value={o} checked={value === o} disabled={submitted} onChange={() => set(q.id, o)} />
              {o}
            </label>
          ))}
        </div>
      )}
      {submitted && (
        <p className={"feedback " + (ok ? "ok" : "ko")}>
          {ok ? <CheckCircle2 size={16} aria-hidden style={{ verticalAlign: -3 }} /> : <XCircle size={16} aria-hidden style={{ verticalAlign: -3 }} />}{" "}
          {ok ? "Correct. " : `Answer: ${q.kind === "gap" ? q.accept[0] : q.answer}. `}
          <span className="muted">{q.explanation}</span>
        </p>
      )}
    </div>
  );
}
