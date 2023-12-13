import { Flex, Image, Text } from '@chakra-ui/react'
import IndexContactDescription from './IndexContactDescription'
import IndexContactForm from './IndexContactForm'

const IndexContact = () => {
  return (
    <Flex w={'100%'} bg={'themeDark.500'} py={'100px'}>
      <Flex
        w={'100%'}
        maxW={'1120px'}
        mx={'auto'}
        flexDir={'column'}
        color={'themeLight.500'}
      >
        <Flex>
          <Flex pr={'30px'} position={'relative'} mb={'56px'}>
            <Text
              fontSize={'96px'}
              fontWeight={'bold'}
              color={'themeLight.500'}
            >
              Contact
            </Text>
            <Image
              src={'/assets/icons/square.svg'}
              position={'absolute'}
              bottom={'38px'}
              right={'-30px'}
            />
          </Flex>
        </Flex>
        <Flex w={'100%'}>
          <Flex flex={7} flexDir={'column'} gap={'72px'}>
            <IndexContactDescription />
            <IndexContactForm />
          </Flex>
          <Flex flex={5}></Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default IndexContact
