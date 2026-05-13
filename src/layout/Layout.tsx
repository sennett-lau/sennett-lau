import type { FC, ReactNode } from 'react'

import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
