import { permanentRedirect } from "next/navigation";

export default function LegacyPricingRedirect() {
  permanentRedirect("/advice/curtain-cleaning-prices");
}
