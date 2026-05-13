import { Link } from '@chakra-ui/react'

import Highlight from './Highlight'

type Props = {
  fontSize?: string | { base: string; lg: string }
  fontWeight?: string
  href: string
  target?: string
  children: React.ReactNode
}

const HigtlightedLink: React.FC<Props> = ({ children, ...props }) => {
  const { fontSize, fontWeight, href, target = '_blank' } = props

  return (
    <Link
      href={href}
      target={target}
      textDecoration={'underline'}
      textUnderlineOffset={2}
      rel='noreferrer'
    >
      <Highlight fontSize={fontSize} fontWeight={fontWeight}>
        {children}
      </Highlight>
    </Link>
  )
}

export default HigtlightedLink
