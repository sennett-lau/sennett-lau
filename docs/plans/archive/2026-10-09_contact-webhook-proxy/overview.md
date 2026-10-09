# Contact webhook proxy — overview

**Status:** shipped 2026-10-09 (live on sennettlau.me, merged to main)
**Folder:** docs/plans/archive/2026-10-09_contact-webhook-proxy/
**Started:** 2026-10-09
**Owner:** Claude Code (with Sennett)

## Problem

The contact form posted from the browser to a Discord webhook hardcoded in the bundle. The URL was taken and used to spam Sennett's channel; he deleted the webhook, so the live form fails on every send.

## Goal

The form posts to `/api/contact` on the site's own Worker, which checks a Cloudflare Turnstile token and forwards to Discord, with the webhook URL held as a Worker secret.

## Current state

Shipped 2026-10-09: PR #2 (merge `e76a521`), deployed from `main`, both secrets set, and a real message confirmed in Discord. The plan is frozen.

## Links

- Spec: [spec.md](spec.md)
- Decisions: [decision.md](decision.md)
- Implementation log: [implementation.md](implementation.md)
- TODO item: `docs/todos/overview.md` under Done recent (entry `contact-webhook-proxy`)
- Related: ascii-redesign DR-7 (Workers static assets) in `docs/plans/archive/2026-10-07_ascii-redesign/decision.md`
