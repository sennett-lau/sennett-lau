import { useSelector } from 'react-redux'

import { Flex, Image, Link, Text } from '@chakra-ui/react'

import { RootState } from '@/store'
import { getIconColorScheme } from '@/utils'

const IndexContactDigitalSpaces = () => {
  const colorScheme = useSelector(
    (state: RootState) => state.controlSlice.colorScheme,
  )

  return (
    <Flex w={'fit-content'} flexDir={'column'} gap={'22px'}>
      <Text fontSize={'36px'} fontWeight={'bold'} lineHeight={'36px'}>
        Other Digital Spaces
      </Text>
      <Link
        href='https://www.linkedin.com/in/sennett-lau'
        target='_blank'
        w={'fit-content'}
        gap={'8px'}
        alignItems={'center'}
        display={'flex'}
      >
        <Image
          src={getIconColorScheme('linkedin', colorScheme)}
          w={'24px'}
          h={'24px'}
          alt='linkedin'
        />
        <Text fontSize={'24px'} lineHeight={'24px'}>
          sennett-lau
        </Text>
      </Link>
      <Link
        href='https://github.com/sennett-lau'
        target='_blank'
        w={'fit-content'}
        gap={'8px'}
        alignItems={'center'}
        display={'flex'}
      >
        <Image
          src={getIconColorScheme('github', colorScheme)}
          w={'24px'}
          h={'24px'}
          alt='github'
        />
        <Text fontSize={'24px'} lineHeight={'24px'}>
          sennett-lau
        </Text>
      </Link>
    </Flex>
  )
}

export default IndexContactDigitalSpaces
