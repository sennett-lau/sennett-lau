import IndexProjectItemFrame from './IndexProjectItemFrame'

const IndexProjectCityUGE = () => {
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
    />
  )
}

export default IndexProjectCityUGE
