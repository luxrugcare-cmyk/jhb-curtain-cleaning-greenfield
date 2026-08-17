import Link from "next/link";
import Image from "next/image";
import { services } from "@/lib/site-data";

const SERVICE_IMAGES: Record<string, string> = {
  "curtain-cleaning": "/brand/stitch/curtain-cleaning-hero.png",
  "blind-cleaning": "/brand/stitch/roller-blind-cleaning.png",
  "upholstery-cleaning": "/brand/stitch/upholstery-cleaning.png",
  "mattress-cleaning": "/brand/stitch/mattress-cleaning.png",
  "carpet-cleaning": "/brand/stitch/carpet-cleaning.png",
  "rug-care": "/brand/stitch/oriental-rug-cleaning.png",
  "fabric-protection": "/brand/stitch/fabric-protection.png",
  "fire-retardant-treatment": "/brand/stitch/flame-retardant.png",
};

export function ServiceGrid({ limit = 8 }: { limit?: number }) {
  return (
    <div className="card-grid">
      {services.slice(0, limit).map((service, index) => {
        const imageSrc = SERVICE_IMAGES[service.slug] || "/brand/stitch/curtain-cleaning-hero.png";
        return (
          <article
            className={`service-card ${index === 0 ? "featured-card" : ""}`}
            key={service.slug}
          >
            <div className="card-media-wrapper">
              <Image
                src={imageSrc}
                alt={`${service.title} - JHB Curtain Cleaning Specialist Care`}
                width={600}
                height={340}
                className="service-card-img"
              />
            </div>
            <div className="service-card-content">
              <p className="eyebrow">Service</p>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <Link className="card-link" href={`/services/${service.slug}`}>
                Explore service →
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
