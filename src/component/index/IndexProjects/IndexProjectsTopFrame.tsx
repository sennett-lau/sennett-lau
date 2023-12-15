import { RootState } from '@/store'
import { getContentColorScheme, getSquareColorScheme } from '@/utils'
import { Box, Image } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

const IndexProjectsTopFrame = () => {
  const colorScheme = useSelector(
    (state: RootState) => state.controlSlice.colorScheme,
  )
  
  return (
    <Box w={'100%'} position={'relative'} h={'74px'}>
      <Image
        src={getSquareColorScheme(colorScheme)}
        position={'absolute'}
        top={'0'}
        left={'0'}
      />
      <Box
        w={'44px'}
        h={'44px'}
        borderRight={'1px solid'}
        borderTop={'1px solid'}
        borderColor={getContentColorScheme(colorScheme)}
        position={'absolute'}
        top={'0'}
        right={'0'}
      />
    </Box>
  )
}

export default IndexProjectsTopFrame
