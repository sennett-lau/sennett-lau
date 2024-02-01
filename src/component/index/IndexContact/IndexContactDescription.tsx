import { Flex, Text } from '@chakra-ui/react'

const IndexContactDescription = () => {
  return (
    <Flex
      w={'100%'}
      flexDir={'column'}
      fontSize={{
        base: '32px',
        lg: '40px',
      }}
      fontWeight={'bold'}
      lineHeight={'40px'}
    >
      <Text mb={'0'}>Freelance? Job?</Text>
      <Text mb={'0'}>Or any project idea?</Text>
      <Text mb={'0'}>Do not hesitate to contact me!</Text>
    </Flex>
  )
}

export default IndexContactDescription
