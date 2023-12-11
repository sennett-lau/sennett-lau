import IndexProjectItemFrame from './IndexProjectItemFrame'

const IndexProjectCBTWines = () => {
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
    />
  )
}

export default IndexProjectCBTWines
