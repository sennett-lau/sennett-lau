import { Flex, Image, Text } from '@chakra-ui/react'

const IndexProjectSectionExtra = () => {
  return (
    <Flex w={'100%'} flexDir={'column'} color={'themeLight.500'}>
      <Flex w={'100%'} position={'relative'} justifyContent={'space-between'}>
        <Text fontSize={'20px'} fontStyle={'italic'}>
          With some that without any product image...
        </Text>
        <Image src={'/assets/icons/square.svg'} />
      </Flex>
    </Flex>
  )
}

export default IndexProjectSectionExtra
