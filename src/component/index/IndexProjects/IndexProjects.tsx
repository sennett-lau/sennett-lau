import { Flex } from '@chakra-ui/react'
import IndexProjectQuote from './IndexProjectQuote'
import IndexProjectSectionDuo from './IndexProjectSectionDuo'
import IndexProjectSectionExtra from './IndexProjectSectionExtra'
import IndexProjectsSectionHero from './IndexProjectsSectionHero'
import IndexProjectsTopFrame from './IndexProjectsTopFrame'

const IndexProjects = () => {
  return (
    <Flex id='projects' w={'100%'} bg={'themeDark.500'} py={'100px'}>
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
