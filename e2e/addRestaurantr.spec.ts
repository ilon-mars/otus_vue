import { test, expect } from '@playwright/test';

test('adding new restaurant to page', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/otus_vue');
  await page.goto('http://127.0.0.1:5173/');
  await page.getByRole('link', { name: 'Рестораны', exact: true }).click();
  await page.getByRole('button', { name: 'Добавить ресторан' }).click();
  await page.getByLabel('Название').click();
  await page.getByLabel('Название').fill('Ресторан');
  await page.getByLabel('Адрес заведения').click();
  await page.getByLabel('Адрес заведения').fill('ул. Матросская, 25');
  await page.getByLabel('Добавьте бургеры, которые здесь готовят').click();
  await page.locator('form').getByText('Легенда').click();
  await page.getByRole('button', { name: 'Добавить', exact: true }).click();

  const locator = page.getByRole('heading', { name: 'Ресторан' });
  expect(locator).toBeTruthy();
});
