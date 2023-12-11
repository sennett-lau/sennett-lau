import { Box, Flex, Image, Text } from '@chakra-ui/react'
import IndexProject0xBlanc from './IndexProject0xBlanc'

const IndexProjects = () => {
  return (
    <Flex w={'100%'} bg={'themeDark.500'} py={'100px'}>
      <Flex
        w={'100%'}
        maxW={'1120px'}
        mx={'auto'}
        position={'relative'}
        pt={'74px'}
      >
        <Image
          src='/assets/icons/square.svg'
          position={'absolute'}
          top={'0'}
          left={'0'}
        />
        <Box
          w={'44px'}
          h={'44px'}
          borderRight={'1px solid'}
          borderTop={'1px solid'}
          borderColor={'themeLight.500'}
          position={'absolute'}
          top={'0'}
          right={'0'}
        />
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
    </Flex>
  )
}

export default IndexProjects
