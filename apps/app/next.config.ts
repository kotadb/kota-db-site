import type { NextConfig } from "next";
import { config } from "dotenv";
import path from "path";

// Load environment variables from root .env file
config({ path: path.resolve(process.cwd(), "../../.env") });

const nextConfig: NextConfig = {
  eslint: {
    // Skip ESLint during production builds
    // We run ESLint separately in CI
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip TypeScript errors during production builds
    // We run type checking separately in CI
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
