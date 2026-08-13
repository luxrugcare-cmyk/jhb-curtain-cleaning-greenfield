import { Hero } from "@/components/Hero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { CTASection } from "@/components/CTASection";

export const metadata = { title: "About" };

export default function About() {
  return <>
    <Hero eyebrow="About" title="A specialist service built around assessment and fabric care." body="JHB Curtain Cleaning provides residential and commercial textile-care services with an assessment-led process designed around the fabric, installation and property requirements." />
    <section className="section"><div className="shell content-grid"><article><p className="eyebrow">Our approach</p><h2>Start with the textile and the environment.</h2><p>Different fabrics, linings, fittings, access conditions and operating environments require different treatment decisions. Our service pathway starts by understanding those variables before work is planned.</p><p>For commercial properties, the assessment also considers operating hours, access, scope and scheduling so the service can be planned around the site.</p></article><aside className="info-panel"><h3>What we do not assume</h3><p>Suitability, treatment method and service scope are assessed for the specific item and property rather than treated as one-size-fits-all.</p></aside></div></section>
    <ProcessSteps />
    <CTASection />
  </>;
}
