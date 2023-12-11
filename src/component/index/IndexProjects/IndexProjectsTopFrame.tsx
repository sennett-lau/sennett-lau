import { Box, Image } from '@chakra-ui/react'

const IndexProjectsTopFrame = () => {
  return (
    <Box w={'100%'} position={'relative'} h={'74px'}>
      <Image
        src='/assets/icons/square.svg'
        position={'absolute'}
        top={'0'}
        left={'0'}
      />
      <Box
        w={'44px'}
        h={'44px'}
        borderRight={'1px solid'}
        borderTop={'1px solid'}
        borderColor={'themeLight.500'}
        position={'absolute'}
        top={'0'}
        right={'0'}
      />
    </Box>
  )
}

export default IndexProjectsTopFrame
