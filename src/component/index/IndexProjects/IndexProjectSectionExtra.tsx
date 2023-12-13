import { Flex } from '@chakra-ui/react'
import IndexProjectImageSelf from './IndexProjectImageSelf'
import IndexProjectSectionExtraTopFrame from './IndexProjectSectionExtraTopFrame'

const IndexProjectSectionExtra = () => {
  return (
    <Flex w={'100%'} flexDir={'column'} color={'themeLight.500'}>
      <IndexProjectSectionExtraTopFrame />
      <Flex>
        <Flex flex={1}></Flex>
        <Flex w={'fit-content'}>
          <IndexProjectImageSelf />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default IndexProjectSectionExtra
