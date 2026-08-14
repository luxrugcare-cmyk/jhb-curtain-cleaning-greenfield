import { CommercialAssessmentForm } from "@/components/CommercialAssessmentForm";

export const metadata = { title: "Commercial Site Assessment", alternates: { canonical: "/commercial-assessment" } };

export default function CommercialAssessment() {
  return <section className="form-page commercial-page"><div className="shell form-page-grid"><div><p className="eyebrow">Commercial</p><h1>Request a site assessment.</h1><p>For facilities, hospitality, corporate and property decision-makers who need scope, scheduling and operational requirements considered before service is planned.</p><div className="info-panel"><h3>Before we follow up</h3><p>Tell us about the property, operating environment, location and scope so the enquiry can be routed appropriately.</p></div></div><CommercialAssessmentForm /></div></section>;
}
