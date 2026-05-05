# Current State

Last Updated: 2026-05-05

## Current Phase
Phase **3** Done (**P3-B1**, **P3-B2**). **Phase 4** — **`P4-B1`** (**P4-T1**) **in progress** (human must provision SWA + confirm DNS checklist in **`DEPLOYMENT.md`**).

## Current Task
**P4-T1:** run **`scripts/azure/provision-swa.sh`** after **`az login`** (or Portal) and complete acceptance in **`/ai/DEPLOYMENT.md`** — **Unattended: No**; do **not** mark **Done** until verified in Azure/Cloudflare.

## What Exists Now
- **P4-T1 prep:** **`scripts/azure/provision-swa.sh`**, **`/ai/DEPLOYMENT.md`** **P4-T1** / **P4-T2+** sections (SWA still to be created in Azure by human).
- **P3-B2:** **`scripts/js-budget.config.json`**, **`scripts/check-js-budget.mjs`** — per-route hydrated JS gzip totals + largest **`dist/_astro/*.js`** chunk ceiling; runs after **verify-build-seo** in **`pnpm build`**.
- **P3-B1** + **P2-B8** and earlier: per **`DONE_LOG.md`**.

## What Works
`pnpm lint` / **`typecheck`** / **`test`** / **`build`**; axe runs on **`dist`** when present; SEO verify + **JS budget** gate on build.

## What Is Not Built Yet
Phase **4**: **P4-T1** not closed (SWA must exist in Azure); **`deploy.yml`** and OIDC (**P4-T2**); production secrets (**P4-T3**); Postmark verify + smoke (**P4-T3**–**P4-T5**); DNS cutover (**P4-T6**).

## Known Problems
Raster files are still **out of repo** — optimized images activate after copying assets into **`src/assets/images/devildog/...`** (**`HANDOFF.md`**). **`@azure/static-web-apps-cli`** may still **301** **`/contact` → `/contact/`** locally (**`TESTING.md`**, **ADR-021**).

## Important Files or Folders
**`scripts/azure/provision-swa.sh`**, **`/ai/DEPLOYMENT.md`** (**P4-T1** / **P4-T2+**), **`scripts/js-budget.config.json`**, **`scripts/check-js-budget.mjs`**, **`src/components/ContentImage.astro`**, **`tests/a11y/`**.

## Next Recommended Action
Human: **`az login`** → **`./scripts/azure/provision-swa.sh`** (or Portal) → **`DEPLOYMENT.md`** acceptance. Then AI/human: mark **P4-T1** **Done** and start **P4-B2**.
