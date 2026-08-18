import { upsertLeadInAttio } from "@/integrations/attio/client";
import { sendInternalLeadNotification, sendLeadAcknowledgement } from "@/integrations/resend/client";
import { dispatchAgentMailLeadNotification } from "@/integrations/agentmail/client";
import { archiveFailedLead } from "@/integrations/recovery/archive";
import { dispatchLeadAutomation } from "@/integrations/n8n/client";
import { metaCapi } from "@/lib/meta-capi";
import { LeadProcessingError, LeadValidationError } from "@/lib/errors";
import type { LeadPayload } from "@/types/lead";

export type LeadDependencies = {
  upsertLeadInAttio: typeof upsertLeadInAttio;
  sendLeadAcknowledgement: typeof sendLeadAcknowledgement;
  sendInternalLeadNotification: typeof sendInternalLeadNotification;
  dispatchAgentMailLeadNotification?: typeof dispatchAgentMailLeadNotification;
  archiveFailedLead: typeof archiveFailedLead;
  dispatchLeadAutomation: typeof dispatchLeadAutomation;
};

const defaultDependencies: LeadDependencies = {
  upsertLeadInAttio,
  sendLeadAcknowledgement,
  sendInternalLeadNotification,
  dispatchAgentMailLeadNotification,
  archiveFailedLead,
  dispatchLeadAutomation,
};

function normalize(payload: LeadPayload): LeadPayload {
  return {
    ...payload,
    requestId: payload.requestId || crypto.randomUUID(),
    name: payload.name?.trim(),
    mobile: payload.mobile?.trim(),
    email: payload.email?.trim().toLowerCase() || undefined,
    organisation: payload.organisation?.trim() || undefined,
    organisationDomain: payload.organisationDomain?.trim().toLowerCase() || undefined,
    location: payload.location?.trim(),
    scope: payload.scope?.trim() || undefined,
    privacyNoticeVersion: payload.privacyNoticeVersion || "2026-08-v1",
    photos: (payload.photos || []).slice(0, 3),
  };
}

function validate(payload: LeadPayload) {
  if (!payload.name || !payload.mobile) throw new LeadValidationError("Name and mobile number are required.");
  if (!/^\+?[0-9 ()-]{8,20}$/.test(payload.mobile)) throw new LeadValidationError("Please enter a valid mobile number.");
  if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) throw new LeadValidationError("Please enter a valid email address.");
  if (payload.kind !== "residential" && payload.kind !== "commercial") throw new LeadValidationError("Unknown lead type.");
  if (payload.kind === "commercial" && !payload.organisation) throw new LeadValidationError("Organisation is required for commercial assessments.");
  for (const photo of payload.photos || []) if (!photo.pathname.startsWith("lead-photos/")) throw new LeadValidationError("Invalid photo reference.");
}

export async function acceptLead(raw: LeadPayload, dependencies: LeadDependencies = defaultDependencies) {
  const payload = normalize(raw);
  validate(payload);

  const [crmResult, acknowledgementResult, notificationResult, agentMailResult] = await Promise.allSettled([
    dependencies.upsertLeadInAttio(payload),
    payload.email ? dependencies.sendLeadAcknowledgement(payload) : Promise.resolve({ ok: true, mode: "not-requested" }),
    dependencies.sendInternalLeadNotification(payload),
    dependencies.dispatchAgentMailLeadNotification
      ? dependencies.dispatchAgentMailLeadNotification(payload)
      : Promise.resolve({ ok: true, mode: "disabled" }),
  ]);

  // Server-side Meta Conversions API (CAPI) event dispatch (Facebook & Instagram Ads)
  try {
    const [firstName, ...rest] = (payload.name || "").split(" ");
    await metaCapi.trackEvent({
      eventName: "Lead",
      userData: {
        email: payload.email,
        phone: payload.mobile,
        firstName,
        lastName: rest.join(" "),
        city: payload.location,
        country: "za"
      },
      customData: {
        lead_type: payload.kind,
        sector: payload.sector,
        service_scope: payload.scope
      }
    });
  } catch (err) {
    console.error("Meta CAPI event dispatch non-blocking error:", err);
  }

  const failures: string[] = [];
  if (crmResult.status === "rejected") failures.push(`crm: ${crmResult.reason instanceof Error ? crmResult.reason.message : "unknown error"}`);
  if (acknowledgementResult.status === "rejected") failures.push(`acknowledgement: ${acknowledgementResult.reason instanceof Error ? acknowledgementResult.reason.message : "unknown error"}`);
  if (notificationResult.status === "rejected") failures.push(`internal_notification: ${notificationResult.reason instanceof Error ? notificationResult.reason.message : "unknown error"}`);
  if (agentMailResult.status === "rejected") failures.push(`agentmail: ${agentMailResult.reason instanceof Error ? agentMailResult.reason.message : "unknown error"}`);

  let recovery: unknown = null;
  if (failures.length) {
    try {
      recovery = await dependencies.archiveFailedLead(payload, failures);
    } catch (error) {
      failures.push(`recovery_archive: ${error instanceof Error ? error.message : "unknown error"}`);
    }
  }

  const crm = crmResult.status === "fulfilled" ? crmResult.value : { ok: false, mode: "failed" };
  const acknowledgement = acknowledgementResult.status === "fulfilled" ? acknowledgementResult.value : { ok: false, mode: "failed" };
  const internalNotification = notificationResult.status === "fulfilled" ? notificationResult.value : { ok: false, mode: "failed" };
  const agentMail = agentMailResult.status === "fulfilled" ? agentMailResult.value : { ok: false, mode: "failed" };

  const durable = Boolean(
    (crm as { ok?: boolean }).ok ||
    (internalNotification as { ok?: boolean }).ok ||
    (agentMail as { ok?: boolean }).ok ||
    (recovery as { archived?: boolean } | null)?.archived
  );

  if (!durable) throw new LeadProcessingError("The enquiry could not be safely recorded. Please contact us by phone or WhatsApp.");

  let automation: unknown = { ok: true, mode: "not-configured" };
  try {
    automation = await dependencies.dispatchLeadAutomation(payload, crm);
  } catch (error) {
    const failure = `automation: ${error instanceof Error ? error.message : "unknown error"}`;
    failures.push(failure);
    try {
      recovery = await dependencies.archiveFailedLead(payload, [failure]);
    } catch {
      /* durable lead already exists */
    }
    automation = { ok: false, mode: "failed" };
  }

  return {
    leadId: (crm as { externalId?: string }).externalId || payload.requestId,
    requestId: payload.requestId,
    crm,
    acknowledgement,
    internalNotification,
    agentMail,
    automation,
    recovery,
    warnings: failures,
    acceptedAt: new Date().toISOString(),
  };
}
