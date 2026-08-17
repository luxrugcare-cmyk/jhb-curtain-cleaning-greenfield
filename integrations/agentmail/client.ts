import type { LeadPayload } from "@/types/lead";

const AGENTMAIL_API_BASE = "https://api.agentmail.to/v0";

export type AgentMailConfig = {
  apiKey?: string;
  inboxId?: string;
};

export async function sendAgentMailMessage(options: {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}) {
  const apiKey = process.env.AGENTMAIL_API_KEY;
  const inboxId = process.env.AGENTMAIL_INBOX_ID || "info@agentmail.to";

  if (!apiKey) {
    return { ok: true, mode: "stub" as const };
  }

  const response = await fetch(`${AGENTMAIL_API_BASE}/inboxes/${encodeURIComponent(inboxId)}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      text: options.text,
      html: options.html,
      reply_to: options.replyTo,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown AgentMail error");
    throw new Error(`AgentMail dispatch failed (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return { ok: true, mode: "live" as const, messageId: data.id || data.message_id };
}

export async function dispatchAgentMailLeadNotification(payload: LeadPayload) {
  const to = process.env.LEAD_NOTIFICATION_EMAIL || "info@jhbcurtaincleaning.co.za";
  const subject = `[New Lead] ${payload.kind.toUpperCase()}: ${payload.name} (${payload.location || "Johannesburg"})`;

  const text = [
    `New enquiry received for JHB Curtain Cleaning:`,
    `-----------------------------------------------`,
    `Lead Type: ${payload.kind}`,
    `Name: ${payload.name}`,
    `Mobile: ${payload.mobile}`,
    `Email: ${payload.email || "Not provided"}`,
    `Service: ${payload.service || "Unspecified"}`,
    `Location: ${payload.location || "Not supplied"}`,
    `Organisation: ${payload.organisation || "N/A"}`,
    `Scope: ${payload.scope || "N/A"}`,
    `Preferred Contact: ${payload.preferredContact || "WhatsApp"}`,
    `Reference ID: ${payload.requestId}`,
    `Submitted At: ${new Date().toISOString()}`,
  ].join("\n");

  return sendAgentMailMessage({
    to,
    subject,
    text,
    replyTo: payload.email || undefined,
  });
}
