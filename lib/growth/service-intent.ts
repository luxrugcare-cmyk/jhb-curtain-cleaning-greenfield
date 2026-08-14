export type ServiceIntent = {
  lead: string;
  commonRequests: string[];
  decisionPoints: string[];
  related: Array<{ slug: string; label: string }>;
};

export const serviceIntent: Record<string, ServiceIntent> = {
  "curtain-cleaning": {
    lead: "For many installed curtains, the practical question is not simply whether they can be cleaned, but whether they can be treated safely while hanging. The assessment checks fabric, lining, construction, soiling and access before an on-site method is recommended.",
    commonRequests: [
      "Professional curtain cleaning without removing the curtains",
      "Cleaning for lined, blackout or delicate curtains",
      "Help with dust, general soiling, marks and odours",
      "Residential rooms, offices, hotels and other occupied spaces",
    ],
    decisionPoints: [
      "Fabric and lining construction",
      "Colourfastness and existing damage",
      "Stain type and severity",
      "Access, room use and disruption constraints",
    ],
    related: [
      { slug: "blind-cleaning", label: "Blind cleaning" },
      { slug: "upholstery-cleaning", label: "Upholstery cleaning" },
      { slug: "fabric-protection", label: "Fabric protection" },
    ],
  },
  "blind-cleaning": {
    lead: "Fitted blinds collect airborne dust and handling marks, but the correct cleaning method depends on the blind material, finish, mechanism and condition. An assessment helps determine whether careful in-place cleaning is suitable.",
    commonRequests: [
      "Cleaning fitted blinds without unnecessary removal",
      "Dust and surface-soiling reduction",
      "Residential and workplace blind maintenance",
      "Combined curtain and blind cleaning visits",
    ],
    decisionPoints: [
      "Blind material and finish",
      "Operating mechanism and condition",
      "Degree of dust, grease or staining",
      "Whether in-place treatment is suitable",
    ],
    related: [
      { slug: "curtain-cleaning", label: "Curtain cleaning" },
      { slug: "upholstery-cleaning", label: "Upholstery cleaning" },
    ],
  },
  "upholstery-cleaning": {
    lead: "Sofas, couches, chairs and other upholstered pieces vary widely in fibre, backing, dye stability and construction. Professional upholstery cleaning starts with fabric suitability and stain assessment rather than using one method for every item.",
    commonRequests: [
      "Sofa and couch cleaning",
      "Dining and occasional chair cleaning",
      "General soil, marks and odour treatment",
      "Fabric-safe cleaning for homes and commercial seating",
    ],
    decisionPoints: [
      "Fabric identification and care guidance",
      "Dye stability and previous treatments",
      "Stain and soil type",
      "Cushion construction and drying conditions",
    ],
    related: [
      { slug: "mattress-cleaning", label: "Mattress cleaning" },
      { slug: "carpet-cleaning", label: "Carpet cleaning" },
      { slug: "fabric-protection", label: "Fabric protection" },
    ],
  },
  "mattress-cleaning": {
    lead: "Mattress cleaning is a textile-hygiene service focused on the mattress surface and fabric condition. The assessment considers construction, staining, moisture history and suitability before a cleaning approach is discussed.",
    commonRequests: [
      "Professional mattress surface cleaning",
      "General soil and odour treatment",
      "Mattress cleaning as part of a bedroom textile service",
      "Residential, hospitality and accommodation settings",
    ],
    decisionPoints: [
      "Mattress construction and care guidance",
      "Staining and moisture history",
      "Existing damage or contamination concerns",
      "Ventilation and drying conditions",
    ],
    related: [
      { slug: "upholstery-cleaning", label: "Upholstery cleaning" },
      { slug: "curtain-cleaning", label: "Curtain cleaning" },
      { slug: "carpet-cleaning", label: "Carpet cleaning" },
    ],
  },
  "carpet-cleaning": {
    lead: "Professional carpet cleaning should match the carpet fibre, backing, installation and level of soiling. The assessment is used to identify the practical treatment path and any areas that need special attention.",
    commonRequests: [
      "Fitted carpet cleaning",
      "High-use residential and office areas",
      "Spot and traffic-lane attention",
      "Carpet cleaning combined with curtains or upholstery",
    ],
    decisionPoints: [
      "Fibre and backing type",
      "Installation and subfloor considerations",
      "Traffic patterns and staining",
      "Access and drying conditions",
    ],
    related: [
      { slug: "upholstery-cleaning", label: "Upholstery cleaning" },
      { slug: "rug-care", label: "Rug care" },
      { slug: "curtain-cleaning", label: "Curtain cleaning" },
    ],
  },
  "rug-care": {
    lead: "Rugs require more caution than treating them as small carpets. Fibre, dyes, construction, backing, age and value all influence whether and how a rug should be cleaned.",
    commonRequests: [
      "Area-rug cleaning assessment",
      "Persian and Oriental rug care",
      "Delicate or higher-value rug inspection",
      "General soil, spots and odour concerns",
    ],
    decisionPoints: [
      "Fibre, dyes and construction",
      "Age, value and existing wear",
      "Backing and fringe condition",
      "Whether on-site or specialist off-site care is appropriate",
    ],
    related: [
      { slug: "carpet-cleaning", label: "Carpet cleaning" },
      { slug: "upholstery-cleaning", label: "Upholstery cleaning" },
      { slug: "fabric-protection", label: "Fabric protection" },
    ],
  },
  "fabric-protection": {
    lead: "Fabric protection is considered only after the textile and its intended use are assessed. It can help some suitable textiles resist everyday spills and soiling, but it is not a substitute for correct cleaning and maintenance.",
    commonRequests: [
      "Protection after professional cleaning",
      "High-use upholstery and soft furnishings",
      "Curtains and selected textile surfaces",
      "Residential and commercial maintenance planning",
    ],
    decisionPoints: [
      "Textile compatibility",
      "Previous coatings or treatments",
      "Expected wear and use",
      "Realistic maintenance expectations",
    ],
    related: [
      { slug: "curtain-cleaning", label: "Curtain cleaning" },
      { slug: "upholstery-cleaning", label: "Upholstery cleaning" },
      { slug: "carpet-cleaning", label: "Carpet cleaning" },
    ],
  },
  "fire-retardant-treatment": {
    lead: "Fire-retardant textile treatment is a commercial scope that requires careful confirmation of the textile, required standard, treatment system and documentation before any compliance representation is made.",
    commonRequests: [
      "Commercial curtain and drape treatment enquiries",
      "Venue, theatre and hospitality textile requirements",
      "Assessment of existing textile condition",
      "Documentation and maintenance planning discussions",
    ],
    decisionPoints: [
      "Applicable standard and client requirement",
      "Textile composition and previous treatments",
      "Treatment-system suitability",
      "Testing, documentation and renewal requirements",
    ],
    related: [
      { slug: "curtain-cleaning", label: "Curtain cleaning" },
      { slug: "fabric-protection", label: "Fabric protection" },
    ],
  },
};
