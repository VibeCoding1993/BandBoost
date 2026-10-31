"use client";
import { useEffect, useMemo, useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import { vocabulary, vocabularyTopics } from "@/content/vocabulary";
import { grade, masteredCount, nextWord, type Boxes } from "@/lib/leitner";
import { load, save } from "@/lib/storage";

const KEY = "bb-flashcards";

export function Flashcards() {
  const [topic, setTopic] = useState("All topics");
  const [boxes, setBoxes] = useState<Boxes>({});
  const [current, setCurrent] = useState<string | undefined>();
  const [flipped, setFlipped] = useState(false);
  const words = useMemo(() => vocabulary.filter((w) => topic === "All topics" || w.topic === topic), [topic]);
  const names = useMemo(() => words.map((w) => w.word), [words]);

  useEffect(() => setBoxes(load<Boxes>(KEY, {})), []);
  useEffect(() => {
    setCurrent(nextWord(names, boxes));
    setFlipped(false);
    // Only when the topic changes, not after each answer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [names]);

  const card = vocabulary.find((w) => w.word === current);
  const mastered = masteredCount(names, boxes);

  function answer(known: boolean) {
    if (!current) return;
    const next = grade(boxes, current, known);
    setBoxes(next);
    save(KEY, next);
    setFlipped(false);
    setCurrent(nextWord(names, next, current));
  }

  return (
    <div className="tool-layout">
      <div style={{ display: "grid", gap: 16 }}>
        {card ? (
          <button type="button" className={"flashcard" + (flipped ? " flipped" : "")} onClick={() => setFlipped(!flipped)} aria-label={flipped ? "Show the word" : "Show the meaning"}>
            <div className="flashcard-inner">
              <div className="flashcard-face" aria-hidden={flipped}>
                <span className="tag">{card.topic}</span>
                <span className="word">{card.word}</span>
                <span className="muted">{card.type}</span>
                <span className="small muted" style={{ marginTop: 16 }}>Tap to see the meaning</span>
              </div>
              <div className="flashcard-face back" aria-hidden={!flipped}>
                <strong style={{ fontSize: "1.15rem" }}>{card.definition}</strong>
                <p style={{ marginTop: 12, fontStyle: "italic" }}>“{card.example}”</p>
              </div>
            </div>
          </button>
        ) : (
          <p className="notice">No words in this topic.</p>
        )}
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <button type="button" className="btn ghost" onClick={() => answer(false)} disabled={!card}>
            <X size={18} aria-hidden /> Not yet
          </button>
          <button type="button" className="btn primary" onClick={() => answer(true)} disabled={!card}>
            <Check size={18} aria-hidden /> I knew it
          </button>
        </div>
      </div>
      <div className="card" style={{ display: "grid", gap: 14 }}>
        <label>
          Topic
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option>All topics</option>
            {vocabularyTopics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <div className="stat-row">
          <div className="stat good">
            <b>{mastered}</b>
            <span>mastered of {names.length}</span>
          </div>
          <div className="stat">
            <b>{names.filter((w) => boxes[w] !== undefined).length}</b>
            <span>seen</span>
          </div>
        </div>
        <div className="bar" aria-hidden>
          <span style={{ width: `${names.length ? (mastered / names.length) * 100 : 0}%` }} />
        </div>
        <p className="small muted">
          A word counts as mastered after you know it three times in a row. Words you miss come back more often. Progress is
          saved in this browser.
        </p>
        <button
          type="button"
          className="btn ghost sm"
          onClick={() => {
            const reset = Object.fromEntries(Object.entries(boxes).filter(([w]) => !names.includes(w)));
            setBoxes(reset);
            save(KEY, reset);
          }}
        >
          <RotateCcw size={16} aria-hidden /> Reset this topic
        </button>
      </div>
    </div>
  );
}
