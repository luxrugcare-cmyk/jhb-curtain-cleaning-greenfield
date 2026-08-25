import Link from "next/link";
import Image from "next/image";
import { whatsappLink } from "@/integrations/whatsapp/link";
import { TrackedContactLink } from "@/components/analytics/TrackedContactLink";

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="JHB Curtain Cleaning home">
          <Image
            src="/brand/stitch/elite-logo.png"
            alt="JHB Curtain Cleaning Elite Logo"
            width={44}
            height={44}
            className="brand-logo-img"
          />
          <span>
            <strong>JHB Curtain Cleaning</strong>
            <small>On-site textile care specialists</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/residential">Residential</Link>
          <Link href="/commercial">Commercial</Link>
          <Link href="/services">Services</Link>
          <Link href="/results">Results</Link>
          <Link href="/trade">Trade</Link>
          <Link href="/areas/johannesburg">Areas</Link>
          <Link href="/advice">Advice</Link>
          <Link href="/about">About</Link>
        </nav>
        <div className="header-actions">
          <TrackedContactLink
            event="call_click"
            placement="header"
            className="text-action"
            href="tel:+27750119200"
          >
            Call
          </TrackedContactLink>
          <TrackedContactLink
            event="whatsapp_click"
            placement="header"
            className="text-action whatsapp"
            href={whatsappLink("Hi, I'd like information about JHB Curtain Cleaning.")}
          >
            WhatsApp
          </TrackedContactLink>
          <Link className="button button-primary" href="/quote">
            Get A Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
