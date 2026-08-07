import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jovira",
    short_name: "Jovira",
    description:
      "Consultation-led event styling and balloon decoration service in and around Fredericton, New Brunswick, Canada including Oromocto, New Maryland, Hanwell.",
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
        src: "/logo.jpeg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
