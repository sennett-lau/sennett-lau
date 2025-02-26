import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Text } from '@chakra-ui/react'

import Highlight from '@/component/common/Highlight'
import { RootState } from '@/store'

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

    if (subsectionId === 'experience-ozaru-t2' && !tid) {
      const interval = setInterval(() => {
        setTransitionSteps((prev) => prev + 1)
      }, 50)

      setTid(interval)
    }
  }, [subsectionId, transitionSteps, tid])

  return (
    <IndexExperienceItem
      id={'experience-ozaru'}
      title={'Analyst Programmer'}
      date={'Jan, 2022 - Jan, 2023'}
      company={'Ozaru Limited'}
      industry={'Web3 & Blockchain'}
      isTriggerAnimation={subsectionId === 'experience-ozaru-t1'}
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
          Dapp
        </Highlight>{' '}
        frontends using{' '}
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          React
        </Highlight>{' '}
        and{' '}
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          TypeScript
        </Highlight>
        .
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
          Mobile app
        </Highlight>{' '}
        development with{' '}
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          React Native
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
          Smart contract
        </Highlight>{' '}
        development in{' '}
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          Solidity
        </Highlight>{' '}
        &{' '}
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          Hardhat
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
          Testing
        </Highlight>{' '}
        with{' '}
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          mocha
        </Highlight>{' '}
        and{' '}
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          chai
        </Highlight>{' '}
        in{' '}
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          Javascript
        </Highlight>
        .
      </Text>
      <Text
        opacity={transitionSteps >= 5 ? 1 : 0}
        transform={transitionSteps >= 5 ? 'none' : 'translateX(30px)'}
        transition={'all 0.3s ease-in-out'}
      >
        Proficiency in{' '}
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          web development
        </Highlight>{' '}
        and{' '}
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          blockchain
        </Highlight>{' '}
        technologies.
      </Text>
      <Text
        opacity={transitionSteps >= 6 ? 1 : 0}
        transform={transitionSteps >= 6 ? 'none' : 'translateX(30px)'}
        transition={'all 0.3s ease-in-out'}
      >
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          Serverless backend
        </Highlight>{' '}
        architecture with using{' '}
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          AWS
        </Highlight>
        .
      </Text>
      <Text
        opacity={transitionSteps >= 7 ? 1 : 0}
        transform={transitionSteps >= 7 ? 'none' : 'translateX(30px)'}
        transition={'all 0.3s ease-in-out'}
      >
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          Docker
        </Highlight>{' '}
        application with ECR, ECR.
      </Text>
      <Text
        opacity={transitionSteps >= 8 ? 1 : 0}
        transform={transitionSteps >= 8 ? 'none' : 'translateX(30px)'}
        transition={'all 0.3s ease-in-out'}
      >
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          Data scraping
        </Highlight>{' '}
        using{' '}
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          Python
        </Highlight>{' '}
        and{' '}
        <Highlight
          fontSize={{ base: '20px', lg: '24px' }}
          fontWeight={'semibold'}
        >
          Selenium
        </Highlight>{' '}
        tools.
      </Text>
    </IndexExperienceItem>
  )
}

export default IndexExperienceOzaru
