import { RootState } from '@/store'
import { Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const description =
  'Also as a member of technical solution team 0xBlanc. Provides web3, tranditional web and AI solutions, since 2022.'
const stack = 'NextJs · ChakraUI · Solidity · Hardhat · Python · AWS'

const IndexProjectQuote = () => {
  const subsectionId = useSelector(
    (state: RootState) => state.controlSlice.subsectionId,
  )

  const [transitionStep, setTransitionStep] = useState(0)

  useEffect(() => {
    if (subsectionId === 'projects-quote' && transitionStep === 0) {
      for (let i = 1; i <= 100; i++) {
        setTimeout(() => {
          setTransitionStep(i)
        }, 50 * (i - 1))
      }
    }
  }, [subsectionId, transitionStep])

  return (
    <Flex
      w={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDir={'column'}
      my={'60px'}
      id={'projects-quote'}
    >
      <Text
        fontSize={'20px'}
        lineHeight={'22px'}
        mb={'8px'}
        textAlign={{
          base: 'center',
          lg: 'left',
        }}
      >
        {description.split('').map((c, i) => (
          <Text
            as={'span'}
            key={i}
            opacity={transitionStep * 3 >= i + 1 ? 1 : 0}
            transition={'all 0.3s ease-in-out'}
          >
            {c}
          </Text>
        ))}
      </Text>
      <Text
        fontSize={'16px'}
        lineHeight={'16px'}
        textAlign={{
          base: 'center',
          lg: 'left',
        }}
      >
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
  )
}

export default IndexProjectQuote
