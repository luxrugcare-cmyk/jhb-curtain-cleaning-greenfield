import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { ServiceGrid } from "@/components/ServiceGrid";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";

export const metadata = {
  title: "On-site Curtain & Textile Cleaning Services",
  description: "Explore JHB Curtain Cleaning's on-site curtain, blind, upholstery, mattress, carpet, fabric-protection and specialist textile-care services.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <>
    <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
    <Hero eyebrow="Services" title="On-site care for curtains and interior textiles." body="Explore specialist cleaning and protection services for homes, offices, hospitality properties and other managed spaces. We assess fabric, access and operating requirements before recommending a method." />
    <TrustStrip />
    <section className="section">
      <div className="shell">
        <div className="section-heading">
          <p className="eyebrow">All services</p>
          <h2>Choose the textile or service requirement.</h2>
          <p>Start with the service that best matches your property. If the scope spans several textile types, request an assessment and we can define the work as one coordinated plan.</p>
        </div>
        <ServiceGrid />
      </div>
    </section>
    <CTASection />
  </>;
}
