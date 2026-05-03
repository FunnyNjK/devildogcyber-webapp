# Current State

Last Updated: 2026-05-03

## Current Phase
Phase 2 — Core buildout (**in progress**). **P2-B6** Done; next batch **P2-B7**.

## Current Task
Pick up **P2-B7**: **P2-T11** + **P2-T12** contact UI + **`/api/contact`**.

## What Exists Now
- **P2-B6:** **`/about`** — legacy **`(marketing)/about/page.tsx`** port: gradient hero, three principle cards, story image + **`storyContent`** block; copy in **`aboutPageContent.ts`** (ADR-012). **`aboutPrinciples`** removed from **`siteContent.ts`**. **`navLinks`** asserts static **`/about`**.
- **P2-B5:** **`/about-us`** leadership page — backdrop hero + **team** grid aligned with legacy **`DetailPage.tsx`** (`TeamCard`). **`detailPages`** hero type gains optional **`layout?: 'backdrop'`**. **`navLinks`** asserts **`/about-us`**.
- **P2-B4:** **`detailPages`** already included compliance overview + CMMC/CMMI/NIST 800-171/GLBA/HIPAA/HITRUST/ISO 27001–27002 from **P2-B2** port; **`public/images/devildog/pages`** has matching imagery (e.g. `compliance.jpg`, `hitrust.jpg`, framework heroes). **`tests/content/navLinks.test.ts`** now asserts compliance routes explicitly.
- **P2-B3:** **P2-T5** / **P2-T6** / **P2-T8** + nav regression `/ai-threats`, `/security-reconnaissance`, `/story`.
- **P2-B2:** Verbatim legacy `detailPages`, `[...slug].astro`, detail partials + assets.

## What Works
Static HTML build for compliance hub + all framework URLs, nav groups, Services, Story, **`/about`**, stub for **`/contact`** until **P2-B7**.

## What Is Not Built Yet
Contact form + API (**P2-B7**), SWA infra (**P4**), SEO finalization (**P2-B8**) after route set stabilizes.

## Known Problems
None at repo level. **`/contact`** stub remains until **P2-B7**.

## Important Files or Folders
`src/content/aboutPageContent.ts`, `src/pages/about.astro`, `src/content/detailPages.ts`, `src/pages/[...slug].astro`, `src/components/detail/DetailPageSections.astro`, `tests/content/navLinks.test.ts`, `public/images/devildog/pages/`, `public/images/devildog/team/`

## Next Recommended Action
Run **P2-B7**: contact page + **`/api/contact`** (P2-T11 + P2-T12).
