import { Flex, Image, Text } from '@chakra-ui/react'

const IndexContactDigitalSpaces = () => {
  return (
    <Flex w={'fit-content'} flexDir={'column'} gap={'22px'}>
      <Text fontSize={'36px'} fontWeight={'bold'} lineHeight={'36px'}>
        Other Digital Spaces
      </Text>
      <Flex w={'fit-content'} gap={'8px'} alignItems={'center'}>
        <Image src={'/assets/icons/linkedin.svg'} w={'24px'} h={'24px'} />
        <Text fontSize={'24px'} lineHeight={'24px'}>
          sennett-lau
        </Text>
      </Flex>
      <Flex w={'fit-content'} gap={'8px'} alignItems={'center'}>
        <Image src={'/assets/icons/github.svg'} w={'24px'} h={'24px'} />
        <Text fontSize={'24px'} lineHeight={'24px'}>
          sennett-lau
        </Text>
      </Flex>
    </Flex>
  )
}

export default IndexContactDigitalSpaces
