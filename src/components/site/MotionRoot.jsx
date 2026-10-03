"use client";

import { usePathname } from "next/navigation";
import { usePageMotion, useSmoothScroll } from "@/lib/motion";

/**
 * Lives in the site layout. Smooth scrolling is set up once; the reveal layer
 * is rebuilt on every pathname so nested routes (one article to the next) get
 * fresh triggers even when no layout or template remounts.
 */
export default function MotionRoot() {
  const pathname = usePathname();
  useSmoothScroll();
  usePageMotion(pathname);
  return null;
}
