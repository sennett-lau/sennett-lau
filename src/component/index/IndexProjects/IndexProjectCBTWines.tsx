import { useSelector } from 'react-redux'

import { RootState } from '@/store'

import IndexProjectItemFrame from './IndexProjectItemFrame'

const IndexProjectCBTWines = () => {
  const subsectionId = useSelector(
    (state: RootState) => state.controlSlice.subsectionId,
  )

  return (
    <IndexProjectItemFrame
      year={2021}
      image={'/assets/projects/cbt-landing.png'}
      imgW={{
        base: 'auto',
        lg: '601px',
      }}
      imgH={{
        base: 'auto',
        lg: '726px',
      }}
      name={'CBTWines Landing Website'}
      description={'Frontend, Backend Development'}
      stack={'NuxtJs · VueJs · Vuetify · MongoDB'}
      type={'right'}
      isTriggerAnimation={subsectionId === 'projects-duo'}
      url='https://cbtwines.co'
    />
  )
}

export default IndexProjectCBTWines
