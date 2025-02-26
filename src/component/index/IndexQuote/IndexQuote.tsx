import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Box, Flex, Text } from '@chakra-ui/react'

import { RootState } from '@/store'
import { getBackgroundColorScheme, getContentColorScheme } from '@/utils'

const quote =
  'I develop digital experiences that inspire, infused with cutting-edge technology.'

const IndexQuote = () => {
  const colorScheme = useSelector(
    (state: RootState) => state.controlSlice.colorScheme,
  )
  const currSectionId = useSelector(
    (state: RootState) => state.controlSlice.currSectionId,
  )

  const [characterIndex, setCharacterIndex] = useState(0)
  const [isAnimationTriggered, setIsAnimationTriggered] = useState(false)

  useEffect(() => {
    if (currSectionId === 'quote' && !isAnimationTriggered) {
      const interval = setInterval(() => {
        setCharacterIndex((characterIndex) => characterIndex + 1)

        if (characterIndex === quote.length) {
          clearInterval(interval)
        }
      }, 50)
      setIsAnimationTriggered(true)
    }
  }, [currSectionId, isAnimationTriggered])

  return (
    <Flex
      id='quote'
      w={'100%'}
      h={{
        base: '50vh',
        lg: '100vh',
      }}
      bg={getBackgroundColorScheme(colorScheme)}
      alignItems={'center'}
      justifyContent={'center'}
      color={getContentColorScheme(colorScheme)}
      transition={'all 0.3s ease-in-out'}
    >
      <Flex
        w={'100%'}
        maxW={'1120px'}
        mx={'auto'}
        minH={{
          base: '272px',
          lg: 'auto',
        }}
        h={{
          base: 'fit-content',
          lg: '100%',
        }}
        px={{
          base: '12px',
          lg: '0',
        }}
      >
        <Flex flexDir={'column'}>
          <Box
            w={'44px'}
            h={'44px'}
            borderLeft={'1px solid'}
            borderTop={'1px solid'}
            borderColor={getContentColorScheme(colorScheme)}
          ></Box>
        </Flex>
        <Flex
          flex={1}
          px={{
            base: '0',
            lg: '86px',
          }}
          py={{
            base: '64px',
            lg: '0',
          }}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text
            fontWeight={'medium'}
            fontSize={{
              base: '24px',
              lg: '64px',
            }}
            fontStyle={'italic'}
            textAlign={{
              base: 'center',
              lg: 'left',
            }}
          >
            {quote
              .split('')
              .slice(
                0,
                characterIndex > quote.length ? quote.length : characterIndex,
              )}
          </Text>
        </Flex>
        <Flex flexDir={'column'} justifyContent={'flex-end'}>
          <Box
            w={'44px'}
            h={'44px'}
            borderRight={'1px solid'}
            borderBottom={'1px solid'}
            borderColor={getContentColorScheme(colorScheme)}
          ></Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default IndexQuote
