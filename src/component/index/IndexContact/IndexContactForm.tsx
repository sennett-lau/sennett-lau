import { RootState } from '@/store'
import { discordHookMessageSend, getContentColorScheme } from '@/utils'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import IndexContactFormTextInput from './IndexContactFormTextInput'

const IndexContactForm = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [functionState, setFunctionState] = useState<
    'idle' | 'loading' | 'error' | 'done'
  >('idle')

  const [nameError, setNameError] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [messageError, setMessageError] = useState<string>('')

  const colorScheme = useSelector(
    (state: RootState) => state.controlSlice.colorScheme,
  )

  const onMessageSend = async () => {
    if (functionState === 'loading' || functionState === 'done') {
      return
    }

    if (!name || !email || !message) {
      if (!name) {
        setNameError('Name is required')
      }

      if (!email) {
        setEmailError('Email is required')
      }

      if (!message) {
        setMessageError('Message is required')
      }

      const emailRegex = new RegExp(
        '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$',
      )

      if (email && !emailRegex.test(email)) {
        setEmailError('Email is invalid')
      }
      return
    }

    setFunctionState('loading')

    const content = `Name: ${name}\n\nEmail: ${email}\n\nMessage:\n${message}`

    try {
      await discordHookMessageSend(content)
      setFunctionState('done')
    } catch (err) {
      console.log(err)
      setFunctionState('error')
      return
    }
  }

  const getButtonText = () => {
    switch (functionState) {
      case 'idle':
        return 'Send'
      case 'loading':
        return 'Sending...'
      case 'error':
        return 'Error'
      case 'done':
        return 'Sent'
    }
  }

  const getButtonColorScheme = () => {
    switch (functionState) {
      case 'idle':
        return getContentColorScheme(colorScheme)
      case 'loading':
        return getContentColorScheme(colorScheme)
      case 'error':
        return 'red.500'
      case 'done':
        return 'green.500'
    }
  }

  const getButtonBackgroundProgress = () => {
    switch (functionState) {
      case 'idle':
        return '0'
      case 'loading':
        return '0'
      case 'error':
        return '100%'
      case 'done':
        return '100%'
    }
  }

  const onNameChange = (s: string) => {
    setName(s)
    if (s) {
      setNameError('')
    }
  }

  const onEmailChange = (s: string) => {
    setEmail(s)

    const emailRegex = new RegExp(
      '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$',
    )

    if (s && !emailRegex.test(s)) {
      setEmailError('Email is invalid')
    } else if (s) {
      setEmailError('')
    }
  }

  const onMessageChange = (s: string) => {
    setMessage(s)
    if (s) {
      setMessageError('')
    }
  }

  return (
    <Flex w={'100%'} flexDir={'column'}>
      <Flex
        w={'100%'}
        gap={'34px'}
        mb={'72px'}
        flexDir={{
          base: 'column',
          lg: 'row',
        }}
      >
        <Flex flex={1}>
          <IndexContactFormTextInput
            label={'Your name'}
            data={name}
            setData={onNameChange}
            type={'text'}
            errorText={nameError}
          />
        </Flex>
        <Flex flex={1}>
          <IndexContactFormTextInput
            label={'Your email'}
            data={email}
            setData={onEmailChange}
            type={'text'}
            errorText={emailError}
          />
        </Flex>
      </Flex>
      <Flex w={'100%'} mb={'50px'}>
        <IndexContactFormTextInput
          label={'Your message'}
          data={message}
          setData={onMessageChange}
          type={'textarea'}
          errorText={messageError}
        />
      </Flex>
      <Flex>
        <Flex
          w={'120px'}
          h={'40px'}
          border={'1px solid'}
          borderColor={getButtonColorScheme()}
          borderRadius={'24px'}
          cursor={'pointer'}
          alignItems={'center'}
          color={getContentColorScheme(colorScheme)}
          _hover={{
            bg: 'themeLight.500',
            color: 'themeDark.500',
          }}
          transition={'all 0.2s ease'}
          position={'relative'}
        >
          <Box
            w={'100%'}
            maxW={getButtonBackgroundProgress()}
            h={'40px'}
            borderRadius={'24px'}
            bg={getButtonColorScheme()}
            transition={'all 0.2s ease'}
            zIndex={1}
          />
          <Text
            fontSize={'16px'}
            lineHeight={'16px'}
            onClick={onMessageSend}
            position={'absolute'}
            top={'50%'}
            left={'50%'}
            transform={'translate(-50%, -50%)'}
            zIndex={2}
          >
            {getButtonText()}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default IndexContactForm
