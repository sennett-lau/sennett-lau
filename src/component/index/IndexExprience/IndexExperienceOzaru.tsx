import Highlight from '@/component/common/Highlight'
import { Text } from '@chakra-ui/react'
import IndexExperienceItem from './IndexExperienceItem'

const IndexExperienceOzaru = () => {
  return (
    <IndexExperienceItem
      id={'experience-ozaru'}
      title={'Analyst Programmer'}
      date={'Jan, 2022 - Jan, 2023'}
      company={'Ozaru Limited'}
      industry={'Web3 & Blockchain'}
      isReverse={true}
    >
      <Text>
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          Dapp
        </Highlight>{' '}
        frontends using{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          React
        </Highlight>{' '}
        and{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          TypeScript
        </Highlight>
        .
      </Text>
      <Text>
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          Mobile app
        </Highlight>{' '}
        development with{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          React Native
        </Highlight>
        .
      </Text>
      <Text>
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          Smart contract
        </Highlight>{' '}
        development in{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          Solidity
        </Highlight>{' '}
        &{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          Hardhat
        </Highlight>
        .
      </Text>
      <Text>
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          Testing
        </Highlight>{' '}
        with{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          mocha
        </Highlight>{' '}
        and{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          chai
        </Highlight>{' '}
        in{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          Javascript
        </Highlight>
        .
      </Text>
      <Text>
        Proficiency in{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          web development
        </Highlight>{' '}
        and{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          blockchain
        </Highlight>
        technologies.
      </Text>
      <Text>
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          Serverless backend
        </Highlight>{' '}
        architecture with using{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          AWS
        </Highlight>
        .
      </Text>
      <Text>
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          Docker
        </Highlight>{' '}
        application with ECR, ECR.
      </Text>
      <Text>
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          Data scraping
        </Highlight>{' '}
        using{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          Python
        </Highlight>{' '}
        and{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          selenium
        </Highlight>
        tools.
      </Text>
    </IndexExperienceItem>
  )
}

export default IndexExperienceOzaru
