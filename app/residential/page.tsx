import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { ServiceGrid } from "@/components/ServiceGrid";
import { ProcessSteps } from "@/components/ProcessSteps";
import { CTASection } from "@/components/CTASection";

export const metadata = { title: "Residential Textile Care", alternates: { canonical: "/residential" } };
export default function ResidentialPage(){return <><Hero eyebrow="Residential" title="Premium on-site textile care for the home." body="A calmer, risk-aware service journey for curtains, blinds, upholstery and other fitted or delicate textiles."/><TrustStrip/><section className="section"><div className="shell"><div className="section-heading"><p className="eyebrow">Residential services</p><h2>Choose the textile or problem.</h2></div><ServiceGrid/></div></section><ProcessSteps/><CTASection/></>}
