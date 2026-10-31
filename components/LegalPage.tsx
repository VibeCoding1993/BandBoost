import { Markdown } from "./Markdown";

export function LegalPage({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="container narrow">
      <header className="page-head section" style={{ paddingBottom: 10 }}>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
      </header>
      <Markdown source={body} />
    </div>
  );
}
