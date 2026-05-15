import { expect, test } from '@playwright/test';

test('project modal opens and closes from a project card', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: /Open FXGuard project details/i }).click();
  await expect(page.getByRole('dialog')).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});
