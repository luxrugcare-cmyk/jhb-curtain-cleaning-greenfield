import { acceptLead, type LeadDependencies } from "@/lib/lead-service";
import { LeadProcessingError } from "@/lib/errors";
import type { LeadPayload } from "@/types/lead";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const payload: LeadPayload = {
  requestId: "resilience-e2e",
  kind: "residential",
  name: "Resilience E2E",
  email: "info@jhbcurtaincleaning.co.za",
  mobile: "+27750119200",
  location: "Roodepoort, Johannesburg",
  privacyNoticeVersion: "2026-08-v1",
  marketingConsent: false,
};

const okCrm = async () => ({ ok: true, mode: "test", externalId: "person-test" });
const okAck = async () => ({ ok: true, mode: "test", id: "ack-test" });
const okInternal = async () => ({ ok: true, mode: "test", id: "internal-test" });
const okAgentMail = async () => ({ ok: true, mode: "test", messageId: "agentmail-test" });
const okArchive = async () => ({ archived: true, pathname: "recovery/test.json" });
const noArchive = async () => ({ archived: false, mode: "log-only" });
const okAutomation = async () => ({ ok: true, mode: "not-configured" });

function deps(overrides: Partial<LeadDependencies>): LeadDependencies {
  return {
    upsertLeadInAttio: okCrm,
    sendLeadAcknowledgement: okAck,
    sendInternalLeadNotification: okInternal,
    dispatchAgentMailLeadNotification: okAgentMail,
    archiveFailedLead: okArchive,
    dispatchLeadAutomation: okAutomation,
    ...overrides,
  } as unknown as LeadDependencies;
}

async function main() {
  const crmDown = await acceptLead(payload, deps({
    upsertLeadInAttio: async () => { throw new Error("simulated Attio outage"); },
  }));
  assert((crmDown.crm as { ok?: boolean }).ok === false, "CRM failure should be reported in metadata");
  assert((crmDown.acknowledgement as { ok?: boolean }).ok === true, "Acknowledgement should still send when CRM fails");
  assert((crmDown.internalNotification as { ok?: boolean }).ok === true, "Internal notification should still send when CRM fails");
  assert((crmDown.recovery as { archived?: boolean } | null)?.archived === true, "CRM outage should trigger recovery archive");
  console.log("PASS CRM unavailable: lead remains durable and recovery is archived");

  const resendDown = await acceptLead(payload, deps({
    sendLeadAcknowledgement: async () => { throw new Error("simulated Resend acknowledgement outage"); },
    sendInternalLeadNotification: async () => { throw new Error("simulated Resend internal outage"); },
  }));
  assert((resendDown.crm as { ok?: boolean }).ok === true, "CRM should persist when Resend is unavailable");
  assert((resendDown.acknowledgement as { ok?: boolean }).ok === false, "Acknowledgement failure should be reported");
  assert((resendDown.internalNotification as { ok?: boolean }).ok === false, "Internal notification failure should be reported");
  assert((resendDown.recovery as { archived?: boolean } | null)?.archived === true, "Resend outage should trigger recovery archive");
  console.log("PASS Resend unavailable: CRM persists and recovery is archived");

  const archiveOnly = await acceptLead(payload, deps({
    upsertLeadInAttio: async () => { throw new Error("simulated Attio outage"); },
    sendLeadAcknowledgement: async () => { throw new Error("simulated Resend acknowledgement outage"); },
    sendInternalLeadNotification: async () => { throw new Error("simulated Resend internal outage"); },
    dispatchAgentMailLeadNotification: async () => { throw new Error("simulated AgentMail outage"); },
  }));
  assert((archiveOnly.recovery as { archived?: boolean } | null)?.archived === true, "Private recovery archive should be sufficient durability when primary delivery paths fail");
  console.log("PASS primary delivery outage: private recovery archive preserves acceptance");

  let rejected = false;
  try {
    await acceptLead(payload, deps({
      upsertLeadInAttio: async () => { throw new Error("simulated Attio outage"); },
      sendLeadAcknowledgement: async () => { throw new Error("simulated Resend acknowledgement outage"); },
      sendInternalLeadNotification: async () => { throw new Error("simulated Resend internal outage"); },
      dispatchAgentMailLeadNotification: async () => { throw new Error("simulated AgentMail outage"); },
      archiveFailedLead: noArchive,
    }));
  } catch (error) {
    rejected = error instanceof LeadProcessingError;
  }
  assert(rejected, "Lead must reject when CRM, internal notification, AgentMail and recovery archive are all non-durable");
  console.log("PASS total durability failure: lead is rejected with LeadProcessingError");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
