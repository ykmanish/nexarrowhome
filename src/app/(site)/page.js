import Hero from "@/components/home/Hero";
import CaseStudies from "@/components/sections/CaseStudies";
import ContactSection from "@/components/sections/ContactSection";
import DeliveryTrail from "@/components/sections/DeliveryTrail";
import Engagement from "@/components/sections/Engagement";
import Expertise from "@/components/sections/Expertise";
import FAQ from "@/components/sections/FAQ";
import Founder from "@/components/sections/Founder";
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
 * Ordered to build trust fastest, as the client plan lays out: one clear
 * message, checkable facts, proof, services with prices, the person behind
 * it, the process, the safeguards, then questions and a way to start.
 */
export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <Hero />
      <TrustStrip />
      <CaseStudies />
      <Expertise />
      <Engagement />
      <Founder />
      <DeliveryTrail />
      <Safeguards />
      <FAQ />
      <ContactSection />
    </>
  );
}
