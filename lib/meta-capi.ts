import crypto from "node:crypto";

export interface MetaCapiEventPayload {
  eventName: "Lead" | "Contact" | "Schedule" | "ViewContent" | "SubmitApplication";
  eventTime?: number;
  eventId?: string;
  eventSourceUrl?: string;
  userData: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    country?: string;
    clientIpAddress?: string;
    clientUserAgent?: string;
    fbc?: string;
    fbp?: string;
  };
  customData?: Record<string, any>;
}

function sha256(val: string): string {
  return crypto.createHash("sha256").update(val.trim().toLowerCase()).digest("hex");
}

export class MetaConversionsApiService {
  private pixelId: string;
  private accessToken: string;
  private apiVersion: string;
  private testEventCode: string;

  constructor() {
    this.pixelId = process.env.META_PIXEL_ID || "";
    this.accessToken = process.env.META_CAPI_ACCESS_TOKEN || "";
    this.apiVersion = process.env.META_API_VERSION || "v21.0";
    this.testEventCode = process.env.META_TEST_EVENT_CODE || "";
  }

  public async trackEvent(payload: MetaCapiEventPayload): Promise<{ ok: boolean; eventsReceived?: number; error?: string }> {
    if (!this.pixelId || !this.accessToken) {
      // Stub mode
      return { ok: true, eventsReceived: 1 };
    }

    const eventTime = payload.eventTime || Math.floor(Date.now() / 1000);
    const eventId = payload.eventId || `capi_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const formattedUserData: Record<string, any> = {};
    if (payload.userData.email) {
      formattedUserData.em = [sha256(payload.userData.email)];
    }
    if (payload.userData.phone) {
      const cleanPhone = payload.userData.phone.replace(/[^0-9]/g, "");
      formattedUserData.ph = [sha256(cleanPhone)];
    }
    if (payload.userData.firstName) {
      formattedUserData.fn = [sha256(payload.userData.firstName)];
    }
    if (payload.userData.lastName) {
      formattedUserData.ln = [sha256(payload.userData.lastName)];
    }
    if (payload.userData.city) {
      formattedUserData.ct = [sha256(payload.userData.city)];
    }
    if (payload.userData.country) {
      formattedUserData.country = [sha256(payload.userData.country)];
    } else {
      formattedUserData.country = [sha256("za")]; // South Africa
    }
    if (payload.userData.clientIpAddress) {
      formattedUserData.client_ip_address = payload.userData.clientIpAddress;
    }
    if (payload.userData.clientUserAgent) {
      formattedUserData.client_user_agent = payload.userData.clientUserAgent;
    }
    if (payload.userData.fbc) {
      formattedUserData.fbc = payload.userData.fbc;
    }
    if (payload.userData.fbp) {
      formattedUserData.fbp = payload.userData.fbp;
    }

    const eventObj: Record<string, any> = {
      event_name: payload.eventName,
      event_time: eventTime,
      event_id: eventId,
      action_source: "website",
      event_source_url: payload.eventSourceUrl || "https://www.jhbcurtaincleaning.co.za/",
      user_data: formattedUserData,
    };

    if (payload.customData) {
      eventObj.custom_data = payload.customData;
    }

    const bodyPayload: Record<string, any> = {
      data: [eventObj],
    };

    if (this.testEventCode) {
      bodyPayload.test_event_code = this.testEventCode;
    }

    const url = `https://graph.facebook.com/${this.apiVersion}/${this.pixelId}/events?access_token=${this.accessToken}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyPayload),
      });

      if (!res.ok) {
        const err = await res.text();
        return { ok: false, error: err };
      }

      const resData = await res.json();
      return { ok: true, eventsReceived: resData.events_received };
    } catch (e: any) {
      return { ok: false, error: e?.message || "CAPI Dispatch Failed" };
    }
  }
}

export const metaCapi = new MetaConversionsApiService();
