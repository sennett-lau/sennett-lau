import { RootState } from '@/store'
import { getBackgroundColorScheme, getContentColorScheme } from '@/utils'
import { Flex, Link } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import CustomLink from './CustomLink'
import Highlight from './Highlight'

const navs = ['about', 'experience', 'projects', 'certs']

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
        mx={'auto'}
      >
        <Link
          fontSize={'24px'}
          lineHeight={'24px'}
          fontFamily={'Zarathustra'}
          _hover={{
            textDecoration: 'none',
          }}
          href='/'
        >
          <Highlight>Sennett Lau .</Highlight>
        </Link>
        <Flex
          justifyContent={'flex-end'}
          alignItems={'center'}
          flex={1}
          gap={'24px'}
        >
          {navs.map((nav) => (
            <CustomLink
              key={nav}
              text={nav}
              colorScheme={colorScheme}
              href={`#${nav}`}
            />
          ))}
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
