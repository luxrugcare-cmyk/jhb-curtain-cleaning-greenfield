import { permanentRedirect } from "next/navigation";

export default function LegacyCurtainBlindRedirect() {
  permanentRedirect("/services/curtain-cleaning");
}
