import { describe, expect, it } from 'vitest'

import { DEFAULT_RAMP, gridSize, scramble, toAscii } from './ascii'

// Builds an RGBA buffer from [r, g, b, a] tuples.
const pixels = (...px: Array<[number, number, number, number]>) => new Uint8ClampedArray(px.flat())

const gray = (v: number): [number, number, number, number] => [v, v, v, 255]

describe('gridSize', () => {
  it('keeps the image aspect ratio for the given cell shape', () => {
    // 0.5-wide cells: a square image needs half as many rows as columns.
    expect(gridSize(100, 100, 80, 0.5)).toEqual({ cols: 80, rows: 40 })
    // A 2:1 landscape image with square cells.
    expect(gridSize(200, 100, 60, 1)).toEqual({ cols: 60, rows: 30 })
  })

  it('floors columns and never returns an empty grid', () => {
    expect(gridSize(1000, 1, 10.9, 0.6)).toEqual({ cols: 10, rows: 1 })
    expect(gridSize(10, 10, 0, 0.6)).toEqual({ cols: 1, rows: 1 })
  })
})

describe('toAscii', () => {
  it('maps black to the sparsest glyph and white to the densest', () => {
    const out = toAscii(pixels(gray(0), gray(255)), 2, 1)
    expect(out).toBe(`${DEFAULT_RAMP[0]}${DEFAULT_RAMP[DEFAULT_RAMP.length - 1]}`)
  })

  it('joins rows with newlines', () => {
    const out = toAscii(pixels(gray(255), gray(255), gray(0), gray(0)), 2, 2)
    expect(out).toBe('@@\n  ')
  })

  it('invert maps dark pixels to dense glyphs', () => {
    const out = toAscii(pixels(gray(0), gray(255)), 2, 1, { invert: true })
    expect(out).toBe('@ ')
  })

  it('renders transparent pixels as blank, even when inverted', () => {
    const transparent: [number, number, number, number] = [0, 0, 0, 0]
    expect(toAscii(pixels(transparent, gray(255)), 2, 1)).toBe(' @')
    expect(toAscii(pixels(transparent, gray(0)), 2, 1, { invert: true })).toBe(' @')
  })

  it('normalize stretches a low-contrast image to the full ramp', () => {
    const dull = pixels(gray(100), gray(110), gray(120), gray(130))
    expect(toAscii(dull, 4, 1)).toMatch(/^[-=+]+$/)
    const stretched = toAscii(dull, 4, 1, { normalize: true })
    expect(stretched[0]).toBe(' ')
    expect(stretched[3]).toBe('@')
  })

  it('gamma below 1 makes faint detail denser', () => {
    // A light-gray stroke on white, inverted: faint without gamma, visible with it.
    const page = pixels(gray(255), gray(235), gray(255), gray(255))
    expect(toAscii(page, 4, 1, { invert: true })).toBe('    ')
    expect(toAscii(page, 4, 1, { invert: true, gamma: 0.5 })[1]).not.toBe(' ')
  })

  it('blackPoint blanks faint background and rescales the rest', () => {
    // Inverted: a pastel page (~0.14) and a dark stroke (~0.9).
    const page = pixels(gray(220), gray(25))
    expect(toAscii(page, 2, 1, { invert: true })[0]).not.toBe(' ')
    const cut = toAscii(page, 2, 1, { invert: true, blackPoint: 0.2 })
    expect(cut[0]).toBe(' ')
    expect(cut[1]).toBe('%')
  })

  it('uses a custom ramp', () => {
    expect(toAscii(pixels(gray(0), gray(255)), 2, 1, { ramp: '01' })).toBe('01')
  })

  it('weights channels by perceived luminance', () => {
    // Pure green reads much brighter than pure blue.
    const out = toAscii(pixels([0, 255, 0, 255], [0, 0, 255, 255]), 2, 1)
    expect(DEFAULT_RAMP.indexOf(out[0])).toBeGreaterThan(DEFAULT_RAMP.indexOf(out[1]))
  })

  it('throws when the buffer does not match the grid', () => {
    expect(() => toAscii(pixels(gray(0)), 2, 1)).toThrow(/expected 8/)
  })
})

describe('scramble', () => {
  const target = 'ab cd\nef  g'
  const rand = () => 0.5

  it('returns the target unchanged once progress reaches 1', () => {
    expect(scramble(target, 1, rand)).toBe(target)
    expect(scramble(target, 2, rand)).toBe(target)
  })

  it('keeps length, spaces and newlines on every frame', () => {
    for (const p of [0, 0.25, 0.5, 0.75]) {
      const frame = scramble(target, p, rand)
      expect(frame).toHaveLength(target.length)
      for (let i = 0; i < target.length; i++) {
        if (target[i] === ' ' || target[i] === '\n') expect(frame[i]).toBe(target[i])
      }
    }
  })

  it('never replaces a visible glyph with a blank', () => {
    const frame = scramble('xxxxxxxx', 0, Math.random)
    expect(frame).not.toMatch(/\s/)
  })

  it('settles glyphs monotonically as progress grows', () => {
    const long = 'abcdefghijklmnopqrstuvwxyz'.repeat(4)
    const noisy = () => 0 // always the first noise glyph, which no target glyph uses
    const settled = (p: number) => [...scramble(long, p, noisy)].map((ch, i) => ch === long[i])
    const early = settled(0.3)
    const late = settled(0.7)
    for (let i = 0; i < early.length; i++) {
      if (early[i]) expect(late[i]).toBe(true)
    }
    expect(late.filter(Boolean).length).toBeGreaterThan(early.filter(Boolean).length)
  })
})
