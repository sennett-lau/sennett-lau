import { describe, expect, it } from 'vitest'

import { CONTACT_LIMITS, parseContact } from './contact'

const valid = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  message: 'Hello there',
  token: 'XXXX.DUMMY.TOKEN.XXXX',
}

describe('parseContact', () => {
  it('accepts a valid body and trims the text fields', () => {
    expect(parseContact({ ...valid, name: '  Ada  ', message: '\n Hi \n' })).toEqual({
      ...valid,
      name: 'Ada',
      message: 'Hi',
    })
  })

  it('rejects non-objects', () => {
    expect(parseContact(null)).toBeNull()
    expect(parseContact('hi')).toBeNull()
    expect(parseContact([valid])).toBeNull()
  })

  it.each(['name', 'email', 'message', 'token'] as const)('rejects a missing %s', (field) => {
    const { [field]: _omitted, ...rest } = valid
    expect(parseContact(rest)).toBeNull()
  })

  it.each(['name', 'email', 'message', 'token'] as const)('rejects a non-string %s', (field) => {
    expect(parseContact({ ...valid, [field]: 42 })).toBeNull()
  })

  it('rejects whitespace-only fields', () => {
    expect(parseContact({ ...valid, name: '   ' })).toBeNull()
    expect(parseContact({ ...valid, message: ' \n ' })).toBeNull()
  })

  it('rejects fields over their limit', () => {
    expect(parseContact({ ...valid, name: 'a'.repeat(CONTACT_LIMITS.name + 1) })).toBeNull()
    expect(parseContact({ ...valid, message: 'a'.repeat(CONTACT_LIMITS.message + 1) })).toBeNull()
    expect(parseContact({ ...valid, token: 'a'.repeat(CONTACT_LIMITS.token + 1) })).toBeNull()
    const longEmail = `${'a'.repeat(CONTACT_LIMITS.email)}@example.com`
    expect(parseContact({ ...valid, email: longEmail })).toBeNull()
  })

  it('accepts fields at their limit', () => {
    const atLimit = {
      ...valid,
      name: 'a'.repeat(CONTACT_LIMITS.name),
      message: 'a'.repeat(CONTACT_LIMITS.message),
    }
    expect(parseContact(atLimit)).toEqual(atLimit)
  })

  it('accepts what a browser type="email" field accepts', () => {
    expect(parseContact({ ...valid, email: 'ada@example' })).toEqual({
      ...valid,
      email: 'ada@example',
    })
  })

  it.each(['ada', 'ada@', '@example.com', 'a da@example.com', 'ada@@example.com'])(
    'rejects the malformed email %s',
    (email) => {
      expect(parseContact({ ...valid, email })).toBeNull()
    },
  )
})
