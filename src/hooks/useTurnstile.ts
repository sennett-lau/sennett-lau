import { type RefObject, useCallback, useEffect, useRef, useState } from 'react'

// The real sitekey works on sennettlau.me and its subdomains. Local hosts
// (`pnpm dev`, `wrangler dev`) get Cloudflare's always-pass dummy key, which
// pairs with the dummy secret in .dev.vars; the production secret rejects it.
const LOCAL_HOSTS = ['localhost', '127.0.0.1']
const SITE_KEY = '0x4AAAAAAFSGFgwzCvxuhNXs'
const DUMMY_SITE_KEY = '1x00000000000000000000AA'
// Must load from this exact URL: Cloudflare says proxying or caching breaks it.
const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string
  reset: (widgetId: string) => void
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

let scriptPromise: Promise<TurnstileApi> | null = null

const loadTurnstile = () => {
  scriptPromise ??= new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = SCRIPT_URL
    script.async = true
    script.onload = () =>
      window.turnstile ? resolve(window.turnstile) : reject(new Error('Turnstile API missing'))
    script.onerror = () => {
      scriptPromise = null // let a later mount retry
      reject(new Error('Turnstile script failed to load'))
    }
    document.head.appendChild(script)
  })
  return scriptPromise
}

// Renders a Turnstile widget into `container` once `enabled` turns true, so the
// script loads only for visitors who use the form.
export const useTurnstile = (container: RefObject<HTMLElement>, enabled: boolean) => {
  const [token, setToken] = useState('')
  const [failed, setFailed] = useState(false)
  // Bumped by retry() to re-run the effect after the script failed to load.
  const [attempt, setAttempt] = useState(0)
  const widget = useRef<{ api: TurnstileApi; id: string } | null>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: `attempt` is only there to re-run the effect on retry().
  useEffect(() => {
    const el = container.current
    if (!enabled || !el) return
    let cancelled = false

    loadTurnstile()
      .then((api) => {
        if (cancelled) return
        const id = api.render(el, {
          sitekey: LOCAL_HOSTS.includes(window.location.hostname) ? DUMMY_SITE_KEY : SITE_KEY,
          action: 'contact',
          theme: 'dark',
          size: 'flexible',
          // Invisible unless Cloudflare wants a click.
          appearance: 'interaction-only',
          callback: (next: string) => {
            setFailed(false)
            setToken(next)
          },
          'expired-callback': () => setToken(''),
          'error-callback': () => {
            setToken('')
            setFailed(true)
          },
        })
        widget.current = { api, id }
      })
      .catch((err) => {
        console.error('Turnstile failed to load:', err)
        if (!cancelled) setFailed(true)
      })

    return () => {
      cancelled = true
      widget.current?.api.remove(widget.current.id)
      widget.current = null
      setToken('')
    }
  }, [container, enabled, attempt])

  // Tokens are single-use: reset after every send attempt to get a fresh one.
  const reset = useCallback(() => {
    setToken('')
    if (widget.current) widget.current.api.reset(widget.current.id)
  }, [])

  const retry = useCallback(() => {
    setFailed(false)
    setAttempt((n) => n + 1)
  }, [])

  return { token, failed, reset, retry }
}
