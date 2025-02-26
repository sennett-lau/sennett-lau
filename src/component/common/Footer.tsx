import { useSelector } from 'react-redux'

import { Flex, Text } from '@chakra-ui/react'

import { RootState } from '@/store'
import { getBackgroundColorScheme, getContentColorScheme } from '@/utils'

import Highlight from '../common/Highlight'

const Footer = () => {
  const colorScheme = useSelector(
    (state: RootState) => state.controlSlice.colorScheme,
  )

  return (
    <Flex w={'100%'} bg={getBackgroundColorScheme(colorScheme)}>
      <Flex
        w={'100%'}
        maxW={'1280px'}
        my={'24px'}
        mx={'auto'}
        alignContent={'center'}
        flexDir={{
          base: 'column',
          lg: 'row',
        }}
        gap={{
          base: '24px',
          lg: '0',
        }}
      >
        <Flex
          flex={1}
          justifyContent={{
            base: 'center',
            lg: 'flex-start',
          }}
        >
          <Text
            fontSize={'20px'}
            lineHeight={'20px'}
            color={getContentColorScheme(colorScheme)}
            fontFamily={'Zarathustra'}
          >
            <Highlight>Sennett Lau.</Highlight>© 2023
          </Text>
        </Flex>
        <Flex flex={1} justifyContent={'center'}>
          <Text
            fontSize={'16px'}
            lineHeight={'16px'}
            color={getContentColorScheme(colorScheme)}
            fontFamily={'Zarathustra'}
          >
            Site designed and developed by Sennett Lau
          </Text>
        </Flex>
        <Flex
          flex={1}
          justifyContent={{
            base: 'center',
            lg: 'flex-end',
          }}
        >
          <Text
            fontSize={'20px'}
            lineHeight={'20px'}
            color={getContentColorScheme(colorScheme)}
            fontFamily={'Zarathustra'}
            fontWeight={'bold'}
            cursor={'pointer'}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }}
          >
            Back to top
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Footer
