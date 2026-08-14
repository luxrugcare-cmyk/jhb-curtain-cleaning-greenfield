import { permanentRedirect } from "next/navigation";

export default function LegacyTestimonialsRedirect() {
  permanentRedirect("/results");
}
