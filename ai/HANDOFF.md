# AI Handoff

Last Updated: 2026-05-06

## Current State Summary
**P4-B1**–**P4-B3** **Done** — live **`devildogcyber.com`**, **`/contact`** → Postmark (**Azure SWA** env for API — **`DEPLOYMENT.md`** **GitHub vs Azure**). **P4-B4** (**P4-T6**) = **www**→apex + default domain sign-off (**ADR-021**). **Phase 5** = optional backlog.

## Last Completed Task
**CHAT_END** (2026-05-06) — post-launch repo audit + Phase 5 backlog seeded
(**P5-T1**, **P5-T2**); planning files updated (**`TASKS`**, **`ROADMAP`**,
**`HANDOFF`**, **`CURRENT_STATE`**). No code changes.

## Active Task
**P4-T6** / **P4-B4** — human verifies **`www`** **301**→ apex, Portal default domain, TLS; optional **rollback** rehearsal (**`ROADMAP.md`** deliverables).

## Next Recommended Task
1. **`P4-T6`** checklist → mark **Done** in **`TASKS.md`** when signed off.  
2. **`P5-T1`** housekeeping (dead-code + orphan-asset deletes + README) — small, **Unattended: OK**.  
3. **`P5-T2`** activate image pipeline (copy rasters into **`src/assets/images/...`**) — also **Unattended: OK**; biggest perf win still on the table.  
4. **P3** partials (Lighthouse prod, manual a11y) — overlaps **P5-T2** verification.  
5. **Phase 5** enhancements (analytics, contact alerting, blog) only if product asks.

## What Is Blocked
None.

### Human follow-up (Partial — **P3-B1**)
Assets under **`src/assets/...`**, Lighthouse on **`devildogcyber.com`**, keyboard/SR walk, contrast.

## Important Instructions for Next AI
Read **`/ai/START_HERE.md`**. **P4-T6** = **Unattended: No** — human executes regi