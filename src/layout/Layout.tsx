import Header from '@/component/common/Header'
import { Flex } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'
import Footer from '@/component/common/Footer'

type Props = {
  children: ReactNode
}

const AppLayout: FC<Props> = ({ children }) => {
  return (
    <Flex
      minH={'100vh'}
      direction={'column'}
      position={'relative'}
      overflow={'hidden'}
    >
      <Header />
      <Flex
        flex={1}
        direction={'column'}
        align={'center'}
        justify={'center'}
      >
        {children}
      </Flex>

      <Footer />
    </Flex>
  )
}

export default AppLayout
