# Decisions — append-only ledger

One entry per non-obvious choice. Query-only.

---

## 2026-05-13 — Migration platform: Vite + pnpm + Tailwind + Biome + framer-motion on Cloudflare Pages

**Context:** Site was Next.js 13 (static export) + Chakra UI + npm + GH Pages publish-via-`docs/`. Three frictions: bundle bloat for a static SPA, `docs/` collision with alice, user-preferred toolchain.

**Decision:** Swap to pnpm + Vite + React + Tailwind + Biome + framer-motion. Deploy to Cloudflare Pages from `dist/`. Archive the prior project under `archive/` for reference.

**Consequences:** Smaller runtime surface (no Next runtime, no Chakra runtime CSS-in-JS); cleaner docs separation; faster local dev (Vite HMR vs Next dev). Cost: bespoke component port from Chakra primitives to Tailwind utilities.

**Revisit when:** Stack reaches end-of-life or a new feature genuinely needs SSR.

**Pointers:** `docs/plans/archive/2026-05-13_vite-cloudflare-migration/spec.md`, `docs/wiki/architecture.md`.

---

## 2026-05-13 — DR-1: Fix `IndexExprience` and `HigtlightedLink` typos at port time

Port time is cheap; archive preserves originals. Folded in `decision.md` DR-1.

---

## 2026-05-13 — DR-2: `src/utils/color.ts` returns Tailwind class fragments (with content-glob + safelist + grep gate)

Triple-layered Tailwind purge defence. Highest-impact regression risk if violated. See `decision.md` DR-2 (revised).

---

## 2026-05-13 — DR-3: Drop `setupListeners(store.dispatch)` from store init

No RTK Query in this app; the call is a no-op. Archive preserves it for reference.

---

## 2026-05-13 — DR-4: Drop `axios`; use native `fetch`

Three single-shot usages (Discord webhook + sample API); axios overhead unjustified. `discord.ts` adds explicit `if (!res.ok) throw` to restore axios's reject-on-error semantics.

---

## 2026-05-13 — DR-5: No pre-commit hook in this run

Husky archived. Lefthook revival deferred to a follow-up TODO.

---

## 2026-05-13 — DR-6 (revised): Exact pnpm pin via `"packageManager": "pnpm@9.15.0"`

Corepack does not accept ranges. Exact pin required for Cloudflare Pages reproducibility. `NODE_VERSION=20` to be set in the CF Pages dashboard.

---

## 2026-05-13 — DR-7: Branch from `version/v2`, not `main` (alice prerequisite)

Diana's default rule says branch off `origin/HEAD` (`main`). Alice was committed only to `version/v2`. Branching off `main` would lose alice. Deviation logged for transparency. Integration path: user merges `feat/vite-cloudflare-migration` → `version/v2`, then `version/v2` → `main` so alice + migration land on main together.

---

## 2026-05-13 — DR-8: framer-motion `fadeIn` is opacity-only (no `y` transform)

Avoids interference with `useScroll`'s `getBoundingClientRect().top` measurements that drive the scroll-position color scheme. Both review passes concurred.

---

## 2026-05-13 — DR-9: Bundle-size budget = 200KB gzipped main JS

Makes "meaningfully smaller" falsifiable. If a build exceeds, framer-motion or RTK become removal candidates (followups noted).

---

## 2026-05-13 — DR-10 (revised): No `_redirects` — Cloudflare Pages defaults handle the single-page case

`/* /index.html 200` would mask 404s; specific rules can't beat the catch-all. Cloudflare default behaviour serves `index.html` for `/` and `404.html` for unknown paths — exactly what this single-page anchor-navigation site needs.

---

## 2026-10-07 — ascii-redesign DR-1: Render ASCII art in the browser with an in-repo converter

Python `ascii_magic` (the reference Sennett gave) would need a Python build step and a fixed grid. Chose a ~100-line TypeScript converter (`src/lib/ascii.ts`, same downsample → luminance → ramp algorithm), run client-side for responsive grids and the decode animation. Full entry: `docs/plans/archive/2026-10-07_ascii-redesign/decision.md`.

---

## 2026-10-07 — ascii-redesign DR-2: `<pre>` text + CSS-mask lens instead of `<canvas>` glyphs

Monochrome design needs no per-glyph colour; `<pre>` stays crisp at any DPR and is cheap to animate via `textContent`. The hover lens is two radial `mask-image`s driven by CSS variables.

---

## 2026-10-07 — ascii-redesign DR-3: Remove Redux and the scroll-driven colour scheme

Dark-only theme removed Redux's only job. Active-section tracking moved to an `IntersectionObserver` hook. Supersedes migration DR-2 (safelist) and DR-8 (opacity-only fades) — nothing reads scroll positions now. Revisit when real cross-component state appears.

---

## 2026-10-07 — ascii-redesign DR-4: Fontsource fonts, ASCII-only text art

Martian Mono Variable + IBM Plex Mono via `@fontsource`, latin subsets only. Those subsets lack box-drawing glyphs, so frames are CSS borders and figlet art uses the ASCII-only "Big Money-ne" font.

---

## 2026-10-07 — ascii-redesign DR-5: Content as typed data with a two-token inline markup

`src/content/*.ts` + `**strong**` / `[label](url)` parsed by `src/lib/rich.ts`. Replaces ~900 lines of per-bullet JSX and makes copy diffable against the archive.

---

## 2026-10-07 — ascii-redesign DR-6: Liquid reveal trail on a 2D canvas, not a WebGL fluid sim

Image hover modelled on landonorris.com (which uses a WebGL fluid sim). It's faked on a low-res 2D canvas: pointer-stamped blobs, exponential fade, noisy near-binary threshold, `destination-in` over the photo. No dependency; the maths is unit-tested in `src/lib/reveal.ts`. Replaces the CSS-mask circular lens. Full entry: `docs/plans/archive/2026-10-07_ascii-redesign/decision.md`.

---

## 2026-10-08 — ascii-redesign DR-7: Workers static assets, CLI upload to the personal account

Wrangler 4 delegated an agent-run `wrangler pages project create` to Workers static assets; Sennett chose Workers over `--force` Pages, because a CLI-uploaded Pages project can never switch to Git integration and a Worker can. Assets-only Worker, `not_found_handling = "404-page"`, `account_id` pinned to the personal account, auth via Wrangler's `personal` profile. Supersedes DR-10's Pages 404 defaults. Full entry: `docs/plans/archive/2026-10-07_ascii-redesign/decision.md`.

---

## 2026-10-08 — ascii-redesign DR-8: DNS on Cloudflare, registrar stays Porkbun

Workers custom domains need an active Cloudflare zone, so `sennettlau.me` DNS moved from Porkbun to the personal Cloudflare account ("connect", not "transfer"; registration can move later). Records kept: `typelite` CNAME to GitHub Pages (DNS only, so GitHub keeps renewing its cert), Porkbun email-forwarding MX + SPF, Search Console TXT. Dropped: Porkbun's `*` catch-all. `www` redirects to the apex with a Redirect Rule rather than a second canonical host.
