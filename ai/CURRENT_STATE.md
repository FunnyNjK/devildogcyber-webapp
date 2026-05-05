# Current State

Last Updated: 2026-05-05

## Current Phase
Phase 3 — **`P3-B1`** complete; next batch **`P3-B2`** (**P3-T3**).

## Current Task
Execute **P3-B2**: bundle size budget (**P3-T3**).

## What Exists Now
- **P3-B1:** **`ContentImage.astro`**, **`src/lib/contentImages.ts`**, LCP preload (**`BaseLayout`** **`lcpPreloadHref`**), **`prefers-reduced-motion`** in **`global.css`**, **`tests/a11y/dist-html-axe.test.ts`**, deps **`sharp`**, **`axe-core`**, **`jsdom`**; CI **Build** before **Test** (**.github/workflows/ci.yml**).
- **P2-B8** and earlier: per **`DONE_LOG.md`**.

## What Works
`pnpm lint` / **`typecheck`** / **`test`** / **`build`**; axe runs on **`dist`** when present; **verify-build-seo** unchanged.

## What Is Not Built Yet
**P3-B2** thresholds; Phase **4** (Azure SWA, DNS, secrets).

## Known Problems
Raster files are still **out of repo** — optimized images activate after copying assets into **`src/assets/images/devildog/...`** (**`HANDOFF.md`**). **`@azure/static-web-apps-cli`** may still **301** **`/contact` → `/contact/`** locally (**`TESTING.md`**, **ADR-021**).

## Important Files or Folders
**`src/components/ContentImage.astro`**, **`src/lib/contentImages.ts`**, **`src/assets/images/`**, **`tests/a11y/`**, **`BaseLayout.astro`**.

## Next Recommended Action
Start **P3-B2** per **`TASKS.md`**: **`./run-phase-cursor.sh 1`** (Phase 3 second batch only) after pulling latest.
