# Decisions — append-only ledger

One entry per non-obvious choice. Query-only.

---

## 2026-05-13 — Migration platform: Vite + pnpm + Tailwind + Biome + framer-motion on Cloudflare Pages

**Context:** Site was Next.js 13 (static export) + Chakra UI + npm + GH Pages publish-via-`docs/`. Three frictions: bundle bloat for a static SPA, `docs/` collision with alice, user-preferred toolchain.

**Decision:** Swap to pnpm + Vite + React + Tailwind + Biome + framer-motion. Deploy to Cloudflare Pages from `dist/`. Archive the prior project under `archive/` for reference.

**Consequences:** Smaller runtime surface (no Next runtime, no Chakra runtime CSS-in-JS); cleaner docs separation; faster local dev (Vite HMR vs Next dev). Cost: bespoke component port from Chakra primitives to Tailwind utilities.

**Revisit when:** Stack reaches end-of-life or a new feature genuinely needs SSR.

**Pointers:** `docs/plans/active/2026-05-13_vite-cloudflare-migration/spec.md`, `docs/wiki/architecture.md`.

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
