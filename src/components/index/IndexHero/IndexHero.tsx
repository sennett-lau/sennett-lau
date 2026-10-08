import { motion, useReducedMotion } from 'framer-motion'

import AsciiImage from '@/components/ascii/AsciiImage'
import {
  BOOT_LOG,
  FIGLET_COLS,
  FIGLET_FIRST,
  FIGLET_LAST,
  FOCUS,
  LOCATION,
  ROLE,
} from '@/content/hero'
import { OWNER } from '@/content/site'
import { scrambleFrame, useAnimatedText } from '@/hooks/useAnimatedText'

// Fit the figlet art to its column: one glyph is 0.6em wide in IBM Plex Mono.
const figletFontSize = `min(13px, calc(100cqw / ${(FIGLET_COLS * 0.6).toFixed(1)}))`

const PORTRAIT_TONE = { normalize: true }

const line = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({ opacity: 1, x: 0, transition: { delay: 0.9 + i * 0.18 } }),
}

// Must sit inside a `container-type: inline-size` parent for the cqw font size.
const Figlet = ({ art, duration }: { art: string; duration: number }) => {
  const ref = useAnimatedText<HTMLPreElement>(art, true, scrambleFrame, duration)
  return (
    <pre
      ref={ref}
      aria-hidden="true"
      className="ascii text-amber"
      style={{ fontSize: figletFontSize }}
    />
  )
}

const IndexHero = () => {
  const reduceMotion = useReducedMotion()
  const initial = reduceMotion ? 'visible' : 'hidden'

  return (
    <section
      id="hero"
      className="relative flex min-h-svh w-full flex-col justify-center px-4 pb-16 pt-24 md:px-8 md:pt-28"
    >
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="min-w-0">
          <p className="text-sm text-dim">
            <span className="text-amber">$</span> whoami
          </p>
          <h1 className="sr-only">
            {OWNER}, {ROLE} in {LOCATION}
          </h1>
          <div className="mt-6 space-y-3 [container-type:inline-size]">
            <Figlet art={FIGLET_FIRST} duration={1100} />
            <Figlet art={FIGLET_LAST} duration={1300} />
          </div>

          <motion.div initial={initial} animate="visible" className="mt-10 space-y-1">
            <motion.p custom={0} variants={line} className="text-lg md:text-xl">
              {ROLE} <span className="text-dim">/</span> {LOCATION}
            </motion.p>
            <motion.p custom={1} variants={line} className="text-sm text-dim">
              {FOCUS.join(' · ')}
            </motion.p>
          </motion.div>

          <motion.ul
            initial={initial}
            animate="visible"
            className="mt-8 space-y-1 text-xs text-dim md:text-[13px]"
            aria-label="Boot log"
          >
            {BOOT_LOG.map((entry, i) => (
              <motion.li key={entry.target} custom={i + 2} variants={line} className="flex gap-2">
                <span className="text-ok">[ ok ]</span>
                <span className="w-12 shrink-0 text-ink/80">{entry.verb}</span>
                <span className="hidden min-w-0 flex-1 truncate sm:block">
                  {entry.target} <span className="text-line">{'.'.repeat(40)}</span>
                </span>
                <span className="ml-auto shrink-0 text-ink sm:ml-0">{entry.result}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={initial}
            animate="visible"
            custom={BOOT_LOG.length + 2}
            variants={line}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a href="#contact" className="term-btn term-btn-primary">
              [ let&apos;s talk ]
            </a>
            <a href="#projects" className="term-btn">
              [ ./projects ]
            </a>
          </motion.div>
        </div>

        <AsciiImage
          src="/images/portrait.webp"
          alt={`Black-and-white photo of ${OWNER} walking down stone steps.`}
          width={960}
          height={1200}
          fontSize={6}
          tone={PORTRAIT_TONE}
          className="mx-auto w-full max-w-[460px]"
        />
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-xs text-dim hover:text-amber md:block"
      >
        scroll <span className="inline-block motion-safe:animate-bounce">↓</span>
      </a>
    </section>
  )
}

export default IndexHero
