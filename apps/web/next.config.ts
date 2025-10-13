import type { NextConfig } from "next";

const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://app.kotadb.io";

const nextConfig: NextConfig = {
  // Disable image optimization for Cloudflare
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/login",
        destination: `${DASHBOARD_URL}/login`,
        permanent: false,
      },
      {
        source: "/auth/:path*",
        destination: `${DASHBOARD_URL}/auth/:path*`,
        permanent: false,
      },
      {
        source: "/oauth/:path*",
        destination: `${DASHBOARD_URL}/oauth/:path*`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
