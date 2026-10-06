import localFont from "next/font/local";
import { Instrument_Serif } from "next/font/google";
import { company } from "@/content/company";
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

export const metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: "Nexarrow | Custom software and AI automation for growing teams",
    template: "%s | Nexarrow",
  },
  description:
    "Nexarrow OÜ is an EU-registered software company building custom software and AI automation for growing teams. Fixed prices, weekly demos, and you own the code.",
  openGraph: {
    type: "website",
    siteName: "Nexarrow",
    locale: "en_GB",
    url: company.url,
    title: "Nexarrow | Custom software and AI automation for growing teams",
    description:
      "EU-registered software company. Fixed prices, weekly demos, and you own the code.",
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.ico" },
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
