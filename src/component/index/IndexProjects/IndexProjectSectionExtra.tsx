import { Flex } from '@chakra-ui/react'
import IndexProjectExtraAINA from './IndexProjectExtraAINA'
import IndexProjectExtraLCSD from './IndexProjectExtraLCSD'
import IndexProjectExtraSCL from './IndexProjectExtraSCL'
import IndexProjectImageSelf from './IndexProjectImageSelf'
import IndexProjectSectionExtraTopFrame from './IndexProjectSectionExtraTopFrame'

const IndexProjectSectionExtra = () => {
  return (
    <Flex
      w={'100%'}
      flexDir={'column'}
      color={'themeLight.500'}
      id={'projects-extra'}
    >
      <IndexProjectSectionExtraTopFrame />
      <Flex mb={'95px'}>
        <Flex flex={1} pt={'110px'}>
          <IndexProjectExtraAINA />
        </Flex>
        <Flex w={'fit-content'} pr={'31px'}>
          <IndexProjectImageSelf />
        </Flex>
      </Flex>
      <Flex>
        <Flex flex={1} pt={'60px'} pl={'84px'}>
          <IndexProjectExtraSCL />
        </Flex>
        <Flex w={'fit-content'}>
          <IndexProjectExtraLCSD />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default IndexProjectSectionExtra
