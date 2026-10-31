"use client";
import { useEffect, useRef, useState } from "react";
import { Mic, PenLine, Shuffle, Sparkles, Square } from "lucide-react";
import { countWords } from "@/lib/bands";
import { site } from "@/lib/site";
import { DRAFT_KEY, load, type Draft } from "@/lib/storage";
import { cueCards, writingPrompts } from "@/content/prompts";
import { FeedbackResult, type Feedback } from "./FeedbackResult";

type Tab = "writing" | "speaking";

async function requestFeedback(body: object): Promise<Feedback> {
  if (!site.apiUrl) throw new Error("AI feedback is not switched on yet. Please check back soon.");
  let res: Response;
  try {
    res = await fetch(site.apiUrl + "/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  } catch {
    throw new Error("Could not reach the feedback service. It may be starting up: please try again in 30 seconds.");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
  return data as Feedback;
}

export function AiFeedback() {
  const [tab, setTab] = useState<Tab>("writing");
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("tab") === "speaking") setTab("speaking");
  }, []);
  return (
    <>
      <div className="options" role="tablist" aria-label="Feedback type" style={{ paddingLeft: 0, marginBottom: 20 }}>
        {(["writing", "speaking"] as const).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            className={"btn " + (tab === t ? "primary" : "ghost")}
            onClick={() => setTab(t)}
          >
            {t === "writing" ? <PenLine size={18} aria-hidden /> : <Mic size={18} aria-hidden />}
            {t === "writing" ? "Writing" : "Speaking"}
          </button>
        ))}
      </div>
      {tab === "writing" ? <WritingFeedback /> : <SpeakingFeedback />}
    </>
  );
}

function useFeedback() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Feedback | null>(null);
  async function run(body: object) {
    setBusy(true);
    setError("");
    setResult(null);
    try {
      setResult(await requestFeedback(body));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return { busy, error, result, run };
}

function WritingFeedback() {
  const [promptId, setPromptId] = useState(writingPrompts[0]!.id);
  const [text, setText] = useState("");
  const { busy, error, result, run } = useFeedback();
  const prompt = writingPrompts.find((p) => p.id === promptId)!;
  const words = countWords(text);
  const min = prompt.task === "task2" ? 250 : 150;

  useEffect(() => {
    const d = load<Draft | null>(DRAFT_KEY, null);
    if (d?.text && writingPrompts.some((p) => p.id === d.promptId)) {
      setPromptId(d.promptId);
      setText(d.text);
    }
  }, []);

  return (
    <>
      <form
        className="card"
        style={{ display: "grid", gap: 14 }}
        onSubmit={(e) => {
          e.preventDefault();
          run({ mode: "writing", task: prompt.task, prompt: prompt.text, text });
        }}
      >
        <label>
          Question
          <select value={promptId} onChange={(e) => setPromptId(e.target.value)}>
            {writingPrompts.map((p) => (
              <option key={p.id} value={p.id}>
                {(p.task === "task2" ? "Task 2: " : "Task 1 letter: ") + p.text.slice(0, 70)}…
              </option>
            ))}
          </select>
        </label>
        <p className="notice small">{prompt.text}</p>
        <label>
          Your answer
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={14} placeholder="Paste or write your answer here." />
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
          <span className={"small " + (words >= min ? "" : "muted")}>
            {words} words {words < min && `(the task asks for at least ${min})`}
          </span>
          <button type="submit" className="btn accent" disabled={busy || words < 40}>
            <Sparkles size={18} aria-hidden /> {busy ? "Analysing… (up to 30 s)" : "Get my feedback"}
          </button>
        </div>
      </form>
      {error && <p className="notice bad" style={{ marginTop: 16 }} role="alert">{error}</p>}
      {result && <FeedbackResult f={result} />}
    </>
  );
}

type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: { resultIndex: number; results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }> }) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: { error: string }) => void) | null;
};

function SpeakingFeedback() {
  const [cardIndex, setCardIndex] = useState(0);
  const card = cueCards[cardIndex]!;
  const [phase, setPhase] = useState<"ready" | "prep" | "recording" | "done">("ready");
  const [seconds, setSeconds] = useState(60);
  const [finalText, setFinalText] = useState("");
  const [interim, setInterim] = useState("");
  const [supported, setSupported] = useState(true);
  const [micError, setMicError] = useState("");
  const rec = useRef<Recognition | null>(null);
  const { busy, error, result, run } = useFeedback();

  useEffect(() => {
    const w = window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
    setSupported(!!(w.SpeechRecognition || w.webkitSpeechRecognition));
    setCardIndex(Math.floor(Math.random() * cueCards.length));
    return () => rec.current?.stop();
  }, []);

  useEffect(() => {
    if (phase !== "prep" && phase !== "recording") return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [phase]);
  useEffect(() => {
    if (seconds > 0) return;
    if (phase === "prep") startRecording();
    else if (phase === "recording") stopRecording();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, phase]);

  function startRecording() {
    setMicError("");
    setPhase("recording");
    setSeconds(120);
    if (!supported) return;
    const w = window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
    const R = (w.SpeechRecognition || w.webkitSpeechRecognition)!;
    const r = new R();
    r.lang = "en-GB";
    r.continuous = true;
    r.interimResults = true;
    r.onresult = (e) => {
      let fin = "";
      let tmp = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i]!;
        if (res.isFinal) fin += res[0].transcript + " ";
        else tmp += res[0].transcript;
      }
      if (fin) setFinalText((t) => (t + " " + fin).replace(/\s+/g, " ").trimStart());
      setInterim(tmp);
    };
    r.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") setMicError("Microphone access was blocked. Allow the microphone in your browser, or type your answer below.");
    };
    // Recognition stops by itself after silences: restart it while the two minutes are running.
    r.onend = () => {
      if (rec.current === r) {
        try {
          r.start();
        } catch {
          // Already started or stopped.
        }
      }
    };
    rec.current = r;
    try {
      r.start();
    } catch {
      setMicError("Could not start the microphone. You can type your answer below instead.");
    }
  }
  function stopRecording() {
    const r = rec.current;
    rec.current = null;
    r?.stop();
    setInterim("");
    setPhase("done");
  }
  const words = countWords(finalText);

  return (
    <>
      <div className="tool-layout">
        <div className="card">
          <span className="tag speaking">Part 2 task card</span>
          <h3 style={{ marginTop: 12 }}>{card.topic}</h3>
          <p className="small muted" style={{ marginBottom: 4 }}>You should say:</p>
          <ul>{card.points.map((p) => <li key={p}>{p}</li>)}</ul>
          {phase === "ready" && (
            <button type="button" className="btn ghost sm" onClick={() => setCardIndex((i) => (i + 1) % cueCards.length)}>
              <Shuffle size={16} aria-hidden /> Another card
            </button>
          )}
        </div>
        <div className="card result-panel">
          <span className="eyebrow">{phase === "prep" ? "Preparation" : phase === "recording" ? "Speaking" : "Timer"}</span>
          <div className={"big-band timer" + (phase === "recording" && seconds < 20 ? " low" : "")} style={{ fontSize: "3.2rem" }}>
            {phase === "prep" || phase === "recording" ? `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}` : phase === "done" ? "Done" : "1:00"}
          </div>
          {phase === "ready" && (
            <div className="btn-row" style={{ justifyContent: "center" }}>
              <button type="button" className="btn primary" onClick={() => { setFinalText(""); setSeconds(60); setPhase("prep"); }}>
                Start 1-minute preparation
              </button>
              <button type="button" className="btn ghost" onClick={() => { setFinalText(""); startRecording(); }}>
                <Mic size={18} aria-hidden /> Speak now
              </button>
            </div>
          )}
          {phase === "prep" && (
            <button type="button" className="btn primary" onClick={startRecording}>
              <Mic size={18} aria-hidden /> I'm ready, start speaking
            </button>
          )}
          {phase === "recording" && (
            <button type="button" className="btn accent" onClick={stopRecording}>
              <Square size={16} aria-hidden /> Stop
            </button>
          )}
          {phase === "done" && (
            <button type="button" className="btn ghost" onClick={() => { setPhase("ready"); setSeconds(60); }}>
              Try again
            </button>
          )}
          {!supported && <p className="small muted" style={{ marginTop: 12 }}>Speech recognition is not available in this browser (try Chrome or Edge). You can type what you would say instead.</p>}
        </div>
      </div>
      {micError && <p className="notice warn" style={{ marginTop: 16 }}>{micError}</p>}
      <form
        className="card"
        style={{ display: "grid", gap: 12, marginTop: 18 }}
        onSubmit={(e) => {
          e.preventDefault();
          run({ mode: "speaking", prompt: card.topic + " You should say: " + card.points.join("; "), text: finalText });
        }}
      >
        <label>
          Transcript of your answer {phase === "recording" && <span className="muted small">(listening…)</span>}
          <textarea
            value={finalText + (interim ? " " + interim : "")}
            onChange={(e) => setFinalText(e.target.value)}
            readOnly={phase === "recording"}
            rows={8}
            placeholder="Your words appear here as you speak. You can also type your answer."
          />
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
          <span className="small muted">{words} words (a two-minute answer is usually 200–300 words)</span>
          <button type="submit" className="btn accent" disabled={busy || words < 40 || phase === "recording"}>
            <Sparkles size={18} aria-hidden /> {busy ? "Analysing…" : "Get my feedback"}
          </button>
        </div>
      </form>
      {error && <p className="notice bad" style={{ marginTop: 16 }} role="alert">{error}</p>}
      {result && <FeedbackResult f={result} />}
    </>
  );
}
