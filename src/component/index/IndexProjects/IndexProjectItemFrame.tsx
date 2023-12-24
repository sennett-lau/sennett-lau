import { Flex, Image, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

type Props = {
  year: number
  image: string
  imgW?: string
  imgH?: string
  name: string
  description: string
  stack: string
  type: 'left' | 'right'
  pl?: string
  pr?: string
  isTriggerAnimation: boolean
}

const IndexProjectItemFrame = (props: Props) => {
  const {
    year,
    image,
    imgW = 'auto',
    imgH = 'auto',
    name,
    description,
    stack,
    type,
    pl = '0',
    pr = '0',
    isTriggerAnimation,
  } = props

  const [transitionStep, setTransitionStep] = useState(0)

  useEffect(() => {
    if (isTriggerAnimation && transitionStep === 0) {
      for (let i = 1; i <= 50; i++) {
        setTimeout(() => {
          setTransitionStep(i)
        }, 50 * (i - 1))
      }
    }
  }, [isTriggerAnimation, transitionStep])

  return (
    <Flex flexDir={'column'} w={'fit-content'} pl={pl} pr={pr}>
      <Flex
        w={'100%'}
        justifyContent={'flex-end'}
        alignItems={'center'}
        mb={'8px'}
      >
        <Text fontSize={'16px'}>
          {year
            .toString()
            .split('')
            .map((c, i) => (
              <Text
                as={'span'}
                key={i}
                opacity={transitionStep >= i + 1 ? 1 : 0}
                transition={'all 0.3s ease-in-out'}
              >
                {c}
              </Text>
            ))}
        </Text>
      </Flex>
      <Image
        src={image}
        w={imgW}
        h={imgH}
        mb={'16px'}
        opacity={transitionStep >= 1 ? 1 : 0}
        transition={'all 0.3s ease-in-out'}
      />
      <Flex
        w={'100%'}
        textAlign={type === 'left' ? 'left' : 'end'}
        flexDir={'column'}
        gap={'8px'}
      >
        <Text fontSize={'24px'} lineHeight={'24px'} fontWeight={'semibold'}>
          {name.split('').map((c, i) => (
            <Text
              as={'span'}
              key={i}
              opacity={transitionStep >= i + 1 ? 1 : 0}
              transition={'all 0.3s ease-in-out'}
            >
              {c}
            </Text>
          ))}
        </Text>
        <Text fontSize={'20px'} lineHeight={'20px'}>
          {description.split('').map((c, i) => (
            <Text
              as={'span'}
              key={i}
              opacity={transitionStep >= i + 1 ? 1 : 0}
              transition={'all 0.3s ease-in-out'}
            >
              {c}
            </Text>
          ))}
        </Text>
        <Text fontSize={'16px'} lineHeight={'16px'}>
          {stack.split('').map((c, i) => (
            <Text
              as={'span'}
              key={i}
              opacity={transitionStep >= i + 1 ? 1 : 0}
              transition={'all 0.3s ease-in-out'}
            >
              {c}
            </Text>
          ))}
        </Text>
      </Flex>
    </Flex>
  )
}

export default IndexProjectItemFrame
