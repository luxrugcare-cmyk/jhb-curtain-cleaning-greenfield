import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CTASection } from "@/components/CTASection";
import { getPublishedCaseStudies } from "@/integrations/sanity/content";

export const metadata = {
  title: "Curtain & Textile Cleaning Case Studies & Results | JHB Curtain Cleaning",
  description: "Explore verified on-site curtain and textile cleaning results from luxury residential estates (Saddlebrook Estate Kyalami) and premier commercial hospitality properties (The Leonardo & The Maslow Sandton).",
  alternates: { canonical: "/results" },
};

const evidenceFields = [
  { title: "Property & Setting Scope", body: "Property type, location, ceiling drop height, and textile specifications establish clear project parameters before treatment." },
  { title: "Fabric & Condition Diagnostic", body: "Lining construction, dye stability, surface soiling, atmospheric particulate, and delicate fiber constraints are recorded." },
  { title: "Assessment Decision", body: "Technical rationale explaining why in-situ hanging extraction was chosen over destructive off-site vat washing." },
  { title: "Operational Sequencing", body: "Access scheduling, room turnaround windows, and estate protocols executed with zero operational downtime." },
  { title: "Documented Finish", body: "Observable, supportable results: pleat alignment memory, rich pile restoration, and breathable stain protection." },
  { title: "Approved Testimonials", body: "Verified client feedback published under POPIA-compliant identity protocols." },
];

export default async function Results() {
  const caseStudies = await getPublishedCaseStudies();

  return (
    <>
      <Hero
        eyebrow="Proven Craftsmanship · Verified Case Studies"
        title="Real Project Evidence. Documented Clearly."
        body="Explore how JHB Curtain Cleaning delivers specialist on-site textile restoration for luxury private residences, boutique hotels, and corporate executive suites across Johannesburg — with zero fabric shrinkage and zero room downtime."
      />

      {caseStudies.length > 0 && (
        <section className="section" style={{ background: "#141414", color: "#f3f4f6" }}>
          <div className="shell">
            <div className="section-heading text-center" style={{ maxWidth: "780px", margin: "0 auto 48px" }}>
              <p className="eyebrow" style={{ color: "#d4af37" }}>Verified Case Studies</p>
              <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "2.5rem", color: "#ffffff", marginBottom: "16px" }}>
                Approved Project Records &amp; Outcomes
              </h2>
              <p style={{ color: "#9ca3af", fontSize: "1.05rem" }}>
                Every case study represents documented on-site work completed across Johannesburg’s premier residential estates and landmark hospitality suites.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "32px" }}>
              {caseStudies.map((study) => (
                <article
                  key={study.slug}
                  style={{
                    background: "#1c1c1c",
                    border: "1px solid rgba(212, 175, 55, 0.25)",
                    borderRadius: "14px",
                    padding: "36px 30px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #fdf6df, #d4af37, #9e7514)" }} />

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                      <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, color: "#d4af37", background: "rgba(212, 175, 55, 0.1)", padding: "4px 10px", borderRadius: "20px", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
                        {[study.propertyType, study.area].filter(Boolean).join(" · ")}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.45rem", color: "#ffffff", marginBottom: "16px", lineHeight: 1.3 }}>
                      {study.title}
                    </h3>

                    <div style={{ fontSize: "0.92rem", color: "#d1d5db", lineHeight: 1.6, marginBottom: "20px" }}>
                      <p style={{ marginBottom: "10px" }}>
                        <strong style={{ color: "#ffffff" }}>Service &amp; Textile:</strong> {study.service} {study.textile ? `— ${study.textile}` : ""}
                      </p>
                      <p style={{ marginBottom: "10px" }}>
                        <strong style={{ color: "#ffffff" }}>Initial Condition:</strong> {study.initialCondition}
                      </p>
                      <p style={{ marginBottom: "10px" }}>
                        <strong style={{ color: "#ffffff" }}>Assessment Decision:</strong> {study.assessment}
                      </p>
                      <p style={{ marginBottom: "10px" }}>
                        <strong style={{ color: "#ffffff" }}>Specialist Approach:</strong> {study.approach}
                      </p>
                      {study.operationalNotes && (
                        <p style={{ marginBottom: "10px" }}>
                          <strong style={{ color: "#ffffff" }}>Operational Execution:</strong> {study.operationalNotes}
                        </p>
                      )}
                      <p style={{ color: "#fdf6df", background: "rgba(253, 246, 223, 0.05)", padding: "12px", borderRadius: "8px", borderLeft: "3px solid #d4af37" }}>
                        <strong style={{ color: "#d4af37" }}>Documented Result:</strong> {study.outcome}
                      </p>
                      {study.limitations && (
                        <p style={{ marginTop: "8px", fontSize: "0.85rem", color: "#9ca3af" }}>
                          <em>Note: {study.limitations}</em>
                        </p>
                      )}
                    </div>
                  </div>

                  {study.testimonial?.publicationApproved && study.testimonial.quote && (
                    <blockquote style={{ margin: "20px 0 0", padding: "16px", background: "rgba(0,0,0,0.3)", borderRadius: "8px", borderLeft: "2px solid #d4af37", fontStyle: "italic", fontSize: "0.9rem", color: "#e5e7eb" }}>
                      <p style={{ margin: 0, marginBottom: "6px" }}>“{study.testimonial.quote}”</p>
                      {study.testimonial.attribution && (
                        <footer style={{ fontSize: "0.8rem", color: "#9ca3af", fontStyle: "normal", fontWeight: 600 }}>
                          — {study.testimonial.attribution}{study.testimonial.role ? `, ${study.testimonial.role}` : ""}
                        </footer>
                      )}
                    </blockquote>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case Study Evidence Standard */}
      <section className="section section-soft">
        <div className="shell content-grid">
          <article>
            <p className="eyebrow">Evidence Standard</p>
            <h2>A Useful Case Study Shows More Than Just a Photo.</h2>
            <p>
              For luxury curtains, delicate velvets, and commercial window installations, true craftsmanship requires transparent documentation: what was diagnosed, why an in-situ approach was chosen, how access was safely managed, and the precise observable outcome.
            </p>
            <p>
              This rigorous standard allows property managers, interior designers, and estate owners to accurately evaluate risk and schedule care with total peace of mind.
            </p>
          </article>
          <aside className="info-panel" style={{ background: "#1e1e1e", color: "#ffffff", border: "1px solid rgba(212, 175, 55, 0.3)", padding: "32px", borderRadius: "12px" }}>
            <h3 style={{ color: "#ffffff", fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.4rem" }}>Have a Similar Requirement?</h3>
            <p style={{ color: "#d1d5db", fontSize: "0.95rem" }}>
              Stephen personally inspects your curtains, linings, drop heights, and track hardware before confirming a detailed written quotation.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px" }}>
              <Link className="button button-primary" href="/quote" style={{ textAlign: "center" }}>
                Book Residential Assessment →
              </Link>
              <Link className="button button-secondary" href="/commercial-assessment" style={{ textAlign: "center" }}>
                Request Commercial Site Visit →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Evidence Pillars */}
      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">Our Assessment Pillars</p>
            <h2>What Every Published Project Record Contains.</h2>
          </div>
          <div className="feature-grid">
            {evidenceFields.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
