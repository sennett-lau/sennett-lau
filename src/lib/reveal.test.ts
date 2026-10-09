import { describe, expect, it } from 'vitest'

import { fadeFactor, strokePoints, thresholdMask, valueNoise } from './reveal'

// One RGBA pixel per alpha value; colour channels are ignored by the mask.
const mask = (...alphas: number[]) =>
  new Uint8ClampedArray(alphas.flatMap((a) => [255, 255, 255, a]))
const alphas = (data: Uint8ClampedArray) => data.filter((_, i) => i % 4 === 3)

describe('valueNoise', () => {
  it('is deterministic and stays in [0, 1)', () => {
    for (let i = 0; i < 200; i++) {
      const v = valueNoise(i * 0.37, i * 0.91)
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThan(1)
      expect(valueNoise(i * 0.37, i * 0.91)).toBe(v)
    }
  })

  it('is continuous: nearby points give nearby values', () => {
    expect(Math.abs(valueNoise(3.2, 7.1) - valueNoise(3.201, 7.1))).toBeLessThan(0.01)
  })
})

describe('thresholdMask', () => {
  it('keeps empty pixels empty and full pixels full at any time', () => {
    const src = mask(0, 255, 0, 255)
    for (const time of [0, 1234, 98765]) {
      const out = alphas(thresholdMask(src, 2, 2, time))
      expect([...out]).toEqual([0, 255, 0, 255])
    }
  })

  it('turns a soft gradient into a hard-ish edge', () => {
    const src = mask(20, 60, 120, 200, 240)
    const out = [...alphas(thresholdMask(src, 5, 1, 0, { amplitude: 0 }))]
    expect(out[0]).toBe(0)
    expect(out[4]).toBe(255)
    // Monotonic across the ramp when noise is off.
    for (let i = 1; i < out.length; i++) expect(out[i]).toBeGreaterThanOrEqual(out[i - 1])
  })

  it('writes white RGB so it can be used as a destination-in mask', () => {
    const out = thresholdMask(mask(255), 1, 1, 0)
    expect([...out]).toEqual([255, 255, 255, 255])
  })
})

describe('fadeFactor', () => {
  it('is 0 for no time and approaches 1 for long gaps', () => {
    expect(fadeFactor(0, 900)).toBe(0)
    expect(fadeFactor(10_000, 900)).toBeGreaterThan(0.99)
  })

  it('composes across frames: two 8 ms steps equal one 16 ms step', () => {
    const keep = (f: number) => 1 - f
    expect(keep(fadeFactor(8, 900)) * keep(fadeFactor(8, 900))).toBeCloseTo(
      keep(fadeFactor(16, 900)),
      10,
    )
  })
})

describe('strokePoints', () => {
  it('fills a segment with evenly spaced points, ending on the target', () => {
    const pts = strokePoints({ x: 0, y: 0 }, { x: 10, y: 0 }, 2.5)
    expect(pts.map((p) => p.x)).toEqual([2.5, 5, 7.5, 10])
    expect(pts.every((p) => p.y === 0)).toBe(true)
  })

  it('returns just the target for a first point or a tiny move', () => {
    expect(strokePoints(null, { x: 4, y: 5 }, 3)).toEqual([{ x: 4, y: 5 }])
    expect(strokePoints({ x: 4, y: 5 }, { x: 4.5, y: 5 }, 3)).toEqual([{ x: 4.5, y: 5 }])
  })
})
