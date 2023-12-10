import TextLogo from '@/component/logo/TextLogo'
import { RootState } from '@/store'
import { Flex } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

const Header = () => {
  const showHeader = useSelector(
    (state: RootState) => state.controlSlice.showHeader,
  )

  return (
    <Flex
      height={70}
      alignItems={'center'}
      px={3}
      bg={'blanc.100'}
      width={'100%'}
      position={'fixed'}
      zIndex={100}
      justifyContent={'center'}
      transform={showHeader ? 'translateY(0)' : 'translateY(-100%)'}
      transition={'transform 0.3s ease-in-out'}
    >
      <TextLogo />
    </Flex>
  )
}

export default Header
