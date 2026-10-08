# ASCII redesign — spec

**Status:** locked
**Owner:** Claude Code (with Sennett)
**Created:** 2026-10-07
**Locked:** 2026-10-07 (scope answers from Sennett in session: drop old projects, always-on terminal look, About → graduated + AI-DLC line)

## Problem

The Vite + Cloudflare migration (`2026-05-13_vite-cloudflare-migration`) shipped the scaffold but left every section as a placeholder shell, waiting for a 1:1 port of the Chakra-era design. Sennett no longer wants that port. He wants a new site: dark, "technical", with images rendered as ASCII art, an updated About, and a Projects section that shows his current work (Typelite, CityUGE, dklm.io) instead of the 2021–2023 projects.

## Goal

`pnpm build` produces a single-page, dark, terminal-styled portfolio with the same section set minus the quote (hero, about, experience, projects, certs, contact), ASCII-rendered images, and the new content — deployable to Cloudflare Pages unchanged.

## Non-goals

- Changing Experience content. The four roles and every bullet stay verbatim (typos included — Sennett said "do not change any of the content right now").
- Moving the contact webhook server-side (still a followup — see CLAUDE.md gotcha).
- DNS cutover or Cloudflare dashboard setup.
- Light theme / theme toggle.

## Scope

- **Theme.** Dark only. Warm near-black background, warm off-white ink, one amber "phosphor" accent. Monospace everywhere: Martian Mono (display, variable `wdth`/`wght`) + IBM Plex Mono (body + ASCII grids), self-hosted via `@fontsource`. Scanline + grain overlay. Only ASCII-range glyphs in text art (fontsource latin subsets have no box-drawing block).
- **ASCII images.** New `AsciiImage` component: samples the image on a canvas at grid resolution, maps luminance to a character ramp (same approach as Python's `ascii_magic`), renders into a `<pre>`. Real image sits underneath; a pointer-following "lens" reveals it on hover; tap toggles full reveal on touch. Decode (scramble) animation on first view. Pure conversion functions live in `src/lib/ascii.ts`.
- **Header.** Fixed status bar: prompt, section tabs with active-section highlight. Mobile menu overlay. (Hong Kong clock dropped 2026-10-07 on Sennett's review.)
- **Hero.** Figlet "Big Money-ne" name (pre-generated string), `whoami` role line, boot-log lines, CTAs, ASCII portrait (`me.png` → optimized `portrait.webp`).
- **Quote.** Removed 2026-10-07 on Sennett's review, after three rewrites (old quote → AI-DLC manifesto → first-person "how I work"): too long, and none of the wordings felt right. About carries the AI content.
- **About.** (Rewritten 2026-10-07 on Sennett's review: four narrative paragraphs — AI-native intro; career arc front end → AWS backend → Kubernetes/Terraform CI/CD + DevOps → full-stack today; parallel agents across projects; AI-DLC with agent-friendly testing/log-search/debugging envs. Education as a years-only list: MAI HKU 2026, BSc CS CityU 2022. 3D model generation moved to `now.log`. The original draft below is superseded.) Prior copy, with: HKU Master of AI in past tense ("graduated"); a new paragraph on AI-powered tools, continuous learning, experiments with 3D-model generation, agentic frameworks and agent-friendly test environments; the "exploring opportunities" line replaced by applying AI strategies to existing projects and to the life cycle of new ones (agentic, AI-driven development life cycle).
- **Experience.** Same 4 roles, same order (9GAG, Qookia, Ozaru, KR Global), same bullets, rendered as a `git log`-style timeline.
- **Projects.** Exactly three, in order:
  1. **Typelite** — open-source macOS voice keyboard (Tauri 2 / Rust / React / whisper.cpp / llama.cpp). Links: typelite.sennettlau.me, GitHub.
  2. **CityUGE** — CityU course guide; PHP era → Nuxt.js (Vue) + Fastify + MongoDB rebuild → serverless re-architecture on Cloudflare (React Router SSR on Workers, D1, KV); 300k+ visits per year.
  3. **dklm.io (大眾負評)** — Hong Kong restaurant negative-review platform; React Router SSR on Workers, D1 + Drizzle, R2, Durable Object crawlers.
  Fresh 16:10 screenshots of each live site, rendered as ASCII.
- **Certs.** Same two entries, as a table.
- **Contact.** Same copy + email + LinkedIn + GitHub; the working Discord-webhook form restyled as terminal prompts.
- **Footer.** Copyright (current year), credit line, back-to-top.
- **State.** Remove Redux Toolkit + react-redux + scroll-driven colour scheme (`store/`, `utils/color.ts`, `hooks/useScroll.ts`, `types/{color,control}.ts`, Tailwind safelist). Active-section tracking moves to an `IntersectionObserver` hook in the header.
- **Tests.** Add Vitest. Unit tests for `src/lib/ascii.ts` (grid sizing, luminance mapping, invert, normalize, transparency, scramble) and `src/lib/rich.ts` (inline markup parser used by the content files).
- **Assets.** Add `portrait.webp` + three project `.webp` screenshots. Remove assets that nothing references after the change (`me/a–f.png`, old project PNGs, Raleway + Zarathustra fonts, old icons).
- **Docs.** CLAUDE.md (stack, layout, gotchas), wiki (`current-status`, `architecture`, `domain-model`), ledger decisions, todos.

## Out of scope

- Server-side contact proxy (Cloudflare Pages Function) — logged followup.
- Fixing typos in Experience copy — flagged to Sennett, not changed.
- Analytics, sitemap, structured data.

## Acceptance criteria

- [ ] `pnpm build`, `pnpm tsc`, `pnpm check`, `pnpm test` all green.
- [ ] Main JS ≤ 200 KB gzipped.
- [ ] Every image on the page renders as ASCII; hovering (desktop) paints a liquid trail that reveals the real image (revised 2026-10-07 from a circular lens, on Sennett's review); tapping (touch) toggles it.
- [ ] `prefers-reduced-motion: reduce` → no scramble; final text shows immediately.
- [ ] Experience text matches the archive verbatim (4 roles, 26 bullets).
- [ ] Projects shows exactly Typelite, CityUGE, dklm.io in that order, each with working outbound link.
- [ ] Contact form still posts to the Discord webhook (status line shows ok/error).
- [ ] No horizontal scroll at 360 px width; header nav usable on mobile.
- [ ] No Redux / colour-scheme code left in `src/`.

## Design sketch

```
App
├─ Header (status bar · useActiveSection(ids) · mobile menu)
├─ Hero      FigletName + boot log + AsciiImage(portrait)
├─ About     RichText paragraphs + "now.log" panel
├─ Experience  git-log timeline from content/experience.ts
├─ Projects  ProjectCard x3 (AsciiImage + meta) from content/projects.ts
├─ Certs     table from content/certs.ts
├─ Contact   prompt-style form → utils/discord.ts (unchanged)
└─ Footer
```

- Content lives in `src/content/*.ts` as typed data. Inline emphasis uses a tiny markup — `**bold**` and `[label](url)` — parsed by `src/lib/rich.ts` and rendered by `RichText`.
- `src/lib/ascii.ts` is DOM-free: `gridSize`, `toAscii(pixels, cols, rows, opts)`, `scramble(target, progress, rand)`. `AsciiImage` owns the DOM side (image decode, canvas sampling, `ResizeObserver`, animation).
- `useScramble` drives both the ASCII decode and section-title decode, writing to `textContent` via a ref inside `requestAnimationFrame` (no React re-render per frame).

## Assumptions

- "Flight or Vitest" / "Frame Motion" in the request mean Vite and framer-motion. Vitest is added as the test runner.
- "Next.js and Vue" for CityUGE means Nuxt.js (Vue) — the 2020 repo is Nuxt 2 + Vuetify, and the old site card says "NuxtJs · TailwindCSS · Fastify · MongoDB".
- Sennett's "300k visits per year" is the CityUGE traffic figure to show; no other metrics are invented.
- Live sites (cityuge.com, dklm.io, typelite.sennettlau.me) are the right screenshot sources.

## Verification map

| Step | Verify |
|------|--------|
| Vitest + `lib/ascii.ts` + `lib/rich.ts` | `pnpm test` green; tests were red before the implementation |
| Theme tokens, fonts, global CSS | `pnpm build` green; computed `font-family` on `body` is IBM Plex Mono in the browser |
| Remove Redux + colour scheme | `grep -r "redux\|colorScheme" src` empty; `pnpm tsc` clean |
| `AsciiImage` | Browser screenshot shows ASCII portrait; hover shows the trail, which fully dissolves after leaving; reduced-motion run shows final frame |
| Sections | Browser screenshots at 1440 and 375 widths; no horizontal overflow (`scrollWidth === clientWidth`) |
| Contact | Submit with network intercepted → request to `discord.com/api/webhooks/...` with expected body |
| Assets cleanup | `grep` finds no reference to removed files; `pnpm build` green |
| Docs | CLAUDE.md + wiki reflect new stack; no stale Redux/safelist claims |

## Risks

- **ASCII legibility on low-contrast screenshots.** Mitigation: per-image `invert` + percentile `normalize` options.
- **Font metrics drift.** Grid assumes a 0.6 em advance. Mitigation: measure with `canvas.measureText` after `document.fonts.ready`.
- **Per-frame string writes on large grids.** Mitigation: cap columns, run decode once per element, skip under reduced motion.
