# Vite + Cloudflare migration — overview

**Status:** spec in review
**Folder:** docs/plans/active/2026-05-13_vite-cloudflare-migration/
**Started:** 2026-05-13
**Owner:** diana (fully-auto / max effort)

## Problem

Site runs on Next.js 13 + Chakra + npm + GH-Pages-via-`docs/`. The `docs/` publish dir collides with alice (just adopted at commit 88ed86d). Stack is heavier than a static SPA needs.

## Goal

Replace the platform with pnpm + Vite + React + Tailwind + Biome + framer-motion; deploy to Cloudflare Pages; preserve prior code under `archive/`; keep alice intact.

## Current state

> **2026-10-07:** the visual-port phase is superseded by `docs/plans/active/2026-10-07_ascii-redesign/`, which rebuilds every section in a new design instead of porting the Chakra one. This plan closes when that branch merges.

Spec drafted (`spec.md`). Awaiting `/plan-eng-review` + outside-voice pass before lock. No code changes yet.

## Links

- Spec: [spec.md](spec.md)
- Decisions: [decision.md](decision.md)
- Implementation log: [implementation.md](implementation.md)
- TODO item: `docs/todos/overview.md` under In flight (entry `vite-cloudflare-migration`)
- Related archive / ledger entries: none yet (first feature under alice)
