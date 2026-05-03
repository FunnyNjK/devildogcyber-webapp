# Current State

Last Updated: 2026-05-03

## Current Phase
Phase 2 — Core buildout (**in progress**). **P2-B7** Done; next batch **P2-B8**.

## Current Task
Pick up **P2-B8**: **P2-T13** SEO baseline + **`staticwebapp.config.json`** (after route set stabilized).

## What Exists Now
- **P2-B7:** **`/contact`** — legacy marketing layout mirrored (dark hero + form section + sidebar CTA): **`contactPageContent.ts`**, **`ContactForm.tsx`** + **`TurnstileWidget.tsx`**, **`src/lib/contactValidation.ts`**. **`api/contact`** — Azure Functions v4 HTTP **`contact`** (`app.http`), Postmark/Turnstile/honeypot/sliding rate limit (**`CONTACT_RATE_LIMIT_*`**, per-IP **`x-forwarded-for`/`cf-connecting-ip`**). Shared validation bundled into **`api/contact/index.js`** via **`esbuild`**. **`pnpm-workspace`** + **`api`** package; root **`pnpm build`** bundles Functions.
- **P2-B6:** **`/about`** — ported legacy marketing About (see `DONE_LOG.md`).
- Earlier **P2-B1…P2-B5:** layout, detail system, hubs, **`/about-us`**.

## What Works
Static site builds; **`/contact`** renders; CI **`pnpm lint`/`typecheck`/`test`/`build`** exercises Astro + bundled API workspace.

## What Is Not Built Yet
**P2-B8** (SEO infra + apex/www config), Phase 4 SWA provisioning.

## Known Problems
None at repo level. Live Postmark/Turnstile need env vars in SWA (**P4**).

## Important Files or Folders
`src/pages/contact.astro`, `src/components/ContactForm.tsx`, `src/lib/contactValidation.ts`, `src/content/contactContent.ts`, `api/contact/`, `api/scripts/bundle-contact.mjs`, `pnpm-workspace.yaml`, `tests/components/ContactForm.test.tsx`, `tests/api/contact-handler.integration.test.ts`

## Next Recommended Action
Run **P2-B8** (**P2-T13**).
