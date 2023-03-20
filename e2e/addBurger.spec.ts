import { test, expect } from '@playwright/test';

test('adding new burger to page', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/otus_vue');
  await page.getByRole('button', { name: 'Добавить бургер' }).click();
  await page.getByLabel('Название').click();
  await page.getByLabel('Название').fill('Бургер');
  await page.locator('label').filter({ hasText: 'соус' }).click();
  await page.locator('span').filter({ hasText: 'бекон' }).click();
  await page.getByRole('button', { name: 'Добавить', exact: true }).click();

  const locator = page.getByRole('heading', { name: 'Бургер' });
  expect(locator).toBeTruthy();
});
