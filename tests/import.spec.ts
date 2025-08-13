import { test, expect } from '@playwright/test';
import path from 'path';

const csvPath = path.join(__dirname, '../public/templates/accounts_metrics.csv');

test('import csv updates dashboard', async ({ page }) => {
  await page.goto('/imports');
  await page.setInputFiles('input[type="file"]', csvPath);
  await page.click('text=Upload CSV');
  await page.waitForSelector('text="inserted"', { timeout: 10000 });
  await page.goto('/');
  await expect(page.getByText('accounts', { exact: false })).toBeVisible();
});
