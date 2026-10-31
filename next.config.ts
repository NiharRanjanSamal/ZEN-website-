import type { NextConfig } from "next";

/**
 * Next.js resolves distDir as path.join(projectRoot, distDir). A root `.next` on
 * OneDrive often corrupts when dev and build run at once (ENOENT on manifest temps).
 */
const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR ?? "node_modules/.cache/zenuino-next",
  transpilePackages: ["locomotive-scroll", "lenis"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "zenuino.in",
      },
    ],
  },
};

export default nextConfig;
