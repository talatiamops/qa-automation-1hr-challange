import { test, expect } from '@playwright/test';

// TASK A (Stabilization): This test is intentionally brittle.
// Make it reliable by:
//  1) Rewriting selectors to use getByTestId / role-based locators.
//  2) Removing any fixed sleeps (waitForTimeout) and relying on expect(...).
//  3) Adding clear assertions that verify the UI state.
// Do NOT edit the application for this task.
test('add one todo (intentionally flaky version)', async ({ page }) => {
  await page.goto('/');
  await page.fill('#new-todo', 'Buy milk');
  await page.click('text=Add'); // brittle
  await page.waitForTimeout(100); // brittle
  const items = await page.$$('#todo-list li'); // brittle
  expect(items.length).toBe(1);
});
