import { describe, expect, it } from 'vitest'

import { parseRich } from './rich'

describe('parseRich', () => {
  it('returns plain text as one segment', () => {
    expect(parseRich('hello world')).toEqual([{ kind: 'text', text: 'hello world' }])
  })

  it('returns no segments for an empty string', () => {
    expect(parseRich('')).toEqual([])
  })

  it('parses **strong** runs', () => {
    expect(parseRich('Expertise in **TypeScript**, **Terraform**.')).toEqual([
      { kind: 'text', text: 'Expertise in ' },
      { kind: 'strong', text: 'TypeScript' },
      { kind: 'text', text: ', ' },
      { kind: 'strong', text: 'Terraform' },
      { kind: 'text', text: '.' },
    ])
  })

  it('parses [label](url) links', () => {
    expect(parseRich('including [Stakeland](https://stakeland.com) and more')).toEqual([
      { kind: 'text', text: 'including ' },
      { kind: 'link', text: 'Stakeland', href: 'https://stakeland.com' },
      { kind: 'text', text: ' and more' },
    ])
  })

  it('leaves unmatched markers as literal text', () => {
    expect(parseRich('a ** b [c] (d)')).toEqual([{ kind: 'text', text: 'a ** b [c] (d)' }])
  })
})
