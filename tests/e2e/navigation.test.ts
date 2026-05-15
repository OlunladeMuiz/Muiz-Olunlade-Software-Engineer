import { expect, test } from '@playwright/test';

test('homepage renders the hero and navigation', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /Olunlade Abdulmuiz/i })).toBeVisible();
  await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Projects' })).toBeVisible();
});
