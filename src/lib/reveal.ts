// DOM-free maths for AsciiImage's liquid reveal trail (after landonorris.com's
// hero, which reveals a second image through a cursor-stirred fluid). We fake
// the fluid on a small canvas: the pointer stamps soft blobs, the mask fades
// over time, and each frame a noisy threshold turns the soft blobs into wobbly,
// organic edges that shrink as they fade.

export type Point = { x: number; y: number }

export type ThresholdOptions = {
  // Alpha band that maps to the edge; below `lo` is clear, above `hi` is solid.
  // Narrow on purpose: where the mask fades evenly, the noise changes slowly,
  // so a wide band smears into grey haze. Upscaling the low-res mask adds the
  // rest of the anti-aliasing.
  lo?: number
  hi?: number
  // How far the noise pushes alpha around the band (0 = smooth edges).
  amplitude?: number
  // Noise frequency in mask pixels, and its drift per millisecond.
  scale?: number
  speed?: number
}

const fract = (v: number) => v - Math.floor(v)
const hash = (i: number, j: number) => fract(Math.sin(i * 127.1 + j * 311.7) * 43758.5453)
const ease = (t: number) => t * t * (3 - 2 * t)

// Smooth 2D value noise in [0, 1).
export const valueNoise = (x: number, y: number): number => {
  const i = Math.floor(x)
  const j = Math.floor(y)
  const u = ease(x - i)
  const v = ease(y - j)
  const top = hash(i, j) + (hash(i + 1, j) - hash(i, j)) * u
  const bottom = hash(i, j + 1) + (hash(i + 1, j + 1) - hash(i, j + 1)) * u
  return top + (bottom - top) * v
}

const smoothstep = (lo: number, hi: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - lo) / (hi - lo)))
  return t * t * (3 - 2 * t)
}

// RGBA in, RGBA out (white, thresholded alpha). Fully clear and fully solid
// pixels survive any noise, so an idle mask stays empty and a flooded one full.
export const thresholdMask = (
  src: Uint8ClampedArray,
  width: number,
  height: number,
  time: number,
  { lo = 0.47, hi = 0.53, amplitude = 0.3, scale = 0.09, speed = 0.00025 }: ThresholdOptions = {},
): Uint8ClampedArray => {
  const out = new Uint8ClampedArray(src.length)
  const drift = time * speed
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = (y * width + x) * 4
      const a = src[p + 3] / 255
      const n = amplitude ? valueNoise(x * scale + drift, y * scale - drift * 0.7) - 0.5 : 0
      out[p] = 255
      out[p + 1] = 255
      out[p + 2] = 255
      out[p + 3] = Math.round(smoothstep(lo, hi, a + n * amplitude) * 255)
    }
  }
  return out
}

// Fraction of the mask to erase after `dtMs`, for an exponential fade with time
// constant `tauMs`. Frame-rate independent.
export const fadeFactor = (dtMs: number, tauMs: number) => 1 - Math.exp(-dtMs / tauMs)

// Points along from → to every `spacing`, ending on `to`, so fast pointer moves
// leave a continuous trail instead of separate dots.
export const strokePoints = (from: Point | null, to: Point, spacing: number): Point[] => {
  if (!from) return [to]
  const dx = to.x - from.x
  const dy = to.y - from.y
  const dist = Math.hypot(dx, dy)
  const steps = Math.floor(dist / spacing)
  if (steps < 1) return [to]
  const points: Point[] = []
  for (let k = 1; k <= steps; k++) {
    const t = (k * spacing) / dist
    points.push({ x: from.x + dx * t, y: from.y + dy * t })
  }
  if (steps * spacing < dist - 1e-9) points.push(to)
  return points
}
