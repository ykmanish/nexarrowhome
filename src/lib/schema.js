import { company, founder } from "@/content/company";
import { expertise, markets, pageSeo } from "@/content/seo";
import { services } from "@/content/services";
import { paths } from "./routes";

/**
 * Structured data (schema.org JSON-LD) for search engines and AI answers.
 * Every node about the company points back to one Organization by its @id,
 * so the site describes a single entity: who we are, where we are
 * registered, which markets we serve and what we sell. Only facts the pages
 * themselves state go in here.
 */

const ORG_ID = `${company.url}/#organization`;
const SITE_ID = `${company.url}/#website`;
const LOGO_ID = `${company.url}/#logo`;

/** Absolute URL for a site path. */
export const absolute = (path) => `${company.url}${path}`;

const areaServed = markets.map((m) => m.schema);

const ref = (id) => ({ "@id": id });

/**
 * "May 2026" → "2026-05-01". Insights carry a month, not a day; the first of
 * the month is the honest reading of that.
 */
export function isoMonth(label) {
  const d = new Date(`1 ${label} UTC`);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

/** The company and the website, on every page. */
export function siteGraph() {
  const sameAs = [company.registerUrl, company.linkedin, company.github, founder.linkedin, ...Object.values(company.profiles)].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: company.short,
        legalName: company.name,
        alternateName: company.name,
        url: company.url,
        logo: {
          "@type": "ImageObject",
          "@id": LOGO_ID,
          url: absolute("/logo.png"),
          contentUrl: absolute("/logo.png"),
          width: 512,
          height: 512,
          caption: company.short,
        },
        image: ref(LOGO_ID),
        description: pageSeo.home.description,
        slogan: "Custom software and AI automation for growing teams.",
        email: company.email,
        telephone: company.phone || undefined,
        vatID: company.vat,
        identifier: {
          "@type": "PropertyValue",
          propertyID: "Estonian e-Business Register code",
          value: company.registry,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Tornimäe tn 5",
          postalCode: "10145",
          addressLocality: "Tallinn",
          addressCountry: "EE",
        },
        areaServed,
        knowsAbout: expertise,
        knowsLanguage: "en",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: company.email,
          telephone: company.phone || undefined,
          url: absolute(paths.contact),
          areaServed,
          availableLanguage: ["English"],
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Software development services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: ref(serviceId(s)),
          })),
        },
        ...(founder.name && {
          founder: { "@type": "Person", name: founder.name, ...(founder.linkedin && { sameAs: founder.linkedin }) },
        }),
        ...(sameAs.length > 0 && { sameAs }),
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: company.url,
        name: company.short,
        alternateName: company.name,
        description: pageSeo.home.description,
        publisher: ref(ORG_ID),
        inLanguage: "en",
      },
    ],
  };
}

/** One page of the site, typed (AboutPage, ContactPage, CollectionPage, …). */
export function webPage({ type = "WebPage", path, name, description }) {
  const url = absolute(path);
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: ref(SITE_ID),
    about: ref(ORG_ID),
    inLanguage: "en",
  };
}

/** Home → … → this page. The last crumb is the page itself and needs no URL. */
export function breadcrumbs(crumbs) {
  const trail = [{ name: "Home", href: paths.home }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name || c.label,
      ...(c.href && { item: absolute(c.href) }),
    })),
  };
}

/** A list of pages, e.g. the services or the insights index. */
export function itemList({ name, items }) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: absolute(it.path),
    })),
  };
}

function serviceId(s) {
  return `${absolute(paths.service(s.slug))}#service`;
}

/** One service line, with what it delivers. */
export function service(s) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceId(s),
    name: s.seo.serviceType,
    alternateName: s.name,
    serviceType: s.seo.serviceType,
    description: s.seo.description,
    url: absolute(paths.service(s.slug)),
    provider: ref(ORG_ID),
    areaServed,
    audience: { "@type": "BusinessAudience", name: "Startups, SMEs, agencies and growing businesses" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${s.name}: what you get`,
      itemListElement: s.deliverables.map((d) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: d.title, description: d.copy },
      })),
    },
  };
}

/** An insight, as a blog post by the company. */
export function blogPosting(a) {
  const url = absolute(paths.article(a.slug));
  const published = isoMonth(a.date);
  const words = a.content.flatMap((s) => s.p || []).join(" ").split(/\s+/).length;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: a.title.replace(/\.$/, ""),
    description: a.excerpt,
    url,
    mainEntityOfPage: url,
    ...(a.photo && { image: [a.photo.src] }),
    datePublished: published,
    dateModified: published,
    author: { "@type": "Organization", name: company.short, url: company.url },
    publisher: ref(ORG_ID),
    isPartOf: ref(SITE_ID),
    inLanguage: "en",
    articleSection: "Insights",
    keywords: a.keywords?.join(", "),
    wordCount: words,
    timeRequired: `PT${parseInt(a.read, 10)}M`,
  };
}

/** A playbook: how we would run a typical engagement, not past client work. */
export function playbook(cs, s) {
  const url = absolute(paths.caseStudy(cs.slug));
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: cs.seo.title,
    alternativeHeadline: cs.title,
    description: cs.seo.description,
    url,
    mainEntityOfPage: url,
    ...(cs.photo && { image: [cs.photo.src] }),
    author: { "@type": "Organization", name: company.short, url: company.url },
    publisher: ref(ORG_ID),
    isPartOf: ref(SITE_ID),
    inLanguage: "en",
    articleSection: "Playbooks",
    keywords: cs.seo.keywords.join(", "),
    ...(s && { about: ref(serviceId(s)) }),
  };
}

/** Questions and answers, exactly as the page shows them. */
export function faqPage(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
