import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

import ScrambleText from '@/components/common/ScrambleText'

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

type Props = {
  id: string
  // Optional terminal-style heading: "01 / about", big title, "$ command".
  index?: string
  title?: string
  command?: string
  className?: string
  children: ReactNode
}

const Section = ({ id, index, title, command, className = '', children }: Props) => (
  <motion.section
    id={id}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    variants={fadeIn}
    className={`relative w-full px-4 py-20 md:px-8 md:py-28 ${className}`}
  >
    <div className="mx-auto w-full max-w-[1200px]">
      {title && (
        <header className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 text-xs text-dim">
            <span className="text-amber">{index}</span>
            <span>/</span>
            <span>{title}</span>
            <span className="h-px flex-1 bg-line" />
          </div>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight [font-stretch:112.5%] md:text-6xl">
            <ScrambleText text={title} />
            <span className="text-amber">.</span>
          </h2>
          {command && (
            <p className="mt-3 text-sm text-dim">
              <span className="text-amber">$</span> {command}
            </p>
          )}
        </header>
      )}
      {children}
    </div>
  </motion.section>
)

export default Section
