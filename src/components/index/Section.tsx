import { motion } from 'framer-motion'
import type { FC, ReactNode } from 'react'

// Shared section shell. Each page section wraps in <Section id="..." />.
// Opacity-only fade (no `y` transform) per DR-8: avoids interfering with
// useScroll's offsetTop measurements that drive the scroll-position color
// scheme logic in App.tsx.
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

type Props = {
  id: string
  className?: string
  children: ReactNode
}

const Section: FC<Props> = ({ id, className = '', children }) => {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
      className={`w-full min-h-screen flex items-center justify-center transition-colors duration-300 ${className}`}
    >
      {children}
    </motion.section>
  )
}

export default Section
