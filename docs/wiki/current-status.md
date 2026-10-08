# Current status

Last update: 2026-10-07

## Shipped (on branch, not yet merged)

- Vite + pnpm + React + Tailwind + Biome + framer-motion scaffold; Cloudflare Pages artifacts (`wrangler.toml`, `public/_headers`, `public/404.html`). `pnpm-lock.yaml` generated with the redesign (lands with its PR).
- **ASCII redesign** (`feat/ascii-redesign`): dark terminal theme, every section rebuilt — hero (figlet name, boot log, ASCII portrait), about (new AI copy + `stack.log`), experience (`git log` timeline, copy verbatim), projects (Typelite, CityUGE, dklm.io), certs (table), contact (prompt-style form, still posting to the Discord webhook), footer.
- `AsciiImage`: browser-side image → ASCII with a liquid hover trail (after landonorris.com), click/tap flood reveal, decode animation.
- Vitest with unit tests for `src/lib/ascii.ts` and `src/lib/rich.ts`.
- Redux, scroll-driven colour scheme and the Tailwind safelist removed.
- `archive/` keeps the prior Next.js + Chakra project, including its assets.

## In flight

- **ascii-redesign** — awaiting review / PR. Plan: `docs/plans/active/2026-10-07_ascii-redesign/`.
- **DNS cutover to Cloudflare** — `sennettlau.me` still points at the old host until the user moves DNS.
- **Cloudflare Pages project setup** — user creates the project in the CF dashboard (build `pnpm install && pnpm build`, output `dist`, `NODE_VERSION=20`).

## Blocked / known regressions

- **No pre-commit hook.** Husky archived; run `pnpm check` manually. Followup: `lefthook`.
- **Contact webhook is public** in the client bundle (pre-existing). Followup: Cloudflare Pages Function proxy holding the webhook as a secret.

## Recent retros

- [2026-05-13 — Vite + Cloudflare migration](../plans/active/2026-05-13_vite-cloudflare-migration/) — scaffold shipped; its visual-port phase is superseded by ascii-redesign.
