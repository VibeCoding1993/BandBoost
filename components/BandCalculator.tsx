"use client";
import { useState } from "react";
import { bandLabel, formatBand, overallBand, rawToBand } from "@/lib/bands";

const bands = Array.from({ length: 19 }, (_, i) => i / 2).reverse();

export function BandCalculator() {
  const [version, setVersion] = useState<"academic" | "general">("academic");
  const [listening, setListening] = useState(30);
  const [reading, setReading] = useState(30);
  const [writing, setWriting] = useState(6.5);
  const [speaking, setSpeaking] = useState(6.5);
  const lBand = rawToBand(listening, "listening");
  const rBand = rawToBand(reading, version === "academic" ? "academicReading" : "generalReading");
  const overall = overallBand([lBand, rBand, writing, speaking]);
  const mean = (lBand + rBand + writing + speaking) / 4;

  const raw = (label: string, value: number, set: (n: number) => void, band: number) => (
    <label>
      {label} (correct answers out of 40)
      <input type="number" min={0} max={40} value={value} onChange={(e) => set(Math.max(0, Math.min(40, Number(e.target.value) || 0)))} />
      <span className="small muted">→ band {formatBand(band)}</span>
    </label>
  );
  const pick = (label: string, value: number, set: (n: number) => void) => (
    <label>
      {label} band
      <select value={value} onChange={(e) => set(Number(e.target.value))}>
        {bands.map((b) => (
          <option key={b} value={b}>
            {formatBand(b)}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <div className="tool-layout">
      <div className="card" style={{ display: "grid", gap: 18 }}>
        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend style={{ fontWeight: 650, marginBottom: 8 }}>Test version</legend>
          <div className="options" style={{ paddingLeft: 0 }}>
            {(["academic", "general"] as const).map((v) => (
              <label key={v}>
                <input type="radio" name="version" checked={version === v} onChange={() => setVersion(v)} />
                {v === "academic" ? "Academic" : "General Training"}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="form-grid">
          {raw("Listening", listening, setListening, lBand)}
          {raw("Reading", reading, setReading, rBand)}
          {pick("Writing", writing, setWriting)}
          {pick("Speaking", speaking, setSpeaking)}
        </div>
      </div>
      <div className="card result-panel" aria-live="polite">
        <span className="eyebrow">Overall band</span>
        <div className="big-band">{formatBand(overall)}</div>
        <p>
          <strong>{bandLabel(overall)}</strong>
        </p>
        <div className="stat-row">
          <div className="stat"><b>{formatBand(lBand)}</b><span>Listening</span></div>
          <div className="stat"><b>{formatBand(rBand)}</b><span>Reading</span></div>
          <div className="stat"><b>{formatBand(writing)}</b><span>Writing</span></div>
          <div className="stat"><b>{formatBand(speaking)}</b><span>Speaking</span></div>
        </div>
        <p className="small muted" style={{ marginTop: 14 }}>
          Average {mean.toFixed(3).replace(/0+$/, "").replace(/\.$/, "")}, rounded to {formatBand(overall)}.
        </p>
      </div>
    </div>
  );
}
