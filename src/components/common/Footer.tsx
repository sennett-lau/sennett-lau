import { useSelector } from 'react-redux'

import type { RootState } from '@/store'
import { getContentColorScheme } from '@/utils/color'

// TODO(visual-port): Port full Footer from archive/src/component/common/Footer.tsx
const Footer = () => {
  const colorScheme = useSelector((state: RootState) => state.controlSlice.colorScheme)

  return (
    <footer
      className={`w-full py-6 text-center text-sm transition-colors duration-300 ${getContentColorScheme(
        colorScheme,
      )}`}
    >
      © {new Date().getFullYear()} Sennett Lau
    </footer>
  )
}

export default Footer
