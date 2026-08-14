import { QuoteForm } from "@/components/QuoteForm";

export const metadata = { title: "Residential Assessment", alternates: { canonical: "/quote" } };

export default function QuotePage() {
  return <section className="form-page"><div className="shell form-page-grid"><div><p className="eyebrow">Residential</p><h1>Request an assessment.</h1><p>Tell us what needs attention, where the property is and how best to contact you. Photos are optional and can help us understand the scope before follow-up.</p><div className="info-panel"><h3>What happens next</h3><p>We review the information you submit and respond using your preferred contact method.</p></div></div><QuoteForm /></div></section>;
}
