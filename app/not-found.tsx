import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container narrow section" style={{ textAlign: "center" }}>
      <span className="eyebrow">Error 404</span>
      <h1>This page doesn't exist</h1>
      <p className="lead" style={{ margin: "0 auto 24px" }}>
        It may have moved. Try one of these instead:
      </p>
      <div className="btn-row" style={{ justifyContent: "center" }}>
        <Link href="/lessons/" className="btn primary">Lessons</Link>
        <Link href="/practice/" className="btn ghost">Practice tests</Link>
        <Link href="/" className="btn ghost">Home</Link>
      </div>
    </div>
  );
}
