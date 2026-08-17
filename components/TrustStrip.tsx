const items = [
  ["On-Site Care", "Curtains cleaned where they hang with no unnecessary removal."],
  ["Fabric Assessment", "Bespoke method selected for delicate fibers and linings."],
  ["Minimal Disruption", "Quiet, clean process for luxury residences and hotels."],
  ["Documented Standards", "Certified technicians, fabric testing and quality inspection."]
];

export function TrustStrip() {
  return (
    <section className="trust-strip">
      <div className="shell trust-grid">
        {items.map(([t, b]) => (
          <div key={t}>
            <span className="trust-icon">✦</span>
            <strong>{t}</strong>
            <small>{b}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
