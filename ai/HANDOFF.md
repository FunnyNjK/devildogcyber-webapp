# AI Handoff

Last Updated: 2026-05-06

## Current State Summary
**P4-B3** **Done** (**P4-T4**, **P4-T5**): **`https://devildogcyber.com/contact`** → Postmark delivery confirmed; root fix was **Azure SWA Environment variables** for API (**`DEPLOYMENT.md`** **GitHub vs Azure**). **P4-B1**/**P4-B2** also **Done**.

**Ops:** Legacy **Azure Government** site removed; prod is **Azure Public** SWA **`devildogcyber`** (**ADR-023**).

## Last Completed Task
**P4-B3** — production contact E2E + Postmark (2026-05-06); **`DONE_LOG.md`**.

## Active Task
**P4-B4** — **P4-T6**: verify **www** → apex, Portal **default** custom domain, TLS (**ADR-021**) if not already signed off.

## Next Recommended Task
Spot-check **`https://www.devildogcyber.com`** → apex **301**; **Postmark** DKIM/domain polish if desired; **P3** Lighthouse/a11y follow-ups.

## What Is Blocked
None.

### Human follow-up (Partial — **P3-B1**)
Assets, Lighthouse on deploy URL, manual a11y, reduced-motion spot-check.

## Important Instructions for Next AI
Read **`/ai/START_HERE.md`**. **P4-T6** is **No** — registrar + Portal pairing for canonical host; close **P4-B4** when **ADR-021** checklist satisfied.

## Known Risks
Turnstile host allowlist for **`*.azurestaticapps.net`**; Postmark/DKIM at go-live; Functions **Node 24** in Portal (**ADR-018**).

## Tests / Checks Last Run
Human: **`/contact`** on **`devildogcyber.com`** → Postmark + inbox OK (2026-05-06).
