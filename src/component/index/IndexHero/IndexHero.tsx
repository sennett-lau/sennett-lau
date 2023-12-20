import { RootState } from '@/store'
import { getBackgroundColorScheme, getContentColorScheme, range } from '@/utils'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import IndexHeroNav from './IndexHeroNav'

const IndexHero = () => {
  const colorScheme = useSelector(
    (state: RootState) => state.controlSlice.colorScheme,
  )

  const [isAnimationTriggered, setIsAnimationTriggered] = useState(false)

  useEffect(() => {
    if (!isAnimationTriggered) {
      setTimeout(() => {
        setIsAnimationTriggered(true)
      }, 1000)
      setTimeout(() => {
        setInterval(() => {
          const scrollHint = document.querySelector(
            '.scroll-hint',
          ) as HTMLElement

          // move scroll hint from top to bottom
          if (scrollHint) {
            const currTransform = scrollHint.style.transform
            if (!currTransform) {
              scrollHint.style.transform = `translateY(-30px)`
              return
            }
            const currY = parseInt(
              currTransform.replace('translateY(', '').replace('px)', ''),
            )

            if (currY > 100) {
              scrollHint.style.transform = `translateY(-30px)`
            } else {
              scrollHint.style.transform = `translateY(${currY + 1}px)`
            }
          }
        }, 18)
      }, 4000)
    }
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
              w={isAnimationTriggered ? '44px' : '1120px'}
              h={isAnimationTriggered ? '44px' : '650px'}
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
                transform={isAnimationTriggered ? 'none' : 'translateX(254px)'}
                transition={'all 1s ease-in-out'}
              >
                <Text
                  fontSize={'64px'}
                  fontWeight={'400'}
                  fontFamily={'Zarathustra'}
                  transform={isAnimationTriggered ? 'none' : 'scale(2.5)'}
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
              opacity={isAnimationTriggered ? 1 : 0}
              transition={'all 1s ease-in-out'}
              transitionDelay={'0.5s'}
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
            opacity={isAnimationTriggered ? 1 : 0}
            transition={'all 1s ease-in-out'}
            transitionDelay={'0.75s'}
          />
          <Flex flexDir={'column'} justifyContent={'space-between'}>
            <Flex flexDir={'column'} gap={'14px'}>
              {range(0, 4).map((i) => (
                <Image
                  key={i}
                  src='/assets/icons/cross.svg'
                  w={'46px'}
                  h={'46px'}
                  opacity={isAnimationTriggered ? 1 : 0}
                  transition={'all 0.5s ease-in-out'}
                  transitionDelay={`${1.5 + i * 0.5}s`}
                />
              ))}
            </Flex>
            <Flex
              opacity={isAnimationTriggered ? 1 : 0}
              transition={'all 1s ease-in-out'}
              transitionDelay={'3s'}
              flexDir={'column'}
              alignItems={'flex-end'}
              gap={'6px'}
            >
              <Text
                css={{
                  writingMode: 'vertical-rl',
                }}
              >
                scroll
              </Text>
              <Box w={'24px'} h={'30px'} overflow={'hidden'}>
                <Box
                  className='scroll-hint'
                  w={'1px'}
                  h={'30px'}
                  mx={'auto'}
                  bg={getContentColorScheme(colorScheme)}
                ></Box>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default IndexHero
