import { Flex, Image, Text } from '@chakra-ui/react'

const IndexProjectSectionExtraTopFrame = () => {
  return (
    <Flex
      w={'100%'}
      position={'relative'}
      justifyContent={'space-between'}
      mb={'35px'}
    >
      <Text fontSize={'20px'} fontStyle={'italic'}>
        With some that without any product image...
      </Text>
      <Image src={'/assets/icons/square.svg'} />
    </Flex>
  )
}

export default IndexProjectSectionExtraTopFrame
