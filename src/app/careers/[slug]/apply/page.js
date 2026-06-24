import NexarrowApp from "@/components/NexarrowApp";
import { applyRoute } from "@/lib/routes";

export default async function JobApply({ params }) {
  const { slug } = await params;

  return <NexarrowApp initialRoute={applyRoute(slug)} />;
}
