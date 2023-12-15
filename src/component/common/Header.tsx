import { RootState } from '@/store'
import { getBackgroundColorScheme, getContentColorScheme } from '@/utils'
import { Flex, Link, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import Highlight from './Highlight'

const Header = () => {
  const showHeader = useSelector(
    (state: RootState) => state.controlSlice.showHeader,
  )

  const colorScheme = useSelector(
    (state: RootState) => state.controlSlice.colorScheme,
  )

  return (
    <Flex
      height={70}
      alignItems={'center'}
      px={3}
      bg={getBackgroundColorScheme(colorScheme)}
      color={getContentColorScheme(colorScheme)}
      width={'100%'}
      position={'fixed'}
      zIndex={100}
      transform={showHeader ? 'translateY(0)' : 'translateY(-100%)'}
      transition={'all 0.3s ease-in-out'}
    >
      <Flex
        justifyContent={'space-between'}
        w={'100%'}
        h={'fit-content'}
        maxW={'1280px'}
        alignItems={'center'}
        py={'12px'}
        px={'24px'}
      >
        <Text fontSize={'20px'} lineHeight={'20px'} fontFamily={'Zarathustra'}>
          <Highlight>Sennett Lau .</Highlight>
        </Text>
        <Flex
          justifyContent={'flex-end'}
          alignItems={'center'}
          flex={1}
          gap={'24px'}
        >
          <Link href={'#about'} px={'16px'} py={'8px'}>
            About
          </Link>
          <Link href={'#experience'} px={'16px'} py={'8px'}>
            Experience
          </Link>
          <Link href={'#projects'} px={'16px'} py={'8px'}>
            Projects
          </Link>
          <Link href={'#certs'} px={'16px'} py={'8px'}>
            Certs
          </Link>
          <Link
            href={'#contact'}
            borderRadius={'32px'}
            border={'1px solid'}
            borderColor={getContentColorScheme(colorScheme)}
            px={'16px'}
            py={'8px'}
            _hover={{
              textDecoration: 'none',
              bg: getContentColorScheme(colorScheme),
              color: getBackgroundColorScheme(colorScheme),
            }}
          >
            Let's talk
          </Link>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Header
