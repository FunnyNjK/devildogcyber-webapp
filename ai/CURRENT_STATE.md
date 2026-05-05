# Current State

Last Updated: 2026-05-06

## Current Phase
**Phase 4** — **P4-B1** (**P4-T1**) **Done**. Next: **P4-B2** (**P4-T2**, **P4-T3**) — SWA app settings + secrets.

## Current Task
**P4-B2:** Enter production env vars on SWA **`devildogcyber`** and optional **`PUBLIC_TURNSTILE_SITE_KEY`** GitHub secret; smoke-test site and **`/api/contact`**.

## What Exists Now
- **Azure:** **`devil-web-rg`**, SWA **`devildogcyber`** (**Standard**, **centralus**); site **`https://polite-sky-09fcf0610.7.azurestaticapps.net`** (default hostname).
- **CI/CD:** **`ci.yml`**, **`deploy.yml`** green on **`main`**; repo secret **`AZURE_STATIC_WEB_APPS_API_TOKEN`**.
- **P1–P3** deliverables: per **`DONE_LOG.md`**.

## What Works
`pnpm lint` / **`typecheck`** / **`test`** / **`build`** (with **Node 24**); GitHub **CI** + **Deploy**.

## What Is Not Built Yet
Production **Configuration** (Postmark, Turnstile, etc.), **GoDaddy** DNS / apex (**P4-T6**), full **contact** E2E in prod.

## Known Problems
Raster assets may be missing under **`src/assets/images/devildog/...`**.

## Important Files or Folders
**`.github/workflows/deploy.yml`**, **`/ai/DEPLOYMENT.md`**, **`api/contact/`**.

## Next Recommended Action
Portal → **`devildogcyber`** → **Configuration** — add app settings from **`DEPLOYMENT.md`** table; set Functions runtime **Node 24** if needed.
