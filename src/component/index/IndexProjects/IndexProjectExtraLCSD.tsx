import { Box, Link } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import IndexProjectSectionExtraItemFrame from './IndexProjectSectionExtraItemFrame'

type Props = {
  triggerAnimation: boolean
}

const IndexProjectExtraLCSD = (props: Props) => {
  const { triggerAnimation } = props

  const [isAnimationTriggered, setIsAnimationTriggered] = useState(false)

  useEffect(() => {
    if (triggerAnimation && !isAnimationTriggered) {
      setIsAnimationTriggered(true)
    }
  }, [triggerAnimation, isAnimationTriggered])
  return (
    <Link
      href='https://github.com/sennett-lau/lcsd-captcha-dataset'
      target='_blank'
      textDecor={'none'}
      _hover={{
        textDecor: 'none',
      }}
    >
      <Box
        opacity={isAnimationTriggered ? 1 : 0}
        transform={isAnimationTriggered ? 'none' : 'translateX(100px)'}
        transition={'all .5s ease-in-out'}
      >
        <IndexProjectSectionExtraItemFrame
          name={'LCSD Captcha Solver'}
          year={'2022'}
          stack={'Python · Tensorflow'}
          description={
            "A dockerized service that employs deep learning to solve captchas for the Leisure and Cultural Services Department (LCSD) of Hong Kong SAR Government's Online Booking system. It utilizes OpenCV for image processing and an attention-based OCR (Optical Character Recognition) deep learning model developed with TensorFlow and TensorFlow Serving. The project focuses on fine-tuning the deep learning model to effectively decipher the captchas used by LCSD's system."
          }
          maxW={{
            base: '610px',
            lg: '450px',
          }}
          isReverse={true}
        />
      </Box>
    </Link>
  )
}
export default IndexProjectExtraLCSD
