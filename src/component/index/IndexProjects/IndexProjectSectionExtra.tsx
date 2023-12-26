import { RootState } from '@/store'
import { Flex } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import IndexProjectExtraAINA from './IndexProjectExtraAINA'
import IndexProjectExtraLCSD from './IndexProjectExtraLCSD'
import IndexProjectExtraSCL from './IndexProjectExtraSCL'
import IndexProjectImageSelf from './IndexProjectImageSelf'
import IndexProjectSectionExtraTopFrame from './IndexProjectSectionExtraTopFrame'

const IndexProjectSectionExtra = () => {
  const subsectionId = useSelector(
    (state: RootState) => state.controlSlice.subsectionId,
  )

  return (
    <Flex
      w={'100%'}
      flexDir={'column'}
      color={'themeLight.500'}
      id={'projects-extra'}
    >
      <IndexProjectSectionExtraTopFrame
        triggerAnimation={subsectionId === 'projects-extra'}
      />
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
