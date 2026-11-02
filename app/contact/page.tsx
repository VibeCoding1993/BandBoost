import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact", description: `Contact the ${site.name} team.`, alternates: { canonical: "/contact/" } };

export default function Page() {
  const email = site.contactEmail;
  return (
    <LegalPage
      eyebrow="Contact"
      title="Contact us"
      body={`
We welcome questions, corrections and suggestions for new lessons or tools.

${email ? `**Email:** [${email}](mailto:${email})` : "**Email:** our contact address will be published here shortly."}

We usually reply within a few working days. Please note that we cannot:

- give official IELTS scores or re-mark official tests;
- help with booking, fees or results, which are handled by the official test centres;
- review long documents by email (use our free [AI feedback tool](/ai-feedback/) instead).

If you found an error in a lesson or a practice question, please mention the page address so we can fix it quickly.

## What you can contact us about

- **Corrections:** a wrong answer, an unclear explanation, a typing error or a broken link.
- **Suggestions:** topics you would like a lesson on, question types you want to practise, or ideas for new tools.
- **Teachers and schools:** you are welcome to link to any page for your students. Write to us if you would like to suggest content for your classes.
- **Privacy requests:** questions about the data described in our [privacy policy](/privacy/).
- **Advertising concerns:** if you see an advertisement on this site that seems inappropriate or misleading, tell us the page address and what the ad showed, and we will report and block it.

Before writing, you may find your answer in our [About page](/about/), which explains how our lessons and practice tests are made.
`}
    />
  );
}
