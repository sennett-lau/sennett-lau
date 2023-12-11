import { Flex, Image, Text } from '@chakra-ui/react'

const IndexProject0xBlanc = () => {
  return (
    <Flex color={'themeLight.500'} flexDir={'column'} w={'100%'} px={'48px'}>
      <Flex
        w={'100%'}
        justifyContent={'flex-end'}
        alignItems={'center'}
        mb={'8px'}
      >
        <Text fontSize={'16px'}>2023</Text>
      </Flex>
      <Image
        src='/assets/projects/0xblanc-landing.png'
        w={'100%'}
        mb={'16px'}
      />
      <Text fontSize={'24px'} lineHeight={'24px'} mb={'8px'} fontWeight={'semibold'}>
        0xBlanc Landing Website
      </Text>
      <Text fontSize={'20px'} lineHeight={'20px'} mb={'8px'}>
        Frontend Development
      </Text>
      <Text fontSize={'16px'} lineHeight={'16px'}>
        NextJs · ChakraUI
      </Text>
    </Flex>
  )
}

export default IndexProject0xBlanc
