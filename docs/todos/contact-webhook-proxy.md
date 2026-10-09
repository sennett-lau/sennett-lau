# Contact webhook proxy

**Priority:** P1
**Effort:** M
**Status:** In flight
**Created:** 2026-10-09
**Depends on:** A Turnstile widget and a new Discord webhook (Sennett)
**Plan folder:** docs/plans/active/2026-10-09_contact-webhook-proxy/

## What

Serve `POST /api/contact` from the site's Worker. It validates the form, verifies a Cloudflare Turnstile token and forwards the message to Discord, with the webhook URL and Turnstile secret held as Worker secrets.

## Why

The webhook URL was hardcoded in the bundle. Someone used it to spam Sennett's Discord channel, so he deleted it and the live form now fails on every send.

## Context

See the plan folder's `spec.md` and `decision.md`.

## Acceptance hint

A real message sent from `sennettlau.me` arrives in Discord; no webhook URL in `src/` or `dist/`; requests without a valid Turnstile token get 403.

## References

- Plan: `docs/plans/active/2026-10-09_contact-webhook-proxy/`
- Ledger: vite-cloudflare-migration retro in `docs/ledger/experiences.md` (hardcoded webhook)
