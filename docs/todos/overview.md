# TODOs — overview

Live backlog. Auto-loaded each session. Per-TODO detail lives in `docs/todos/<slug>.md` and loads on demand.

## In flight

- **ascii-redesign** — Dark terminal redesign on the Vite + Cloudflare scaffold: ASCII-art images, new About copy, Projects = Typelite / CityUGE / dklm.io, Redux removed, Vitest added. Plan: `docs/plans/active/2026-10-07_ascii-redesign/`. (P1, XL)
- **vite-cloudflare-migration** — Scaffold + Cloudflare config shipped on branch; visual-port phase superseded by ascii-redesign. Plan: `docs/plans/active/2026-05-13_vite-cloudflare-migration/`. Closes with the ascii-redesign merge. (P1, XL)

## Backlog

- **contact-webhook-proxy** — Move the Discord webhook behind the Worker (a `main` script for `/api/contact` with `run_worker_first = ["/api/*"]`, webhook as a secret); rotate the current webhook after. It has been public in every bundle. (P1, M)
- **pre-commit-hook** — Wire `lefthook` to run `pnpm check` + `pnpm test` (Husky was archived). (P3, S)
- **dead-utils** — `src/utils/logger.ts`, `discord-error-alert.ts`, `common.ts` and `src/config/` have no importers (pre-existing). Delete or wire up. (P3, S)

## Done recent

(none)
