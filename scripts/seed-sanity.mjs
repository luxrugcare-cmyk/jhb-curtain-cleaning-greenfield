const projectId = "g5y9wcb1";
const dataset = "production";
const apiVersion = "v2026-08-13";
const token = process.env.SANITY_CONTENT_WRITE_TOKEN;

if (!token) throw new Error("SANITY_CONTENT_WRITE_TOKEN is required");

const services = [
  ["curtain-cleaning", "Curtain Cleaning", "Specialist on-site cleaning while curtains remain hanging."],
  ["blind-cleaning", "Blind Cleaning", "Careful treatment for fitted blinds and window coverings."],
  ["upholstery-cleaning", "Upholstery Cleaning", "Fabric-safe cleaning for sofas, chairs and upholstered pieces."],
  ["mattress-cleaning", "Mattress Cleaning", "Deep fabric hygiene treatment for residential and commercial spaces."],
  ["carpet-cleaning", "Carpet Cleaning", "Professional care for fitted carpets and high-use areas."],
  ["rug-care", "Rug Care", "Specialist cleaning pathways for valuable and delicate rugs."],
  ["fabric-protection", "Fabric Protection", "Protective treatment to help textiles resist spills and soiling."],
  ["fire-retardant-treatment", "Fire-Retardant Treatment", "Commercial textile treatment workflows subject to final compliance validation."],
];

const sectors = [
  ["hotels-hospitality", "Hotels & Hospitality", "Guest-room and public-area textile care designed around operations."],
  ["offices-corporate", "Offices & Corporate", "Scheduled textile maintenance with minimal workplace disruption."],
  ["healthcare", "Healthcare", "Controlled, documented care for sensitive environments."],
  ["education", "Education", "Planned service for schools, campuses and institutions."],
  ["venues-theatres", "Venues & Theatres", "Specialist care for stage curtains, drapes and public spaces."],
  ["property-facilities", "Property & Facilities Management", "Repeatable service across properties, portfolios and managed sites."],
];

const areas = ["Johannesburg", "Sandton", "Randburg", "Roodepoort", "Fourways", "Midrand"].map((title) => [
  title.toLowerCase().replaceAll(" ", "-"),
  title,
  `On-site textile care in ${title}.`,
]);

const makeDoc = (type, [slug, title, summary]) => ({
  _id: `seed.${type}.${slug}`,
  _type: type,
  title,
  slug: { _type: "slug", current: slug },
  summary,
  seo: {
    _type: "seo",
    title: `${title} | JHB Curtain Cleaning`,
    description: summary,
    noIndex: false,
  },
});

const docs = [
  ...services.map((item) => makeDoc("service", item)),
  ...sectors.map((item) => makeDoc("sector", item)),
  ...areas.map((item) => makeDoc("area", item)),
];

const mutateUrl = `https://${projectId}.api.sanity.io/${apiVersion}/data/mutate/${dataset}?returnIds=true&tag=jhb-initial-seed`;
const mutateResponse = await fetch(mutateUrl, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ mutations: docs.map((doc) => ({ createIfNotExists: doc })) }),
});

if (!mutateResponse.ok) {
  throw new Error(`Sanity seed mutation failed (${mutateResponse.status}): ${await mutateResponse.text()}`);
}

const mutation = await mutateResponse.json();
console.log(`Seed transaction: ${mutation.transactionId}`);
console.log(`Seed mutations accepted: ${mutation.results?.length ?? 0}`);

const query = encodeURIComponent('*[_id match "seed.*"]{_id,_type,title,"slug":slug.current} | order(_id asc)');
const queryUrl = `https://${projectId}.api.sanity.io/${apiVersion}/data/query/${dataset}?query=${query}`;
const queryResponse = await fetch(queryUrl, {
  headers: { Authorization: `Bearer ${token}` },
});
if (!queryResponse.ok) {
  throw new Error(`Sanity verification query failed (${queryResponse.status}): ${await queryResponse.text()}`);
}
const queryBody = await queryResponse.json();
const found = Array.isArray(queryBody.result) ? queryBody.result : [];
const counts = found.reduce((acc, doc) => {
  acc[doc._type] = (acc[doc._type] || 0) + 1;
  return acc;
}, {});
if (found.length !== 20 || counts.service !== 8 || counts.sector !== 6 || counts.area !== 6) {
  throw new Error(`Sanity seed verification failed: total=${found.length}, counts=${JSON.stringify(counts)}`);
}
console.log(`Verified ${found.length} seeded documents: ${JSON.stringify(counts)}`);
