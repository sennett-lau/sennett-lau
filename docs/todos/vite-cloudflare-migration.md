# Vite + Cloudflare migration

**Priority:** P1
**Effort:** XL
**Status:** In flight
**Created:** 2026-05-13
**Depends on:** alice adoption (commit 88ed86d)
**Plan folder:** docs/plans/active/2026-05-13_vite-cloudflare-migration/

## What

Replace the site's platform: Next.js 13 → Vite + React; Chakra UI → Tailwind utilities; npm → pnpm; ESLint+Prettier+husky → Biome; framer-motion wired for section reveals; deploy target GitHub Pages (via `docs/`) → Cloudflare Pages (`dist/` + `wrangler.toml`). Existing project surface moves into `archive/` rather than being deleted. Site visual + behavior unchanged.

## Why

- `docs/` was dual-purpose (alice content + GH Pages publish dir); the deploy script wiped alice every run.
- Static SPA doesn't justify Next's runtime surface or Chakra's CSS-in-JS layer.
- User's preferred stack (pnpm/Vite/Tailwind/Biome/framer-motion) is cleaner for a portfolio site and ships smaller bundles.
- Cloudflare Pages is faster on the edge and has zero cold starts vs Vercel.

## Context

- Single page at `src/pages/index.tsx`; seven sections (`Hero, About, Experience, Certs, Projects, Quote, Contact`); Redux Toolkit `controlSlice` drives scroll-position color scheme transitions.
- `src/utils/discord.ts` contains a hardcoded webhook URL — already public in the GH Pages bundle; preserved verbatim in the new tree.
- `framer-motion` is listed as a dep but unused in source; this run wires it as the section reveal-on-scroll pattern.
- ~4.7k LOC of TS/TSX in `src/`; full enumeration in `spec.md`.

## Acceptance hint

`pnpm install && pnpm build && pnpm preview` renders the site identically to the archived export. Cloudflare Pages config in place. CLAUDE.md + `docs/wiki/*` reflect the new stack.

## References

- Related ledger / archive entries: none yet (first feature under alice).
- Related wiki pages: `docs/wiki/architecture.md`, `docs/wiki/current-status.md` (both populated in P10).
- External links / issues: none.
