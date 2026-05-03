# AI Handoff

Last Updated: 2026-05-03

## Current State Summary
**P2-B7** complete (**P2-T11**, **P2-T12**): **`/contact`** uses **`contactPageContent`** + **`ContactForm`** (**`client:visible`**) with shared **`contactValidation`** and Turnstile (site key via **`PUBLIC_TURNSTILE_SITE_KEY`**). Honeypot field name aligns with **`CONTACT_HONEYPOT_FIELD_NAME`** (default **`company_website`**). Managed API: **`POST /api/contact`** (Azure Functions v4 **`app.http`**, **`api/contact/index.js`** bundled with esbuild; imports shared validation from **`src/lib`**). **`pnpm build`** runs **`astro build` + api bundle**.

## Last Completed Task
**P2-B7:** **P2-T11** + **P2-T12** — Done 2026-05-03. See `DONE_LOG.md`.

## Active Task
**P2-B8** — **P2-T13** SEO + **`staticwebapp.config.json`** (+ sitemap / robots verification)

## Next Recommended Task
Execute **P2-B8**: per-page SEO pass, **`@astrojs/sitemap`**/`robots` verification vs routes, apex/www redirect via **`staticwebapp.config.json`**.

## What Is Blocked
Nothing on the AI side. Azure (**P4-B1**) is production-only.

## Important Instructions for Next AI
- Read `/ai/START_HERE.md`; honor `/ai/AI_RULES.md`, `/ai/DEV_ENVIRONMENT.md`.
- Batch IDs only as listed in `TASKS.md` (ADR-019).

## Known Risks
Image rights; Postmark/DKIM before **P4-B4**; Turnstile allowlist for SWA preview.

## Tests / Checks Last Run
`pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` — all exit 0 (2026-05-03, WSL).
