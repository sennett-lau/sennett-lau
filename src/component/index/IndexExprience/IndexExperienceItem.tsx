import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Box, Flex, Text } from '@chakra-ui/react'

import { RootState } from '@/store'

type Props = {
  id: string
  date: string
  company: string
  title: string
  industry: string
  children: React.ReactNode
  isReverse?: boolean
  isTriggerAnimation: boolean
}
const IndexExperienceItem: React.FC<Props> = (props: Props) => {
  const {
    id,
    date,
    company,
    title,
    industry,
    children,
    isReverse = false,
    isTriggerAnimation,
  } = props

  const colorScheme = useSelector(
    (state: RootState) => state.controlSlice.colorScheme,
  )

  const [transitionStep, setTransitionStep] = useState(0)

  useEffect(() => {
    if (isTriggerAnimation && transitionStep === 0) {
      setTransitionStep(1)
      for (let i = 2; i <= 50; i++) {
        setTimeout(() => {
          setTransitionStep(i)
        }, 50 * (i - 1))
      }
    }
  }, [isTriggerAnimation, transitionStep])

  return (
    <Flex id={id} w={'100%'} maxW={'1120px'} mx={'auto'} flexDir={'column'}>
      <Flex
        w={'100%'}
        justifyContent={'space-between'}
        mb={'28px'}
        flexDir={{
          base: 'column',
          lg: isReverse ? 'row-reverse' : 'row',
        }}
      >
        <Text
          fontSize={{
            base: '32px',
            lg: '48px',
          }}
        >
          {title.split('').map((c, i) => (
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
        <Flex
          mt={'15px'}
          pl={isReverse ? '0' : '32px'}
          pr={isReverse ? '32px' : '0'}
          py={'12px'}
          position={'relative'}
          bg={colorScheme === 'light' ? 'themeLight.900' : 'themeDark.900'}
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
          <Text fontSize={'40px'}>
            {company.split('').map((c, i) => (
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
          <Box
            w={{
              base: '100%',
              lg: 'calc(50vw - 560px)',
            }}
            h={'100%'}
            bg={colorScheme === 'light' ? 'themeLight.900' : 'themeDark.900'}
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
          alignItems={{
            base: 'flex-start',
            lg: isReverse ? 'flex-end' : 'flex-start',
          }}
          fontSize={{
            base: '18px',
            lg: '20px',
          }}
        >
          {children}
        </Flex>
        <Flex
          flex={2}
          alignItems={'center'}
          justifyContent={'flex-end'}
          pr={'96px'}
          display={{
            base: 'none',
            lg: 'flex',
          }}
        >
          <Text
            fontSize={'20px'}
            css={{
              writingMode: 'vertical-rl',
              transform: isReverse ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            {industry.split('').map((c, i) => (
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
    </Flex>
  )
}

export default IndexExperienceItem
