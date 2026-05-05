# AI Handoff

Last Updated: 2026-05-06

## Current State Summary
**Phase 3** complete. **Phase 4** — **P4-T1**: Azure **`devildogcyber`** + **`devil-web-rg`** live; GitHub **`AZURE_STATIC_WEB_APPS_API_TOKEN`** added (human). **Deploy** had been failing on **`pnpm/action-setup`** (duplicate version vs **`packageManager`** in **`package.json`**) — fixed in **`.github/workflows/deploy.yml`** + **`ci.yml`** (omit explicit pnpm version). Re-run or push to **`main`** and confirm **Deploy** green; then close **P4-T1**.

## Last Completed Task
**P3-B2** — **P3-T3** — Done 2026-05-05; see **`DONE_LOG.md`**.

## Active Task
**P4-B1** (**P4-T1**): confirm **Deploy Azure Static Web Apps** succeeds on **`main`** after workflow fix; then mark **P4-T1** **Done**. Custom domain (**GoDaddy**) = **P4-T6**.

## Next Recommended Task
**P4-B2**: SWA **Configuration** app settings (Postmark, Turnstile, build-time **`PUBLIC_*`** if needed), Entra/OIDC only if you add **`azure/login`** — see **`DEPLOYMENT.md`** **P4-T2+**.

## What Is Blocked
**P4-T1** **Done** blocked until **Deploy** workflow passes (secret is set; **pnpm** setup fix pushed).

### Human follow-up (Partial tasks from **P3-B1**)
See prior **`HANDOFF`** bullets (assets, Lighthouse, manual a11y, reduced-motion spot-check).

## Important Instructions for Next AI
- Read **`/ai/START_HERE.md`**; honor **`AI_RULES.md`**, **`DEV_ENVIRONMENT.md`**.
- **Phase 4** matrix in **`TASKS.md`** — no marking **P4-T1** **Done** without human Azure/GitHub steps.

## Known Risks
Image rights; Postmark/DKIM before go-live; **Turnstile** allowlist for SWA ***.azurestaticapps.net** preview + production hostname; SWA CLI vs **Node 24** runtime — set in Portal (**ADR-018**).

## Tests / Checks Last Run
`pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test` — all exit 0 (2026-05-05, WSL, Node 24).
