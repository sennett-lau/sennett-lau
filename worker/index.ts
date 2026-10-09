// Site Worker. Only `/api/*` runs this script (run_worker_first in
// wrangler.toml); everything else, including misses that get 404.html, is
// served by the asset layer without it. The ASSETS fallback below is a safety
// net in case another path is ever routed here.

import { type Contact, parseContact } from '../src/lib/contact'

export type Env = {
  ASSETS: { fetch: (request: Request) => Promise<Response> }
  // Secrets (`wrangler secret put`); never in the repo or the bundle.
  DISCORD_WEBHOOK_URL?: string
  TURNSTILE_SECRET_KEY?: string
}

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const MAX_BODY_BYTES = 16 * 1024

const json = (status: number, body: Record<string, unknown>, headers?: HeadersInit) =>
  Response.json(body, { status, headers })

// Null once the body passes MAX_BODY_BYTES. Streams, so a chunked body with
// no Content-Length is cut off instead of buffered whole.
const readBody = async (request: Request): Promise<string | null> => {
  if (Number(request.headers.get('Content-Length') ?? 0) > MAX_BODY_BYTES) return null
  if (!request.body) return ''
  const reader = request.body.getReader()
  const decoder = new TextDecoder()
  let size = 0
  let text = ''
  for (;;) {
    const { done, value } = await reader.read()
    if (done) return text + decoder.decode()
    size += value.byteLength
    if (size > MAX_BODY_BYTES) {
      await reader.cancel()
      return null
    }
    text += decoder.decode(value, { stream: true })
  }
}

// Visitor text must not render as Discord markdown: a masked link like
// [invoice.pdf](https://evil.example) would hide where it points.
const escapeMarkdown = (text: string) => text.replace(/[\\`*_~|>#<[\]()-]/g, '\\$&')
// Code block for the message; a zero-width space breaks up any ``` inside it.
const codeBlock = (text: string) => `\`\`\`\n${text.replaceAll('`', '`\u200b')}\n\`\`\``

// Throws if siteverify itself fails; returns false if it rejects the token.
const verifyTurnstile = async (token: string, secret: string, ip: string | null) => {
  const res = await fetch(SITEVERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, response: token, remoteip: ip ?? undefined }),
  })
  if (!res.ok) throw new Error(`Turnstile siteverify failed: ${res.status}`)
  const outcome = (await res.json()) as { success?: boolean; 'error-codes'?: string[] }
  if (outcome.success !== true) console.warn('contact: Turnstile rejected', outcome['error-codes'])
  return outcome.success === true
}

const postToDiscord = async (webhookUrl: string, { name, email, message }: Contact) => {
  const request = fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      // No @everyone / role / user pings, whatever the message says.
      allowed_mentions: { parse: [] },
      embeds: [
        {
          title: 'New contact from sennettlau.me',
          description: codeBlock(message),
          fields: [
            { name: 'name', value: escapeMarkdown(name), inline: true },
            { name: 'email', value: escapeMarkdown(email), inline: true },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  })
  // The webhook URL is a secret: a network error can quote it, so only its
  // name is kept, and a bad response logs the status alone.
  const res = await request.catch((err: unknown) => {
    throw new Error(`Discord webhook unreachable: ${err instanceof Error ? err.name : 'unknown'}`)
  })
  if (!res.ok) throw new Error(`Discord webhook failed: ${res.status}`)
}

const handleContact = async (request: Request, env: Env): Promise<Response> => {
  if (request.method !== 'POST')
    return json(405, { error: 'method not allowed' }, { Allow: 'POST' })

  const { DISCORD_WEBHOOK_URL: webhookUrl, TURNSTILE_SECRET_KEY: secret } = env
  if (!webhookUrl || !secret) {
    const missing = [!webhookUrl && 'DISCORD_WEBHOOK_URL', !secret && 'TURNSTILE_SECRET_KEY']
    console.error(`contact: missing secret ${missing.filter(Boolean).join(', ')}`)
    return json(500, { error: 'not configured' })
  }

  const raw = await readBody(request)
  if (raw === null) return json(413, { error: 'too large' })
  let body: unknown
  try {
    body = JSON.parse(raw)
  } catch {
    return json(400, { error: 'invalid' })
  }
  const contact = parseContact(body)
  if (!contact) return json(400, { error: 'invalid' })

  try {
    const ip = request.headers.get('CF-Connecting-IP')
    if (!(await verifyTurnstile(contact.token, secret, ip))) {
      return json(403, { error: 'verification failed' })
    }
    await postToDiscord(webhookUrl, contact)
  } catch (err) {
    console.error('contact: upstream failed', err)
    return json(502, { error: 'upstream failed' })
  }
  return json(200, { ok: true })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url)
    if (pathname === '/api/contact') return handleContact(request, env)
    if (pathname.startsWith('/api/')) return json(404, { error: 'not found' })
    return env.ASSETS.fetch(request)
  },
}
