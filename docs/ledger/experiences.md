# Experiences — retro entries

Append-only. One entry per shipped piece of work. Query-only.

---

## 2026-05-13 — Vite + Cloudflare migration (infrastructure, partial)

**Run:** diana fully-auto / max effort. Run dir: `.alice/mem/diana/diana-vite-cloudflare-migration-20260513T135708Z/`. Plan: `docs/plans/archive/2026-05-13_vite-cloudflare-migration/`.

**What shipped:**

- Full platform swap — Next.js → Vite, Chakra → Tailwind, npm → pnpm, ESLint+Prettier+husky → Biome, axios → fetch, GH-Pages-via-docs → Cloudflare-Pages-via-dist.
- alice framework preserved on `version/v2` (commit 88ed86d); migration branch `feat/vite-cloudflare-migration` cut off `version/v2` to keep alice in scope.
- Archive of the entire prior project under `archive/` (incl. the docs/ build subset).
- Working scaffold with one fully-functional feature: the Discord-webhook contact form.

**What's deferred (the bulk of the visual port):**

- 7 section components are placeholder shells. Each has a `TODO(visual-port)` marker referencing the archive path. Full Chakra-era content (Hero desktop+mobile, Experience timeline w/ 4 jobs, Projects grid, Certs grid, About copy, Quote, Contact subcomponents) ports incrementally.
- Common components (CustomLink, Highlight, HighlightedLink, TextLogo, ImageModal) not ported.
- Bundle size, build-artifact grep gate, Cloudflare preview deploy — all need user-side `pnpm install` first.

**Surprises:**

- The visual port volume was higher than the spec acknowledged at write time. 3,866 LOC of TSX across 44 component files in `archive/src/component/` — translating each to Tailwind utilities while preserving responsive behaviour is genuinely multi-session work. Diana max-effort can lay down the spec, architecture, infrastructure, and the orchestration glue in one session, but pixel-equivalent component ports are an iterative task that benefits from running `pnpm dev` between every file. Future runs: scope migrations of this size as "infra + one section" per diana run; chain the section ports via `/diana --resume` or one-section-per-run.
- The default-branch-from-`origin/HEAD` rule didn't fit a repo where alice (the prerequisite framework) was only on a non-default working branch (`version/v2`). DR-7 deviation logged. Future adopter advice: ensure the prerequisite framework (alice) lands on the actual default branch before running diana, or be ready to log a DR-7-style deviation.
- The `_redirects` story changed twice during plan-eng-review. Round-1 wanted to preserve 404.html alongside a `/* /index.html 200` catch-all. Round-2 (outside voice) correctly pointed out that the catch-all eats the 404 rule. Final: no `_redirects` — Cloudflare Pages defaults handle the single-page case. Lesson: when the round-2 reviewer surfaces a design contradiction (not a polish item), it's worth the fold pass before locking.
- The stale 404.html (copied verbatim from archived Next.js export) reached the first review pass. The Next-flavoured `<link rel="preload" href="/_next/..."/>` was a P1 in the combined code-review pass. Lesson: when carrying over a "static" asset from a different bundler's output, treat it as code, not config — review what's in it.
- Discord webhook URL hardcoded — preserved verbatim per the user's intent and pre-existing public exposure on GH Pages. Preview-URL multiplication on Cloudflare Pages is strictly worse than the prior surface; long-term fix logged.

**Next agent advice (anyone resuming the visual port):**

- Open two browser windows: one running `pnpm dev` on the new tree, one rendering `archive/docs-build-artifacts/index.html` (the old export). Port section-by-section, side-by-side.
- The token map (Chakra `themeLight.500` → Tailwind `bg-themeLight-500`) is consistent. Responsive `{base, lg}` → `lg:` prefix. `<Flex>` → `<div className="flex">`. Spec has the full primitive map.
- Don't touch `App.tsx` or `Section.tsx` — both are load-bearing; preserve the anchor ids per `docs/wiki/domain-model.md`.
- After each section ports, run `pnpm build` and verify `grep -E 'themeLight|themeDark|blanc' dist/assets/*.css` still returns ≥3 hits (it'll grow as more sections actually use the tokens).

**Cross-references:**

- Plan: `docs/plans/archive/2026-05-13_vite-cloudflare-migration/`
- Decisions: `docs/ledger/decisions.md#2026-05-13`
- TODO: `docs/todos/overview.md` (still In flight pending visual-port completion)
- Diana run dir: `.alice/mem/diana/diana-vite-cloudflare-migration-20260513T135708Z/`

---

## 2026-10-08 — ASCII redesign + Cloudflare cutover (shipped)

**Plan:** `docs/plans/archive/2026-10-07_ascii-redesign/` (closes `docs/plans/archive/2026-05-13_vite-cloudflare-migration/` too). Decisions: ascii-redesign DR-1..DR-8 in `docs/ledger/decisions.md`.

**What shipped:** dark terminal / ASCII-art redesign of every section on the Vite scaffold (in-browser image → ASCII, liquid reveal trail, scramble text, content as typed data, Vitest); Redux removed. Hosted as an assets-only Cloudflare Worker on Sennett's personal account, `sennettlau.me` DNS moved from Porkbun to Cloudflare, www → apex redirect rule. Old Vercel auto-deploys and this repo's GitHub Pages switched off.

**What worked:**
- Content as data (`src/content/*.ts` + `**strong**` / `[label](url)`): a dozen copy rounds with Sennett touched almost no components.
- Pure maths in `src/lib/` with tests written red-first (ASCII ramp, reveal noise / threshold / fade) — the visual bugs that remained were all in the DOM/rAF glue, not the maths.
- Measuring instead of eyeballing: Playwright boxes for the "stat" label (6 px off), text-node rects, per-commit tsc/build in a scratch worktree.
- For DNS, querying the newly assigned Cloudflare nameservers directly before switching the registrar caught nothing wrong — but it did prove the hand-added `typelite` record was right before it went live.

**What burned:**
- Copy rounds: Sennett rejected several About / manifesto drafts for voice ("who works AI-native", industry claims, "by default"). Asking for his structure first, then filling it, converged faster than drafting freely.
- `biome ci | tail -1` printed an ANSI reset and hid a format failure; read the summary line.
- `pnpm deploy` is pnpm's built-in workspace command; the documented deploy script never ran. Use `pnpm run deploy`.
- First custom-domain deploy hit a Cloudflare 500 two minutes after the zone went active and left the apex without a record (~1 min outage). Wait a few minutes after activation, or delete the old records only after a successful dry run *and* zone age > 5 min.

**Do differently next time:**
- Before deleting live DNS records, have the replacement deploy command ready and run it immediately (it was), and keep the rollback (old records) written down (it was) — but also budget for a retry.
- Ask which hosting product early when a CLI may delegate (Wrangler sends agent-created static sites to Workers).

---

## 2026-10-08 — Bug pattern: rAF loop never restarts under React StrictMode

**Symptom:** pointer events queued stamps (19) but nothing drew (0); the trail canvas stayed empty in dev only.
**Cause:** StrictMode runs effect cleanup then remount; cleanup cancelled the frame but left the stored rAF id non-zero, so the "is a loop running?" check skipped `requestAnimationFrame` forever.
**Fix:** reset the ref to 0 in the cleanup (`src/hooks/useRevealTrail.ts`).
**Recurs in:** any hook that keeps a rAF / timer id in a ref and guards on it.

---

## 2026-10-08 — Bug pattern: negative progress from the first rAF timestamp

**Symptom:** `CanvasRenderingContext2D.arc` threw on a negative radius; a decode effect flashed full text (`slice(0, -1)`).
**Cause:** the rAF timestamp of the first frame can be earlier than a `performance.now()` start captured in the event handler.
**Fix:** clamp progress to `[0, 1]`.
**Recurs in:** every animation that mixes event-time `performance.now()` with rAF timestamps.

---

## 2026-10-08 — Bug pattern: `backdrop-filter` traps `position: fixed`

**Symptom:** the mobile menu overlay collapsed to the header's height.
**Cause:** an element with `backdrop-filter` (Tailwind `backdrop-blur`) becomes the containing block for fixed descendants.
**Fix:** render the overlay as a sibling of `<header>`, not inside it.
**Recurs in:** any fixed overlay/modal nested under a blurred or transformed/filtered ancestor.

---

## 2026-10-08 — Bug pattern: glyph fallback breaks monospace ASCII

**Symptom:** box-drawing frames and arrows (`█ ═ → ↵`) misaligned the figlet / ASCII grids.
**Cause:** fontsource latin subsets cover U+0000–00FF and U+2000–206F only; missing glyphs fall back to another font with different advance widths.
**Fix:** ASCII-only art (`-->`, `+`, `|`) and CSS borders (DR-4).
**Recurs in:** any subsetted webfont used for character grids.

---

## 2026-10-08 — Bug pattern: words split at hyphens in narrow columns

**Symptom:** "AI-/native" and "back-/end" broke across lines.
**Cause:** browsers treat `-` as a break opportunity.
**Fix:** `RichText` wraps hyphenated words in `whitespace-nowrap` spans (`keepHyphens`).
**Recurs in:** any copy with compound terms in narrow layouts.

---

## 2026-10-08 — Bug pattern: Cloudflare's DNS scan misses records behind a wildcard

**Symptom:** the import showed `*` → `pixie.porkbun.com` but not `typelite` → `sennett-lau.github.io`.
**Cause:** the scan probes common names; a wildcard answers for everything, so explicit records it didn't probe are invisible.
**Fix:** dig the known subdomains against the old nameservers and add missing records by hand before switching.
**Recurs in:** every zone onboarding from a registrar with default catch-all records.

---

## 2026-10-08 — Bug pattern: Workers `routes` silently disable workers.dev

**Symptom:** after adding custom domains, `sennettlau.laub1199.workers.dev` returned 404.
**Cause:** with `routes` set and `workers_dev` unset, Wrangler 4 disables workers.dev (and preview URLs) on deploy.
**Fix:** set `workers_dev` / `preview_urls` explicitly in `wrangler.toml` (both `false` here, on purpose).
**Recurs in:** any Worker that gains routes after shipping on workers.dev.

---

## 2026-10-09 — Contact webhook proxy (shipped)

**Plan:** `docs/plans/archive/2026-10-09_contact-webhook-proxy/`. Decisions: contact-webhook-proxy DR-1..DR-3 in `docs/ledger/decisions.md`.

**What shipped:** `POST /api/contact` on the site's Worker (`run_worker_first = ["/api/*"]`). It validates the payload (`src/lib/contact.ts`), verifies a Cloudflare Turnstile token, then forwards one embed to a new Discord webhook ("Contact.Me"). The webhook and the Turnstile secret are Worker secrets. The form loads Turnstile on first focus (managed, `interaction-only`). The hardcoded webhook, scraped from the bundle and used for spam, was deleted on Discord and removed from `src/`.

**What worked:**
- Shared parser for the form and the Worker: one set of limits, and the client rejects bad fields before spending a single-use token.
- Testing the Worker through `worker.fetch()` with only global `fetch` stubbed (Turnstile and Discord are the boundary), plus mutation checks (always-pass Turnstile, no `allowed_mentions`, no escaping) to prove the tests bite.
- Local end to end with Turnstile's dummy keys and a 15-line Python webhook stub, then headless Chromium for the lazy load, double send, blocked-script retry and the forced-interactive widget at 360 px.
- Two fresh reviewers (code + security) in parallel found five real issues the tests didn't: streamed body cap, markdown and masked links, URL in fetch errors, a one-shot failure that disabled the form for good, and the dummy key on `http://www`.
- Secrets never touched the transcript:
  - The Turnstile secret went from the `wrangler turnstile widget create --json` output into `wrangler secret put` through a private temp file.
  - The Discord URL went from Sennett's clipboard, after a match/no-match format check, via `pbpaste | wrangler secret put`.

**What burned:**
- I gave Sennett dashboard steps for the Turnstile widget before checking the CLI. `wrangler turnstile widget create` exists (alpha), and the personal OAuth token has `challenge-widgets.write`. He had to ask "could you create it yourself?"
- The spec claimed asset misses would reach the script; they don't (see bug pattern below). The comments, DR-1 and CLAUDE.md had to be corrected after review.
- A code reviewer reported a "doubled gap" from an empty widget div; measuring showed 32 px either way (the margin collapses through the empty box). Measure before acting on layout claims.

**Do differently next time:**
- Before writing setup steps for the user, check `wrangler --help` and the token scopes (`wrangler whoami`) for a CLI path.
- Verify routing assumptions with a throwaway Worker under `wrangler dev` before writing them into the spec.

---

## 2026-10-09 — Bug pattern: `run_worker_first` list keeps asset misses off the Worker

**Symptom:** an `env.ASSETS.fetch` fallback "for 404s" and its unit test described a path production never takes.
**Cause:** with `run_worker_first = ["/api/*"]`, the asset layer applies `not_found_handling` itself. Only matching paths reach the script; misses get `404.html` without running it.
**Fix:** checked with a throwaway Worker answering 299 under `wrangler dev` (`/nope` → 404 from assets, `/api/x` → 299). The fallback is kept as a labelled safety net.
**Recurs in:** any Workers static-assets project that mixes a script with `not_found_handling`.

---

## 2026-10-09 — Bug pattern: `request.arrayBuffer()` defeats a body-size cap

**Symptom:** the 16 KB cap rejected a chunked body only after reading all of it (a reviewer read 8 MiB before the 413).
**Cause:** a chunked body has no Content-Length, so the header check passes, and `arrayBuffer()` / `text()` / `json()` buffer everything before any size check.
**Fix:** read `request.body.getReader()`, count bytes, `reader.cancel()` past the cap (`worker/index.ts` `readBody`). Test: an endless `ReadableStream` gets a 413 after fewer than 40 pulls; it hung before.
**Recurs in:** every Worker or fetch handler that caps request bodies.

---

## 2026-10-09 — Bug pattern: Discord webhooks render visitor markdown and masked links

**Symptom:** a reviewer showed that an email like `[invoice.pdf](https://evil.example/x)@a.co` passes the email check and renders as a disguised link in the embed.
**Cause:** embed descriptions and field values support markdown, including masked links. `allowed_mentions: { parse: [] }` stops pings but not formatting.
**Fix:** message in a code block (any ``` inside is broken with a zero-width space); name and email are backslash-escaped for `` \`*_~|>#<[]()- ``.
**Recurs in:** any webhook or bot that posts user-supplied text to Discord (Slack mrkdwn has the same issue with `<url|label>`).

---

## 2026-10-09 — Bug pattern: fetch errors can quote a secret URL into logs

**Symptom:** the plan said "never log the webhook URL", but `console.error(err)` on a failed `fetch(webhookUrl)` can include it. workerd's "Fetch API cannot load: <url>" does.
**Cause:** a webhook URL is itself the credential, and network errors carry the URL.
**Fix:** catch the fetch and rethrow `new Error(\`Discord webhook unreachable: ${err.name}\`)`; bad responses log the status only. A test asserts the URL never reaches `console.error`.
**Recurs in:** anything that calls a capability URL (webhooks, presigned URLs, tokens in query strings).

---

## 2026-10-09 — Bug pattern: one-shot lazy loader leaves the form disabled forever

**Symptom:** with `challenges.cloudflare.com` blocked, the form showed "try again", but the submit button stayed disabled with no way back.
**Cause:** the effect that loads Turnstile depends only on `[container, enabled]`; after a failure neither changes and the component never unmounts, so "a later mount retries" never happened.
**Fix:** an `attempt` counter in the effect deps, bumped by `retry()` on the form's next focus (`useTurnstile.ts`); browser-checked by blocking, then allowing, the script.
**Recurs in:** any lazily loaded third-party script (maps, payments, captcha) behind a "load once" promise.

---

## 2026-10-09 — Bug pattern: zsh mangles unquoted URLs and `=` words

**Symptom:** `curl … https://www.sennettlau.me/about?x=1` failed with "no matches found"; `echo =====` failed with "==== not found".
**Cause:** zsh globs `?` and fails on no match by default; a word starting with `=` triggers `=cmd` path expansion.
**Fix:** quote URLs with `?`, `&` or `*`; use `-----` for separators. Also: macOS has no `timeout`, so a hung `timeout 60 vitest …` printed nothing; use the Bash tool's own timeout.
**Recurs in:** every shell one-liner on this Mac.
