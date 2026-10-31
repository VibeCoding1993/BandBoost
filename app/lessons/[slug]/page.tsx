import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, GraduationCap } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { Markdown, headings } from "@/components/Markdown";
import { lessonBySlug, lessons, lessonsBySection, neighbours } from "@/content/lessons";
import { sectionInfo } from "@/content/types";
import { site } from "@/lib/site";
import { breadcrumbLd, ldJson } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const lesson = lessonBySlug((await params).slug);
  if (!lesson) return {};
  const url = `/lessons/${lesson.slug}/`;
  return {
    title: lesson.title,
    description: lesson.description,
    alternates: { canonical: url },
    openGraph: { type: "article", title: lesson.title, description: lesson.description, url, modifiedTime: lesson.updated, images: [{ url: `/og/${lesson.slug}.png`, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: lesson.title, description: lesson.description, images: [`/og/${lesson.slug}.png`] },
  };
}

export default async function LessonPage({ params }: Params) {
  const lesson = lessonBySlug((await params).slug);
  if (!lesson) notFound();
  const toc = headings(lesson.body);
  const { prev, next } = neighbours(lesson.slug);
  const related = lessonsBySection(lesson.section).filter((l) => l.slug !== lesson.slug).slice(0, 4);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: lesson.title,
    description: lesson.description,
    datePublished: lesson.updated,
    dateModified: lesson.updated,
    image: `${site.url}/og/${lesson.slug}.png`,
    inLanguage: "en",
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/lessons/${lesson.slug}/`,
  };
  return (
    <div className="container">
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(jsonLd)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ldJson(
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Lessons", path: "/lessons/" },
            { name: sectionInfo[lesson.section].label, path: `/lessons/#${lesson.section}` },
            { name: lesson.title, path: `/lessons/${lesson.slug}/` },
          ]),
        )}
      />
      <div className="read-progress" aria-hidden />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link> › <Link href="/lessons/">Lessons</Link> ›{" "}
        <Link href={`/lessons/#${lesson.section}`}>{sectionInfo[lesson.section].label}</Link>
      </nav>
      <div className="article-layout">
        <article>
          <header className="page-head">
            <span className={"tag " + lesson.section}>{sectionInfo[lesson.section].label}</span>
            <h1 style={{ marginTop: 12 }}>{lesson.title}</h1>
            <p className="lead">{lesson.description}</p>
            <div className="article-meta">
              <span>
                <GraduationCap size={16} aria-hidden style={{ verticalAlign: -3 }} /> {lesson.level}
              </span>
              <span>
                <Clock size={16} aria-hidden style={{ verticalAlign: -3 }} /> {lesson.minutes} min read
              </span>
              <span>
                Updated{" "}
                {new Date(lesson.updated + "T12:00:00Z").toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </header>
          <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_ARTICLE_TOP} />
          <Markdown source={lesson.body} />
          <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_ARTICLE_BOTTOM} />
          <nav className="next-prev" aria-label="More lessons">
            {prev ? (
              <Link href={`/lessons/${prev.slug}/`} className="card link-card glow-card reveal">
                <span className="muted small">← Previous</span>
                <strong>{prev.title}</strong>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/lessons/${next.slug}/`} className="card link-card glow-card reveal">
                <span className="muted small">Next →</span>
                <strong>{next.title}</strong>
              </Link>
            )}
          </nav>
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
            <h2 style={{ fontSize: "1rem" }}>Practise what you learned</h2>
            <p className="small muted">Take a free timed test and get an instant band estimate.</p>
            <Link href="/practice/" className="btn primary sm">
              Start practising
            </Link>
          </div>
          {related.length > 0 && (
            <div className="card">
              <h2 style={{ fontSize: "1rem" }}>More {sectionInfo[lesson.section].label} lessons</h2>
              <ul className="small" style={{ paddingLeft: "1.1em", margin: 0 }}>
                {related.map((l) => (
                  <li key={l.slug} style={{ margin: "6px 0" }}>
                    <Link href={`/lessons/${l.slug}/`}>{l.title}</Link>
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
