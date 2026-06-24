import NexarrowApp, { jobRoute } from "@/components/NexarrowApp";

export default async function JobDetail({ params }) {
  const { slug } = await params;

  return <NexarrowApp initialRoute={jobRoute(slug)} />;
}
