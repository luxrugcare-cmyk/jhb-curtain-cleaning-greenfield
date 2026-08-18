import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

const TEMPLATES: Record<string, { file: string; isPlain?: boolean; title: string }> = {
  "trade-commission-visual": {
    file: "templates/email/compiled_html/touch2_trade_commission_visual.html",
    title: "10% Trade Referral Partnership (Touch 2 Visual)"
  },
  "trade-commission-plain-touch1": {
    file: "templates/email/plain_text/touch1_trade_commission_plain.txt",
    isPlain: true,
    title: "10% Trade Referral Partnership (Touch 1 Plain Text)"
  },
  "hotel-visual": {
    file: "templates/email/compiled_html/touch2_hotel_visual.html",
    title: "Hotel & Hospitality Drapery Care (Touch 2 Visual)"
  },
  "corporate-visual": {
    file: "templates/email/compiled_html/touch2_corporate_visual.html",
    title: "Corporate Facilities & Boardrooms (Touch 2 Visual)"
  },
  "trade-design-visual": {
    file: "templates/email/compiled_html/touch2_trade_design_visual.html",
    title: "Interior Design & Trade Partners (Touch 2 Visual)"
  },
  "customer-review": {
    file: "templates/email/customer_review_request.html",
    title: "5-Star Customer Review Solicitation"
  },
  "hotel-campaign": {
    file: "templates/email/hospitality_hotel_campaign.html",
    title: "Hospitality Hotel Campaign (Classic)"
  },
  "corporate-campaign": {
    file: "templates/email/corporate_facilities_campaign.html",
    title: "Corporate Facilities Campaign (Classic)"
  },
  "trade-design-campaign": {
    file: "templates/email/interior_design_trade_campaign.html",
    title: "Interior Design Trade Campaign (Classic)"
  },
  "hotel-plain-touch1": {
    file: "templates/email/plain_text/touch1_hotel_plain.txt",
    isPlain: true,
    title: "Hotel First Contact (Touch 1 Plain Text)"
  },
  "corporate-plain-touch1": {
    file: "templates/email/plain_text/touch1_corporate_plain.txt",
    isPlain: true,
    title: "Corporate Facilities First Contact (Touch 1 Plain Text)"
  },
  "trade-design-plain-touch1": {
    file: "templates/email/plain_text/touch1_trade_design_plain.txt",
    isPlain: true,
    title: "Trade Designer First Contact (Touch 1 Plain Text)"
  },
  "hotel-breakup-touch3": {
    file: "templates/email/plain_text/touch3_hotel_breakup.txt",
    isPlain: true,
    title: "Hotel Breakup Note (Touch 3 Plain Text)"
  }
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const config = TEMPLATES[slug];

  if (!config) {
    return new NextResponse("Template not found", { status: 404 });
  }

  const filePath = path.join(process.cwd(), config.file);
  if (!fs.existsSync(filePath)) {
    return new NextResponse("Template file missing on disk", { status: 404 });
  }

  let content = fs.readFileSync(filePath, "utf-8");

  // Populate dynamic placeholders with realistic sample lead data
  const sampleData: Record<string, string> = {
    "{FirstName}": "Claire",
    "{recipient_name}": "Claire",
    "{{recipient_name}}": "Claire",
    "{Company}": "Hyde Park Interiors & Workroom",
    "{company_name}": "Hyde Park Interiors & Workroom",
    "{{company_name}}": "Hyde Park Interiors & Workroom",
    "{Location}": "Sandton & Rosebank",
    "{property_location}": "Sandhurst, Sandton",
    "{{property_location}}": "Sandhurst, Sandton",
    "{{cta_url}}": "https://wa.me/27750119200?text=Hi%20Stephen,%20enquiring%20about%2010%%20trade%20partnership"
  };

  for (const [key, val] of Object.entries(sampleData)) {
    content = content.replaceAll(key, val);
  }

  if (config.isPlain) {
    const htmlWrapped = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${config.title}</title>
  <style>
    body { background-color: #121212; color: #e5e5e5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 30px; margin: 0; line-height: 1.6; }
    .email-container { max-width: 600px; margin: 0 auto; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 28px; white-space: pre-wrap; font-size: 15px; color: #d4d4d4; }
  </style>
</head>
<body>
  <div class="email-container">${content}</div>
</body>
</html>`;
    return new NextResponse(htmlWrapped, {
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }

  return new NextResponse(content, {
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
}
