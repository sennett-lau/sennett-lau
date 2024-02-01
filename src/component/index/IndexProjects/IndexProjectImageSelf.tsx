import { Flex, Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

type Props = {
  triggerAnimation: boolean
}

const IndexProjectImageSelf = (props: Props) => {
  const { triggerAnimation } = props

  const [isAnimationTriggered, setIsAnimationTriggered] = useState(false)

  useEffect(() => {
    if (triggerAnimation && !isAnimationTriggered) {
      setIsAnimationTriggered(true)
    }
  }, [triggerAnimation, isAnimationTriggered])

  return (
    <Flex w={'340px'} h={'264px'} gap={'8px'}>
      <Image
        src={'/assets/me/a.png'}
        w={'50px'}
        h={'212px'}
        mt={'33px'}
        opacity={isAnimationTriggered ? 1 : 0}
        transform={
          isAnimationTriggered ? 'translateY(0px)' : 'translateY(100px)'
        }
        transition={'all .5s ease-in-out'}
      />
      <Image
        src={'/assets/me/b.png'}
        w={'50px'}
        h={'212px'}
        mt={'52px'}
        opacity={isAnimationTriggered ? 1 : 0}
        transform={
          isAnimationTriggered ? 'translateY(0px)' : 'translateY(-100px)'
        }
        transition={'all .5s ease-in-out'}
      />
      <Image
        src={'/assets/me/c.png'}
        w={'50px'}
        h={'212px'}
        mt={'19px'}
        opacity={isAnimationTriggered ? 1 : 0}
        transform={
          isAnimationTriggered ? 'translateY(0px)' : 'translateY(100px)'
        }
        transition={'all .5s ease-in-out'}
      />
      <Image
        src={'/assets/me/d.png'}
        w={'50px'}
        h={'212px'}
        mt={'40px'}
        opacity={isAnimationTriggered ? 1 : 0}
        transform={
          isAnimationTriggered ? 'translateY(0px)' : 'translateY(-100px)'
        }
        transition={'all .5s ease-in-out'}
      />
      <Image
        src={'/assets/me/e.png'}
        w={'50px'}
        h={'212px'}
        mt={'0px'}
        opacity={isAnimationTriggered ? 1 : 0}
        transform={
          isAnimationTriggered ? 'translateY(0px)' : 'translateY(100px)'
        }
        transition={'all .5s ease-in-out'}
      />
      <Image
        src={'/assets/me/f.png'}
        w={'50px'}
        h={'212px'}
        mt={'40px'}
        opacity={isAnimationTriggered ? 1 : 0}
        transform={
          isAnimationTriggered ? 'translateY(0px)' : 'translateY(-100px)'
        }
        transition={'all .5s ease-in-out'}
      />
    </Flex>
  )
}

export default IndexProjectImageSelf
