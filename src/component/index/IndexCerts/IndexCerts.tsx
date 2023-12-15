import { RootState } from '@/store'
import { getBackgroundColorScheme, getContentColorScheme, getSquareColorScheme } from '@/utils'
import { Flex, Image, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import IndexCertItem from './IndexCertItem'

const IndexCerts = () => {
  const colorScheme = useSelector(
    (state: RootState) => state.controlSlice.colorScheme,
  )

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
              Certs
            </Text>
            <Image
              src={getSquareColorScheme(colorScheme)}
              position={'absolute'}
              bottom={'38px'}
              right={'-30px'}
            />
          </Flex>
        </Flex>
        <Flex
          flex={7}
          flexDir={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={'50px'}
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
