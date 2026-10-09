import type { AsciiOptions } from '@/lib/ascii'

export type Project = {
  slug: string
  name: string
  aka?: string
  years: string
  role: string
  tagline: string
  // What the project is about. Inline markup: **strong**, [label](url).
  // Tech belongs in `stack`, not here.
  body: string[]
  // Headline features, shown as a list under the body.
  features?: Array<{ name: string; text: string }>
  // Top-level tech only; leave out per-service detail (D1, KV, R2 ...).
  stack: string[]
  stat?: { value: string; label: string }
  // Major rebuilds, latest first, shown like `git tag`.
  releases?: Array<{ version: string; summary: string }>
  links: Array<{ label: string; href: string }>
  image: {
    src: string
    alt: string
    width: number
    height: number
    // Light screenshots need invert, plus a black point to drop pastel
    // backgrounds and a gamma below 1 to keep thin text.
    tone: Omit<AsciiOptions, 'ramp'>
  }
}

export const PROJECTS: Project[] = [
  {
    slug: 'typelite',
    name: 'Typelite',
    years: '2026',
    role: 'Creator',
    tagline: 'An open-source voice keyboard for macOS.',
    body: [
      'An **open-source alternative to Typeless**: speak in any app and clean text lands where you are typing, with fillers removed and self-corrections applied.',
      'Runs **on-device** with **whisper.cpp** and **llama.cpp**, and a **language-preset router** keeps language rules separate.',
    ],
    features: [
      { name: 'dictate', text: 'Speak, and clean text is pasted where you are typing.' },
      { name: 'translate', text: 'Speak, and it is written in another language.' },
      { name: 'ask anything', text: 'Ask a question, or ask about the text you have highlighted.' },
    ],
    stack: ['Tauri 2', 'Rust', 'React', 'TypeScript', 'whisper.cpp', 'llama.cpp'],
    stat: { value: 'MIT', label: 'no account, no telemetry, no history' },
    links: [
      { label: 'typelite.sennettlau.me', href: 'https://typelite.sennettlau.me/' },
      { label: 'source', href: 'https://github.com/sennett-lau/typelite' },
    ],
    image: {
      src: '/images/projects/typelite.webp',
      alt: 'Typelite website: the headline "Just say it." above the download buttons.',
      width: 1200,
      height: 750,
      tone: { invert: true, blackPoint: 0.14, gamma: 0.6 },
    },
  },
  {
    slug: 'cityuge',
    name: 'CityUGE',
    years: '2020 - now',
    role: 'Frontend, backend, infrastructure',
    tagline: 'A course commenting platform for CityU students.',
    body: [
      'CityU students **search GE courses**, look up course details and **leave comments** on the courses they took, so the next cohort can choose with real feedback.',
    ],
    stack: ['Vite', 'Cloudflare', 'Nx', 'Bun'],
    stat: { value: '300K+', label: 'visits per year' },
    releases: [
      { version: 'v3', summary: 'Serverless on Cloudflare' },
      { version: 'v2', summary: 'Nuxt.js (Vue), Fastify, MongoDB' },
      { version: 'v1', summary: 'PHP' },
    ],
    links: [{ label: 'cityuge.com', href: 'https://cityuge.com/' }],
    image: {
      src: '/images/projects/cityuge.webp',
      alt: 'CityU Course Guide home page: logo, title and search box.',
      width: 1200,
      height: 750,
      tone: { invert: true, blackPoint: 0.1, gamma: 0.6 },
    },
  },
  {
    slug: 'dklm',
    name: 'dklm.io',
    aka: '大眾負評',
    years: '2023 - now',
    role: 'Full-stack, infrastructure',
    tagline: '專為香港人而設嘅投訴平台 - a complaints platform made for Hong Kong.',
    body: [
      'A crowd-sourced **negative-review** platform that helps Hong Kong diners **avoid bad restaurants** and find genuinely good ones. People rate restaurants and food reviewers, attach photos and check in.',
    ],
    stack: ['Vite', 'Cloudflare', 'Drizzle', 'Nx', 'Bun'],
    stat: { value: '100K+', label: 'visits per year' },
    links: [{ label: 'dklm.io', href: 'https://dklm.io/' }],
    image: {
      src: '/images/projects/dklm.webp',
      alt: 'dklm.io home page: the 大眾負評 calligraphy logo above a search box.',
      width: 1200,
      height: 750,
      tone: { invert: true, blackPoint: 0.05, gamma: 0.7 },
    },
  },
]
