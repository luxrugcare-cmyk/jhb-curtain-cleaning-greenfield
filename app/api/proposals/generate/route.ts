import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

export interface ProposalRequest {
  clientName: string;
  companyName?: string;
  location: string;
  sector: string;
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
  discountPercentage?: number;
  validDays?: number;
  notes?: string;
}

export function renderProposalHtml(data: ProposalRequest, proposalId: string): string {
  const subtotal = data.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const discount = data.discountPercentage ? (subtotal * data.discountPercentage) / 100 : 0;
  const total = subtotal - discount;
  const dateStr = new Date().toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" });
  const validUntil = new Date(Date.now() + (data.validDays || 14) * 86400000).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Formal Quotation · ${data.companyName || data.clientName} · ${proposalId}</title>
  <style>
    @page { size: A4; margin: 20mm; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1a1a1a; background: #ffffff; margin: 0; padding: 24px; font-size: 13px; line-height: 1.5; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #c99c2d; padding-bottom: 16px; margin-bottom: 24px; }
    .logo-text { font-size: 22px; font-weight: 800; color: #0a0a0a; letter-spacing: 1px; font-family: 'Playfair Display', Georgia, serif; }
    .logo-sub { font-size: 10px; color: #9e7514; text-transform: uppercase; font-weight: 700; letter-spacing: 2px; }
    .doc-title { text-align: right; font-size: 18px; font-weight: 700; color: #0a0a0a; text-transform: uppercase; letter-spacing: 1px; }
    .doc-meta { text-align: right; font-size: 11px; color: #666666; margin-top: 4px; }
    .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; }
    .box { background: #fdfbf7; border: 1px solid #e8dec8; border-radius: 6px; padding: 14px; }
    .box h4 { margin: 0 0 8px 0; font-size: 12px; color: #9e7514; text-transform: uppercase; letter-spacing: 1px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px; }
    th { background: #141414; color: #ffffff; padding: 10px 12px; text-align: left; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
    td { padding: 10px 12px; border-bottom: 1px solid #e5e5e5; }
    .text-right { text-align: right; }
    .total-box { margin-left: auto; width: 280px; margin-bottom: 24px; }
    .total-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; }
    .total-highlight { border-top: 2px solid #0a0a0a; border-bottom: 2px solid #0a0a0a; font-size: 16px; font-weight: 800; color: #0a0a0a; padding: 8px 0; }
    .protocol-box { background: #f5f5f5; border-left: 4px solid #c99c2d; padding: 12px 16px; border-radius: 4px; margin-bottom: 24px; font-size: 12px; color: #444444; }
    .signature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 36px; padding-top: 20px; border-top: 1px solid #e5e5e5; }
    .sign-line { border-bottom: 1px dashed #888888; height: 36px; margin-top: 12px; }
    .print-btn { display: inline-block; background: #c99c2d; color: #121212; padding: 10px 20px; border-radius: 4px; font-weight: 700; text-decoration: none; cursor: pointer; border: none; font-size: 13px; margin-bottom: 16px; }
    @media print { .print-btn { display: none; } body { padding: 0; } }
  </style>
</head>
<body>
  <div style="text-align: right;">
    <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
  </div>

  <div class="header">
    <div>
      <div class="logo-text">JHB CURTAIN CLEANING</div>
      <div class="logo-sub">Specialist On-Site Textile Care &amp; Restoration</div>
      <div style="font-size: 11px; color: #666; margin-top: 6px;">
        Sandton &amp; Greater Johannesburg, South Africa<br/>
        Direct / WhatsApp: ${siteConfig.phoneDisplay} · ${siteConfig.email}
      </div>
    </div>
    <div>
      <div class="doc-title">Formal Quotation</div>
      <div class="doc-meta">
        <strong>Quote #:</strong> ${proposalId}<br/>
        <strong>Date:</strong> ${dateStr}<br/>
        <strong>Valid Until:</strong> ${validUntil}
      </div>
    </div>
  </div>

  <div class="details-grid">
    <div class="box">
      <h4>Client &amp; Site Details</h4>
      <strong>${data.companyName ? `${data.companyName}<br/>Attn: ` : ""}${data.clientName}</strong><br/>
      Location / Property: ${data.location}<br/>
      Sector: ${data.sector}
    </div>
    <div class="box">
      <h4>Execution Guarantee</h4>
      ✓ <strong>Zero Fabric Shrinkage:</strong> Cleaned hanging on tracks.<br/>
      ✓ <strong>SANS 1423 Compliant:</strong> Flame retardant safe.<br/>
      ✓ <strong>Zero Room Downtime:</strong> Rapid turnover extraction.
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 55%;">Scope Description</th>
        <th class="text-right" style="width: 15%;">Qty</th>
        <th class="text-right" style="width: 15%;">Unit Price</th>
        <th class="text-right" style="width: 15%;">Total (ZAR)</th>
      </tr>
    </thead>
    <tbody>
      ${data.items
        .map(
          (item) => `
        <tr>
          <td>
            <strong>${item.description}</strong><br/>
            <small style="color: #666;">In-situ low-moisture extraction, dust/soot removal, pleat realignment</small>
          </td>
          <td class="text-right">${item.quantity}</td>
          <td class="text-right">R${item.unitPrice.toLocaleString()}</td>
          <td class="text-right"><strong>R${(item.quantity * item.unitPrice).toLocaleString()}</strong></td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  </table>

  <div class="total-box">
    <div class="total-row">
      <span>Subtotal:</span>
      <span>R${subtotal.toLocaleString()}</span>
    </div>
    ${
      discount > 0
        ? `
    <div class="total-row" style="color: #16a34a;">
      <span>Special Discount (${data.discountPercentage}%):</span>
      <span>-R${discount.toLocaleString()}</span>
    </div>
    `
        : ""
    }
    <div class="total-row total-highlight">
      <span>Total Quotation:</span>
      <span>R${total.toLocaleString()}</span>
    </div>
  </div>

  <div class="protocol-box">
    <strong>Terms &amp; Operational Protocol:</strong><br/>
    • All work is performed on-site while hanging with zero fabric shrinkage and no hardware dismantling.<br/>
    • Payment terms: EFT upon completion or 30 days for approved commercial accounts.<br/>
    • To accept this quotation, please sign below or confirm via WhatsApp to Stephen (+27 75 011 9200).
  </div>

  <div class="signature-grid">
    <div>
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #666;">Issued by (JHB Curtain Cleaning):</div>
      <div class="sign-line"></div>
      <div style="font-size: 11px; margin-top: 4px;">Stephen · Textile Restoration Specialist</div>
    </div>
    <div>
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #666;">Accepted by Client:</div>
      <div class="sign-line"></div>
      <div style="font-size: 11px; margin-top: 4px;">Signature &amp; Date</div>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as ProposalRequest;
    const proposalId = `JHB-Q-${Date.now().toString().slice(-6)}`;
    const html = renderProposalHtml(data, proposalId);

    return new NextResponse(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Proposal Generation Error" }, { status: 500 });
  }
}
