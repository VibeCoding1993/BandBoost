// Small, failure-safe wrappers around localStorage (private browsing can block it).
export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}
export function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Not saved: the tool keeps working without persistence.
  }
}
/** Shared draft between the writing timer and the AI feedback page. */
export const DRAFT_KEY = "bb-writing-draft";
export type Draft = { promptId: string; text: string };
