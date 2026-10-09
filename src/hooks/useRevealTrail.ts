import { useReducedMotion } from 'framer-motion'
import { type RefObject, useCallback, useEffect, useRef } from 'react'

import { type Point, fadeFactor, strokePoints, thresholdMask } from '@/lib/reveal'

// Mask resolution: one mask pixel per CELL CSS pixels. Low-res keeps the
// per-frame threshold pass cheap; upscaling it smooths the edges.
const CELL = 3
export const FADE_MS = 1400
export const FLOOD_MS = 700
// Soft rim on the flood/drain circle (mask px), so the noise can wobble its edge.
const FEATHER = 8
const BASE_RADIUS = 34
const MAX_RADIUS = 92
// Below this alpha (out of 255) nothing survives the threshold, so the loop can stop.
const VISIBLE_ALPHA = 60

type Options = {
  canvas: RefObject<HTMLCanvasElement>
  image: HTMLImageElement | null
  width: number
  height: number
  revealed: boolean
}

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

// Liquid reveal trail for AsciiImage (after landonorris.com): mouse movement
// paints soft blobs into a small mask that fades over FADE_MS; a noisy
// threshold gives the blobs wobbly edges; the display canvas draws the photo
// only where the mask is. `revealed` floods the mask from the last pointer
// position. The rAF loop runs only while something is visible.
export const useRevealTrail = ({ canvas, image, width, height, revealed }: Options) => {
  const reduceMotion = useReducedMotion()
  const s = useRef({
    image,
    width,
    height,
    revealed,
    reduceMotion,
    mask: null as HTMLCanvasElement | null,
    edge: null as HTMLCanvasElement | null,
    queue: [] as Array<Point & { r: number }>,
    last: null as Point | null,
    origin: null as Point | null,
    floodStart: 0,
    draining: false,
    drainStart: 0,
    prev: 0,
    raf: 0,
  })
  Object.assign(s.current, { image, width, height, reduceMotion })

  const frame = useCallback(
    (now: number) => {
      const st = s.current
      const el = canvas.current
      const { mask, edge, image: img } = st
      const m = mask?.getContext('2d', { willReadFrequently: true })
      const e = edge?.getContext('2d')
      const d = el?.getContext('2d')
      if (!el || !mask || !edge || !img || !m || !e || !d) {
        st.raf = 0
        return
      }
      const dt = st.prev ? Math.min(now - st.prev, 64) : 16
      st.prev = now
      const k = 1 / CELL

      // rAF timestamps can predate the start times (set from performance.now()); clamp.
      const progress = (start: number) =>
        st.reduceMotion ? 1 : Math.min(1, Math.max(0, (now - start) / FLOOD_MS))
      const o = st.origin ?? { x: st.width / 2, y: st.height / 2 }
      const diagonal = Math.hypot(st.width, st.height) * k + FEATHER
      const circle = (r: number) => {
        const outer = Math.max(0.001, r)
        const g = m.createRadialGradient(
          o.x * k,
          o.y * k,
          Math.max(0, outer - FEATHER),
          o.x * k,
          o.y * k,
          outer,
        )
        g.addColorStop(0, '#fff')
        g.addColorStop(1, 'rgba(255, 255, 255, 0)')
        m.fillStyle = g
        m.beginPath()
        m.arc(o.x * k, o.y * k, outer, 0, Math.PI * 2)
        m.fill()
      }

      if (st.draining) {
        // Closing: keep only a circle shrinking back to the pointer, so the colour
        // drains away the way it flooded in.
        const t = progress(st.drainStart)
        m.globalCompositeOperation = 'destination-in'
        circle((1 - easeOutCubic(t)) * diagonal)
        m.globalCompositeOperation = 'source-over'
        if (t >= 1) st.draining = false
      } else if (!st.revealed) {
        m.globalCompositeOperation = 'destination-out'
        m.fillStyle = `rgba(0, 0, 0, ${fadeFactor(dt, FADE_MS)})`
        m.fillRect(0, 0, mask.width, mask.height)
        m.globalCompositeOperation = 'source-over'
      }
      for (const p of st.queue) {
        const g = m.createRadialGradient(p.x * k, p.y * k, 0, p.x * k, p.y * k, p.r * k)
        g.addColorStop(0, 'rgba(255, 255, 255, 0.85)')
        g.addColorStop(1, 'rgba(255, 255, 255, 0)')
        m.fillStyle = g
        m.beginPath()
        m.arc(p.x * k, p.y * k, p.r * k, 0, Math.PI * 2)
        m.fill()
      }
      st.queue.length = 0
      if (st.revealed) circle(easeOutCubic(progress(st.floodStart)) * diagonal)

      const src = m.getImageData(0, 0, mask.width, mask.height)
      let visible = st.revealed || st.draining
      for (let i = 3; i < src.data.length && !visible; i += 4) visible = src.data[i] > VISIBLE_ALPHA

      d.clearRect(0, 0, el.width, el.height)
      if (!visible) {
        // 8-bit alpha never fades to exactly 0, so wipe the residue and park.
        m.clearRect(0, 0, mask.width, mask.height)
        st.raf = 0
        st.prev = 0
        return
      }
      const edged = thresholdMask(src.data, mask.width, mask.height, st.reduceMotion ? 0 : now)
      const edgeData = e.createImageData(mask.width, mask.height)
      edgeData.data.set(edged)
      e.putImageData(edgeData, 0, 0)
      d.globalCompositeOperation = 'source-over'
      d.drawImage(img, 0, 0, el.width, el.height)
      d.globalCompositeOperation = 'destination-in'
      d.imageSmoothingEnabled = true
      d.drawImage(edge, 0, 0, el.width, el.height)
      d.globalCompositeOperation = 'source-over'
      st.raf = requestAnimationFrame(frame)
    },
    [canvas],
  )

  const kick = useCallback(() => {
    const st = s.current
    if (!st.raf) {
      st.prev = 0
      st.raf = requestAnimationFrame(frame)
    }
  }, [frame])

  // Size the display canvas (device pixels) and the low-res masks.
  useEffect(() => {
    const el = canvas.current
    if (!el || width < 1 || height < 1) return
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    el.width = Math.round(width * dpr)
    el.height = Math.round(height * dpr)
    const make = () => {
      const c = document.createElement('canvas')
      c.width = Math.ceil(width / CELL)
      c.height = Math.ceil(height / CELL)
      return c
    }
    s.current.mask = make()
    s.current.edge = make()
    if (s.current.revealed) kick()
  }, [canvas, width, height, kick])

  useEffect(() => {
    const st = s.current
    if (revealed) {
      st.floodStart = performance.now()
      st.draining = false
    } else if (st.revealed) {
      st.drainStart = performance.now()
      st.draining = true
    }
    st.revealed = revealed
    kick()
  }, [revealed, kick])

  // Reset the id too: StrictMode runs this cleanup then remounts, and a stale
  // non-zero id would make kick() think a loop is already running.
  useEffect(
    () => () => {
      cancelAnimationFrame(s.current.raf)
      s.current.raf = 0
    },
    [],
  )

  // Mouse moved to (x, y) in frame CSS pixels: paint the trail up to here.
  const move = useCallback(
    (x: number, y: number) => {
      const st = s.current
      const to = { x, y }
      const dist = st.last ? Math.hypot(x - st.last.x, y - st.last.y) : 0
      const r = Math.min(MAX_RADIUS, BASE_RADIUS + dist * 0.6)
      for (const p of strokePoints(st.last, to, r / 3)) st.queue.push({ ...p, r })
      st.last = to
      st.origin = to
      kick()
    },
    [kick],
  )

  // Where a click/tap/keyboard reveal should flood from, without painting.
  const aim = useCallback((x: number, y: number) => {
    s.current.origin = { x, y }
  }, [])

  // Pointer left the frame: the next entry starts a new stroke.
  const leave = useCallback(() => {
    s.current.last = null
  }, [])

  return { move, aim, leave }
}
