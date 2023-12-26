import { Flex, Image, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

type Props = {
  triggerAnimation: boolean
}

const text = 'With some that without any product image...'

const IndexProjectSectionExtraTopFrame = (props: Props) => {
  const { triggerAnimation } = props

  const [transitionStep, setTransitionStep] = useState(0)

  useEffect(() => {
    if (triggerAnimation && transitionStep === 0) {
      for (let i = 1; i <= 50; i++) {
        setTimeout(() => {
          setTransitionStep(i)
        }, 50 * (i - 1))
      }
    }
  }, [triggerAnimation, transitionStep])

  return (
    <Flex
      w={'100%'}
      position={'relative'}
      justifyContent={'space-between'}
      mb={'35px'}
    >
      <Text fontSize={'20px'} fontStyle={'italic'}>
        {text.split('').map((c, i) => (
          <Text
            as={'span'}
            key={i}
            opacity={transitionStep * 2 >= i + 1 ? 1 : 0}
            transition={'all 0.3s ease-in-out'}
          >
            {c}
          </Text>
        ))}
      </Text>
      <Image
        src={'/assets/icons/square.svg'}
        transform={transitionStep >= 1 ? 'none' : 'rotate(225deg) scale(2.5)'}
        transition={'all 1s ease-in-out'}
      />
    </Flex>
  )
}

export default IndexProjectSectionExtraTopFrame
