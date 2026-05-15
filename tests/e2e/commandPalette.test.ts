import { expect, test } from '@playwright/test';

test('command palette opens and closes with keyboard shortcuts', async ({ page }) => {
  await page.goto('/');

  await page.keyboard.press(process.platform === 'darwin' ? 'Meta+K' : 'Control+K');
  await expect(page.getByRole('dialog', { name: /Command palette/i })).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: /Command palette/i })).toHaveCount(0);
});
