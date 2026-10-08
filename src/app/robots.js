import { company } from "@/content/company";

/**
 * Everything public is open to every crawler, search and AI alike, so the
 * site can be found and cited. The API is not a page. Private pages keep
 * themselves out with a noindex tag rather than being named here.
 */
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${company.url}/sitemap.xml`,
    host: company.url,
  };
}
