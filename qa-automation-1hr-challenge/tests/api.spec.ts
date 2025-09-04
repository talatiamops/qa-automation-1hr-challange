import { test, expect, request } from '@playwright/test';

// TASK (Stretch): Simple API validation using Playwright's APIRequestContext.
// If you have no internet access, feel free to skip this file.
test('api: jsonplaceholder todos/1 contract', async ({ }) => {
  const ctx = await request.newContext();
  const res = await ctx.get('https://jsonplaceholder.typicode.com/todos/1');
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(body).toMatchObject({
    userId: 1,
    id: 1,
    title: expect.any(String),
  });
  expect(typeof body.completed).toBe('boolean');
  await ctx.dispose();
});
