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
      <Flex
        w={'100%'}
        justifyContent={'space-between'}
        mb={'28px'}
        flexDir={isReverse ? 'row-reverse' : 'row'}
      >
        <Text fontSize={'48px'}>{title}</Text>
        <Flex
          mt={'15px'}
          pl={isReverse ? '0' : '32px'}
          pr={isReverse ? '32px' : '0'}
          py={'12px'}
          position={'relative'}
          bg={'themeLight.900'}
        >
          <Text
            fontSize={'20px'}
            position={'absolute'}
            top={'-15px'}
            left={isReverse ? 'auto' : '32px'}
            right={isReverse ? '32px' : 'auto'}
          >
            {date}
          </Text>
          <Text fontSize={'40px'}>{company}</Text>
          <Box
            w={'calc(50vw - 560px)'}
            h={'100%'}
            bg={'themeLight.900'}
            position={'absolute'}
            right={isReverse ? 'auto' : '0'}
            left={isReverse ? '0' : 'auto'}
            top={'0'}
            transform={isReverse ? 'translateX(-100%)' : 'translateX(100%)'}
          />
        </Flex>
      </Flex>
      <Flex w={'100%'} flexDir={isReverse ? 'row-reverse' : 'row'}>
        <Flex
          flex={10}
          flexDir={'column'}
          alignItems={isReverse ? 'flex-end' : 'flex-start'}
          fontSize={'20px'}
        >
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
              transform: isReverse ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            {industry}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default IndexExperienceItem
