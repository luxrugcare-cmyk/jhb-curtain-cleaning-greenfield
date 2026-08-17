import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CTASection } from "@/components/CTASection";
import { siteConfig } from "@/lib/site-config";
import { whatsappLink } from "@/integrations/whatsapp/link";
import { TrackedContactLink } from "@/components/analytics/TrackedContactLink";

export const metadata: Metadata = {
  title: "Contact JHB Curtain Cleaning | Direct Numbers & Assessment Booking",
  description:
    "Contact JHB Curtain Cleaning. Call Kathy directly on 071 622 6753, the main line on +27 75 011 9200, or book a free on-site evaluation via WhatsApp.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <Hero
        eyebrow="Contact & Booking"
        title="Direct contact. Free on-site assessment."
        body="Whether you need a quick quote from photos, a comprehensive on-site visit from Kathy, or a commercial facilities evaluation, choose the fastest route below."
        imageSrc="/brand/stitch/curtain-cleaning-hero.png"
        imageAlt="Contact JHB Curtain Cleaning Johannesburg"
        cardTitle="Kathy Visits Within 48 Hours"
        cardSubtitle="Free · No Obligation Assessment"
      />

      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">Direct Contact Numbers</p>
            <h2>Speak to our team immediately.</h2>
            <p>
              We provide fast phone consultations, photo quotes via WhatsApp, and on-site assessments across Johannesburg and surrounds.
            </p>
          </div>

          <div className="factors-grid">
            <article className="factor-card">
              <span className="factor-icon" role="img" aria-label="Main Phone">📞</span>
              <h3>Main Office Line</h3>
              <p>For general enquiries, quotes, and area scheduling.</p>
              <p>
                <TrackedContactLink
                  event="call_click"
                  placement="contact_page"
                  className="card-link"
                  href={`tel:${siteConfig.phoneE164}`}
                >
                  {siteConfig.phoneDisplay} →
                </TrackedContactLink>
              </p>
            </article>

            <article className="factor-card">
              <span className="factor-icon" role="img" aria-label="Kathy Direct">👩‍💼</span>
              <h3>Kathy (Evaluations)</h3>
              <p>Direct contact for on-site assessment booking and fabric advice.</p>
              <p>
                <TrackedContactLink
                  event="call_click"
                  placement="contact_kathy"
                  className="card-link"
                  href={`tel:${siteConfig.kathyPhoneE164}`}
                >
                  {siteConfig.kathyPhoneDisplay} →
                </TrackedContactLink>
              </p>
            </article>

            <article className="factor-card">
              <span className="factor-icon" role="img" aria-label="Office Support">🏢</span>
              <h3>Operations &amp; Billing</h3>
              <p>For accounts, supplier queries, and commercial procurement.</p>
              <p>
                <TrackedContactLink
                  event="call_click"
                  placement="contact_office"
                  className="card-link"
                  href={`tel:${siteConfig.officePhoneE164}`}
                >
                  {siteConfig.officePhoneDisplay} →
                </TrackedContactLink>
              </p>
            </article>

            <article className="factor-card">
              <span className="factor-icon" role="img" aria-label="WhatsApp Instant">💬</span>
              <h3>WhatsApp Chat</h3>
              <p>Send photos of your curtains or drapes for a rapid estimate.</p>
              <p>
                <TrackedContactLink
                  event="whatsapp_click"
                  placement="contact_page"
                  className="card-link"
                  href={whatsappLink("Hi, I'd like to send photos of my curtains for a quote.")}
                >
                  Chat on WhatsApp →
                </TrackedContactLink>
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section surface">
        <div className="shell content-grid">
          <article>
            <p className="eyebrow">Digital Assessment Options</p>
            <h2>Structured Online Enquiries</h2>
            <p>
              If you prefer to submit your room counts, textile details, and photos online, use our dedicated wizards:
            </p>
            <div className="button-row">
              <Link className="button button-primary" href="/quote">
                Residential Quote Wizard
              </Link>
              <Link className="button button-secondary" href="/commercial-assessment">
                Commercial Site Assessment
              </Link>
            </div>
            <p style={{ marginTop: "24px" }}>
              <Link href="/advice/curtain-cleaning-prices">
                Read: Why We Don&apos;t Publish Prices Online →
              </Link>
            </p>
          </article>

          <aside className="sticky-panel">
            <p className="eyebrow">Operating Hours</p>
            <h3>Service Availability</h3>
            <ul className="check-list" style={{ marginTop: "12px" }}>
              <li><strong>Mon – Fri:</strong> 07:30 – 17:30</li>
              <li><strong>Saturday:</strong> 08:00 – 14:00</li>
              <li><strong>Sunday &amp; After Hours:</strong> Commercial &amp; by appointment</li>
            </ul>
            <p style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "12px" }}>
              Coverage: Sandton, Randburg, Fourways, Roodepoort, Rosebank, Midrand, Pretoria &amp; greater Gauteng.
            </p>
          </aside>
        </div>
      </section>

      <CTASection />
    </>
  );
}
