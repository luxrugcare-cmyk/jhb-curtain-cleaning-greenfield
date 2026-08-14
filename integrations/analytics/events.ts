declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEvent =
  | "navigation_click" | "call_click" | "whatsapp_click"
  | "quote_start" | "quote_step" | "quote_upload" | "quote_submit"
  | "commercial_start" | "commercial_submit" | "generate_lead"
  | "booking_view" | "booking_complete"
  | "case_study_view" | "review_interaction" | "service_view" | "sector_view" | "area_view";

export function trackEvent(event: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function () {
      window.dataLayer?.push(arguments);
    };
  }
  window.gtag("event", event, params);
}
