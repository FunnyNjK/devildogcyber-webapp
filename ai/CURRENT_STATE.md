# Current State

Last Updated: 2026-05-06

## Current Phase
**Phase 4** — **P4-B3** **Done** (**P4-T4**, **P4-T5**). Next: **P4-B4** (**P4-T6**) canonical **www**→apex if needed.

## Current Task
**P4-T6:** Final custom-domain / **GoDaddy** alignment with **ADR-021** (optional if already verified).

## What Exists Now
- **Azure (commercial):** **`devil-web-rg`**, SWA **`devildogcyber`** (**Standard**, **centralus**); site **`https://polite-sky-09fcf0610.7.azurestaticapps.net`** (default hostname). Legacy **Azure Government** hosting for the old marketing site **decommissioned** (2026-05-06); do not confuse Gov endpoints with **`P4-T6`** DNS targets.
- **CI/CD:** **`ci.yml`**, **`deploy.yml`** green on **`main`**; repo secret **`AZURE_STATIC_WEB_APPS_API_TOKEN`**.
- **P1–P3** deliverables: per **`DONE_LOG.md`**.

## What Works
`pnpm lint` / **`typecheck`** / **`test`** / **`build`** (with **Node 24**); GitHub **CI** + **Deploy**; **`/contact`** → Postmark on **`devildogcyber.com`** (2026-05-06).

## What Is Not Built Yet
**P4-T6** sign-off if **www**→apex / default domain not yet validated; **P3** partial follow-ups (Lighthouse, assets, manual a11y).

## Known Problems
Raster assets may be missing under **`src/assets/images/devildog/...`**.

## Important Files or Folders
**`.github/workflows/deploy.yml`**, **`/ai/DEPLOYMENT.md`**, **`api/contact/`**.

## Next Recommended Action
Confirm **`www.devildogcyber.com`** → apex; **`DEPLOYMENT.md`** custom-domain steps. Optional: Postmark domain/DKIM hardening.
