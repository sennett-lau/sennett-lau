import { Flex } from '@chakra-ui/react'
import IndexProjectQuote from './IndexProjectQuote'
import IndexProjectsSectionTop from './IndexProjectsSectionTop'
import IndexProjectsTopFrame from './IndexProjectsTopFrame'
import IndexProjectSectionMiddle from './IndexProjectSectionMiddle'

const IndexProjects = () => {
  return (
    <Flex w={'100%'} bg={'themeDark.500'} py={'100px'}>
      <Flex
        w={'100%'}
        maxW={'1120px'}
        mx={'auto'}
        position={'relative'}
        flexDir={'column'}
      >
        <IndexProjectsTopFrame />
        <IndexProjectsSectionTop />
        <IndexProjectQuote />
        <IndexProjectSectionMiddle />
      </Flex>
    </Flex>
  )
}

export default IndexProjects
