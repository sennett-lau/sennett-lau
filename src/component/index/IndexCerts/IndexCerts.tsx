import { Flex, Image, Text } from '@chakra-ui/react'
import IndexCertItem from './IndexCertItem'

const IndexCerts = () => {
  return (
    <Flex
      id='certs'
      w={'100%'}
      bg={'themeLight.500'}
      py={'100px'}
      minH={'105vh'}
    >
      <Flex w={'100%'} maxW={'1120px'} mx={'auto'}>
        <Flex flex={5} alignItems={'center'}>
          <Flex pr={'30px'} position={'relative'}>
            <Text fontSize={'96px'} fontWeight={'bold'} color={'themeDark.500'}>
              Certs
            </Text>
            <Image
              src={'/assets/icons/square-dark.svg'}
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
