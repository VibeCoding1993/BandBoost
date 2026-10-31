/** Extracts the "## FAQ" section of a lesson (### question + answer paragraphs). */
export function extractFaq(markdown: string): { q: string; a: string }[] {
  const start = markdown.search(/^## FAQ\s*$/m);
  if (start < 0) return [];
  const rest = markdown.slice(start).split("\n").slice(1).join("\n");
  const end = rest.search(/^## /m);
  const block = end >= 0 ? rest.slice(0, end) : rest;
  return block
    .split(/^### /m)
    .slice(1)
    .map((chunk) => {
      const [q, ...a] = chunk.split("\n");
      const answer = a
        .join(" ")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[*_`>]/g, "")
        .replace(/\s+/g, " ")
        .trim();
      return { q: q!.trim(), a: answer };
    })
    .filter((f) => f.q && f.a);
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
