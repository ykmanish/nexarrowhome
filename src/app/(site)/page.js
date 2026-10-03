import Hero from "@/components/home/Hero";
import { AboutIntro, InsightsPreview, Proof, Toolbelt, Work } from "@/components/home/HomeSections";
import DeliveryTrail from "@/components/sections/DeliveryTrail";
import Engagement from "@/components/sections/Engagement";
import Expertise from "@/components/sections/Expertise";
import FAQ from "@/components/sections/FAQ";
import { company } from "@/content/company";

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
  address: {
    "@type": "PostalAddress",
    streetAddress: "Tornimäe tn 5",
    postalCode: "10145",
    addressLocality: "Tallinn",
    addressCountry: "EE",
  },
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <Hero />
      <Toolbelt />
      <AboutIntro />
      <Proof />
      <Expertise />
      <DeliveryTrail />
      <Work />
      <div className="border-t border-line">
        <Engagement />
      </div>
      <InsightsPreview />
      <div className="border-t border-line">
        <FAQ />
      </div>
    </>
  );
}
