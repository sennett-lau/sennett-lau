import { RootState } from '@/store'
import {
  getBackgroundColorScheme,
  getContentColorScheme,
  getIconColorScheme,
} from '@/utils'
import { Flex, Image, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import IndexExperienceKRGlobal from './IndexExperienceKRGlobal'
import IndexExperienceOzaru from './IndexExperienceOzaru'
import IndexExperienceQookia from './IndexExperienceQookia'

const IndexExperience = () => {
  const colorScheme = useSelector(
    (state: RootState) => state.controlSlice.colorScheme,
  )
  const currSectionId = useSelector(
    (state: RootState) => state.controlSlice.currSectionId,
  )

  const [isAnimationTriggered, setIsAnimationTriggered] = useState(false)

  useEffect(() => {
    if (currSectionId === 'experience' && !isAnimationTriggered) {
      setIsAnimationTriggered(true)
    }
  }, [currSectionId, isAnimationTriggered])

  return (
    <Flex
      id='experience'
      w={'100%'}
      bg={getBackgroundColorScheme(colorScheme)}
      color={getContentColorScheme(colorScheme)}
      py={'100px'}
      transition={'all 0.3s ease-in-out'}
    >
      <Flex
        w={'100%'}
        maxW={'1120px'}
        mx={'auto'}
        position={'relative'}
        flexDir={'column'}
        gap={'85px'}
        px={{
          base: '20px',
          lg: '0',
        }}
      >
        <Flex
          gap={'33px'}
          alignItems={'end'}
          opacity={isAnimationTriggered ? 1 : 0}
          transition={'all 0.3s ease-in-out'}
        >
          <Text
            fontSize={{
              base: '48px',
              lg: '96px',
            }}
            fontWeight={700}
            h={{
              base: '53px',
              lg: '106px',
            }}
          >
            Experience
          </Text>
          <Image src={getIconColorScheme('square', colorScheme)} />
        </Flex>
        <IndexExperienceQookia />
        <IndexExperienceOzaru />
        <IndexExperienceKRGlobal />
      </Flex>
    </Flex>
  )
}

export default IndexExperience
