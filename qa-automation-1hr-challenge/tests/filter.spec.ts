import { test, expect } from '@playwright/test';

// TASK B (Functional coverage):
// Implement robust tests for the All / Active / Completed filters.
// Steps to cover (suggested):
//  - Add two todos: A, B
//  - Complete B
//  - Assert 'All' shows A and B
//  - Assert 'Completed' shows only B
//  - Assert 'Active' shows only A  <-- You may discover a bug here. If so, capture it in NOTES.md
//
// If you hit the bug, you may:
//  - Keep the failing test and mark it with test.fixme while documenting the defect, OR
//  - Submit a small fix under app/app.js and enable the test.
//
// Keep tests deterministic and fast; avoid fixed sleeps.
test('filters work (you may discover a bug)', async ({ page }) => {
  await page.goto('/');
  const input = page.getByTestId('new-todo-input');
  const add = page.getByTestId('add-button');

  await input.fill('A');
  await add.click();
  await expect(page.getByTestId('todo-item')).toHaveCount(1);

  await input.fill('B');
  await add.click();
  await expect(page.getByTestId('todo-item')).toHaveCount(2);

  // Complete B
  const items = page.getByTestId('todo-item');
  const second = items.nth(1);
  await second.getByTestId('toggle-checkbox').check();

  // All
  await page.getByTestId('filter-all').click();
  await expect(items).toHaveCount(2);

  // Completed
  await page.getByTestId('filter-completed').click();
  await expect(page.getByTestId('todo-item')).toHaveCount(1);
  await expect(page.getByTestId('todo-item').locator('[data-testid="todo-text"]')).toHaveText(/B/);

  // Active (expected only A)
  await page.getByTestId('filter-active').click();
  // This is expected to be 1 (A) if the app is correct.
  await expect(page.getByTestId('todo-item')).toHaveCount(1);
  await expect(page.getByTestId('todo-item').locator('[data-testid="todo-text"]')).toHaveText(/A/);
});
