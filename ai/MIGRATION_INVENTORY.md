# Migration Inventory — devildog (old) → devildogcyber-webapp (new)

Last Updated: 2026-05-02

This document is the bridge between the legacy site at `~/repos/devildog`
(Next.js 15 + App Router, Azure App Service) and the new site in this
repository (Astro 5 + React 19 + Tailwind 4, Azure SWA managed API).

The legacy repo is **read-only**. Nothing here implies modification of
the old codebase; the old site keeps running until DNS cutover (P4-T6).

---

## Page mapping

URL paths preserved verbatim so external SEO signals remain valid.

| Old URL                                       | New file                                                        | Status   | Task    |
| --------------------------------------------- | --------------------------------------------------------------- | -------- | ------- |
| `/`                                           | `src/pages/index.astro`                                         | Backlog  | P2-T2   |
| `/about`                                      | `src/pages/about.astro`                                         | Backlog  | P2-T10  |
| `/contact`                                    | `src/pages/contact.astro` + `ContactForm.tsx`                   | Backlog  | P2-T11  |
| `/services`                                   | via `src/pages/[...slug].astro` (slug `services`)               | Backlog  | P2-T4   |
| `/services/executive-services`                | catch-all                                                       | Backlog  | P2-T4   |
| `/services/maritime/yacht-services`           | catch-all                                                       | Backlog  | P2-T4   |
| `/services/maritime/port-services`            | catch-all                                                       | Backlog  | P2-T4   |
| `/services/maritime/ship-builder-services`    | catch-all                                                       | Backlog  | P2-T4   |
| `/services/identity-management`               | catch-all                                                       | Backlog  | P2-T4   |
| `/services/security-monitoring`               | catch-all                                                       | Backlog  | P2-T4   |
| `/services/risk-assessment`                   | catch-all                                                       | Backlog  | P2-T4   |
| `/services/security-controls`                 | catch-all                                                       | Backlog  | P2-T4   |
| `/services/training`                          | catch-all                                                       | Backlog  | P2-T4   |
| `/services/documentation`                     | catch-all                                                       | Backlog  | P2-T4   |
| `/services/penetration-testing`               | catch-all                                                       | Backlog  | P2-T4   |
| `/services/watchdog-cloud`                    | catch-all                                                       | Backlog  | P2-T4   |
| `/ai-threats`                                 | catch-all                                                       | Backlog  | P2-T5   |
| `/security-reconnaissance`                    | catch-all                                                       | Backlog  | P2-T6   |
| `/compliance`                                 | catch-all                                                       | Backlog  | P2-T7   |
| `/compliance/cmmc`                            | catch-all                                                       | Backlog  | P2-T7   |
| `/compliance/cmmi`                            | catch-all                                                       | Backlog  | P2-T7   |
| `/compliance/nist-800-171`                    | catch-all                                                       | Backlog  | P2-T7   |
| `/compliance/glba`                            | catch-all                                                       | Backlog  | P2-T7   |
| `/compliance/hipaa`                           | catch-all                                                       | Backlog  | P2-T7   |
| `/compliance/hitrust`                         | catch-all                                                       | Backlog  | P2-T7   |
| `/compliance/iso-27001-27002`                 | catch-all                                                       | Backlog  | P2-T7   |
| `/story`                                      | catch-all                                                       | Backlog  | P2-T8   |
| `/about-us`                                   | catch-all                                                       | Backlog  | P2-T9   |
| `/api/contact` (POST)                         | `api/contact/index.ts` (Azure Function)                         | Backlog  | P2-T12  |
| `/api/turnstile/config` (GET)                 | **dropped** — Astro `PUBLIC_TURNSTILE_SITE_KEY` at build time   | Drop     | —       |
| `/robots.txt`                                 | `public/robots.txt` or `@astrojs/sitemap` integration           | Backlog  | P2-T13  |
| `/sitemap.xml`                                | `@astrojs/sitemap` integration                                  | Backlog  | P2-T13  |

Total: 27 user-facing pages (1 home + 1 about + 1 contact + 24 detail-system
pages including `services`, `compliance`, and 22 nested children) plus
`/api/contact`. The legacy `[...slug]/page.tsx` enumerates 24 detail
slugs in `detailPages`; the catch-all template will pre-render all of them.

---

## Asset mapping

Source: `~/repos/devildog/public/images/devildog/`. Target:
`public/images/devildog/`. Filenames and folder layout preserved verbatim
so JSON content references (`imageSrc: '/images/devildog/.../foo.jpg'`)
keep working after the port.

| Source path                                                                | Target path                                                                | Where referenced (legacy `siteContent.ts` / `detailPages.ts`)            |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `public/images/devildog/logo-white.png`                                    | `public/images/devildog/logo-white.png`                                    | header / OG fallback                                                    |
| `public/images/devildog/home/affordable-pricing.jpg`                       | same                                                                       | home `featureCards`                                                     |
| `public/images/devildog/home/flyover.jpeg`                                 | same                                                                       | story page hero                                                         |
| `public/images/devildog/home/iceberg.jpg`                                  | same                                                                       | home + risk assessment + pentest hero                                    |
| `public/images/devildog/home/looking-up-trees.jpg`                         | same                                                                       | home hero / default OG / about-us hero                                  |
| `public/images/devildog/home/man-on-peak.jpg`                              | same                                                                       | home + risk assessment                                                  |
| `public/images/devildog/home/robust-infrastructure.jpg`                    | same                                                                       | home `featureCards` + security controls                                 |
| `public/images/devildog/home/surfer.jpg`                                   | same                                                                       | mission section                                                         |
| `public/images/devildog/pages/ai-threats.jpeg`                             | same                                                                       | AI Threats page hero                                                    |
| `public/images/devildog/pages/badge.jpeg`                                  | same                                                                       | docs + compliance + story                                               |
| `public/images/devildog/pages/compliance.jpg`                              | same                                                                       | services hub + compliance hub + AI threats + monitoring                 |
| `public/images/devildog/pages/doctor.jpg`                                  | same                                                                       | (legacy: HIPAA secondary — verify use)                                  |
| `public/images/devildog/pages/documentation.jpg`                           | same                                                                       | documentation page hero                                                 |
| `public/images/devildog/pages/executive-service.jpeg`                      | same                                                                       | executive services + AI threats secondary                               |
| `public/images/devildog/pages/finance.jpg`                                 | same                                                                       | GLBA framework hero                                                     |
| `public/images/devildog/pages/healthcare.jpg`                              | same                                                                       | HIPAA framework hero                                                    |
| `public/images/devildog/pages/hitrust.jpg`                                 | same                                                                       | HITRUST framework hero                                                  |
| `public/images/devildog/pages/identity-management.jpg`                     | same                                                                       | identity management hero                                                |
| `public/images/devildog/pages/iso.jpg`                                     | same                                                                       | ISO 27001/27002 hero                                                    |
| `public/images/devildog/pages/military-plane.jpg`                          | same                                                                       | CMMC + NIST 800-171 hero                                                |
| `public/images/devildog/pages/military-tank.jpg`                           | same                                                                       | CMMI hero                                                                |
| `public/images/devildog/pages/monitoring.jpg`                              | same                                                                       | security monitoring hero                                                |
| `public/images/devildog/pages/penetration-testing.jpg`                     | same                                                                       | pentest hero + executive secondary                                      |
| `public/images/devildog/pages/port-services.jpg`                           | same                                                                       | port services hero                                                       |
| `public/images/devildog/pages/reconnaissance.jpeg`                         | same                                                                       | security reconnaissance hero                                            |
| `public/images/devildog/pages/security-controls.jpg`                       | same                                                                       | security controls hero                                                   |
| `public/images/devildog/pages/ship-builder-services.jpg`                   | same                                                                       | ship builder hero                                                       |
| `public/images/devildog/pages/training.jpg`                                | same                                                                       | training hero                                                           |
| `public/images/devildog/pages/watchdog-cloud.jpg`                          | same                                                                       | watchdog cloud + identity secondary + maritime overview                 |
| `public/images/devildog/pages/yacht-services.jpg`                          | same                                                                       | yacht services hero                                                     |
| `public/images/devildog/team/isaac-james.jpg`                              | same                                                                       | about-us team grid                                                      |
| `public/images/devildog/team/jesus-borrego.jpeg`                           | same                                                                       | about-us team grid                                                      |
| `public/images/devildog/team/steve-beaty.jpg`                              | same                                                                       | about-us team grid                                                      |
| `public/images/devildog/team/tommy-wells.jpg`                              | same                                                                       | about-us team grid                                                      |

Total: 1 logo + 7 home + 22 page + 4 team = **34 image files** to copy over.

Image-rights note: assume DevilDog already owns or has licensed every
image since they are live on the production site today. No new images
need to be acquired for the rebuild. Verify with marketing only if a
specific replacement is desired during P2-I4 (image optimization).

---

## Content mapping

Source: typed TypeScript modules in the legacy repo. Target: typed
TypeScript modules in `src/content/`. Copy verbatim (with formatting
fixes only — quotes, line wrapping). The legacy module structure is
already well-shaped for direct port.

| Section / data                          | Source (legacy)                                            | Target (new)                                  | Notes                                                              |
| --------------------------------------- | ---------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------ |
| Site metadata, nav, footer, social      | `src/features/site/siteContent.ts`                         | `src/content/siteContent.ts`                  | Verbatim copy. Update OG fallback path if folder moves.            |
| All detail pages (services / compliance / story / about-us / AI threats / reconnaissance) | `src/features/site/detailPages.ts`                         | `src/content/detailPages.ts`                  | Verbatim copy. Re-export `slugToPath` and `getDetailPageBySlug`.   |
| Contact page copy                       | `src/features/contact/contactContent.ts`                   | `src/content/contactContent.ts`               | Verbatim copy.                                                     |
| Team members                            | `teamMembers` constant inside `detailPages.ts`             | extract to `src/content/teamMembers.ts`       | Refactor: extract from inline scope so the team is reusable.       |
| Home hero, mission, feature cards, service highlights | exports in `siteContent.ts`                                | same in `src/content/siteContent.ts`          | Direct port.                                                       |
| Story content + about principles        | exports in `siteContent.ts`                                | same in `src/content/siteContent.ts`          | Direct port.                                                       |
| About page (`/about`) copy              | inline in `src/app/(marketing)/about/page.tsx`             | `src/content/aboutPageContent.ts` + page      | Refactor: legacy left this inline; lift to typed module per ADR-012. |
| SEO helpers + JSON-LD                   | `src/features/site/seo.ts`                                 | `src/lib/seo.ts`                              | Direct port. Replace `next/Metadata` type with Astro-friendly shape.|
| Contact validation                      | `src/features/contact/contactValidation.ts` + `.test.ts`   | `src/lib/contactValidation.ts` + tests        | Direct port (per ADR-015).                                         |
| Postmark client                         | `src/features/contact/postmark.ts` + `.test.ts`            | `api/contact/lib/postmark.ts` + tests         | Move to API workspace; remove `'use server'` (no longer Next.js).  |
| Turnstile verification                  | `src/features/contact/turnstile.ts` + `.test.ts`           | `api/contact/lib/turnstile.ts` + tests        | Move to API workspace.                                             |

---

## Drop list (with reasons)

Things present in the legacy repo that the new repo does **not** carry.

| Item                                                            | Why dropped                                                                                                         |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `Dockerfile`, `docker-compose.yml`, `.dockerignore`, `docker/`  | App is WSL-native (ADR-001). No container for dev or build.                                                         |
| `scripts/setup-local.ps1`, `scripts/setup-local.sh`             | Replaced by a one-paragraph "WSL setup" section in `README.md`.                                                     |
| `.github/workflows/deploy-azure-gov.yml` (App Service deploy)   | Replaced by SWA deploy via `Azure/static-web-apps-deploy@v1` (ADR-005).                                             |
| `next.config.ts`, `next-env.d.ts`, Next.js `proxy.ts`           | Stack swap to Astro. www→apex redirect now lives in `staticwebapp.config.json` (ADR-014).                           |
| `postcss.config.mjs`                                            | Tailwind 4 uses the Vite plugin (ADR-003); no PostCSS config needed.                                                |
| `src/app/api/turnstile/config/route.ts`                         | Was a workaround for App Service runtime env. Astro `PUBLIC_*` build-time injection is sufficient.                  |
| `@swc/helpers` explicit dependency                              | Was an Oryx/standalone-build workaround for App Service. Not relevant to Astro/SWA.                                 |
| `'use client'` directives                                       | Astro hydrates components per `client:*` directive on the page; no per-component opt-in needed.                     |
| `next/Image`                                                    | Replaced by Astro's built-in `<Image>` from `astro:assets` (or hand-tuned `srcset`).                                |
| `next/Link`                                                     | Replaced by plain `<a href>` in `.astro` files; React islands use plain anchors too (no client-side routing).       |
| `AGENTS.md`, `CODEX_KICKOFF.txt`, `PROJECT_STATUS.md`           | Legacy AI workflow docs. New repo uses the standardized `/ai/` workflow; `PROJECT_STATUS.md` is replaced by the `/ai/*.md` set. |
| `SECURITY.md`                                                   | Carry over later if marketing wants it. Not part of the v1 launch scope.                                            |
| `docs/architecture.md`, `docs/figma-workflow.md`                | Superseded by `/ai/ARCHITECTURE.md` + `MIGRATION_INVENTORY.md`. `figma-workflow.md` not relevant to this rebuild.   |
| `docs/github-hardening-checklist.md`                            | Useful reference; carry over to the new repo's `docs/` only if/when needed (deferred — not in v1 scope).            |
| ESLint config from legacy repo                                  | Replaced with ESLint 9 flat config tuned for Astro + React + TypeScript (P1-T1).                                    |

---

## Improvement list

Each item is queued as a `P2-I*` task in `/ai/TASKS.md`. The bar for an
improvement is: visible win for users (perf, a11y, mobile UX) or for
operators (less infra surface area), achievable inside the rebuild
window without scope creep.

| ID     | Improvement                                              | Linked task |
| ------ | -------------------------------------------------------- | ----------- |
| I-1    | Self-hosted fonts via `@fontsource` (no Google CDN)      | P2-I1       |
| I-2    | Honeypot field on contact form (was not present in old)  | P2-I2       |
| I-3    | Per-IP sliding-window rate limit on `/api/contact`       | P2-I3       |
| I-4    | Image optimization (responsive `srcset`, AVIF/WebP, lazy)| P2-I4       |
| I-5    | Accessibility pass on nav dropdowns (keyboard / ARIA)    | P2-I5       |
| I-6    | Reduced-motion + focus-visible styling tokens            | P2-I6       |
| I-7    | Per-page LCP image preload (home + each detail hero)     | folded into P2-I4 |
| I-8    | Static-first delivery — replace SSR contact-only page    | inherent in stack swap |
| I-9    | www→apex redirect at the edge, not in app code           | covered by ADR-014 + P2-T13 |
| I-10   | Single source of truth for contact validation (ADR-015)  | P2-T11 + P2-T12 acceptance criteria |

---

## Migration risks

| Risk                                                                                       | Mitigation                                                                                                          |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| Postmark sender re-verification needed because hosting moves to SWA                        | Postmark verifies the **sender domain** (DKIM), not the host. As long as `devildogcyber.com` DKIM stays in DNS, no action needed. Verify before cutover. |
| Turnstile site key locked to a hostname that excludes preview environments                 | Turnstile dashboard supports multiple allowed hostnames. Add the SWA preview host pattern (`*.<id>.azurestaticapps.net`) before P2-T11 lands.            |
| URL drift breaks SEO                                                                       | Page-mapping table above is the SEO contract. Add a redirect-test in P2-T13 that asserts every old URL still 200s on the new build.                     |
| Old App Service still answering after DNS cutover                                          | Don't decommission for at least one week post-cutover. Cloudflare DNS flip is fast rollback.                                                            |
| Image filenames change during port and break content references                            | Filenames preserved verbatim (see Asset mapping). Don't rename during the port; rename in a follow-up only if needed.                                   |
| Contact form schema drift between client and server                                        | Single shared module per ADR-015. Tests live next to the module.                                                                                        |
