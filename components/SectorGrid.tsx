import Link from "next/link";
import Image from "next/image";
import { sectors } from "@/lib/site-data";

const SECTOR_IMAGES: Record<string, string> = {
  "hotels-hospitality": "/brand/stitch/curtain-cleaning-hero.png",
  "offices-corporate": "/brand/stitch/roller-blind-cleaning.png",
  "healthcare": "/brand/stitch/mattress-cleaning.png",
  "education": "/brand/stitch/carpet-cleaning.png",
  "venues-theatres": "/brand/stitch/flame-retardant.png",
  "property-facilities": "/brand/stitch/banner-hero.png",
};

export function SectorGrid() {
  return (
    <div className="card-grid">
      {sectors.map((sector) => {
        const imageSrc = SECTOR_IMAGES[sector.slug] || "/brand/stitch/banner-hero.png";
        return (
          <article className="service-card" key={sector.slug}>
            <div className="card-media-wrapper">
              <Image
                src={imageSrc}
                alt={`${sector.title} - JHB Curtain Cleaning Commercial Services`}
                width={600}
                height={340}
                className="service-card-img"
              />
            </div>
            <div className="service-card-content">
              <p className="eyebrow">Commercial</p>
              <h3>{sector.title}</h3>
              <p>{sector.summary}</p>
              <Link className="card-link" href={`/commercial/${sector.slug}`}>
                View sector →
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
