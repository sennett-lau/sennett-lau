// Contact-form webhook. URL is hardcoded — already public in the shipped bundle
// across all prior deploys (logged in CLAUDE.md > Critical gotchas). Long-term
// fix is a server-side proxy in the Worker holding it as a secret — see the
// contact-webhook-proxy TODO in docs/todos/overview.md.
const DISCORD_WEBHOOK_URL =
  'https://discord.com/api/webhooks/1189401699819986944/ENm4z6pB6LIk7E7cxWlP2kAXHQwVFdjRSaw6B5c-5IvfTMrXisScIHbUdDPCte6TAOq8'

export const discordHookMessageSend = async (message: string): Promise<void> => {
  if (!message) return

  const res = await fetch(DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: message }),
  })

  if (!res.ok) {
    throw new Error(`Discord webhook failed: ${res.status} ${res.statusText}`)
  }
}
