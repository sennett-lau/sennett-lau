import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import IndexProjectItemFrame from './IndexProjectItemFrame'

const IndexProjectCityUGE = () => {
  const subsectionId = useSelector(
    (state: RootState) => state.controlSlice.subsectionId,
  )

  return (
    <IndexProjectItemFrame
      year={2022}
      image={'/assets/projects/cityu-ge.png'}
      imgW={'470px'}
      imgH={'540px'}
      name={'CityU GE Guide'}
      description={'Frontend, Backend Development'}
      stack={'NuxtJs · TailwindCSS · Fastify · MongoDB'}
      type={'left'}
      isTriggerAnimation={subsectionId === 'projects-duo'}
    />
  )
}

export default IndexProjectCityUGE
