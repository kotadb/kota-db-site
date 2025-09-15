import { test, expect } from '@playwright/test';

test.describe('Dashboard app smoke', () => {
  test('root page renders redirect placeholder', async ({ page }) => {
    const res = await page.goto('/index.html');
    expect(res?.ok()).toBeTruthy();
    await expect(page.getByText(/please wait while we check your authentication/i)).toBeVisible();
  });
});
