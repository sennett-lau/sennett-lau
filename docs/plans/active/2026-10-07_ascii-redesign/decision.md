# ASCII redesign — decisions

## DR-1 — Render ASCII in the browser, not at build time

**Context:** Sennett pointed at `ascii_magic`, which is a Python library. The site builds on Cloudflare Pages with `pnpm build`.

**Options considered:**

- **A: Pre-render with Python `ascii_magic`, commit `.txt` output.** No runtime cost. Needs a Python step whenever an image changes. The grid is fixed, so it cannot adapt to container width, and there is no decode animation.
- **B: Own ~100-line TypeScript converter, run in the browser.** Same algorithm (downsample → luminance → character ramp). Responsive grid, animatable, unit-testable, no new dependency.
- **C: npm package (`image-to-ascii`, `image-ascii-art`).** Node-only, or unmaintained. No real gain over B.

**Decision:** B. The algorithm is small, and owning it gives responsive sizing plus the decode animation.

**Consequences:** About 1–3 ms of canvas work per image on the client. No Python in the pipeline.

## DR-2 — `<pre>` text plus a CSS-mask lens, not `<canvas>` glyphs

**Context:** The ASCII grid needs a hover reveal and a decode animation.

**Options considered:**

- **A: `<canvas>` `fillText` per glyph.** Supports per-glyph colour. Needs devicePixelRatio handling, and the text cannot be selected.
- **B: `<pre>` + `textContent` writes in `requestAnimationFrame`; real `<img>` underneath with `mask-image: radial-gradient(...)` at the pointer.** Crisp at any DPR, selectable, cheap.

**Decision:** B. The design is monochrome, so per-glyph colour is not needed.

## DR-3 — Drop Redux and the scroll-driven colour scheme

**Context:** Redux existed only to drive the light/dark alternation per section (`colorScheme`, `currSectionId`, `subsectionId`, `showHeader`). The new theme is dark only.

**Options considered:**

- **A: Keep Redux, delete the unused fields.** Keeps two dependencies for one boolean.
- **B: Remove Redux. Active-section tracking becomes a local `IntersectionObserver` hook in the header.**

**Decision:** B. Nothing is shared across components any more.

**Consequences:** Removes `@reduxjs/toolkit` and `react-redux`. Removes the Tailwind safelist and `color.ts`, and with them the "safelist drift" gotcha. The DR-8 constraint from the migration plan (no `y` transforms) no longer applies, because no code reads scroll positions.

**Revisit when:** a second piece of cross-component state appears.

## DR-4 — Self-host fonts through `@fontsource`, ASCII-only glyphs in text art

**Context:** The fontsource latin subsets cover U+0000–00FF and U+2000–206F, but not box drawing (U+2500 block). Any `█╗═` glyph falls back to another font and breaks the grid.

**Decision:** Martian Mono Variable (display, via `wdth.css`, which declares all subsets; browsers fetch only latin through `unicode-range`) + IBM Plex Mono (body/ASCII, latin subset per weight). Frames use CSS borders. Figlet art uses the ASCII-only "Big Money-ne" font, pre-generated once.

**Consequences:** Fonts are Vite-hashed under `/assets/` (already `immutable` in `_headers`). The old Raleway + Zarathustra files in `public/fonts/` go away.

## DR-5 — Tiny inline markup for content emphasis

**Context:** Experience and About copy has dozens of inline highlights and links. JSX per bullet (the archive's approach) is 900+ lines.

**Decision:** Content strings use `**bold**` and `[label](url)`. A 30-line parser (`src/lib/rich.ts`, unit-tested) turns them into segments, and `RichText` renders them.

**Consequences:** Content is data (`src/content/*.ts`), easy to review against the archive. No Markdown dependency.

## DR-6 — Liquid reveal trail on a 2D canvas, not a WebGL fluid sim

**Context:** Sennett asked for the image hover to work like landonorris.com instead of a circular lens. That site's bundle drives the reveal with a WebGL stable-fluids simulation (`mouseMesh`, `mouse_force`, `cursor_size` → `tFluid`), with noise-distorted edges.

**Options considered:**

- **A: WebGL fluid sim.** Most faithful (swirls, advection). Means a few hundred lines of shaders and FBO ping-pong, or a three.js dependency (~150 KB gz), against a ~95 KB total budget.
- **B: 2D canvas fake.** Stamp soft blobs along the pointer path into a low-res mask, fade it exponentially, and run a noisy near-binary threshold each frame. Upscale the mask over the photo with `destination-in`.
- **C: CSS-only.** Masks can't keep a trail history.

**Decision:** B. It looks liquid enough (wobbly edges that shrink as they fade), adds no dependency, and its maths is pure and unit-tested (`src/lib/reveal.ts`).

**Consequences:** About 20k mask pixels per frame are processed, and only while a trail is visible. There's no swirl or advection. Revisit if the site gains a WebGL layer for other reasons.

Supersedes the lens part of DR-2 (the `<pre>`/text decision stands).

## DR-7 — Host on Workers static assets, CLI upload to the personal account

**Context:** Sennett asked to deploy to his personal Cloudflare account (laub1199@gmail.com), not the 9GAG login that Wrangler already held. He picked a CLI upload over GitHub auto-deploys. `wrangler pages project create` from an agent session was delegated by Wrangler 4.148 to Workers static assets and failed, with nothing created.

**Options considered:**

- **A: Pages, `--force`.** Matched the repo docs. A Pages project created by CLI upload can never be switched to Git integration.
- **B: Workers static assets.** Cloudflare's current path for static sites. `_headers` and `404.html` carry over (`not_found_handling = "404-page"`), `account_id` is a valid config key, and the Worker can be connected to GitHub later.

**Decision:** B (Sennett's call). Wrangler upgraded 3 → 4 so the `personal` auth profile is honoured; `account_id` in `wrangler.toml` pins the account.

**Consequences:** URL is `sennettlau.laub1199.workers.dev` until `sennettlau.me` is attached. Deploys are manual (`pnpm build && pnpm run deploy`). The contact-webhook proxy becomes a Worker script rather than a Pages Function. Supersedes migration DR-10's reliance on Pages 404 defaults.
