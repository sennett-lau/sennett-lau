import { type FormEvent, useState } from 'react'

import Section from '@/components/index/Section'
import { CONTACT_PITCH, EMAIL, SOCIALS } from '@/content/site'
import { discordHookMessageSend } from '@/utils/discord'

type Status = 'idle' | 'sending' | 'sent' | 'error'

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

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!name || !email || !message) return
    // Discord caps webhook content at 2000 chars; clamp on the client so the request
    // doesn't 400. Leaves room for the "name/email/..." prefix.
    const clampedMessage = message.slice(0, 1800)
    setStatus('sending')
    try {
      await discordHookMessageSend(
        `**New contact from website**\nName: ${name}\nEmail: ${email}\n\n${clampedMessage}`,
      )
      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      console.error('Contact form send failed:', err)
      setStatus('error')
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

        <form className="border border-line bg-panel/60" onSubmit={onSubmit}>
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
                maxLength={1800}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="term-btn term-btn-primary disabled:opacity-50"
              >
                {status === 'sending' ? '[ sending... ]' : '[ send -> ]'}
              </button>
              <output aria-live="polite" className="text-xs">
                {status === 'sent' && <span className="text-ok">[ ok ] message sent. thanks!</span>}
                {status === 'error' && (
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
