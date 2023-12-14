import { Flex, Text } from '@chakra-ui/react'
import Highlight from '../common/Highlight'

const Footer = () => {
  return (
    <Flex w={'100%'} bg={'themeLight.500'}>
      <Flex
        w={'100%'}
        maxW={'1280px'}
        my={'24px'}
        mx={'auto'}
        alignContent={'center'}
      >
        <Flex flex={1} justifyContent={'flex-start'}>
          <Text
            fontSize={'20px'}
            lineHeight={'20px'}
            color={'themeDark.500'}
            fontFamily={'Zarathustra'}
          >
            <Highlight>Sennett Lau.</Highlight>© 2023
          </Text>
        </Flex>
        <Flex flex={1} justifyContent={'center'}>
          <Text
            fontSize={'16px'}
            lineHeight={'16px'}
            color={'themeDark.500'}
            fontFamily={'Zarathustra'}
          >
            Site designed and developed by Sennett Lau
          </Text>
        </Flex>
        <Flex flex={1} justifyContent={'flex-end'}>
          <Text
            fontSize={'20px'}
            lineHeight={'20px'}
            color={'themeDark.500'}
            fontFamily={'Zarathustra'}
            fontWeight={'bold'}
          >
            Back to top
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Footer
