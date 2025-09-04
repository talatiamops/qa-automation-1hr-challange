# Candidate NOTES

Please use this file to briefly capture your work (aim for ~5–10 minutes total):

## A. Flakiness fix summary
- Key changes:
- Why they make the test stable:

## B. Bug triage (if you hit one)
- Defect summary:
- Root cause hypothesis:
- Did you leave the failing test or fix the app? (Explain trade-off)

## C. CI integration (pick one)
- If using GitHub Actions: describe any changes you would make beyond the provided ci.yml
- If Jenkins/Bitbucket/GitLab: paste a minimal pipeline snippet and steps to cache npm and run Playwright in headless mode.

## D. How would you scale this?
- Cross-browser, parallelism, sharding
- Recordings (traces), flaky test management
- Running on BrowserStack/Sauce or in containers
