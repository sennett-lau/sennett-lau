// Note: every `VITE_*` env var is INLINED INTO THE CLIENT BUNDLE at build time.
// Anything here is public. Do not put real secrets in `VITE_*` — use a server-side
// proxy (Cloudflare Worker) for secret-bearing webhooks.
export const LOG_LEVEL = import.meta.env.VITE_LOG_LEVEL || 'debug'
export const DISCORD_ERROR_ALERT_URL = import.meta.env.VITE_DISCORD_ERROR_ALERT_URL || ''
