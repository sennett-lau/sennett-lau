// DOM-free ASCII art primitives. Same approach as Python's `ascii_magic`:
// downsample the image to one pixel per character cell, take each pixel's
// luminance, and pick a glyph from a sparse-to-dense ramp. On a dark page a
// dense glyph reads as bright, so bright pixels map to dense glyphs.
// See docs/plans/archive/2026-10-07_ascii-redesign/decision.md DR-1.

export const DEFAULT_RAMP = ' .:-=+*#%@'

export type Grid = { cols: number; rows: number }

export type AsciiOptions = {
  ramp?: string
  // Map dark pixels to dense glyphs. Use for light screenshots on the dark page.
  invert?: boolean
  // Stretch luminance between the 2nd and 98th percentile of opaque pixels.
  normalize?: boolean
  // Levels cut: values below it become blank, the rest rescale to [0, 1].
  // Clears faint backgrounds (pastel gradients, watermarks).
  blackPoint?: number
  // Applied last: value ** gamma. Below 1 densifies faint detail (thin text on
  // a white page); above 1 thins it out.
  gamma?: number
}

// `cellAspect` is glyph advance width divided by line height.
export const gridSize = (
  imageWidth: number,
  imageHeight: number,
  cols: number,
  cellAspect: number,
): Grid => {
  const c = Math.max(1, Math.floor(cols))
  const rows = Math.max(1, Math.round((c * imageHeight * cellAspect) / imageWidth))
  return { cols: c, rows }
}

const luminance = (r: number, g: number, b: number) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255

const percentile = (sorted: Float32Array, p: number) =>
  sorted[Math.round(p * (sorted.length - 1))] ?? 0

// `data` is RGBA, row-major, exactly cols * rows * 4 bytes (ImageData.data).
export const toAscii = (
  data: Uint8ClampedArray,
  cols: number,
  rows: number,
  {
    ramp = DEFAULT_RAMP,
    invert = false,
    normalize = false,
    blackPoint = 0,
    gamma = 1,
  }: AsciiOptions = {},
): string => {
  const cells = cols * rows
  if (data.length !== cells * 4) {
    throw new Error(`toAscii: expected ${cells * 4} bytes for ${cols}x${rows}, got ${data.length}`)
  }

  const value = new Float32Array(cells)
  const alpha = new Float32Array(cells)
  for (let i = 0; i < cells; i++) {
    const l = luminance(data[i * 4], data[i * 4 + 1], data[i * 4 + 2])
    value[i] = invert ? 1 - l : l
    alpha[i] = data[i * 4 + 3] / 255
  }

  if (normalize) {
    const opaque = value.filter((_, i) => alpha[i] > 0).sort()
    const lo = percentile(opaque, 0.02)
    const hi = percentile(opaque, 0.98)
    if (hi - lo > 1e-3) {
      for (let i = 0; i < cells; i++) {
        value[i] = Math.min(1, Math.max(0, (value[i] - lo) / (hi - lo)))
      }
    }
  }

  if (blackPoint > 0) {
    for (let i = 0; i < cells; i++) {
      value[i] = Math.max(0, (value[i] - blackPoint) / (1 - blackPoint))
    }
  }

  if (gamma !== 1) {
    for (let i = 0; i < cells; i++) value[i] = value[i] ** gamma
  }

  const last = ramp.length - 1
  const lines: string[] = []
  for (let y = 0; y < rows; y++) {
    let line = ''
    for (let x = 0; x < cols; x++) {
      const i = y * cols + x
      line += ramp[Math.min(last, Math.floor(value[i] * alpha[i] * ramp.length))]
    }
    lines.push(line)
  }
  return lines.join('\n')
}

// Stable pseudo-random value in [0, 1) for glyph `i`, so every frame agrees on
// when that glyph settles.
const settleAt = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

// One frame of the decode animation. A glyph shows its final character once
// `progress` passes its settle time, and a random noise glyph before that.
// Spaces and newlines never change, so the silhouette reads from frame one.
export const scramble = (
  target: string,
  progress: number,
  rand: () => number,
  noise: string = DEFAULT_RAMP.slice(1),
): string => {
  if (progress >= 1) return target
  let out = ''
  for (let i = 0; i < target.length; i++) {
    const ch = target[i]
    if (ch === ' ' || ch === '\n' || settleAt(i) < progress) {
      out += ch
    } else {
      out += noise[Math.floor(rand() * noise.length) % noise.length]
    }
  }
  return out
}
