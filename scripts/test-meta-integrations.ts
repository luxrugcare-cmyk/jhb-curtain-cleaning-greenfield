import { metaWhatsApp } from "../lib/meta-whatsapp";
import { metaCapi } from "../lib/meta-capi";
import { acceptLead } from "../lib/lead-service";

async function runMetaTests() {
  console.log("=========================================");
  console.log("RUNNING META & WHATSAPP INTEGRATION TEST SUITE");
  console.log("=========================================\n");

  let passed = 0;
  let failed = 0;

  // TEST 1: Webhook Hub Challenge Verification
  console.log("[TEST 1] Testing WhatsApp Webhook Verification (GET hub.challenge)...");
  const challenge = "test_hub_challenge_123456";
  const verified = metaWhatsApp.verifyWebhook("subscribe", "jhb_curtain_cleaning_meta_2026", challenge);
  if (verified === challenge) {
    console.log("PASS Webhook verification succeeded with matching token & challenge.");
    passed++;
  } else {
    console.error(`FAIL Webhook verification failed. Received: ${verified}`);
    failed++;
  }

  // TEST 2: WhatsApp Text Dispatch (Stub / Production Mode)
  console.log("\n[TEST 2] Testing WhatsApp Text Message Dispatcher...");
  const textRes = await metaWhatsApp.sendTextMessage("27750119200", "Hi Stephen, testing WhatsApp Cloud API integration.");
  if (textRes.ok) {
    console.log(`PASS WhatsApp message dispatch succeeded: ${JSON.stringify(textRes)}`);
    passed++;
  } else {
    console.error(`FAIL WhatsApp dispatch failed: ${textRes.error}`);
    failed++;
  }

  // TEST 3: WhatsApp Interactive Menu Dispatch
  console.log("\n[TEST 3] Testing WhatsApp Interactive Menu Buttons...");
  const menuRes = await metaWhatsApp.sendInteractiveMenu(
    "27750119200",
    "JHB Curtain Cleaning",
    "Select your service inquiry:",
    [
      { id: "opt_residential", title: "Residential Clean" },
      { id: "opt_commercial", title: "Commercial / Hotel" },
      { id: "opt_trade", title: "10% Trade Partner" },
    ]
  );
  if (menuRes.ok) {
    console.log(`PASS WhatsApp interactive menu dispatch succeeded: ${JSON.stringify(menuRes)}`);
    passed++;
  } else {
    console.error(`FAIL WhatsApp interactive menu failed: ${menuRes.error}`);
    failed++;
  }

  // TEST 4: Meta Conversions API (CAPI) Serialization & Hashing
  console.log("\n[TEST 4] Testing Meta Conversions API (CAPI) Server-Side Event Tracking...");
  const capiRes = await metaCapi.trackEvent({
    eventName: "Lead",
    userData: {
      email: "test.partner@hydeparkinteriors.co.za",
      phone: "+27 82 555 1234",
      firstName: "Claire",
      lastName: "Van Zyl",
      city: "Sandton",
      country: "za",
    },
    customData: {
      lead_type: "trade_partner",
      value: 1200.0,
      currency: "ZAR",
    },
  });
  if (capiRes.ok) {
    console.log(`PASS Meta CAPI Lead event tracked successfully: ${JSON.stringify(capiRes)}`);
    passed++;
  } else {
    console.error(`FAIL Meta CAPI event failed: ${capiRes.error}`);
    failed++;
  }

  // TEST 5: Full Lead Acceptance with Meta CAPI Integration
  console.log("\n[TEST 5] Testing End-to-End Lead Ingestion with Meta CAPI Event Trigger...");
  try {
    const leadResult = await acceptLead({
      kind: "residential",
      name: "Sarah Jenkins",
      mobile: "+27 83 999 4444",
      email: "sarah.jenkins@sandhurstestate.co.za",
      location: "Sandhurst, Sandton",
      scope: "Double volume silk drapes living room",
    });
    if (leadResult.leadId && leadResult.acceptedAt) {
      console.log(`PASS Full lead accepted and CAPI event fired: Lead ID ${leadResult.leadId}`);
      passed++;
    } else {
      console.error("FAIL Lead acceptance missing fields.");
      failed++;
    }
  } catch (err: any) {
    console.error(`FAIL Lead acceptance threw: ${err.message}`);
    failed++;
  }

  console.log("\n=========================================");
  console.log(`META & WHATSAPP TEST SUITE: ${passed}/5 PASSED, ${failed} FAILED`);
  console.log("=========================================\n");

  if (failed > 0) process.exit(1);
}

runMetaTests().catch((e) => {
  console.error("Fatal Meta test failure:", e);
  process.exit(1);
});
