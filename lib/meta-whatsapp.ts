import crypto from "node:crypto";

export interface WhatsAppIncomingMessage {
  from: string; // phone number e.g. "27825551234"
  id: string;
  timestamp: string;
  type: "text" | "image" | "interactive" | "button" | "location";
  text?: { body: string };
  image?: { id: string; mime_type: string; sha256: string; caption?: string };
  interactive?: {
    type: "button_reply" | "list_reply";
    button_reply?: { id: string; title: string };
    list_reply?: { id: string; title: string; description?: string };
  };
}

export interface WhatsAppWebhookPayload {
  object: string;
  entry?: Array<{
    id: string;
    changes?: Array<{
      value?: {
        messaging_product: string;
        metadata?: { display_phone_number: string; phone_number_id: string };
        contacts?: Array<{ profile: { name: string }; wa_id: string }>;
        messages?: WhatsAppIncomingMessage[];
      };
      field: string;
    }>;
  }>;
}

export class MetaWhatsAppService {
  private phoneNumberId: string;
  private apiToken: string;
  private verifyToken: string;
  private apiVersion: string;

  constructor() {
    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || "";
    this.apiToken = process.env.WHATSAPP_API_TOKEN || "";
    this.verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || "jhb_curtain_cleaning_meta_2026";
    this.apiVersion = process.env.WHATSAPP_API_VERSION || "v21.0";
  }

  public verifyWebhook(mode: string | null, token: string | null, challenge: string | null): string | null {
    if (mode === "subscribe" && token === this.verifyToken) {
      return challenge;
    }
    return null;
  }

  public async sendTextMessage(to: string, text: string): Promise<{ ok: boolean; messageId?: string; error?: string }> {
    if (!this.phoneNumberId || !this.apiToken) {
      // In development/stub mode when credentials aren't set
      return { ok: true, messageId: `stub_msg_${Date.now()}` };
    }

    const cleanTo = to.replace(/[^0-9]/g, "");
    const url = `https://graph.facebook.com/${this.apiVersion}/${this.phoneNumberId}/messages`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: cleanTo,
          type: "text",
          text: { preview_url: true, body: text },
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        return { ok: false, error: err };
      }

      const data = await res.json();
      return { ok: true, messageId: data.messages?.[0]?.id };
    } catch (e: any) {
      return { ok: false, error: e?.message || "Network Error" };
    }
  }

  public async sendInteractiveMenu(
    to: string,
    headerText: string,
    bodyText: string,
    buttons: Array<{ id: string; title: string }>
  ): Promise<{ ok: boolean; messageId?: string; error?: string }> {
    if (!this.phoneNumberId || !this.apiToken) {
      return { ok: true, messageId: `stub_interactive_${Date.now()}` };
    }

    const cleanTo = to.replace(/[^0-9]/g, "");
    const url = `https://graph.facebook.com/${this.apiVersion}/${this.phoneNumberId}/messages`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: cleanTo,
          type: "interactive",
          interactive: {
            type: "button",
            header: { type: "text", text: headerText },
            body: { text: bodyText },
            footer: { text: "JHB Curtain Cleaning · On-Site Specialists" },
            action: {
              buttons: buttons.slice(0, 3).map((b) => ({
                type: "reply",
                reply: { id: b.id, title: b.title.slice(0, 20) },
              })),
            },
          },
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        return { ok: false, error: err };
      }

      const data = await res.json();
      return { ok: true, messageId: data.messages?.[0]?.id };
    } catch (e: any) {
      return { ok: false, error: e?.message || "Network Error" };
    }
  }
}

export const metaWhatsApp = new MetaWhatsAppService();
