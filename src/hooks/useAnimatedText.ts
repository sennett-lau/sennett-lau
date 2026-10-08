import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

import { scramble } from '@/lib/ascii'

export type TextFrame = (text: string, progress: number) => string

export const scrambleFrame: TextFrame = (text, progress) => scramble(text, progress, Math.random)

// Animates `text` into the returned element's textContent once `active` turns
// true. Frames are written straight to the DOM inside requestAnimationFrame, so
// React does not re-render per frame. The element must have no React children.
// After the first full run (or under reduced motion) new text is set directly.
export const useAnimatedText = <T extends HTMLElement>(
  text: string,
  active: boolean,
  frame: TextFrame,
  duration = 1200,
) => {
  const ref = useRef<T>(null)
  const reduceMotion = useReducedMotion()
  const played = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduceMotion || played.current) {
      el.textContent = text
      return
    }
    if (!active) {
      el.textContent = frame(text, 0)
      return
    }

    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      // The first rAF timestamp can predate `start` on a busy main thread;
      // clamp so frames never see a negative progress.
      const progress = Math.max(0, (now - start) / duration)
      el.textContent = frame(text, Math.min(progress, 1))
      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        played.current = true
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, active, frame, duration, reduceMotion])

  return ref
}
