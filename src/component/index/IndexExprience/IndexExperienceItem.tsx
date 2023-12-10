import { Box, Flex, Text } from '@chakra-ui/react'

type Props = {
  date: string
  company: string
  title: string
  industry: string
  children: React.ReactNode
  isReverse?: boolean
}
const IndexExperienceItem: React.FC<Props> = (props: Props) => {
  const { date, company, title, industry, children, isReverse = false } = props

  return (
    <Flex
      w={'100%'}
      maxW={'1120px'}
      mx={'auto'}
      flexDir={'column'}
      color={'themeDark.500'}
    >
      <Flex w={'100%'} justifyContent={'space-between'} mb={'28px'}>
        <Text fontSize={'48px'}>{title}</Text>
        <Flex
          mt={'15px'}
          pl={'32px'}
          py={'12px'}
          position={'relative'}
          bg={'themeLight.900'}
        >
          <Text
            fontSize={'20px'}
            position={'absolute'}
            top={'-15px'}
            left={'32px'}
          >
            {date}
          </Text>
          <Text fontSize={'40px'}>{company}</Text>
          <Box
            w={'calc(50vw - 560px)'}
            h={'100%'}
            bg={'themeLight.900'}
            position={'absolute'}
            right={'0'}
            top={'0'}
            transform={'translateX(100%)'}
          />
        </Flex>
      </Flex>
      <Flex w={'100%'}>
        <Flex flex={10} flexDir={'column'} alignItems={'flex-start'} fontSize={'20px'}>
          {children}
        </Flex>
        <Flex
        flex={2}
        alignItems={'center'}
        justifyContent={'flex-end'}
        pr={'96px'}
        >
          <Text
            fontSize={'20px'}
            css={{
              writingMode: 'vertical-rl',
              transform: 'rotate(0deg)',
            }}
          >{industry}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default IndexExperienceItem
