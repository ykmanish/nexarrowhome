import { markImage } from "@/lib/og";

/** The home-screen icon on iPhone and iPad: the mark on white. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return markImage({ size: 180, padding: 0.12 });
}
