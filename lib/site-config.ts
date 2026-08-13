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
  description: "Specialist on-site curtain and textile care for residential and commercial properties in Johannesburg and Gauteng.",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  phoneDisplay: "+27 75 011 9200",
  phoneE164: "+27750119200",
  whatsappE164: "27750119200",
  email: "info@jhbcurtaincleaning.co.za",
  areaServed: ["Johannesburg", "Sandton", "Randburg", "Roodepoort", "Fourways", "Midrand", "Gauteng"],
} as const;
