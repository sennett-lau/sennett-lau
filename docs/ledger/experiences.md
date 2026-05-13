# Experiences — retro entries

Append-only. One entry per shipped piece of work. Query-only.

---

## 2026-05-13 — Vite + Cloudflare migration (infrastructure, partial)

**Run:** diana fully-auto / max effort. Run dir: `.alice/mem/diana/diana-vite-cloudflare-migration-20260513T135708Z/`. Plan: `docs/plans/active/2026-05-13_vite-cloudflare-migration/`.

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

- Plan: `docs/plans/active/2026-05-13_vite-cloudflare-migration/`
- Decisions: `docs/ledger/decisions.md#2026-05-13`
- TODO: `docs/todos/overview.md` (still In flight pending visual-port completion)
- Diana run dir: `.alice/mem/diana/diana-vite-cloudflare-migration-20260513T135708Z/`
