import { RootState } from '@/store'
import { getBackgroundColorScheme, getContentColorScheme, getIconColorScheme } from '@/utils'
import { Flex, Image, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import IndexCertItem from './IndexCertItem'

const IndexCerts = () => {
  const colorScheme = useSelector(
    (state: RootState) => state.controlSlice.colorScheme,
  )
  const currSectionId = useSelector(
    (state: RootState) => state.controlSlice.currSectionId,
  )

  const [transitionStep, setTransitionStep] = useState(0)

  useEffect(() => {
    if (currSectionId === 'certs' && transitionStep === 0) {
      for (let i = 1; i <= 100; i++) {
        setTimeout(() => {
          setTransitionStep(i)
        }, 50 * (i - 1))
      }
    }
  }, [currSectionId, transitionStep])

  return (
    <Flex
      id='certs'
      w={'100%'}
      bg={getBackgroundColorScheme(colorScheme)}
      color={getContentColorScheme(colorScheme)}
      py={'100px'}
      minH={'105vh'}
      transition={'all 0.3s ease-in-out'}
    >
      <Flex w={'100%'} maxW={'1120px'} mx={'auto'}>
        <Flex flex={5} alignItems={'center'}>
          <Flex pr={'30px'} position={'relative'}>
            <Text fontSize={'96px'} fontWeight={'bold'}>
              {'Certs'.split('').map((c, i) => (
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
            <Image
              src={getIconColorScheme('square', colorScheme)}
              position={'absolute'}
              bottom={'38px'}
              right={'-30px'}
              transform={
                transitionStep >= 1 ? 'none' : 'rotate(225deg) scale(2.5)'
              }
              transition={'all 1s ease-in-out'}
            />
          </Flex>
        </Flex>
        <Flex
          flex={7}
          flexDir={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={'50px'}
          opacity={transitionStep >= 1 ? 1 : 0}
          transform={transitionStep >= 1 ? 'none' : 'translateX(100px)'}
          transition={'all 0.3s ease-in-out'}
        >
          <IndexCertItem
            name={'AWS Certified Solutions Architect – Associate'}
            date={'Nov 2022'}
          />
          <IndexCertItem
            name={'Cathay Hackathon 2023 - Participant'}
            date={'Nov 2023'}
            description={
              'Hackathon event with over 1500 applicants, one of the 66 finalist teams that entered the 24-hours hackathon session after 2 preliminary rounds'
            }
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default IndexCerts
