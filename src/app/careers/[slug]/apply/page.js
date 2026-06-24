import NexarrowApp, { applyRoute } from "@/components/NexarrowApp";

export default async function JobApply({ params }) {
  const { slug } = await params;

  return <NexarrowApp initialRoute={applyRoute(slug)} />;
}
