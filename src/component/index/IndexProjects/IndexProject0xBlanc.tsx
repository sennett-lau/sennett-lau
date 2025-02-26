import { useSelector } from 'react-redux'

import { RootState } from '@/store'

import IndexProjectItemFrame from './IndexProjectItemFrame'

const IndexProject0xBlanc = () => {
  const subsectionId = useSelector(
    (state: RootState) => state.controlSlice.subsectionId,
  )

  return (
    <IndexProjectItemFrame
      year={2023}
      image={'/assets/projects/0xblanc-landing.png'}
      name={'0xBlanc Landing Website'}
      description={'Frontend Development'}
      stack={'NextJs · ChakraUI'}
      type={'left'}
      pl={{
        base: '4px',
        lg: '48px',
      }}
      pr={{
        base: '0',
        lg: '48px',
      }}
      isTriggerAnimation={subsectionId === 'projects-hero'}
      url='https://0xblanc.io/'
    />
  )
}

export default IndexProject0xBlanc
