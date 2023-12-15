import { Flex, Text } from '@chakra-ui/react'

const IndexProjectQuote = () => {
  return (
    <Flex
      w={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDir={'column'}
      my={'60px'}
    >
      <Text fontSize={'20px'} lineHeight={'20px'} mb={'8px'}>
        Also as a member of technical solution team 0xBlanc. Provides web3,
        tranditional web and AI solutions, since 2022.
      </Text>
      <Text fontSize={'16px'} lineHeight={'16px'}>
        NextJs · ChakraUI · Solidity · Hardhat · Python · AWS
      </Text>
    </Flex>
  )
}

export default IndexProjectQuote
