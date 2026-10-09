# TODOs — overview

Live backlog. Auto-loaded each session. Per-TODO detail lives in `docs/todos/<slug>.md` and loads on demand.

## In flight

- **[P1]** [contact-webhook-proxy](contact-webhook-proxy.md) — `/api/contact` on the Worker: Turnstile check, then forward to Discord with the webhook as a secret. The old webhook was abused and is deleted, so the live form fails until this ships. Plan: `plans/active/2026-10-09_contact-webhook-proxy/`. Effort M.

## Backlog

- **pre-commit-hook** — Wire `lefthook` to run `pnpm check` + `pnpm test` (Husky was archived). (P3, S)
- **cutover-cleanup** — After DNS caches settle (~2026-10-10): remove `sennettlau.me` + `www` from the old Vercel project's Domains; turn on "Always Use HTTPS" in Cloudflare if not done; send a test email through Porkbun forwarding. (P2, S)
- **dead-utils** — `src/utils/logger.ts`, `discord-error-alert.ts`, `common.ts` and `src/config/` have no importers (pre-existing). Delete or wire up. (P3, S)

## Done recent

- **ascii-redesign** — terminal / ASCII redesign shipped and live on `sennettlau.me` (Workers static assets, DNS on Cloudflare). Archive: `plans/archive/2026-10-07_ascii-redesign/`.
- **vite-cloudflare-migration** — Vite + pnpm + Tailwind + Biome scaffold; closed with the redesign. Archive: `plans/archive/2026-05-13_vite-cloudflare-migration/`.
