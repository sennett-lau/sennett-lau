// Contact-form payload shared by the form and the Worker (worker/index.ts).
// Pure and dependency-free: the Worker imports it by relative path.

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  // Discord embed descriptions cap at 4096; 2000 keeps messages readable.
  message: 2000,
  // Turnstile tokens are at most 2048 characters.
  token: 2048,
} as const

export type Contact = {
  name: string
  email: string
  message: string
  token: string
}

// As loose as a browser's type="email" check, so the form and the Worker agree.
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+$/

const text = (value: unknown, max: number): string | null => {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed.length > 0 && trimmed.length <= max ? trimmed : null
}

// Returns the cleaned payload, or null if any field is missing, empty or too long.
export const parseContact = (body: unknown): Contact | null => {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) return null
  const fields = body as Record<string, unknown>

  const name = text(fields.name, CONTACT_LIMITS.name)
  const email = text(fields.email, CONTACT_LIMITS.email)
  const message = text(fields.message, CONTACT_LIMITS.message)
  const token = text(fields.token, CONTACT_LIMITS.token)
  if (!name || !email || !message || !token || !EMAIL_SHAPE.test(email)) return null

  return { name, email, message, token }
}
