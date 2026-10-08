# Current status

Last update: 2026-10-08

## Shipped (on branch, not yet merged)

- Vite + pnpm + React + Tailwind + Biome + framer-motion scaffold; Cloudflare artifacts (`wrangler.toml`, `public/_headers`, `public/404.html`); `pnpm-lock.yaml` committed.
- **ASCII redesign** (`feat/ascii-redesign`): dark terminal theme, every section rebuilt — hero (figlet name, boot log, ASCII portrait), about (new AI copy + `stack.log`), experience (`git log` timeline, copy verbatim), projects (Typelite, CityUGE, dklm.io), certs (table), contact (prompt-style form, still posting to the Discord webhook), footer.
- `AsciiImage`: browser-side image → ASCII with a liquid hover trail (after landonorris.com), click/tap flood reveal, decode animation.
- Vitest with unit tests for `src/lib/ascii.ts` and `src/lib/rich.ts`.
- Redux, scroll-driven colour scheme and the Tailwind safelist removed.
- `archive/` keeps the prior Next.js + Chakra project, including its assets.

## In flight

- **ascii-redesign** — awaiting review / PR. Plan: `docs/plans/active/2026-10-07_ascii-redesign/`.
- **Deployed (preview of the branch)** — Worker `sennettlau` (static assets) on Sennett's personal Cloudflare account, `https://sennettlau.laub1199.workers.dev`, uploaded from `feat/ascii-redesign` with `pnpm run deploy` on 2026-10-08.
- **Custom domain** — `sennettlau.me` still points at the old host; attaching it to the Worker (and the DNS move) is user-owned.

## Blocked / known regressions

- **No pre-commit hook.** Husky archived; run `pnpm check` manually. Followup: `lefthook`.
- **Contact webhook is public** in the client bundle (pre-existing). Followup: a Worker script proxying `/api/contact`, holding the webhook as a secret.

## Recent retros

- [2026-05-13 — Vite + Cloudflare migration](../plans/active/2026-05-13_vite-cloudflare-migration/) — scaffold shipped; its visual-port phase is superseded by ascii-redesign.
