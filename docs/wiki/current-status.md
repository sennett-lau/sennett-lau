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
- **Live on `sennettlau.me` from the branch** — Worker `sennettlau` (static assets) on Sennett's personal Cloudflare account, custom domains `sennettlau.me` + `www`, uploaded from `feat/ascii-redesign` with `pnpm run deploy` on 2026-10-08 (ahead of the PR merge).
- **DNS moved to Cloudflare (2026-10-08)** — nameservers `ezra`/`fiona.ns.cloudflare.com`, registrar still Porkbun. Pending: www → apex Redirect Rule (dashboard), remove the domains from the old Vercel project once resolvers have caught up (~48 h), test email forwarding.

## Blocked / known regressions

- **No pre-commit hook.** Husky archived; run `pnpm check` manually. Followup: `lefthook`.
- **Contact webhook is public** in the client bundle (pre-existing). Followup: a Worker script proxying `/api/contact`, holding the webhook as a secret.

## Recent retros

- [2026-05-13 — Vite + Cloudflare migration](../plans/active/2026-05-13_vite-cloudflare-migration/) — scaffold shipped; its visual-port phase is superseded by ascii-redesign.
