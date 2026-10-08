import { markImage } from "@/lib/og";

/**
 * A square PNG of the mark at /logo.png: the logo search engines show for the
 * organisation (they want a crawlable raster at least 112px square) and the
 * large icon in the web manifest.
 */
export const dynamic = "force-static";

export function GET() {
  return markImage({ size: 512, padding: 0.1 });
}
