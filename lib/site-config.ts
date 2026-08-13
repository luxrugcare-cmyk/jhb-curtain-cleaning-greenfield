export const siteConfig = {
  name: "JHB Curtain Cleaning",
  shortName: "JHB Curtain Cleaning",
  description: "Specialist on-site curtain and textile care for residential and commercial properties in Johannesburg and Gauteng.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.jhbcurtaincleaning.co.za",
  phoneDisplay: "+27 75 011 9200",
  phoneE164: "+27750119200",
  whatsappE164: "27750119200",
  email: "info@jhbcurtaincleaning.co.za",
  areaServed: ["Johannesburg", "Sandton", "Randburg", "Roodepoort", "Fourways", "Midrand", "Gauteng"],
} as const;
