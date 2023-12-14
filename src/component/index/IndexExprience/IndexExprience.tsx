import { Flex, Image, Text } from '@chakra-ui/react'
import IndexExperienceKRGlobal from './IndexExperienceKRGlobal'
import IndexExperienceOzaru from './IndexExperienceOzaru'
import IndexExperienceQookia from './IndexExperienceQookia'

const IndexExperience = () => {
  return (
    <Flex id='experience' w={'100%'} bg={'themeLight.500'} py={'100px'}>
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
        <IndexExperienceKRGlobal />
      </Flex>
    </Flex>
  )
}

export default IndexExperience
