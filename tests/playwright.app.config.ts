import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './smoke-app',
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: 'http://localhost:3020',
    headless: true,
  },
  webServer: {
    // Serve the prebuilt static output from Cloudflare adapter using Python http.server for reliability
    command: 'python3 -m http.server 3020 -d apps/app/.vercel/output/static',
    url: 'http://localhost:3020',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
