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

export async function upsertLeadInAttio(payload: LeadPayload) {
  const apiKey = process.env.ATTIO_API_KEY;
  if (!apiKey) return { ok: true, mode: "stub", externalId: `stub-${Date.now()}` };

  const { firstName, lastName } = splitName(payload.name);
  const description = [
    `Website ${payload.kind} lead`,
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

  // Attio's PUT endpoint upserts against unique attributes such as email_addresses.
  // Leads without email are created as new People records because phone is not unique in this workspace.
  const method = payload.email ? "PUT" : "POST";
  const result = await attioFetch("/objects/people/records", {
    method, body: JSON.stringify({ data: { values } }),
  });
  return { ok: true, mode: payload.email ? "live-upsert" : "live-create", externalId: result?.data?.id?.record_id || payload.email || payload.mobile };
}
