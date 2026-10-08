# Architecture

## System

Static SPA. Build → `dist/` → Cloudflare Workers static assets (an assets-only Worker, no script). No backend, no SSR, no API routes. The only outbound call is the contact form, which POSTs to a Discord webhook from the visitor's browser.

```
LOCAL DEV                       BUILD                        DEPLOY
  src/*.tsx                      pnpm build                  pnpm run deploy
   │                              │                           │  (wrangler deploy, personal profile)
   ▼                              ▼                           ▼
  vite dev (:5173) ──HMR       vite build                 Worker `sennettlau`
                                 │                           │  [assets] directory = ./dist
  pnpm test (vitest, node env)   ▼                           │  not_found_handling = 404-page
  biome check                  dist/                         ▼
                                ├── index.html            dist/ → CF edge
                                ├── 404.html
                                ├── _headers
                                ├── assets/*  (hashed JS, CSS, fonts)
                                └── images/*  (unhashed: portrait, project shots, og.png)
```

## Source layout

See `CLAUDE.md > Repo layout`. Key modules:

- `src/App.tsx` — page composition only. No state.
- `src/content/*.ts` — all copy as typed data (hero, about, experience, projects, certs, site). Inline emphasis uses `**strong**` / `[label](url)`.
- `src/lib/ascii.ts` — DOM-free ASCII primitives: `gridSize`, `toAscii` (luminance → glyph ramp, with `invert` / `normalize` / `blackPoint` / `gamma`), `scramble` (decode-animation frame). Unit-tested.
- `src/lib/rich.ts` — parser for the inline markup. Unit-tested.
- `src/lib/reveal.ts` — DOM-free maths for the reveal trail: `valueNoise`, `thresholdMask`, `fadeFactor`, `strokePoints`. Unit-tested.
- `src/hooks/useRevealTrail.ts` — canvas + rAF side of the reveal trail (see below).
- `src/components/ascii/AsciiImage.tsx` — the DOM side of ASCII rendering (see below).
- `src/components/index/Section.tsx` — `<motion.section>` shell with an optional terminal heading (`01 / about`, scrambled title, `$ command`).
- `src/components/common/Header.tsx` — fixed status bar: prompt with the active section as cwd, section tabs, mobile menu overlay.
- `src/hooks/useAnimatedText.ts` — writes animation frames (`scrambleFrame`) straight to `textContent` inside `requestAnimationFrame`; honours reduced motion.
- `src/hooks/useActiveSection.ts` — `IntersectionObserver` over the section ids; returns the one crossing the viewport's middle band.
- `src/utils/discord.ts` — `fetch` POST to the hardcoded Discord webhook; throws on `!res.ok`.

## State

No global store. Each component owns its local state: header menu, contact form status, `AsciiImage` revealed flag (trail state lives in refs inside `useRevealTrail`). The active section comes from `useActiveSection` inside the header. Redux was removed in the ascii-redesign (plan DR-3).

## ASCII image pipeline

```
<AsciiImage src width height tone>
  ResizeObserver ──frame width──┐
  document.fonts.ready ──cell aspect (measureText)──┤
  new Image().decode() ──image──┤
                                ▼
     cols = min(200, floor(width / (fontSize * aspect)))
     rows = gridSize(...)        ─ glyph size grows so cols × advance = frame width
     samplePixels(): halving downscale on canvas → ImageData (cols × rows)
     toAscii(pixels, cols, rows, tone) → string
                                ▼
     useAnimatedText(scrambleFrame) once in view → <span class="ascii">
     <canvas> on top draws the photo only where the reveal mask is (useRevealTrail):
       mouse move  -> soft blobs stamped along the path into a low-res mask (1 px per 3 CSS px),
                      bigger when faster; the mask fades exponentially (FADE_MS 1400)
       every frame -> thresholdMask(): near-binary cutoff + drifting value noise = wobbly
                      liquid edges that shrink as they fade; upscaled onto the canvas with
                      destination-in over the photo
       click/tap   -> flood: feathered circle grows from the pointer to the frame diagonal (700 ms)
       click again -> drain: mask clipped to a circle shrinking back to the pointer (700 ms)
     The rAF loop runs only while something is visible. Trail = photo toned like the ASCII
     (grayscale; invert(0.92) for inverted tones); flood = true colour, re-toned after the drain.
     Effect modelled on landonorris.com, which drives the same reveal with a WebGL fluid sim.
     Blending: no frame border or fill. An inner wrapper carries a two-gradient feather mask
     (edges fade over 9%), so the ASCII, trail and reveal all melt into the page; the focus ring
     stays on the unmasked <button>. Behind it, an ambient glow <img> (124% size, blur 48px,
     saturate 1.8, 20% opacity, darker for inverted tones) tints the page with the image's own
     colours. Project cards clip that glow with overflow-hidden.
```

Tone presets live with the content: the portrait uses `normalize`; light website screenshots use `invert` + `blackPoint` + `gamma < 1`.

## Styling

Tailwind 3.4 utilities. Dark only. Tokens in `tailwind.config.ts`:

| Token | Hex | Use |
|-------|-----|-----|
| `bg` | `#0b0b0a` | page background |
| `panel` | `#121210` | cards, panels |
| `line` | `#2a2823` | borders, rules |
| `dim` | `#7d786d` | secondary text |
| `ink` | `#e9e4d6` | primary text; `**strong**` renders bright ink |
| `amber` | `#ffb000` | accent: links, prompts, figlet name, active tab |
| `ok` / `err` | `#9fd36b` / `#ff6b57` | status lines, `+` bullets |

Nothing builds class names at runtime, so there is no safelist.

Fonts: Martian Mono Variable (`font-display`, `wdth`/`wght` axes, `[font-stretch:112.5%]` for headings) + IBM Plex Mono (`font-mono`, body + ASCII grids), both from `@fontsource`. Plex Mono is imported per weight from the latin subset; Martian Mono's `wdth.css` declares all four subsets, so their files land in `dist/assets/`, but `unicode-range` means browsers fetch only latin. Vite hashes them into `/assets/`. The latin subsets cover U+0000–00FF and U+2000–206F only — keep text art ASCII.

`src/index.css` adds `.ascii` (line-height 1, no kerning/ligatures), `.term-btn`, and the `.crt` scanline/grain/vignette overlay on `<body>`.

## Animation

framer-motion 11: section fade-in, staggered reveals (hero boot log, about paragraphs, experience bullets), project card rise, mobile menu presence. Text effects (figlet + title scramble, ASCII decode) go through `useAnimatedText`, not framer-motion.

Reduced motion: `src/main.tsx` wraps the app in `<MotionConfig reducedMotion="user">`, so framer-motion drops transforms and keeps fades; CSS blink/pulse/bounce are `motion-safe:` only; `useAnimatedText` writes the final text at once.

## Build pipeline

`pnpm install` → `vite build`:
1. esbuild compiles TS.
2. Tailwind JIT scans `index.html` + `src/**/*.{ts,tsx}`.
3. Vite bundles, hashes JS/CSS/fonts into `dist/assets/`.
4. `public/` copies verbatim (`images/`, `404.html`, `_headers`, `favicon.ico`).

Gates: `pnpm build`, `pnpm tsc`, `pnpm check`, `pnpm test`; `gzip -c dist/assets/index-*.js | wc -c` ≤ 200000 (≈95 KB at ascii-redesign).

## Caching

`public/_headers` marks `/assets/*` immutable (hashed names only). `/images/*` is unhashed and keeps Cloudflare's default revalidation, so replacing a screenshot takes effect on the next deploy.

## Deploy pipeline

CLI upload to Cloudflare Workers static assets (ascii-redesign DR-7):
1. `pnpm build` → `dist/`.
2. `pnpm run deploy` (`wrangler deploy`) uploads `dist/` to the Worker `sennettlau` on the personal account (`account_id` in `wrangler.toml`). Live at `https://sennettlau.laub1199.workers.dev`.
3. No git integration yet; the Worker can be connected to GitHub later (Workers Builds).
4. Attaching `sennettlau.me` and the DNS move are user-owned.

Auth: Wrangler 4 `personal` profile, bound to `~/Documents/code/mine`. `pnpm deploy` (without `run`) is pnpm's built-in workspace command, not this script.
