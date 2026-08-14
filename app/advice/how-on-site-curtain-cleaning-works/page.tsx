import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";

const path = "/advice/how-on-site-curtain-cleaning-works";
const title = "How Professional On-Site Curtain Cleaning Works";
const description = "A practical guide to professional on-site curtain cleaning: assessment, fabric checks, treatment decisions, cleaning steps and when removal may still be necessary.";
const published = "2026-08-14";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
};

export default function OnSiteCurtainCleaningGuide() {
  return (
    <>
      <JsonLd data={articleJsonLd({ headline: title, description, path, datePublished: published })} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Advice", path: "/advice" },
          { name: title, path },
        ])}
      />

      <Hero
        eyebrow="Curtain cleaning guide"
        title="How professional on-site curtain cleaning works."
        body="On-site cleaning can reduce disruption because suitable curtains remain installed. The important part is deciding whether the fabric, lining, condition and site are appropriate before treatment begins."
      />

      <section className="section">
        <div className="shell content-grid">
          <article>
            <p className="eyebrow">The short answer</p>
            <h2>On-site cleaning starts with assessment, not with a machine.</h2>
            <p>
              Curtains are not all built the same way. Fibre content, lining, dye stability, age, previous cleaning, sun damage, stains and the way the curtain is installed can all affect the safest cleaning approach. A professional on-site service should therefore begin by checking suitability and identifying anything that could change the method or expected result.
            </p>
            <p>
              When the curtain is suitable, cleaning can often be carried out while it remains hanging. This avoids unnecessary removal and refitting, which is especially useful in occupied homes, offices, hotels and other spaces where keeping rooms available matters.
            </p>
          </article>
          <aside className="sticky-panel">
            <p className="eyebrow">Need an assessment?</p>
            <h3>Start with the property type.</h3>
            <p>Residential and commercial enquiries follow separate assessment paths so the right site details are captured.</p>
            <a className="button button-primary" href="/quote">Residential assessment</a>
            <a className="button button-secondary" href="/commercial-assessment">Commercial site assessment</a>
          </aside>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">Step 1</p>
            <h2>Inspect the curtain and installation.</h2>
          </div>
          <div className="feature-grid">
            <article><h3>Fabric and lining</h3><p>The textile type, lining and construction help determine which cleaning methods may be appropriate.</p></article>
            <article><h3>Condition</h3><p>Sun damage, weak seams, previous shrinkage, dye movement or other existing damage should be identified before work starts.</p></article>
            <article><h3>Soiling and stains</h3><p>General dust and traffic soil are different from oil, water marks, dye stains or unknown spots. The likely result can vary accordingly.</p></article>
            <article><h3>Access</h3><p>Height, furniture, window position and room use affect how the work can be completed safely and with minimal disruption.</p></article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell content-grid">
          <article>
            <p className="eyebrow">Step 2</p>
            <h2>Choose the cleaning approach.</h2>
            <p>
              “Curtain cleaning” describes the outcome, not one universal process. The selected approach should match the textile and site conditions. A method suitable for a robust synthetic curtain may not be appropriate for a delicate fabric, unstable dye or heavily damaged lining.
            </p>
            <p>
              The assessment should also establish realistic expectations. Cleaning can improve accumulated soil, dust, many marks and odours, but it cannot reverse permanent sun fading, fibre damage, weakened fabric or every historic stain.
            </p>
          </article>
          <article>
            <p className="eyebrow">Step 3</p>
            <h2>Protect the surrounding area and treat priority spots.</h2>
            <p>
              Before general cleaning begins, the working area should be prepared and nearby surfaces protected as required. Priority marks can then be evaluated and pre-treated where the fabric allows. Aggressive stain treatment is not automatically better; excessive chemistry or moisture can create a larger problem on sensitive textiles.
            </p>
          </article>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell content-grid">
          <article>
            <p className="eyebrow">Step 4</p>
            <h2>Clean systematically while the curtain remains installed.</h2>
            <p>
              For curtains approved for in-place cleaning, the technician works through the fabric in a controlled sequence. The objective is consistent treatment without unnecessary handling or taking the curtain off its track or rod.
            </p>
            <p>
              Drying conditions and room ventilation still matter. “On-site” does not mean that every textile is instantly dry or that every fabric uses the same amount of moisture. The correct expectation should be discussed during assessment.
            </p>
          </article>
          <article>
            <p className="eyebrow">Step 5</p>
            <h2>Inspect the result.</h2>
            <p>
              The final check should identify the overall finish, any marks that remain and any maintenance advice relevant to the fabric. Where a stain cannot be safely pursued further, protecting the textile takes priority over forcing a cosmetic result.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">When on-site cleaning may not be suitable</p>
            <h2>Some curtains should not be treated in place.</h2>
            <p>An assessment may recommend a different route when the construction or condition makes in-place treatment inappropriate.</p>
          </div>
          <div className="feature-grid">
            <article><h3>Fragile or failing fabric</h3><p>Severe sun degradation, weakened seams or brittle material can make normal handling risky.</p></article>
            <article><h3>Unstable dyes or finishes</h3><p>Some dyes, coatings or previous treatments can react unpredictably and require additional caution.</p></article>
            <article><h3>Specialist construction</h3><p>Very heavy, layered, embellished or unusual curtains may require a different cleaning pathway.</p></article>
            <article><h3>Contamination beyond normal cleaning</h3><p>Situations involving hazardous contamination, significant mould or building-related moisture may require specialist remediation rather than ordinary textile cleaning.</p></article>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell content-grid">
          <article>
            <p className="eyebrow">Why businesses use on-site cleaning</p>
            <h2>It can reduce operational disruption.</h2>
            <p>
              Hotels, offices, facilities and venues often value a method that does not require removing large numbers of curtains and transporting them away. The commercial benefit is primarily operational: access, room availability and scheduling can be planned around the property.
            </p>
            <p><Link href="/commercial">Explore commercial curtain and textile care →</Link></p>
          </article>
          <article>
            <p className="eyebrow">Related service</p>
            <h2>Curtain cleaning assessment.</h2>
            <p>Review the service page for the practical suitability factors used before a cleaning method is recommended.</p>
            <p><Link href="/services/curtain-cleaning">Explore curtain cleaning →</Link></p>
          </article>
        </div>
      </section>

      <CTASection />
    </>
  );
}
