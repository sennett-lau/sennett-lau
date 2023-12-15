import { Flex, Image, Text } from '@chakra-ui/react'

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
  } = props

  return (
    <Flex flexDir={'column'} w={'fit-content'} pl={pl} pr={pr}>
      <Flex
        w={'100%'}
        justifyContent={'flex-end'}
        alignItems={'center'}
        mb={'8px'}
      >
        <Text fontSize={'16px'}>{year}</Text>
      </Flex>
      <Image src={image} w={imgW} h={imgH} mb={'16px'} />
      <Flex
        w={'100%'}
        textAlign={type === 'left' ? 'left' : 'end'}
        flexDir={'column'}
        gap={'8px'}
      >
        <Text fontSize={'24px'} lineHeight={'24px'} fontWeight={'semibold'}>
          {name}
        </Text>
        <Text fontSize={'20px'} lineHeight={'20px'}>
          {description}
        </Text>
        <Text fontSize={'16px'} lineHeight={'16px'}>
          {stack}
        </Text>
      </Flex>
    </Flex>
  )
}

export default IndexProjectItemFrame
