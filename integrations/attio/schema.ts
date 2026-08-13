/** Verified against the connected Attio workspace on 2026-08-12. */
export const verifiedPeopleAttributes = {
  name: "name",
  email: "email_addresses",
  phone: "phone_numbers",
  description: "description",
  company: "company",
  jobTitle: "job_title",
  location: "primary_location",
} as const;

/** Proposed custom fields. Do not assume these exist until explicitly created in Attio. */
export const proposedLeadFields = [
  "lead_kind", "service", "property_type", "sector", "organisation", "scope",
  "preferred_contact", "lead_source", "source_path", "marketing_consent_status",
  "marketing_consent_timestamp", "suppression_status", "privacy_notice_version",
] as const;
