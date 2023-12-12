import IndexAbout from '@/component/index/IndexAbout/IndexAbout'
import IndexCerts from '@/component/index/IndexCerts/IndexCerts'
import IndexContact from '@/component/index/IndexContact/IndexContact'
import IndexExperience from '@/component/index/IndexExprience/IndexExprience'
import IndexHero from '@/component/index/IndexHero/IndexHero'
import IndexProjects from '@/component/index/IndexProjects/IndexProjects'
import IndexQuote from '@/component/index/IndexQuote/IndexQuote'
import { Flex } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { FC } from 'react'

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
