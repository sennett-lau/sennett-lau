import { Flex, Text } from '@chakra-ui/react'

type Props = {
  name: string
  year: string
  stack: string
  description: string
  maxW?: string
  link?: string
  isReverse?: boolean
}

const IndexProjectSectionExtraItemFrame = (props: Props) => {
  const {
    name,
    year,
    stack,
    description,
    maxW,
    link,
    isReverse = false,
  } = props

  return (
    <Flex
      flexDir={'column'}
      maxW={maxW ? maxW : 'auto'}
      color={'themeLight.500'}
    >
      <Flex
        justifyContent={'space-between'}
        alignItems={'center'}
        flexDir={isReverse ? 'row-reverse' : 'row'}
        mb={'8px'}
      >
        <Text fontSize={'24px'} lineHeight={'24px'} fontWeight={'semibold'}>
          {name}
        </Text>
        <Text fontSize={'16px'} lineHeight={'16px'}>
          {year}
        </Text>
      </Flex>
      <Text fontSize={'20px'} lineHeight={'20px'} mb={'8px'}>
        {stack}
      </Text>
      <Text fontSize={'16px'} lineHeight={'20px'} textAlign={'justify'}>
        {description}
      </Text>
    </Flex>
  )
}

export default IndexProjectSectionExtraItemFrame
