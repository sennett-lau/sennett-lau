import { Flex } from '@chakra-ui/react'
import IndexProjectCBTWines from './IndexProjectCBTWines'
import IndexProjectCityUGE from './IndexProjectCityUGE'

const IndexProjectSectionDuo = () => {
  return (
    <Flex
      w={'100%'}
      justifyContent={'space-between'}
      mb={'96px'}
      id={'projects-duo'}
    >
      <Flex alignItems={'center'} flex={1}>
        <IndexProjectCityUGE />
      </Flex>
      <Flex flex={1}>
        <IndexProjectCBTWines />
      </Flex>
    </Flex>
  )
}

export default IndexProjectSectionDuo
