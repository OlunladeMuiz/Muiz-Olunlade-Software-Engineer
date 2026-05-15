import { expect, test } from '@playwright/test';

test('theme toggle persists across reloads', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});
