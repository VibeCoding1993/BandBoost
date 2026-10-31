"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pause, Play, RotateCcw, Shuffle, Sparkles } from "lucide-react";
import { countWords } from "@/lib/bands";
import { DRAFT_KEY, load, save, type Draft } from "@/lib/storage";
import { writingPrompts } from "@/content/prompts";
import { aiOn } from "@/lib/site";
import { useWakeApi } from "./AiFeedback";

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export function WritingPractice() {
  const router = useRouter();
  const [promptId, setPromptId] = useState(writingPrompts[0]!.id);
  const [text, setText] = useState("");
  const prompt = writingPrompts.find((p) => p.id === promptId) || writingPrompts[0]!;
  const limit = prompt.task === "task2" ? 250 : 150;
  const minutes = prompt.task === "task2" ? 40 : 20;
  const [left, setLeft] = useState(minutes * 60);
  const [running, setRunning] = useState(false);
  const words = countWords(text);
  useWakeApi();

  useEffect(() => {
    const d = load<Draft | null>(DRAFT_KEY, null);
    if (d && writingPrompts.some((p) => p.id === d.promptId)) {
      setPromptId(d.promptId);
      setText(d.text);
    }
  }, []);
  useEffect(() => save(DRAFT_KEY, { promptId, text }), [promptId, text]);
  useEffect(() => {
    setLeft(minutes * 60);
    setRunning(false);
  }, [promptId, minutes]);
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setLeft((s) => (s <= 1 ? (setRunning(false), 0) : s - 1)), 1000);
    return () => clearInterval(t);
  }, [running]);

  const shuffle = () => {
    const others = writingPrompts.filter((p) => p.task === prompt.task && p.id !== prompt.id);
    setPromptId(others[Math.floor(Math.random() * others.length)]!.id);
  };

  return (
    <div className="tool-layout">
      <div className="card" style={{ display: "grid", gap: 14 }}>
        <label>
          Task
          <select value={promptId} onChange={(e) => setPromptId(e.target.value)}>
            <optgroup label="Task 2 essays (250 words, 40 minutes)">
              {writingPrompts.filter((p) => p.task === "task2").map((p) => (
                <option key={p.id} value={p.id}>{p.text.slice(0, 80)}…</option>
              ))}
            </optgroup>
            <optgroup label="General Training Task 1 letters (150 words, 20 minutes)">
              {writingPrompts.filter((p) => p.task === "task1-gt").map((p) => (
                <option key={p.id} value={p.id}>{p.text.slice(0, 80)}…</option>
              ))}
            </optgroup>
          </select>
        </label>
        <div className="notice">
          <strong>{prompt.task === "task2" ? "Task 2" : "Task 1 (letter)"}:</strong> {prompt.text}{" "}
          <em>Write at least {limit} words.</em>
        </div>
        <label>
          Your answer
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Start writing here. Your draft is saved in this browser." rows={14} />
        </label>
      </div>
      <div style={{ display: "grid", gap: 16, position: "sticky", top: 86 }}>
        <div className="card result-panel">
          <span className="eyebrow">Time left</span>
          <div className={"big-band timer" + (left < 300 && left > 0 ? " low" : "")} style={{ fontSize: "3.4rem" }}>
            {left > 0 ? fmt(left) : "Time's up"}
          </div>
          <div className="btn-row" style={{ justifyContent: "center" }}>
            <button type="button" className="btn primary sm" onClick={() => setRunning(!running)} disabled={left === 0}>
              {running ? <Pause size={16} aria-hidden /> : <Play size={16} aria-hidden />} {running ? "Pause" : "Start"}
            </button>
            <button type="button" className="btn ghost sm" onClick={() => { setLeft(minutes * 60); setRunning(false); }}>
              <RotateCcw size={16} aria-hidden /> Reset
            </button>
            <button type="button" className="btn ghost sm" onClick={shuffle}>
              <Shuffle size={16} aria-hidden /> New prompt
            </button>
          </div>
        </div>
        <div className="stat-row">
          <div className={"stat " + (words >= limit ? "good" : "bad")}>
            <b>{words}</b>
            <span>words (minimum {limit})</span>
          </div>
          <div className="stat">
            <b>{text.trim() ? text.split(/\n\s*\n/).filter((p) => p.trim()).length : 0}</b>
            <span>paragraphs</span>
          </div>
        </div>
        <button
          type="button"
          className="btn accent"
          disabled={words < 50}
          onClick={() => {
            save(DRAFT_KEY, { promptId, text });
            router.push("/ai-feedback/?from=writing");
          }}
        >
          <Sparkles size={18} aria-hidden /> {aiOn ? "Get AI feedback on this answer" : "Check this answer"}
        </button>
        <p className="small muted">Write at least 50 words to check your answer.</p>
      </div>
    </div>
  );
}
