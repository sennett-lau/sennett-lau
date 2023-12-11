import { Flex, Image, Text } from '@chakra-ui/react'
import IndexProject0xBlanc from './IndexProject0xBlanc'

const IndexProjectsSectionTop = () => {
  return (
    <Flex w={'100%'}>
      <Flex flex={1} justifyContent={'center'} alignItems={'center'}>
        <Flex pt={'58px'} position={'relative'}>
          <Text
            fontSize={'96px'}
            fontWeight={700}
            color={'themeLight.500'}
            ml={'30px'}
            css={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
            }}
            mb={'0'}
          >
            Projects
          </Text>
          <Image
            src='/assets/icons/square.svg'
            position={'absolute'}
            top={'0'}
            right={'38px'}
          />
        </Flex>
      </Flex>
      <Flex w={'75%'}>
        <IndexProject0xBlanc />
      </Flex>
    </Flex>
  )
}

export default IndexProjectsSectionTop
