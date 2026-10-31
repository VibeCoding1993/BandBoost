"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, Volume2 } from "lucide-react";
import type { ScriptLine } from "@/content/practice-types";

type State = "idle" | "playing" | "paused" | "done" | "unsupported";

/** Picks two distinct English voices (one for each kind of speaker) from those the browser offers. */
function pickVoices(): { female?: SpeechSynthesisVoice; male?: SpeechSynthesisVoice } {
  const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("en"));
  const gb = voices.filter((v) => /en[-_]gb/i.test(v.lang));
  const pool = gb.length >= 2 ? gb : voices;
  const female = pool.find((v) => /female|woman|libby|sonia|serena|kate|susan|hazel|samantha|zira|aria|jenny/i.test(v.name)) || pool[0];
  const male = pool.find((v) => v !== female && /male|man|daniel|ryan|george|guy|thomas|arthur|david|mark/i.test(v.name) && !/female/i.test(v.name)) || pool.find((v) => v !== female) || female;
  return { female, male };
}

/** Splits lines into sentences: Chrome's online voices stop after about 15 seconds of speech. */
export function toChunks(script: ScriptLine[]) {
  return script.flatMap((l, line) =>
    l.text
      .split(/(?<=[.!?]["”’]?)\s+/)
      .filter(Boolean)
      .map((t) => ({ ...l, text: t.trim(), line })),
  );
}

/**
 * Reads a listening script aloud with the browser's speech engine, one line at a time.
 * Exam mode allows a single play, as in the real test; practice mode allows pausing and replaying.
 */
export function ListeningPlayer({ script, examMode }: { script: ScriptLine[]; examMode: boolean }) {
  const [state, setState] = useState<State>("idle");
  const [line, setLine] = useState(0);
  const [rate, setRate] = useState(0.95);
  const cancelled = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) setState("unsupported");
    else window.speechSynthesis.getVoices(); // starts loading the voice list
    return () => {
      cancelled.current = true;
      if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  function speakFrom(index: number) {
    const synth = window.speechSynthesis;
    synth.cancel();
    cancelled.current = false;
    const voices = pickVoices();
    const chunks = toChunks(script).filter((c) => c.line >= index);
    const next = (i: number) => {
      if (cancelled.current) return;
      if (i >= chunks.length) {
        setState("done");
        return;
      }
      const l = chunks[i]!;
      setLine(l.line);
      const u = new SpeechSynthesisUtterance(l.text);
      const voice = l.voice === "female" ? voices.female : voices.male;
      if (voice) u.voice = voice;
      u.lang = voice?.lang || "en-GB";
      u.rate = rate;
      // If both speakers share one voice, a pitch change keeps them distinguishable.
      u.pitch = voices.female === voices.male ? (l.voice === "female" ? 1.15 : 0.8) : 1;
      const pause = chunks[i + 1]?.line !== l.line ? 450 : 120;
      u.onend = () => setTimeout(() => next(i + 1), pause);
      u.onerror = () => setState("done");
      synth.speak(u);
    };
    setState("playing");
    next(index);
  }

  if (state === "unsupported")
    return (
      <div className="notice warn">
        Your browser cannot play the recording. Try Chrome, Edge or Safari, or open the transcript after answering.
      </div>
    );

  const progress = state === "done" ? 1 : script.length ? line / script.length : 0;
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <span className="icon-chip">
          <Volume2 size={22} aria-hidden />
        </span>
        <div style={{ flex: 1, minWidth: 180 }}>
          <strong>Recording</strong>
          <div className="small muted">
            {state === "idle" && (examMode ? "Plays once, as in the real test. Read the questions first." : "Practice mode: you can pause and replay.")}
            {state === "playing" && `Playing… (${script[line]?.speaker})`}
            {state === "paused" && "Paused"}
            {state === "done" && "Recording finished."}
          </div>
        </div>
        {state === "idle" && (
          <button type="button" className="btn primary" onClick={() => speakFrom(0)}>
            <Play size={18} aria-hidden /> Play recording
          </button>
        )}
        {state === "playing" && !examMode && (
          <button
            type="button"
            className="btn ghost"
            onClick={() => {
              window.speechSynthesis.pause();
              setState("paused");
            }}
          >
            <Pause size={18} aria-hidden /> Pause
          </button>
        )}
        {state === "paused" && (
          <button
            type="button"
            className="btn primary"
            onClick={() => {
              window.speechSynthesis.resume();
              setState("playing");
            }}
          >
            <Play size={18} aria-hidden /> Resume
          </button>
        )}
        {state === "done" && !examMode && (
          <button type="button" className="btn ghost" onClick={() => speakFrom(0)}>
            <RotateCcw size={18} aria-hidden /> Replay
          </button>
        )}
      </div>
      <div className="bar" role="progressbar" aria-label="Recording progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
        <span style={{ width: `${progress * 100}%` }} />
      </div>
      {state === "idle" && (
        <label className="small" style={{ fontWeight: 500 }}>
          Speed:{" "}
          <select value={rate} onChange={(e) => setRate(Number(e.target.value))} style={{ width: "auto", display: "inline-block", marginLeft: 6 }}>
            <option value={0.8}>Slower</option>
            <option value={0.95}>Normal</option>
            <option value={1.1}>Faster (exam challenge)</option>
          </select>
        </label>
      )}
    </div>
  );
}
