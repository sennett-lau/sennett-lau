import Highlight from '@/component/common/Highlight'
import { RootState } from '@/store'
import { Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import IndexExperienceItem from './IndexExperienceItem'

const IndexExperienceKRGlobal = () => {
  const subsectionId = useSelector(
    (state: RootState) => state.controlSlice.subsectionId,
  )

  const [transitionSteps, setTransitionSteps] = useState(0)
  const [tid, setTid] = useState<NodeJS.Timeout>()

  useEffect(() => {
    if (tid && transitionSteps === 6) {
      clearInterval(tid)
    }

    if (subsectionId === 'experience-krglobal-t2' && !tid) {
      const interval = setInterval(() => {
        setTransitionSteps((prev) => prev + 1)
      }, 50)

      setTid(interval)
    }
  }, [subsectionId, transitionSteps])

  return (
    <IndexExperienceItem
      id={'experience-krglobal'}
      title={'Frontend Developer'}
      date={'July, 2021 - July, 2022'}
      company={'KR Global (Ecosa)'}
      industry={'E-commerce'}
      isTriggerAnimation={subsectionId === 'experience-krglobal-t1'}
    >
      <Text
        opacity={transitionSteps >= 1 ? 1 : 0}
        transform={transitionSteps >= 1 ? 'none' : 'translateX(-30px)'}
        transition={'all 0.3s ease-in-out'}
      >
        Involved in{' '}
        <Highlight fontSize={{ base: '20px', lg: '24px'}} fontWeight={'semibold'}>
          e-commerce
        </Highlight>{' '}
        store development for multiple countries.
      </Text>
      <Text
        opacity={transitionSteps >= 2 ? 1 : 0}
        transform={transitionSteps >= 2 ? 'none' : 'translateX(-30px)'}
        transition={'all 0.3s ease-in-out'}
      >
        Utilized technologies like{' '}
        <Highlight fontSize={{ base: '20px', lg: '24px'}} fontWeight={'semibold'}>
          NuxtJS
        </Highlight>
        ,{' '}
        <Highlight fontSize={{ base: '20px', lg: '24px'}} fontWeight={'semibold'}>
          VueJS
        </Highlight>
        ,{' '}
        <Highlight fontSize={{ base: '20px', lg: '24px'}} fontWeight={'semibold'}>
          Vuex
        </Highlight>
        ,{' '}
        <Highlight fontSize={{ base: '20px', lg: '24px'}} fontWeight={'semibold'}>
          PHP
        </Highlight>
        .
      </Text>
      <Text
        opacity={transitionSteps >= 3 ? 1 : 0}
        transform={transitionSteps >= 3 ? 'none' : 'translateX(-30px)'}
        transition={'all 0.3s ease-in-out'}
      >
        Integrated with frontend-related vendors such as{' '}
        <Highlight fontSize={{ base: '20px', lg: '24px'}} fontWeight={'semibold'}>
          VWO
        </Highlight>{' '}
        and{' '}
        <Highlight fontSize={{ base: '20px', lg: '24px'}} fontWeight={'semibold'}>
          Storyblok
        </Highlight>
        .
      </Text>
      <Text
        opacity={transitionSteps >= 4 ? 1 : 0}
        transform={transitionSteps >= 4 ? 'none' : 'translateX(-30px)'}
        transition={'all 0.3s ease-in-out'}
      >
        <Highlight fontSize={{ base: '20px', lg: '24px'}} fontWeight={'semibold'}>
          Revamped
        </Highlight>{' '}
        multilingual blog,{' '}
        <Highlight fontSize={{ base: '20px', lg: '24px'}} fontWeight={'semibold'}>
          optimizing
        </Highlight>{' '}
        page loading speed.
      </Text>
      <Text
        opacity={transitionSteps >= 5 ? 1 : 0}
        transform={transitionSteps >= 5 ? 'none' : 'translateX(-30px)'}
        transition={'all 0.3s ease-in-out'}
      >
        Worked on{' '}
        <Highlight fontSize={{ base: '20px', lg: '24px'}} fontWeight={'semibold'}>
          mobile responsive
        </Highlight>
        web applications.
      </Text>
      <Text
        opacity={transitionSteps >= 6 ? 1 : 0}
        transform={transitionSteps >= 6 ? 'none' : 'translateX(-30px)'}
        transition={'all 0.3s ease-in-out'}
      >
        Focused on{' '}
        <Highlight fontSize={{ base: '20px', lg: '24px'}} fontWeight={'semibold'}>
          enhancing page speed
        </Highlight>{' '}
        and{' '}
        <Highlight fontSize={{ base: '20px', lg: '24px'}} fontWeight={'semibold'}>
          SEO
        </Highlight>
        .
      </Text>
    </IndexExperienceItem>
  )
}

export default IndexExperienceKRGlobal
