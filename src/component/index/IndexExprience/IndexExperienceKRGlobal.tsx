import Highlight from '@/component/common/Highlight'
import { Text } from '@chakra-ui/react'
import IndexExperienceItem from './IndexExperienceItem'

const IndexExperienceKRGlobal = () => {
  return (
    <IndexExperienceItem
      id={'experience-krglobal'}
      title={'Frontend Developer'}
      date={'July, 2021 - July, 2022'}
      company={'KR Global (Ecosa)'}
      industry={'E-commerce'}
    >
      <Text>
        Involved in{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          e-commerce
        </Highlight>{' '}
        store development for multiple countries.
      </Text>
      <Text>
        Utilized technologies like{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          NuxtJS
        </Highlight>
        ,{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          VueJS
        </Highlight>
        ,{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          Vuex
        </Highlight>
        ,{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          PHP
        </Highlight>
        .
      </Text>
      <Text>
        Integrated with frontend-related vendors such as{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          VWO
        </Highlight>{' '}
        and{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          Storyblok
        </Highlight>
        .
      </Text>
      <Text>
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          Revamped
        </Highlight>{' '}
        multilingual blog,{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          optimizing
        </Highlight>{' '}
        page loading speed.
      </Text>
      <Text>
        Worked on{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          mobile responsive
        </Highlight>
        web applications.
      </Text>
      <Text>
        Focused on{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          enhancing page speed
        </Highlight>{' '}
        and{' '}
        <Highlight fontSize={'24px'} fontWeight={'semibold'}>
          SEO
        </Highlight>
        .
      </Text>
    </IndexExperienceItem>
  )
}

export default IndexExperienceKRGlobal
