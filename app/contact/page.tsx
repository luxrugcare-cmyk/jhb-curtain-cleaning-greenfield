import { Hero } from "@/components/Hero";
import { CTASection } from "@/components/CTASection";

export const metadata = { title: "Contact" };

export default function Contact() {
  return <><Hero eyebrow="Contact" title="Choose the best route for your enquiry." body="Use the residential assessment, commercial site assessment, telephone or WhatsApp depending on what you need."/><section className="section"><div className="shell feature-grid"><article><h3>Call</h3><p><a href="tel:+27750119200">+27 75 011 9200</a></p></article><article><h3>WhatsApp</h3><p><a href="https://wa.me/27750119200">Start a conversation</a></p></article><article><h3>Residential</h3><p><a href="/quote">Start assessment</a></p></article><article><h3>Commercial</h3><p><a href="/commercial-assessment">Request site assessment</a></p></article><article><h3>Privacy</h3><p><a href="/privacy">Read the website privacy notice</a></p></article></div></section><CTASection/></>;
}
