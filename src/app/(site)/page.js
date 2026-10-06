import Hero from "@/components/home/Hero";
import Audiences from "@/components/sections/Audiences";
import CaseStudies from "@/components/sections/CaseStudies";
import ContactSection from "@/components/sections/ContactSection";
import DeliveryTrail from "@/components/sections/DeliveryTrail";
import Expertise from "@/components/sections/Expertise";
import FAQ from "@/components/sections/FAQ";
import Safeguards from "@/components/sections/Safeguards";
import TrustStrip from "@/components/sections/TrustStrip";
import { company, founder } from "@/content/company";

export const metadata = {
  alternates: { canonical: "/" },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  alternateName: company.short,
  url: company.url,
  email: company.email,
  vatID: company.vat,
  identifier: company.registry,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Tornimäe tn 5",
    postalCode: "10145",
    addressLocality: "Tallinn",
    addressCountry: "EE",
  },
  sameAs: [company.registerUrl, company.linkedin, company.github].filter(Boolean),
  ...(founder.name && { founder: { "@type": "Person", name: founder.name, ...(founder.linkedin && { sameAs: founder.linkedin }) } }),
};

/**
 * Ordered to build trust fast: one clear message, checkable facts, the core
 * claim (four disciplines, one team), proof, who it is for, the process,
 * the safeguards, then questions and a way to start.
 */
export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <Hero />
      <TrustStrip />
      <Expertise />
      <CaseStudies />
      <Audiences />
      <DeliveryTrail />
      <Safeguards />
      <FAQ />
      <ContactSection />
    </>
  );
}
