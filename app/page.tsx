import Link from "next/link";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { AudienceSplit } from "@/components/AudienceSplit";
import { ServiceGrid } from "@/components/ServiceGrid";
import { ProcessSteps } from "@/components/ProcessSteps";
import { CTASection } from "@/components/CTASection";

export default function HomePage() {
  return <>
    <Hero eyebrow="On-site curtain & textile care" title="Specialist fabric care. Without taking your curtains down." body="A premium residential and commercial service pathway built around fabric expertise, controlled process and minimal disruption." />
    <TrustStrip/>
    <AudienceSplit/>
    <section className="section"><div className="shell"><div className="section-heading split-heading"><div><p className="eyebrow">Core services</p><h2>Specialist textile care, structured by need.</h2></div><Link className="card-link" href="/residential">Explore residential →</Link></div><ServiceGrid limit={6}/></div></section>
    <ProcessSteps/>
    <section className="section surface"><div className="shell case-study"><div className="case-media"/><div><p className="eyebrow">Proof, not promises</p><h2>Case studies will document the property, textile, method and result.</h2><p>The greenfield content model reserves this area for verified project photography and measurable outcomes rather than invented testimonials or generic stock claims.</p><Link className="button button-secondary" href="/results">View results structure</Link></div></div></section>
    <CTASection/>
  </>;
}
