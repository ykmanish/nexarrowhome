import { company } from "@/content/company";
import { markets, ogAlternateLocales, ogLocale, siteKeywords } from "@/content/seo";

/**
 * hreflang for one path. There is one English site for every market, so each
 * regional variant and `x-default` point at the same URL; it tells search
 * engines the page is meant for English speakers in the UK, Europe, the US
 * and India, not only for the country the domain is in.
 */
export function languageAlternates(path) {
  return {
    "x-default": path,
    en: path,
    ...Object.fromEntries(markets.map((m) => [m.hreflang, path])),
  };
}

/** The page's own keywords first, then the site-wide ones, without repeats. */
function keywordsFor(keywords = []) {
  return [...new Set([...keywords, ...siteKeywords])];
}

/**
 * Metadata for one page, including its own share card. A page's openGraph
 * replaces the site default rather than merging with it, so without this
 * every link shared from the site would preview with the home page's title.
 * The share image itself comes from the page's opengraph-image file.
 *
 * `title` is run through the root template (" | Nexarrow"); pass
 * `absolute: true` when the title already carries the brand. Articles pass
 * `published` (ISO date) and `section`.
 */
export function pageMeta({
  title,
  description,
  path,
  keywords,
  type = "website",
  absolute = false,
  published,
  modified,
  section,
  tags,
}) {
  const fullTitle = absolute ? title : `${title} | ${company.short}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    keywords: keywordsFor(keywords),
    alternates: { canonical: path, languages: languageAlternates(path) },
    openGraph: {
      type,
      siteName: company.short,
      locale: ogLocale,
      alternateLocale: ogAlternateLocales,
      url: path,
      title: fullTitle,
      description,
      ...(type === "article" && {
        publishedTime: published,
        modifiedTime: modified || published,
        authors: [company.url],
        section,
        tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
