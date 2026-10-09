# docs/ — project operating manual

Alice-scaffolded documentation. Layout + auto-load policy.

```
docs/
  README.md           this file
  wiki/               stable knowledge
    README.md         index (auto-loaded)
    current-status.md (auto-loaded)
    architecture.md   on-demand
    domain-model.md   on-demand
  todos/              live backlog
    overview.md       (auto-loaded)
    <slug>.md         per-TODO detail (on-demand)
    findings/         user-testing findings backlog
  plans/active/       in-flight features
  plans/archive/      shipped (query-only)
  ledger/
    decisions.md      append-only decision log (query-only)
    experiences.md    append-only retros (query-only)
```

For load policy + agent SOP, see `../CLAUDE.md`. For binding rules, see `../.claude/rules/`.
