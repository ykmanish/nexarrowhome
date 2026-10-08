import { company } from "@/content/company";
import { insights } from "@/content/insights";
import { services } from "@/content/services";
import { caseStudies } from "@/content/work";
import { languageAlternates } from "@/lib/meta";
import { paths } from "@/lib/routes";
import { isoMonth } from "@/lib/schema";

const absolute = (path) => `${company.url}${path}`;

/**
 * Every public page, with its hreflang variants (one English site for the UK,
 * Europe, the US and India), its cover photo where it has one, and a
 * last-modified date: the article's month for insights, the deploy for the
 * rest, since every deploy ships the current copy.
 */
export default function sitemap() {
  const built = new Date();

  const pages = [
    { path: paths.home, priority: 1, changeFrequency: "weekly" },
    { path: paths.services, priority: 0.9, changeFrequency: "monthly" },
    ...services.map((s) => ({ path: paths.service(s.slug), priority: 0.9, changeFrequency: "monthly" })),
    { path: paths.work, priority: 0.8, changeFrequency: "monthly" },
    ...caseStudies.map((c) => ({
      path: paths.caseStudy(c.slug),
      priority: 0.7,
      changeFrequency: "monthly",
      images: c.photo ? [c.photo.src] : undefined,
    })),
    { path: paths.approach, priority: 0.7, changeFrequency: "monthly" },
    { path: paths.about, priority: 0.7, changeFrequency: "monthly" },
    { path: paths.contact, priority: 0.8, changeFrequency: "yearly" },
    { path: paths.insights, priority: 0.7, changeFrequency: "weekly" },
    ...insights.map((a) => ({
      path: paths.article(a.slug),
      priority: 0.6,
      changeFrequency: "yearly",
      lastModified: isoMonth(a.date),
      images: a.photo ? [a.photo.src] : undefined,
    })),
    { path: paths.partners, priority: 0.5, changeFrequency: "yearly" },
    { path: paths.privacy, priority: 0.2, changeFrequency: "yearly" },
    { path: paths.terms, priority: 0.2, changeFrequency: "yearly" },
  ];

  return pages.map(({ path, lastModified, images, ...rest }) => ({
    url: absolute(path),
    lastModified: lastModified || built,
    ...rest,
    alternates: {
      languages: Object.fromEntries(Object.entries(languageAlternates(path)).map(([lang, p]) => [lang, absolute(p)])),
    },
    ...(images && { images }),
  }));
}
