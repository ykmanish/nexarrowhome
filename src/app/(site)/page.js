import Hero from "@/components/home/Hero";
import Audiences from "@/components/sections/Audiences";
import CaseStudies from "@/components/sections/CaseStudies";
import ContactSection from "@/components/sections/ContactSection";
import CrossBorder from "@/components/sections/CrossBorder";
import DeliveryTrail from "@/components/sections/DeliveryTrail";
import Expertise from "@/components/sections/Expertise";
import FAQ from "@/components/sections/FAQ";
import OneSystem from "@/components/sections/OneSystem";
import Safeguards from "@/components/sections/Safeguards";
import Testimonials from "@/components/sections/Testimonials";
import TrustStrip from "@/components/sections/TrustStrip";
import JsonLd from "@/components/site/JsonLd";
import { pageSeo } from "@/content/seo";
import { pageMeta } from "@/lib/meta";
import { paths } from "@/lib/routes";
import { webPage } from "@/lib/schema";

export const metadata = pageMeta({ ...pageSeo.home, path: paths.home, absolute: true });

/**
 * Ordered to build trust fast: one clear message, checkable facts, the
 * change we make (scattered work to one system), the core claim (four
 * disciplines, one team), proof, who it is for, the process,
 * the safeguards, how working across borders works, then questions and a
 * way to start.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={webPage({ path: paths.home, name: pageSeo.home.title, description: pageSeo.home.description })} />
      <Hero />
      <TrustStrip />
      <OneSystem />
      <Expertise />
      <CaseStudies />
      <Audiences />
      <Testimonials />
      <DeliveryTrail />
      <Safeguards />
      <CrossBorder />
      <FAQ />
      <ContactSection />
    </>
  );
}
