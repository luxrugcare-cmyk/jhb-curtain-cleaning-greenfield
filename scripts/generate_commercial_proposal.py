#!/usr/bin/env python3
"""Branded Commercial Quotation & Proposal Generator for JHB Curtain Cleaning."""

import argparse
import datetime as dt
import pathlib
import sys

def generate_proposal(client: str, company: str, location: str, sector: str, items: list, discount: float = 0.0, output_path: str = "proposal.html"):
    proposal_id = f"JHB-Q-{int(dt.datetime.now().timestamp()) % 1000000:06d}"
    date_str = dt.datetime.now().strftime("%d %B %Y")
    valid_until = (dt.datetime.now() + dt.timedelta(days=14)).strftime("%d %B %Y")

    subtotal = sum(qty * price for _, qty, price in items)
    discount_val = (subtotal * discount) / 100.0 if discount > 0 else 0.0
    total = subtotal - discount_val

    rows_html = ""
    for desc, qty, price in items:
        rows_html += f"""
        <tr>
          <td>
            <strong>{desc}</strong><br/>
            <small style="color: #666;">In-situ low-moisture extraction, dust/soot removal, pleat realignment</small>
          </td>
          <td class="text-right">{qty}</td>
          <td class="text-right">R{price:,.2f}</td>
          <td class="text-right"><strong>R{(qty * price):,.2f}</strong></td>
        </tr>
        """

    discount_row = f"""
    <div class="total-row" style="color: #16a34a;">
      <span>Special Discount ({discount}%):</span>
      <span>-R{discount_val:,.2f}</span>
    </div>
    """ if discount > 0 else ""

    html = f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Formal Quotation · {company or client} · {proposal_id}</title>
  <style>
    @page {{ size: A4; margin: 15mm; }}
    body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1a1a1a; background: #ffffff; margin: 0; padding: 24px; font-size: 13px; line-height: 1.5; }}
    .header {{ display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #c99c2d; padding-bottom: 16px; margin-bottom: 24px; }}
    .logo-text {{ font-size: 22px; font-weight: 800; color: #0a0a0a; letter-spacing: 1px; font-family: 'Playfair Display', Georgia, serif; }}
    .logo-sub {{ font-size: 10px; color: #9e7514; text-transform: uppercase; font-weight: 700; letter-spacing: 2px; }}
    .doc-title {{ text-align: right; font-size: 18px; font-weight: 700; color: #0a0a0a; text-transform: uppercase; letter-spacing: 1px; }}
    .doc-meta {{ text-align: right; font-size: 11px; color: #666666; margin-top: 4px; }}
    .details-grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; }}
    .box {{ background: #fdfbf7; border: 1px solid #e8dec8; border-radius: 6px; padding: 14px; }}
    .box h4 {{ margin: 0 0 8px 0; font-size: 12px; color: #9e7514; text-transform: uppercase; letter-spacing: 1px; }}
    table {{ width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px; }}
    th {{ background: #141414; color: #ffffff; padding: 10px 12px; text-align: left; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }}
    td {{ padding: 10px 12px; border-bottom: 1px solid #e5e5e5; }}
    .text-right {{ text-align: right; }}
    .total-box {{ margin-left: auto; width: 280px; margin-bottom: 24px; }}
    .total-row {{ display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; }}
    .total-highlight {{ border-top: 2px solid #0a0a0a; border-bottom: 2px solid #0a0a0a; font-size: 16px; font-weight: 800; color: #0a0a0a; padding: 8px 0; }}
    .protocol-box {{ background: #f5f5f5; border-left: 4px solid #c99c2d; padding: 12px 16px; border-radius: 4px; margin-bottom: 24px; font-size: 12px; color: #444444; }}
    .signature-grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 36px; padding-top: 20px; border-top: 1px solid #e5e5e5; }}
    .sign-line {{ border-bottom: 1px dashed #888888; height: 36px; margin-top: 12px; }}
    .print-btn {{ display: inline-block; background: #c99c2d; color: #121212; padding: 10px 20px; border-radius: 4px; font-weight: 700; text-decoration: none; cursor: pointer; border: none; font-size: 13px; margin-bottom: 16px; }}
    @media print {{ .print-btn {{ display: none; }} body {{ padding: 0; }} }}
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
        Direct / WhatsApp: +27 75 011 9200 · info@jhbcurtaincleaning.co.za
      </div>
    </div>
    <div>
      <div class="doc-title">Formal Quotation</div>
      <div class="doc-meta">
        <strong>Quote #:</strong> {proposal_id}<br/>
        <strong>Date:</strong> {date_str}<br/>
        <strong>Valid Until:</strong> {valid_until}
      </div>
    </div>
  </div>

  <div class="details-grid">
    <div class="box">
      <h4>Client &amp; Site Details</h4>
      <strong>{f"{company}<br/>Attn: " if company else ""}{client}</strong><br/>
      Location / Property: {location}<br/>
      Sector: {sector}
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
      {rows_html}
    </tbody>
  </table>

  <div class="total-box">
    <div class="total-row">
      <span>Subtotal:</span>
      <span>R{subtotal:,.2f}</span>
    </div>
    {discount_row}
    <div class="total-row total-highlight">
      <span>Total Quotation:</span>
      <span>R{total:,.2f}</span>
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
</html>"""

    out_file = pathlib.Path(output_path)
    out_file.parent.mkdir(parents=True, exist_ok=True)
    out_file.write_text(html, encoding="utf-8")
    print(f"✓ Quotation generated successfully: {out_file} (Total: R{total:,.2f})")
    return out_file

def main():
    parser = argparse.ArgumentParser(description="Generate branded commercial PDF/Print quotation.")
    parser.add_argument("--client", default="David Sterling", help="Client contact name")
    parser.add_argument("--company", default="The Leonardo Sandton", help="Company / Hotel name")
    parser.add_argument("--location", default="Sandton CBD", help="Property location")
    parser.add_argument("--sector", default="Hotels & Hospitality", help="Business sector")
    parser.add_argument("--output", default="docs/proposals/sample_leonardo_quote.html", help="Output file path")
    args = parser.parse_args()

    sample_items = [
        ("Executive Guest Suite Drapery & Sheers (On-Site Low Moisture Clean)", 24, 650.0),
        ("Presidential Suite 5.5m Double-Volume Velvet Drapes", 2, 1800.0),
        ("SANS 1423 Flame Retardant Re-treatment & Certification", 24, 150.0),
    ]

    generate_proposal(
        client=args.client,
        company=args.company,
        location=args.location,
        sector=args.sector,
        items=sample_items,
        discount=10.0,
        output_path=args.output
    )

if __name__ == "__main__":
    main()
