import AppLayout from '@/layout/Layout'
import { store } from '@/store'
import '@/styles/font.scss'
import '@/styles/globals.scss'
import customTheme from '@/styles/theme'
import { ChakraProvider } from '@chakra-ui/react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { Provider } from 'react-redux'

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    AOS.init({
      easing: 'ease-out-cubic',
      once: true,
      offset: 0,
    })
  }, [])
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
