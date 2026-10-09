# Current status

Last update: 2026-10-09

## Shipped

- **Live on `sennettlau.me`** (and `www`, redirected to the apex) from the Worker `sennettlau` on Sennett's personal Cloudflare account: Workers static assets, plus a script that runs for `/api/*` only. workers.dev and preview URLs are off. Deploy is a CLI upload, `pnpm build && pnpm run deploy`, with no git integration. See [architecture](architecture.md#deploy-pipeline).
- **Contact form posts to `/api/contact`.** The Worker checks a Cloudflare Turnstile token, then forwards the message to Discord. The webhook URL and the Turnstile secret are Worker secrets and never ship in the bundle. The widget loads on first focus in the form. See [architecture](architecture.md#contact-api).
- **DNS on Cloudflare.** The `sennettlau.me` zone is on the personal account (nameservers `ezra`/`fiona.ns.cloudflare.com`); the registrar is still Porkbun. `www` → apex is a Redirect Rule (`https://www.*` → `https://${1}`, 301, query string kept). The zone also carries `typelite` (CNAME → `sennett-lau.github.io`, DNS only), Porkbun email-forwarding MX + SPF, and the Search Console TXT.
- Vite + pnpm + React + Tailwind + Biome + framer-motion scaffold; `wrangler.toml`, `public/_headers`, `public/404.html`; `pnpm-lock.yaml` committed.
- **ASCII redesign**: dark terminal theme, every section rebuilt. Hero (figlet name, boot log, ASCII portrait), about (three-paragraph copy + `stack.log`), experience (`git log` timeline, per-project branch under 9GAG), projects (Typelite, CityUGE, dklm.io), certs (table), contact (prompt-style form), footer. Copy lives in `src/content/` ([domain-model](domain-model.md)).
- `AsciiImage`: turns images into ASCII in the browser, with a liquid hover trail (after landonorris.com), a click/tap flood reveal and a decode animation.
- Vitest unit tests for `src/lib/{ascii,rich,reveal,contact}.ts`, and `worker/index.test.ts`, which drives `worker.fetch()` with `fetch` stubbed.
- Redux, the scroll-driven colour scheme and the Tailwind safelist removed.
- This repo's GitHub Pages publish (`main:/docs`) is off; `docs/` holds alice content only.
- `archive/` keeps the prior Next.js + Chakra project, including its assets.

## In flight

(none)

## Blocked / known regressions

- **Cutover cleanup pending** (`cutover-cleanup` TODO, ~2026-10-10): "Always Use HTTPS" is not confirmed on, so plain `http://` may be served without a redirect; `sennettlau.me` + `www` are still listed on the old Vercel project's Domains; email forwarding has not been tested since the DNS move.
- **No pre-commit hook.** Husky is archived; run `pnpm check` by hand. Follow-up: `lefthook` (`pre-commit-hook` TODO).

## Recent retros

- [2026-10-09 — contact webhook proxy](../plans/archive/2026-10-09_contact-webhook-proxy/): `/api/contact` Worker script, Turnstile, Worker secrets. Retro + bug patterns in `docs/ledger/experiences.md`; DR-1..3 in `docs/ledger/decisions.md`.
- [2026-10-08 — ASCII redesign + Cloudflare cutover](../plans/archive/2026-10-07_ascii-redesign/): redesign, Workers static assets, DNS move. Retro + bug patterns in `docs/ledger/experiences.md`; DR-7/DR-8 in `docs/ledger/decisions.md`.
- [2026-05-13 — Vite + Cloudflare migration](../plans/archive/2026-05-13_vite-cloudflare-migration/): scaffold shipped; its visual-port phase was superseded by ascii-redesign, and the plan closed with it on 2026-10-08.
