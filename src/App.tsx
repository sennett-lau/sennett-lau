import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import IndexAbout from '@/components/index/IndexAbout/IndexAbout'
import IndexCerts from '@/components/index/IndexCerts/IndexCerts'
import IndexContact from '@/components/index/IndexContact/IndexContact'
import IndexExperience from '@/components/index/IndexExperience/IndexExperience'
import IndexHero from '@/components/index/IndexHero/IndexHero'
import IndexProjects from '@/components/index/IndexProjects/IndexProjects'
import IndexQuote from '@/components/index/IndexQuote/IndexQuote'
import useScroll from '@/hooks/useScroll'
import Layout from '@/layout/Layout'
import type { AppDispatch, RootState } from '@/store'
import {
  setColorScheme,
  setCurrSectionId,
  setShowHeader,
  setSubsectionId,
} from '@/store/controlSlice'
import type { ColorScheme } from '@/types'
import { getBackgroundColorScheme } from '@/utils/color'

const App = () => {
  const { scrollPosition } = useScroll()
  const colorScheme = useSelector((s: RootState) => s.controlSlice.colorScheme)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const windowHeight = window.innerHeight
    dispatch(setShowHeader({ showHeader: scrollPosition > windowHeight }))

    const top = (id: string) => document.getElementById(id)?.getBoundingClientRect().top

    const positionColors: Array<{ position: number; color: ColorScheme; id: string }> = [
      { position: 0, color: 'light', id: 'hero' },
      { position: (top('quote') ?? Number.POSITIVE_INFINITY) - 300, color: 'ultraDark', id: 'quote' },
      { position: (top('about') ?? Number.POSITIVE_INFINITY) - 300, color: 'dark', id: 'about' },
      { position: (top('experience') ?? Number.POSITIVE_INFINITY) - 300, color: 'light', id: 'experience' },
      { position: (top('projects') ?? Number.POSITIVE_INFINITY) - 300, color: 'dark', id: 'projects' },
      { position: (top('certs') ?? Number.POSITIVE_INFINITY) - 300, color: 'light', id: 'certs' },
      { position: (top('contact') ?? Number.POSITIVE_INFINITY) - 300, color: 'dark', id: 'contact' },
    ]

    const target = [...positionColors].reverse().find((item) => item.position <= 0)
    if (target) {
      dispatch(setColorScheme({ colorScheme: target.color }))
      dispatch(setCurrSectionId({ currSectionId: target.id }))
    }

    // Subsection tracker (kept for parity with archive — offsets preserved).
    const subSections: Array<{ id: string; offset: number; baseId: string }> = [
      { id: 'experience-9gag-t1', offset: -400, baseId: 'experience-9gag' },
      { id: 'experience-9gag-t2', offset: -300, baseId: 'experience-9gag' },
      { id: 'experience-qookia-t1', offset: -400, baseId: 'experience-qookia' },
      { id: 'experience-qookia-t2', offset: -300, baseId: 'experience-qookia' },
      { id: 'experience-ozaru-t1', offset: -400, baseId: 'experience-ozaru' },
      { id: 'experience-ozaru-t2', offset: -300, baseId: 'experience-ozaru' },
      { id: 'experience-krglobal-t1', offset: -400, baseId: 'experience-krglobal' },
      { id: 'experience-krglobal-t2', offset: -300, baseId: 'experience-krglobal' },
      { id: 'projects-hero', offset: -300, baseId: 'projects' },
      { id: 'projects-quote', offset: -700, baseId: 'projects-quote' },
      { id: 'projects-duo', offset: -300, baseId: 'projects-duo' },
      { id: 'projects-extra', offset: -500, baseId: 'projects-extra' },
    ]

    const subSectionPositions = subSections.map((s) => ({
      id: s.id,
      position: (top(s.baseId) ?? Number.POSITIVE_INFINITY) + s.offset,
    }))

    const targetSub = [...subSectionPositions].reverse().find((item) => item.position <= 0)
    dispatch(setSubsectionId({ subsectionId: targetSub?.id ?? '' }))
  }, [scrollPosition, dispatch])

  return (
    <Layout>
      <div
        className={`w-full flex flex-col transition-colors duration-300 ${getBackgroundColorScheme(
          colorScheme,
        )}`}
      >
        <IndexHero />
        <IndexQuote />
        <IndexAbout />
        <IndexExperience />
        <IndexProjects />
        <IndexCerts />
        <IndexContact />
      </div>
    </Layout>
  )
}

export default App
