import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { aiOn, site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy", description: `How ${site.name} handles your data, cookies and advertising.`, alternates: { canonical: "/privacy/" } };

export default function Page() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy policy"
      body={`
*Last updated: 31 October 2026*

This policy explains what information ${site.name} ("we") collects when you use ${site.url}, and how it is used.

## Information we do not collect

You do not need an account to use this site. We do not ask for your name, email address or any other personal details to use lessons, practice tests or tools.

## Information stored in your browser

Some tools save your progress **in your own browser** (local storage): your writing drafts, flashcard progress and best practice-test scores. This information never leaves your device unless you send it yourself, and you can delete it at any time by clearing your browser's site data.

## Essay checker and speaking practice

The instant checks in our essay checker run **entirely in your browser**: the text you type is not sent to us. Speech recognition in the Speaking tool is provided by your browser; depending on the browser, audio may be processed by its provider (for example Google for Chrome).

${aiOn ? `When you request **AI feedback**, the text of your answer (or the transcript of your spoken answer) is sent to our feedback service and then to **Google's Gemini API** to generate the feedback. We do not store your text on our servers. Google processes it under its own terms and privacy policy. Do not include personal information in answers you submit.

To prevent abuse, our feedback service counts requests per IP address for a limited time. These counters are kept in memory only and are not linked to any other information.` : ""}

## Cookies and advertising

We use **Google AdSense** to show advertisements. Google and its partners use cookies to serve ads based on your previous visits to this and other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visits to this site and/or other sites on the internet.

- You can opt out of personalised advertising by visiting [Google Ads Settings](https://adssettings.google.com/).
- You can learn more about how Google uses data at [How Google uses information from sites or apps that use its services](https://policies.google.com/technologies/partner-sites).
- Visitors in the European Economic Area, the United Kingdom and Switzerland are asked for consent through a certified consent management platform before personalised ads are shown.

## Hosting and logs

Our hosting provider may keep standard technical logs (such as IP address, browser type and pages requested) for security and reliability. We use these only to keep the site running.

## Children

This site is intended for learners preparing for IELTS, generally aged 16 and over. We do not knowingly collect information from children.

## Changes

We may update this policy. The date at the top shows the latest version.

## Contact

Questions about this policy? See our [contact page](/contact/).
`}
    />
  );
}
