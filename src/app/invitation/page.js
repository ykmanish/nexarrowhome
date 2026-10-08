import LakshitaaInvitation from "@/components/LakshitaaInvitation";

export const metadata = {
  title: "Lakshitaa, co-found Nexarrow ✦ a tiny invite",
  description:
    "A handmade, sticker-covered invite asking Lakshitaa to co-found Nexarrow.",
  // A private page: kept out of search results without naming it in robots.txt.
  robots: { index: false, follow: false },
};

export default function InvitationPage() {
  return <LakshitaaInvitation />;
}
