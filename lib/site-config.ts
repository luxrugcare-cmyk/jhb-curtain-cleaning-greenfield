const fallbackSiteUrl = "https://www.jhbcurtaincleaning.co.za";

function normalizeSiteUrl(value?: string) {
  const candidate = value?.trim().replace(/^['"]|['"]$/g, "");
  if (!candidate) return fallbackSiteUrl;

  try {
    return new URL(candidate).toString().replace(/\/$/, "");
  } catch {
    return fallbackSiteUrl;
  }
}

export const siteConfig = {
  name: "JHB Curtain Cleaning",
  shortName: "JHB Curtain Cleaning",
  description:
    "Specialist on-site curtain and textile care for residential and commercial properties in Johannesburg and Gauteng. Free on-site evaluations by Kathy.",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  phoneDisplay: "+27 75 011 9200",
  phoneE164: "+27750119200",
  kathyPhoneDisplay: "071 622 6753",
  kathyPhoneE164: "+27716226753",
  officePhoneDisplay: "061 522 2037",
  officePhoneE164: "+27615222037",
  whatsappE164: "27750119200",
  email: "info@jhbcurtaincleaning.co.za",
  agentInbox: "stephen-1015@agentmail.to",
  areaServed: [
    "Johannesburg",
    "Sandton",
    "Randburg",
    "Roodepoort",
    "Fourways",
    "Midrand",
    "Rosebank",
    "Edenvale",
    "Alberton",
    "Pretoria",
    "Gauteng",
  ],
} as const;
