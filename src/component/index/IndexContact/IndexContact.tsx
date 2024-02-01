import { RootState } from '@/store'
import {
  getBackgroundColorScheme,
  getContentColorScheme,
  getIconColorScheme,
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
      py={{
        base: '60px',
        lg: '0',
      }}
      mb={{
        base: '60px',
        lg: '0',
      }}
    >
      <Flex
        w={'100%'}
        maxW={'1120px'}
        mx={'auto'}
        flexDir={'column'}
        color={getContentColorScheme(colorScheme)}
        px={{
          base: '8px',
          lg: '0',
        }}
      >
        <Flex>
          <Flex
            pr={'30px'}
            position={'relative'}
            mb={{
              base: '40px',
              lg: '56px',
            }}
          >
            <Text
              fontSize={{
                base: '72px',
                lg: '96px',
              }}
              fontWeight={'bold'}
            >
              Contact
            </Text>
            <Image
              src={getIconColorScheme('square', colorScheme)}
              position={'absolute'}
              bottom={{
                base: '28px',
                lg: '38px',
              }}
              right={{
                base: '-20px',
                lg: '-30px',
              }}
            />
          </Flex>
        </Flex>
        <Flex
          w={'100%'}
          justifyContent={'space-between'}
          flexDir={{
            base: 'column',
            lg: 'row',
          }}
        >
          <Flex
            w={'580px'}
            maxW={'100%'}
            flexDir={'column'}
            gap={'72px'}
            mb={{
              base: '72px',
              lg: '0',
            }}
          >
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
