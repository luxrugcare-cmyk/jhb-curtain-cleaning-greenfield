import type { LeadPayload } from "@/types/lead";

const baseUrl = "https://api.attio.com/v2";

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  return { firstName: parts[0] || "", lastName: parts.slice(1).join(" ") };
}

async function attioFetch(path: string, init: RequestInit) {
  const apiKey = process.env.ATTIO_API_KEY;
  if (!apiKey) throw new Error("ATTIO_API_KEY is not configured");
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", ...(init.headers || {}) },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Attio request failed (${response.status})`);
  return response.json();
}

async function upsertCompany(payload: LeadPayload) {
  if (!payload.organisationDomain) return null;

  const values: Record<string, unknown> = {
    domains: [payload.organisationDomain],
  };
  if (payload.organisation) values.name = payload.organisation;
  if (payload.location) values.primary_location = payload.location;
  values.description = [
    "Website commercial lead organisation",
    payload.sector && `Sector: ${payload.sector}`,
    payload.service && `Service: ${payload.service}`,
    payload.scope && `Requirement: ${payload.scope}`,
  ].filter(Boolean).join("\n");

  const result = await attioFetch("/objects/companies/records", {
    method: "PUT",
    body: JSON.stringify({ data: { values } }),
  });
  return result?.data?.id?.record_id as string | undefined;
}

export async function upsertLeadInAttio(payload: LeadPayload) {
  const apiKey = process.env.ATTIO_API_KEY;
  if (!apiKey) return { ok: true, mode: "stub", externalId: `stub-${Date.now()}` };

  const companyRecordId = payload.kind === "commercial" ? await upsertCompany(payload) : null;
  const { firstName, lastName } = splitName(payload.name);
  const description = [
    `Website ${payload.kind} lead`,
    payload.requestId && `Request ID: ${payload.requestId}`,
    payload.service && `Service: ${payload.service}`,
    payload.propertyType && `Property: ${payload.propertyType}`,
    payload.sector && `Sector: ${payload.sector}`,
    payload.organisation && `Organisation: ${payload.organisation}`,
    payload.location && `Location: ${payload.location}`,
    payload.scope && `Scope: ${payload.scope}`,
    payload.preferredContact && `Preferred contact: ${payload.preferredContact}`,
    `Marketing consent: ${payload.marketingConsent ? "yes" : "no"}`,
    payload.sourcePath && `Source: ${payload.sourcePath}`,
  ].filter(Boolean).join("\n");

  const values: Record<string, unknown> = {
    name: [{ first_name: firstName, last_name: lastName, full_name: payload.name.trim() }],
    phone_numbers: [payload.mobile],
    description,
  };
  if (payload.email) values.email_addresses = [payload.email];
  if (payload.location) values.primary_location = payload.location;
  if (companyRecordId) {
    values.company = [{ target_object: "companies", target_record_id: companyRecordId }];
  }

  // Attio's PUT endpoint upserts against a unique attribute when one is supplied.
  // In this workspace email_addresses is unique; phone_numbers is not.
  const method = payload.email ? "PUT" : "POST";
  const result = await attioFetch("/objects/people/records", {
    method,
    body: JSON.stringify({ data: { values } }),
  });
  return {
    ok: true,
    mode: payload.email ? "live-upsert" : "live-create",
    externalId: result?.data?.id?.record_id || payload.email || payload.mobile,
    companyRecordId: companyRecordId || undefined,
  };
}
