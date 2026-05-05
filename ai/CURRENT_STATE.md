# Current State

Last Updated: 2026-05-06

## Current Phase
Phase **3** Done. **Phase 4** — **`P4-B1`** (**P4-T1**) **in progress** (provision **`devildogcyber`** SWA + GitHub **`AZURE_STATIC_WEB_APPS_API_TOKEN`** — **ADR-023**).

## Current Task
**P4-T1:** **`az account set --subscription 179ae124-553a-42c7-89cd-0d665cddef65`** → **`./scripts/azure/provision-swa.sh`** (or Portal) → Portal **Manage deployment token** → GitHub secret → verify **Deploy** workflow on push to **`main`**.

## What Exists Now
- **P4:** **`.github/workflows/deploy.yml`**, **`scripts/azure/provision-swa.sh`** (defaults: **`devil-web-rg`**, **`devildogcyber`**, **`centralus`**, **Standard**), **`/ai/DEPLOYMENT.md`**, **ADR-023**.
- **P3-B2** / **P3-B1** / **P2-B8** and earlier: per **`DONE_LOG.md`**.

## What Works
Local **`pnpm lint`** / **`typecheck`** / **`test`** / **`build`**; CI **`ci.yml`**. **Deploy** will run on **`main`/PRs once the SWA deployment token secret exists.**

## What Is Not Built Yet
**P4-T1** not closed (no live SWA until human runs Azure steps). **P4-T2+**: app settings in SWA, Postmark/Turnstile production validation, **GoDaddy** DNS + apex default domain (**P4-T6**).

## Known Problems
Raster files may still be missing under **`src/assets/images/devildog/...`**. Local SWA CLI may **301** **`/contact` → `/contact/`** (**`TESTING.md`**, **ADR-021**).

## Important Files or Folders
**`.github/workflows/deploy.yml`**, **`scripts/azure/provision-swa.sh`**, **`/ai/DEPLOYMENT.md`**, **`/ai/DECISIONS.md`** (**ADR-023**).

## Next Recommended Action
Complete **P4-T1** acceptance checklist in **`DEPLOYMENT.md`**, then mark **P4-T1** **Done** and configure SWA app settings (**P4-B2**).
