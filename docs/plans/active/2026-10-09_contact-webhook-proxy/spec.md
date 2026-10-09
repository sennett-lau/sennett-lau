# Contact webhook proxy — spec

**Status:** locked
**Owner:** Claude Code (with Sennett)
**Created:** 2026-10-09
**Locked:** 2026-10-09

## Problem

The contact form posts straight from the browser to a Discord webhook whose URL was hardcoded in `src/utils/discord.ts`, so it shipped in every bundle. Someone took the URL and spammed Sennett's channel; he deleted the webhook, so the live form now fails on every send. Anything the browser holds is public, and nothing stops a script from flooding the endpoint.

## Goal

A visitor sends the contact form, the message lands in Sennett's Discord channel, and neither the webhook URL nor an unverified (bot) request ever gets through.

## Non-goals

- Spam filtering of message content, or storing messages anywhere (Discord is the only sink).
- Email delivery or auto-replies.

## Scope

- Worker script (`worker/index.ts`) alongside the existing static assets. `POST /api/contact` validates the body, verifies a Cloudflare Turnstile token, then posts to Discord. Everything that is not `/api/*` falls through to `env.ASSETS`, so the static site behaves as today.
- Two Worker secrets: `DISCORD_WEBHOOK_URL` (a new webhook) and `TURNSTILE_SECRET_KEY`. Neither appears in the repo or the bundle.
- Turnstile widget on the form: managed mode, dark theme, `interaction-only` appearance (hidden unless Cloudflare wants a click). Its script loads on first focus inside the form, not on page load.
- Shared field limits in `src/lib/contact.ts`, used by the Worker's validation and the form's `maxLength`s.
- Discord message as an embed with `allowed_mentions: { parse: [] }`, so `@everyone` in a message can't ping the channel.
- Remove `src/utils/discord.ts` and its re-export.
- Docs: CLAUDE.md, wiki (architecture, current-status), `.gitignore` for `.dev.vars`.

## Out of scope

- Per-IP rate limiting (Workers Rate Limiting binding). Turnstile tokens are single-use and minted per solve; add a limit only if spam gets past Turnstile.
- Workers Logs (`[observability]`). Errors go to `console.error`, readable with `wrangler tail`.
- Vite dev-server proxy for `/api`. Local end-to-end runs through `wrangler dev` instead.
- The other dead utils (`dead-utils` TODO).

## Acceptance criteria

- [ ] Given a valid body and a passing Turnstile token, `POST /api/contact` returns 200 `{ ok: true }` and the message appears in the Discord channel.
- [ ] Missing, empty, over-limit or malformed fields → 400; no Turnstile or Discord call.
- [ ] Failed Turnstile verification → 403; no Discord call.
- [ ] Body over 16 KB → 413. `GET /api/contact` → 405 with `Allow: POST`. Any other `/api/*` → 404 JSON.
- [ ] Secrets missing → 500 and a `console.error` naming the missing secret (not its value).
- [ ] Discord non-2xx or network error → 502; the form shows its error line.
- [ ] Non-API paths unchanged: `/` 200, `/assets/*` keeps `immutable`, an unknown path returns `404.html` with status 404.
- [ ] `grep -r "discord.com/api/webhooks" src worker dist` finds nothing.
- [ ] A message containing `@everyone` posts without pinging.
- [ ] Two sends in a row both work (the widget resets after each attempt, since tokens are single-use).
- [ ] `challenges.cloudflare.com` isn't requested until the form gets focus.
- [ ] `pnpm biome ci .`, `pnpm tsc`, `pnpm test`, `pnpm build` green.

## Design sketch

```
browser ── POST /api/contact {name, email, message, token} ──▶ Worker (run_worker_first = ["/api/*"])
                                                                 ├─ validate (src/lib/contact.ts)
                                                                 ├─ POST challenges.cloudflare.com/turnstile/v0/siteverify
                                                                 └─ POST env.DISCORD_WEBHOOK_URL (embed, no mentions)
everything else ──▶ assets (unchanged; misses still get 404.html)
```

- **wrangler.toml:** add `main = "worker/index.ts"`; under `[assets]` add `binding = "ASSETS"` and `run_worker_first = ["/api/*"]`. `not_found_handling = "404-page"` stays. The Worker's fallback is `env.ASSETS.fetch(request)`, so misses get the 404 page whichever layer handles them. *(Build finding: misses stay on the asset layer, so the fallback is a safety net only.)*
- **Worker:** one file. It reads the body with a 16 KB cap, validates, and sends `remoteip` from `CF-Connecting-IP` to siteverify. It skips the token's `hostname` and `action` checks: the sitekey only works on `sennettlau.me` and only this form uses it. Responses are small JSON bodies.
- **Types:** `worker/tsconfig.json` with `lib: ["ES2022", "WebWorker"]` and a hand-written `Env`. `pnpm tsc` checks both projects. No generated types file and no new dependency (decision DR-3).
- **Client:** a `useTurnstile` hook loads `api.js?render=explicit` once and renders into a container in the form. It exposes `token` and `reset()`. Sitekey: the real one on `sennettlau.me`, Cloudflare's always-pass dummy (`1x00000000000000000000AA`) on any other host, so localhost and `wrangler dev` work. The submit button waits for a token (`[ verifying... ]`). *(Review: the dummy key is used on `localhost` / `127.0.0.1` only; the hook gains `retry()`; the form runs `parseContact` before sending.)*
- **Local run:** `.dev.vars` (gitignored) holds the dummy secret `1x0000000000000000000000000000000AA` plus a test webhook, then `pnpm build && pnpm exec wrangler dev`. The `pnpm dev` (Vite) form has no API and shows its error line.

## Assumptions

- With a Worker present, a non-matching path still ends at `404.html`/404 through the `ASSETS.fetch` fallback. Verified by curl after deploy.
- Secrets set with `wrangler secret put` persist across later `wrangler deploy`s.
- Node 20's `Request`/`Response`/`fetch` match the Workers runtime closely enough that Vitest (node env) with a stubbed `fetch` exercises the real handler.
- Discord accepts the embed as is: description ≤ 4096, field values ≤ 1024, so the limits below fit.

## Field limits

| field | rule |
|---|---|
| name | trimmed, 1–100 chars |
| email | trimmed, ≤ 254 chars, `x@y.z` shape |
| message | trimmed, 1–2000 chars (was 1800 client-side) |
| token | 1–2048 chars |

## Verification map

| Step | Verify |
|------|--------|
| `src/lib/contact.ts` limits + `parseContact` | Vitest: valid, trimmed, each field missing / over limit / wrong type → red then green |
| `worker/index.ts` route + handler | Vitest through `worker.fetch()` with `fetch` stubbed: 200 / 400 / 403 / 405 / 404 / 413 / 500 / 502, and siteverify/Discord not called on early exits; payload has `allowed_mentions.parse = []` |
| `worker/tsconfig.json` + `pnpm tsc` | `pnpm tsc` runs both projects; a deliberate type error in `worker/` fails it |
| wrangler.toml | `pnpm exec wrangler deploy --dry-run` bundles the Worker; `wrangler dev` serves `/`, `/assets/*`, a 404, and `/api/contact` |
| `useTurnstile` + form | `wrangler dev` + browser: no `challenges.cloudflare.com` request before focus; send → 200 with the dummy keys; second send works |
| Remove `utils/discord.ts` | grep for `discord.com/api/webhooks` in `src worker dist` → nothing; build green |
| Deploy + secrets | `curl`: `/` 200, unknown → 404, GET `/api/contact` → 405, POST garbage → 400, POST bad token → 403; Sennett sends one real message and sees it in Discord |

## Risks

- **Broken site on a bad Worker deploy.** Every `/api/*` request and asset miss runs code now. Mitigation: everything else stays on the asset layer (no Worker in the path), and `wrangler rollback` restores the assets-only version.
- **Turnstile widget clashes with the terminal look when it does appear.** `theme: dark`, `size: flexible`; it shows only for suspicious visitors.
- **Free-plan limits.** 100k Worker requests/day; only `/api/*` counts. Turnstile is free.
- **Old webhook URL stays in git history.** It's deleted on Discord, so it's dead.

## Open questions

- ~~Widget appearance~~: hidden unless needed (`interaction-only`). Sennett, 2026-10-09.
- ~~Rate limiting~~: left out for now. Sennett, 2026-10-09.

## References

- TODO: `contact-webhook-proxy` in `docs/todos/overview.md`
- Ledger: `docs/ledger/experiences.md` (vite-cloudflare-migration retro: "Discord webhook URL hardcoded"); ascii-redesign DR-7 (Workers static assets)
- Cloudflare docs: Workers static assets routing (`run_worker_first`), Turnstile server-side validation, client-side rendering, testing keys
