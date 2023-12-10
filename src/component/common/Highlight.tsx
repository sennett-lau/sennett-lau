import { Text } from '@chakra-ui/react'

type Props = {
  fontSize?: string
  fontWeight?: string
  children: React.ReactNode
}

const Highlight: React.FC<Props> = ({ children, ...props }) => {
  const { fontSize, fontWeight } = props

  return (
    <Text
      as={'span'}
      fontSize={fontSize ? fontSize : 'inherit'}
      fontWeight={fontWeight ? fontWeight : 'bold'}
    >
      {children}
    </Text>
  )
}

export default Highlight
