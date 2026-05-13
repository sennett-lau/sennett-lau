# sennett-lau — Agent Operating Manual

This file is the top-level briefing for any agent (Claude Code, Codex, etc.) working in this repo. Read it first every session. Deep content lives in `docs/wiki/**` — this file is the index and the load policy.

> **Bootstrapped from [alice](https://github.com/sennett-lau/alice)** — a generic agentic docs/plans/ledger framework. The framework payload lives at `.alice/`; agent-specific config dirs (`.claude/`, future `.codex/`, `.agents/`) symlink into it. Project-specific stack/domain rules live in this file and `docs/wiki/`.

## What sennett-lau is

Personal portfolio website for Sennett Lau, served at `sennettlau.me`. Single-page Vite + React + Tailwind SPA — Hero, Quote, About, Experience, Certs, Projects, Contact sections — with scroll-position-driven color scheme transitions and framer-motion reveal animations. No backend; contact form posts directly to a Discord webhook. Currently deploying to Cloudflare Pages (post-migration); prior Next.js + GitHub Pages stack archived under `archive/`.

## Repo layout

```
src/
  main.tsx                React entry, mounts <App /> wrapped in Redux Provider
  App.tsx                 Page composition + scroll-driven color-scheme orchestration
  index.css               Tailwind directives + @font-face declarations
  layout/Layout.tsx       Header + Footer wrapper
  components/
    common/{Header,Footer}.tsx        (port: archive — CustomLink, Highlight, HighlightedLink, TextLogo, ImageModal still TODO)
    index/
      Section.tsx                     Shared <motion.section> shell (opacity-only fadeIn variant)
      IndexHero/IndexHero.tsx         (visual port TODO — see archive/src/component/index/IndexHero/*)
      IndexQuote/IndexQuote.tsx       (visual port TODO)
      IndexAbout/IndexAbout.tsx       (visual port TODO)
      IndexExperience/IndexExperience.tsx  (visual port TODO — full timeline w/ subsections)
      IndexProjects/IndexProjects.tsx (visual port TODO — projects grid)
      IndexCerts/IndexCerts.tsx       (visual port TODO)
      IndexContact/IndexContact.tsx   (WORKING — form posts to Discord webhook)
  hooks/useScroll.ts      window.scrollY observer
  store/{index,controlSlice}.ts   Redux Toolkit (one slice: control)
  types/{color,control,logger,index}.ts
  utils/{color,common,discord,discord-error-alert,logger,index}.ts
  config/{env,index}.ts   import.meta.env wrappers (LOG_LEVEL, DISCORD_ERROR_ALERT_URL)
public/
  fonts/Raleway/static/*.ttf, Zarathustra/static/*.otf
  assets/{icons,me,projects}/*.{svg,png}
  favicon.ico
  404.html                Cloudflare Pages auto-serves on unmatched paths
  _headers                Cache-Control: immutable for /fonts/* and /assets/*
archive/                  Prior project (Next.js + Chakra + npm + GH Pages publish-via-docs/)
  src/, public/, scripts/, next.config.js, tsconfig.json, package.json (old), .eslintrc, .prettierrc, .husky/, tailwind.config.js (old), postcss.config.js (old), README copy.md, next-env.d.ts
  docs-build-artifacts/   The build subset that used to live under docs/ for GH Pages
index.html                Vite entry HTML (font preloads)
vite.config.ts            React plugin + `@` → `src/` alias
tsconfig.json             paths: { "@/*": ["src/*"] }
tsconfig.node.json        for vite.config.ts
tailwind.config.ts        Theme tokens (blanc, themeDark, themeLight); content glob includes src/utils/color.ts; safelist enumerates color combos
postcss.config.js         tailwindcss + autoprefixer
biome.json                Lint + format config (replaces ESLint + Prettier + husky)
wrangler.toml             Cloudflare Pages: pages_build_output_dir = "dist"
package.json              packageManager: pnpm@9.15.0 (Corepack auto-detect)
docs/                     Project operating manual (alice scaffold + content)
  README.md, todos/{overview,vite-cloudflare-migration}.md, todos/findings/
  wiki/{README,current-status,architecture,domain-model}.md
  plans/active/2026-05-13_vite-cloudflare-migration/{overview,spec,decision,implementation}.md
  plans/archive/, ledger/{decisions,experiences}.md
.alice/                   Vendored alice framework — DO NOT edit by hand; update via /sync
.claude/                  Claude Code config — relative symlinks into .alice/
CLAUDE.md (this file), LICENSE.txt, README.md
```

## Stack

- **Language:** TypeScript 5 (`strict: true`, target `ES2020`, `moduleResolution: Bundler`)
- **Bundler / dev:** Vite 5 + `@vitejs/plugin-react`
- **Frontend:** React 18 (SPA — no router; single page with section anchors)
- **Styling:** Tailwind CSS 3.4 utility classes; theme tokens replace prior Chakra extension
- **Animation:** framer-motion 11 (opacity-only `fadeIn` variant in `Section.tsx`)
- **State:** Redux Toolkit 2 + react-redux 9 (single `controlSlice` — scroll-driven color scheme, header reveal, modal state)
- **HTTP:** native `fetch` (axios dropped — Discord webhook + sample API both single-shot)
- **Test:** none configured (followup if surface grows)
- **Lint / format:** Biome 1.9 — replaces ESLint + Prettier + husky
- **Package manager:** pnpm 9.15.0 (exact pin via `"packageManager"`; Corepack auto-detects on local + Cloudflare)
- **Deploy:** Cloudflare Pages — build via `pnpm install && pnpm build`, output dir `dist/`, project name `sennettlau`. Primary deploy is git-push via Cloudflare's GitHub integration (manual dashboard setup); `pnpm deploy` wraps `wrangler pages deploy dist`.
- **Prior stack (archived under `archive/`)** — Next.js 13 + Chakra UI + npm + GH Pages publish-via-`docs/`. Retained for visual-port reference.

Commands:

```bash
pnpm install        # install deps (Corepack picks pnpm@9.15.0)
pnpm dev            # vite dev server (default :5173)
pnpm build          # vite build → dist/
pnpm preview        # serve built dist/
pnpm lint           # biome lint .
pnpm format         # biome format --write .
pnpm check          # biome check --write . (lint + format combined)
pnpm tsc            # tsc --noEmit
pnpm deploy         # wrangler pages deploy dist --project-name sennettlau (manual; primary is git-push integration)
```

Deep architecture: `docs/wiki/architecture.md`. Domain model: `docs/wiki/domain-model.md`.

## Load policy (critical)

| Path | Policy | When to use |
|------|--------|-------------|
| `CLAUDE.md` (this file) | auto-load | every session |
| `docs/README.md` | auto-load | every session |
| `docs/wiki/README.md` | auto-load | every session — index |
| `docs/wiki/current-status.md` | auto-load | every session |
| `docs/wiki/<page>.md` (other) | load on demand | when wiki index entry matches the task |
| `docs/todos/overview.md` | auto-load | every session |
| `docs/todos/<slug>.md` | load on demand | when working that specific TODO |
| `docs/plans/active/<current>/overview.md` | auto-load | while feature in flight |
| `docs/plans/active/<current>/{spec,decision,implementation}.md` | load on demand | during feature work |
| `docs/plans/archive/**` | query-only | prior art |
| `docs/ledger/decisions.md` | query-only | before big calls |
| `docs/ledger/experiences.md` | query-only | before repeating a burned pattern |
| `.claude/rules/**` | load on demand | when the rule's domain applies |
| `.claude/templates/**` | load on demand | when creating a plan folder or ledger entry |
| `.claude/references/**` | load on demand | when a rule or skill points at the matching catalog |
| `.claude/agents/**` | load on demand | when a sub-agent is invoked |
| `archive/**` | query-only | when porting a section from the prior Chakra implementation |

> **Small-wiki escape hatch.** With <4 content pages beyond README+current-status, auto-loading the whole wiki is acceptable. Flip to index-only once the wiki grows.

## How to work (agent SOP)

Pipeline for every non-trivial task:

1. **Orient.** `docs/wiki/current-status.md` + `docs/todos/overview.md`. Check active plan folders.
2. **Plan.** `/plan` for new features; `/investigate` for bugs then `/plan <slug>` for the fix.
3. **Review the plan.** `/plan-eng-review` until spec locked.
4. **Implement.** Follow `.claude/rules/implementation-quality.md`. Update `implementation.md` as each verify check passes.
5. **Verify.** Build green (`pnpm build`), types clean (`pnpm tsc`), Biome clean (`pnpm check`). UI work → `/qa` (or `browse`).
6. **Review the diff.** `/review` against base — fresh sub-agent.
7. **Document.** Wiki updates in the same PR per `.claude/rules/documentation-updates.md`.
8. **Ship.** PR + merge + Cloudflare deploys via git integration.
9. **Retro.** `.claude/rules/post-feature-retro.md` — archive plan + wiki + experiences + decisions + todo.

## Working style

- **Ambiguity before action.** List interpretations and ask one focused question.
- **Surgical diffs.** Every line traces to the request, the spec, or cleanup made necessary by this change.
- **Plan before code.** Spec → sign-off → code.
- **Reuse before invention.** Grep ledger + archive + wiki before writing a new primitive. For UI work, `archive/src/component/` is the canonical reference for "what content goes here."
- **Match repo style.** Single quotes, 2-space, trailing comma all, semicolons asNeeded.
- **Small PRs.** Slicer-friendly.
- **Build green.** Red CI blocks merge.
- **Ask when it's irreversible.** Deploys, force-pushes, DNS.

## Critical gotchas (project-specific)

- **Tailwind safelist drift.** `src/utils/color.ts` returns Tailwind class fragments (`bg-themeLight-500`, etc.) as literal strings — JIT detects them via the `content` glob. `tailwind.config.ts` `safelist` redundantly lists the 12 combos. If you add a new prefix (`border-*`, `from-*`, `ring-*`) returned from `color.ts`, **you MUST update both safelist AND the P11 build-artifact grep gate**, or production will render unstyled (purge eats the rules). See plan `decision.md` DR-2.
- **Hardcoded Discord webhook in `src/utils/discord.ts`.** Already public in the bundle on prior deploys. **Cloudflare Pages preview URLs (`*.pages.dev`) multiply the exposure surface.** Long-term fix is a server-side proxy (Cloudflare Worker holding the webhook). Logged as followup in `docs/plans/active/2026-05-13_vite-cloudflare-migration/.../followups`.
- **Corepack expects an exact pnpm version.** `package.json#packageManager` is pinned to `pnpm@9.15.0`. Ranges (`pnpm@9.x`) break on Cloudflare's Corepack. Bump deliberately; update `NODE_VERSION=20` in the Cloudflare Pages dashboard if pnpm 10 lands.
- **framer-motion + `useScroll` interaction.** `Section.tsx` uses opacity-only `fadeIn` (no `y` transform). A `y: 24` would shift `getBoundingClientRect().top` during the reveal, throwing off the scroll-position color logic. If you introduce a translate animation later, suppress `useScroll` reads until the animation settles. See DR-8.
- **Biome ≠ ESLint+Prettier 1:1.** Dropped: `next/*` rules (no Next), `jsx-a11y` extension config (Biome has a subset under `a11y`). Kept: `eqeqeq`, `prefer-const`, organize-imports, `noUnusedImports`, `useExhaustiveDependencies`. Check `biome.json` before importing rules from the archived `.eslintrc`.
- **Cloudflare Pages defaults handle the single-page case.** **No `_redirects` file.** `/` → `index.html`, unknown paths → `404.html`. Adding a `/* /index.html 200` catch-all would mask 404s. See DR-10.
- **`public/` files are not Vite-hashed.** Fonts, `404.html`, `favicon.ico`, `_headers` keep their original paths. Don't reference them via Vite-import — use `/fonts/...` URLs.
- **`docs/` is alice content only.** No more publish-via-docs. The old build subset lives under `archive/docs-build-artifacts/`.
- **Visual ports incomplete.** Section components are placeholder shells; full content lives at `archive/src/component/index/<Section>/*` and must be ported per-section. Header / Footer too. `IndexContact` is the exception — its Discord-webhook form is working.

## Migration-class files

Files hard to revert or rebase-collide across PRs. `/pr-slicer` reads this and pushes matching files into a dedicated migration PR.

- `wrangler.toml` — Cloudflare Pages config; one source of truth.
- `tailwind.config.ts` — safelist drift breaks production rendering.
- `package.json` + `pnpm-lock.yaml` — lockfile churn; merge conflict prone.
- `vite.config.ts` — bundler config; affects every page.
- `tsconfig.json` — path aliases load-bearing.
- `public/_headers` — caching rules; production impact.

### Collapse / regeneration procedure

None — config files are authored directly.

## Skill routing

| Request shape | Skill |
|---------------|-------|
| New feature | `/plan` |
| Bug / "why broken" | `/investigate` |
| QA / test the UI | `/qa` (or `/qa --report-only`) |
| Multi-agent dogfood | `/diagnosis` |
| Browser primitives | `/browse` |
| Auth cookies for QA | `/setup-browser-cookies` |
| Pre-landing review | `/review` |
| Pre-implementation review | `/plan-eng-review` |
| Security audit | `/security-audit` |
| Web research | `/research` |
| Pull alice upstream | `/sync` |
| Split a big branch | `/pr-slicer` |
| Full SOP end-to-end | `/diana` |
| Fan-out parallel features | `/hugh` |
| Continuous improve loop | `/ouroboros` |

Skill scratch state goes to `<project-root>/.alice/mem/` (gitignored).

## Agent routing

| Sub-agent | Auto-invoke | Delegating skill |
|-----------|------------|------------------|
| `code-reviewer` | after non-trivial edit | `/review` |
| `security-reviewer` | auth/PII/secrets/external boundaries | `/security-audit` |
| `silent-failure-hunter` | suspicion of swallowed errors | on-demand |
| `user-testing-validator` | never auto | `diagnosis` |
| `findings-triager` | never auto | `diagnosis` |
| `resolution-evaluator` | never auto | `ouroboros` via `diana` |
| `refactor-cleaner` | suspected dead code, not during feature work | on-demand |
| `seo-specialist` | this site is web-facing — invoke when touching meta, structured data, sitemap, Core Web Vitals | on-demand |
| `wiki-maintainer` | post-feature retro + bootstrap seed | post-feature-retro |
| `pr-slicer-executor` | never auto | `/pr-slicer` |

**Skill-delegates-to-agent rule.** If a skill has a matching sub-agent, the skill MUST run the agent via the `Agent` tool — never inline.

## Definition of done

### Pre-PR

- [ ] `pnpm build` green, `pnpm tsc --noEmit` clean, `pnpm check` clean.
- [ ] For non-trivial change: plan folder exists, spec locked.
- [ ] Wiki pages updated for any behavior / content / layout change.
- [ ] Tailwind safelist + `color.ts` surface stay in sync if either changed.
- [ ] Bundle size acceptable (target: ≤200KB gzipped main JS — verify with `gzip -c dist/assets/index-*.js | wc -c`).
- [ ] Critical gotchas respected.

### Post-ship

- [ ] Plan archived: `git mv docs/plans/active/<folder> docs/plans/archive/<folder>`.
- [ ] `docs/wiki/current-status.md` updated.
- [ ] `docs/ledger/experiences.md` retro appended.
- [ ] `docs/ledger/decisions.md` entry for any non-obvious choice.
- [ ] `docs/todos/overview.md` struck; per-TODO detail file deleted if `--todo` was used.

## When to update this file

- Repo layout changes (new package, moved directories).
- New binding rule added to `.claude/rules/`.
- Stack change (new framework, dropped dep, new DB).
- New deploy / branching convention.
- Load policy change.
- A critical gotcha emerges from a burn.

Everything else belongs in `docs/wiki/**` or the ledger.
