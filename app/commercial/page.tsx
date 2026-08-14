import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { SectorGrid } from "@/components/SectorGrid";
import { CTASection } from "@/components/CTASection";

export const metadata = { title: "Commercial Textile Care", alternates: { canonical: "/commercial" } };
export default function CommercialPage(){return <><Hero commercial eyebrow="Commercial capability" title="Textile care built around operations." body="Assessment-led service for hospitality, corporate, healthcare, education, venues and managed properties."/><TrustStrip/><section className="section"><div className="shell"><div className="section-heading"><p className="eyebrow">Commercial sectors</p><h2>Different environments need different operating plans.</h2></div><SectorGrid/></div></section><CTASection/></>}
