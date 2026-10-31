// Single source of truth for the brand: change the name and URL here when the domain is bought.
const ai = !!process.env.NEXT_PUBLIC_API_URL;

export const site = {
  name: "IELTS Band Coach",
  tagline: `Free IELTS preparation: lessons, practice tests and ${ai ? "AI feedback" : "an essay checker"}`,
  description:
    "Prepare for IELTS Academic and General Training for free: clear lessons for every section, original practice tests with instant scoring, a band score calculator, vocabulary flashcards and " +
    (ai ? "AI feedback on your writing and speaking." : "instant checks on your writing and speaking."),
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://ieltsbandcoach.xyz").replace(/\/$/, ""),
  apiUrl: (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, ""),
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  /** Google AdSense publisher id (ca-pub-…). Ads stay off until it is set. */
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "",
};

/** True once the AI feedback API is configured; wording across the site adapts to it. */
export const aiOn = !!site.apiUrl;
export const feedbackLabel = aiOn ? "AI feedback" : "Essay checker";

export const disclaimer =
  "IELTS is a registered trademark of the British Council, IDP: IELTS Australia and Cambridge University Press & Assessment. " +
  `${site.name} is an independent learning website and is not affiliated with, approved or endorsed by these organisations. ` +
  "All lessons, practice tests and answers on this site are original material.";
