import { test, expect } from "@playwright/test";

test.describe("Marketing site smoke", () => {
  const dashboardUrl = (process.env.NEXT_PUBLIC_DASHBOARD_URL
    || "http://localhost:3001")
    .replace(/\/+$/, "");
  const expectedLoginHref = new URL("/login", `${dashboardUrl}/`).toString();

  test("homepage loads and shows primary CTA", async ({ page }) => {
    const res = await page.goto("/");
    expect(res?.ok()).toBeTruthy();
    await expect(
      page.getByRole("link", { name: /get started/i }).first(),
    ).toBeVisible();
  });

  test("pricing page loads", async ({ page }) => {
    const res = await page.goto("/pricing");
    expect(res?.ok()).toBeTruthy();
    await expect(
      page.locator("text=Simple, Transparent Pricing"),
    ).toBeVisible();
  });

  test("CTA points to app login", async ({ page }) => {
    await page.goto("/");
    const ctas = page.locator('a:has-text("Get Started")');
    const count = await ctas.count();
    expect(count).toBeGreaterThan(0);
    const hrefs = await Promise.all(
      Array.from({ length: count }, (_, i) => ctas.nth(i).getAttribute("href")),
    );
    expect(
      hrefs.some((href) => (href || "").startsWith(expectedLoginHref)),
    ).toBe(true);
  });
});
