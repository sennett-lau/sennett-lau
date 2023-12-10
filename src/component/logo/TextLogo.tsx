import { Image, Link } from '@chakra-ui/react'

const TextLogo = () => {
  return (
    <Link href={'https://0xblanc.io'} isExternal>
      <Image src={'/assets/logo_banner.svg'} alt={'logo'} />
    </Link>
  )
}

export default TextLogo
