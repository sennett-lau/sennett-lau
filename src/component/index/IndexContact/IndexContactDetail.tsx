import { Flex, Text } from '@chakra-ui/react'

const IndexContactDetail = () => {
  return (
    <Flex w={'100%'} flexDir={'column'} gap={'8px'}>
      <Text fontSize={'36px'} fontWeight={'bold'} lineHeight={'36px'}>
        Contact Detail
      </Text>
      <Text fontSize={'24px'} lineHeight={'24px'}>
        laub1199@gmail.com
      </Text>
    </Flex>
  )
}

export default IndexContactDetail
