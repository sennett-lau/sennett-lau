import IndexAbout from '@/component/index/IndexAbout/IndexAbout'
import IndexCerts from '@/component/index/IndexCerts/IndexCerts'
import IndexContact from '@/component/index/IndexContact/IndexContact'
import IndexExperience from '@/component/index/IndexExprience/IndexExprience'
import IndexHero from '@/component/index/IndexHero/IndexHero'
import IndexProjects from '@/component/index/IndexProjects/IndexProjects'
import IndexQuote from '@/component/index/IndexQuote/IndexQuote'
import useScroll from '@/hook/useScroll'
import { setDisplayColor, setShowHeader } from '@/store/controlSlice'
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
        position: quotePosition,
        color: 'ultraDark',
        id: 'quote',
      },
      {
        position: aboutPosition,
        color: 'dark',
        id: 'about',
      },
      {
        position: experiencePosition,
        color: 'light',
        id: 'experience',
      },
      {
        position: projectsPosition,
        color: 'dark',
        id: 'projects',
      },
      {
        position: certsPosition,
        color: 'light',
        id: 'certs',
      },
      {
        position: contactPosition,
        color: 'dark',
        id: 'contact',
      },
    ]

    const reversePositionColors = positionColors.reverse()

    const targetColor = reversePositionColors.find((item) => {
      return item.position! <= 0
    })

    let themeColor: string

    if (targetColor) {
      switch (targetColor.color) {
        case 'ultraDark':
          themeColor = 'themeDark.900'
          break
        case 'dark':
          themeColor = 'themeDark.500'
          break
        case 'light':
          themeColor = 'themeLight.500'
          break
        default:
          themeColor = 'ultraDark'
          break
      }

      dispatch(
        setDisplayColor({
          displayColor: themeColor,
        }),
      )
    }

    console.log(targetColor?.id)
  }, [scrollPosition])

  return (
    <>
      <Head>
        <title>Next Chakra Starter | 0xBlanc</title>
        <meta name='description' content='A Next Chakra Starter by 0xBlanc' />

        <meta name='og:title' content='Next Chakra Starter | 0xBlanc' />
        <meta
          name='og:description'
          content='A Next Chakra Starter by 0xBlanc'
        />
        <meta
          name='og:image'
          content='https://0xblanc.io/assets/logo/text_logo_og_meta.png'
        />
        <meta property='og:image:width' content='2500' />
        <meta property='og:image:height' content='1330' />
        <meta property='og:url' content='https://0xblanc.io' />
        <meta property='og:site_name' content='Next Chakra Starter | 0xBlanc' />
        <meta property='og:type' content='website' />

        <meta name='twitter:title' content='Next Chakra Starter | 0xBlanc' />
        <meta
          name='twitter:description'
          content='A Next Chakra Starter by 0xBlanc'
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
