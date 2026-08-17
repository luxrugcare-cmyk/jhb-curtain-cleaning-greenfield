import { dispatchAgentMailLeadNotification, sendAgentMailMessage } from "../integrations/agentmail/client";
import type { LeadPayload } from "../types/lead";

async function runTests() {
  console.log("=========================================");
  console.log("RUNNING AGENTMAIL INTEGRATION TEST SUITE");
  console.log("=========================================");

  // Test 1: Direct Message Dispatch
  console.log("\n[TEST 1] Testing direct email dispatch...");
  try {
    const directResult = await sendAgentMailMessage({
      to: "info@jhbcurtaincleaning.co.za",
      subject: "Test 1: Direct AgentMail Dispatch",
      text: "This is a direct test message from the Next.js AgentMail adapter.",
    });
    console.log("PASS Direct message dispatch succeeded:", directResult);
  } catch (error) {
    console.error("FAIL Direct message dispatch failed:", error);
    process.exitCode = 1;
  }

  // Test 2: Structured Lead Notification Dispatch
  console.log("\n[TEST 2] Testing structured lead notification dispatch...");
  const sampleLead: LeadPayload = {
    requestId: "test-req-" + Date.now(),
    kind: "residential",
    name: "Martha North",
    mobile: "+27750119200",
    email: "test.lead@jhbcurtaincleaning.co.za",
    service: "Curtain & Blind Cleaning",
    location: "Sandton, Johannesburg",
    scope: "3 large lounge curtains, dry clean and fabric protect",
    preferredContact: "whatsapp",
  };

  try {
    const leadResult = await dispatchAgentMailLeadNotification(sampleLead);
    console.log("PASS Lead notification dispatch succeeded:", leadResult);
  } catch (error) {
    console.error("FAIL Lead notification dispatch failed:", error);
    process.exitCode = 1;
  }

  console.log("\n=========================================");
  console.log("AGENTMAIL INTEGRATION TEST SUITE COMPLETE");
  console.log("=========================================");
}

runTests().catch(err => {
  console.error("Unhandled test runner error:", err);
  process.exit(1);
});
