import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  // Consolidate the apex domain onto the canonical www host with a permanent
  // 308 redirect — both currently serve 200, which splits ranking signals.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "welcomepalace.in" }],
        destination: "https://www.welcomepalace.in/:path*",
        permanent: true,
      },
    ];
  },
  // Baseline security headers — a small trust/best-practice signal and safe for
  // a static brochure site.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
