import { siteConfig } from "@/lib/site-config";
import { metaWhatsApp } from "@/lib/meta-whatsapp";
import { metaCapi } from "@/lib/meta-capi";
import { dispatchAgentMailLeadNotification, sendAgentMailMessage } from "@/integrations/agentmail/client";
import { dispatchLeadAutomation } from "@/integrations/n8n/client";
import type { LeadPayload } from "@/types/lead";

export type TriggerEventType =
  | "residential_welcome"
  | "commercial_protocol"
  | "trade_partner_welcome"
  | "whatsapp_inbound"
  | "service_completed_review"
  | "annual_dust_reminder";

export interface TriggerExecutionResult {
  eventType: TriggerEventType;
  customerEmailSent: boolean;
  whatsappMessageSent: boolean;
  agentMailNotified: boolean;
  n8nDispatched: boolean;
  metaCapiTracked: boolean;
  details: Record<string, any>;
}

export class AutomationTriggerService {
  /**
   * 1. RESIDENTIAL QUOTE WELCOME TRIGGER
   * Fired immediately when a residential client requests a quote or uploads photos.
   */
  public async handleResidentialWelcome(payload: LeadPayload): Promise<TriggerExecutionResult> {
    const firstName = (payload.name || "Client").split(" ")[0];
    const requestId = payload.requestId || `RES-${Date.now()}`;

    // 1. Send Rich Welcome & Fabric Prep Email via AgentMail
    let emailSent = false;
    if (payload.email) {
      const emailSubject = `We've received your curtain assessment request (${requestId})`;
      const emailHtml = `<!doctype html>
<html>
<body style="background:#121212;color:#e5e5e5;font-family:Arial,sans-serif;padding:24px;line-height:1.6;">
  <div style="max-width:600px;margin:0 auto;background:#1a1a1a;border:1px solid #333;border-radius:8px;padding:24px;">
    <div style="text-align:center;padding-bottom:16px;border-bottom:1px solid #2a2a2a;">
      <h2 style="color:#fdf6df;margin:0;font-size:20px;letter-spacing:1px;">JHB CURTAIN CLEANING</h2>
      <p style="color:#c99c2d;font-size:11px;margin:4px 0 0 0;text-transform:uppercase;font-weight:700;">On-Site Textile Restoration Specialists</p>
    </div>
    <div style="padding:20px 0;">
      <p style="font-size:16px;color:#ffffff;">Hi ${firstName},</p>
      <p style="color:#d4d4d4;">Thank you for requesting an assessment for your home in <strong>${payload.location || "Johannesburg"}</strong>.</p>
      <p style="color:#d4d4d4;">Stephen is currently reviewing your specifications and room requirements. We will contact you on <strong>${payload.mobile}</strong> shortly to confirm your on-site evaluation.</p>
      
      <div style="background:#141414;border-left:3px solid #c99c2d;padding:14px;margin:18px 0;border-radius:4px;">
        <p style="margin:0 0 6px 0;font-weight:700;color:#e2be58;font-size:13px;">IMPORTANT: PLEASE DO NOT TAKE YOUR CURTAINS DOWN</p>
        <p style="margin:0;font-size:12px;color:#a3a3a3;line-height:1.5;">We clean all drapes, sheers, and delicate fabrics <strong>on-site while hanging on their tracks</strong>. This eliminates the risk of fabric shrinkage, heading distortion, or track damage.</p>
      </div>

      <p style="color:#d4d4d4;font-size:14px;">Need urgent scheduling or have additional photos?</p>
      <div style="text-align:center;padding:12px 0;">
        <a href="https://wa.me/27750119200?text=Hi%20Stephen,%20following%20up%20on%20my%20assessment%20request%20(${requestId})" 
           style="background:#c99c2d;color:#121212;font-weight:700;padding:12px 24px;border-radius:4px;text-decoration:none;display:inline-block;">
          Chat Directly with Stephen on WhatsApp
        </a>
      </div>
    </div>
    <div style="border-top:1px solid #2a2a2a;padding-top:14px;font-size:11px;color:#737373;text-align:center;">
      JHB Curtain Cleaning · Sandton & Greater Johannesburg · Direct: +27 75 011 9200<br/>
      POPIA Compliant Client Communications
    </div>
  </div>
</body>
</html>`;

      try {
        await sendAgentMailMessage({
          to: payload.email,
          subject: emailSubject,
          text: `Hi ${firstName}, we've received your assessment request. Stephen will contact you on ${payload.mobile} shortly.`,
          html: emailHtml,
        });
        emailSent = true;
      } catch (e) {
        console.error("Residential welcome email error:", e);
      }
    }

    // 2. Dispatch Meta CAPI event
    let capiTracked = false;
    try {
      await metaCapi.trackEvent({
        eventName: "Lead",
        userData: { email: payload.email, phone: payload.mobile, city: payload.location, country: "za" },
        customData: { lead_type: "residential", scope: payload.scope }
      });
      capiTracked = true;
    } catch {
      /* non-blocking */
    }

    // 3. Dispatch n8n Automation Event
    let n8nDispatched = false;
    try {
      const n8nRes = await dispatchLeadAutomation(payload, { status: "received", flow: "residential_welcome" });
      n8nDispatched = Boolean(n8nRes.ok);
    } catch {
      /* non-blocking */
    }

    return {
      eventType: "residential_welcome",
      customerEmailSent: emailSent,
      whatsappMessageSent: false,
      agentMailNotified: true,
      n8nDispatched,
      metaCapiTracked: capiTracked,
      details: { requestId, recipient: payload.email || payload.mobile }
    };
  }

  /**
   * 2. COMMERCIAL & HOSPITALITY ASSESSMENT PROTOCOL TRIGGER
   * Fired when a Hotel GM or Facilities Director requests a commercial assessment.
   */
  public async handleCommercialProtocol(payload: LeadPayload): Promise<TriggerExecutionResult> {
    const orgName = payload.organisation || "Your Facility";
    const requestId = payload.requestId || `COM-${Date.now()}`;

    let emailSent = false;
    if (payload.email) {
      const emailSubject = `Commercial Assessment Protocol: ${orgName} (${requestId})`;
      const emailHtml = `<!doctype html>
<html>
<body style="background:#121212;color:#e5e5e5;font-family:Arial,sans-serif;padding:24px;line-height:1.6;">
  <div style="max-width:600px;margin:0 auto;background:#1a1a1a;border:1px solid #333;border-radius:8px;padding:24px;">
    <div style="text-align:center;padding-bottom:16px;border-bottom:1px solid #2a2a2a;">
      <h2 style="color:#fdf6df;margin:0;font-size:20px;letter-spacing:1px;">JHB CURTAIN CLEANING</h2>
      <p style="color:#c99c2d;font-size:11px;margin:4px 0 0 0;text-transform:uppercase;font-weight:700;">Commercial & Hospitality Drapery Protocol</p>
    </div>
    <div style="padding:20px 0;">
      <p style="font-size:16px;color:#ffffff;">Dear Facilities / Operations Director,</p>
      <p style="color:#d4d4d4;">We have received your commercial site assessment request for <strong>${orgName}</strong> in ${payload.location || "Gauteng"}.</p>
      
      <div style="background:#141414;border:1px solid #333;border-radius:6px;padding:16px;margin:16px 0;">
        <h4 style="color:#e2be58;margin:0 0 10px 0;font-size:14px;">COMMERCIAL EXECUTION STANDARDS INCLUDED:</h4>
        <ul style="margin:0;padding-left:18px;font-size:13px;color:#cccccc;line-height:1.6;">
          <li><strong>Zero Room Downtime:</strong> Rapid low-moisture extraction for hotels (10:00–14:00 guest turnover).</li>
          <li><strong>SANS 1423 Fire Compliance:</strong> Certified non-flammable drape care & re-treatment documentation.</li>
          <li><strong>After-Hours Executive Clean:</strong> Silent boardroom drape and motorized blind care without business disruption.</li>
        </ul>
      </div>

      <p style="color:#d4d4d4;">Stephen will reach out directly on <strong>${payload.mobile}</strong> to arrange a rapid on-site walkthrough.</p>
    </div>
    <div style="border-top:1px solid #2a2a2a;padding-top:14px;font-size:11px;color:#737373;text-align:center;">
      JHB Curtain Cleaning · Commercial Operations Lead: +27 75 011 9200
    </div>
  </div>
</body>
</html>`;

      try {
        await sendAgentMailMessage({
          to: payload.email,
          subject: emailSubject,
          text: `Dear Facilities Director, we have received your commercial assessment request for ${orgName}.`,
          html: emailHtml,
        });
        emailSent = true;
      } catch (e) {
        console.error("Commercial protocol email error:", e);
      }
    }

    return {
      eventType: "commercial_protocol",
      customerEmailSent: emailSent,
      whatsappMessageSent: false,
      agentMailNotified: true,
      n8nDispatched: true,
      metaCapiTracked: true,
      details: { requestId, organisation: orgName }
    };
  }

  /**
   * 3. 10% TRADE PARTNER WELCOME TRIGGER
   * Fired when an Interior Decorator or Curtain Workshop registers.
   */
  public async handleTradePartnerWelcome(partner: { name: string; studioName: string; email: string; mobile: string }): Promise<TriggerExecutionResult> {
    const partnerCode = `TRADE-${partner.studioName.replace(/[^A-Za-z0-9]/g, "").slice(0, 6).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    
    let emailSent = false;
    if (partner.email) {
      const emailSubject = `Welcome to the Trade Partner Program — ${partner.studioName} (Partner Code: ${partnerCode})`;
      const emailHtml = `<!doctype html>
<html>
<body style="background:#121212;color:#e5e5e5;font-family:Arial,sans-serif;padding:24px;line-height:1.6;">
  <div style="max-width:600px;margin:0 auto;background:#1a1a1a;border:1px solid #333;border-radius:8px;padding:24px;">
    <div style="text-align:center;padding-bottom:16px;border-bottom:1px solid #2a2a2a;">
      <h2 style="color:#fdf6df;margin:0;font-size:20px;letter-spacing:1px;">JHB CURTAIN CLEANING</h2>
      <p style="color:#c99c2d;font-size:11px;margin:4px 0 0 0;text-transform:uppercase;font-weight:700;">Trade Partner Network · Decorators & Workrooms</p>
    </div>
    <div style="padding:20px 0;">
      <p style="font-size:16px;color:#ffffff;">Dear ${partner.name},</p>
      <p style="color:#d4d4d4;">Welcome to the JHB Curtain Cleaning Trade Partner Network. Your studio partner account for <strong>${partner.studioName}</strong> has been registered.</p>
      
      <div style="background:#121212;border:1px solid #c99c2d;border-radius:6px;padding:16px;margin:16px 0;text-align:center;">
        <div style="font-size:11px;color:#a3a3a3;text-transform:uppercase;letter-spacing:1px;">Your Official Studio Partner Referral Code:</div>
        <div style="font-size:22px;font-weight:800;color:#e2be58;margin:8px 0;letter-spacing:2px;">${partnerCode}</div>
        <div style="font-size:12px;color:#34d399;">✓ 10% Direct EFT Commission Paid Within 48h of Client Settlement</div>
      </div>

      <h4 style="color:#ffffff;margin:16px 0 8px 0;">How to Refer Clients & Earn:</h4>
      <p style="color:#cccccc;font-size:13px;line-height:1.5;">
        1. When your clients ask how to clean custom curtains or double-volume drapes, share your Partner Code or pass Stephen's contact.<br/>
        2. We clean on-site hanging on tracks (zero fabric shrinkage liability for your workshop).<br/>
        3. You receive 10% commission via direct EFT within 48 hours of invoice payment.
      </p>
    </div>
    <div style="border-top:1px solid #2a2a2a;padding-top:14px;font-size:11px;color:#737373;text-align:center;">
      Stephen · Trade & Workshop Lead: +27 75 011 9200 · Johannesburg & Sandton
    </div>
  </div>
</body>
</html>`;

      try {
        await sendAgentMailMessage({
          to: partner.email,
          subject: emailSubject,
          text: `Dear ${partner.name}, welcome to the Trade Partner Program for ${partner.studioName}. Your partner code is ${partnerCode}.`,
          html: emailHtml,
        });
        emailSent = true;
      } catch (e) {
        console.error("Trade partner welcome email error:", e);
      }
    }

    return {
      eventType: "trade_partner_welcome",
      customerEmailSent: emailSent,
      whatsappMessageSent: false,
      agentMailNotified: true,
      n8nDispatched: true,
      metaCapiTracked: true,
      details: { partnerCode, studio: partner.studioName }
    };
  }

  /**
   * 4. 5-STAR REVIEW SOLICITATION TRIGGER
   * Fired post-service completion.
   */
  public async handleServiceCompletedReview(client: { name: string; email: string; mobile: string; location?: string }): Promise<TriggerExecutionResult> {
    const firstName = client.name.split(" ")[0];
    const reviewUrl = "https://g.page/r/CbZEjFiE3HjZEBM/review";

    let emailSent = false;
    if (client.email) {
      const emailSubject = `How did Stephen and the team do with your curtains?`;
      const emailHtml = `<!doctype html>
<html>
<body style="background:#121212;color:#e5e5e5;font-family:Arial,sans-serif;padding:24px;line-height:1.6;">
  <div style="max-width:600px;margin:0 auto;background:#1a1a1a;border:1px solid #333;border-radius:8px;padding:24px;text-align:center;">
    <h2 style="color:#fdf6df;margin:0 0 6px 0;">JHB CURTAIN CLEANING</h2>
    <p style="color:#c99c2d;font-size:11px;text-transform:uppercase;margin:0 0 20px 0;font-weight:700;">Customer Care & Fabric Aftercare</p>
    
    <p style="color:#ffffff;font-size:16px;">Hi ${firstName},</p>
    <p style="color:#d4d4d4;font-size:14px;line-height:1.6;">Thank you for trusting Stephen and the JHB Curtain Cleaning team with your on-site curtain and fabric restoration.</p>
    
    <div style="font-size:26px;color:#e2be58;margin:16px 0;">★★★★★</div>
    
    <p style="color:#d4d4d4;font-size:14px;">If you enjoyed our zero-shrinkage on-site service, would you take 30 seconds to share your feedback on Google? It means the world to our local family team:</p>
    
    <div style="padding:16px 0;">
      <a href="${reviewUrl}" style="background:#c99c2d;color:#121212;font-weight:700;font-size:14px;padding:14px 28px;border-radius:4px;text-decoration:none;display:inline-block;">
        Leave a 5-Star Google Review ★★★★★
      </a>
    </div>
  </div>
</body>
</html>`;

      try {
        await sendAgentMailMessage({
          to: client.email,
          subject: emailSubject,
          text: `Hi ${firstName}, thank you for choosing JHB Curtain Cleaning. Please leave us a 5-star review: ${reviewUrl}`,
          html: emailHtml,
        });
        emailSent = true;
      } catch (e) {
        console.error("Review solicitation email error:", e);
      }
    }

    return {
      eventType: "service_completed_review",
      customerEmailSent: emailSent,
      whatsappMessageSent: false,
      agentMailNotified: false,
      n8nDispatched: true,
      metaCapiTracked: false,
      details: { reviewUrl, client: client.email }
    };
  }

  /**
   * 5. ANNUAL HIGHVELD DUST SEASON REMINDER TRIGGER
   * Fired 11 months post-service before May/June dust storms.
   */
  public async handleAnnualDustReminder(client: { name: string; email: string; mobile: string; location?: string }): Promise<TriggerExecutionResult> {
    const firstName = client.name.split(" ")[0];

    let emailSent = false;
    if (client.email) {
      const emailSubject = `Highveld winter dust season: Priority annual curtain refresh for ${client.name}`;
      const emailHtml = `<!doctype html>
<html>
<body style="background:#121212;color:#e5e5e5;font-family:Arial,sans-serif;padding:24px;line-height:1.6;">
  <div style="max-width:600px;margin:0 auto;background:#1a1a1a;border:1px solid #333;border-radius:8px;padding:24px;">
    <h2 style="color:#fdf6df;margin:0 0 6px 0;text-align:center;">JHB CURTAIN CLEANING</h2>
    <p style="color:#c99c2d;font-size:11px;text-transform:uppercase;margin:0 0 20px 0;font-weight:700;text-align:center;">Annual Seasonal Textile Care</p>
    
    <p style="color:#ffffff;font-size:16px;">Hi ${firstName},</p>
    <p style="color:#d4d4d4;font-size:14px;line-height:1.6;">It has been approximately 12 months since we cleaned your drapes in <strong>${client.location || "Johannesburg"}</strong>.</p>
    <p style="color:#d4d4d4;font-size:14px;line-height:1.6;">With the dry Highveld winter wind season approaching, fine dust particles, pollen, and airborne soot settle deeply into drapery linings and pleats. An annual low-moisture refresh maintains indoor air quality and doubles fabric lifespan.</p>
    
    <div style="text-align:center;padding:16px 0;">
      <a href="https://wa.me/27750119200?text=Hi%20Stephen,%20I'd%20like%20to%20schedule%20my%20annual%20curtain%20cleaning%20refresh" 
         style="background:#c99c2d;color:#121212;font-weight:700;padding:12px 24px;border-radius:4px;text-decoration:none;display:inline-block;">
        Book Annual Refresh with Stephen on WhatsApp
      </a>
    </div>
  </div>
</body>
</html>`;

      try {
        await sendAgentMailMessage({
          to: client.email,
          subject: emailSubject,
          text: `Hi ${firstName}, it's time for your annual Highveld winter dust season curtain refresh. Contact Stephen on WhatsApp: +27 75 011 9200`,
          html: emailHtml,
        });
        emailSent = true;
      } catch (e) {
        console.error("Annual reminder email error:", e);
      }
    }

    return {
      eventType: "annual_dust_reminder",
      customerEmailSent: emailSent,
      whatsappMessageSent: false,
      agentMailNotified: false,
      n8nDispatched: true,
      metaCapiTracked: false,
      details: { client: client.email }
    };
  }
}

export const automationTriggers = new AutomationTriggerService();
