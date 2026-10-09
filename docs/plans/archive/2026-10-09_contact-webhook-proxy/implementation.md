# Contact webhook proxy — implementation log

Running log. Append-only while the feature is active. Freezes on archive.

## 2026-10-09 — kickoff

- Feature folder created. Spec: [spec.md](spec.md). Decisions: [decision.md](decision.md).
- Context: redesign merged to `main` (PR #1, `21b4612`); Vercel Git integration disconnected and GitHub Pages off, so pushes deploy nothing. The old webhook is deleted on Discord, so the live form fails today.
- First-cut plan:
  - `src/lib/contact.ts` limits + parser, with tests
  - `worker/index.ts` + `worker/tsconfig.json`, with tests through `worker.fetch()`
  - `wrangler.toml` `main` + `run_worker_first`
  - `useTurnstile` + form rewrite; remove `utils/discord.ts`
  - docs, then deploy + secrets

## 2026-10-09 — build

- **Changed:**
  - `src/lib/contact.ts` (+ 18 tests)
  - `worker/index.ts` (+ 10 tests through `worker.fetch()`), `worker/tsconfig.json`
  - `wrangler.toml`: `main`, `binding`, `run_worker_first`
  - `src/hooks/useTurnstile.ts`; `IndexContact.tsx` posts to `/api/contact`
  - `src/utils/discord.ts` removed
  - `pnpm tsc` checks both projects; `.gitignore` adds `.dev.vars*` and `.wrangler/`
  - CLAUDE.md and wiki (architecture, current-status)
- **Verified:**
  - `pnpm biome ci .`, `pnpm tsc`, `pnpm test` (58), `pnpm build` green; main JS still ≈98 KB gzipped.
  - Mutation check: making `verifyTurnstile` always pass, or dropping `allowed_mentions`, turns 2 worker tests red.
  - Local `wrangler dev` with `.dev.vars` (Turnstile dummy secret, webhook pointed at a local stub). Real siteverify accepted the dummy token. `/` 200; unknown path → `404.html`/404; `/assets/*` immutable; GET `/api/contact` → 405 + `Allow: POST`; `/api/nope` → JSON 404; bad body → 400; valid → 200 and the stub got the embed with `allowed_mentions.parse = []`.
  - Headless Chromium: 0 `challenges.cloudflare.com` requests before focus. Button reads `[ verifying... ]` until the token arrives. Two consecutive sends both returned `[ ok ]`. No console errors.
  - Forced-interactive dummy key (`3x…FF`): the widget renders dark, 73 px tall, and fits a 360 px viewport with no horizontal scroll. While hidden it is 0 px tall and its margin collapses, so the form spacing is unchanged.
- **Next:** real sitekey from Sennett, reviews, deploy, secrets, live check.

## 2026-10-09 — review round

- **Reviews:** a `security-reviewer` and a `code-reviewer` ran in parallel on the staged diff. Neither found anything critical or high.
- **Fixed:**
  - Body cap streamed: a chunked body with no Content-Length was buffered whole before. New test: an endless stream returns 413 after fewer than 40 1 KB pulls; it hung before the fix.
  - Discord text: the message goes in a code block (``` broken up with a zero-width space); name and email are markdown-escaped, so masked links can't render. The test failed when either half was reverted.
  - The Discord fetch error is replaced by its name, so the webhook URL can't reach logs. Tested.
  - `useTurnstile.retry()`: a failed script load used to disable the form for good. The next focus now retries (browser-checked with the script blocked, then allowed).
  - Dummy sitekey on `localhost` / `127.0.0.1` only: `http://www.sennettlau.me` (not redirected while "Always Use HTTPS" is off) would have used the dummy key and got a 403 on every send.
  - The form runs `parseContact` before sending (a whitespace-only name no longer spends a token). `EMAIL_SHAPE` loosened to the browser rule (`x@y`).
- **Corrected:** asset misses never reach the script when `run_worker_first` is a list. Checked under `wrangler dev` with a script that answers 299: `/nope` and `/images/nope.png` got 404 from the asset layer; only `/api/x` hit the script. The comments, DR-1, the spec notes and CLAUDE.md now say so; the `ASSETS` fallback stays as a safety net.
- **Not changed:**
  - "Empty widget div doubles the gap": measured at 32 px with or without it (the zero-height box's margin collapses).
  - Rate limiting (Sennett's call; a WAF rule is the no-code option).
  - Guarding against the dummy secret in production (needs someone to type it into `wrangler secret put`).
  - The dead webhook token in `archive/`: `GET` on it returns 404 "Unknown Webhook".
- **Checks:** `pnpm biome ci .`, `pnpm tsc`, `pnpm test` (63), `pnpm build` (98.6 KB gzipped) green; browser e2e rerun green.

## 2026-10-09 — ship

- PR: https://github.com/sennett-lau/sennett-lau/pull/2 (merge `e76a521`); deployed from `main`, Worker version `63837a6f-d3d9-4490-820f-f6f8c0a8a9ff`.
- Turnstile widget "sennettlau.me contact" (managed, domain `sennettlau.me`) created with `wrangler turnstile widget create` (alpha); the personal OAuth token has `challenge-widgets.write`. Its secret was piped from the create output into `wrangler secret put TURNSTILE_SECRET_KEY` and never printed.
- New Discord webhook "Contact.Me" created by Sennett. He copied it; it was format-checked from the clipboard and piped with `pbpaste | wrangler secret put DISCORD_WEBHOOK_URL`, never printed.
- Live checks:
  - `/` 200; `/nope` → `404.html`/404; `/assets/*` immutable
  - the bundle has the sitekey and no webhook URL
  - GET `/api/contact` → 405 `Allow: POST`; `/api/nope` → JSON 404; bad body → 400
  - before the webhook secret: valid shape → 500 "not configured"; after: fake token → 403
  - `www` → 301 apex; `typelite` 200
- Sennett sent a real message from sennettlau.me and confirmed it arrived in Discord.
- Post-feature retro:
  - [x] Archive move (folder → `docs/plans/archive/`)
  - [x] `docs/wiki/current-status.md` updated (wiki-maintainer)
  - [x] Other wiki pages updated: `architecture.md` (wiki-maintainer pass)
  - [x] `docs/ledger/experiences.md` appended
  - [x] `docs/ledger/decisions.md` appended
  - [x] `docs/todos/overview.md` struck
