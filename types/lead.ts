import type { LeadPhoto } from "@/integrations/storage/photo-types";

export type LeadKind = "residential" | "commercial";

export type LeadPayload = {
  requestId?: string;
  kind: LeadKind;
  name: string;
  email?: string;
  mobile: string;
  service?: string;
  propertyType?: string;
  organisation?: string;
  organisationDomain?: string;
  sector?: string;
  location?: string;
  scope?: string;
  preferredContact?: "phone" | "whatsapp" | "email";
  marketingConsent?: boolean;
  sourcePath?: string;
  sourceUrl?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  privacyNoticeVersion?: string;
  photos?: LeadPhoto[];
};
