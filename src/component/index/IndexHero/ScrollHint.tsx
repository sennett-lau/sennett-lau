import { RootState } from '@/store'
import { getContentColorScheme } from '@/utils'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

type Props = {
  triggerAnimation: boolean
  classSuffix?: string
}

const ScrollHint = (prop: Props) => {
  const { triggerAnimation, classSuffix } = prop

  const colorScheme = useSelector(
    (state: RootState) => state.controlSlice.colorScheme,
  )

  const [tid, setTid] = useState<NodeJS.Timeout>()

  useEffect(() => {
    if (triggerAnimation && !tid) {
      const interval = setInterval(() => {
        const scrollHint = document.querySelector(`.scroll-hint-${classSuffix}`) as HTMLElement

        console.log(scrollHint)

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

          if (currY > 55) {
            scrollHint.style.transform = `translateY(-30px)`
          } else {
            scrollHint.style.transform = `translateY(${currY + 1}px)`
          }
        }
      }, 15)

      setTid(interval)
    }
  }, [triggerAnimation, tid])

  return (
    <Flex
      opacity={triggerAnimation ? 1 : 0}
      transition={'all 1s ease-in-out'}
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
          className={`scroll-hint-${classSuffix}`}
          w={'1px'}
          h={'30px'}
          mx={'auto'}
          bg={getContentColorScheme(colorScheme)}
        ></Box>
      </Box>
    </Flex>
  )
}

export default ScrollHint
