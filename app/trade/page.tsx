"use client";

import { useState } from "react";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CTASection } from "@/components/CTASection";

export default function TradePartnerPage() {
  const [referralCount, setReferralCount] = useState<number>(4);
  const [avgJobValue, setAvgJobValue] = useState<number>(8500);

  const monthlyEarnings = Math.round(referralCount * avgJobValue * 0.1);
  const annualEarnings = monthlyEarnings * 12;

  const [partnerName, setPartnerName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [businessType, setBusinessType] = useState("Interior Decorator");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "commercial",
          name: partnerName,
          organisation: companyName,
          mobile,
          email,
          sector: "Trade Partner Network (10% Referral)",
          scope: `Trade Partner Registration: ${businessType}. Mobile: ${mobile}, Email: ${email}`,
          location: "Gauteng"
        })
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  };

  return (
    <div style={{ backgroundColor: "var(--bg, #121212)", color: "var(--text, #f5f5f5)", minHeight: "100vh" }}>
      
      {/* Hero */}
      <Hero
        eyebrow="Trade Partner Network · Decorators &amp; Curtain Workrooms"
        title="Earn 10% recurring commission while protecting your custom drapery."
        body="Turn client maintenance questions into effortless passive revenue. We clean your bespoke curtains and double-volume installations on-site hanging on their tracks with zero fabric shrinkage and zero hardware liability."
        imageSrc="/brand/stitch/curtain-cleaning-hero.png"
        imageAlt="Specialist on-site curtain and textile care for luxury drapery workrooms and decorators"
        cardTitle="10% Trade Partner Program"
        cardSubtitle="Paid Within 48 Hours via Direct EFT"
      />

      {/* Interactive Referral Earnings Calculator */}
      <section className="section section-soft" style={{ borderTop: "1px solid #262626", borderBottom: "1px solid #262626" }}>
        <div className="shell">
          <div className="section-heading" style={{ textAlign: "center", marginBottom: "36px" }}>
            <p className="eyebrow">Passive Revenue Estimator</p>
            <h2>How much can your studio earn from client referrals?</h2>
            <p style={{ color: "#a3a3a3", maxWidth: "600px", margin: "8px auto 0 auto" }}>
              Every time your past or current clients need curtains, drapes, or blinds refreshed, earn 10% commission on every settled invoice.
            </p>
          </div>

          <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#181818", border: "1px solid #333333", borderRadius: "12px", padding: "32px", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "center" }}>
              
              {/* Sliders */}
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <label style={{ fontSize: "14px", fontWeight: 600, color: "#d4d4d4" }}>Client Referrals per Month:</label>
                    <span style={{ fontSize: "16px", fontWeight: 700, color: "#e2be58" }}>{referralCount} projects</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={referralCount}
                    onChange={(e) => setReferralCount(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "#c99c2d", cursor: "pointer" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#737373", marginTop: "4px" }}>
                    <span>1 Referral</span>
                    <span>10 Referrals</span>
                    <span>20 Referrals</span>
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <label style={{ fontSize: "14px", fontWeight: 600, color: "#d4d4d4" }}>Average Project Invoice Value:</label>
                    <span style={{ fontSize: "16px", fontWeight: 700, color: "#e2be58" }}>R{avgJobValue.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="3000"
                    max="25000"
                    step="500"
                    value={avgJobValue}
                    onChange={(e) => setAvgJobValue(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "#c99c2d", cursor: "pointer" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#737373", marginTop: "4px" }}>
                    <span>R3,000 (Standard)</span>
                    <span>R12,000 (Luxury)</span>
                    <span>R25,000+ (Estate/Hotel)</span>
                  </div>
                </div>
              </div>

              {/* Earnings Result Card */}
              <div style={{ backgroundColor: "#121212", border: "1px solid #c99c2d", borderRadius: "8px", padding: "28px", textAlign: "center" }}>
                <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1.5px", color: "#d4af37", fontWeight: 700 }}>
                  Estimated 10% Partner Payout
                </div>
                <div style={{ fontSize: "36px", fontWeight: 800, color: "#ffffff", margin: "12px 0 4px 0", fontFamily: "'Playfair Display', Georgia, serif" }}>
                  R{monthlyEarnings.toLocaleString()}
                  <span style={{ fontSize: "16px", color: "#a3a3a3", fontWeight: 400 }}> / month</span>
                </div>
                <div style={{ fontSize: "15px", color: "#34d399", fontWeight: 600, marginBottom: "16px" }}>
                  = R{annualEarnings.toLocaleString()} / year in passive revenue
                </div>
                <div style={{ fontSize: "12px", color: "#737373", lineHeight: 1.4 }}>
                  Paid automatically via direct EFT within 48 hours of client invoice settlement.
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3 Value Pillars for Workrooms & Decorators */}
      <section className="section">
        <div className="shell">
          <div className="section-heading" style={{ textAlign: "center", marginBottom: "40px" }}>
            <p className="eyebrow">Why Workshops &amp; Designers Partner With Us</p>
            <h2>Protect your reputation and eliminate fabric shrinkage liability.</h2>
          </div>

          <div className="feature-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            
            <article style={{ backgroundColor: "#181818", border: "1px solid #2a2a2a", borderRadius: "8px", padding: "24px" }}>
              <div style={{ fontSize: "24px", color: "#e2be58", marginBottom: "12px" }}>🛡️</div>
              <h3 style={{ fontSize: "18px", color: "#ffffff", marginBottom: "8px" }}>Zero Fabric Shrinkage Guarantee</h3>
              <p style={{ fontSize: "14px", color: "#a3a3a3", lineHeight: 1.6 }}>
                Our low-moisture in-situ dry extraction preserves delicate linen sheer hems, silk interlinings, and bespoke pleat memory with zero dimensional change.
              </p>
            </article>

            <article style={{ backgroundColor: "#181818", border: "1px solid #2a2a2a", borderRadius: "8px", padding: "24px" }}>
              <div style={{ fontSize: "24px", color: "#e2be58", marginBottom: "12px" }}>🏗️</div>
              <h3 style={{ fontSize: "18px", color: "#ffffff", marginBottom: "8px" }}>No Dismantling or Rehanging</h3>
              <p style={{ fontSize: "14px", color: "#a3a3a3", lineHeight: 1.6 }}>
                We clean double-volume drops up to 6.5m hanging in place using specialized mobile staging. No unhooking, no lost sliders, and no motor track stress.
              </p>
            </article>

            <article style={{ backgroundColor: "#181818", border: "1px solid #2a2a2a", borderRadius: "8px", padding: "24px" }}>
              <div style={{ fontSize: "24px", color: "#e2be58", marginBottom: "12px" }}>💳</div>
              <h3 style={{ fontSize: "18px", color: "#ffffff", marginBottom: "8px" }}>48-Hour EFT Payouts</h3>
              <p style={{ fontSize: "14px", color: "#a3a3a3", lineHeight: 1.6 }}>
                We track all referrals with dedicated studio partner codes in Attio CRM. Once the client settles their invoice, your 10% commission is paid within 48 hours.
              </p>
            </article>

          </div>
        </div>
      </section>

      {/* Partner Registration Form */}
      <section className="section section-soft" style={{ borderTop: "1px solid #262626" }}>
        <div className="shell">
          <div style={{ maxWidth: "650px", margin: "0 auto", backgroundColor: "#1a1a1a", border: "1px solid #333333", borderRadius: "12px", padding: "36px" }}>
            
            {submitted ? (
              <div style={{ textAlign: "center", padding: "24px 12px" }}>
                <div style={{ fontSize: "40px", color: "#34d399", marginBottom: "16px" }}>✓</div>
                <h3 style={{ fontSize: "22px", color: "#ffffff", marginBottom: "8px" }}>Trade Partner Application Received!</h3>
                <p style={{ color: "#d4d4d4", fontSize: "15px", lineHeight: 1.6, marginBottom: "24px" }}>
                  Thank you, {partnerName}. Stephen will contact you directly on {mobile} to issue your official Studio Partner Code and digital client care handover pack.
                </p>
                <a
                  href="https://wa.me/27750119200?text=Hi%20Stephen,%20I%20just%20registered%20as%20a%20Trade%20Partner%20for%20the%2010%%20referral%20program."
                  className="btn btn-primary"
                  style={{ display: "inline-block", background: "#c99c2d", color: "#121212", fontWeight: 700, padding: "12px 24px", borderRadius: "4px", textDecoration: "none" }}
                >
                  Connect on WhatsApp with Stephen
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div style={{ textAlign: "center", marginBottom: "12px" }}>
                  <p className="eyebrow" style={{ color: "#d4af37" }}>Join the Trade Network</p>
                  <h2 style={{ fontSize: "24px", margin: "4px 0 8px 0" }}>Register Your Studio / Workroom</h2>
                  <p style={{ fontSize: "14px", color: "#888888" }}>
                    Takes 30 seconds. Receive your unique partner referral code and digital handover cards.
                  </p>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#cccccc", marginBottom: "6px", fontWeight: 600 }}>Your Name</label>
                  <input
                    type="text"
                    required
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    placeholder="e.g. Claire Van Zyl"
                    style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #333333", backgroundColor: "#121212", color: "#ffffff", fontSize: "14px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#cccccc", marginBottom: "6px", fontWeight: 600 }}>Studio / Workshop Name</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Hyde Park Interiors & Drapery"
                    style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #333333", backgroundColor: "#121212", color: "#ffffff", fontSize: "14px" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", color: "#cccccc", marginBottom: "6px", fontWeight: 600 }}>Business Type</label>
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #333333", backgroundColor: "#121212", color: "#ffffff", fontSize: "14px" }}
                    >
                      <option>Interior Decorator</option>
                      <option>Interior Designer / Architect</option>
                      <option>Curtain Manufacturing Workroom</option>
                      <option>Fabric & Upholstery Studio</option>
                      <option>Estate Property Manager</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "13px", color: "#cccccc", marginBottom: "6px", fontWeight: 600 }}>WhatsApp / Mobile Number</label>
                    <input
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="e.g. +27 82 555 1234"
                      style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #333333", backgroundColor: "#121212", color: "#ffffff", fontSize: "14px" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#cccccc", marginBottom: "6px", fontWeight: 600 }}>Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. info@hydeparkinteriors.co.za"
                    style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #333333", backgroundColor: "#121212", color: "#ffffff", fontSize: "14px" }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: "linear-gradient(135deg, #fdf6df 0%, #e2be58 30%, #c99c2d 70%, #9e7514 100%)",
                    color: "#121212",
                    fontWeight: 700,
                    fontSize: "15px",
                    border: "none",
                    padding: "14px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginTop: "8px"
                  }}
                >
                  Register for 10% Trade Referral Program
                </button>

                <p style={{ textAlign: "center", fontSize: "11px", color: "#737373", margin: 0 }}>
                  POPIA compliant. No minimum referral volume required. Payouts via direct EFT.
                </p>
              </form>
            )}

          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />

    </div>
  );
}
