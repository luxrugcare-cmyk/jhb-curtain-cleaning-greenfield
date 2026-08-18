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
    nearby: ["Sandton", "Randburg", "Roodepoort", "Fourways", "Midrand", "Rosebank", "Bryanston"],
  },
  sandton: {
    title: "Curtain and textile cleaning for Sandton homes and businesses",
    intro: "Sandton combines high-end residential properties (Sandhurst, Inanda, Morningside) with premier corporate headquarters, luxury hotels (The Leonardo, The Maslow, Michelangelo), and high-rise apartments. The service is planned around delicate fabric protection, strict estate protocols, and zero room downtime.",
    localFactors: [
      { title: "Premium and delicate textiles", body: "Designer fabrics, interlined silks, velvet drapes, and motorized ceiling tracks require a cautious assessment. Fabric protection and non-shrinkage methods take priority." },
      { title: "Gated estates and high-rises", body: "Security procedures, lift reservations, basement clearances, and strict HOA working-hour rules are planned and confirmed before arrival." },
      { title: "Hotels and corporate suites", body: "Commercial work is phased around 10:00–14:00 guest turnover windows or completed after-hours to avoid operational downtime." },
      { title: "On-site convenience", body: "Treating curtains while hanging eliminates the risk of motorized track motor damage, lost hooks, or distorted pleat memory." },
    ],
    nearby: ["Johannesburg", "Rosebank", "Bryanston", "Randburg", "Fourways"],
  },
  rosebank: {
    title: "Curtain and textile cleaning in Rosebank & Parks Suburbs",
    intro: "Rosebank is one of Gauteng's most vibrant commercial and lifestyle hubs, spanning modern Oxford Parks corporate precincts, luxury apartment buildings, boutique guest houses, and heritage residences across Parktown North, Saxonwold, and Dunkeld.",
    localFactors: [
      { title: "Boutique hotels and guest lodges", body: "High-occupancy guest houses and boutique hotels benefit from same-day in-situ drapery cleaning with zero room closures." },
      { title: "Heritage and character homes", body: "Classic bay windows, custom velvet drapes, and delicate linen interlinings require gentle dry extraction and hand-finishing." },
      { title: "Modern high-density apartments", body: "Floor-to-ceiling glass and heavy blackout drapes require low-moisture extraction to protect acrylic backings from peeling." },
      { title: "Corporate office nodes", body: "Oxford Parks and Jan Smuts Avenue boardrooms are serviced after-hours with full compliance documentation." },
    ],
    nearby: ["Sandton", "Johannesburg", "Randburg", "Bryanston"],
  },
  bryanston: {
    title: "Curtain and textile cleaning in Bryanston & River Club",
    intro: "Bryanston is characterized by sprawling luxury homes, secure cluster estates, double-volume ceilings, expansive glass facades, and bustling corporate office parks along William Nicol (Winnie Mandela) Drive and Main Road.",
    localFactors: [
      { title: "Double-volume & 5m+ drops", body: "Tall double-volume window treatments and motorized curtain tracks are cleaned in place using mobile elevated staging without dismantling hardware." },
      { title: "Cluster estate security", body: "Technicians adhere to strict estate security protocols, biometric visitor gates, and quiet-hour regulations in high-end Bryanston enclosures." },
      { title: "Open-plan indoor-outdoor living", body: "Large sliding doors opening to gardens and pools increase dust and pollen ingress, requiring 6–12 month maintenance intervals." },
      { title: "Office parks and corporate suites", body: "Commercial textile maintenance scheduled over weekends to ensure zero employee distraction." },
    ],
    nearby: ["Sandton", "Fourways", "Randburg", "Midrand"],
  },
  roodepoort: {
    title: "Curtain and textile cleaning in Roodepoort & West Rand",
    intro: "Roodepoort includes established family homes, gated estates (Eagle Canyon, Featherbrooke), apartments, offices, and commercial properties. We assess the textile and installation first, then plan an on-site service around fabric health and property access.",
    localFactors: [
      { title: "Residential curtain care", body: "Sun exposure, red Highveld dust, pets, and everyday handling can affect curtain condition. Existing fading or fibre damage is identified before cleaning." },
      { title: "Whole-room scopes", body: "Curtains are often cleaned alongside upholstery, carpets, mattresses, or rugs when a broader interior refresh is required." },
      { title: "Secure estates (Eagle Canyon)", body: "Gate access and appointment timing are confirmed in advance to ensure smooth entry and punctual service." },
      { title: "Commercial properties", body: "Offices, schools, healthcare clinics, and managed properties benefit from structured line-item maintenance proposals." },
    ],
    nearby: ["Johannesburg", "Randburg", "Sandton"],
  },
  randburg: {
    title: "Curtain and textile cleaning in Randburg & Northcliff",
    intro: "Randburg includes family homes, apartments, offices, schools, and media studios across established residential nodes such as Northcliff, Linden, Ferndale, and Blairgowrie.",
    localFactors: [
      { title: "Established interiors", body: "Older curtains and linings may show sun exposure, weakened seams, or previous wash wear. Condition is checked before treatment." },
      { title: "Home and office scopes", body: "Curtains, blinds, upholstery, and carpets can often be assessed together for a coordinated interior refresh." },
      { title: "Access planning", body: "Apartments, business parks, and residential complexes involve security and parking details captured before the service date." },
      { title: "Local commercial needs", body: "Schools, studios, offices, and care facilities receive documented, scheduled on-site textile care." },
    ],
    nearby: ["Johannesburg", "Sandton", "Roodepoort", "Bryanston"],
  },
  fourways: {
    title: "Curtain and textile cleaning in Fourways & Dainfern",
    intro: "Fourways properties encompass prestigious lifestyle estates (Dainfern, Steyn City, Helderfontein), modern apartments, hospitality venues, and bustling retail corridors.",
    localFactors: [
      { title: "Prestige lifestyle estates", body: "Steyn City, Dainfern, and Cedar Lakes require strict estate protocol adherence, verified contractor documentation, and discreet white-glove service." },
      { title: "Large windows & bespoke drapes", body: "Floor-to-ceiling glass drapes and motorized pelmets are safely cleaned hanging in-situ, preventing costly removal damage." },
      { title: "Family living spaces", body: "Curtains are frequently assessed alongside sofas, carpets, and mattresses for comprehensive indoor allergen reduction." },
      { title: "Hospitality and venues", body: "Restaurants, boutique accommodation, and event venues scheduled around guest arrivals and trading hours." },
    ],
    nearby: ["Sandton", "Bryanston", "Midrand", "Johannesburg"],
  },
  midrand: {
    title: "Curtain and textile cleaning in Midrand & Waterfall",
    intro: "Midrand combines elite equestrian estates (Saddlebrook, Blue Hills) and modern developments (Waterfall City) with corporate headquarters, logistics hubs, and private clinics.",
    localFactors: [
      { title: "Equestrian & lifestyle estates", body: "Properties in Saddlebrook and Kyalami face atmospheric paddock dust and fine topsoil, requiring specialist deep extraction." },
      { title: "Waterfall City corporate nodes", body: "High-tech corporate office towers and boardrooms serviced after-hours with POPIA-compliant service logs." },
      { title: "Mixed textile inventories", body: "Curtains, blinds, acoustic wall fabrics, and executive seating grouped into a unified commercial maintenance plan." },
      { title: "High-efficiency scheduling", body: "Appointments scheduled flexibly to align with estate access hours and commercial security clearances." },
    ],
    nearby: ["Sandton", "Fourways", "Pretoria", "Johannesburg"],
  },
  pretoria: {
    title: "Curtain and textile cleaning in Pretoria & Tshwane",
    intro: "Pretoria combines diplomatic residences, embassies (Waterkloof, Brooklyn), government facilities, corporate guest houses, and luxury residential estates (Silver Lakes, Woodhill, Mooikloof).",
    localFactors: [
      { title: "Diplomatic and embassy residences", body: "Strict security protocols, formal reception drapery, and high-value interlined silks treated with white-glove confidentiality." },
      { title: "Government & institutional sites", body: "Large-format auditoriums, stage curtains, and council chambers serviced with full SANS flame-retardant compliance records." },
      { title: "Luxury golf & country estates", body: "Silver Lakes, Woodhill, and Cornwall Hill double-volume drapes cleaned on-site without removal or transport risk." },
      { title: "Scheduled regional dispatch", body: "Coordinated service days across Tshwane ensuring punctual arrival and full equipment staging." },
    ],
    nearby: ["Midrand", "Centurion", "Johannesburg", "Sandton"],
  },
};

export function getAreaIntent(slug: string) {
  return areaIntent[slug] ?? null;
}
