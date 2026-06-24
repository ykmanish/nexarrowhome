import NexarrowApp from "@/components/NexarrowApp";
import { articleRoute } from "@/lib/routes";

export default async function InsightDetail({ params }) {
  const { slug } = await params;

  return <NexarrowApp initialRoute={articleRoute(slug)} />;
}
