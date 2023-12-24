import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import IndexProjectItemFrame from './IndexProjectItemFrame'

const IndexProjectCBTWines = () => {
  const subsectionId = useSelector(
    (state: RootState) => state.controlSlice.subsectionId,
  )

  return (
    <IndexProjectItemFrame
      year={2021}
      image={'/assets/projects/cbt-landing.png'}
      imgW={'601px'}
      imgH={'726px'}
      name={'CBTWines Landing Website'}
      description={'Frontend, Backend Development'}
      stack={'NuxtJs · VueJs · Vuetify · MongoDB'}
      type={'right'}
      isTriggerAnimation={subsectionId === 'projects-duo'}
    />
  )
}

export default IndexProjectCBTWines
