import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import worker, { type Env } from './index'

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const WEBHOOK_URL = 'https://discord.test/webhook'

const valid = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  message: 'Hello @everyone',
  token: 'XXXX.DUMMY.TOKEN.XXXX',
}

const assetResponse = new Response('asset')
const makeEnv = (overrides: Partial<Env> = {}): Env => ({
  ASSETS: { fetch: vi.fn(async () => assetResponse) },
  DISCORD_WEBHOOK_URL: WEBHOOK_URL,
  TURNSTILE_SECRET_KEY: 'turnstile-secret',
  ...overrides,
})

const post = (body: string, headers: Record<string, string> = {}) =>
  new Request('https://sennettlau.me/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': '203.0.113.7', ...headers },
    body,
  })

// Turnstile and Discord are the system boundary: stub global fetch per URL.
let turnstile: () => Response | Promise<Response>
let discord: () => Response | Promise<Response>
const fetchMock = vi.fn(async (input: RequestInfo | URL, _init?: RequestInit) => {
  const url = String(input)
  if (url === SITEVERIFY_URL) return turnstile()
  if (url === WEBHOOK_URL) return discord()
  throw new Error(`unexpected fetch ${url}`)
})
const callsTo = (url: string) => fetchMock.mock.calls.filter(([input]) => String(input) === url)
const jsonBody = (call: unknown[]) => JSON.parse((call[1] as RequestInit).body as string)

beforeEach(() => {
  turnstile = () => Response.json({ success: true })
  discord = () => new Response(null, { status: 204 })
  fetchMock.mockClear()
  vi.stubGlobal('fetch', fetchMock)
  vi.spyOn(console, 'error').mockImplementation(() => {})
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('POST /api/contact', () => {
  it('verifies the token, then posts the message to Discord', async () => {
    const res = await worker.fetch(post(JSON.stringify(valid)), makeEnv())

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })

    const [verify] = callsTo(SITEVERIFY_URL)
    expect(jsonBody(verify)).toEqual({
      secret: 'turnstile-secret',
      response: valid.token,
      remoteip: '203.0.113.7',
    })

    const [hook] = callsTo(WEBHOOK_URL)
    const payload = jsonBody(hook)
    expect(payload.allowed_mentions).toEqual({ parse: [] })
    expect(JSON.stringify(payload.embeds)).toContain(valid.message)
    expect(JSON.stringify(payload.embeds)).toContain(valid.name)
    expect(JSON.stringify(payload.embeds)).toContain(valid.email)
    expect(JSON.stringify(payload)).not.toContain(valid.token)
  })

  it('returns 400 without calling out for an invalid body', async () => {
    const { email: _email, ...noEmail } = valid
    for (const body of [JSON.stringify(noEmail), '{not json', '[]']) {
      const res = await worker.fetch(post(body), makeEnv())
      expect(res.status).toBe(400)
    }
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('returns 413 for a body over 16 KB', async () => {
    const huge = JSON.stringify({ ...valid, message: 'a'.repeat(17 * 1024) })
    const res = await worker.fetch(post(huge), makeEnv())
    expect(res.status).toBe(413)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('returns 413 from the Content-Length header alone', async () => {
    const res = await worker.fetch(post('{}', { 'Content-Length': '999999' }), makeEnv())
    expect(res.status).toBe(413)
  })

  it('stops reading a streamed body once it passes 16 KB', async () => {
    let pulls = 0
    const endless = new ReadableStream<Uint8Array>({
      pull(controller) {
        pulls++
        controller.enqueue(new Uint8Array(1024))
      },
    })
    const req = new Request('https://sennettlau.me/api/contact', {
      method: 'POST',
      body: endless,
      duplex: 'half',
    } as RequestInit)
    const res = await worker.fetch(req, makeEnv())
    expect(res.status).toBe(413)
    expect(pulls).toBeLessThan(40)
  })

  it('neutralises Discord markdown and masked links from the visitor', async () => {
    const phish = {
      ...valid,
      name: '[support](https://evil.example)',
      email: '[invoice.pdf](https://evil.example/x)@a.co',
      message: 'see [here](https://evil.example) ```break out``` **bold**',
    }
    const res = await worker.fetch(post(JSON.stringify(phish)), makeEnv())
    expect(res.status).toBe(200)

    const [embed] = jsonBody(callsTo(WEBHOOK_URL)[0]).embeds
    expect(embed.description.startsWith('```\n')).toBe(true)
    expect(embed.description.endsWith('\n```')).toBe(true)
    // Only the opening and closing fences remain; the visitor's one is broken up.
    expect(embed.description.match(/```/g)).toHaveLength(2)
    for (const field of embed.fields) {
      expect(field.value).not.toMatch(/(?<!\\)[[\]()]/)
    }
  })

  it('returns 403 and skips Discord when Turnstile rejects the token', async () => {
    turnstile = () => Response.json({ success: false, 'error-codes': ['invalid-input-response'] })
    const res = await worker.fetch(post(JSON.stringify(valid)), makeEnv())
    expect(res.status).toBe(403)
    expect(callsTo(WEBHOOK_URL)).toHaveLength(0)
  })

  it('returns 502 when Discord fails', async () => {
    discord = () => new Response('nope', { status: 500 })
    const res = await worker.fetch(post(JSON.stringify(valid)), makeEnv())
    expect(res.status).toBe(502)
  })

  it('keeps the webhook URL out of the logs when Discord is unreachable', async () => {
    discord = () => {
      throw new TypeError(`Fetch API cannot load: ${WEBHOOK_URL}`)
    }
    const res = await worker.fetch(post(JSON.stringify(valid)), makeEnv())
    expect(res.status).toBe(502)
    const logged = JSON.stringify(vi.mocked(console.error).mock.calls, (_k, v) =>
      v instanceof Error ? `${v.name}: ${v.message}` : v,
    )
    expect(logged).not.toContain(WEBHOOK_URL)
  })

  it('returns 502 when siteverify is unreachable', async () => {
    turnstile = () => {
      throw new TypeError('network down')
    }
    const res = await worker.fetch(post(JSON.stringify(valid)), makeEnv())
    expect(res.status).toBe(502)
    expect(callsTo(WEBHOOK_URL)).toHaveLength(0)
  })

  it('returns 500 and names the missing secret', async () => {
    const res = await worker.fetch(
      post(JSON.stringify(valid)),
      makeEnv({ DISCORD_WEBHOOK_URL: undefined }),
    )
    expect(res.status).toBe(500)
    expect(fetchMock).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('DISCORD_WEBHOOK_URL'))
  })
})

describe('routing', () => {
  it('returns 405 with Allow: POST for other methods on /api/contact', async () => {
    const res = await worker.fetch(new Request('https://sennettlau.me/api/contact'), makeEnv())
    expect(res.status).toBe(405)
    expect(res.headers.get('Allow')).toBe('POST')
  })

  it('returns a JSON 404 for unknown /api/ paths', async () => {
    const env = makeEnv()
    const res = await worker.fetch(new Request('https://sennettlau.me/api/nope'), env)
    expect(res.status).toBe(404)
    expect(await res.json()).toEqual({ error: 'not found' })
    expect(env.ASSETS.fetch).not.toHaveBeenCalled()
  })

  it('hands every other path to the static assets', async () => {
    const env = makeEnv()
    const req = new Request('https://sennettlau.me/missing-page')
    const res = await worker.fetch(req, env)
    expect(env.ASSETS.fetch).toHaveBeenCalledWith(req)
    expect(res).toBe(assetResponse)
  })
})
