import Highlight from '@/component/common/Highlight'
import { RootState } from '@/store'
import { Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import IndexExperienceItem from './IndexExperienceItem'

const IndexExperienceQookia = () => {
  const subsectionId = useSelector(
    (state: RootState) => state.controlSlice.subsectionId,
  )

  const [transitionSteps, setTransitionSteps] = useState(0)
  const [tid, setTid] = useState<NodeJS.Timeout>()

  useEffect(() => {
    if (tid && transitionSteps === 7) {
      clearInterval(tid)
    }

    if (subsectionId === 'experience-qookia-t2' && !tid) {
      const interval = setInterval(() => {
        setTransitionSteps((prev) => prev + 1)
      }, 50)

      setTid(interval)
    }
  }, [subsectionId, transitionSteps])

  return (
    <IndexExperienceItem
      id={'experience-qookia'}
      title={'FullStack Developer'}
      date={'Feb, 2023 - Present'}
      company={'Qookia Limited'}
      industry={'Mobile Game'}
      isTriggerAnimation={subsectionId === 'experience-qookia-t1'}
    >
      <Text
        opacity={transitionSteps >= 1 ? 1 : 0}
        transform={transitionSteps >= 1 ? 'none' : 'translateX(-30px)'}
        transition={'all 0.3s ease-in-out'}
      >
        Expertise in{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          TypeScript
        </Highlight>
        ,{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          VueTerraformJS
        </Highlight>
        ,{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          Kubernetes
        </Highlight>
        .
      </Text>
      <Text
        opacity={transitionSteps >= 2 ? 1 : 0}
        transform={transitionSteps >= 2 ? 'none' : 'translateX(-30px)'}
        transition={'all 0.3s ease-in-out'}
      >
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          Backend
        </Highlight>
        application development and{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          Docker orchestrationing
        </Highlight>
        .
      </Text>
      <Text
        opacity={transitionSteps >= 3 ? 1 : 0}
        transform={transitionSteps >= 3 ? 'none' : 'translateX(-30px)'}
        transition={'all 0.3s ease-in-out'}
      >
        Designing{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          Kubernetes
        </Highlight>
        -based{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          distributed
        </Highlight>{' '}
        systems.
      </Text>
      <Text
        opacity={transitionSteps >= 4 ? 1 : 0}
        transform={transitionSteps >= 4 ? 'none' : 'translateX(-30px)'}
        transition={'all 0.3s ease-in-out'}
      >
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          CI/CD
        </Highlight>{' '}
        pipeline setup and optimization with{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          GitLab CI
        </Highlight>
        .
      </Text>
      <Text
        opacity={transitionSteps >= 5 ? 1 : 0}
        transform={transitionSteps >= 5 ? 'none' : 'translateX(-30px)'}
        transition={'all 0.3s ease-in-out'}
      >
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          Data analytics pipeline
        </Highlight>{' '}
        design and implementation using{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          AWS
        </Highlight>
        .
      </Text>
      <Text
        opacity={transitionSteps >= 6 ? 1 : 0}
        transform={transitionSteps >= 6 ? 'none' : 'translateX(-30px)'}
        transition={'all 0.3s ease-in-out'}
      >
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          Cost reduction
        </Highlight>{' '}
        in AWS with DevOps engineers.
      </Text>
      <Text
        opacity={transitionSteps >= 7 ? 1 : 0}
        transform={transitionSteps >= 7 ? 'none' : 'translateX(-30px)'}
        transition={'all 0.3s ease-in-out'}
      >
        Database{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          query optimization
        </Highlight>
        for enhanced performance.
      </Text>
    </IndexExperienceItem>
  )
}

export default IndexExperienceQookia
