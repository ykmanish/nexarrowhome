import localFont from "next/font/local";
import { Instrument_Serif } from "next/font/google";
import { company } from "@/content/company";
import { ogAlternateLocales, ogLocale, pageSeo, siteKeywords, verification } from "@/content/seo";
import "./globals.css";

/** Body copy — Manrope Regular, shipped as satre.ttf. */
const satre = localFont({
  src: "./font/satre.ttf",
  variable: "--font-satre",
  weight: "400",
  display: "swap",
});

/**
 * Headings — Aeonik Pro Regular, shipped as regular.otf. No generated metric
 * fallback: glyphs this cut lacks should come from Manrope (see the display
 * stack in globals.css), not from a resized Arial.
 */
const regular = localFont({
  src: "./font/regular.otf",
  variable: "--font-regular",
  weight: "400",
  display: "swap",
  adjustFontFallback: false,
});

/**
 * Editorial accents — Instrument Serif, regular and its true italic. Used
 * sparingly: a word in the hero headline and the hero's story cards.
 */
const serif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

/**
 * Site-wide defaults. Every page overrides the title, description, keywords,
 * canonical and share card through pageMeta (lib/meta.js); what stays from
 * here is who publishes the site, how search engines may show it, and the
 * search console verification. Icons come from the icon, apple-icon and
 * manifest files beside this one.
 */
export const metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: pageSeo.home.title,
    template: `%s | ${company.short}`,
  },
  description: pageSeo.home.description,
  keywords: [...pageSeo.home.keywords, ...siteKeywords],
  applicationName: company.short,
  authors: [{ name: company.name, url: company.url }],
  creator: company.name,
  publisher: company.name,
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    siteName: company.short,
    locale: ogLocale,
    alternateLocale: ogAlternateLocales,
    url: company.url,
    title: pageSeo.home.title,
    description: pageSeo.home.description,
  },
  twitter: {
    card: "summary_large_image",
    title: pageSeo.home.title,
    description: pageSeo.home.description,
  },
  verification: {
    google: verification.google || undefined,
    yandex: verification.yandex || undefined,
    other: verification.bing ? { "msvalidate.01": verification.bing } : undefined,
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#131313" },
  ],
};

/**
 * Runs before first paint: applies the saved (or system) theme and flags that
 * motion is allowed, so neither causes a flash once React takes over. The
 * standalone invitation page keeps its own fixed look.
 */
const BOOT = `(function(){try{var d=document.documentElement;if(location.pathname.indexOf('/invitation')===0)return;var t=localStorage.getItem('nexarrow-theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}if(t==='dark')d.classList.add('dark');d.style.colorScheme=t;if(!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('motion')}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${satre.variable} ${regular.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
