import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="catalog-brand"><span className="catalog-brand-mark">S</span> SUN<span>AI</span></div>
      <div className="not-found-code">404</div>
      <h1>This page is still learning.</h1>
      <p>We couldn&#39;t find that page. Head back to your learning space and keep going.</p>
      <Link href="/" className="course-start-button">Back to dashboard</Link>
    </main>
  );
}
