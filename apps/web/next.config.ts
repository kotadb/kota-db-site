import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable image optimization for Cloudflare
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
