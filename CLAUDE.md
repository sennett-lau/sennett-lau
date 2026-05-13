# sennett-lau — Agent Operating Manual

This file is the top-level briefing for any agent (Claude Code, Codex, etc.) working in this repo. Read it first every session. Deep content lives in `docs/wiki/**` — this file is the index and the load policy.

> **Bootstrapped from [alice](https://github.com/sennett-lau/alice)** — a generic agentic docs/plans/ledger framework. The framework payload lives at `.alice/`; agent-specific config dirs (`.claude/`, future `.codex/`, `.agents/`) symlink into it so the framework is shared across agents. Project-specific stack/domain rules live in this file and `docs/wiki/`.

## What sennett-lau is

Personal portfolio website for Sennett Lau, served at `sennettlau.me`. Single-page Next.js static export — Hero, About, Experience, Certs, Projects, Quote, Contact sections — built with Chakra UI + framer-motion. No backend; client-side calls a Discord webhook for the contact form. Currently published to GitHub Pages by committing the export into `docs/`; planned migration to Vercel / Cloudflare Pages is on the table.

## Repo layout

```
src/
  pages/                _app.tsx, _document.tsx, index.tsx (single-page entry)
  layout/Layout.tsx     top-level shell
  component/
    index/              section components (IndexHero, IndexAbout, IndexExprience,
                        IndexCerts, IndexProjects, IndexQuote, IndexContact)
    common/             shared atoms
    logo/, modal/       supporting components
  store/                Redux Toolkit (controlSlice + index)
  hook/useScroll.tsx    scroll observer
  config/               env.ts (LOG_LEVEL, DISCORD_ERROR_ALERT_URL) + barrel
  api/axios.ts          sample axios client (third-party API)
  utils/                discord.ts (contact webhook), discord-error-alert.ts
  styles/theme/         Chakra theme overrides
  types/                shared types
public/                  static assets bundled into the build (favicon, fonts, assets)
out/                     Next.js export output (transient — produced by `next build`)
docs/                    GitHub Pages publishing dir (currently mirrors out/; see Critical gotchas)
scripts/export.sh        build + copy out/ → docs/ for GH Pages deploy
next.config.js           output: 'export'  (static HTML only — no SSR, no API routes)
tsconfig.json            paths: { "@/*": ["./src/*"] }
docs/                 project operating manual (wiki + plans + ledger)  *** see Critical gotchas — currently shared with the GH Pages publish dir ***
  README.md             layout + load policy
  todos/                live backlog (overview.md auto-loaded; per-TODO detail files load on demand)
  wiki/                 stable knowledge (README.md index + current-status.md auto-loaded; deep pages on demand)
  plans/active/         in-flight features
  plans/archive/        frozen post-ship (query-only)
  ledger/               decisions + experiences (query-only)
.alice/                 vendored alice framework (do not edit by hand — update via /sync)
  rules/                binding rules
  templates/            spec / decision / implementation / overview starters
  commands/             slash commands (/plan, /sync)
  references/           harness-agnostic reference catalogs
  skills/               qa, browse, diagnosis, ouroboros, review, plan-eng-review,
                        investigate, research, security-audit, pr-slicer, diana, hugh,
                        setup-browser-cookies
  agents/               code-reviewer, security-reviewer, user-testing-validator,
                        findings-triager, resolution-evaluator, silent-failure-hunter,
                        refactor-cleaner, seo-specialist, wiki-maintainer,
                        pr-slicer-executor
  bin/                  alice-* helper scripts
.claude/                Claude Code config — thin shim of symlinks into .alice/
  _alice      -> ../.alice
  rules       -> ../.alice/rules
  templates   -> ../.alice/templates
  commands    -> ../.alice/commands
  references  -> ../.alice/references
  skills/<name> -> ../../.alice/skills/<name>
  agents/<name> -> ../../.alice/agents/<name>
```

## Stack

- **Language:** TypeScript 5 (`strict: true`, target `es5`)
- **Frontend:** Next.js 13.3 with `output: 'export'` — pure static HTML, no SSR, no `/api` routes
- **UI:** Chakra UI 2, framer-motion, Tailwind CSS 3 (auxiliary), Sass support enabled
- **State:** Redux Toolkit + react-redux (`src/store/`)
- **HTTP:** axios (client-side only — Discord webhooks, third-party APIs)
- **Test:** none configured
- **Lint / format:** eslint (`eslint-config-next`) + prettier + husky pre-commit
- **Deploy (current):** GitHub Pages via `scripts/export.sh` — builds `out/`, copies to `docs/`, GH Pages serves `docs/` with the `sennettlau.me` CNAME
- **Deploy (planned):** Vercel or Cloudflare Pages — would publish from `out/` directly; `docs/` GH-Pages workflow becomes obsolete

Commands:

```bash
npm run dev          # next dev -p 1313
npm run build        # next build (writes static export to out/)
npm run deploy       # scripts/export.sh — fmt + build + sync out/ into docs/ for GH Pages
npm run start        # next start (rarely useful — static export is the product)
npm run lint         # eslint --ext .tsx src
npm run lint:fix     # eslint --fix
npm run prettier     # prettier write src
npm run fmt          # lint:fix + prettier
npm run tsc:noEmit   # typecheck only
```

Deep architecture: `docs/wiki/architecture.md`. Domain model: `docs/wiki/domain-model.md`.

## Load policy (critical)

| Path | Policy | When to use |
|------|--------|-------------|
| `CLAUDE.md` (this file) | auto-load | every session |
| `docs/README.md` | auto-load | every session (layout + load policy detail) |
| `docs/wiki/README.md` | auto-load | every session — index of wiki pages with one-line descriptions |
| `docs/wiki/current-status.md` | auto-load | every session — what's shipped / in flight |
| `docs/wiki/<page>.md` (other) | load on demand | when the wiki index entry matches the task |
| `docs/todos/overview.md` | auto-load | every session |
| `docs/todos/<slug>.md` | load on demand | when working that specific TODO |
| `docs/plans/active/<current>/overview.md` | auto-load | while feature in flight |
| `docs/plans/active/<current>/{spec,decision,implementation}.md` | load on demand | during feature work |
| `docs/plans/archive/**` | query-only | prior art, retro, reconstruction |
| `docs/ledger/decisions.md` | query-only | before big architectural calls |
| `docs/ledger/experiences.md` | query-only | before repeating a pattern that previously burned |
| `.claude/rules/**` | load on demand | when about to do the thing the rule governs |
| `.claude/templates/**` | load on demand | when creating a plan folder or ledger entry |
| `.claude/references/**` | load on demand | when a rule or skill points at the matching reference catalog |
| `.claude/agents/**` | load on demand | when a sub-agent is invoked (see Agent routing) |

Rule of thumb: auto-loaded set is small and current. Query-only set grows unbounded — pull in only when the question needs the history. The wiki splits the difference: the index always loads, the deep pages query on demand.

> **Small-wiki escape hatch.** If `docs/wiki/` has fewer than 4 content pages beyond `README.md` and `current-status.md`, auto-loading the whole directory is acceptable — the indirection cost outweighs the savings. Flip to index-only as soon as the wiki grows past that threshold. (Currently applies — this site has minimal surface.)

## How to work (agent SOP)

Pipeline for every non-trivial task. Each step has a skill or command — use them, don't freelance.

> **Trivial fast-path.** Typo-only, doc-only, or obvious one-file fixes skip `/plan`. Still: state the intended change, make the surgical edit, run the smallest relevant verification. When in doubt, `/plan`.

1. **Orient.** Read `docs/wiki/current-status.md` and `docs/todos/overview.md`. Check if there's an active plan folder in `docs/plans/active/` already covering this task.
2. **Plan the work — pick one entry point:**
   - **New feature:** run `/plan` (`.claude/commands/plan.md`). It asks for problem/goal/scope/acceptance interactively, sweeps ledger + archive for prior art, scaffolds `docs/plans/active/YYYY-MM-DD_<slug>/` from `.claude/templates/`, and wires the entry into `docs/todos/overview.md` (and a per-TODO detail file at `docs/todos/<slug>.md` from `.claude/templates/todo.md`).
   - **Known issue / bug:** run `/investigate`. Drive to a root-cause hypothesis, then scaffold a plan folder via `/plan <slug>` (issue-investigation variant — see `.claude/commands/plan.md`) so the fix lives on the same rails as a feature.
3. **Review the plan.** Run `/plan-eng-review` on the draft spec. Lock in architecture, error handling, logging, test coverage, performance. Iterate until the user signs off. Set `spec.md` `Status: locked`.
4. **Implement.** Only after sign-off. Follow `.claude/rules/implementation-quality.md`. Keep `implementation.md` up to date as you go. Grep ledger + archive before introducing new primitives.
5. **Verify.** Build green, tests pass. UI work → `/qa` (or `browse` for targeted checks).
6. **Review the diff.** Run `/review` on the change against base. Prefer running it via the Agent tool as a fresh sub-agent so the reviewing context isn't polluted by the implementation context.
7. **Document.** Same PR: update wiki pages that drifted, per `.claude/rules/documentation-updates.md`.
8. **Ship.** PR + merge + deploy (`npm run deploy` for GH Pages today; flip to Vercel/Cloudflare flow once migrated).
9. **Confirm done + retro.** Only after deploy health is green. Run the full `.claude/rules/post-feature-retro.md` checklist: archive move + wiki update + experiences append + decisions append + TODO strike. Until all five land, the feature isn't "done".

## Rules pointer

Every rule in `.claude/rules/` is **binding**. Load on demand when the rule's domain applies.

- `docs-layout-and-load-policy.md` — the docs/ layout and auto-load/query-only policy.
- `post-feature-retro.md` — the five-action checklist that fires on every ship.
- `documentation-updates.md` — docs must land in the same PR as behavior changes.
- `feature-spec-required.md` — spec before non-trivial code.
- `implementation-quality.md` — the floor: build green, reuse first, small PRs, no silent failures, boundaries validate, module shape (deletion test, depth, seams justified by two implementations).
- `test-discipline.md` — test through the public interface, slice vertically (no all-tests-then-all-code), mock only at system boundaries.
- `sub-agent-orchestration.md` — any skill that dispatches sub-agents must poll them (≥1/min) for progress and escalate permission blocks to the user rather than silently working around.

## Working style

- **Ambiguity before action.** If a request has multiple plausible meanings, list the interpretations and ask one focused question. Don't silently pick the easiest to implement.
- **Surgical diffs.** Every changed line traces to the request, the spec, or cleanup made necessary by this change. No drive-by refactors, reformats, or adjacent "improvements."
- **State the plan, then verify each step.** For multi-step work, list the steps with a verify check per step *before* starting. "Done" means the verify check passed, not "I wrote the code."
- **Push back on scope.** If a simpler path meets the goal, say so before creating a plan or writing code. Bias toward caution over speed.
- **Plan before code.** Spec → sign-off → code. Non-trivial work gets a plan folder.
- **Reuse before invention.** Grep ledger + archive + wiki before writing a new primitive.
- **Small changes.** Prefer 5 small PRs to 1 big one. Big PRs hide regressions.
- **Docs honest.** Wiki says what exists now. Ripped features get their wiki page ripped with them.
- **Build green.** Red CI blocks merge. Fix CI first.
- **Ask when it's irreversible.** Deploys, destructive ops, force-pushes — confirm first even if allowed.

## Critical gotchas (project-specific)

These are the non-obvious invariants that have burned this codebase. Keep them inline, don't hide them in the wiki. Add one each time something surprising bites you.

- **`docs/` is dual-purpose right now.** The deploy script `scripts/export.sh` does `rm -rf ./docs && cp -rf ./out ./docs` — it *wipes* `docs/` on every deploy. The alice framework also expects to live under `docs/` (wiki, plans, ledger, todos). These collide. Until the GH-Pages publishing path is moved off `docs/` (or the site is migrated to Vercel/Cloudflare and the script retired), alice's docs scaffold has been **deferred** — see `.alice/VERSION` bootstrap report. **Do not** run `npm run deploy` after a future docs/ migration without first updating the script.
- **`output: 'export'` means no SSR and no API routes.** Anything in `pages/api/` would silently no-op in the export build. All side-effects must be client-side (Discord webhook in `src/utils/discord.ts`).
- **Hardcoded secret in `src/utils/discord.ts`.** The Discord webhook URL is embedded in the bundle and visible in the deployed JS. Treat it as public. Rotate if abused; move to `DISCORD_ERROR_ALERT_URL` env pattern (already used by `discord-error-alert.ts`) if a fresh webhook is needed.
- **Dev port is `1313`, not `3000`.** `npm run dev` runs on `http://localhost:1313` — `package.json` overrides Next's default. QA / browse skills must hit that port.
- **TS `target: es5`.** Avoid relying on ES2020+ syntax that Next's compile pipeline may transform unexpectedly; check `out/` for downlevel surprises if a polyfill seems missing.
- **`docs/CNAME` = `sennettlau.me`.** That file (plus `.nojekyll` and `robots.txt`) is preserved across deploys by the export script. Don't delete it without a DNS plan.

## Migration-class files

Files that are hard to revert once deployed, or that cause rebase pain when multiple PRs touch adjacent content. The `/pr-slicer` skill reads this list and forces matching files into a dedicated migration PR that lands first — other slices rebase on top cleanly.

This repo has few such files. Fill in as new categories emerge.

- `next.config.js` — bundler / export mode; changes affect every page.
- `scripts/export.sh` — deploy pipeline; coordinate with hosting changes.
- `docs/CNAME`, `docs/.nojekyll`, `docs/robots.txt` — GH Pages publishing artifacts; do not lose across deploys.
- `package-lock.json` — lockfile churn; consumers rebase on additions.

### Collapse / regeneration procedure

None — migration files are authored directly.

## Skill routing

When the user's request matches a skill, invoke it via the Skill tool **before** other actions.

The project ships a small, project-local set of skills under `.alice/skills/` (symlinked into `.claude/skills/`). Everything is project-scoped — skills write to `<project-root>/.alice/mem/`, never to `~/.claude/`.

| Request shape | Skill |
|---------------|-------|
| New feature — draft spec with user + scaffold plan folder | `/plan` (`.claude/commands/plan.md`) |
| Bugs, errors, "why is this broken", stack traces | `investigate` (wrap the fix in a plan folder via `/plan` issue-variant when non-trivial) |
| QA / test the UI / dogfood a flow / screenshot evidence | `qa` (use `--report-only` for no-fix mode) |
| Multi-agent User-Testing Validation — parallel persona testers, raw evidence, deduped findings backlog | `diagnosis` |
| Browser control (raw primitives, not a full QA sweep) | `browse` |
| Import real-browser cookies for authed QA | `setup-browser-cookies` |
| Pre-landing PR / diff review | `review` |
| Pre-implementation architecture review | `plan-eng-review` |
| Security audit — opt-in or high-risk release check for auth, payments, PII, secrets, CI/CD, dependencies, external integrations, OWASP, LLM trust | `security-audit` |
| Multi-source research with citations — web synthesis, competitive / market / tech scan | `research` |
| Pull the latest alice framework into `.alice/` (sync skills, commands, agents, migrations) | `/sync` (`.alice/commands/sync.md`) |
| Slice a large branch / PR into a chain of smaller reviewable PRs with a migration PR first, parallel-safe siblings, and a per-PR review gate | `/pr-slicer` |
| Run the full alice SOP end-to-end for a given feature description with little / no human interaction | `/diana` |
| Fan out multiple `/diana` runs in parallel — one per feature — across isolated git worktrees | `/hugh` |
| Continuous improve loop — read `docs/todos/findings/`, run `diagnosis` when empty, resolve through `hugh`/`diana` with `resolution-evaluator`, merge after scrutiny, then repeat | `ouroboros` |

**Project-local state.** Any skill that needs scratch space writes to `<project-root>/.alice/mem/` (gitignored, per-checkout). Never `~/.claude/`, never user-home.

## Agent routing

The framework ships sub-agents under `.alice/agents/` (symlinked into `.claude/agents/`). Two invocation modes:

1. **Auto-invoke during work.** The main agent calls a sub-agent when its trigger condition appears — no explicit command needed.
2. **Delegated from inside a skill.** When a skill's job overlaps with a sub-agent, the skill must invoke the sub-agent via the `Agent` tool — don't inline the work.

| Sub-agent | Auto-invoke trigger | Skill that delegates to it |
|-----------|--------------------|-----------------------------|
| `code-reviewer` | after any non-trivial code edit — quick QA pass before the user sees the diff | `/review` (fans out for lang/domain passes) |
| `security-reviewer` | code touching auth, user input, secrets, API endpoints, sensitive data | `/security-audit` |
| `silent-failure-hunter` | suspicion of swallowed errors, bad fallbacks, or missing error propagation | on-demand only |
| `user-testing-validator` | never auto-invoked | `diagnosis` |
| `findings-triager` | never auto-invoked | `diagnosis` |
| `resolution-evaluator` | never auto-invoked | `ouroboros` via `diana` |
| `refactor-cleaner` | suspected dead code, unused deps, duplication — not during active feature work | on-demand only |
| `seo-specialist` | web-facing pages / marketing sites — meta tags, structured data, Core Web Vitals, sitemap / robots, content mapping. **Highly relevant here** — this is a public marketing site. | on-demand only |
| `wiki-maintainer` | post-feature retro (wiki update step), initial wiki seed during alice bootstrap, on-demand drift lint | `post-feature-retro` rule (retro mode); bootstrap step 6 (seed mode) |
| `pr-slicer-executor` | never auto-invoked | `/pr-slicer` |

**Skill-delegates-to-agent rule.** If a skill has a matching sub-agent, the skill must run the agent as a fresh sub-agent via the `Agent` tool.

## Definition of done

### Pre-PR

- [ ] Build green locally (`npm run build`), `npm run tsc:noEmit` clean, `npm run lint` clean.
- [ ] For non-trivial change: plan folder exists, spec locked.
- [ ] Wiki pages updated for any behavior / content / layout change.
- [ ] No stale `// removed`, unused `_vars`, or speculative scaffolding.
- [ ] Critical gotchas respected.

### Post-ship

- [ ] Plan folder archived: `git mv docs/plans/active/<folder> docs/plans/archive/<folder>`.
- [ ] `docs/wiki/current-status.md` updated (in flight → shipped).
- [ ] `docs/ledger/experiences.md` retro entry appended.
- [ ] `docs/ledger/decisions.md` entry appended for any non-obvious choice.
- [ ] `docs/todos/overview.md` struck (in-flight → Done recent), per-TODO detail file `docs/todos/<slug>.md` deleted.

## When to update this file

- Repo layout changes (new package, moved directories).
- New binding rule added to `.claude/rules/`.
- Stack change (new framework, dropped dependency, new DB).
- New branching or deploy convention — **especially the pending Vercel/Cloudflare migration; revise `docs/` gotcha + commands + deploy bullet when it lands.**
- Load policy change (new path added to auto-load / query-only).
- A critical gotcha emerges from a burn. Log it here so future-agent doesn't repeat it.

Everything else belongs in `docs/wiki/**` or the ledger, not here.
