import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { aiOn, disclaimer, site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Use", description: `Terms of use for ${site.name}.`, alternates: { canonical: "/terms/" } };

export default function Page() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of use"
      body={`
*Last updated: 31 October 2026*

By using ${site.name} you agree to these terms.

## Educational use

All content is provided free of charge for personal study. Practice-test scores, band calculations${aiOn ? ", AI feedback" : ""} and automatic checks are **estimates** to support your learning. They are not official IELTS results, and we make no guarantee about the score you will obtain in an official test.

## Our content

Lessons, practice tests, model answers and other materials on this site are original and protected by copyright. You may print or save pages for your own study. Teachers may share links freely. Please do not republish our content elsewhere without permission.

## Acceptable use

Do not attempt to disrupt the site or its services, submit harmful content to the AI tools, or use automated systems to send large numbers of requests.

## Third-party services

The site uses third-party services, including Google AdSense for advertising${aiOn ? " and Google Gemini for AI feedback" : ""}. Their own terms apply to their services. External links are provided for convenience; we are not responsible for the content of other websites.

## Trademark notice

${disclaimer}

## Limitation of liability

The site is provided "as is". To the extent permitted by law, we are not liable for any loss arising from the use of this site or reliance on its content.

## Contact

See our [contact page](/contact/).
`}
    />
  );
}
