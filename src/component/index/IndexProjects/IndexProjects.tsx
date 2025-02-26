import { useSelector } from 'react-redux'

import { Flex } from '@chakra-ui/react'

import { RootState } from '@/store'
import { getBackgroundColorScheme, getContentColorScheme } from '@/utils'

import IndexProjectQuote from './IndexProjectQuote'
import IndexProjectSectionDuo from './IndexProjectSectionDuo'
import IndexProjectSectionExtra from './IndexProjectSectionExtra'
import IndexProjectsSectionHero from './IndexProjectsSectionHero'
import IndexProjectsTopFrame from './IndexProjectsTopFrame'

const IndexProjects = () => {
  const colorScheme = useSelector(
    (state: RootState) => state.controlSlice.colorScheme,
  )

  return (
    <Flex
      id='projects'
      w={'100%'}
      bg={getBackgroundColorScheme(colorScheme)}
      color={getContentColorScheme(colorScheme)}
      py={'100px'}
      transition={'all 0.3s ease-in-out'}
      px={{
        base: '8px',
        lg: 0,
      }}
    >
      <Flex
        w={'100%'}
        maxW={'1120px'}
        mx={'auto'}
        position={'relative'}
        flexDir={'column'}
      >
        <IndexProjectsTopFrame />
        <IndexProjectsSectionHero />
        <IndexProjectQuote />
        <IndexProjectSectionDuo />
        <IndexProjectSectionExtra />
      </Flex>
    </Flex>
  )
}

export default IndexProjects
