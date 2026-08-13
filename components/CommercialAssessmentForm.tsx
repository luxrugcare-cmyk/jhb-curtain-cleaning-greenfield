"use client";

import { FormEvent, useState } from "react";
import { sectors } from "@/lib/site-data";
import { trackEvent } from "@/integrations/analytics/events";
import { PhotoUpload } from "@/components/PhotoUpload";
import type { LeadPhoto } from "@/integrations/storage/photo-types";

function attribution() {
  if (typeof window === "undefined") return {};
  const url = new URL(window.location.href);
  return { sourceUrl: url.toString(), utmSource: url.searchParams.get("utm_source") || undefined, utmMedium: url.searchParams.get("utm_medium") || undefined, utmCampaign: url.searchParams.get("utm_campaign") || undefined };
}

export function CommercialAssessmentForm() {
  const [requestId] = useState(() => crypto.randomUUID());
  const [status, setStatus] = useState<"idle"|"sending"|"success"|"error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState({ sector: "", organisation: "", organisationDomain: "", propertyType: "", scope: "", location: "", name: "", mobile: "", email: "", preferredContact: "email", marketingConsent: false, photos: [] as LeadPhoto[] });
  const update = (key: string, value: string | boolean | LeadPhoto[]) => setData(p => ({ ...p, [key]: value }));

  async function submit(e: FormEvent) {
    e.preventDefault(); setStatus("sending"); setErrorMessage("");
    const r = await fetch("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ requestId, kind: "commercial", ...data, ...attribution(), sourcePath: "/commercial-assessment", privacyNoticeVersion: "2026-08-v1" }) });
    const body = await r.json().catch(() => ({}));
    setStatus(r.ok ? "success" : "error"); if (r.ok) trackEvent("commercial_submit", { has_photos: Boolean(data.photos.length) }); else setErrorMessage(body.error || "Unable to submit.");
  }

  if (status === "success") return <div className="form-success"><h2>Commercial assessment request received.</h2><p>Your request has been recorded for commercial follow-up.</p><p className="request-id">Reference: {requestId}</p></div>;

  return <form onSubmit={submit} className="wizard-card commercial-form">
    <p className="eyebrow">Commercial site assessment</p><h2>Tell us about the organisation and scope.</h2>
    <div className="form-stack two-col"><label>Sector<select value={data.sector} onChange={e => update("sector", e.target.value)} required><option value="">Choose sector</option>{sectors.map(s => <option key={s.slug}>{s.title}</option>)}</select></label><label>Organisation<input value={data.organisation} onChange={e => update("organisation", e.target.value)} required /></label><label>Organisation website/domain<input value={data.organisationDomain} onChange={e => update("organisationDomain", e.target.value)} placeholder="example.co.za (optional)" /></label><label>Property / site type<input value={data.propertyType} onChange={e => update("propertyType", e.target.value)} placeholder="Hotel, office tower, school…" /></label><label>Location<input value={data.location} onChange={e => update("location", e.target.value)} required /></label></div>
    <label>Scope and operational requirements<textarea value={data.scope} onChange={e => update("scope", e.target.value)} placeholder="Approximate rooms/items, operating hours, access limitations, multiple sites, procurement requirements…" /></label>
    <PhotoUpload requestId={requestId} value={data.photos} onChange={photos => update("photos", photos)} />
    <div className="form-stack two-col"><label>Decision-maker / contact<input value={data.name} onChange={e => update("name", e.target.value)} required /></label><label>Mobile<input value={data.mobile} onChange={e => update("mobile", e.target.value)} required /></label><label>Email<input type="email" value={data.email} onChange={e => update("email", e.target.value)} required /></label><label>Preferred contact<select value={data.preferredContact} onChange={e => update("preferredContact", e.target.value)}><option value="email">Email</option><option value="phone">Phone</option><option value="whatsapp">WhatsApp</option></select></label></div>
    <div className="consent-box"><p>Service communications are used to handle this assessment request.</p><label className="checkbox"><input type="checkbox" checked={data.marketingConsent} onChange={e => update("marketingConsent", e.target.checked)} /> Separate optional marketing consent</label></div>
    {status === "error" && <p className="form-error">{errorMessage}</p>}
    <button className="button button-primary" disabled={status === "sending"}>{status === "sending" ? "Submitting…" : "Request site assessment"}</button>
  </form>;
}
