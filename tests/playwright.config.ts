import { defineConfig } from '@playwright/test';

// Minimal Playwright config that builds and serves the marketing site
// locally, then runs smoke tests against it.
export default defineConfig({
  testDir: './smoke',
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: 'http://localhost:3010',
    headless: true,
  },
  webServer: {
    // Serve the prebuilt static output from Cloudflare adapter
    command: "npx -y serve@14 -s apps/web/.vercel/output/static -l 3010",
    url: 'http://localhost:3010',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
