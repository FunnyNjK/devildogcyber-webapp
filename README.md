# DevilDog Cybersecurity — web

Public marketing site rebuild: Astro 5, React 19 islands, Tailwind 4, Azure Static Web Apps (Phase 4).

- Planning and task memory: [`/ai/START_HERE.md`](ai/START_HERE.md)
- Local dev (WSL): `pnpm install` → `pnpm dev` → http://localhost:4321
- Checks: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`
- Deploy: GitHub Actions **Deploy** workflow (Azure Static Web Apps). Secrets: **`AZURE_STATIC_WEB_APPS_API_TOKEN`** (deploy); **`PUBLIC_TURNSTILE_SITE_KEY`** (optional but recommended for production **`/contact`** builds). SWA **Configuration** for Postmark / Turnstile / rate limits — see [`/ai/DEPLOYMENT.md`](ai/DEPLOYMENT.md) (**P4-B2** checklist).
