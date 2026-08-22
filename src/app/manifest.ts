import { companyMetadata } from "@/data/company";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: companyMetadata.manifest.name,
    short_name: companyMetadata.manifest.shortName,
    description: companyMetadata.manifest.description,
    lang: "en-CA",
    orientation: "portrait",
    categories: [
      "business",
      "lifestyle",
      "celebration",
      "event-planning",
      "party-supplies",
      "balloons",
      "decorations",
      "event-styling",
      "event-services",
    ],
    start_url: "/",
    display: "standalone",
    background_color: "#fff6ec",
    theme_color: "#0f172a",
    icons: [
      {
        src: "/jovira-mark.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
