# Vite + Cloudflare migration — decisions

Pre-implementation calls diana made during plan drafting. Copied into `docs/ledger/decisions.md` at retro time (Step 7).

---

## 2026-05-13 — DR-1: Fix `IndexExprience` and `HigtlightedLink` typos at port time

**Context:** Existing source has two name typos: `IndexExprience` (should be `IndexExperience`) and `HigtlightedLink` (should be `HighlightedLink`). The port to the new Vite tree is the cheapest moment to fix them — every import already changes path/structure.

**Options considered:**

- **A: Fix at port time.** New files use correct spelling; archived originals keep the typos.
- **B: Preserve typos.** Match existing names verbatim for minimal cognitive diff.

**Decision:** A. Fix both typos in the new tree. Archive preserves originals.

**Consequences:**
- New code is greppable with the corrected names.
- Slight extra audit-trail noise (typo correction shows up in the diff alongside the migration).
- Archive remains the "as-was" reference.

**Revisit when:** Never — typos don't come back.

**Pointers:** `spec.md` Scope > Section components / Common components.

---

## 2026-05-13 — DR-2 (revised): `src/utils/color.ts` returns Tailwind class fragments + content-glob + safelist + build gate

**Context:** Current util returns Chakra token strings (`"themeLight.500"`) consumed by Chakra props. On Tailwind, callers need either raw hex (with inline-style / arbitrary values) or full Tailwind class fragments (`bg-themeLight-500`). Both reviewers flagged this as the highest-impact regression risk: a runtime-composed `bg-${dynamic}` would be invisible to Tailwind's content scanner and purged in production, leaving the site visually broken.

**Options considered:**

- **A: Return class fragments (`bg-themeLight-500`), literals only.** Tailwind's content scanner detects literal strings in source. If `color.ts` is in the content glob, the JIT keeps the rules. Triple-layered: literal + `content` glob + `safelist` + build-artifact grep gate.
- **B: Return raw hex (`#EFE8DB`).** Callers use inline `style={{ backgroundColor: ... }}` or arbitrary values (`bg-[#EFE8DB]`). Avoids Tailwind purge concern entirely. Loses Tailwind's color naming at callsites.
- **C: Return token names (`themeLight-500`) + caller writes `bg-${token}`.** Most flexible, but the runtime `bg-${token}` string is constructed at runtime — Tailwind scanner sees only `bg-`, not the full class. **This option does NOT solve the purge issue.**

**Decision:** A. Literal class fragments returned from `color.ts`. Tailwind config `content` glob explicitly includes `src/utils/color.ts`. `safelist` redundantly lists all `bg-*` and `text-*` × 6 tokens (belt-and-suspenders). P11 verify map adds a build-artifact grep gate: `grep -E 'themeLight|themeDark|blanc' dist/assets/*.css` returns ≥6 hits.

**Consequences:**
- Three independent guarantees that the colors land in the built CSS. Any one failing still has two safety nets.
- `safelist` foreclos es tree-shaking the listed classes — only 12 entries, negligible bundle impact.
- Build gate catches regressions at CI time, not at "user opens the site" time.

**Revisit when:** Color count grows beyond 12 listed entries (then a generated safelist via Tailwind plugin or shift to option B makes sense).

**Pointers:** `spec.md` Design sketch > Color scheme tokens; Verification map P3 + P11.

---

## 2026-05-13 — DR-3: Drop `setupListeners(store.dispatch)`

**Context:** Archived `store/index.ts` imports `setupListeners` from `@reduxjs/toolkit/query` and calls it. The app uses Redux Toolkit but does NOT use RTK Query. The call is a no-op.

**Options considered:**

- **A: Drop the line.** Cleaner store init.
- **B: Keep the line.** Matches archive verbatim.

**Decision:** A. Drop.

**Consequences:**
- One fewer dead import in the new tree.
- Archived store keeps the original for reference.

**Revisit when:** If RTK Query gets added later, restore the call.

**Pointers:** `spec.md` Verification map > P5.

---

## 2026-05-13 — DR-4: Drop `axios`; use native `fetch`

**Context:** Current code has two `axios` usage sites: `src/api/axios.ts` (a sample API client, unused in the UI as far as can be told from grep), and `src/utils/discord.ts` + `src/utils/discord-error-alert.ts` (Discord webhook POSTs). All three are one-shot requests with no shared client config that justifies axios over native fetch.

**Options considered:**

- **A: Drop axios; rewrite all three with `fetch`.** Smaller bundle (~13 KB gzipped), one fewer dep.
- **B: Keep axios.** Verbatim port, larger bundle.

**Decision:** A. Drop.

**Consequences:**
- Smaller deployed bundle.
- Slightly more verbose error handling in the new `discord.ts` (fetch's "ok-on-4xx" gotcha needs an explicit `if (!res.ok) throw`).
- Archive keeps axios usage for reference.

**Revisit when:** If a complex retry/interceptor need appears later, axios (or `ky`) can come back.

**Pointers:** `spec.md` Verification map > P6.

---

## 2026-05-13 — DR-5: No pre-commit hook in this run

**Context:** Archived `.husky/` ran `npm run fmt` (eslint + prettier) on commit. After P1 archives husky and ESLint/Prettier are replaced by Biome, no pre-commit guard exists.

**Options considered:**

- **A: No pre-commit hook.** Manual `pnpm check` runs.
- **B: Wire `lefthook`.** Modern, fast, replaces husky cleanly.
- **C: Re-wire husky + Biome.** Most verbatim port.

**Decision:** A for this run. Logged as a follow-up.

**Consequences:**
- Smaller scope; migration ships sooner.
- Risk of unformatted commits until user wires a hook later.

**Revisit when:** User wants the pre-commit guard back, or auto-format on commit becomes a friction.

**Pointers:** `spec.md` Risks > Husky removal; `followups.md` (created at run end).

---

## 2026-05-13 — DR-6 (revised): Exact pnpm version pin via `"packageManager"` field

**Context:** Cloudflare Pages auto-detects package manager via Corepack reading `package.json#packageManager`. Corepack expects an **exact version** (e.g. `pnpm@9.15.0`), not a range — outside reviewer S6 flagged that `pnpm@9.x` would either be normalized inconsistently or rejected depending on the Corepack version on Cloudflare's build runner.

**Options considered:**

- **A: Exact version pin** (`"packageManager": "pnpm@9.15.0"`).
- **B: Range pin** (`"packageManager": "pnpm@9.x"`) — risky per Corepack semantics.
- **C: Document the requirement in CLAUDE.md only.**

**Decision:** A. Exact pin at `pnpm@9.15.0` (latest stable as of 2026-05-13). Plus explicit `NODE_VERSION=20` env var in Cloudflare Pages dashboard.

**Consequences:**
- Corepack accepts the version unambiguously on local + Cloudflare.
- Periodic manual bumps required (Renovate / Dependabot could automate later).
- CLAUDE.md gotcha documents the exact-version constraint.

**Revisit when:** Quarterly pnpm minor bumps; pnpm 10 stable.

**Pointers:** `spec.md` Risks > Cloudflare pnpm version detection; Acceptance criteria > preview deploy.

---

## 2026-05-13 — DR-7 (meta): Branch from `version/v2`, not `main`

**Context:** Diana's default rule is to branch off the repo's default branch (`main`). But the alice adoption (commit 88ed86d, prerequisite for this run) is only on `version/v2`. Branching off `main` would lose alice and break the SOP.

**Options considered:**

- **A: Branch from `version/v2`** — deviation from default rule.
- **B: Branch from `main`** — follow rule literally; alice would be missing; SOP can't run.
- **C: Abort to `BLOCKED.md`** — surface to user for manual decision (fully-auto blocker protocol).

**Decision:** A. Deviation from the default rule, logged for transparency (per Decision Policy principle 5).

**Consequences:**
- Alice context preserved on the new branch.
- `feat/vite-cloudflare-migration` won't fast-forward into `main` without merging `version/v2` too — user owns the integration.

**Revisit when:** Once `main` catches up with `version/v2` (or the user retires `version/v2`), default-branch rule re-applies cleanly to future runs.

**Pointers:** `.alice/mem/diana/diana-vite-cloudflare-migration-20260513T135708Z/decisions.md` > Branch setup. Integration path explicit in `spec.md` Acceptance criteria + Risks.

---

## 2026-05-13 — DR-8: framer-motion `fadeIn` uses opacity-only, no `y` transform

**Context:** Both reviewers flagged that a `y: 24` transform on `<motion.section>` while `useScroll` reads `element.getBoundingClientRect().top` can produce timing drift — the scroll position at which the color scheme flips reads the transformed position, not the resting one. With `viewport={{ once: true }}` the transform settles fast, but during the first paint the offset is wrong.

**Options considered:**

- **A: Opacity-only fade.** No transform, no offset interference. Simpler animation.
- **B: `y` transform + suppress `useScroll` measurement until animation completes.** More complex; couples the two systems.
- **C: Drop framer-motion section reveals entirely.** Smaller scope, less polish.

**Decision:** A. Opacity-only `fadeIn` variant.

**Consequences:**
- Eliminates an entire class of timing bugs.
- Section reveals are gentler / less attention-grabbing — arguably better for a portfolio site.
- framer-motion bundle is still imported for one use; if simplification is wanted later, a CSS `@keyframes` fade is even smaller.

**Revisit when:** If a section needs a different reveal style (e.g. Hero might want a slide-in), wire per-section variants and re-evaluate scroll-hook interaction.

**Pointers:** `spec.md` Design sketch > framer-motion wiring.

---

## 2026-05-13 — DR-9: Bundle size budget — 200KB gzipped main JS

**Context:** Spec problem statement claims "meaningfully smaller and faster to ship." Outside reviewer (S2) and alice reviewer (P2#9) both flagged this as unfalsifiable. Need a concrete target.

**Options considered:**

- **A: 200KB gzipped** (comfortable for react + react-dom + RTK + framer-motion + Tailwind purged CSS).
- **B: 150KB gzipped** (aggressive — would require dropping framer-motion or RTK).
- **C: No budget.** Leaves the "smaller" claim unprovable.

**Decision:** A. 200KB gzipped main JS bundle as Acceptance criterion. Verified via `gzip -c dist/assets/index-*.js | wc -c` in P11.

**Consequences:**
- "Meaningfully smaller" becomes falsifiable.
- If the build exceeds 200KB, framer-motion or RTK become removal candidates (logged in followups).
- Sets a baseline for future drift tracking.

**Revisit when:** Site adds new feature surface that legitimately raises the bar (e.g. CMS-backed projects list).

**Pointers:** `spec.md` Acceptance criteria; Risks > Bundle ends up larger.

---

## 2026-05-13 — DR-10 (revised): No `_redirects` — Cloudflare Pages defaults handle the single-page case

**Context:** Outside reviewer round-2 correctly pointed out that mixing a `/404 /404.html 404` rule with `/* /index.html 200` in `_redirects` is a contradiction: `_redirects` matches first-to-last and the wildcard at the end (or anywhere reachable) wins for unknown paths, making the specific rule dead. The site is a single-page anchor-navigation app with no router — there are no fake routes that need rewriting back to `/`.

**Options considered:**

- **A: No `_redirects`. Just copy `404.html` into `public/`.** Cloudflare Pages auto-serves `index.html` for `/`, and `404.html` for unknown paths.
- **B: `_redirects` with ordered rules.** Doesn't deliver the claimed behavior (per outside reviewer S4/round-2).
- **C: `_redirects` with only `/* /index.html 200`.** Masks 404s (the original S4 finding).

**Decision:** A. Copy `archive/docs-build-artifacts/404.html` → `public/404.html`. **No `_redirects` file.**

**Consequences:**
- Simpler, fewer moving parts.
- Crawler 404s work correctly.
- If a router gets added later, `_redirects` reappears at that time (logged here so the reasoning is preserved).

**Revisit when:** A client-side router is added and JS-driven path changes need to survive page reloads.

**Pointers:** `spec.md` Design sketch > Routing / SPA fallback; Verification map > P9.
