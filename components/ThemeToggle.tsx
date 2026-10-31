"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { THEME_KEY as KEY } from "@/lib/theme";

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);
  useEffect(() => setDark(document.documentElement.dataset.theme === "dark"), []);
  function toggle() {
    const next = !dark;
    const apply = () => {
      document.documentElement.dataset.theme = next ? "dark" : "light";
      setDark(next);
    };
    try {
      localStorage.setItem(KEY, next ? "dark" : "light");
    } catch {
      // Not remembered, but still applied.
    }
    // Smooth cross-fade where the View Transitions API is supported.
    const d = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (d.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches) d.startViewTransition(apply);
    else apply();
  }
  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} title={dark ? "Light mode" : "Dark mode"}>
      {dark ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
    </button>
  );
}
