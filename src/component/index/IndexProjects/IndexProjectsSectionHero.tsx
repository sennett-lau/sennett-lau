import { Flex, Image, Text } from '@chakra-ui/react'
import IndexProject0xBlanc from './IndexProject0xBlanc'
import { useSelector } from 'react-redux'
import { RootState } from '@/store';
import { getSquareColorScheme } from '@/utils';

const IndexProjectsSectionHero = () => {
  const colorScheme = useSelector(
    (state: RootState) => state.controlSlice.colorScheme,
  )

  return (
    <Flex w={'100%'}>
      <Flex flex={1} justifyContent={'center'} alignItems={'center'}>
        <Flex pt={'58px'} position={'relative'}>
          <Text
            fontSize={'96px'}
            fontWeight={700}
            ml={'30px'}
            css={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
            }}
            mb={'0'}
          >
            Projects
          </Text>
          <Image
            src={getSquareColorScheme(colorScheme)}
            position={'absolute'}
            top={'0'}
            right={'38px'}
          />
        </Flex>
      </Flex>
      <Flex w={'75%'}>
        <IndexProject0xBlanc />
      </Flex>
    </Flex>
  )
}

export default IndexProjectsSectionHero
