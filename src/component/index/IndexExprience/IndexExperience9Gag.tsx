import Highlight from '@/component/common/Highlight'
import { RootState } from '@/store'
import { Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import IndexExperienceItem from './IndexExperienceItem'

const IndexExperienceOzaru = () => {
  const subsectionId = useSelector(
    (state: RootState) => state.controlSlice.subsectionId,
  )

  const [transitionSteps, setTransitionSteps] = useState(0)
  const [tid, setTid] = useState<NodeJS.Timeout>()

  useEffect(() => {
    if (tid && transitionSteps === 9) {
      clearInterval(tid)
    }

    if (subsectionId === 'experience-9gag-t2' && !tid) {
      const interval = setInterval(() => {
        setTransitionSteps((prev) => prev + 1)
      }, 50)

      setTid(interval)
    }
  }, [subsectionId, transitionSteps])

  return (
    <IndexExperienceItem
      id={'experience-9gag'}
      title={'FullStack Developer'}
      date={'May, 2024 - Present'}
      company={'9GAG | Memeland'}
      industry={'Web3 & Blockchain'}
      isTriggerAnimation={subsectionId === 'experience-9gag-t1'}
    >
      <Text
        opacity={transitionSteps >= 1 ? 1 : 0}
        transform={transitionSteps >= 1 ? 'none' : 'translateX(30px)'}
        transition={'all 0.3s ease-in-out'}
      >
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          TypeScript, React
        </Highlight>{' '}
        based{' '}
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          fullstack
        </Highlight>{' '}
        applications.
      </Text>
      <Text
        opacity={transitionSteps >= 2 ? 1 : 0}
        transform={transitionSteps >= 2 ? 'none' : 'translateX(30px)'}
        transition={'all 0.3s ease-in-out'}
      >
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          Develop and design{' '}
        </Highlight>{' '}
        backend solutions with{' '}
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          CloudFlare edge services
        </Highlight>
        .
      </Text>
      <Text
        opacity={transitionSteps >= 3 ? 1 : 0}
        transform={transitionSteps >= 3 ? 'none' : 'translateX(30px)'}
        transition={'all 0.3s ease-in-out'}
      >
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          Data tracking
        </Highlight>{' '}
        ,{' '}
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          scraping
        </Highlight>{' '}
        , and{' '}
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          cleaning
        </Highlight>
        .
      </Text>
      <Text
        opacity={transitionSteps >= 4 ? 1 : 0}
        transform={transitionSteps >= 4 ? 'none' : 'translateX(30px)'}
        transition={'all 0.3s ease-in-out'}
      >
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          Design
        </Highlight>{' '}
        and{' '}
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          develop testing strategies
        </Highlight>{' '}
        to ensure{' '}
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          software reliability
        </Highlight>
        .
      </Text>
      <Text
        opacity={transitionSteps >= 4 ? 1 : 0}
        transform={transitionSteps >= 4 ? 'none' : 'translateX(30px)'}
        transition={'all 0.3s ease-in-out'}
      >
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          Logging pipeline
        </Highlight>{' '}
        with{' '}
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          Datadog
        </Highlight>{' '}
        for software{' '}
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          monitoring
        </Highlight>
        .
      </Text>
    </IndexExperienceItem>
  )
}

export default IndexExperienceOzaru
