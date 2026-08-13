import Link from "next/link";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { AudienceSplit } from "@/components/AudienceSplit";
import { ServiceGrid } from "@/components/ServiceGrid";
import { ProcessSteps } from "@/components/ProcessSteps";
import { CTASection } from "@/components/CTASection";

export default function HomePage() {
  return <>
    <Hero eyebrow="On-site curtain & textile care" title="Specialist fabric care. Without taking your curtains down." body="Residential and commercial textile care built around assessment, fabric suitability and minimal disruption." />
    <TrustStrip/>
    <AudienceSplit/>
    <section className="section"><div className="shell"><div className="section-heading split-heading"><div><p className="eyebrow">Core services</p><h2>Specialist textile care, structured by need.</h2></div><Link className="card-link" href="/residential">Explore residential →</Link></div><ServiceGrid limit={6}/></div></section>
    <ProcessSteps/>
    <section className="section surface"><div className="shell case-study"><div className="case-media"/><div><p className="eyebrow">Project evidence</p><h2>Case studies will bring the property, textile, method and outcome together.</h2><p>Completed project stories will be added as suitable photography and supporting information are available for publication.</p><Link className="button button-secondary" href="/results">View results</Link></div></div></section>
    <CTASection/>
  </>;
}
