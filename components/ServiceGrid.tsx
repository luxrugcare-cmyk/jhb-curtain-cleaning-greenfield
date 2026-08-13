import Link from "next/link";
import { services } from "@/lib/site-data";

export function ServiceGrid({ limit = 8 }: { limit?: number }) {
  return <div className="card-grid">{services.slice(0, limit).map((service, index) => <article className={`service-card ${index === 0 ? "featured-card" : ""}`} key={service.slug}><div className="card-media"/><div><p className="eyebrow">Service</p><h3>{service.title}</h3><p>{service.summary}</p><Link className="card-link" href={`/services/${service.slug}`}>Explore service →</Link></div></article>)}</div>;
}
