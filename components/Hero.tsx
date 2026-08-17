import Link from "next/link";
import Image from "next/image";

export function Hero({
  eyebrow,
  title,
  body,
  commercial = false,
  imageSrc,
  imageAlt,
  cardTitle,
  cardSubtitle,
}: {
  eyebrow: string;
  title: string;
  body: string;
  commercial?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  cardTitle?: string;
  cardSubtitle?: string;
}) {
  const defaultImageSrc = commercial
    ? "/brand/stitch/banner-hero.png"
    : "/brand/stitch/curtain-cleaning-hero.png";

  const defaultImageAlt = commercial
    ? "Professional on-site commercial textile care in Johannesburg"
    : "Specialist on-site curtain cleaning in a luxury Johannesburg home";

  const resolvedImageSrc = imageSrc || defaultImageSrc;
  const resolvedImageAlt = imageAlt || defaultImageAlt;

  return (
    <section className={`hero ${commercial ? "hero-commercial" : ""}`}>
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="hero-body">{body}</p>
          <div className="button-row">
            <Link
              className="button button-primary"
              href={commercial ? "/commercial-assessment" : "/quote"}
            >
              {commercial ? "Request site assessment" : "Get an assessment"}
            </Link>
            <Link
              className="button button-secondary"
              href={commercial ? "/results" : "/commercial"}
            >
              {commercial ? "View capability" : "Commercial services"}
            </Link>
          </div>
        </div>
        <div className="hero-visual-frame">
          <Image
            src={resolvedImageSrc}
            alt={resolvedImageAlt}
            width={720}
            height={560}
            priority
            className="hero-image"
          />
          <div className="visual-card">
            <span>{cardSubtitle || (commercial ? "Commercial textile care" : "On-site specialist care")}</span>
            <strong>{cardTitle || (commercial ? "Hotels, Offices & Venues" : "No Unnecessary Curtain Removal")}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
