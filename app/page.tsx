import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { AudienceSplit } from "@/components/AudienceSplit";
import { ServiceGrid } from "@/components/ServiceGrid";
import { ProcessSteps } from "@/components/ProcessSteps";
import { CTASection } from "@/components/CTASection";

export const metadata = {
  title: "On-Site Curtain Cleaning Johannesburg | Specialist Textile Care",
  description:
    "Professional on-site curtain cleaning in Johannesburg. Expert fabric assessment, zero shrinkage guarantee, no curtain removal. Free quote in 24-48h.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="On-site curtain & textile care"
        title="Specialist curtain cleaning in Johannesburg. Without unnecessary removal."
        body="Residential and commercial textile care built around fabric assessment, suitability and minimal disruption across Johannesburg and surrounding areas."
      />
      <TrustStrip />
      <AudienceSplit />

      <section className="section">
        <div className="shell content-grid">
          <article>
            <p className="eyebrow">Curtain cleaning</p>
            <h2>Start with the installed curtain and the property.</h2>
            <p>
              Our core service is professional curtain cleaning planned around the fabric, lining, condition, installation and room use. Where suitable, treatment can be completed while the curtains remain hanging, reducing removal and refitting disruption.
            </p>
            <p>
              <Link href="/services/curtain-cleaning">Explore curtain cleaning →</Link>
            </p>
            <p>
              <Link href="/advice/how-on-site-curtain-cleaning-works">
                How on-site curtain cleaning works →
              </Link>
            </p>
          </article>
          <article>
            <p className="eyebrow">Johannesburg service area</p>
            <h2>Local planning matters.</h2>
            <p>
              Access, estates, apartments, offices, hotels and managed facilities can all change how a textile-cleaning visit should be scoped. Our Johannesburg area pages explain those practical considerations without creating thin suburb doorway pages.
            </p>
            <p>
              <Link href="/areas/johannesburg">Curtain cleaning in Johannesburg →</Link>
            </p>
            <p>
              <Link href="/areas/sandton">Curtain cleaning in Sandton →</Link>
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Core services</p>
              <h2>Specialist textile care, structured by need.</h2>
            </div>
            <Link className="card-link" href="/residential">
              Explore residential →
            </Link>
          </div>
          <ServiceGrid limit={6} />
        </div>
      </section>

      <ProcessSteps />

      <section className="section surface">
        <div className="shell case-study">
          <div className="case-media-frame">
            <Image
              src="/brand/stitch/oriental-rug-cleaning.png"
              alt="Technician performing on-site delicate textile restoration in Johannesburg"
              width={700}
              height={450}
              className="case-study-img"
            />
          </div>
          <div>
            <p className="eyebrow">Project evidence</p>
            <h2>Meticulous care for delicate, high-value textiles.</h2>
            <p>
              Every fabric—from delicate silk curtains and Belgian linen drapes to hand-knotted Persian rugs and upholstered headboards—is assessed for dye stability, weave density, and backing construction before custom on-site treatment begins.
            </p>
            <Link className="button button-secondary" href="/results">
              View verified results
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
