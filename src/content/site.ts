export const OWNER = 'Sennett Lau'
export const EMAIL = 'laub1199@gmail.com'

export const SOCIALS = [
  { label: 'linkedin', handle: 'sennett-lau', href: 'https://www.linkedin.com/in/sennett-lau' },
  { label: 'github', handle: 'sennett-lau', href: 'https://github.com/sennett-lau' },
] as const

// Order drives the header tabs and the active-section tracker.
export const SECTIONS = [
  { id: 'about', label: 'about' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'certs', label: 'certs' },
  { id: 'contact', label: 'contact' },
] as const

export const CONTACT_PITCH = ['Any project idea?', 'Do not hesitate to contact me!']
