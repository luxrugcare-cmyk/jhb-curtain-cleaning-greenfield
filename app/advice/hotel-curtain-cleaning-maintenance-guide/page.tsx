import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";

const path = "/advice/hotel-curtain-cleaning-maintenance-guide";
const title = "Hotel Curtain Cleaning & Maintenance Guide | Hospitality Textile Care";
const description = "The ultimate guide for Hotel General Managers and Executive Housekeepers: how to maintain in-room curtain hygiene, preserve flame retardancy, and eliminate room downtime with on-site cleaning.";
const published = "2026-08-18";

export const metadata: Metadata = { title, description, alternates: { canonical: path } };

export default function HotelCurtainMaintenanceGuide() {
  return (
    <>
      <JsonLd data={articleJsonLd({ headline: title, description, path, datePublished: published })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Advice", path: "/advice" }, { name: "Hotel Curtain Care Guide", path }])} />

      <Hero
        eyebrow="Commercial Hospitality Guide"
        title="The Hotel General Manager's Guide to In-Room Curtain Hygiene &amp; Rapid Turnover"
        body="For luxury hotels, boutique lodges, and executive serviced apartments across Johannesburg, guest-room curtains are high-touch textile assets. Learn how to maintain pristine cleanliness and compliance without closing rooms or sacrificing RevPAR."
      />

      {/* Section 1: The Economics of Hotel Curtain Care */}
      <section className="section">
        <div className="shell content-grid">
          <article>
            <p className="eyebrow">The Revenue Impact</p>
            <h2>The Hidden Cost of Conventional Off-Site Dry Cleaning</h2>
            <p>
              For hotel general managers, the primary obstacle to regular curtain cleaning is not the cleaning cost itself — it is <strong>room inventory downtime</strong>.
            </p>
            <p>
              When curtains are unhooked and sent to an off-site laundry or industrial dry cleaner:
            </p>
            <ul style={{ paddingLeft: "20px", lineHeight: "1.7", color: "#374151" }}>
              <li>Rooms are taken out of order (OOO) for <strong>4 to 6 days</strong>.</li>
              <li>At an average daily rate (ADR) of R1,800 to R3,500 per room, a 20-room wing closure costs R140,000+ in lost room revenue.</li>
              <li>Housekeeping incurs substantial labor costs unhooking, labeling, sorting, and re-hanging hundreds of meters of heavy drapery.</li>
              <li>Motorized tracks, ceiling pelmets, and fragile heading tapes risk mechanical damage during hasty removal.</li>
            </ul>

            <div style={{ background: "#f0fdf4", borderLeft: "4px solid #16a34a", padding: "20px", borderRadius: "0 8px 8px 0", margin: "24px 0" }}>
              <strong style={{ color: "#166534", fontSize: "1.05rem" }}>The On-Site In-Situ Advantage: Same-Day Turnover</strong>
              <p style={{ margin: "8px 0 0", fontSize: "0.95rem", color: "#15803d" }}>
                With specialist on-site cleaning, drapes and blackout linings are cleaned in place on their existing tracks between <strong>10:00 (checkout) and 14:00</strong>. Rooms are fully sanitized, fresh-smelling, and returned to the front desk inventory for 15:00 guest check-ins on the exact same day.
              </p>
            </div>
          </article>

          <aside className="sticky-panel">
            <p className="eyebrow">Hospitality Assessment</p>
            <h3>Schedule a sample room assessment for your property.</h3>
            <p>
              Stephen visits your hotel to inspect track hardware, review room counts, and clean a trial suite with zero obligation.
            </p>
            <Link className="button button-primary" href="/commercial-assessment">
              Request Commercial Assessment →
            </Link>
            <Link className="button button-secondary" href="/commercial/hotels-hospitality">
              Hotels &amp; Hospitality Hub →
            </Link>
          </aside>
        </div>
      </section>

      {/* Section 2: Housekeeping Best Practice SOPs */}
      <section className="section section-soft">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">Operational Execution</p>
            <h2>4-Step Housekeeping Alignment Protocol</h2>
          </div>
          <div className="feature-grid">
            <article>
              <h3 style={{ color: "#c99c2d" }}>1. Floor-by-Floor Block Scheduling</h3>
              <p>Curtain maintenance is phased in 6-to-10 room clusters per day based on real-time PMS occupancy forecasts, ensuring low-occupancy wings are completed first.</p>
            </article>

            <article>
              <h3 style={{ color: "#c99c2d" }}>2. Allergen &amp; Odour Extraction</h3>
              <p>High-frequency guest turnover introduces perfume residues, smoke, food odours, and dust mites. Low-moisture sanitization neutralizes odours at the fiber core.</p>
            </article>

            <article>
              <h3 style={{ color: "#c99c2d" }}>3. SANS 1423 / Fire Compliance</h3>
              <p>Specialist cleaning agents are strictly pH-balanced and formulated to ensure existing flame-retardant fabric treatments are preserved without degradation.</p>
            </article>

            <article>
              <h3 style={{ color: "#c99c2d" }}>4. Line-Item Maintenance Records</h3>
              <p>Facilities directors receive comprehensive room-by-room completion certificates for internal quality audits and brand standard compliance.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Section 3: Guest Review & Air Quality Impact */}
      <section className="section">
        <div className="shell content-grid">
          <article>
            <p className="eyebrow">Guest Experience &amp; Ratings</p>
            <h2>How Clean Window Fabrics Protect Guest Review Scores</h2>
            <p>
              In luxury hospitality (Sandton, Rosebank, Melrose Arch, and Pretoria), discerning international travelers notice subtle sensory details.
            </p>
            <p>
              When drapes are neglected, stale dust is released into the room every time a guest opens the curtains to enjoy a morning view. By integrating scheduled in-place textile hygiene, hotels consistently maintain high TripAdvisor and Google Review scores for room cleanliness, air quality, and attention to detail.
            </p>
          </article>

          <article>
            <p className="eyebrow">Related Resources</p>
            <h2>Explore Commercial Solutions</h2>
            <p><Link href="/commercial/hotels-hospitality">Hotels &amp; Hospitality Textile Services →</Link></p>
            <p><Link href="/results">Read verified case studies (The Leonardo &amp; The Maslow) →</Link></p>
            <p><Link href="/commercial/offices-corporate">Corporate &amp; Executive Office Care →</Link></p>
            <p><Link href="/commercial-assessment">Book a Site Evaluation with Stephen →</Link></p>
          </article>
        </div>
      </section>

      <CTASection />
    </>
  );
}
