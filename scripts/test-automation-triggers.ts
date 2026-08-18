import { automationTriggers } from "../lib/automation-triggers";

async function runAutomationTriggerTests() {
  console.log("=========================================");
  console.log("AUTOMATED TRIGGER & LIFECYCLE WORKFLOW TEST SUITE");
  console.log("=========================================\n");

  let passed = 0;
  let failed = 0;

  // TEST 1: Residential Quote Welcome Trigger
  console.log("[TEST 1] Testing Residential Quote Welcome Trigger Response...");
  const res1 = await automationTriggers.handleResidentialWelcome({
    kind: "residential",
    name: "Elena Rostova",
    email: "elena.rostova@sandhurst.co.za",
    mobile: "+27 82 123 4567",
    location: "Sandhurst, Sandton",
    scope: "Double volume 5.5m velvet curtains in formal lounge",
  });
  if (res1.eventType === "residential_welcome" && res1.agentMailNotified) {
    console.log(`PASS Residential welcome trigger dispatched successfully: ${JSON.stringify(res1.details)}`);
    passed++;
  } else {
    console.error(`FAIL Residential welcome failed: ${JSON.stringify(res1)}`);
    failed++;
  }

  // TEST 2: Commercial Assessment Protocol Trigger
  console.log("\n[TEST 2] Testing Commercial & Hospitality Assessment Protocol Trigger Response...");
  const res2 = await automationTriggers.handleCommercialProtocol({
    kind: "commercial",
    name: "David Sterling",
    organisation: "The Leonardo Sandton",
    email: "dsterling@theleonardo.co.za",
    mobile: "+27 11 555 9000",
    location: "Sandton CBD",
    sector: "Hotels & Hospitality",
    scope: "24 guest suites on-site curtain cleaning between 10:00 and 14:00",
  });
  if (res2.eventType === "commercial_protocol" && res2.agentMailNotified) {
    console.log(`PASS Commercial protocol trigger dispatched successfully: ${JSON.stringify(res2.details)}`);
    passed++;
  } else {
    console.error(`FAIL Commercial protocol failed: ${JSON.stringify(res2)}`);
    failed++;
  }

  // TEST 3: 10% Trade Partner Welcome Trigger
  console.log("\n[TEST 3] Testing 10% Trade Partner Registration & Welcome Kit Trigger...");
  const res3 = await automationTriggers.handleTradePartnerWelcome({
    name: "Claire Van Zyl",
    studioName: "Hyde Park Interiors",
    email: "claire@hydeparkinteriors.co.za",
    mobile: "+27 82 888 1234",
  });
  if (res3.eventType === "trade_partner_welcome" && res3.details.partnerCode) {
    console.log(`PASS Trade partner welcome kit generated with Partner Code: ${res3.details.partnerCode}`);
    passed++;
  } else {
    console.error(`FAIL Trade partner welcome failed: ${JSON.stringify(res3)}`);
    failed++;
  }

  // TEST 4: 5-Star Review Solicitation Trigger
  console.log("\n[TEST 4] Testing Service Completed & 5-Star Review Solicitation Trigger...");
  const res4 = await automationTriggers.handleServiceCompletedReview({
    name: "Marcus Thorne",
    email: "marcus.thorne@bryanston.co.za",
    mobile: "+27 83 777 6655",
    location: "Bryanston",
  });
  if (res4.eventType === "service_completed_review" && res4.details.reviewUrl) {
    console.log(`PASS 5-Star Google review trigger dispatched: ${res4.details.reviewUrl}`);
    passed++;
  } else {
    console.error(`FAIL Review solicitation failed: ${JSON.stringify(res4)}`);
    failed++;
  }

  // TEST 5: Annual Highveld Dust Storm Seasonal Reminder Trigger
  console.log("\n[TEST 5] Testing Annual Highveld Dust Season Reminder Trigger...");
  const res5 = await automationTriggers.handleAnnualDustReminder({
    name: "Jennifer Adams",
    email: "jennifer.adams@fourways.co.za",
    mobile: "+27 82 444 3322",
    location: "Fourways Gardens",
  });
  if (res5.eventType === "annual_dust_reminder") {
    console.log(`PASS Annual seasonal dust storm reminder dispatched for: ${res5.details.client}`);
    passed++;
  } else {
    console.error(`FAIL Annual reminder failed: ${JSON.stringify(res5)}`);
    failed++;
  }

  console.log("\n=========================================");
  console.log(`AUTOMATION TRIGGER TEST SUITE: ${passed}/5 PASSED, ${failed} FAILED`);
  console.log("=========================================\n");

  if (failed > 0) process.exit(1);
}

runAutomationTriggerTests().catch((err) => {
  console.error("Fatal Trigger test error:", err);
  process.exit(1);
});
