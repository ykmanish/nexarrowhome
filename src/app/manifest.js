import { company } from "@/content/company";
import { pageSeo } from "@/content/seo";

export default function manifest() {
  return {
    name: `${company.short}: custom software and AI automation`,
    short_name: company.short,
    description: pageSeo.home.description,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: "en",
    categories: ["business", "productivity", "developer"],
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/logo.png", type: "image/png", sizes: "512x512" },
    ],
  };
}
