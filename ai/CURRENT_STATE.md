# Current State

Last Updated: 2026-05-03

## Current Phase
Phase 2 **complete** (**P2-B8**); next **Phase 3** — **P3-B1**.

## Current Task
Start **P3-B1**: **P3-T1** + **P3-T2** + **P2-I4** + **P2-I6** (Lighthouse, a11y, images, motion/focus).

## What Exists Now
- **P2-B8:** SEO baseline — **`@astrojs/sitemap`** + **`scripts/verify-build-seo.ts`**, **`public/robots.txt`**, **`public/staticwebapp.config.json`** (see **`HANDOFF.md`**, **ADR-021**).
- **P2-B7–P2-B1:** prior buildout (layout, pages, contact API) per **`DONE_LOG.md`**.

## What Works
`pnpm lint`/`typecheck`/`test`; **`pnpm build`** bundles Astro → **`dist/`** plus API bundle; build verifies **sitemap** URL parity vs **`detailPages`** and **robots**/**SWA** config presence.

## What Is Not Built Yet
Phase **3–4**: hardening, Azure SWA + DNS (**P4**).

## Known Problems
**`@azure/static-web-apps-cli`** (v2.0.9): may still **301** **`/contact` → `/contact/`** locally despite **`trailingSlash: "never"`**; production follows Azure (**`TESTING.md`**, **ADR-021**).

## Important Files or Folders
**`astro.config.ts`**, **`public/robots.txt`**, **`public/staticwebapp.config.json`**, **`scripts/verify-build-seo.ts`**, **`tests/deploy/sitePublicSurface.test.ts`**.

## Next Recommended Action
Kick off **P3-B1** per **`TASKS.md`** batch table — e.g. next batch only:
**`./run-phase-cursor.sh 1`**; full Phase 3: **`./run-phase-cursor.sh 2`**.
(Same **`N`** with **`./run-phase.sh`** if using Claude Code.)
