import { Flex, Text } from '@chakra-ui/react'
import { useState } from 'react'
import IndexContactFormTextInput from './IndexContactFormTextInput'

const IndexContactForm = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  return (
    <Flex w={'100%'} flexDir={'column'}>
      <Flex w={'100%'} gap={'34px'} mb={'72px'}>
        <Flex flex={1}>
          <IndexContactFormTextInput
            label={'Your name'}
            data={name}
            setData={setName}
            type={'text'}
          />
        </Flex>
        <Flex flex={1}>
          <IndexContactFormTextInput
            label={'Your email'}
            data={email}
            setData={setEmail}
            type={'text'}
          />
        </Flex>
      </Flex>
      <Flex w={'100%'} mb={'50px'}>
        <IndexContactFormTextInput
          label={'Your message'}
          data={message}
          setData={setMessage}
          type={'textarea'}
        />
      </Flex>
      <Flex>
        <Flex
          w={'120px'}
          h={'40px'}
          border={'1px solid'}
          borderColor={'themeLight.500'}
          borderRadius={'24px'}
          cursor={'pointer'}
          justifyContent={'center'}
          alignItems={'center'}
          color={'themeLight.500'}
          _hover={{
            bg: 'themeLight.500',
            color: 'themeDark.500',
          }}
          transition={'all 0.2s ease'}
        >
          <Text fontSize={'16px'} lineHeight={'16px'}>
            Send
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default IndexContactForm
