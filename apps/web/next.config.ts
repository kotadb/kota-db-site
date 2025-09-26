import type { NextConfig } from "next";

import { getDashboardUrl } from "@kotadb/shared";

const nextConfig: NextConfig = {
  // Disable image optimization for Cloudflare
  images: {
    unoptimized: true,
  },
  async redirects() {
    const dashboardUrl = getDashboardUrl();
    return [
      {
        source: "/login",
        destination: `${dashboardUrl}/login`,
        permanent: false,
      },
      {
        source: "/auth/:path*",
        destination: `${dashboardUrl}/auth/:path*`,
        permanent: false,
      },
      {
        source: "/oauth/:path*",
        destination: `${dashboardUrl}/oauth/:path*`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
