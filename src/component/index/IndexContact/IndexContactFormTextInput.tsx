import { Flex, FormLabel, Input, Text, Textarea } from '@chakra-ui/react'
import { useState } from 'react'

type Props = {
  label: string
  data: string
  setData: (data: string) => void
  type: 'text' | 'textarea'
  errorText?: string
}

const IndexContactFormTextInput = (props: Props) => {
  const { label, data, setData, type, errorText } = props

  const [onFocus, setOnFocus] = useState<boolean>(false)

  return (
    <Flex flex={1} position={'relative'} pt={'16px'}>
      <FormLabel
        position={'absolute'}
        left={'0px'}
        top={'20px'}
        transform={onFocus || data ? 'translateY(-20px)' : 'translateY(0%)'}
        fontSize={onFocus || data ? '14px' : '20px'}
        transition={'all 0.2s ease'}
        fontWeight={'normal'}
      >
        {label}
      </FormLabel>
      <Text
        opacity={errorText}
        position={'absolute'}
        right={'0px'}
        top={'0px'}
        fontSize={'14px'}
        transition={'all 0.2s ease'}
        fontWeight={'normal'}
        color={'red'}
      >
        {errorText}
      </Text>
      {type === 'text' ? (
        <Input
          type='text'
          borderRadius={'0px'}
          border={'none'}
          borderBottom={'1px solid'}
          borderColor={errorText ? 'red' : 'themeLight.500'}
          variant={'flushed'}
          focusBorderColor='themeLight.500'
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      ) : (
        <Textarea
          borderRadius={'0px'}
          border={'none'}
          borderBottom={'1px solid'}
          borderColor={errorText ? 'red' : 'themeLight.500'}
          variant={'flushed'}
          focusBorderColor='themeLight.500'
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
          value={data}
          onChange={(e) => setData(e.target.value)}
          h={'150px'}
        />
      )}
    </Flex>
  )
}

export default IndexContactFormTextInput
