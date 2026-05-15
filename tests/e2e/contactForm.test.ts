import { expect, test } from '@playwright/test';

test('contact form submits and shows a success toast', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Contact' }).click();

  await page.getByLabel('Name').fill('Muiz');
  await page.getByLabel('Email').fill('muiz@example.com');
  await page.getByLabel('Subject').fill('Project inquiry');
  await page.getByLabel('Message').fill('I would like to discuss a portfolio project with you.');
  await page.getByRole('button', { name: 'Send message' }).click();

  await expect(page.getByText('Message sent')).toBeVisible();
});
