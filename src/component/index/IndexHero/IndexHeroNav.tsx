import CustomLink from '@/component/common/CustomLink'
import { RootState } from '@/store'
import { Flex } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

const navs = ['about', 'experience', 'projects', 'certs', 'contact']

const IndexHeroNav = () => {
  const colorScheme = useSelector(
    (state: RootState) => state.controlSlice.colorScheme,
  )

  return (
    <Flex
      position={'absolute'}
      bottom={'20px'}
      left={'0'}
      w={'fit-content'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={'4px'}
    >
      {navs.map((nav) => (
        <CustomLink
          key={nav}
          text={nav}
          colorScheme={colorScheme}
          href={`#${nav}`}
        />
      ))}
    </Flex>
  )
}

export default IndexHeroNav
