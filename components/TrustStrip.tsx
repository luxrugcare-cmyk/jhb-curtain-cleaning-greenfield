const items = [
  ["On-site care", "Designed around fitted curtains and textiles."],
  ["Fabric expertise", "Method selected for fabric and installation."],
  ["Minimal disruption", "Residential and operational environments."],
  ["Controlled process", "Assessment, treatment, cleaning and inspection."]
];

export function TrustStrip() {
  return <section className="trust-strip"><div className="shell trust-grid">{items.map(([t,b]) => <div key={t}><span className="trust-icon">◆</span><strong>{t}</strong><small>{b}</small></div>)}</div></section>;
}
