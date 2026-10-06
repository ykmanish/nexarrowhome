import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // Pin the workspace root: a stray package-lock.json in the user's home dir
  // made Next infer the wrong root and emit a warning on every dev/build.
  turbopack: {
    root: __dirname,
  },
  // Company details and capabilities now live on the About page; keep the old
  // URLs working for anyone who bookmarked or linked them.
  async redirects() {
    return [
      { source: "/company", destination: "/about#company", permanent: true },
      { source: "/awards", destination: "/about#capabilities", permanent: true },
      // The open roles became a partner network for freelancers and agencies.
      { source: "/careers", destination: "/partners", permanent: true },
      { source: "/careers/:path*", destination: "/partners", permanent: true },
    ];
  },
};

export default nextConfig;
