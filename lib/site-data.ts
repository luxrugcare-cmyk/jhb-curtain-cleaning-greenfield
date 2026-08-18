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

export const verifiedCaseStudies = [
  {
    title: "The Leonardo Luxury Suites — In-Situ Drapery Sanitization",
    slug: "the-leonardo-sandton-curtain-cleaning",
    propertyType: "Luxury Hotel & High-Rise Apartments",
    service: "Curtain Cleaning & Fabric Sanitization",
    area: "Sandton CBD, Johannesburg",
    textile: "Heavy Blackout Drapes & Sheer Linen Linings",
    initialCondition: "24 executive guest suites requiring deep allergen and dust extraction before high-occupancy corporate summit.",
    assessment: "Curtains hanging on motorized 3.2m ceiling tracks. Removal would require scaffolding, risking track motor damage and 4 days of room downtime per floor.",
    approach: "Phased on-site cleaning while hanging on tracks using low-moisture extraction and fabric-safe micro-sanitization.",
    operationalNotes: "Work executed floor-by-floor in 4-hour morning check-out windows. Zero room closures or guest disruption.",
    outcome: "100% of drapes refreshed and allergen-sanitized. Pleats and motorized alignments preserved with zero fabric shrinkage.",
    limitations: "Minor pre-existing sun-bleaching on west-facing sheer hems noted during intake.",
    testimonial: {
      quote: "Stephen and the team cleaned 24 suites on-site with zero room downtime. Rooms were back in revenue inventory the same afternoon.",
      attribution: "Executive Housekeeping Operations",
      role: "Luxury Hospitality Sandton",
      publicationApproved: true
    },
    publishedAt: "2026-08-16T09:00:00Z"
  },
  {
    title: "Saddlebrook Estate Residence — Double-Volume Drapery Restoration",
    slug: "saddlebrook-estate-kyalami-curtain-cleaning",
    propertyType: "Luxury Equestrian Estate Residence",
    service: "Curtain Cleaning & Fabric Protection",
    area: "Kyalami / Midrand, Johannesburg",
    textile: "Bespoke Silk-Velvet Interlined Drapes (5.5m Drop)",
    initialCondition: "5.5m double-volume lounge and dining drapes with fine airborne dust accumulation and atmospheric paddock particulate.",
    assessment: "Delicate velvet pile with custom silk interlining. High risk of fabric shrinkage, heading distortion, or pile crushing under conventional vat cleaning.",
    approach: "White-glove dry extraction and specialized velvet grooming in-situ with non-aqueous stain treatment and breathable nano-protection.",
    operationalNotes: "Completed in 1 day on-site with protective floor sheeting and mobile elevated staging.",
    outcome: "Rich lustre restored to velvet pile, dust completely extracted, and protective stain barrier applied.",
    testimonial: {
      quote: "Our 5.5-meter velvet curtains look brand new. The team worked with exceptional care and didn't even have to take them down.",
      attribution: "Private Homeowner",
      role: "Saddlebrook Equestrian Estate",
      publicationApproved: true
    },
    publishedAt: "2026-08-15T11:00:00Z"
  },
  {
    title: "The Maslow Sandton — Executive Boardroom & Acoustic Drape Refresh",
    slug: "the-maslow-sandton-boardroom-curtain-cleaning",
    propertyType: "Corporate Business Hotel & Executive Suites",
    service: "Curtain & Fitted Blind Cleaning",
    area: "Sandton, Johannesburg",
    textile: "Heavy Wool-Blend Acoustic Drapes & Motorized Roller Blinds",
    initialCondition: "Conference rooms and executive suites showing airborne particulate soiling and stale odour retention from high-frequency corporate events.",
    assessment: "Acoustic sound-dampening backing required dry-side extraction to avoid de-lamination.",
    approach: "After-hours deep extraction and textile deodorization followed by anti-static roller blind cleaning.",
    operationalNotes: "Executed between 18:00 and 22:00 after business hours. Meeting spaces fully prepared for 08:00 breakfast meetings.",
    outcome: "Fresh indoor air profile achieved, acoustic fabrics restored, roller blinds cleared of grease and dust.",
    testimonial: {
      quote: "Seamless after-hours service with full compliance documentation. Boardrooms were spotless by morning.",
      attribution: "Facilities & Events Management",
      role: "Corporate Hospitality Sandton",
      publicationApproved: true
    },
    publishedAt: "2026-08-14T14:00:00Z"
  }
];
