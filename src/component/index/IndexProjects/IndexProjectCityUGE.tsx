import { useSelector } from 'react-redux'

import { RootState } from '@/store'

import IndexProjectItemFrame from './IndexProjectItemFrame'

const IndexProjectCityUGE = () => {
  const subsectionId = useSelector(
    (state: RootState) => state.controlSlice.subsectionId,
  )

  return (
    <IndexProjectItemFrame
      year={2022}
      image={'/assets/projects/cityu-ge.png'}
      imgW={{
        base: 'auto',
        lg: '470px',
      }}
      imgH={{
        base: 'auto',
        lg: '540px',
      }}
      name={'CityU GE Guide'}
      description={'Frontend, Backend Development'}
      stack={'NuxtJs · TailwindCSS · Fastify · MongoDB'}
      type={'left'}
      isTriggerAnimation={subsectionId === 'projects-duo'}
      url='https://cityuge.com'
    />
  )
}

export default IndexProjectCityUGE
