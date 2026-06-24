import NexarrowApp from "@/components/NexarrowApp";
import { jobRoute } from "@/lib/routes";

export default async function JobDetail({ params }) {
  const { slug } = await params;

  return <NexarrowApp initialRoute={jobRoute(slug)} />;
}
