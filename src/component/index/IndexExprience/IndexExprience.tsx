import { Flex, Image, Text } from '@chakra-ui/react'
import IndexExperienceQookia from './IndexExperienceQookia'
import IndexExperienceOzaru from './IndexExperienceOzaru'

const IndexExperience = () => {
  return (
    <Flex w={'100%'} bg={'themeLight.500'} py={'100px'}>
      <Flex
        w={'100%'}
        maxW={'1120px'}
        mx={'auto'}
        position={'relative'}
        flexDir={'column'}
        gap={'85px'}
      >
        <Flex gap={'33px'} alignItems={'end'}>
          <Text
            fontSize={'96px'}
            fontWeight={700}
            color={'themeDark.500'}
            h={'106px'}
          >
            Experience
          </Text>
          <Image src='/assets/icons/square-dark.svg' />
        </Flex>
        <IndexExperienceQookia />
        <IndexExperienceOzaru />
      </Flex>
    </Flex>
  )
}

export default IndexExperience
