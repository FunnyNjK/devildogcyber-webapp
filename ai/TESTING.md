# Testing Strategy

Last Updated: 2026-05-03

## Testing Status
Project-specific strategy documented. Defaults from the starter apply with
DevilDog-specific notes for content drift, the contact endpoint branches,
and the navigation/IA invariants.

---

## Required Test Types

### Unit tests (required)
- `src/lib/contactValidation.ts` — port the existing legacy tests verbatim
  (they cover name/email/company/message length boundaries and Turnstile
  token requirement).
- `src/lib/seo.ts` — output shape for `buildPageMetadata`,
  `getOrganizationJsonLd`, `getWebsiteJsonLd`.
- **`tests/content/navLinks.test.ts`** (landed **P2-B2**, extended **P2-B3**) — proves every href
  under `navigationGroups` resolves either to `/` + non-dynamic `*.astro`
  routes or to a slash path synthesized from `detailPages` (plus a guard so
  static pages never collide with the catch-all emitter); asserts batch routes
  `/ai-threats`, `/security-reconnaissance`, `/story`. Extend this pattern
  to `primaryNavigation`, footer groups, and CTA blocks inside page content once
  those surfaces freeze.
- `api/contact/lib/postmark.ts` — config validation, body building,
  HTML escaping, error handling.
- `api/contact/lib/turnstile.ts` — config validation, success path,
  failure path, missing-config path, network-error path.
- `api/contact/lib/rateLimit.ts` — sliding window math with `vi.useFakeTimers()`.

### Component tests (required for interactive components)
- `SiteHeader.tsx` — dropdown open/close (mouse + keyboard), mobile drawer
  toggle, Esc closes dropdowns, clicking a link closes the menu.
- `ContactForm.tsx` — validation errors per field, submit-success path,
  submit-error path, Turnstile token required, honeypot present in DOM.
- `TurnstileWidget.tsx` — renders, surfaces token to the form via the
  documented callback contract.

### Integration tests (recommended)
- `/api/contact` covering all six branches:
  1. valid payload → 200 + Postmark mock called once
  2. honeypot non-empty → 200 + Postmark mock NOT called
  3. rate limit exceeded → 429
  4. Turnstile verification fails → 400 with `{ ok: false }`
  5. Postmark API returns non-200 → 500 with neutral error
  6. payload fails server validation → 400

### End-to-end (deferred)
- Skipped at v1. If added later, use Playwright in `tests/e2e/` and run
  in a separate CI job.

### CI checks (required)
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test` (Vitest --run)
- `pnpm build`

---

## Testing Rules

- Every implementation task must include test expectations (see `TASKS.md`).
- Bug fixes should include regression tests.
- Refactors must preserve behavior unless explicitly approved.
- Do not delete or weaken tests just to make a build pass.
- Tests run as native Node processes in WSL — no Docker, no test runners
  in containers.
- Validation logic lives in `src/lib/contactValidation.ts` and is the
  single source of truth (per ADR-015). Both client and server tests
  consume the same module.

---

## Test Commands (default `package.json` scripts)

```bash
pnpm test                  # vitest --run
pnpm test:watch            # vitest
pnpm lint                  # eslint .
pnpm typecheck             # tsc -b --noEmit
pnpm build                 # astro build
```

API workspace (when contact endpoint exists):

```bash
pnpm --filter api test
pnpm --filter api typecheck
```

---

## Mock Strategy

- **Postmark:** mock `fetch` calls to `https://api.postmarkapp.com/email`
  via `vi.mock` or MSW. Don't hit the real Postmark API in tests.
- **Turnstile:** mock `fetch` calls to
  `https://challenges.cloudflare.com/turnstile/v0/siteverify`.
- **Rate limiter:** in-memory store with deterministic time control via
  `vi.useFakeTimers()`.
- **Astro `<Image>`:** if a component test pulls in an Astro image, stub
  to a plain `<img>` to keep Vitest fast.

---

## Coverage Expectations

- `src/lib/` and `api/contact/lib/`: target ≥ 80% line coverage.
- Components: behavior coverage > line coverage. One test per meaningful
  user flow, not one test per component file.
- Content modules: drift catchers (link-resolves test, image-exists test
  if practical) more valuable than pure type tests.

---

## Known Testing Gaps

- No accessibility automation in CI yet (axe-core integration tracked as
  P3-T2). Manual audit + Lighthouse counts as the v1 gate.
- No visual regression testing. Marketing-site scope; revisit if design
  churn becomes painful.
