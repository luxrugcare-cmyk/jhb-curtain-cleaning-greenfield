export type AreaIntent = {
  title: string;
  intro: string;
  localFactors: Array<{ title: string; body: string }>;
  nearby: string[];
};

const areaIntent: Record<string, AreaIntent> = {
  johannesburg: {
    title: "Curtain and textile cleaning across Johannesburg",
    intro: "Johannesburg properties range from apartments and family homes to offices, hotels, healthcare sites and large managed facilities. Our assessment-led approach is designed to match the textile, installation and operating needs of the property before a cleaning method is recommended.",
    localFactors: [
      { title: "High-use interiors", body: "Busy homes, offices and hospitality spaces can accumulate dust and handling soil quickly. Service scope should reflect how the room is actually used." },
      { title: "Access and scheduling", body: "Multi-storey buildings, security procedures, parking and operating hours can affect access. Commercial assessments capture these details before scheduling." },
      { title: "Installed window treatments", body: "Curtains and blinds are often sized and fitted specifically for the property. Where suitable, on-site treatment can avoid unnecessary removal and refitting." },
      { title: "Mixed textile requirements", body: "A single property may include curtains, upholstery, carpets, mattresses and rugs. The assessment can identify which items can be grouped into one practical scope." },
    ],
    nearby: ["Sandton", "Randburg", "Roodepoort", "Fourways", "Midrand"],
  },
  sandton: {
    title: "Curtain and textile cleaning for Sandton homes and businesses",
    intro: "Sandton combines high-end residential properties with offices, hotels, apartments and commercial facilities. The service is planned around fabric suitability, access, room availability and the level of disruption the property can accommodate.",
    localFactors: [
      { title: "Premium and delicate textiles", body: "Designer fabrics, layered curtains and specialist finishes require a cautious assessment before treatment. Fabric protection takes priority over aggressive cleaning." },
      { title: "Apartments and estates", body: "Access rules, lifts, parking, security and working-hour restrictions should be confirmed before the appointment." },
      { title: "Hotels and offices", body: "Commercial work can be scoped around occupied rooms, meeting spaces and operating hours so that cleaning is sequenced practically." },
      { title: "On-site convenience", body: "Where the textile is suitable, cleaning curtains in place can reduce removal, transport and refitting logistics." },
    ],
    nearby: ["Johannesburg", "Randburg", "Fourways", "Midrand"],
  },
  roodepoort: {
    title: "Curtain and textile cleaning in Roodepoort",
    intro: "Roodepoort includes established family homes, estates, apartments, offices and commercial properties. We assess the textile and installation first, then plan an on-site service around the condition of the fabric and the practical needs of the property.",
    localFactors: [
      { title: "Residential curtain care", body: "Sun exposure, dust, pets, cooking residue and everyday handling can affect curtain condition. Existing fading or fibre damage is identified before cleaning expectations are set." },
      { title: "Whole-room scopes", body: "Curtains are often cleaned alongside upholstery, carpets, mattresses or rugs when a broader interior refresh is required." },
      { title: "Estates and access", body: "Security access and appointment details can be confirmed in advance to reduce avoidable delays on the day." },
      { title: "Commercial properties", body: "Offices, schools, healthcare sites and managed properties can use the commercial assessment path to capture access, scheduling and repeat-service requirements." },
    ],
    nearby: ["Johannesburg", "Randburg", "Sandton"],
  },
  randburg: {
    title: "Curtain and textile cleaning in Randburg",
    intro: "Randburg includes family homes, apartments, offices, schools and managed properties across established residential and commercial nodes. We assess fabric condition, installation, access and the wider room scope before recommending an on-site treatment path.",
    localFactors: [
      { title: "Established interiors", body: "Older curtains and linings may show sun exposure, weakened seams or previous cleaning effects. Condition is checked before treatment expectations are agreed." },
      { title: "Home and office scopes", body: "Curtains, blinds, upholstery and carpets can often be assessed together when a property needs a coordinated interior-cleaning plan." },
      { title: "Access planning", body: "Apartments, complexes and business premises can involve security, parking or operating-hour constraints that are best captured before the service date." },
      { title: "Local commercial needs", body: "Schools, offices and managed facilities can use the commercial assessment path when repeat scheduling, room sequencing or documentation matters." },
    ],
    nearby: ["Johannesburg", "Sandton", "Roodepoort", "Fourways"],
  },
  fourways: {
    title: "Curtain and textile cleaning in Fourways",
    intro: "Fourways properties often include estates, apartments, family homes, hospitality venues and commercial spaces. The service is scoped around the textile, room use, access requirements and whether the work can be completed efficiently while furnishings remain in place.",
    localFactors: [
      { title: "Estates and complexes", body: "Gate access, visitor procedures and appointment timing should be confirmed in advance so the technician can reach the property without avoidable delays." },
      { title: "Large windows and fitted curtains", body: "Full-height curtains and fitted window treatments can be cumbersome to remove. Where suitable, on-site treatment can reduce handling and refitting logistics." },
      { title: "Family living spaces", body: "Curtains are frequently assessed alongside sofas, carpets, mattresses or rugs when the objective is a broader interior refresh." },
      { title: "Commercial and hospitality spaces", body: "Restaurants, offices, accommodation and managed properties may need work sequenced around trading hours or guest access." },
    ],
    nearby: ["Sandton", "Randburg", "Midrand", "Johannesburg"],
  },
  midrand: {
    title: "Curtain and textile cleaning in Midrand",
    intro: "Midrand combines residential estates and apartments with offices, healthcare, education, hospitality and large commercial sites. Assessments therefore consider both fabric suitability and practical site factors such as access, operating hours and the number of rooms or items involved.",
    localFactors: [
      { title: "Residential estates", body: "Security access, parking and appointment timing can be planned before arrival, especially for larger estate or apartment developments." },
      { title: "Corporate and managed sites", body: "Multi-room and repeat-service work benefits from a written scope covering access, sequencing, textiles and any areas that must remain operational." },
      { title: "Mixed textile inventories", body: "Curtains, blinds, upholstery, carpets and mattresses can be assessed as one property-wide scope where that is more practical." },
      { title: "Operational scheduling", body: "Commercial work can be arranged around room availability and site rules rather than treating every area as an isolated appointment." },
    ],
    nearby: ["Sandton", "Fourways", "Johannesburg"],
  },
};

export function getAreaIntent(slug: string) {
  return areaIntent[slug] ?? null;
}
