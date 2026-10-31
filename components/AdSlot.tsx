"use client";
import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Responsive AdSense unit. Renders nothing until NEXT_PUBLIC_ADSENSE_CLIENT is set,
 * so the site stays clean while it is reviewed. `slot` is the ad unit id from AdSense;
 * without one, Auto ads (enabled in the AdSense dashboard) place ads automatically.
 */
export function AdSlot({ slot }: { slot?: string }) {
  const pushed = useRef(false);
  useEffect(() => {
    if (!site.adsenseClient || !slot || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blocked or script not loaded: nothing to do.
    }
  }, [slot]);
  if (!site.adsenseClient || !slot) return null;
  return (
    <aside className="ad-slot" aria-label="Advertisement">
      <span className="ad-label">Advertisement</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={site.adsenseClient}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
