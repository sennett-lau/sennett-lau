import { Flex } from '@chakra-ui/react'
import IndexProjectCBTWines from './IndexProjectCBTWines'
import IndexProjectCityUGE from './IndexProjectCityUGE'

const IndexProjectSectionDuo = () => {
  return (
    <Flex
      w={'100%'}
      justifyContent={'space-between'}
      mb={{
        base: '60px',
        lg: '96px',
      }}
      id={'projects-duo'}
      flexDir={{
        base: 'column',
        lg: 'row',
      }}
      gap={{
        base: '32px',
        lg: '0',
      }}
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
