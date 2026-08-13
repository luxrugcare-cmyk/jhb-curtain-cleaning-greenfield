import Link from "next/link";

export function CTASection() {
  return <section className="section"><div className="shell cta-panel"><div><p className="eyebrow">Ready to discuss the property?</p><h2>Choose the correct assessment path.</h2></div><div className="button-row"><Link className="button button-primary" href="/quote">Residential quote</Link><Link className="button button-secondary" href="/commercial-assessment">Commercial assessment</Link></div></div></section>;
}
