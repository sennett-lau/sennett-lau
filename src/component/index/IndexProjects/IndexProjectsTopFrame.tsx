import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Box, Image } from '@chakra-ui/react'

import { RootState } from '@/store'
import { getContentColorScheme, getIconColorScheme } from '@/utils'

const IndexProjectsTopFrame = () => {
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
    <Box w={'100%'} position={'relative'} h={'74px'}>
      <Image
        src={getIconColorScheme('square', colorScheme)}
        position={'absolute'}
        top={'0'}
        left={'0'}
        transform={transitionStep >= 1 ? 'scale(1)' : 'scale(6.5)'}
        transition={'all 1.0s ease-in-out'}
        alt='square'
      />
      <Box
        w={transitionStep >= 1 ? '44px' : '1000px'}
        h={transitionStep >= 1 ? '44px' : '0'}
        borderRight={'1px solid'}
        borderTop={'1px solid'}
        borderColor={getContentColorScheme(colorScheme)}
        position={'absolute'}
        top={'0'}
        right={'0'}
        transition={'all 1.5s ease-in-out'}
      />
    </Box>
  )
}

export default IndexProjectsTopFrame
