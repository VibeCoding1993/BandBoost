"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2, RotateCcw, XCircle } from "lucide-react";

const passage =
  "The Hollow Valley wind farm opened in 2019. Local residents initially opposed it, but visitor numbers rose by 12% over the next two years. The company plans ten more turbines, although permission has not yet been granted.";

const questions = [
  { text: "Residents supported the wind farm from the start.", answer: "FALSE", why: "“Initially opposed” contradicts “supported from the start”." },
  { text: "Tourism increased after the wind farm opened.", answer: "TRUE", why: "Visitor numbers rose by 12%." },
  { text: "Ten more turbines will definitely be built.", answer: "NOT GIVEN", why: "It is only a plan: permission has not been granted." },
];
const choices = ["TRUE", "FALSE", "NOT GIVEN"];

/** A 30-second taste of a Reading question, right in the hero. */
export function HeroQuiz() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const done = i >= questions.length;
  const q = questions[Math.min(i, questions.length - 1)]!;

  function choose(c: string) {
    if (picked) return;
    setPicked(c);
    if (c === q.answer) setScore((s) => s + 1);
  }
  function next() {
    setPicked(null);
    setI(i + 1);
  }

  return (
    <div className="card hero-quiz glow-card" aria-live="polite">
      <div className="hero-quiz-head">
        <span className="eyebrow" style={{ margin: 0 }}>Try a Reading question</span>
        <span className="quiz-dots" aria-label={`Question ${Math.min(i + 1, 3)} of 3`}>
          {questions.map((_, k) => (
            <span key={k} className={k < i ? "on" : k === i && !done ? "now" : ""} />
          ))}
        </span>
      </div>
      <p className="quiz-passage">{passage}</p>
      {!done ? (
        <>
          <p className="quiz-q">
            <span className="q-num">{i + 1}</span> {q.text}
          </p>
          <div className="quiz-choices">
            {choices.map((c) => (
              <button
                key={c}
                type="button"
                className={"quiz-choice" + (picked ? (c === q.answer ? " right" : c === picked ? " wrong" : " dim") : "")}
                onClick={() => choose(c)}
                disabled={!!picked}
              >
                {c}
              </button>
            ))}
          </div>
          {picked && (
            <div className="quiz-feedback">
              <span className={picked === q.answer ? "ok" : "ko"}>
                {picked === q.answer ? <CheckCircle2 size={18} aria-hidden /> : <XCircle size={18} aria-hidden />}
                {picked === q.answer ? "Correct!" : `Answer: ${q.answer}`}
              </span>
              <small>{q.why}</small>
              <button type="button" className="btn primary sm" onClick={next}>
                {i < questions.length - 1 ? "Next question" : "See my score"} <ArrowRight size={16} aria-hidden />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="quiz-done">
          <div className="big-band">{score}/3</div>
          <p>
            {score === 3 ? "Perfect! You clearly know the method." : score === 2 ? "Nearly there: Not Given is the tricky one." : "True/False/Not Given has a method. It's quick to learn."}
          </p>
          <div className="btn-row" style={{ justifyContent: "center" }}>
            <Link href="/practice/academic-reading-urban-beekeeping/" className="btn primary sm">
              Full Reading test <ArrowRight size={16} aria-hidden />
            </Link>
            <Link href="/lessons/true-false-not-given/" className="btn ghost sm">
              Learn the method
            </Link>
            <button type="button" className="btn ghost sm" onClick={() => { setI(0); setScore(0); setPicked(null); }} aria-label="Restart">
              <RotateCcw size={16} aria-hidden />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
