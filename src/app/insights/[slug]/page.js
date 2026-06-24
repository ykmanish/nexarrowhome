import NexarrowApp, { articleRoute } from "@/components/NexarrowApp";

export default async function InsightDetail({ params }) {
  const { slug } = await params;

  return <NexarrowApp initialRoute={articleRoute(slug)} />;
}
