const routes = [
  "/",
  "/residential",
  "/commercial",
  "/services",
  "/results",
  "/advice",
  "/about",
  "/contact",
  "/quote",
  "/commercial-assessment",
  "/privacy",
  "/advice/how-often-should-curtains-be-cleaned",
  "/advice/cleaning-blackout-lined-delicate-curtains",
  "/advice/hotel-curtain-cleaning-maintenance-guide",
  "/advice/curtain-cleaning-prices",
  "/advice/how-on-site-curtain-cleaning-works",
  "/advice/can-curtains-be-cleaned-without-taking-them-down",
  "/advice/curtain-cleaning-vs-washing-vs-dry-cleaning",
  "/advice/carpet-cleaning-guide",
  "/advice/rug-and-persian-rug-cleaning-guide",
  "/advice/mattress-cleaning-guide",
  "/advice/upholstery-couch-cleaning-guide",
  "/advice/blind-cleaning-guide",
  "/services/curtain-cleaning",
  "/services/blind-cleaning",
  "/services/upholstery-cleaning",
  "/services/mattress-cleaning",
  "/services/rug-care",
  "/services/fabric-protection",
  "/services/carpet-cleaning",
  "/services/fire-retardant-treatment",
  "/commercial/hotels-hospitality",
  "/commercial/offices-corporate",
  "/commercial/healthcare",
  "/commercial/education",
  "/commercial/venues-theatres",
  "/commercial/property-facilities",
  "/areas/johannesburg",
  "/areas/sandton",
  "/areas/randburg",
  "/areas/roodepoort",
  "/areas/fourways",
  "/areas/midrand",
];

const BASE = "http://localhost:9999";

async function main() {
  console.log(`Starting full-site route audit across ${routes.length} routes on ${BASE}...`);
  let passed = 0;
  let failed = 0;

  for (const path of routes) {
    const url = `${BASE}${path}`;
    try {
      const res = await fetch(url);
      if (res.status === 200) {
        console.log(`✓ [200 OK] ${path}`);
        passed++;
      } else {
        console.error(`✗ [${res.status}] ${path}`);
        failed++;
      }
    } catch (err) {
      console.error(`✗ [ERROR] ${path}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nAudit Complete: ${passed}/${routes.length} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

main();
