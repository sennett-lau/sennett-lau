import { RootState } from '@/store'
import { getBackgroundColorScheme, getContentColorScheme, range } from '@/utils'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import IndexHeroNav from './IndexHeroNav'
import ScrollHint from './ScrollHint'

const IndexHeroDesktop = () => {
  const colorScheme = useSelector(
    (state: RootState) => state.controlSlice.colorScheme,
  )

  const [transitionStep, setTransitionStep] = useState(0)
  const [tid, setTid] = useState<NodeJS.Timeout>()

  useEffect(() => {
    setTimeout(() => {
      setTransitionStep(1)
    }, 1000)
    setTimeout(() => {
      setTransitionStep(2)
    }, 1500)
    setTimeout(() => {
      setTransitionStep(3)
    }, 1750)
    setTimeout(() => {
      setTransitionStep(4)
    }, 2500)
    setTimeout(() => {
      setTransitionStep(5)
    }, 3000)
    setTimeout(() => {
      setTransitionStep(6)
    }, 3500)
    setTimeout(() => {
      setTransitionStep(7)
    }, 4000)
  }, [])

  return (
    <Flex
      id='hero'
      w={'100%'}
      h={'100vh'}
      bg={getBackgroundColorScheme(colorScheme)}
      color={getContentColorScheme(colorScheme)}
      transition={'all 0.3s ease-in-out'}
      alignItems={'center'}
      display={{ base: 'none', md: 'flex' }}
    >
      <Flex maxW={'1120px'} w={'100%'} height={'650px'} mx={'auto'}>
        <Flex flex={1}>
          <Flex
            w={'44px'}
            flexDir={'column'}
            justifyContent={'flex-end'}
            mr={'38px'}
          >
            <Box
              w={transitionStep >= 1 ? '44px' : '1120px'}
              h={transitionStep >= 1 ? '44px' : '650px'}
              borderLeft={'1px solid'}
              borderBottom={'1px solid'}
              borderColor={getContentColorScheme(colorScheme)}
              transition={'all 1s ease-in-out'}
            />
          </Flex>
          <Flex
            justifyContent={'center'}
            alignItems={'center'}
            height={'100%'}
            flexDir={'column'}
          >
            <Box w={'100%'} h={'54px'} />
            <Flex flex={1} justifyContent={'center'} alignItems={'center'}>
              <Flex
                flex={1}
                justifyContent={'center'}
                alignItems={'center'}
                transform={transitionStep >= 1 ? 'none' : 'translateX(254px)'}
                transition={'all 1s ease-in-out'}
              >
                <Text
                  fontSize={'64px'}
                  fontWeight={'400'}
                  fontFamily={'Zarathustra'}
                  transform={transitionStep >= 1 ? 'none' : 'scale(2.5)'}
                  transition={'all 1s ease-in-out'}
                >
                  Sennett Lau.
                </Text>
              </Flex>
            </Flex>
            <Flex
              w={'100%'}
              h={'54px'}
              pb={'20px'}
              alignItems={'flex-end'}
              opacity={transitionStep >= 2 ? 1 : 0}
              transition={'all 1s ease-in-out'}
            >
              <IndexHeroNav />
            </Flex>
          </Flex>
        </Flex>
        <Flex
          flex={1}
          height={'100%'}
          justifyContent={'space-between'}
          pl={'28px'}
        >
          <Image
            src='/assets/me.png'
            opacity={transitionStep >= 3 ? 1 : 0}
            transition={'all 1s ease-in-out'}
          />
          <Flex flexDir={'column'} justifyContent={'space-between'}>
            <Flex flexDir={'column'} gap={'14px'}>
              {range(0, 4).map((i) => (
                <Image
                  key={i}
                  src='/assets/icons/cross.svg'
                  w={'46px'}
                  h={'46px'}
                  opacity={transitionStep >= i + 4 ? 1 : 0}
                  transition={'all 0.5s ease-in-out'}
                />
              ))}
            </Flex>
            <ScrollHint triggerAnimation={transitionStep >= 7} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default IndexHeroDesktop
