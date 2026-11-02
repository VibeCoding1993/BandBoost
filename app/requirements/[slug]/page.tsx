import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { Markdown, headings } from "@/components/Markdown";
import { RequirementChecker } from "@/components/RequirementChecker";
import { requirementBySlug, requirements } from "@/content/requirements";
import { skillNames } from "@/content/requirement-types";
import { formatBand } from "@/lib/bands";
import { site } from "@/lib/site";
import { breadcrumbLd, ldJson } from "@/lib/seo";
import { extractFaq, faqLd } from "@/lib/faq";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return requirements.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const r = requirementBySlug((await params).slug);
  if (!r) return {};
  const url = `/requirements/${r.slug}/`;
  return {
    title: r.title,
    description: r.description,
    alternates: { canonical: url },
    openGraph: { type: "article", title: r.title, description: r.description, url, modifiedTime: r.checked, images: [{ url: `/og/${r.slug}.png`, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: r.title, description: r.description, images: [`/og/${r.slug}.png`] },
  };
}

const longDate = (d: string) => new Date(d + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function RequirementPage({ params }: Params) {
  const r = requirementBySlug((await params).slug);
  if (!r) notFound();
  const toc = headings(r.body);
  const related = requirements.filter((o) => o.slug !== r.slug && (o.country === r.country || o.category === r.category)).slice(0, 4);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: r.title,
    description: r.description,
    datePublished: r.checked,
    dateModified: r.checked,
    image: `${site.url}/og/${r.slug}.png`,
    inLanguage: "en",
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/requirements/${r.slug}/`,
    citation: r.sources.map((s) => s.url),
  };
  return (
    <div className="container">
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(jsonLd)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ldJson(
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Score requirements", path: "/requirements/" },
            { name: r.title, path: `/requirements/${r.slug}/` },
          ]),
        )}
      />
      {extractFaq(r.body).length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(faqLd(extractFaq(r.body)))} />}
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link> › <Link href="/requirements/">Score requirements</Link>
      </nav>
      <div className="article-layout">
        <article>
          <header className="page-head">
            <span className="tag general">
              {r.country} · {r.category}
            </span>
            <h1 style={{ marginTop: 12 }}>{r.title}</h1>
            <p className="lead">{r.description}</p>
            <div className="article-meta">
              <span>Accepted test: {r.module}</span>
              <span>Checked against official sources on {longDate(r.checked)}</span>
            </div>
          </header>
          <div className="prose" style={{ marginBottom: 20 }}>
            <table>
              <caption className="sr-only">Minimum IELTS scores</caption>
              <thead>
                <tr>
                  <th scope="col">Requirement</th>
                  <th scope="col">Overall</th>
                  {skillNames.map((s) => (
                    <th key={s} scope="col">{s}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {r.targets.map((t) => (
                  <tr key={t.label}>
                    <th scope="row">{t.label}</th>
                    <td>{t.overall ? formatBand(t.overall) : "–"}</td>
                    {t.min.map((m, i) => (
                      <td key={i}>{m ? formatBand(m) : "–"}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <RequirementChecker targets={r.targets} clb={r.clb} />
          <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_ARTICLE_TOP} />
          <Markdown source={r.body} />
          <section className="notice sources" aria-labelledby="sources">
            <h2 id="sources" style={{ fontSize: "1.05rem", marginTop: 0 }}>
              Official sources
            </h2>
            <ul>
              {r.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} rel="noopener" target="_blank">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="small" style={{ marginBottom: 0 }}>
              We checked these figures on {longDate(r.checked)}. Requirements change: always confirm them with the official
              source before you book a test or apply. This page is general information, not legal or immigration advice.
              Spotted an outdated figure? <Link href="/contact/">Tell us</Link>.
            </p>
          </section>
          <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_ARTICLE_BOTTOM} />
        </article>
        <aside className="article-aside">
          {toc.length > 1 && (
            <nav className="card toc" aria-label="On this page">
              <h2 className="h4" style={{ fontSize: "1rem" }}>
                On this page
              </h2>
              <ol>
                {toc.map((h) => (
                  <li key={h.id}>
                    <a href={"#" + h.id}>{h.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <div className="card">
            <h2 style={{ fontSize: "1rem" }}>Find your current level</h2>
            <p className="small muted">Take a free timed test and get an instant band estimate.</p>
            <Link href="/practice/" className="btn primary sm">
              Start practising
            </Link>
          </div>
          {related.length > 0 && (
            <div className="card">
              <h2 style={{ fontSize: "1rem" }}>Related requirements</h2>
              <ul className="small">
                {related.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/requirements/${o.slug}/`}>{o.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
