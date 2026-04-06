import type { MetadataRoute } from "next";
import { profile } from "@/lib/portfolio-content";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} | ${profile.jobTitle}`,
    short_name: "Jose Riascos",
    description: profile.seoDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#F8FAFC",
    theme_color: "#1B3B5A",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
