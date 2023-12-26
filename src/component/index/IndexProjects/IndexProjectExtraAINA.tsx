import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import IndexProjectSectionExtraItemFrame from './IndexProjectSectionExtraItemFrame'

type Props = {
  triggerAnimation: boolean
}

const IndexProjectExtraAINA = (props: Props) => {
  const { triggerAnimation } = props

  const [isAnimationTriggered, setIsAnimationTriggered] = useState(false)

  useEffect(() => {
    if (triggerAnimation && !isAnimationTriggered) {
      setIsAnimationTriggered(true)
    }
  }, [triggerAnimation, isAnimationTriggered])

  return (
    <Box
      opacity={isAnimationTriggered ? 1 : 0}
      transform={isAnimationTriggered ? 'none' : 'translateX(-100px)'}
      transition={'all .5s ease-in-out'}
    >
      <IndexProjectSectionExtraItemFrame
        name={'Project AINA'}
        year={'2023'}
        stack={'Python · AWS · OpenAI API · WordPress'}
        description={
          '"Project AINA (Artificial Intelligence News Agency)" is an automated, AI-driven initiative that streamlines the collection and processing of news from diverse sources. It efficiently condenses this information into concise summaries, bullet points, and pertinent titles, and then autonomously publishes these polished updates to a WordPress website. This project emphasizes automation in news dissemination, offering rapid, easily accessible news in a digitized format, transforming the way we engage with news in the digital age.'
        }
        maxW={'610px'}
      />
    </Box>
  )
}
export default IndexProjectExtraAINA
