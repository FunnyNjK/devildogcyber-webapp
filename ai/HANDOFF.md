# AI Handoff

Last Updated: 2026-05-06

## Current State Summary
**Phase 3** complete. **Phase 4** — **P4-T1** nearly done in Azure: **`devil-web-rg`** + SWA **`devildogcyber`** (**Standard**, **centralus**) exist in subscription **`179ae124-553a-42c7-89cd-0d665cddef65`**; default host **`https://polite-sky-09fcf0610.7.azurestaticapps.net`**. Verified via **Azure MCP** (`subscription_list`, `group_list`, `group_resource_list`) + **`az`**. **Remaining for P4-T1:** GitHub secret **`AZURE_STATIC_WEB_APPS_API_TOKEN`** (see below) → green **Deploy** workflow.

## Last Completed Task
**P3-B2** — **P3-T3** — Done 2026-05-05; see **`DONE_LOG.md`**.

## Active Task
**P4-B1** (**P4-T1**): add GitHub secret **`AZURE_STATIC_WEB_APPS_API_TOKEN`** (deployment token from `az staticwebapp secrets list` or Portal → **Manage deployment token**), re-run **Deploy** on **`main`**. Custom domain (**GoDaddy**) = **P4-T6**.

## Next Recommended Task
**P4-B2**: SWA **Configuration** app settings (Postmark, Turnstile, build-time **`PUBLIC_*`** if needed), Entra/OIDC only if you add **`azure/login`** — see **`DEPLOYMENT.md`** **P4-T2+**.

## What Is Blocked
**P4-T1** **Done** blocked until **`AZURE_STATIC_WEB_APPS_API_TOKEN`** is in GitHub and **Deploy** succeeds (Azure resources are live).

### Human follow-up (Partial tasks from **P3-B1**)
See prior **`HANDOFF`** bullets (assets, Lighthouse, manual a11y, reduced-motion spot-check).

## Important Instructions for Next AI
- Read **`/ai/START_HERE.md`**; honor **`AI_RULES.md`**, **`DEV_ENVIRONMENT.md`**.
- **Phase 4** matrix in **`TASKS.md`** — no marking **P4-T1** **Done** without human Azure/GitHub steps.

## Known Risks
Image rights; Postmark/DKIM before go-live; **Turnstile** allowlist for SWA ***.azurestaticapps.net** preview + production hostname; SWA CLI vs **Node 24** runtime — set in Portal (**ADR-018**).

## Tests / Checks Last Run
`pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test` — all exit 0 (2026-05-05, WSL, Node 24).
