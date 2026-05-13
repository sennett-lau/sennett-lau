# Architecture

## System

Static SPA. Build → `dist/` → Cloudflare Pages edge. No backend, no SSR, no API routes. One HTTP origin (the contact form) talks to a third-party Discord webhook from the user's browser.

```
LOCAL DEV                       BUILD                       DEPLOY
  src/*.tsx                      pnpm build                 git push → CF webhook
   │                              │                          │
   ▼                              ▼                          ▼
  vite dev (:5173) ──HMR──┐    vite build                CF Pages runner
   │                      │     │                          │  (NODE_VERSION=20)
   ▼                      │     ▼                          │  Corepack → pnpm@9.15.0
  Tailwind JIT            │   dist/                        ▼
   │  (sees color.ts      │    ├── index.html          pnpm install && pnpm build
   │   literals via       │    ├── 404.html               │
   │   content glob)      │    ├── _headers               ▼
   ▼                      │    ├── assets/*.{js,css}    dist/ → CF edge → sennettlau.me
  browser                 │    └── fonts/                (after DNS cutover — user-owned)
                          │
                          └── biome check ──────────▶
```

## Source layout

See `CLAUDE.md > Repo layout`. Key modules:

- `src/App.tsx` — page composition + scroll-position orchestration. Reads `scrollPosition` from `useScroll()`, computes the active section + color scheme via the `positionColors` array, dispatches `setColorScheme` / `setCurrSectionId` / `setShowHeader` / `setSubsectionId`.
- `src/components/index/Section.tsx` — shared `<motion.section>` shell with opacity-only `fadeIn` (DR-8).
- `src/store/controlSlice.ts` — single Redux slice. State: `colorScheme`, `showHeader`, `currSectionId`, `subsectionId`, `isImageModalOpen`, `imageModalSrc`.
- `src/utils/color.ts` — `ColorScheme` → Tailwind class fragment (`bg-*`, `text-*`). Surface PINNED; safelist + grep gate enforce it.
- `src/utils/discord.ts` — `fetch` POST to hardcoded Discord webhook. Explicit `if (!res.ok) throw`.

## State

One Redux Toolkit slice. Single source of truth. State machine is described in [domain-model.md](domain-model.md).

```
useScroll() ──scrollPosition──▶ App.tsx useEffect ──dispatch──▶ controlSlice
                                                                    │
                                                                    ▼
                                                         useSelector in <Header>, <Section>,
                                                         <Footer>, <App>'s outer div
```

## Styling

Tailwind utility classes. Theme tokens in `tailwind.config.ts`:

| Token | Hex | Use |
|-------|-----|-----|
| `blanc-100` | `#E7F2FF` | accent (light) |
| `blanc-200` | `#054491` | accent (dark) |
| `themeDark-500` | `#2E2A2A` | dark background |
| `themeDark-900` | `#1F1F1F` | ultraDark background |
| `themeLight-500` | `#EFE8DB` | light background |
| `themeLight-900` | `#DAD6CB` | light accent |

**Safelist invariant:** `color.ts` returns 6 `bg-*` + 6 `text-*` literals. JIT detects them via the `content` glob; safelist re-lists them belt-and-suspenders. Any new prefix returned from `color.ts` (`border-*`, `from-*`, `ring-*`, ...) must update both safelist AND the P11 build-artifact grep gate, or production renders unstyled. See plan `decision.md` DR-2.

Fonts: `Raleway` (TTF, multiple weights) + `Zarathustra` (OTF). Loaded via `@font-face` with `font-display: swap`. Primary weights preloaded via `<link rel="preload">` in `index.html`. `public/_headers` caches them immutably.

## Animation

framer-motion 11. Single shared variant `fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } } }`. Applied per-section via `<Section>` (alias for `<motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}>`). **No `y` transform** — would interfere with `useScroll`'s `getBoundingClientRect().top` reads that drive the color scheme.

## Build pipeline

`pnpm install` (Corepack ensures pnpm@9.15.0) → `vite build` runs:
1. TS compilation via esbuild.
2. Tailwind JIT scans `content` glob, emits CSS rules for detected classes + `safelist` entries.
3. Vite bundles + tree-shakes; outputs to `dist/`.
4. `public/` is copied verbatim into `dist/` (no hashing).

Verify gates after build (per spec):
- `grep -E 'themeLight|themeDark|blanc' dist/assets/*.css` → ≥6 hits (color rules landed).
- `gzip -c dist/assets/index-*.js | wc -c` → ≤200000 (bundle budget).
- `ls dist/{index.html,404.html,_headers}` → present.

## Deploy pipeline

Cloudflare Pages git integration:
1. Push to `feat/<branch>` → CF creates a `*.pages.dev` preview deploy. Build runs on CF.
2. Merge to main / production branch → CF promotes to the production project's primary domain.
3. User maps `sennettlau.me` to CF via DNS (currently still on GH Pages; out of scope for this run).

Manual deploy fallback: `pnpm deploy` runs `wrangler pages deploy dist --project-name sennettlau`. Requires `wrangler login` and an existing CF Pages project.
