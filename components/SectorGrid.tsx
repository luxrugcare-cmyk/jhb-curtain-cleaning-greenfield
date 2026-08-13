import Link from "next/link";
import { sectors } from "@/lib/site-data";

export function SectorGrid() {
  return <div className="card-grid">{sectors.map((sector) => <article className="service-card" key={sector.slug}><div className="card-media commercial-media"/><div><p className="eyebrow">Commercial</p><h3>{sector.title}</h3><p>{sector.summary}</p><Link className="card-link" href={`/commercial/${sector.slug}`}>View sector →</Link></div></article>)}</div>;
}
