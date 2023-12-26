import IndexAbout from '@/component/index/IndexAbout/IndexAbout'
import IndexCerts from '@/component/index/IndexCerts/IndexCerts'
import IndexContact from '@/component/index/IndexContact/IndexContact'
import IndexExperience from '@/component/index/IndexExprience/IndexExprience'
import IndexHero from '@/component/index/IndexHero/IndexHero'
import IndexProjects from '@/component/index/IndexProjects/IndexProjects'
import IndexQuote from '@/component/index/IndexQuote/IndexQuote'
import useScroll from '@/hook/useScroll'
import {
  setColorScheme,
  setCurrSectionId,
  setShowHeader,
  setSubsectionId,
} from '@/store/controlSlice'
import { ColorScheme } from '@/types'
import { Flex } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const getServerSideProps: GetServerSideProps = async () => {
  // for api call in server side
  return {
    props: {},
  }
}

type Props = {
  // server side api call's props can be defined here
}

const Home: FC<Props> = (props) => {
  const { scrollPosition } = useScroll()

  const dispatch = useDispatch()

  useEffect(() => {
    const windowHeight = window.innerHeight
    if (scrollPosition > windowHeight) {
      dispatch(
        setShowHeader({
          showHeader: true,
        }),
      )
    } else {
      dispatch(
        setShowHeader({
          showHeader: false,
        }),
      )
    }

    // get the position of element with id 'quote'
    const quote = document.getElementById('quote')
    const quotePosition = quote?.getBoundingClientRect().top

    // get the position of element with id 'about'
    const about = document.getElementById('about')
    const aboutPosition = about?.getBoundingClientRect().top

    // get the position of element with id 'experience'
    const experience = document.getElementById('experience')
    const experiencePosition = experience?.getBoundingClientRect().top

    // get the position of element with id 'projects'
    const projects = document.getElementById('projects')
    const projectsPosition = projects?.getBoundingClientRect().top

    // get the position of element with id 'certs'
    const certs = document.getElementById('certs')
    const certsPosition = certs?.getBoundingClientRect().top

    // get the position of element with id 'contact'
    const contact = document.getElementById('contact')
    const contactPosition = contact?.getBoundingClientRect().top

    const positionColors = [
      {
        position: 0,
        color: 'light',
        id: 'hero',
      },
      {
        position: quotePosition! - 300,
        color: 'ultraDark',
        id: 'quote',
      },
      {
        position: aboutPosition! - 300,
        color: 'dark',
        id: 'about',
      },
      {
        position: experiencePosition! - 300,
        color: 'light',
        id: 'experience',
      },
      {
        position: projectsPosition! - 300,
        color: 'dark',
        id: 'projects',
      },
      {
        position: certsPosition! - 300,
        color: 'light',
        id: 'certs',
      },
      {
        position: contactPosition! - 300,
        color: 'dark',
        id: 'contact',
      },
    ]

    const reversePositionColors = positionColors.reverse()

    const targetColorScheme = reversePositionColors.find((item) => {
      return item.position! <= 0
    })

    dispatch(
      setColorScheme({
        colorScheme: targetColorScheme?.color as ColorScheme,
      }),
    )
    dispatch(
      setCurrSectionId({
        currSectionId: targetColorScheme!.id,
      }),
    )

    // subSection

    const subSectionPositions: { id: string; position: number }[] = []

    const experienceQookia = document.getElementById('experience-qookia')
    const experienceQookiaPosition =
      experienceQookia?.getBoundingClientRect().top

    const experienceOzaru = document.getElementById('experience-ozaru')
    const experienceOzaruPosition = experienceOzaru?.getBoundingClientRect().top

    const experienceKRGlobal = document.getElementById('experience-krglobal')
    const experienceKRGlobalPosition =
      experienceKRGlobal?.getBoundingClientRect().top

    const projectQuote = document.getElementById('projects-quote')
    const projectQuotePosition = projectQuote?.getBoundingClientRect().top

    const projectDuo = document.getElementById('projects-duo')
    const projectDuoPosition = projectDuo?.getBoundingClientRect().top

    const projectExtra = document.getElementById('projects-extra')
    const projectExtraPosition = projectExtra?.getBoundingClientRect().top

    subSectionPositions.push({
      id: 'experience-qookia-t1',
      position: experienceQookiaPosition! - 400,
    })

    subSectionPositions.push({
      id: 'experience-qookia-t2',
      position: experienceQookiaPosition! - 300,
    })

    subSectionPositions.push({
      id: 'experience-ozaru-t1',
      position: experienceOzaruPosition! - 400,
    })

    subSectionPositions.push({
      id: 'experience-ozaru-t2',
      position: experienceOzaruPosition! - 300,
    })

    subSectionPositions.push({
      id: 'experience-krglobal-t1',
      position: experienceKRGlobalPosition! - 400,
    })

    subSectionPositions.push({
      id: 'experience-krglobal-t2',
      position: experienceKRGlobalPosition! - 300,
    })

    subSectionPositions.push({
      id: 'projects-hero',
      position: projectsPosition! - 300,
    })

    subSectionPositions.push({
      id: 'projects-quote',
      position: projectQuotePosition! - 700,
    })

    subSectionPositions.push({
      id: 'projects-duo',
      position: projectDuoPosition! - 300,
    })

    subSectionPositions.push({
      id: 'projects-extra',
      position: projectExtraPosition! - 300,
    })

    const reverseSubSectionPositions = subSectionPositions.reverse()

    const targetSubSection = reverseSubSectionPositions.find((item) => {
      return item.position! <= 0
    })

    dispatch(
      setSubsectionId({
        subsectionId: targetSubSection?.id || '',
      }),
    )
  }, [scrollPosition])

  return (
    <>
      <Head>
        <title>Sennett Lau | A FullStack Developer</title>
        <meta
          name='description'
          content='Sennett Lau, a fullstack developer skilled in frontend, backend, deployment, cloud and web3. Feel free to find me for any freelance, job or project idea!'
        />

        <meta name='og:title' content='Sennett Lau | A FullStack Developer' />
        <meta
          name='og:description'
          content='Sennett Lau, a fullstack developer skilled in frontend, backend, deployment, cloud and web3. Feel free to find me for any freelance, job or project idea!'
        />
        <meta
          name='og:image'
          content='https://0xblanc.io/assets/logo/text_logo_og_meta.png'
        />
        <meta property='og:image:width' content='2500' />
        <meta property='og:image:height' content='1330' />
        <meta property='og:url' content='https://0xblanc.io' />
        <meta
          property='og:site_name'
          content='Sennett Lau | A FullStack Developer'
        />
        <meta property='og:type' content='website' />

        <meta
          name='twitter:title'
          content='Sennett Lau | A FullStack Developer'
        />
        <meta
          name='twitter:description'
          content='Sennett Lau, a fullstack developer skilled in frontend, backend, deployment, cloud and web3. Feel free to find me for any freelance, job or project idea!'
        />
        <meta
          name='twitter:image'
          content='https://0xblanc.io/assets/logo/text_logo_og_meta.png'
        />
      </Head>
      <Flex width={'100%'} height={'100%'} flexDir={'column'}>
        <IndexHero />
        <IndexQuote />
        <IndexAbout />
        <IndexExperience />
        <IndexProjects />
        <IndexCerts />
        <IndexContact />
      </Flex>
    </>
  )
}

export default Home
