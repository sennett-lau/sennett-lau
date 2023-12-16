import CustomLink from '@/component/common/CustomLink'
import { RootState } from '@/store'
import { getBackgroundColorScheme, getContentColorScheme, range } from '@/utils'
import { Box, Flex, Image, Link, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

const IndexHero = () => {
  const colorScheme = useSelector(
    (state: RootState) => state.controlSlice.colorScheme,
  )

  return (
    <Flex
      id='hero'
      w={'100%'}
      h={'100vh'}
      bg={getBackgroundColorScheme(colorScheme)}
      transition={'all 0.3s ease-in-out'}
      alignItems={'center'}
    >
      <Flex maxW={'1120px'} w={'100%'} height={'650px'} mx={'auto'}>
        <Flex flex={1}>
          <Flex
            w={'44px'}
            flexDir={'column'}
            justifyContent={'flex-end'}
            mr={'38px'}
          >
            <Box
              w={'44px'}
              h={'44px'}
              borderLeft={'1px solid'}
              borderBottom={'1px solid'}
              borderColor={'themeDark.500'}
            />
          </Flex>
          <Flex
            justifyContent={'center'}
            alignItems={'center'}
            height={'100%'}
            position={'relative'}
          >
            <Text
              fontSize={'64px'}
              fontWeight={'400'}
              fontFamily={'Zarathustra'}
            >
              Sennett Lau.
            </Text>
            <Flex
              position={'absolute'}
              bottom={'20px'}
              left={'0'}
              w={'fit-content'}
              justifyContent={'center'}
              alignItems={'center'}
              gap={'4px'}
            >
              <CustomLink
                text='about'
                colorScheme={colorScheme}
                href='#about'
              />
              <CustomLink
                text='experience'
                colorScheme={colorScheme}
                href='#experience'
              />
              <CustomLink
                text='projects'
                colorScheme={colorScheme}
                href='#projects'
              />
              <CustomLink
                text='certs'
                colorScheme={colorScheme}
                href='#certs'
              />
              <CustomLink
                text='contact'
                colorScheme={colorScheme}
                href='#contact'
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex flex={1} height={'100%'} justifyContent={'space-around'}>
          <Image src='/assets/me.png' />
          <Flex flexDir={'column'} gap={'14px'}>
            {range(0, 4).map((i) => (
              <Image
                key={i}
                src='/assets/icons/cross.svg'
                w={'46px'}
                h={'46px'}
              />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default IndexHero
