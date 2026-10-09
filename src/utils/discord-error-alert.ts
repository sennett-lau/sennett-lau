import { DISCORD_ERROR_ALERT_URL } from '@/config'

// Best-effort error alert sender. Failures are swallowed silently — this MUST
// NOT throw or recurse into the logger (the logger calls this on errorLogger,
// which would loop forever if this fn surfaced errors back through the logger).
export const fireDiscordErrorAlert = (content: string): void => {
  if (!DISCORD_ERROR_ALERT_URL || !content) return

  fetch(DISCORD_ERROR_ALERT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  }).catch(() => {
    // Intentionally silent — never recurse into logger.errorXxx from here.
  })
}
