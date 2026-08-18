import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Master Systems Operations Manual (Presentation Deck) | JHB Curtain Cleaning",
  description: "Executive Operations Manual and Onboarding Slide Deck for JHB Curtain Cleaning.",
  robots: { index: false, follow: false },
};

export default function MasterOperationsDeckPage() {
  const slides = [
    {
      num: 1,
      title: "JHB CURTAIN CLEANING",
      subtitle: "Master Systems Operations & Onboarding Manual",
      badge: "PLATFORM RELEASE v0.5.0 ENTERPRISE",
      desc: "Complete Architecture, Autonomous Outreach, Meta & WhatsApp Cloud API, Attio CRM, and Daily SOPs.",
      meta: "Lead Operator: Stephen (+27 75 011 9200) · jhbcurtaincleaning.co.za",
    },
    {
      num: 2,
      title: "System Architecture & 4-Tier Data Pipeline",
      subtitle: "Full-Stack Data Flow & Resilience",
      badge: "CORE ENGINE",
      items: [
        "1. Inbound Channels: Web Portal (48 routes), Meta CTWA Ads, WhatsApp direct line, B2B cold outreach (800 leads).",
        "2. Ingestion Engine: /api/leads, /api/webhooks/whatsapp, Vercel Blob (3 photo attachments), multi-tier fallback archive.",
        "3. Core Operations: Attio CRM (1,705 clean contacts), AgentMail (stephen-1015@agentmail.to), Meta CAPI (SHA-256), Sanity Studio.",
        "4. Automated Responses: Residential Welcome, Commercial Protocol, 10% Trade Partner Kit, 5-Star Review Solicitations.",
      ],
    },
    {
      num: 3,
      title: "Lead Capture & Ingestion Engine",
      subtitle: "3 Dedicated Customer Intake Portals",
      badge: "CONVERSION HUBS",
      items: [
        "Residential Wizard (/quote): Fabric & room selector, photo uploader, 'Do Not Take Down' zero shrinkage notice.",
        "Commercial Assessment (/commercial-assessment): Hotel/corporate intake, room count, SANS 1423 Fire Retardancy summary.",
        "10% Trade Partner Hub (/trade): Interior Decorator portal with passive revenue calculator and unique Studio Referral Codes.",
        "Multi-Channel Lead Resilience: Attio CRM + AgentMail + Meta CAPI + Private fallback archive (0% lead loss).",
      ],
    },
    {
      num: 4,
      title: "Autonomous B2B Email Outreach Engine",
      subtitle: "3-Touch Cold-to-Warm Multi-Sequence",
      badge: "B2B PIPELINE",
      items: [
        "Touch 1 (Day 1): Plain-Text-First peer question from Stephen (0 tracking pixels, 99%+ inbox deliverability).",
        "Touch 2 (Day 4): High-Visual Google Stitch metallic MJML HTML proof card with The Leonardo Sandton case study.",
        "Touch 3 (Day 8): Short, graceful breakup note leaving door open for Highveld winter dust storm season.",
        "Anti-Spam Audit: 19/19 email templates pass 100/100 POPIA and spam deliverability rules.",
      ],
    },
    {
      num: 5,
      title: "Meta Ads & WhatsApp Business Cloud API",
      subtitle: "Conversational Commerce & Ad Tracking",
      badge: "META INTEGRATION",
      items: [
        "WhatsApp Webhook (/api/webhooks/whatsapp): Callback URL & verify token (jhb_curtain_cleaning_meta_2026).",
        "3-Button Interactive Menu: Instant auto-responder for Residential Clean, Commercial/Hotel, or 10% Trade Partner.",
        "Meta Conversions API (CAPI): Server-side event tracking with SHA-256 data hashing for Facebook & Instagram Ads.",
        "Verified Meta IDs: Business ID 1164022258518231 · Page Asset ID 867076983156221 · Instagram @curtaincleaningjhb.",
      ],
    },
    {
      num: 6,
      title: "Stephen's Daily Operational SOP",
      subtitle: "Time-Blocked Execution Routine",
      badge: "OPERATIONAL SOP",
      items: [
        "07:30 AM ── Check AgentMail Ops Inbox (stephen-1015@agentmail.to) for overnight quote requests & photo uploads.",
        "08:00 AM ── WhatsApp Assessment Confirmations (+27 75 011 9200) with scheduled residential clients.",
        "09:00 AM ── Launch Daily B2B Outreach Batch: python scripts/b2b_multi_sequence_dispatcher.py --segment hotel",
        "04:00 PM ── Generate Commercial Proposals for day's site inspections: python scripts/generate_commercial_proposal.py",
        "05:30 PM ── Trigger 5-Star Google Review Solicitations for completed jobs (https://g.page/r/CbZEjFiE3HjZEBM/review).",
      ],
    },
    {
      num: 7,
      title: "Terminal Maintenance & Execution Commands",
      subtitle: "Platform Health & Test Commands",
      badge: "MAINTENANCE",
      items: [
        "Run Full Test Suite (6 Suites): npm run test:all",
        "Test Lifecycle Automation Triggers: npm run test:triggers",
        "Test Meta CAPI & WhatsApp Webhook: npm run test:meta",
        "Crawl & Verify All 48 Routes: npm run test:crawl",
        "Audit Email Spam Deliverability: python scripts/audit_spam_score.py",
        "Generate Commercial PDF Proposal: python scripts/generate_commercial_proposal.py",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-neutral-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header with Download Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 mb-10 border-b border-[#c99c2d]/30 gap-6">
          <div>
            <div className="text-xs uppercase font-bold tracking-widest text-[#c99c2d] mb-1">
              JHB Curtain Cleaning · Internal Operations
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-serif">
              Master Operations Manual
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              Executive Onboarding &amp; Systems Presentation Slide Deck
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/downloads/JHB_Curtain_Cleaning_Master_Operations_Manual.pptx"
              download
              className="inline-flex items-center gap-2 bg-[#c99c2d] hover:bg-[#e2be58] text-[#121212] font-bold px-5 py-3 rounded-lg shadow-lg transition-all duration-200 text-sm"
            >
              <span>📥</span> Download PowerPoint (.pptx)
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#252525] text-neutral-300 border border-neutral-700 px-4 py-3 rounded-lg text-sm"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Slide Deck Grid */}
        <div className="space-y-8">
          {slides.map((s) => (
            <div
              key={s.num}
              className="bg-[#141414] border border-[#c99c2d]/40 rounded-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block bg-[#c99c2d]/20 text-[#e2be58] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                    {s.badge} · SLIDE {s.num} OF 7
                  </span>
                  <h2 className="text-2xl font-bold text-white font-serif">{s.title}</h2>
                  <p className="text-sm text-[#c99c2d] font-medium">{s.subtitle}</p>
                </div>
              </div>

              {s.desc && <p className="text-neutral-300 text-sm mb-3">{s.desc}</p>}
              {s.meta && <p className="text-xs text-neutral-400 font-mono mb-4">{s.meta}</p>}

              {s.items && (
                <ul className="space-y-2.5 mt-4">
                  {s.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                      <span className="text-[#c99c2d] font-bold mt-0.5">▪</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 pt-8 border-t border-neutral-800">
          <p className="text-neutral-400 text-sm mb-4">
            Need a printed copy or customized executive presentation?
          </p>
          <a
            href="/downloads/JHB_Curtain_Cleaning_Master_Operations_Manual.pptx"
            download
            className="inline-flex items-center gap-2 bg-[#c99c2d] hover:bg-[#e2be58] text-[#121212] font-bold px-6 py-3.5 rounded-lg shadow-lg text-base"
          >
            <span>📥</span> Download Master Operations PowerPoint Presentation (.pptx)
          </a>
        </div>
      </div>
    </main>
  );
}
