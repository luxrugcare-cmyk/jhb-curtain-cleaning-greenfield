import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getService } from "@/integrations/sanity/content";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { ProcessSteps } from "@/components/ProcessSteps";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo/jsonld";
import { normalizeSeoDescription, normalizeSeoTitle } from "@/lib/seo/metadata";
import { serviceIntent } from "@/lib/growth/service-intent";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};

  return {
    title: normalizeSeoTitle(service.seo?.title, service.title),
    description: normalizeSeoDescription(
      service.seo?.description,
      service.summary,
      "Professional on-site assessment and textile care for homes and commercial properties across Johannesburg.",
    ),
    alternates: { canonical: `/services/${slug}` },
    robots: service.seo?.noIndex ? { index: false, follow: true } : undefined,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const intent = serviceIntent[slug];

  return (
    <>
      <JsonLd data={serviceJsonLd(service.title, service.summary, `/services/${slug}`)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: service.title, path: `/services/${slug}` }])} />
      <Hero eyebrow={service.heroEyebrow || "Specialist service"} title={service.title} body={service.summary} />
      <TrustStrip />

      <section className="section">
        <div className="shell content-grid">
          <article>
            <p className="eyebrow">Service detail</p>
            <h2>Assess suitability before choosing the method.</h2>
            <p>
              {service.intro ||
                intent?.lead ||
                "The assessment considers the textile, installation, condition and property requirements before the service approach is discussed."}
            </p>

            {service.suitableFor?.length ? (
              <div className="info-panel">
                <h3>Suitable for</h3>
                <ul className="check-list">
                  {service.suitableFor.map((item: string) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : intent ? (
              <div className="info-panel">
                <h3>Common requests</h3>
                <ul className="check-list">
                  {intent.commonRequests.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </article>

          <aside className="sticky-panel">
            <p className="eyebrow">Assessment</p>
            <h3>Need this service?</h3>
            <p>Choose the assessment that matches the property. Residential and commercial enquiries use separate workflows.</p>
            <a className="button button-primary" href="/quote">Residential assessment</a>
            <a className="button button-secondary" href="/commercial-assessment">Commercial site assessment</a>
          </aside>
        </div>
      </section>

      {intent ? (
        <section className="section section-soft">
          <div className="shell">
            <div className="section-heading">
              <p className="eyebrow">Before cleaning</p>
              <h2>What affects the recommended approach?</h2>
              <p>The safest method depends on the textile and its condition rather than the service name alone.</p>
            </div>
            <div className="feature-grid">
              {intent.decisionPoints.map((item) => (
                <article key={item}>
                  <h3>{item}</h3>
                  <p>This is checked during assessment so the proposed scope matches the material, installation and site conditions.</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ProcessSteps />

      {intent?.related.length ? (
        <section className="section">
          <div className="shell">
            <div className="section-heading">
              <p className="eyebrow">Related textile care</p>
              <h2>Services often considered together.</h2>
            </div>
            <div className="feature-grid">
              {intent.related.map((item) => (
                <article key={item.slug}>
                  <h3>{item.label}</h3>
                  <p>Review the service scope and assessment considerations before deciding what should be included in the visit.</p>
                  <Link href={`/services/${item.slug}`}>Explore {item.label.toLowerCase()} →</Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection />
    </>
  );
}
