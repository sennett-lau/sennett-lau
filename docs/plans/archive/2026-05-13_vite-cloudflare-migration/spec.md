# Vite + Cloudflare Migration — spec

**Status:** locked
**Owner:** diana (fully-auto / max effort)
**Created:** 2026-05-13
**Locked:** 2026-05-13 (after one round of /plan-eng-review + outside-voice, then a fold pass of three round-2 findings)

## Problem

The site currently runs on Next.js 13 (`output: 'export'`) with Chakra UI for the entire component layer, npm for package management, and a GitHub Pages publishing flow that mirrors `out/` into `docs/`. Three frictions worth replacing in one go:

1. **Stack bloat for a static site.** Next.js carries SSR/RSC machinery that this single-page export never uses; the bundle still ships next-runtime and Chakra's runtime CSS-in-JS layer. A Vite + React static SPA is meaningfully smaller and faster to ship — but the savings must be **measured, not assumed** (Acceptance criterion below).
2. **`docs/` is dual-purpose.** The deploy script wipes `docs/` on every export, but alice (commit 88ed86d) also lives there. The two cannot coexist.
3. **Stack alignment with the user's preferred tooling** — pnpm, Vite, Tailwind utility-first, Biome instead of ESLint+Prettier, framer-motion explicit, Cloudflare Pages hosting.

This run produces the migration in one branch under the alice SOP so the diff is reviewable, the prior code is archived rather than deleted, and the alice framework stays intact.

## Goal

A pnpm-managed Vite + React + TypeScript SPA at the repo root that visually reproduces the current site, uses Tailwind utility classes in place of Chakra, builds to `dist/`, and deploys to Cloudflare Pages — while preserving the entire prior codebase under `archive/`.

## Non-goals

- Not a redesign. Layout, copy, color palette, typography stay visually equivalent.
- Not adding new features.
- Not introducing shadcn/ui, headless-ui, Radix, or any other component library.
- Not changing the Discord webhook integration; existing hardcoded URL preserved (CLAUDE.md gotcha updated for the broader exposure surface — see Risks).
- Not migrating alice — `.alice/`, `.claude/`, `CLAUDE.md`, `docs/{wiki,plans,ledger,todos,README.md}` untouched (CLAUDE.md and `docs/wiki/*` get intentional updates in P10).
- Not dark-mode-toggle / system-preference detection — existing scroll-driven color scheme stays.

## Scope

In scope:

- **Archive phase.** Create `archive/`. `git mv` the existing project surface into it: `src/`, `public/`, `scripts/`, `next.config.js`, `next-env.d.ts`, `tsconfig.json`, `package.json`, `package-lock.json`, `postcss.config.js`, `tailwind.config.js`, `.eslintrc`, `.prettierrc`, `.husky/`. Also the `docs/` build-artifact subset (`docs/_next/`, `docs/assets/`, `docs/fonts/`, `docs/CNAME`, `docs/favicon.ico`, `docs/index.html`, `docs/404.html`, `docs/robots.txt`) → `archive/docs-build-artifacts/`. Delete `node_modules/`, `out/`, `.next/`.
- **New scaffold.** pnpm-managed Vite 5 + React 18 + TypeScript 5 + Tailwind CSS 3.4 at repo root. Biome 1.9+ for lint + format. `@vitejs/plugin-react`. **framer-motion pinned at `^11.0.0`** (latest stable major; React 18 compatible).
- **Tailwind config.** Theme tokens mirror current Chakra extension (`blanc.{100,200}`, `themeDark.{500,900}`, `themeLight.{500,900}`). Custom fonts (`Raleway`, `Zarathustra`) from `public/fonts/`. **Tailwind `content` glob includes `src/utils/color.ts`** so JIT detects literal class strings; **`safelist` redundantly lists all `bg-/text-/border-` × 6 tokens** as belt-and-suspenders.
- **Redux Toolkit.** Same `controlSlice` shape ported; `<Provider>` in `main.tsx`. Drop dead `setupListeners` import (DR-3). (Future simplification — context+reducer or zustand — logged to followups.)
- **Section components.** All 7 (`IndexHero`, `IndexAbout`, `IndexExperience` [typo fixed — DR-1], `IndexCerts`, `IndexProjects`, `IndexQuote`, `IndexContact`) re-implemented with Tailwind. Each keeps its `id` anchor. **Ported one-at-a-time with per-section commits** (verify map split P8.1..P8.7).
- **Common components.** `Header`, `Footer`, `CustomLink`, `Highlight`, `HighlightedLink` (typo fixed — DR-1), `ImageModal`, `TextLogo`.
- **Scroll hook.** `useScroll` ported verbatim.
- **Discord webhook.** `src/utils/discord.ts` ported; **axios → native `fetch`** (DR-4) with explicit `if (!res.ok) throw` to preserve rejection-on-error semantics. `discord-error-alert.ts` adjusted so its own fetch failure is swallowed (no recursion).
- **framer-motion.** Section reveal animation via `<motion.section>` with **opacity-only `fadeUp`** (no `y` transform — eliminates interference with `useScroll`'s `offsetTop` measurements; concurring P1 from both reviewers).
- **Cloudflare Pages config.** `wrangler.toml` with `pages_build_output_dir = "dist"` (no `compatibility_date` — that's a Workers concept; Pages static doesn't use it). **No `_redirects` file.** This is a single-page anchor-navigation site (no router); Cloudflare Pages' default behavior — `/` serves `index.html`, unknown paths serve `404.html` — is exactly what we want. Adding a `/* /index.html 200` catch-all would mask 404s; specific rules can't get around that with the catch-all present, so the cleanest answer is no catch-all at all. **`public/404.html`** carried over from archive (preserves 404 UX). **`public/_headers`** sets `Cache-Control: public, max-age=31536000, immutable` for `/fonts/*` and `/assets/*` (hashed bundle paths). `pnpm deploy` script: `wrangler pages deploy dist --project-name sennettlau` (project must already exist in CF dashboard — see Acceptance criteria). Primary deploy path is git-push via Cloudflare's GitHub integration.
- **Docs update.** `CLAUDE.md` rewritten per-section. `docs/wiki/{architecture.md, current-status.md}` populated.

Out of scope:

- Visual regression testing tooling (no Playwright / Storybook).
- New contact-form backend.
- Migrating the GitHub Pages CNAME to Cloudflare DNS — user-owned manual step; CLAUDE.md documents.
- Auto-configuring the Cloudflare Pages project — user creates via dashboard; spec produces only build config.
- Image optimisation beyond Vite native.
- `vitest` setup. If tests come later, they're a follow-up.

## Acceptance criteria

- [ ] `archive/` contains the full prior project surface.
- [ ] `pnpm install && pnpm dev` boots; `pnpm install && pnpm build` succeeds.
- [ ] All 7 sections render with same anchor ids (`hero`, `about`, `experience`, `projects`, `certs`, `quote`, `contact`).
- [ ] Scroll-position color scheme transitions still fire (Redux state changes; backgrounds animate between `themeLight.500`, `themeDark.500`, `themeDark.900`).
- [ ] Contact form Discord-webhook submission succeeds on success and surfaces an error on failure (manual smoke against a 500-returning URL).
- [ ] `pnpm build` produces `dist/` with `index.html`, `404.html`, `_headers`, `assets/`, `fonts/` (no `_redirects` — see Design sketch).
- [ ] **Build-artifact grep gate:** `grep -E 'themeLight|themeDark|blanc' dist/assets/*.css` returns ≥6 hits (one CSS rule per token used by `color.ts`). Catches Tailwind purge regressions.
- [ ] **Bundle size:** gzipped main JS bundle ≤ 200KB. Verified with `gzip -c dist/assets/index-*.js | wc -c` (target enforces "meaningfully smaller" goal).
- [ ] `pnpm check` (Biome) passes with zero errors on the new tree.
- [ ] `pnpm tsc --noEmit` passes.
- [ ] **Cloudflare preview deploy succeeds.** Either (a) push branch to a Cloudflare Pages project with git integration enabled — CF auto-creates a preview deploy and posts the URL, or (b) `wrangler pages deploy dist --project-name <name>` against any pre-existing CF Pages project (wrangler auto-creates on first push if the user is authenticated). The preview URL renders all 7 sections. Validates Corepack/Node-version compatibility before DNS cutover. **Manual prerequisite:** user has authed `wrangler login` and the CF Pages project exists or wrangler is allowed to create one (out-of-scope for diana; documented in CLAUDE.md).
- [ ] `wrangler.toml` present + valid.
- [ ] `CLAUDE.md` reflects new stack (no `Next.js`, no `Chakra`, no `npm run deploy`, no `output: 'export'` references outside an explicit "Prior stack (archived)" pointer); `docs/wiki/{architecture.md, current-status.md}` non-empty.
- [ ] `.alice/`, `.claude/`, `docs/{plans,ledger,todos,README.md}`, `LICENSE.txt`, `README.md` untouched (CLAUDE.md and `docs/wiki/*` intentionally updated).
- [ ] **Integration note clarified.** Branch base is `version/v2`. After merge to `version/v2`, user merges `version/v2` → `main` to combine alice + migration into the canonical line. Documented in `docs/ledger/decisions.md` retro entry (DR-7).
- [ ] `feat/vite-cloudflare-migration` has phase-aligned commits — one per phase (P1..P11) — ready for slicer / review.

## Design sketch

### Repo shape after migration

```
sennett-lau/
  archive/                       prior project, untouched
    src/, public/, scripts/, next.config.js, package.json (old), .eslintrc, .prettierrc, .husky/, …
    docs-build-artifacts/        (_next, assets, fonts, CNAME, favicon.ico, index.html, 404.html, robots.txt)
  src/                           new Vite source
    main.tsx                     React entry, Redux Provider, mounts <App/>
    App.tsx                      <Layout>{sections}</Layout>
    index.css                    Tailwind directives + @font-face (font-display: swap)
    layout/Layout.tsx
    components/
      common/{Header,Footer,CustomLink,Highlight,HighlightedLink,TextLogo}.tsx
      index/
        IndexHero/{IndexHero,IndexHeroDesktop,IndexHeroMobile}.tsx
        IndexAbout/... IndexExperience/... IndexProjects/... IndexCerts/... IndexQuote/...
        IndexContact/{IndexContact,IndexContactForm,IndexContactDetail,IndexContactDescription,IndexContactDigitalSpaces}.tsx
      modal/ImageModal.tsx
    hooks/useScroll.ts
    store/{index.ts,controlSlice.ts}
    types/{color.ts,control.ts,logger.ts,index.ts}
    utils/{color.ts,common.ts,discord.ts,discord-error-alert.ts,logger.ts,index.ts}
    config/{env.ts,index.ts}
  public/
    fonts/Raleway/* fonts/Zarathustra/*       (copied from archive/public/fonts; NOT hashed by Vite — public/ files stay at their original path)
    assets/* favicon.ico                       (copied from archive/public/assets + favicon)
    _headers                                    /fonts/*, /assets/* → Cache-Control: immutable
    404.html                                    copied from archive/docs-build-artifacts/404.html (Cloudflare Pages auto-serves on unmatched paths)
  index.html                     Vite entry HTML + <link rel="preload" as="font"> for woff2
  vite.config.ts
  tailwind.config.ts             content glob includes src/utils/color.ts; safelist enumerates color combos
  postcss.config.js
  tsconfig.json                  paths: { "@/*": ["src/*"] }
  tsconfig.node.json
  biome.json                     lint + format
  package.json                   "packageManager": "pnpm@9.15.0" (exact, for Corepack)
  pnpm-lock.yaml
  wrangler.toml                  pages_build_output_dir = "dist"
  .gitignore                     existing rules + dist/ + node_modules/
  CLAUDE.md, LICENSE.txt, README.md
  .alice/, .claude/, docs/ — unchanged except CLAUDE.md (P10) and docs/wiki/* (P10)
```

### Color scheme tokens (Tailwind ↔ Chakra parity)

`src/utils/color.ts` returns Tailwind class fragments as **literal strings** in the source. Tailwind's content scanner sees them. Belt-and-suspenders: `safelist` in `tailwind.config.ts` redundantly lists all combinations.

Token map (from `archive/src/styles/theme/colors.ts`):

| Token | Hex |
|-------|-----|
| `blanc.100` | `#E7F2FF` |
| `blanc.200` | `#054491` |
| `themeDark.500` | `#2E2A2A` |
| `themeDark.900` | `#1F1F1F` |
| `themeLight.500` | `#EFE8DB` |
| `themeLight.900` | `#DAD6CB` |

Tailwind config:

```ts
// tailwind.config.ts (sketch)
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',        // includes src/utils/color.ts — JIT sees literal class strings
  ],
  safelist: [
    // Belt-and-suspenders for the runtime-composed class fragments returned by color.ts.
    // color.ts surface is PINNED to: `bg-*` from getBackgroundColorScheme, `text-*` from
    // getContentColorScheme. (getIconColorScheme returns SVG paths, not classes.) Any future
    // addition of a new prefix (border, ring, from, to, divide, …) MUST update both this
    // safelist AND the P11 build-artifact grep gate.
    'bg-blanc-100','bg-blanc-200','bg-themeDark-500','bg-themeDark-900','bg-themeLight-500','bg-themeLight-900',
    'text-blanc-100','text-blanc-200','text-themeDark-500','text-themeDark-900','text-themeLight-500','text-themeLight-900',
  ],
  theme: { extend: { colors: { blanc: {…}, themeDark: {…}, themeLight: {…} } } },
}
```

### Chakra → Tailwind primitive map

| Chakra | Tailwind |
|--------|----------|
| `<Flex>` | `<div className="flex …">` |
| `<Box>` | `<div>` |
| `<Text>` | `<p>` / `<span>` with `text-*` |
| `<Image>` | `<img>` |
| `bg={...}` / `color={...}` | `bg-<token>` / `text-<token>` |
| `px={{base, lg}}` | `px-2 lg:px-0` |
| `transition="all 0.3s ease-in-out"` | `transition-all duration-300 ease-in-out` (or `transition-colors` for color-only — preferred for the bg swap) |
| `position="relative"` | `relative` |
| `_hover={{...}}` | `hover:<utility>` |

### framer-motion wiring (revised — opacity only)

```tsx
import { motion } from 'framer-motion'

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

<motion.section
  id="about"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  variants={fadeIn}
  className="…"
>
  …
</motion.section>
```

No `y` transform → `useScroll`'s `offsetTop` measurements are stable during animation. Concurring P1 from alice (#3) and outside (S9).

### Routing / SPA fallback (revised — no `_redirects`)

This is a single-page anchor-navigation site. Adding `/* /index.html 200` to `_redirects` masks 404s for crawlers and humans alike, because `_redirects` matches first-to-last and a catch-all at the end still wins over the implicit default. There's no router, no fake routes, no JS-driven path changes — so the catch-all has nothing to fix.

Cloudflare Pages default behavior covers this site perfectly:
- `/` → `index.html` (Pages serves index.html for the root automatically).
- Any unknown path (e.g. `/foo`) → `404.html` (Pages auto-serves `404.html` from the build output root when present).

So `public/404.html` is the entire SPA-fallback story; no `_redirects` file is needed. If a router gets added later, that's when `_redirects` reappears.

### Build + deploy

Local:
- `pnpm dev` — Vite dev server (port 5173 default).
- `pnpm build` — `vite build`. Output → `dist/`.
- `pnpm preview` — `vite preview`.
- `pnpm lint` / `pnpm format` / `pnpm check` — Biome.
- `pnpm tsc` — `tsc --noEmit`.
- `pnpm deploy` — `wrangler pages deploy dist --project-name sennettlau` (manual).

Cloudflare Pages config (`wrangler.toml`):

```toml
name = "sennettlau"
pages_build_output_dir = "dist"
```

(`compatibility_date` is a Workers concept; Pages static doesn't use it.)

Cloudflare Pages project (dashboard-created):
- Framework preset: None.
- Build command: `pnpm install && pnpm build`.
- Build output directory: `dist`.
- Root directory: `/`.
- Environment variable: `NODE_VERSION=20` (explicit, since Corepack behavior varies by Node minor).

### Build/deploy pipeline (ASCII)

```
LOCAL DEV                       BUILD                       DEPLOY
─────────                       ─────                       ──────
  src/*.tsx                      pnpm build                 git push → CF webhook
   │                              │                          │
   ▼                              ▼                          ▼
  vite dev (5173) ──HMR──┐      vite build               CF Pages runner
   │                     │       │                          │  (NODE_VERSION=20)
   ▼                     │       ▼                          │  Corepack reads
  Tailwind JIT           │      dist/                       │  package.json#packageManager
   │  (content scan      │       ├── index.html             │       │  (pnpm@9.15.0)
   │   sees color.ts     │       ├── 404.html               ▼
   │   literals)         │       ├── _redirects          pnpm install
   ▼                     │       ├── _headers               │
  browser                │       ├── assets/*.js            ▼
                         │       ├── assets/*.css        pnpm build
                         │       └── fonts/                 │
                         │                                   ▼
                         └── biome check ──────────────▶ dist/ → CF edge
                                                            │
                                                            ▼
                                                       sennettlau.me
                                                       (after DNS cutover —
                                                        user-owned step)
```

## Assumptions

1. **Default branch deviation** — branched off `version/v2`, not `main`. Alice is on `version/v2`. Integration path: feat → version/v2 → main (user's cadence). DR-7.
2. **Single page, no routing.**
3. **No SSR / hydration needs.**
4. **Public assets stable** — fonts and images in `public/` are versioned in git.
5. **Discord webhook stays public.** Hardcoded URL already public; preview deploys multiply exposure surface (Risk; CLAUDE.md gotcha updated).
6. **No CI changes** — Cloudflare's git integration handles post-merge build.
7. **Tailwind v3.4.x** — conservative; v4 changes config format. Explicit choice; tracked as followup for future bump.
8. **Biome v1.9+** — covers the meaningful subset of the archived `.eslintrc` (eqeqeq, prefer-const, no-unused-imports, organize imports, TS recommended, useExhaustiveDependencies for hooks). Drops `next/*` rules (no longer relevant) and `jsx-a11y` accessibility plugin coverage (Biome's `a11y` rules group is a subset). Documented in CLAUDE.md.
9. **TypeScript 5.x latest.**
10. **No tests exist.** Manual verify map only. `vitest` is a followup.
11. **DNS migration is the user's responsibility.**
12. **`fetch` over `axios`** (DR-4) — error semantics restored via explicit `if (!res.ok) throw`.
13. **Corepack pin is exact** (`pnpm@9.15.0`) per DR-6 revised — Corepack does not accept ranges.
14. **Cloudflare Pages preview deploy is a free tier ops cost** the user accepts to validate before DNS cutover.

## Verification map

Phases run in order; one commit per phase.

| Step | Verify |
|------|--------|
| **P1. Archive existing surface.** `mkdir archive && git mv {src,public,scripts,next.config.js,next-env.d.ts,tsconfig.json,package.json,package-lock.json,postcss.config.js,tailwind.config.js,.eslintrc,.prettierrc,.husky} archive/`. Also `git mv` `docs/{_next,assets,fonts,CNAME,favicon.ico,index.html,404.html,robots.txt}` → `archive/docs-build-artifacts/`. Delete `node_modules/`, `out/`, `.next/`. | `ls archive/` shows moved tree; repo root cleaner (no `src/`, `public/`, `next.config.js`, etc.). `git status` rename diff clean. |
| **P2. Vite + pnpm scaffold (with alias smoke).** Write `package.json` (pnpm, `"packageManager": "pnpm@9.15.0"`, framer-motion `^11.0.0` pinned), `vite.config.ts` (with `resolve.alias: { '@': '/src' }`), `tsconfig.json` (with `paths: { "@/*": ["src/*"] }`), `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`. **`App.tsx` placeholder imports a stub `@/types`** (`src/types/_ping.ts` returning `true`) — exercises the alias before real types arrive. `pnpm install`. | `pnpm dev` boots; `pnpm build` produces `dist/index.html`; the stub `@/types` import resolves both at dev and build. |
| **P3. Tailwind config + fonts.** Add `tailwind.config.ts` (content glob includes `src/utils/color.ts`; safelist enumerated), `postcss.config.js`, `src/index.css` (`@tailwind` directives + `@font-face` with `font-display: swap` for Raleway and Zarathustra). Add `<link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/…woff2">` to `index.html` for each woff2 file. Re-copy `public/fonts/`. | `pnpm build` succeeds; DevTools Network panel shows fonts requested with `Highest` priority before main CSS; placeholder `<div className="bg-themeLight-500">` paints the right hex. |
| **P4. Biome config + ESLint-rule audit.** Add `biome.json` (recommended rules, formatter: single quotes, 2-space, trailing comma `all`, semicolons `asNeeded`). Add `pnpm lint/format/check` scripts. **Audit** archived `.eslintrc`: document which rules carry over (eqeqeq, prefer-const, no-unused-imports, organize-imports, useExhaustiveDependencies via Biome) and which drop (`next/*`, `jsx-a11y` extension config). Note in CLAUDE.md gotchas. | `pnpm check` clean; `pnpm lint` errors on a deliberately broken file then succeeds after fix; CLAUDE.md draft references the rule-audit table. |
| **P5. Redux Toolkit port.** Copy `controlSlice.ts`, `store/index.ts` (drop dead `setupListeners`), `src/types/*`, `useScroll` hook into new tree. Wire `<Provider>` in `main.tsx`. Replace P2's `@/types/_ping` stub with real `src/types/index.ts`. | A temporary `<DebugProbe>` component reads `colorScheme` via `useSelector` and prints `'light'` to console on first render. Remove the probe after verify. (Cleanup is part of this phase — not a separate todo.) |
| **P6. Utilities + Discord port (fetch swap).** Copy `src/utils/{color,common,discord,discord-error-alert,logger,index}.ts` and `src/config/{env,index}.ts`. Convert `discord.ts` to native `fetch` with explicit `if (!res.ok) throw new Error('…')`. Convert `discord-error-alert.ts` — wrap its own `fetch` in try/catch and **swallow failures silently** (no recursion). `color.ts` returns Tailwind class fragments per DR-2. | `pnpm tsc --noEmit` passes. **Failure-path smoke:** temporarily point the webhook URL to `https://httpbin.org/status/500`; submit form via `pnpm dev`; confirm UI surfaces error state AND no recursion in `discord-error-alert` (console shows at most one alert attempt). Revert URL before commit. |
| **P7. Common components port.** Port `Header`, `Footer`, `CustomLink`, `Highlight`, `HighlightedLink`, `TextLogo`, `ImageModal`. Wire `<Layout>{children}</Layout>` in `App.tsx`. | `pnpm dev` renders Header + Footer + an empty Layout body with correct styling. |
| **P8.1 — Port IndexHero (incl. Desktop + Mobile).** Wrap in `<motion.section id="hero">`. After commit, run an **early bundle-trajectory check** — `pnpm build && gzip -c dist/assets/index-*.js | wc -c` against a soft target of ≤ 130KB (Hero is bulky; if already past 130KB with one section, the 200KB final target is unreachable and DR-9 needs revisit before P8.2..P8.7 entrench more code). | Hero section renders pixel-equivalent to archived export's hero (side-by-side compare in two windows). Bundle trajectory ≤ 130KB gzipped. |
| **P8.2 — Port IndexQuote.** | Quote section renders + scroll past triggers `ultraDark` color in store. |
| **P8.3 — Port IndexAbout.** | About renders + scroll triggers `dark`. |
| **P8.4 — Port IndexExperience.** | Experience renders + scroll triggers `light`. |
| **P8.5 — Port IndexProjects.** | Projects renders + scroll triggers `dark`. |
| **P8.6 — Port IndexCerts.** | Certs renders + scroll triggers `ultraDark`. |
| **P8.7 — Port IndexContact (incl. subcomponents).** | Contact renders; full scroll-through smoke from top to bottom shows all transitions hit the right colors at the right scroll positions (compare side-by-side against archived export). Discord webhook still posts on success. |
| **P9. Cloudflare config + deploy artifacts.** Write `wrangler.toml` (no `compatibility_date`). Copy `public/404.html` from archive. Add `public/_headers` with immutable cache for `/fonts/*` and `/assets/*`. Add `pnpm deploy` script. (No `_redirects` — see Design sketch.) | `pnpm build` produces `dist/{index.html,404.html,_headers,assets/,fonts/}`. `ls dist/_redirects` → not found. Fonts and `404.html` are at their `public/`-relative paths (Vite does NOT hash `public/` files). |
| **P10. Docs update — per-section CLAUDE.md + wiki.** | Per-section checklist (each its own verify): |
| P10.1 CLAUDE.md "What sennett-lau is" — refresh deploy line for Cloudflare. | grep confirms no `GitHub Pages` outside an "Earlier: GitHub Pages" historical pointer. |
| P10.2 CLAUDE.md "Repo layout" — replace prior tree with new. | Tree matches the Design sketch. |
| P10.3 CLAUDE.md "Stack" — pnpm/Vite/React/Tailwind/Biome/framer-motion/Cloudflare. | No `Next.js`, `Chakra`, `npm` outside "Prior stack (archived)". |
| P10.4 CLAUDE.md "Commands" — new `pnpm *` block. | `npm run *` removed; `pnpm dev` listed. |
| P10.5 CLAUDE.md "Critical gotchas" — REMOVE: dual-purpose docs/, port-1313, TS-target-es5, no-SSR (no longer relevant). ADD: Tailwind safelist + content-glob requirement; pnpm Corepack exact pin; framer-motion `y`-transform pitfall avoided via opacity-only; preview-URL Discord webhook exposure surface; Biome rule coverage gaps vs ESLint; `_redirects` order matters. | Each new gotcha is one short bullet; obsolete bullets gone. |
| P10.6 CLAUDE.md "Migration-class files" — update. | `next.config.js`, `scripts/export.sh` removed; `wrangler.toml`, `public/_redirects`, `public/_headers`, `tailwind.config.ts` (safelist drift) added. |
| P10.7 `docs/wiki/architecture.md` — populate. Headings: System (static SPA on Cloudflare), Source layout, State (Redux + scroll hook), Styling (Tailwind tokens + safelist), Animation (framer-motion patterns), Build pipeline, Deploy pipeline. | Non-empty; each heading has at least one paragraph. |
| P10.8 `docs/wiki/current-status.md` — populate. Sections: Shipped (the migration once it lands), In flight (none after retro), Recent retros (pointer to ledger). | Non-empty. |
| P10.9 `docs/wiki/domain-model.md` — populate with the color-scheme state machine. | Non-empty; documents the `light/dark/ultraDark` transitions per section. |
| **P11. Full build + smoke + build-artifact gate.** `pnpm install && pnpm check && pnpm tsc --noEmit && pnpm build`. Then: `grep -E 'themeLight|themeDark|blanc' dist/assets/*.css` returns ≥6 hits. `gzip -c dist/assets/index-*.js | wc -c` returns ≤ 200_000. `pnpm preview` + manual scroll-through smoke. | All commands exit zero; grep + bundle-size gates pass; preview renders 7 sections; transitions correct. |
| **P11.5 Cloudflare preview deploy.** `wrangler pages deploy dist --project-name sennettlau-preview` (or push branch to a preview-only CF Pages project). | Cloudflare returns a working `*.pages.dev` URL; smoke-test in browser confirms parity. **Validates Corepack + Node 20 + pnpm 9.15.0 on actual Cloudflare runner** before DNS cutover. |

## Risks

- **Visual drift.** Mitigation: per-section side-by-side compare (P8.x verify).
- **FOUT.** Mitigation: `font-display: swap` + `<link rel="preload">` (P3).
- **Cloudflare pnpm version detection.** Mitigation: exact `"packageManager": "pnpm@9.15.0"` (DR-6) + explicit `NODE_VERSION=20` in dashboard.
- **Tailwind purge dropping runtime-composed classes.** Mitigation: triple-layered — (a) literal strings in `color.ts` covered by `content` glob; (b) explicit `safelist`; (c) build-artifact grep gate in P11. Concurring P1 from both reviewers; this is the highest-impact regression risk.
- **framer-motion + scroll-hook interaction.** Mitigation: opacity-only `fadeIn` (no `y` transform).
- **Path alias drift across `tsconfig.json` + `vite.config.ts`.** Mitigation: P2 stub import (`@/types/_ping`) exercises the alias from day one.
- **Husky removal.** Pre-commit auto-format/lint gone. Documented as known regression; user wires lefthook later if desired. `followups.md`.
- **Biome rule coverage gaps vs ESLint.** Mitigation: P4 rule audit documents what drops; CLAUDE.md gotcha records the delta.
- **Webhook exposure on preview URLs.** Cloudflare preview deploys serve the same bundle on `*.pages.dev` URLs. Anyone who finds a preview URL can flood the Discord webhook. **Strictly worse than the prior GH Pages exposure** (where the URL was the production domain only). Mitigation: documented in CLAUDE.md gotchas; long-term fix is server-side webhook proxy (followup).
- **Cloudflare auto-deploy not wired in this run.** Spec produces config; dashboard project + git integration is user's manual setup. CLAUDE.md documents.
- **`_redirects` masking 404 bugs.** Mitigation: ordered rules (specific 404 first, catch-all last); `404.html` carried over.
- **Discord webhook fetch error semantics.** Mitigation: explicit `if (!res.ok) throw` + non-recursive `discord-error-alert` (P6 verify).
- **Bundle ends up larger, not smaller.** Mitigation: 200KB gzipped target as Acceptance criterion; if measured bundle exceeds target, framer-motion or RTK become removal candidates.
- **`version/v2` → `main` integration.** Mitigation: explicit retro entry in `docs/ledger/decisions.md` documenting the merge path: feat/vite-cloudflare-migration → version/v2 → main. User handles the version/v2 → main merge after this branch lands; alice + migration arrive on main together.
- **Diff size.** PR-slicer expected to engage at Step 5 (max-effort gate). Phase commits map onto slicer's typical "one slice per concern" output naturally.

## Open questions (resolved as decisions)

| Q | Decision |
|---|----------|
| Q1. Typo fixes (`IndexExprience`, `HigtlightedLink`) at port time? | DR-1: Yes. |
| Q2. `src/utils/color.ts` return shape? | DR-2 (revised): Tailwind class fragments **with content-glob inclusion + safelist + build-artifact grep gate**. |
| Q3. Keep `setupListeners`? | DR-3: Drop. |
| Q4. Drop axios? | DR-4: Drop; use fetch with explicit ok-check. |
| Q5. Pre-commit hook? | DR-5: None for this run; followup. |
| Q6. Pin pnpm version? | DR-6 (revised): Exact pin — `pnpm@9.15.0`. |
| Q7. Branch base? | DR-7: `version/v2`, not `main`. Integration path documented. |
| Q8. framer-motion `fadeUp` shape? | DR-8 (new): Opacity-only — no `y` transform — to coexist with `useScroll` offset measurements. |
| Q9. Bundle size budget? | DR-9 (new): 200KB gzipped main JS as Acceptance criterion. |
| Q10. SPA fallback vs 404? | DR-10 (new): `404.html` preserved; `_redirects` orders specific rules before catch-all. |

## References

- Prior art: `archive/` (everything pre-migration).
- Related decisions: `decision.md` (DR-1..DR-10).
- Related wiki pages: `docs/wiki/architecture.md`, `docs/wiki/current-status.md`, `docs/wiki/domain-model.md` (populated in P10).
- Adopter CLAUDE.md gotchas honored: dual-purpose `docs/` (retired in P10), no SSR/API (retired), hardcoded Discord webhook (preserved + exposure-surface gotcha added).
- Alice rules touched: `implementation-quality.md`, `documentation-updates.md`, `post-feature-retro.md`, `feature-spec-required.md`, `test-discipline.md`, `sub-agent-orchestration.md`.
- Review findings: alice plan-eng-review (agent `ae23c81c3efe9950a`) + outside-voice (agent `a1836fa1b1538bd35`). Concurring P0/P1 fixes folded; non-concurring P1 fixes folded; P2s logged in `followups.md`.
