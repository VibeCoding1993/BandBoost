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
`}
    />
  );
}
