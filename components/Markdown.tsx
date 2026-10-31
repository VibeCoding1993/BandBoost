import { marked } from "marked";

/** Renders trusted, first-party Markdown (lesson content written for this site) at build time. */
export function Markdown({ source, className = "prose" }: { source: string; className?: string }) {
  const html = marked.parse(source, { async: false, gfm: true }) as string;
  return <div className={className} dangerouslySetInnerHTML={{ __html: addHeadingIds(html) }} />;
}

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;|&#\d+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function addHeadingIds(html: string) {
  return html.replace(/<h2>(.*?)<\/h2>/g, (_, inner: string) => `<h2 id="${slugify(inner)}">${inner}</h2>`);
}

/** Level-2 headings of a Markdown document, for the table of contents. */
export function headings(source: string) {
  return [...source.matchAll(/^## (.+)$/gm)].map((m) => ({ text: m[1]!.replace(/[*_`]/g, ""), id: slugify(m[1]!.replace(/[*_`]/g, "")) }));
}
