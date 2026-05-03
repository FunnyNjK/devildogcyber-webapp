# Current State

Last Updated: 2026-05-03

## Current Phase
Phase 2 — Core buildout (**in progress**). **P2-B3** Done; next batch **P2-B4**.

## Current Task
Pick up **P2-B4**: **P2-T7** (compliance hub + framework pages in `detailPages` — verify parity vs legacy if gaps appear).

## What Exists Now
- **P2-B3:** **P2-T5** / **P2-T6** / **P2-T8** satisfied by the same verbatim `detailPages` + `[...slug].astro` stack as **P2-B2**; routes `/ai-threats`, `/security-reconnaissance`, `/story` + assets confirmed; `navLinks.test.ts` asserts those paths exist.
- **P2-B2:** Verbatim legacy `src/content/detailPages.ts`; `src/pages/[...slug].astro` + `DetailPageSections.astro`, `DetailSplitSection.astro`, `DetailPageCta.astro`; `public/images/devildog/pages/` + `team/` ported from legacy; minimal `about.astro` + `contact.astro` for nav + invariant tests (`tests/content/navLinks.test.ts`). All `detailPages` routes + home + `/about` + `/contact` pre-render.
- **Earlier:** Chrome + SEO + home per **P2-B1** and **P1-B1**.

## What Works
- Full Services hub + eleven service URLs, compliance + frameworks, story + about-us, AI Threats, Security Recon — all static HTML from Astro build.

## What Is Not Built Yet
Contact form + API (**P2-B7**), SWA infra (**P4**), SEO finalization (**P2-B8**) after route set stabilizes.

## Known Problems
- None at repo level. `/contact` / `/about` are intentional stubs until **P2-B7** / **P2-B6** fuller content passes.

## Important Files or Folders
- `src/content/detailPages.ts`, `src/pages/[...slug].astro`, `src/components/detail/`

## Next Recommended Action
Execute **P2-B4** (**P2-T7**): compliance overview + framework detail pages — reconcile with `detailPages` (likely already present from legacy port); add tests or polish only if acceptance gaps appear.
