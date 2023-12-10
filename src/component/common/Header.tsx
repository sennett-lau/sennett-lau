import { Flex, Image, Link } from '@chakra-ui/react'
import TextLogo from '@/component/logo/TextLogo'

const Header = () => {
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
    >
      <TextLogo />
    </Flex>
  )
}

export default Header
