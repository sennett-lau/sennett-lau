import { useSelector } from 'react-redux'

import type { RootState } from '@/store'
import { getContentColorScheme } from '@/utils/color'

// TODO(visual-port): Port full Header behaviour from
// archive/src/component/common/Header.tsx — section nav, hamburger menu,
// scroll-aware reveal animation. Current shell is functional placeholder.
const Header = () => {
  const showHeader = useSelector((state: RootState) => state.controlSlice.showHeader)
  const colorScheme = useSelector((state: RootState) => state.controlSlice.colorScheme)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        showHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } ${getContentColorScheme(colorScheme)}`}
    >
      <nav className="max-w-[1120px] mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#hero" className="font-zarathustra text-2xl">
          SL
        </a>
        <ul className="hidden lg:flex gap-6 text-sm font-semibold">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#experience">Experience</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#certs">Certs</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
