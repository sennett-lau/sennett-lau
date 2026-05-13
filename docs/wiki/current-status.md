# Current status

Last update: 2026-05-13

## Shipped (post-migration)

- Vite + pnpm + React + Tailwind + Biome + framer-motion scaffold at repo root.
- Cloudflare Pages deploy artifacts: `wrangler.toml`, `public/_headers`, `public/404.html`.
- Redux Toolkit `controlSlice` + `useScroll` hook + scroll-position-driven color scheme orchestration.
- Discord-webhook contact form (working end-to-end on `IndexContact`).
- Tailwind theme tokens mirror prior Chakra extension (`blanc`, `themeDark`, `themeLight`).
- `archive/` preserves the entire prior project (Next.js + Chakra + npm + GH Pages publish-via-docs/).
- alice framework adopted (commit 88ed86d on `version/v2`).

## In flight

- **Section visual ports** — each of the 7 section components is a placeholder shell with the right id anchors + framer-motion `fadeIn`. The full Chakra-era content (Hero desktop/mobile variants, Experience timeline w/ 4 jobs and per-job subsections, Projects grid, Certs grid, About copy, Quote, Contact subcomponents) lives at `archive/src/component/index/<Section>/*` and must be ported to Tailwind utilities. See `docs/plans/active/2026-05-13_vite-cloudflare-migration/implementation.md` for the per-section TODO list.
- **Common component visual ports** — `Header` and `Footer` are minimal placeholders. `CustomLink`, `Highlight`, `HighlightedLink`, `TextLogo`, `ImageModal` not yet ported.
- **DNS cutover to Cloudflare** — `sennettlau.me` still pointing at GH Pages until user moves DNS.
- **Cloudflare Pages project setup** — user creates the project in the CF dashboard (build cmd `pnpm install && pnpm build`, output `dist`, `NODE_VERSION=20`).

## Blocked / known regressions

- **No pre-commit hook.** Husky archived; nothing replaces it yet. Manual `pnpm check` runs. Followup: wire `lefthook`.
- **Bundle size target.** 200KB gzipped main JS target asserted but not yet measured. Run `pnpm build && gzip -c dist/assets/index-*.js | wc -c` after first `pnpm install`.

## Recent retros

- [2026-05-13 — Vite + Cloudflare migration](../plans/active/2026-05-13_vite-cloudflare-migration/) (in flight; partial — infrastructure + scaffold shipped, visual port deferred).
