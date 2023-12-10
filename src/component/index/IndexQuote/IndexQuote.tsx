import { Box, Flex, Text } from '@chakra-ui/react'

const IndexQuote = () => {
  return (
    <Flex
      w={'100%'}
      h={'100vh'}
      bg={'themeDark.900'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Flex w={'100%'} maxW={'1120px'} mx={'auto'} h={'60vh'}>
        <Flex flexDir={'column'}>
          <Box
            w={'44px'}
            h={'44px'}
            borderLeft={'1px solid'}
            borderTop={'1px solid'}
            borderColor={'themeLight.500'}
          ></Box>
        </Flex>
        <Flex
          flex={1}
          px={'86px'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text
            fontWeight={'medium'}
            fontSize={'64px'}
            fontStyle={'italic'}
            color={'themeLight.500'}
          >
            I develop digital experiences that inspire, infused with
            cutting-edge technology.
          </Text>
        </Flex>
        <Flex flexDir={'column'} justifyContent={'flex-end'}>
          <Box
            w={'44px'}
            h={'44px'}
            borderRight={'1px solid'}
            borderBottom={'1px solid'}
            borderColor={'themeLight.500'}
          ></Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default IndexQuote
