import { Flex, Text } from '@chakra-ui/react'

type Props = {
  name: string
  date: string
  description?: string
  link?: string
}

const IndexCertItem = (props: Props) => {
  const { name, date, description, link } = props

  return (
    <Flex flexDir={'column'} gap={'8px'} w={'550px'}>
      <Text
        fontSize={'24px'}
        lineHeight={'24px'}
        fontWeight={'semibold'}
        textAlign={'left'}
      >
        {name}
      </Text>
      <Text
        fontSize={'20px'}
        lineHeight={'20px'}
        textAlign={'left'}
      >
        {date}
      </Text>
      {description && (
        <Text
          fontSize={'16px'}
          lineHeight={'16px'}
          textAlign={'left'}
        >
          {description}
        </Text>
      )}
    </Flex>
  )
}

export default IndexCertItem
