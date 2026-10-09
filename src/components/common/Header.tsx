import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { SECTIONS } from '@/content/site'
import { useActiveSection } from '@/hooks/useActiveSection'

const SECTION_IDS = SECTIONS.map((s) => s.id)

// Fixed status bar: prompt with the current section as cwd, plus section tabs.
const Header = () => {
  const active = useActiveSection(SECTION_IDS)
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // While the overlay is open, the page behind it is inert (no tabbing into
  // hidden content) and Escape closes it, returning focus to the toggle.
  useEffect(() => {
    if (!menuOpen) return
    const behind = [document.getElementById('main'), document.querySelector('footer')]
    for (const el of behind) el?.setAttribute('inert', '')
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setMenuOpen(false)
      toggleRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      for (const el of behind) el?.removeAttribute('inert')
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/85 backdrop-blur">
        <div className="mx-auto flex h-11 max-w-[1200px] items-center gap-4 px-4 text-xs md:px-8">
          <a href="#hero" className="shrink-0 whitespace-nowrap">
            <span className="text-amber">sennett@lau</span>
            <span className="text-dim">:</span>
            <span className="text-ink">~/{active}</span>
            <span className="ml-0.5 inline-block text-amber motion-safe:animate-blink">_</span>
          </a>
          <nav aria-label="Sections" className="ml-auto hidden md:block">
            <ul className="flex gap-1">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={active === s.id ? 'location' : undefined}
                    className={`px-2 py-1 transition-colors ${
                      active === s.id ? 'bg-amber text-bg' : 'text-dim hover:text-ink'
                    }`}
                  >
                    <span className={active === s.id ? '' : 'text-amber/70'}>{i + 1}</span>{' '}
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            ref={toggleRef}
            type="button"
            className="ml-auto text-ink md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            [ {menuOpen ? 'close' : 'menu'} ]
          </button>
        </div>
      </header>
      {/* Outside <header>: its backdrop-filter would become the containing block
          for this fixed overlay and collapse it to the header's height. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Sections"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-0 bottom-0 top-11 z-50 bg-bg px-6 py-10 md:hidden"
          >
            <p className="text-sm text-dim">
              <span className="text-amber">$</span> ls ~/
            </p>
            <ul className="mt-6 space-y-4">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-3xl font-bold [font-stretch:112.5%]"
                  >
                    <span className="mr-3 text-base text-amber">0{i + 1}</span>
                    {s.label}
                    <span className="text-amber">/</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
