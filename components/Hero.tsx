import Link from "next/link";

export function Hero({ eyebrow, title, body, commercial = false }: { eyebrow: string; title: string; body: string; commercial?: boolean }) {
  return (
    <section className={`hero ${commercial ? "hero-commercial" : ""}`}>
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="hero-body">{body}</p>
          <div className="button-row">
            <Link className="button button-primary" href={commercial ? "/commercial-assessment" : "/quote"}>{commercial ? "Request site assessment" : "Get an assessment"}</Link>
            <Link className="button button-secondary" href={commercial ? "/results" : "/commercial"}>{commercial ? "View capability" : "Commercial services"}</Link>
          </div>
        </div>
        <div className="hero-visual" role="img" aria-label={commercial ? "Premium commercial interior placeholder" : "Premium residential interior placeholder"}>
          <div className="visual-card"><span>{commercial ? "Commercial textile care" : "On-site specialist care"}</span><strong>Image system reserved for verified project photography</strong></div>
        </div>
      </div>
    </section>
  );
}
