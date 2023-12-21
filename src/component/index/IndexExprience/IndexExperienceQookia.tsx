import Highlight from '@/component/common/Highlight'
import { Text } from '@chakra-ui/react'
import IndexExperienceItem from './IndexExperienceItem'

const IndexExperienceQookia = () => {
  return (
    <IndexExperienceItem
      id={'experience-qookia'}
      title={'FullStack Developer'}
      date={'Feb, 2023 - Present'}
      company={'Qookia Limited'}
      industry={'Mobile Game'}
    >
      <Text>
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
      <Text>
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          Backend
        </Highlight>
        application development and{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          Docker orchestrationing
        </Highlight>
        .
      </Text>
      <Text>
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
      <Text>
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          CI/CD
        </Highlight>{' '}
        pipeline setup and optimization with{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          GitLab CI
        </Highlight>
        .
      </Text>
      <Text>
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          Data analytics pipeline
        </Highlight>{' '}
        design and implementation using{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          AWS
        </Highlight>
        .
      </Text>
      <Text>
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          Cost reduction
        </Highlight>{' '}
        in AWS with DevOps engineers.
      </Text>
      <Text>
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
