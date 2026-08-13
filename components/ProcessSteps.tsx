import { processSteps } from "@/lib/site-data";

export function ProcessSteps() {
  return <section className="section"><div className="shell"><div className="section-heading"><p className="eyebrow">Our process</p><h2>A deliberate five-step service pathway</h2></div><div className="process-grid">{processSteps.map(([n,t,b]) => <article key={n} className="process-card"><span>{n}</span><h3>{t}</h3><p>{b}</p></article>)}</div></div></section>;
}
