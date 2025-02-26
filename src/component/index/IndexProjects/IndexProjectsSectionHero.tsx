import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Flex, Image, Text } from '@chakra-ui/react'

import { RootState } from '@/store'
import { getIconColorScheme } from '@/utils'

import IndexProject0xBlanc from './IndexProject0xBlanc'

const IndexProjectsSectionHero = () => {
  const colorScheme = useSelector(
    (state: RootState) => state.controlSlice.colorScheme,
  )
  const currSectionId = useSelector(
    (state: RootState) => state.controlSlice.currSectionId,
  )

  const [transitionStep, setTransitionStep] = useState(0)

  useEffect(() => {
    if (currSectionId === 'projects' && transitionStep === 0) {
      setTransitionStep(1)
    }
  }, [currSectionId, transitionStep])

  return (
    <Flex w={'100%'}>
      <Flex flex={1} justifyContent={'center'} alignItems={'center'}>
        <Flex pt={'58px'} position={'relative'}>
          <Text
            fontSize={{
              base: '64px',
              lg: '96px',
            }}
            fontWeight={700}
            ml={{
              base: 0,
              lg: '30px',
            }}
            css={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
            }}
            mb={'0'}
            opacity={transitionStep >= 1 ? 1 : 0}
            transition={'all 0.5s ease-in-out'}
          >
            Projects
          </Text>
          <Image
            src={getIconColorScheme('square', colorScheme)}
            position={'absolute'}
            top={'0'}
            right={{
              base: '26px',
              lg: '38px',
            }}
            transform={transitionStep >= 1 ? 'scale(1)' : 'scale(0)'}
            transition={'all 1s ease-in-out'}
          />
        </Flex>
      </Flex>
      <Flex w={'75%'}>
        <IndexProject0xBlanc />
      </Flex>
    </Flex>
  )
}

export default IndexProjectsSectionHero
