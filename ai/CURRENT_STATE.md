# Current State

Last Updated: 2026-05-06

## Current Phase
Phase **3** Done. **Phase 4** — **`P4-B1`** (**P4-T1**) **almost complete** in Azure; **GitHub deploy secret** + green **Deploy** run remain.

## Current Task
**P4-T1 (finish):** **`AZURE_STATIC_WEB_APPS_API_TOKEN`** is in repo secrets (human). **Deploy** was failing on **`pnpm/action-setup`** duplicate version — fixed by using **`package.json`** **`packageManager`** only in **`ci.yml`** / **`deploy.yml`**. Watch **Actions** for a green **Deploy** on **`main`**, then close **P4-T1**.

## What Exists Now
- **Azure (live):** **`devil-web-rg`** (**centralus**), SWA **`devildogcyber`** (**Standard**), default URL **`https://polite-sky-09fcf0610.7.azurestaticapps.net`**.
- **P4 repo:** **`.github/workflows/deploy.yml`**, **`scripts/azure/provision-swa.sh`**, **`/ai/DEPLOYMENT.md`**, **ADR-023**.
- **P3** and earlier: per **`DONE_LOG.md`**.

## What Works
Local **`pnpm lint`** / **`typecheck`** / **`test`** / **`build`**; **CI** on push/PR. **Deploy** runs on **`main`/PRs** once the token secret exists.

## What Is Not Built Yet
**P4-T1** until **Deploy** is green. **P4-T2+:** SWA app settings (Postmark, Turnstile, **`PUBLIC_TURNSTILE_SITE_KEY`** secret for build), **GoDaddy** DNS + apex (**P4-T6**).

## Known Problems
Raster assets may be missing under **`src/assets/images/devildog/...`**. Local SWA CLI trailing-slash behavior may differ from Azure (**ADR-021**).

## Important Files or Folders
**`.github/workflows/deploy.yml`**, **`scripts/azure/provision-swa.sh`**, **`/ai/DEPLOYMENT.md`**.

## Next Recommended Action
Paste deployment token into GitHub, confirm **Deploy** green, then mark **P4-T1** **Done** in **`TASKS.md`** / **`DONE_LOG.md`**.
