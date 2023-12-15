import { RootState } from '@/store'
import {
  getBackgroundColorScheme,
  getContentColorScheme,
  getSquareColorScheme,
} from '@/utils'
import { Flex, Image, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import IndexContactDescription from './IndexContactDescription'
import IndexContactDetail from './IndexContactDetail'
import IndexContactDigitalSpaces from './IndexContactDigitalSpaces'
import IndexContactForm from './IndexContactForm'

const IndexContact = () => {
  const colorScheme = useSelector(
    (state: RootState) => state.controlSlice.colorScheme,
  )

  return (
    <Flex
      id='contact'
      w={'100%'}
      bg={getBackgroundColorScheme(colorScheme)}
      alignItems={'center'}
      minH={'100vh'}
      transition={'all 0.3s ease-in-out'}
    >
      <Flex
        w={'100%'}
        maxW={'1120px'}
        mx={'auto'}
        flexDir={'column'}
        color={getContentColorScheme(colorScheme)}
      >
        <Flex>
          <Flex pr={'30px'} position={'relative'} mb={'56px'}>
            <Text fontSize={'96px'} fontWeight={'bold'}>
              Contact
            </Text>
            <Image
              src={getSquareColorScheme(colorScheme)}
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
