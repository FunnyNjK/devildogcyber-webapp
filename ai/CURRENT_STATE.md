# Current State

Last Updated: 2026-05-05

## Current Phase
Phase **3** Done (**P3-B1**, **P3-B2**). Next: **Phase 4** — **`P4-B1`** (**P4-T1**), human-paired.

## Current Task
Begin **Phase 4** **P4-T1** (Azure SWA + DNS) **with the human** — **Unattended: No**.

## What Exists Now
- **P3-B2:** **`scripts/js-budget.config.json`**, **`scripts/check-js-budget.mjs`** — per-route hydrated JS gzip totals + largest **`dist/_astro/*.js`** chunk ceiling; runs after **verify-build-seo** in **`pnpm build`**.
- **P3-B1** + **P2-B8** and earlier: per **`DONE_LOG.md`**.

## What Works
`pnpm lint` / **`typecheck`** / **`test`** / **`build`**; axe runs on **`dist`** when present; SEO verify + **JS budget** gate on build.

## What Is Not Built Yet
Phase **4** (Azure provision, OIDC workflow, production secrets, Postmark verify, cutover).

## Known Problems
Raster files are still **out of repo** — optimized images activate after copying assets into **`src/assets/images/devildog/...`** (**`HANDOFF.md`**). **`@azure/static-web-apps-cli`** may still **301** **`/contact` → `/contact/`** locally (**`TESTING.md`**, **ADR-021**).

## Important Files or Folders
**`scripts/js-budget.config.json`**, **`scripts/check-js-budget.mjs`**, **`src/components/ContentImage.astro`**, **`tests/a11y/`**.

## Next Recommended Action
Pair on **P4-T1** per **`TASKS.md`** / **`DEPLOYMENT.md`**; do not claim **Done** without human Azure/DNS steps.
