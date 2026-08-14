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
};

export function getAreaIntent(slug: string) {
  return areaIntent[slug] ?? null;
}
