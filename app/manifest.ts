import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JHB Curtain Cleaning",
    short_name: "JHB Curtain Cleaning",
    description: "Specialist on-site curtain and textile care.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#071a2c",
  };
}
