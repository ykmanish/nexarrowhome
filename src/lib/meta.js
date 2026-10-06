import { company } from "@/content/company";

/**
 * Metadata for one page, including its own share card. A page's openGraph
 * replaces the site default rather than merging with it, so without this
 * every link shared from the site would preview with the home page's title.
 */
export function pageMeta({ title, description, path, type = "website" }) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: company.short,
      locale: "en_GB",
      url: path,
      title: `${title} | ${company.short}`,
      description,
    },
  };
}
