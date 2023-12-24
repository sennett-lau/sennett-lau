import { RootState } from '@/store'
import { useSelector } from 'react-redux'
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
      pl={'48px'}
      pr={'48px'}
      isTriggerAnimation={subsectionId === 'projects-hero'}
    />
  )
}

export default IndexProject0xBlanc
