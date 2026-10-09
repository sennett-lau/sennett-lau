import { type FormEvent, useRef, useState } from 'react'

import Section from '@/components/index/Section'
import { CONTACT_PITCH, EMAIL, SOCIALS } from '@/content/site'
import { useTurnstile } from '@/hooks/useTurnstile'
import { CONTACT_LIMITS, parseContact } from '@/lib/contact'

type Status = 'idle' | 'invalid' | 'sending' | 'sent' | 'error'

const fieldClass =
  'w-full border-0 border-b border-line bg-transparent px-0 py-2 text-ink placeholder:text-dim/60 focus:border-amber focus:outline-none focus:ring-0'

const Prompt = ({ htmlFor, label }: { htmlFor: string; label: string }) => (
  <label htmlFor={htmlFor} className="text-xs text-dim">
    <span className="text-amber">&gt;</span> {label}
  </label>
)

const IndexContact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  // The bot check loads on first focus inside the form, not on page load.
  const [armed, setArmed] = useState(false)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const turnstile = useTurnstile(turnstileRef, armed)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!turnstile.token) return
    // Same rules as the Worker, so a bad field doesn't spend the token.
    const contact = parseContact({ name, email, message, token: turnstile.token })
    if (!contact) {
      setStatus('invalid')
      return
    }
    setStatus('sending')
    try {
      // worker/index.ts verifies the token and forwards to Discord.
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
      })
      if (!res.ok) throw new Error(`Contact API failed: ${res.status}`)
      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      console.error('Contact form send failed:', err)
      setStatus('error')
    } finally {
      turnstile.reset()
    }
  }

  return (
    <Section id="contact" index="05" title="contact" command="./contact.sh --interactive">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="font-display text-[1.75rem] font-semibold leading-[1.3] tracking-tight md:text-4xl md:leading-[1.25]">
            {CONTACT_PITCH.map((line, i) => (
              <span
                key={line}
                className={`block ${i === CONTACT_PITCH.length - 1 ? 'text-amber' : ''}`}
              >
                {line}
              </span>
            ))}
          </p>

          <dl className="mt-10 space-y-6 text-sm">
            <div>
              <dt className="text-xs text-dim">contact detail</dt>
              <dd className="mt-1">
                <a href={`mailto:${EMAIL}`} className="text-lg hover:text-amber md:text-xl">
                  {EMAIL}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-dim">other digital spaces</dt>
              {SOCIALS.map((social) => (
                <dd key={social.href} className="mt-1">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-amber"
                  >
                    <span className="text-dim">{social.label}/</span>
                    {social.handle}
                  </a>
                </dd>
              ))}
            </div>
          </dl>
        </div>

        <form
          className="border border-line bg-panel/60"
          onSubmit={onSubmit}
          onFocus={() => {
            setArmed(true)
            if (turnstile.failed) turnstile.retry()
          }}
        >
          <div className="flex items-center gap-2 border-b border-line px-4 py-2 text-xs text-dim">
            <span className="h-2 w-2 rounded-full bg-err/80" />
            <span className="h-2 w-2 rounded-full bg-amber/80" />
            <span className="h-2 w-2 rounded-full bg-ok/80" />
            <span className="ml-2">contact.sh</span>
          </div>
          <div className="space-y-6 p-4 md:p-6">
            <div>
              <Prompt htmlFor="contact-name" label="name" />
              <input
                id="contact-name"
                className={fieldClass}
                type="text"
                autoComplete="name"
                placeholder="Ada Lovelace"
                required
                maxLength={CONTACT_LIMITS.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Prompt htmlFor="contact-email" label="email" />
              <input
                id="contact-email"
                className={fieldClass}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                maxLength={CONTACT_LIMITS.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Prompt htmlFor="contact-message" label="message" />
              <textarea
                id="contact-message"
                className={`${fieldClass} min-h-[9rem] resize-y`}
                placeholder="Tell me about the idea..."
                required
                maxLength={CONTACT_LIMITS.message}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            {/* Turnstile renders here; empty unless Cloudflare asks for a click. */}
            <div ref={turnstileRef} />
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === 'sending' || !turnstile.token}
                className="term-btn term-btn-primary disabled:opacity-50"
              >
                {status === 'sending'
                  ? '[ sending... ]'
                  : armed && !turnstile.token && !turnstile.failed
                    ? '[ verifying... ]'
                    : '[ send -> ]'}
              </button>
              <output aria-live="polite" className="text-xs">
                {status === 'sent' && <span className="text-ok">[ ok ] message sent. thanks!</span>}
                {status === 'invalid' && (
                  <span className="text-err">[ err ] fill in a name, an email and a message.</span>
                )}
                {(status === 'error' || turnstile.failed) && (
                  <span className="text-err">
                    [ err ] send failed. try again, or email {EMAIL}.
                  </span>
                )}
              </output>
            </div>
          </div>
        </form>
      </div>
    </Section>
  )
}

export default IndexContact
