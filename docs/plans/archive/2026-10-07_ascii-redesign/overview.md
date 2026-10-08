# ASCII redesign — overview

**Status:** shipped 2026-10-08 (live on sennettlau.me, merged to main)
**Folder:** docs/plans/archive/2026-10-07_ascii-redesign/
**Started:** 2026-10-07
**Owner:** Claude Code (with Sennett)

## Problem

The Vite + Cloudflare scaffold is live on its branch, but every section is a placeholder waiting for a 1:1 port of the old Chakra design. Sennett wants a new design instead: dark, terminal-style, with ASCII-art images and refreshed About / Projects content.

## Goal

A dark, terminal-styled single-page portfolio on the existing Vite + Cloudflare Pages stack, with ASCII-rendered images, the new About copy, and Projects = Typelite, CityUGE, dklm.io.

## Current state

Spec locked. Branch `feat/ascii-redesign`, cut from `feat/vite-cloudflare-migration`. Supersedes the "visual port" phase of the migration plan.

## Links

- Spec: [spec.md](spec.md)
- Decisions: [decision.md](decision.md)
- Implementation log: [implementation.md](implementation.md)
- TODO item: `docs/todos/overview.md` under In flight (entry `ascii-redesign`)
- Related: `docs/plans/archive/2026-05-13_vite-cloudflare-migration/` (scaffold this builds on)
