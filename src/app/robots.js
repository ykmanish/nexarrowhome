import { company } from "@/content/company";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/invitation"] }],
    sitemap: `${company.url}/sitemap.xml`,
  };
}
