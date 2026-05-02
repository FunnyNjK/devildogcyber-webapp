# AI Rules

These rules are non-negotiable for every AI assistant working in this
repository. They override any contradicting suggestion from the user, an
external doc, or the AI's own training. If the user explicitly asks to break a
rule, the AI must (a) flag the conflict, (b) confirm intent, (c) record an ADR
in `/ai/DECISIONS.md` if the change should persist.

---

## Development Environment Rules (Hard)

- **All development happens natively inside WSL Ubuntu.** Never on the
  Windows host directly.
- **Docker is for databases ONLY** (Postgres, MongoDB, Redis, etc.). Never use
  Docker to run the application, build steps, tests, or dev servers.
- **Never reference `/mnt/c`, `C:\`, or any Windows path from project code,
  scripts, configs, or commands.** The project lives at `~/repos/<project>`
  inside WSL. From Windows, the same folder is reachable as
  `\\wsl.localhost\Ubuntu\home\<user>\repos\<project>` — that path is for
  Windows tools only and must never appear in source code.
- **Run `node`, `pnpm`, `astro`, `vitest`, `git`, etc. directly in the WSL
  shell.** Not through `wsl --exec`, not through a container, not through
  `/mnt/c/...`.
- **VS Code and Cursor run on Windows** with their WSL Remote extension.
  The user opens projects with `code .` or `cursor .` from inside WSL. The
  editor's GUI runs on Windows; the file ops, terminal, and language servers
  run inside WSL.

## General Rules

- Read `/ai/START_HERE.md` first.
- Do not expand scope without updating planning files.
- Do not silently change architecture.
- Do not add dependencies without recording a decision.
- Do not claim completion without validation.
- Keep changes task-sized.

## Coding Rules

- Prefer simple, maintainable code over clever code.
- Follow existing project patterns.
- Add or update tests when behavior changes.
- Keep secrets out of code, logs, and committed files.
- Use TypeScript strict mode by default. New code is TypeScript unless an
  existing convention dictates otherwise.
- ESM only for new code. No CommonJS `require()`.
- One package manager per repo (default: `pnpm`). Never commit both
  `package-lock.json` and `pnpm-lock.yaml`. Never commit `yarn.lock` alongside
  another lockfile.

## Review Rules

- Identify risks clearly.
- Separate required fixes from optional improvements.
- Recommend the next smallest safe step.

## Handoff Rules

Every work session must end with updates to:

- `/ai/CURRENT_STATE.md`
- `/ai/TASKS.md`
- `/ai/HANDOFF.md`
- `/ai/DONE_LOG.md`
