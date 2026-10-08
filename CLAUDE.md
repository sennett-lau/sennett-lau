# sennett-lau — Agent Operating Manual

This file is the top-level briefing for any agent (Claude Code, Codex, etc.) working in this repo. Read it first every session. Deep content lives in `docs/wiki/**` — this file is the index and the load policy.

> **Bootstrapped from [alice](https://github.com/sennett-lau/alice)** — a generic agentic docs/plans/ledger framework. The framework payload lives at `.alice/`; agent-specific config dirs (`.claude/`, future `.codex/`, `.agents/`) symlink into it. Project-specific stack/domain rules live in this file and `docs/wiki/`.

## What sennett-lau is

Personal portfolio website for Sennett Lau, served at `sennettlau.me`. Single-page Vite + React + Tailwind SPA in a dark, terminal / ASCII-art style — Hero, About, Experience, Projects, Certs, Contact sections. Images render as ASCII art in the browser (a liquid hover trail / tap shows the real image); text decodes in with framer-motion + `requestAnimationFrame` effects. No backend; contact form posts directly to a Discord webhook. Deploys to Cloudflare Workers (static assets, Sennett's personal account); prior Next.js + GitHub Pages stack archived under `archive/`.

## Repo layout

```
src/
  main.tsx                React entry; imports fontsource CSS (latin subsets) + index.css
  App.tsx                 Page composition only (no state)
  index.css               Tailwind layers + .ascii / .term-btn / .crt overlay
  vite-env.d.ts           vite/client types (import.meta.env)
  layout/Layout.tsx       Skip link + Header + main + Footer
  content/                ALL COPY as typed data — site, hero, about, experience, projects, certs
  lib/
    ascii.ts (+ .test.ts) DOM-free: gridSize, toAscii (invert/normalize/blackPoint/gamma), scramble
    rich.ts (+ .test.ts)  Inline markup parser: **strong**, [label](url)
    reveal.ts (+ .test.ts) Reveal-trail maths: value noise, noisy threshold, fade, stroke points
  hooks/
    useAnimatedText.ts    rAF text frames (scrambleFrame) → textContent; reduced-motion aware
    useRevealTrail.ts     Liquid reveal trail: low-res mask canvas + rAF loop (only while visible)
    useActiveSection.ts   IntersectionObserver → id of section at viewport middle
  components/
    ascii/AsciiImage.tsx  Image → ASCII grid, liquid hover trail + click/tap flood reveal, decode animation
    common/{Header,Footer,RichText,ScrambleText}.tsx
    index/
      Section.tsx         <motion.section> shell + optional terminal heading
      Index{Hero,About,Experience,Projects,Certs,Contact}/*.tsx
  types/{logger,index}.ts
  utils/{common,discord,discord-error-alert,logger,index}.ts   (only discord.ts is imported today)
  config/{env,index}.ts   import.meta.env wrappers (LOG_LEVEL, DISCORD_ERROR_ALERT_URL)
public/
  images/portrait.webp, images/projects/{typelite,cityuge,dklm}.webp, images/og.png   (unhashed)
  favicon.ico
  404.html                Self-contained dark 404; served for unmatched paths (`not_found_handling = "404-page"`)
  _headers                Cache-Control: immutable for /assets/* (Vite-hashed output only)
archive/                  Prior project (Next.js + Chakra + npm + GH Pages publish-via-docs/), incl. its public/assets
  src/, public/, scripts/, next.config.js, tsconfig.json, package.json (old), .eslintrc, .prettierrc, .husky/, tailwind.config.js (old), postcss.config.js (old), README copy.md, next-env.d.ts
  docs-build-artifacts/   The build subset that used to live under docs/ for GH Pages
index.html                Vite entry HTML (meta/OG tags, portrait preload, <body class="crt">)
vite.config.ts            React plugin + `@` → `src/` alias (Vitest reads it too)
tsconfig.json             paths: { "@/*": ["src/*"] }; includes src only
tsconfig.node.json        composite project for vite.config.ts
tailwind.config.ts        Dark theme tokens (bg, panel, line, dim, ink, amber, ok, err), font families, blink keyframes
postcss.config.js         tailwindcss + autoprefixer
biome.json                Lint + format config (replaces ESLint + Prettier + husky)
wrangler.toml             Assets-only Worker: [assets] directory = "./dist", account_id pinned to the personal account
package.json              packageManager: pnpm@9.15.0 (Corepack auto-detect)
pnpm-lock.yaml            Lockfile
docs/                     Project operating manual (alice scaffold + content)
  README.md, todos/overview.md, todos/findings/
  wiki/{README,current-status,architecture,domain-model}.md
  plans/active/{2026-05-13_vite-cloudflare-migration,2026-10-07_ascii-redesign}/{overview,spec,decision,implementation}.md
  plans/archive/, ledger/{decisions,experiences}.md
.alice/                   Vendored alice framework — DO NOT edit by hand; update via /sync
.claude/                  Claude Code config — relative symlinks into .alice/
CLAUDE.md (this file), LICENSE.txt, README.md
```

## Stack

- **Language:** TypeScript 5 (`strict: true`, target `ES2020`, `moduleResolution: Bundler`)
- **Bundler / dev:** Vite 5 + `@vitejs/plugin-react`
- **Frontend:** React 18 (SPA — no router; single page with section anchors)
- **Styling:** Tailwind CSS 3.4 utility classes; dark-only token set in `tailwind.config.ts`
- **Fonts:** `@fontsource-variable/martian-mono` (display, `wdth.css`) + `@fontsource/ibm-plex-mono` (body + ASCII, latin subset), Vite-hashed
- **Animation:** framer-motion 11 (section fades, staggered reveals, menu presence) + `useAnimatedText` for scramble text
- **State:** local component state only (Redux removed in ascii-redesign DR-3)
- **HTTP:** native `fetch` (axios dropped — Discord webhook + sample API both single-shot)
- **Test:** Vitest 3 (node env) — unit tests next to pure modules in `src/lib/`
- **Lint / format:** Biome 1.9 — replaces ESLint + Prettier + husky
- **Package manager:** pnpm 9.15.0 (exact pin via `"packageManager"`; Corepack auto-detects on local + Cloudflare)
- **Deploy:** Cloudflare Workers static assets (Wrangler 4), Worker `sennettlau` on Sennett's personal account, live at `https://sennettlau.laub1199.workers.dev`. CLI upload: `pnpm build && pnpm run deploy` (`wrangler deploy`). No git integration yet (a Worker can be connected to GitHub later). `sennettlau.me` is not attached yet.
- **Prior stack (archived under `archive/`)** — Next.js 13 + Chakra UI + npm + GH Pages publish-via-`docs/`. Retained for content reference.

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
pnpm test           # vitest run
pnpm run deploy     # wrangler deploy (uploads dist/; run pnpm build first). Not `pnpm deploy`: that is pnpm's built-in
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
8. **Ship.** PR + merge, then `pnpm build && pnpm run deploy` from `main` (ask first: it publishes).
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

- **ASCII-only text art.** The fontsource latin subsets cover U+0000–00FF and U+2000–206F — no box-drawing (`█╗═│`) or most arrows (`→ ↵`). Those glyphs fall back to another font and break monospace grids. Use ASCII (`-->`, `+`, `|`) and CSS borders. `↓ ↑ · — ©` are safe. See ascii-redesign DR-4.
- **Experience copy needs Sennett's sign-off.** All four roles were updated with him on 2026-10-07 from his LinkedIn. Don't add claims, metrics or tools he hasn't given.
- **Image dimensions are load-bearing.** `width`/`height` passed to `AsciiImage` (and in `src/content/projects.ts`) set the frame aspect ratio and the ASCII grid. Change them with the file. Light screenshots need a `tone` with `invert` + `blackPoint` + `gamma < 1`, or the ASCII comes out near-empty.
- **`backdrop-filter` traps `position: fixed`.** An element with `backdrop-blur` becomes the containing block for fixed descendants. The mobile menu overlay lives outside `<header>` for this reason — keep it there.
- **rAF loops under StrictMode.** A hook that keeps a `requestAnimationFrame` id in a ref must reset it to 0 in its unmount cleanup: StrictMode runs cleanup then remounts, and a stale non-zero id makes "is a loop running?" checks skip forever (`useRevealTrail` shipped this bug for one round). Also clamp progress computed from `performance.now()` start times — the first rAF timestamp can be earlier, giving negative progress (negative arc radius, `slice(0, -1)`).
- **`useAnimatedText` owns `textContent`.** Elements it drives must render no React children; put accessible text in a sibling `sr-only` span and mark the animated node `aria-hidden`.
- **Hardcoded Discord webhook in `src/utils/discord.ts`.** Already public in the bundle on prior deploys. **Every public URL (`*.workers.dev`, preview URLs) multiplies the exposure surface.** Long-term fix is a server-side proxy (Cloudflare Worker holding the webhook). Logged as `contact-webhook-proxy` in `docs/todos/overview.md`.
- **Corepack expects an exact pnpm version.** `package.json#packageManager` is pinned to `pnpm@9.15.0`. Ranges (`pnpm@9.x`) break on Cloudflare's Corepack. Bump deliberately; if Cloudflare builds are connected later, set `NODE_VERSION=20` there when pnpm 10 lands.
- **Biome ≠ ESLint+Prettier 1:1.** Dropped: `next/*` rules (no Next), `jsx-a11y` extension config (Biome has a subset under `a11y`). Kept: `eqeqeq`, `prefer-const`, organize-imports, `noUnusedImports`, `useExhaustiveDependencies`. Check `biome.json` before importing rules from the archived `.eslintrc`.
- **404 handling lives in `wrangler.toml`.** `not_found_handling = "404-page"` serves `dist/404.html` with a 404 status. **No `_redirects` file** and never `"single-page-application"`: an `index.html` fallback would mask 404s. See ascii-redesign DR-7 (supersedes DR-10's Pages defaults).
- **Two Cloudflare logins on this Mac.** Wrangler's `default` profile is the 9GAG login; the `personal` profile (laub1199@gmail.com) is bound to `~/Documents/code/mine` (`wrangler auth list`). `account_id` in `wrangler.toml` makes a deploy under the wrong login fail rather than land on the company account. Check `pnpm exec wrangler whoami` before anything that writes. When an agent runs `wrangler pages ...` on a new static project, Wrangler 4.108+ delegates to Workers; that's why this is a Worker, not a Pages project.
- **`public/` files are not Vite-hashed.** `images/*`, `404.html`, `favicon.ico`, `_headers` keep their original paths — reference them as `/images/...` URLs. Never put them under `/assets/`: `_headers` marks `/assets/*` immutable for a year, which is only safe for hashed names.
- **`docs/` is alice content only.** No more publish-via-docs. The old build subset lives under `archive/docs-build-artifacts/`.

## Migration-class files

Files hard to revert or rebase-collide across PRs. `/pr-slicer` reads this and pushes matching files into a dedicated migration PR.

- `wrangler.toml` — Cloudflare Workers config (assets dir, 404 handling, account pin); one source of truth.
- `tailwind.config.ts` — theme tokens every component depends on.
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

- [ ] `pnpm build` green, `pnpm tsc --noEmit` clean, `pnpm check` clean, `pnpm test` green.
- [ ] For non-trivial change: plan folder exists, spec locked.
- [ ] Wiki pages updated for any behavior / content / layout change.
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
