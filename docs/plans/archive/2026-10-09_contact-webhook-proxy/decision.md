# Contact webhook proxy — decisions

## DR-1 — API in the site's own Worker, routed with `run_worker_first`

**Context:** The webhook URL has to live server-side. The site is already an assets-only Worker.

**Options considered:**

- **A: Add a `main` script to the existing Worker; `run_worker_first = ["/api/*"]`.** One deploy, same origin (no CORS), assets keep bypassing the script.
- **B: A separate Worker on a route like `sennettlau.me/api/*`.** Two deploys and two configs for one endpoint.
- **C: Pages Functions.** The site isn't a Pages project (ascii-redesign DR-7).

**Decision:** A. It is the smallest change, and static traffic never runs code.

**Consequences:** Only `/api/*` runs the script. With `run_worker_first` as a list, asset misses get `404.html` from the asset layer and never reach it (checked under `wrangler dev`, 2026-10-09). The script's `env.ASSETS.fetch` fallback is a safety net only. A bad Worker deploy can break `/api/*` but not the static site; `wrangler rollback` restores.

**Revisit when:** A second API appears with different scaling or auth needs.

## DR-2 — Turnstile for bot checks, rendered lazily

**Context:** The webhook was abused by a script. The proxy hides the URL but would forward any POST.

**Options considered:**

- **A: Cloudflare Turnstile.** Free, no visible challenge for most people, server-side verification in one fetch.
- **B: Honeypot field only.** Stops naive bots; anything that reads the form gets through.
- **C: Per-IP rate limit only.** Caps the volume but doesn't stop it.

**Decision:** A, in managed mode with `appearance: 'interaction-only'`. The script loads on first focus inside the form, so visitors who never use the form don't load it. Rate limiting is held back until spam gets past Turnstile; a Cloudflare WAF rate-limiting rule on `/api/contact` (no code) is the first step if it does.

**Consequences:** Third-party script and iframe on the form. The real sitekey works on `sennettlau.me` and its subdomains; `localhost` and `127.0.0.1` use Cloudflare's dummy key. A failed script load shows the error line and retries on the next focus.

**Revisit when:** Spam gets through Turnstile, or the widget annoys real senders.

## DR-3 — Worker types from the `WebWorker` lib, not `wrangler types`

**Context:** Cloudflare recommends `wrangler types`. Here it generates a 16k-line, 624 KB `worker-configuration.d.ts`.

**Options considered:**

- **A: Commit the `wrangler types` output.** Exact runtime types; 624 KB of churn for a ~100-line Worker.
- **B: `@cloudflare/workers-types` devDependency.** New dependency, versioned separately from the compat date.
- **C: TypeScript's `WebWorker` lib plus a hand-written `Env`.** The Worker uses only `fetch`, `Request`, `Response` and `JSON`.

**Decision:** C. Nothing Cloudflare-specific is used, so the generated types would add nothing.

**Consequences:** `Env.ASSETS` is typed as a minimal `{ fetch }`. No `request.cf` or binding types.

**Revisit when:** The Worker uses a Cloudflare binding or API (KV, rate limiting, `request.cf`); switch to `wrangler types` then.
