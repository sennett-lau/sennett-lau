import { type FormEvent, useState } from 'react'

import Section from '@/components/index/Section'
import { discordHookMessageSend } from '@/utils/discord'

// Contact section with working Discord-webhook form.
// TODO(visual-port): port full design from archive/src/component/index/IndexContact/*.
type Status = 'idle' | 'sending' | 'sent' | 'error'

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
    <Section id="contact">
      <div className="max-w-3xl px-4 w-full">
        <h2 className="text-5xl lg:text-7xl font-bold mb-8">Contact</h2>
        <form className="space-y-4" onSubmit={onSubmit}>
          <input
            className="w-full p-3 rounded bg-transparent border"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full p-3 rounded bg-transparent border"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            className="w-full p-3 rounded bg-transparent border min-h-[10rem]"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="px-6 py-3 border rounded hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {status === 'sending' ? 'Sending…' : 'Send'}
          </button>
          {status === 'sent' && <p className="text-sm">Thanks — message sent.</p>}
          {status === 'error' && (
            <p className="text-sm">Send failed. Try again or reach out via socials.</p>
          )}
        </form>
      </div>
    </Section>
  )
}

export default IndexContact
