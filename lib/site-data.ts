export const services = [
  { slug: "curtain-cleaning", title: "Curtain Cleaning", summary: "Specialist on-site cleaning while curtains remain hanging." },
  { slug: "blind-cleaning", title: "Blind Cleaning", summary: "Careful treatment for fitted blinds and window coverings." },
  { slug: "upholstery-cleaning", title: "Upholstery Cleaning", summary: "Fabric-safe cleaning for sofas, chairs and upholstered pieces." },
  { slug: "mattress-cleaning", title: "Mattress Cleaning", summary: "Deep fabric hygiene treatment for residential and commercial spaces." },
  { slug: "carpet-cleaning", title: "Carpet Cleaning", summary: "Professional care for fitted carpets and high-use areas." },
  { slug: "rug-care", title: "Rug Care", summary: "Specialist cleaning pathways for valuable and delicate rugs." },
  { slug: "fabric-protection", title: "Fabric Protection", summary: "Protective treatment to help textiles resist spills and soiling." },
  { slug: "fire-retardant-treatment", title: "Fire-Retardant Treatment", summary: "Commercial textile treatment workflows subject to final compliance validation." }
] as const;

export const sectors = [
  { slug: "hotels-hospitality", title: "Hotels & Hospitality", summary: "Guest-room and public-area textile care designed around operations." },
  { slug: "offices-corporate", title: "Offices & Corporate", summary: "Scheduled textile maintenance with minimal workplace disruption." },
  { slug: "healthcare", title: "Healthcare", summary: "Controlled, documented care for sensitive environments." },
  { slug: "education", title: "Education", summary: "Planned service for schools, campuses and institutions." },
  { slug: "venues-theatres", title: "Venues & Theatres", summary: "Specialist care for stage curtains, drapes and public spaces." },
  { slug: "property-facilities", title: "Property & Facilities Management", summary: "Repeatable service across properties, portfolios and managed sites." }
] as const;

export const areas = ["Johannesburg", "Sandton", "Randburg", "Roodepoort", "Fourways", "Midrand"] as const;

export const processSteps = [
  ["01", "Assess", "Inspect fabric, environment and service requirements."],
  ["02", "Identify", "Select the safest method for the textile and installation."],
  ["03", "Treat", "Pre-treat spots, stains and priority problem areas."],
  ["04", "Clean", "Complete the agreed on-site specialist clean."],
  ["05", "Inspect", "Quality check the finish and document the result."]
] as const;
