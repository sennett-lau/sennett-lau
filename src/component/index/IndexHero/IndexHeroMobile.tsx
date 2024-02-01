import { RootState } from '@/store'
import { getBackgroundColorScheme } from '@/utils'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import IndexProjectImageSelf from '../IndexProjects/IndexProjectImageSelf'
import IndexHeroNav from './IndexHeroNav'
import ScrollHint from './ScrollHint'

const IndexHeroMobile = () => {
  const colorScheme = useSelector(
    (state: RootState) => state.controlSlice.colorScheme,
  )

  const [transitionStep, setTransitionStep] = useState(0)

  useEffect(() => {
    for (let i = 0; i < 7; i++) {
      setTimeout(() => {
        setTransitionStep(i + 1)
      }, 1000 + i * 250)
    }
  }, [])

  return (
    <Flex
      h={'100vh'}
      bg={getBackgroundColorScheme(colorScheme)}
      display={{ base: 'flex', md: 'none' }}
      flexDir={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      mt={'-5vw'}
      transition={'all 0.3s ease-in-out'}
    >
      <IndexProjectImageSelf triggerAnimation={true} />
      <Text
        fontSize={'48px'}
        fontWeight={'400'}
        fontFamily={'Zarathustra'}
        w={'100%'}
        textAlign={'center'}
        mt={'36px'}
      >
        Sennett Lau.
      </Text>
      <Flex position={'relative'} justify={'center'} w={'100%'}>
        <IndexHeroNav />
        <Box position={'absolute'} bottom={'0px'} right={'20px'}>
          <ScrollHint
            triggerAnimation={transitionStep > 2}
            classSuffix='mobile'
          />
        </Box>
      </Flex>
    </Flex>
  )
}

export default IndexHeroMobile
