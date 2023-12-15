import TextLogo from '@/component/logo/TextLogo'
import { RootState } from '@/store'
import { getBackgroundColorScheme } from '@/utils'
import { Flex } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

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
      width={'100%'}
      position={'fixed'}
      zIndex={100}
      justifyContent={'center'}
      transform={showHeader ? 'translateY(0)' : 'translateY(-100%)'}
      transition={'all 0.3s ease-in-out'}
    >
      <TextLogo />
    </Flex>
  )
}

export default Header
