# QA Automation 1‑Hour Mini‑Challenge (Playwright + TypeScript)

This exercise is designed to validate your technical skills, testing mindset, and problem‑solving under time constraints.
It uses a tiny local **Todo** app served as static files and a Playwright test suite.

## What we provide
- A minimal Todo web app under `app/` (there is an intentional defect to triage).
- A Playwright project with one **intentionally flaky** test and two additional specs.
- A working GitHub Actions workflow you can expand.

## Your 60‑minute goals
1. **Stabilize** `tests/add-todo.flaky.spec.ts` (rewrite using robust locators and expectations; remove sleeps).
2. **Add coverage** for filters in `tests/filter.spec.ts`. If you uncover a bug, document it in `NOTES.md` 
   (use `docs/BUG_REPORT_TEMPLATE.md`) and choose either to keep a failing test marked with `test.fixme` or to submit a small app fix.
3. **CI thinking**: Update `.github/workflows/ci.yml` or paste a minimal Jenkins/Bitbucket/GitLab pipeline snippet in `NOTES.md` that runs the tests headlessly.
4. *(Stretch, optional)* Add a simple API test in `tests/api.spec.ts` (already scaffolded) or outline how you'd stub/mirror it when offline.

**Deliverables (in 60 minutes):**
- Updated tests and any small app fix (optional).
- `NOTES.md` with: your stabilization approach, bug summary, and brief CI thoughts.
- Commit messages that reflect intent and reasoning.

## Quick start
Requirements: Node.js 18+
```bash
npm ci
npx playwright install
npm test        # launches a local server via webServer config and runs tests in Chromium
npm run report  # open HTML report after a run
```

## Hints (best practices we look for)
- Prefer `getByTestId`, role-based locators, and `expect(...).toHaveText()/toHaveCount()` over sleeps.
- Keep tests independent; reset state via page reloads or app UI.
- Add useful assertions rather than many steps.
- Use Playwright trace on failure; attach screenshots if documenting a bug.
- Clear, small commits beat one giant commit.

## Evaluation rubric (100 pts)
- **Correctness & stability** (40): Tests pass locally; flaky test made reliable; failures are meaningful.
- **Testing design** (20): Coverage of key paths; negative case or edge case considered.
- **Problem‑solving** (20): Clear triage of discovered defect; pragmatic decision (fix vs. mark).
- **Code quality** (10): Readable diffs, naming, locators, assertions, comments.
- **Communication** (10): `NOTES.md` clarity; concise rationale; next steps.

## Optional extensions
- Enable cross‑browser matrix in `playwright.config.ts`.
- Parallelize and shard by file.
- Add Dockerfile or BrowserStack config notes.
