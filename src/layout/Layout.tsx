import type { ReactNode } from 'react'

import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => (
  <div className="relative flex min-h-screen flex-col overflow-x-clip">
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-14 focus:z-[70] focus:bg-amber focus:px-3 focus:py-1 focus:text-bg"
    >
      Skip to content
    </a>
    <Header />
    <main id="main" className="flex flex-1 flex-col">
      {children}
    </main>
    <Footer />
  </div>
)

export default Layout
