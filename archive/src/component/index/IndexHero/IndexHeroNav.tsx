import { useSelector } from 'react-redux'

import { Flex } from '@chakra-ui/react'

import CustomLink from '@/component/common/CustomLink'
import { RootState } from '@/store'

const navs = ['about', 'experience', 'projects', 'certs', 'contact']

const IndexHeroNav = () => {
  const colorScheme = useSelector(
    (state: RootState) => state.controlSlice.colorScheme,
  )

  return (
    <Flex
      w={'fit-content'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={'4px'}
      flexDir={{
        base: 'column',
        lg: 'row',
      }}
    >
      {navs.map((nav) => (
        <CustomLink
          key={nav}
          text={nav}
          colorScheme={colorScheme}
          href={`${nav}`}
        />
      ))}
    </Flex>
  )
}

export default IndexHeroNav
