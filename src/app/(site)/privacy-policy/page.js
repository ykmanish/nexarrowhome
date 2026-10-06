import LegalDoc from "@/components/sections/LegalDoc";
import { privacyPolicy } from "@/content/legal";
import { paths } from "@/lib/routes";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How Nexarrow OÜ collects, uses, stores and protects personal data.",
  path: paths.privacy,
});

export default function PrivacyPage() {
  return <LegalDoc title="Privacy Policy" doc={privacyPolicy} />;
}
