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
    "Specialist on-site curtain & textile care in Johannesburg & Gauteng. Zero shrinkage guarantee, no curtain removal. Free on-site quote by Stephen.",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  contactPerson: "Stephen",
  phoneDisplay: "+27 75 011 9200",
  phoneE164: "+27750119200",
  whatsappDisplay: "+27 75 011 9200",
  whatsappE164: "27750119200",
  email: "info@jhbcurtaincleaning.co.za",
  agentInbox: "stephen-1015@agentmail.to",
  social: {
    instagram: "https://www.instagram.com/curtaincleaningjhb/",
    facebook: "https://www.facebook.com/profile.php?id=61583188967013",
    metaBusinessId: "1164022258518231",
    metaAssetId: "867076983156221",
  },
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
