# Domain model

The site's "domain" is its content. All copy lives in `src/content/*.ts` as typed data; components only render it.

## Content files

| File | Exports | Notes |
|------|---------|-------|
| `site.ts` | `OWNER`, `EMAIL`, `SOCIALS`, `SECTIONS`, `CONTACT_PITCH` | `SECTIONS` order drives header tabs + `useActiveSection`. |
| `hero.ts` | `FIGLET_FIRST`, `FIGLET_LAST`, `FIGLET_COLS`, `ROLE`, `LOCATION`, `FOCUS`, `BOOT_LOG` | Figlet strings pre-generated with figlet "Big Money-ne"; `FIGLET_COLS` = widest line, drives the fit-to-width font size. No generator script: rerun `figlet.textSync(word, { font: 'Big Money-ne' })` by hand if the name changes. |
| `about.ts` | `ABOUT`, `STACK` | `ABOUT` = three short paragraphs (résumé-style, no "I"): full-stack developer in Hong Kong and Tokyo + education (CityU BSc CS; HKU MAI 2026); web-based applications across the SDLC; AI-native builder with an agent-friendly life cycle and parallel projects. `STACK` = the `stack.log` panel, grouped `{ key, items }` (web, cloud, infra, ai): what Sennett knows and uses. |
| `experience.ts` | `EXPERIENCE: Role[]` | All four roles updated with Sennett from his LinkedIn (2026-10-07), merged with the earlier site copy. 9GAG / MemeStrategy has role-wide `points`, then an optional `projects: RoleProject[]` timeline (latest first: Stealth, 9GAG, AceTrader, Pain, Stakeland), each `{ name, href?, about?, work }`; `about` renders on its own line above `work`, and a project without `href` renders as plain text. Don't add claims without Sennett's sign-off. |
| `projects.ts` | `PROJECTS: Project[]` | Exactly Typelite, CityUGE, dklm.io, in that order. Each carries its image + ASCII `tone`. |
| `certs.ts` | `CERTS` | |

## Inline markup

`**strong**` and `[label](url)`, parsed by `src/lib/rich.ts` into `RichSegment[]` and rendered by `RichText`. Strong renders as bright ink, links as amber underline. Anything else is literal.

## Project

```ts
type Project = {
  slug: string; name: string; aka?: string; years: string; role: string
  tagline: string; body: string[]          // what the project is about (inline markup); no tech
  features?: Array<{ name; text }>          // headline features, listed under the body
  stack: string[]                          // top-level tech only, no per-service detail
  stat?: { value: string; label: string }  // e.g. CityUGE 300k+ visits per year
  releases?: Array<{ version; summary }>    // major rebuilds, latest first (git-tag style)
  links: Array<{ label: string; href: string }>  // first link = primary button
  image: { src; alt; width; height; tone: AsciiOptions minus ramp }
}
```

## Images

| File | Source | Tone |
|------|--------|------|
| `public/images/portrait.webp` | `archive/public/assets/me.png`, 4:5 crop, 960×1200 | `normalize` |
| `public/images/projects/typelite.webp` | typelite.sennettlau.me hero, 2× capture, focal 16:10 crop, 1200×750 | `invert`, `blackPoint 0.14`, `gamma 0.6` |
| `public/images/projects/cityuge.webp` | cityuge.com hero, same treatment | `invert`, `blackPoint 0.1`, `gamma 0.6` |
| `public/images/projects/dklm.webp` | dklm.io hero, same treatment | `invert`, `blackPoint 0.05`, `gamma 0.7` |
| `public/images/og.png` | generated (figlet name + ASCII portrait), 1200×630 | — |

Width/height in content must match the file — they set the frame's aspect ratio and the ASCII grid.

## Anchor ids

Sections: `hero`, `about`, `experience`, `projects`, `certs`, `contact` (header tabs and in-page links target these). Per-item: `experience-<id>`, `project-<slug>`.
