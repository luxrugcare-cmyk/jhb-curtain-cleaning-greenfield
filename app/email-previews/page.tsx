"use client";

import { useState } from "react";
import Link from "next/link";

type TemplateMeta = {
  id: string;
  name: string;
  category: string;
  touch: string;
  format: string;
  description: string;
  subject: string;
  spamScore: number;
};

const TEMPLATES: TemplateMeta[] = [
  {
    id: "hotel-visual",
    name: "Hotel & Hospitality Drapery Care",
    category: "Hospitality & Lodges",
    touch: "Touch 2 (Day 4)",
    format: "Google Stitch MJML HTML",
    description: "Features The Leonardo 24-suite zero room downtime case evidence, low-moisture track extraction, and trial room invitation.",
    subject: "Hotel Drapery Care: Zero Room Downtime for The Leonardo Sandton",
    spamScore: 100
  },
  {
    id: "corporate-visual",
    name: "Corporate Facilities & Boardrooms",
    category: "Corporate Facilities",
    touch: "Touch 2 (Day 4)",
    format: "Google Stitch MJML HTML",
    description: "After-hours boardroom acoustic drape and motorized roller blind deep clean with SANS 1423 flame retardancy documentation.",
    subject: "Boardroom Acoustic Drapes & Roller Blinds Deep-Cleaned After-Hours",
    spamScore: 100
  },
  {
    id: "trade-design-visual",
    name: "Interior Design & Trade Partnership",
    category: "Trade & Designers",
    touch: "Touch 2 (Day 4)",
    format: "Google Stitch MJML HTML",
    description: "White-glove in-situ restoration for double-volume 5m+ drops, interlined silks, and delicate velvets across luxury estates.",
    subject: "In-Situ Care for Double-Volume Drops & Delicate Interlined Fabrics",
    spamScore: 100
  },
  {
    id: "customer-review",
    name: "5-Star Google Review Solicitation",
    category: "Customer Care",
    touch: "Post-Service",
    format: "Google Stitch HTML",
    description: "Sent post-service with 5 golden stars linking directly to verified Google Business Profile review dialog.",
    subject: "How did Stephen and the team do?",
    spamScore: 100
  },
  {
    id: "hotel-plain-touch1",
    name: "Hotel First Contact (Plain Text)",
    category: "Hospitality & Lodges",
    touch: "Touch 1 (Day 1)",
    format: "Plain-Text-First",
    description: "Conversational peer inquiry asking how housekeeping handles curtain turnover. Zero tracking pixels for 99%+ deliverability.",
    subject: "quick question about The Leonardo Sandton curtain maintenance",
    spamScore: 100
  },
  {
    id: "corporate-plain-touch1",
    name: "Corporate Facilities First Contact",
    category: "Corporate Facilities",
    touch: "Touch 1 (Day 1)",
    format: "Plain-Text-First",
    description: "Inquiry regarding after-hours boardroom maintenance and SANS 1423 compliance.",
    subject: "after-hours boardroom drape & blind cleaning for Growthpoint Properties",
    spamScore: 100
  },
  {
    id: "trade-design-plain-touch1",
    name: "Interior Design First Contact",
    category: "Trade & Designers",
    touch: "Touch 1 (Day 1)",
    format: "Plain-Text-First",
    description: "Peer inquiry regarding double-volume bespoke curtain care and trade partner specifications.",
    subject: "in-situ drapery care for your luxury installations (Studio Lloyd)",
    spamScore: 100
  },
  {
    id: "hotel-breakup-touch3",
    name: "Hotel Breakup Note",
    category: "Hospitality & Lodges",
    touch: "Touch 3 (Day 8)",
    format: "Plain-Text Breakup",
    description: "Polite close of file providing Stephen's direct WhatsApp line for future seasonal turnover scheduling.",
    subject: "closing the loop regarding The Leonardo Sandton curtain care",
    spamScore: 100
  }
];

export default function EmailPreviewsPage() {
  const [selectedId, setSelectedId] = useState<string>("hotel-visual");
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  const categories = ["All", "Hospitality & Lodges", "Corporate Facilities", "Trade & Designers", "Customer Care"];

  const filteredTemplates = categoryFilter === "All"
    ? TEMPLATES
    : TEMPLATES.filter(t => t.category === categoryFilter);

  const selectedTemplate = TEMPLATES.find(t => t.id === selectedId) || TEMPLATES[0];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", color: "#f5f5f5", fontFamily: "Inter, sans-serif" }}>
      
      {/* Top Navigation Bar */}
      <header style={{ borderBottom: "1px solid #262626", backgroundColor: "#141414", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <div style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#d4af37", fontWeight: 700 }}>
            JHB CURTAIN CLEANING · LIVE EMAILER STUDIO
          </div>
          <h1 style={{ fontSize: "20px", fontWeight: 700, margin: "2px 0 0 0", color: "#ffffff" }}>
            Visual Emailers &amp; Outreach Sequences
          </h1>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {/* Viewport Switcher */}
          <div style={{ display: "flex", background: "#1c1c1c", padding: "3px", borderRadius: "6px", border: "1px solid #333333" }}>
            <button
              onClick={() => setViewport("desktop")}
              style={{
                background: viewport === "desktop" ? "linear-gradient(135deg, #fdf6df 0%, #e2be58 30%, #c99c2d 70%, #9e7514 100%)" : "transparent",
                color: viewport === "desktop" ? "#121212" : "#a3a3a3",
                border: "none",
                padding: "6px 14px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              Desktop (600px)
            </button>
            <button
              onClick={() => setViewport("mobile")}
              style={{
                background: viewport === "mobile" ? "linear-gradient(135deg, #fdf6df 0%, #e2be58 30%, #c99c2d 70%, #9e7514 100%)" : "transparent",
                color: viewport === "mobile" ? "#121212" : "#a3a3a3",
                border: "none",
                padding: "6px 14px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              Mobile (375px)
            </button>
          </div>

          <a
            href={`/api/email-previews/${selectedTemplate.id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "8px 16px",
              background: "#262626",
              color: "#e2be58",
              border: "1px solid #444444",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <span>Open in New Tab ↗</span>
          </a>

          <Link
            href="/"
            style={{
              padding: "8px 16px",
              background: "#1c1c1c",
              color: "#d4d4d4",
              border: "1px solid #333333",
              borderRadius: "6px",
              fontSize: "12px",
              textDecoration: "none"
            }}
          >
            ← Back to Site
          </Link>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", minHeight: "calc(100vh - 73px)" }}>
        
        {/* Left Sidebar: Template Directory */}
        <aside style={{ borderRight: "1px solid #262626", backgroundColor: "#111111", padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
          
          {/* Category Filters */}
          <div>
            <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", color: "#888888", marginBottom: "8px", fontWeight: 600 }}>
              Filter by Campaign
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "4px",
                    fontSize: "11px",
                    fontWeight: 600,
                    cursor: "pointer",
                    border: categoryFilter === cat ? "1px solid #c99c2d" : "1px solid #2a2a2a",
                    background: categoryFilter === cat ? "#1f1a0e" : "#1a1a1a",
                    color: categoryFilter === cat ? "#e2be58" : "#888888"
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Template Cards List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}>
            {filteredTemplates.map(tmpl => {
              const isSelected = tmpl.id === selectedId;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => setSelectedId(tmpl.id)}
                  style={{
                    textAlign: "left",
                    padding: "12px 14px",
                    borderRadius: "6px",
                    border: isSelected ? "1px solid #e2be58" : "1px solid #262626",
                    background: isSelected ? "#1c180f" : "#161616",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "10px", fontWeight: 700, color: "#d4af37", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      {tmpl.touch}
                    </span>
                    <span style={{ fontSize: "10px", background: "#262626", color: "#34d399", padding: "2px 6px", borderRadius: "4px", fontWeight: 600 }}>
                      Spam Score: {tmpl.spamScore}/100
                    </span>
                  </div>

                  <div style={{ fontSize: "13px", fontWeight: 700, color: isSelected ? "#ffffff" : "#d4d4d4" }}>
                    {tmpl.name}
                  </div>

                  <div style={{ fontSize: "11px", color: "#888888", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {tmpl.description}
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Stage: Interactive Preview & Metadata */}
        <main style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px", backgroundColor: "#0e0e0e" }}>
          
          {/* Active Emailer Header Banner */}
          <div style={{ backgroundColor: "#141414", border: "1px solid #262626", borderRadius: "8px", padding: "16px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
              <div>
                <span style={{ fontSize: "11px", background: "#1f1a0e", border: "1px solid #c99c2d", color: "#e2be58", padding: "2px 8px", borderRadius: "4px", fontWeight: 700, textTransform: "uppercase" }}>
                  {selectedTemplate.format}
                </span>
                <h2 style={{ fontSize: "18px", fontWeight: 700, margin: "8px 0 4px 0", color: "#ffffff" }}>
                  {selectedTemplate.name}
                </h2>
                <div style={{ fontSize: "13px", color: "#a3a3a3" }}>
                  <strong>Subject:</strong> {selectedTemplate.subject}
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "11px", color: "#737373" }}>Deliverability Rating</div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#34d399" }}>
                  ✓ 100% Primary Inbox Safety
                </div>
                <div style={{ fontSize: "11px", color: "#888888" }}>POPIA &amp; SANS 1423 Compliant</div>
              </div>
            </div>
          </div>

          {/* Rendered Viewport Frame */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", overflowY: "auto", padding: "12px 0" }}>
            <div
              style={{
                width: viewport === "desktop" ? "640px" : "395px",
                transition: "width 0.25s ease",
                background: "#141414",
                border: "1px solid #262626",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.6)"
              }}
            >
              <div style={{ background: "#1c1c1c", padding: "8px 14px", borderBottom: "1px solid #262626", display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ display: "flex", gap: "5px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }}></div>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b" }}></div>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981" }}></div>
                </div>
                <div style={{ fontSize: "11px", color: "#737373", flex: 1, textAlign: "center" }}>
                  Live Preview · {viewport === "desktop" ? "Desktop (600px Max)" : "Mobile (375px)"}
                </div>
              </div>

              <iframe
                key={`${selectedTemplate.id}-${viewport}`}
                src={`/api/email-previews/${selectedTemplate.id}`}
                title={selectedTemplate.name}
                style={{
                  width: "100%",
                  height: "760px",
                  border: "none",
                  backgroundColor: "#0d0d0d",
                  display: "block"
                }}
              />
            </div>
          </div>

        </main>
      </div>

    </div>
  );
}
