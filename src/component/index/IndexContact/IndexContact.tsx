import { Flex, Image, Text } from '@chakra-ui/react'
import IndexContactDescription from './IndexContactDescription'
import IndexContactDetail from './IndexContactDetail'
import IndexContactDigitalSpaces from './IndexContactDigitalSpaces'
import IndexContactForm from './IndexContactForm'

const IndexContact = () => {
  return (
    <Flex id='contact' w={'100%'} bg={'themeDark.500'} alignItems={'center'} minH={'100vh'}>
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
        <Flex w={'100%'} justifyContent={'space-between'}>
          <Flex w={'580px'} flexDir={'column'} gap={'72px'}>
            <IndexContactDescription />
            <IndexContactForm />
          </Flex>
          <Flex w={'fit-content'} flexDir={'column'} gap={'52px'}>
            <IndexContactDetail />
            <IndexContactDigitalSpaces />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default IndexContact
