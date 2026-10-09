# Contact webhook proxy — overview

**Status:** building
**Folder:** docs/plans/active/2026-10-09_contact-webhook-proxy/
**Started:** 2026-10-09
**Owner:** Claude Code (with Sennett)

## Problem

The contact form posted from the browser to a Discord webhook hardcoded in the bundle. The URL was taken and used to spam Sennett's channel; he deleted the webhook, so the live form fails on every send.

## Goal

The form posts to `/api/contact` on the site's own Worker, which checks a Cloudflare Turnstile token and forwards to Discord, with the webhook URL held as a Worker secret.

## Current state

Spec locked 2026-10-09. Building; waiting on a Turnstile widget and a new Discord webhook from Sennett. Branch `feat/contact-webhook-proxy`, cut from `main` at `21b4612`.

## Links

- Spec: [spec.md](spec.md)
- Decisions: [decision.md](decision.md)
- Implementation log: [implementation.md](implementation.md)
- TODO item: `docs/todos/overview.md` under In flight (entry `contact-webhook-proxy`)
- Related: ascii-redesign DR-7 (Workers static assets) in `docs/plans/archive/2026-10-07_ascii-redesign/decision.md`
