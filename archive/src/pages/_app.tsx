import { Provider } from 'react-redux'

import { ChakraProvider } from '@chakra-ui/react'

import AppLayout from '@/layout/Layout'
import { store } from '@/store'
import customTheme from '@/styles/theme'

import '@/styles/font.scss'
import '@/styles/globals.scss'

import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={customTheme}>
      <Provider store={store}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </Provider>
    </ChakraProvider>
  )
}

export default App
