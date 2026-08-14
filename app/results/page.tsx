import { Hero } from "@/components/Hero";
import { CTASection } from "@/components/CTASection";

export const metadata = { title: "Results & Case Studies", alternates: { canonical: "/results" } };

export default function Results() {
  return <><Hero eyebrow="Results" title="Project evidence, documented clearly." body="Completed project stories will be added as suitable photography, scope details and outcomes are available for publication."/><section className="section"><div className="shell content-grid"><article><p className="eyebrow">Project records</p><h2>See the property, textile, approach and outcome together.</h2><p>Residential and commercial case studies will be published here when the supporting project information is ready to share.</p></article><aside className="info-panel"><h3>Have a similar requirement?</h3><p>Send an assessment request with the property, textile and scope so we can discuss the appropriate next step.</p></aside></div></section><CTASection/></>;
}
