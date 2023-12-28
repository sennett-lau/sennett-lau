import { RootState } from '@/store'
import { getIconColorScheme } from '@/utils'
import { Flex, Image, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

const IndexContactDigitalSpaces = () => {
  const colorScheme = useSelector(
    (state: RootState) => state.controlSlice.colorScheme,
  )

  return (
    <Flex w={'fit-content'} flexDir={'column'} gap={'22px'}>
      <Text fontSize={'36px'} fontWeight={'bold'} lineHeight={'36px'}>
        Other Digital Spaces
      </Text>
      <Flex w={'fit-content'} gap={'8px'} alignItems={'center'}>
        <Image
          src={getIconColorScheme('linkedin', colorScheme)}
          w={'24px'}
          h={'24px'}
        />
        <Text fontSize={'24px'} lineHeight={'24px'}>
          sennett-lau
        </Text>
      </Flex>
      <Flex w={'fit-content'} gap={'8px'} alignItems={'center'}>
        <Image
          src={getIconColorScheme('github', colorScheme)}
          w={'24px'}
          h={'24px'}
        />
        <Text fontSize={'24px'} lineHeight={'24px'}>
          sennett-lau
        </Text>
      </Flex>
    </Flex>
  )
}

export default IndexContactDigitalSpaces
