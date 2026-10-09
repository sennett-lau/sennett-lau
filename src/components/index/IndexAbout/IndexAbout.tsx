import { motion } from 'framer-motion'
import { Fragment } from 'react'

import RichText from '@/components/common/RichText'
import Section from '@/components/index/Section'
import { ABOUT, STACK } from '@/content/about'

const reveal = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
}

const IndexAbout = () => (
  <Section id="about" index="01" title="about" command="cat about.md">
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-3xl space-y-5 text-base leading-relaxed text-ink/65 md:text-lg"
      >
        {ABOUT.map((paragraph, i) => (
          <motion.p key={paragraph} custom={i} variants={reveal}>
            <RichText text={paragraph} />
          </motion.p>
        ))}
      </motion.div>

      <aside className="h-fit border border-line bg-panel/60 lg:sticky lg:top-20">
        <div className="flex items-center justify-between border-b border-line px-4 py-2 text-xs text-dim">
          <span>stack.log</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-ok motion-safe:animate-pulse" />
            live
          </span>
        </div>
        <dl className="space-y-3 px-4 py-4 text-sm">
          {STACK.map((group) => (
            <div key={group.key} className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-x-2">
              <dt className="text-amber">{group.key}</dt>
              {/* Each item keeps its trailing separator, so a wrap never starts a line with "·". */}
              <dd className="leading-relaxed">
                {group.items.map((item, i) => (
                  <Fragment key={item}>
                    <span className="whitespace-nowrap">
                      {item}
                      {i < group.items.length - 1 && <span className="text-dim"> ·</span>}
                    </span>{' '}
                  </Fragment>
                ))}
              </dd>
            </div>
          ))}
        </dl>
        <p className="border-t border-line px-4 py-2 text-xs text-dim">
          <span className="text-amber">$</span> tail -f ~/learning
          <span className="ml-0.5 text-amber motion-safe:animate-blink">_</span>
        </p>
      </aside>
    </div>
  </Section>
)

export default IndexAbout
