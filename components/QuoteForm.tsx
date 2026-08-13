"use client";

import { FormEvent, useState } from "react";
import { services } from "@/lib/site-data";
import { trackEvent } from "@/integrations/analytics/events";
import { PhotoUpload } from "@/components/PhotoUpload";
import type { LeadPhoto } from "@/integrations/storage/photo-types";

const steps = ["Service", "Property", "Scope", "Photos", "Location", "Contact", "Consent", "Confirm"];

function attribution() {
  if (typeof window === "undefined") return {};
  const url = new URL(window.location.href);
  return {
    sourceUrl: url.toString(),
    utmSource: url.searchParams.get("utm_source") || undefined,
    utmMedium: url.searchParams.get("utm_medium") || undefined,
    utmCampaign: url.searchParams.get("utm_campaign") || undefined,
  };
}

export function QuoteForm() {
  const [requestId] = useState(() => crypto.randomUUID());
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState({ service: "", propertyType: "", scope: "", location: "", name: "", mobile: "", email: "", preferredContact: "whatsapp", marketingConsent: false, photos: [] as LeadPhoto[] });

  function update(key: string, value: string | boolean | LeadPhoto[]) { setData(prev => ({ ...prev, [key]: value })); }
  function next() { trackEvent("quote_step", { step: step + 1 }); setStep(Math.min(step + 1, steps.length - 1)); }
  function back() { setStep(Math.max(step - 1, 0)); }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setStatus("sending"); setErrorMessage("");
    const response = await fetch("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ requestId, kind: "residential", ...data, ...attribution(), sourcePath: "/quote", privacyNoticeVersion: "2026-08-v1" }) });
    const body = await response.json().catch(() => ({}));
    setStatus(response.ok ? "success" : "error");
    if (response.ok) {
      const params = { lead_type: "residential", service: data.service || "unspecified", has_photos: Boolean(data.photos.length) };
      trackEvent("quote_submit", params);
      trackEvent("generate_lead", params);
    } else setErrorMessage(body.error || "We could not accept the request.");
  }

  if (status === "success") return <div className="form-success"><h2>Assessment request received.</h2><p>Your request has been recorded. We’ll respond using your preferred contact method.</p><p className="request-id">Reference: {requestId}</p></div>;

  return <form onSubmit={submit} className="wizard-card">
    <div className="progress"><span style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
    <p className="eyebrow">Residential assessment • Step {step + 1} of {steps.length}</p>
    <h2>{steps[step]}</h2>
    {step === 0 && <div className="choice-grid">{services.map(s => <button type="button" key={s.slug} className={`choice ${data.service === s.title ? "selected" : ""}`} onClick={() => update("service", s.title)}>{s.title}</button>)}</div>}
    {step === 1 && <div className="choice-grid">{["House","Apartment","Estate","Guest house","Other"].map(v => <button type="button" className={`choice ${data.propertyType === v ? "selected" : ""}`} onClick={() => update("propertyType", v)} key={v}>{v}</button>)}</div>}
    {step === 2 && <label>Tell us about the scope<textarea value={data.scope} onChange={e => update("scope", e.target.value)} placeholder="Approximate quantity, fabric, stains, height, access or anything else useful."/></label>}
    {step === 3 && <PhotoUpload requestId={requestId} value={data.photos} onChange={photos => { update("photos", photos); if (photos.length) trackEvent("quote_upload", { count: photos.length }); }} />}
    {step === 4 && <label>Property location<input value={data.location} onChange={e => update("location", e.target.value)} placeholder="Suburb / city" /></label>}
    {step === 5 && <div className="form-stack"><label>Name<input value={data.name} onChange={e => update("name", e.target.value)} required /></label><label>Mobile<input value={data.mobile} onChange={e => update("mobile", e.target.value)} required /></label><label>Email<input type="email" value={data.email} onChange={e => update("email", e.target.value)} /></label><label>Preferred contact<select value={data.preferredContact} onChange={e => update("preferredContact", e.target.value)}><option value="whatsapp">WhatsApp</option><option value="phone">Phone</option><option value="email">Email</option></select></label></div>}
    {step === 6 && <div className="consent-box"><p><strong>Service communication:</strong> your details are used to respond to this enquiry and administer the requested service.</p><label className="checkbox"><input type="checkbox" checked={data.marketingConsent} onChange={e => update("marketingConsent", e.target.checked)} /> I separately consent to receive optional marketing communications.</label></div>}
    {step === 7 && <div className="summary-box"><p><strong>Service:</strong> {data.service || "Not selected"}</p><p><strong>Property:</strong> {data.propertyType || "Not selected"}</p><p><strong>Photos:</strong> {data.photos.length}</p><p><strong>Location:</strong> {data.location || "Not supplied"}</p><p><strong>Contact:</strong> {data.name || "Not supplied"} • {data.mobile || "Not supplied"}</p></div>}
    {status === "error" && <p className="form-error">{errorMessage}</p>}
    <div className="wizard-actions">{step > 0 && <button type="button" className="button button-secondary" onClick={back}>Back</button>}{step < steps.length - 1 ? <button type="button" className="button button-primary" onClick={next}>Continue</button> : <button className="button button-primary" disabled={status === "sending"}>{status === "sending" ? "Submitting…" : "Submit request"}</button>}</div>
  </form>;
}
