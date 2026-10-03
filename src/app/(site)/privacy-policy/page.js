import LegalDoc from "@/components/sections/LegalDoc";
import { privacyPolicy } from "@/content/legal";
import { paths } from "@/lib/routes";

export const metadata = {
  title: "Privacy Policy",
  description: "How Nexarrow OÜ collects, uses, stores and protects personal data.",
  alternates: { canonical: paths.privacy },
};

export default function PrivacyPage() {
  return <LegalDoc title="Privacy Policy" doc={privacyPolicy} />;
}
