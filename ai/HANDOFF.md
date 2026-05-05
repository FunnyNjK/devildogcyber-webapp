# AI Handoff

Last Updated: 2026-05-06

## Current State Summary
**P4-T1** **Done**: SWA **`devildogcyber`** + **`devil-web-rg`**, GitHub **`AZURE_STATIC_WEB_APPS_API_TOKEN`**, **Deploy** workflow green on **`main`**. Live URL: **`https://polite-sky-09fcf0610.7.azurestaticapps.net`**. CI fixes: **`pnpm/action-setup`** (use **`packageManager`** only), **`pnpm typecheck`** runs **`astro sync`**, SWA **`app_location: dist`**.

## Last Completed Task
**P4-B1** — **P4-T1** — provision + first successful GitHub → Azure deploy (2026-05-06); see **`DONE_LOG.md`**.

## Active Task
**P4-B2** — **P4-T2** / **P4-T3**: SWA **Configuration** (Postmark, Turnstile, rate limit, honeypot); GitHub **`PUBLIC_TURNSTILE_SITE_KEY`** for production **Build** if contact page needs Turnstile. Optional Entra/OIDC for **`azure/login`**.

## Next Recommended Task
Configure app settings in Azure Portal for **`devildogcyber`**, smoke-test **`/contact`** (will need real secrets). **GoDaddy** + custom domain = **P4-T6**.

## What Is Blocked
None.

### Human follow-up (Partial — **P3-B1**)
Assets, Lighthouse on deploy URL, manual a11y, reduced-motion spot-check.

## Important Instructions for Next AI
Read **`/ai/START_HERE.md`**; **`TASKS.md`** matrix for **P4-T2**/**P4-T3** (**Partial** / **No**).

## Known Risks
Turnstile host allowlist for **`*.azurestaticapps.net`**; Postmark/DKIM at go-live; Functions **Node 24** in Portal (**ADR-018**).

## Tests / Checks Last Run
GitHub **Deploy** run **25405261583** — success (2026-05-06).
