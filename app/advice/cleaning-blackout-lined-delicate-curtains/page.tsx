import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";

const path = "/advice/cleaning-blackout-lined-delicate-curtains";
const title = "How to Clean Blackout, Lined & Velvet Curtains Safely | Expert Guide";
const description = "Learn how to clean blackout lined curtains, thermal coated drapes, silk interlinings, and delicate velvet fabrics safely without shrinkage, coating peeling, or pile damage.";
const published = "2026-08-18";

export const metadata: Metadata = { title, description, alternates: { canonical: path } };

export default function BlackoutDelicateCurtainsGuide() {
  return (
    <>
      <JsonLd data={articleJsonLd({ headline: title, description, path, datePublished: published })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Advice", path: "/advice" }, { name: "Blackout & Delicate Curtains", path }])} />

      <Hero
        eyebrow="Specialist Fabric Care Guide"
        title="How to Clean Blackout, Lined &amp; Delicate Velvet Curtains Safely"
        body="Complex window treatments — from rubberized blackout backings to multi-layer interlined silks and plush velvets — carry severe risks of irreversible damage under standard dry cleaning or washing. Discover why in-situ specialist care is the safest pathway."
      />

      {/* Section 1: The Anatomy of Complex Drapery */}
      <section className="section">
        <div className="shell content-grid">
          <article>
            <p className="eyebrow">Understanding Complex Textiles</p>
            <h2>Why One Method Cannot Treat Every High-End Curtain</h2>
            <p>
              High-end curtains are rarely single-layer fabrics. In luxury Johannesburg homes (from Sandhurst and Hyde Park to Waterfall and Dainfern), drapery is commonly engineered with multiple bonded layers, delicate thermal coatings, or sensitive animal/plant fibers.
            </p>
            <p>
              Treating these curtains with conventional high-heat immersion, industrial washing machines, or harsh chemical dry-cleaning solvents frequently leads to catastrophic textile failure:
            </p>

            <div style={{ background: "#fef2f2", borderLeft: "4px solid #ef4444", padding: "20px", borderRadius: "0 8px 8px 0", margin: "24px 0" }}>
              <strong style={{ color: "#991b1b", fontSize: "1.05rem" }}>Common Failures from Incorrect Cleaning:</strong>
              <ul style={{ margin: "10px 0 0", paddingLeft: "20px", fontSize: "0.92rem", color: "#7f1d1d", lineHeight: "1.6" }}>
                <li><strong>Blackout Coating Melting / Peeling:</strong> Solvents dissolving the acrylic foam backing, leaving holes that leak light.</li>
                <li><strong>Unequal Differential Shrinkage:</strong> Face fabric, wool bump interlining, and cotton lining shrinking at different rates, producing buckled, wavy hems.</li>
                <li><strong>Velvet Pile Bruising:</strong> Water immersion crushing the upright velvet fibers, resulting in permanent water marks.</li>
                <li><strong>Heading Distortion:</strong> Buckram tape and pleat hooks warping under mechanical tumbler agitation.</li>
              </ul>
            </div>
          </article>

          <aside className="sticky-panel">
            <p className="eyebrow">Delicate Fabric Assessment</p>
            <h3>Get an expert assessment before cleaning high-value drapery.</h3>
            <p>
              Stephen inspects fabric composition, lining condition, and dye stability to prescribe the safest non-destructive method.
            </p>
            <Link className="button button-primary" href="/quote">
              Book Assessment with Stephen →
            </Link>
            <Link className="button button-secondary" href="/services/curtain-cleaning">
              Explore Curtain Cleaning Service →
            </Link>
          </aside>
        </div>
      </section>

      {/* Section 2: Specific Fabric Breakdown */}
      <section className="section section-soft">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">Fabric-by-Fabric Guidance</p>
            <h2>Safe Cleaning Protocols for Specialist Window Treatments</h2>
          </div>
          <div className="feature-grid">
            <article>
              <h3 style={{ color: "#c99c2d" }}>1. Blackout &amp; Thermal Coated Curtains</h3>
              <p><strong>The Risk:</strong> The rubberized acrylic backing degrades with heat and chemical solvents.</p>
              <p><strong>Safe Solution:</strong> Clean the room-facing fabric side with low-moisture micro-extraction while curtains remain hanging. Never submerge or tumble dry.</p>
            </article>

            <article>
              <h3 style={{ color: "#c99c2d" }}>2. Luxury Velvet &amp; Velour Drapes</h3>
              <p><strong>The Risk:</strong> Water crushes the upright pile and causes permanent optical marks (&ldquo;bruising&rdquo;).</p>
              <p><strong>Safe Solution:</strong> Dry-side extraction followed by specialist velvet pile grooming in the direction of the grain to restore deep lustre and soft hand feel.</p>
            </article>

            <article>
              <h3 style={{ color: "#c99c2d" }}>3. Interlined &amp; Silk Curtains</h3>
              <p><strong>The Risk:</strong> Raw silk and wool bump interlinings shrink dramatically when wet, ruining the drape drop.</p>
              <p><strong>Safe Solution:</strong> Non-aqueous extraction and targeted spot treatment in-situ to preserve delicate silk threads and exact drop measurements.</p>
            </article>

            <article>
              <h3 style={{ color: "#c99c2d" }}>4. Sheer Voiles &amp; Linen Linings</h3>
              <p><strong>The Risk:</strong> Extreme UV brittleness causing threads to tear when handled or removed.</p>
              <p><strong>Safe Solution:</strong> Gentle vacuum-assisted dust extraction and pH-neutral fabric conditioning that removes grey grime without mechanical stress.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Section 3: Why On-Site Hanging Treatment Wins */}
      <section className="section">
        <div className="shell content-grid">
          <article>
            <p className="eyebrow">The On-Site Advantage</p>
            <h2>Why Hanging In-Situ Is the Gold Standard for Delicate Drapes</h2>
            <p>
              When high-value drapery is cleaned in place:
            </p>
            <ol style={{ paddingLeft: "20px", lineHeight: "1.8", color: "#374151" }}>
              <li><strong>Zero Handling Strain:</strong> No unhooking, folding, creasing, transport bags, or re-hanging scaffolding required.</li>
              <li><strong>Natural Gravity Tension:</strong> Curtains dry naturally under their own weight on the track, preventing shrinkage or uneven hem distortion.</li>
              <li><strong>Preserved Pleat Memory:</strong> Double pinch, French pleats, and wave folds maintain their crisp architectural form.</li>
              <li><strong>Immediate Inspection:</strong> You and the technician inspect the finished drape under natural room lighting immediately upon completion.</li>
            </ol>
          </article>

          <article>
            <p className="eyebrow">Related Resources</p>
            <h2>More Advice for Complex Window Treatments</h2>
            <p><Link href="/advice/how-often-should-curtains-be-cleaned">How often should curtains be cleaned in Johannesburg? →</Link></p>
            <p><Link href="/advice/can-curtains-be-cleaned-without-taking-them-down">Can curtains be cleaned without taking them down? →</Link></p>
            <p><Link href="/advice/curtain-cleaning-vs-washing-vs-dry-cleaning">Curtain cleaning vs washing vs dry cleaning →</Link></p>
            <p><Link href="/results">View verified case studies &amp; results →</Link></p>
          </article>
        </div>
      </section>

      <CTASection />
    </>
  );
}
