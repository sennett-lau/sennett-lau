import { useInView } from 'framer-motion'
import { useRef } from 'react'

import { scrambleFrame, useAnimatedText } from '@/hooks/useAnimatedText'

type Props = {
  text: string
  className?: string
  duration?: number
}

// Text that decodes from glyph noise the first time it scrolls into view.
// Screen readers get the plain text; the animated copy is aria-hidden.
const ScrambleText = ({ text, className = '', duration = 900 }: Props) => {
  const wrap = useRef<HTMLSpanElement>(null)
  const inView = useInView(wrap, { once: true, amount: 0.6 })
  const ref = useAnimatedText<HTMLSpanElement>(text, inView, scrambleFrame, duration)

  return (
    <span ref={wrap} className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true" />
    </span>
  )
}

export default ScrambleText
