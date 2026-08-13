import type { LeadPayload } from "@/types/lead";

function escapeHtml(input = "") {
  return input.replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[c] || c));
}

async function sendEmail(body: Record<string, unknown>, key: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: true, mode: "stub" };
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": key.slice(0, 256) },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`Resend request failed (${response.status})`);
  const data = await response.json();
  return { ok: true, mode: "live", id: data.id };
}

export async function sendLeadAcknowledgement(payload: LeadPayload) {
  if (!payload.email) return { ok: true, mode: "not-requested" };
  const from = process.env.RESEND_FROM_EMAIL;
  if (!process.env.RESEND_API_KEY || !from) return { ok: true, mode: "stub" };
  const requestId = payload.requestId || `${Date.now()}-${payload.mobile}`;
  const templateId = payload.kind === "commercial"
    ? process.env.RESEND_TEMPLATE_COMMERCIAL_ACK
    : process.env.RESEND_TEMPLATE_RESIDENTIAL_ACK;
  if (templateId) {
    return sendEmail({
      from,
      to: [payload.email],
      template: {
        id: templateId,
        variables: {
          FIRST_NAME: payload.name.split(/\s+/)[0] || payload.name,
          REQUEST_ID: requestId,
          SERVICE: payload.service || "Residential assessment",
          ORGANISATION: payload.organisation || "Your organisation",
          SECTOR: payload.sector || "Commercial",
          LOCATION: payload.location || "Johannesburg",
        },
      },
    }, `lead-ack-${requestId}`);
  }
  return sendEmail({
    from,
    to: [payload.email],
    subject: payload.kind === "commercial" ? "Commercial assessment request received" : "Your assessment request has been received",
    html: `<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto"><h1 style="color:#071a2c">Thank you, ${escapeHtml(payload.name)}.</h1><p>We have received your ${payload.kind === "commercial" ? "commercial site assessment" : "residential assessment"} request.</p><p><strong>Preferred contact:</strong> ${escapeHtml(payload.preferredContact || "not specified")}</p><p><strong>Location:</strong> ${escapeHtml(payload.location || "not supplied")}</p><p>JHB Curtain Cleaning<br>${escapeHtml(process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+27 75 011 9200")}</p></div>`,
  }, `lead-ack-${requestId}`);
}

export async function sendInternalLeadNotification(payload: LeadPayload) {
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  if (!process.env.RESEND_API_KEY || !from || !to) return { ok: true, mode: "stub" };
  const requestId = payload.requestId || `${Date.now()}-${payload.mobile}`;
  const templateId = process.env.RESEND_TEMPLATE_INTERNAL_LEAD;
  if (templateId) {
    return sendEmail({
      from,
      to: [to],
      template: {
        id: templateId,
        variables: {
          REQUEST_ID: requestId,
          LEAD_TYPE: payload.kind,
          CUSTOMER_NAME: payload.name,
          CONTACT: [payload.mobile, payload.email].filter(Boolean).join(" / "),
          SERVICE_OR_SECTOR: payload.service || payload.sector || "Unspecified",
          LOCATION: payload.location || "Johannesburg",
          SOURCE: payload.sourcePath || payload.source || "Website",
        },
      },
    }, `lead-internal-${requestId}`);
  }
  return sendEmail({
    from,
    to: [to],
    subject: `New ${payload.kind} website lead — ${payload.name}`,
    html: `<h2>New website lead</h2><p><strong>Name:</strong> ${escapeHtml(payload.name)}</p><p><strong>Mobile:</strong> ${escapeHtml(payload.mobile)}</p><p><strong>Email:</strong> ${escapeHtml(payload.email || "")}</p><p><strong>Service:</strong> ${escapeHtml(payload.service || "")}</p><p><strong>Sector:</strong> ${escapeHtml(payload.sector || "")}</p><p><strong>Location:</strong> ${escapeHtml(payload.location || "")}</p><p><strong>Scope:</strong><br>${escapeHtml(payload.scope || "")}</p>`,
  }, `lead-internal-${requestId}`);
}
