import Highlight from '@/component/common/Highlight'
import { RootState } from '@/store'
import { getBackgroundColorScheme, getContentColorScheme, getSquareColorScheme, range } from '@/utils'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

const IndexAbout: React.FC = () => {
  const colorScheme = useSelector(
    (state: RootState) => state.controlSlice.colorScheme,
  )
  
  return (
    <Flex
      id='about'
      w={'100%'}
      minH={'102vh'}
      bg={getBackgroundColorScheme(colorScheme)}
      color={getContentColorScheme(colorScheme)}
      py={'100px'}
      alignItems={'center'}
      transition={'all 0.3s ease-in-out'}
    >
      <Flex
        w={'100%'}
        maxW={'1120px'}
        mx={'auto'}
        h={'780px'}
        position={'relative'}
        flexDir={'column'}
      >
        <Box
          w={'44px'}
          h={'44px'}
          borderRight={'1px solid'}
          borderTop={'1px solid'}
          borderColor={getContentColorScheme(colorScheme)}
          position={'absolute'}
          top={'0'}
          right={'0'}
        />
        <Image
          src={getSquareColorScheme(colorScheme)}
          position={'absolute'}
          bottom={'0'}
          left={'0'}
        />
        <Flex
          alignItems={'end'}
          position={'absolute'}
          bottom={'0'}
          right={'0'}
          h={'106px'}
          css={{
            transform: 'rotate(-90deg) translateX(100%)',
            transformOrigin: 'bottom right',
          }}
        >
          <Text
            fontSize={'96px'}
            fontWeight={700}
            h={'106px'}
            mr={'30px'}
          >
            About
          </Text>
          <Image src={getSquareColorScheme(colorScheme)} />
        </Flex>
        <Flex gap={'22px'} h={'fit-content'}>
          {range(0, 3).map((i) => (
            <Flex key={i} gap={'33px'} alignItems={'end'}>
              <Text
                fontSize={'96px'}
                fontWeight={700}
                h={'106px'}
              >
                About
              </Text>
              <Image src={getSquareColorScheme(colorScheme)} />
            </Flex>
          ))}
        </Flex>
        <Flex
          position={'relative'}
          h={'100%'}
          alignItems={'end'}
          pb={'44px'}
          pl={'54px'}
        >
          <Flex
            flex={1}
            maxW={'772px'}
            flexDir={'column'}
            fontSize={'24px'}
            lineHeight={'28px'}
            gap={'24px'}
          >
            <Text>
              I'm <Highlight>Sennett Lau</Highlight>, a full-stack developer
              based in Hong Kong.
            </Text>
            <Text>
              Holding a Bachelor of Science in{' '}
              <Highlight>Computer Science</Highlight> with a focus on Artificial
              Intelligence and Data Science from the{' '}
              <Highlight>City University of Hong Kong</Highlight>, graduated on{' '}
              <Highlight>June, 2022</Highlight>.
            </Text>
            <Text>
              With a strong foundation in <Highlight>web development</Highlight>{' '}
              specialized in
              <Highlight>JavaScript</Highlight>, a year of experience in{' '}
              <Highlight>Solidity</Highlight> and <Highlight>Web3</Highlight>,
              and growing proficiency in <Highlight>cloud computing</Highlight>,
              particularly <Highlight>AWS</Highlight>,{' '}
              <Highlight>GoLang</Highlight> backend application and{' '}
              <Highlight>system design</Highlight>.
            </Text>
            <Text>
              Technically proficient in <Highlight>TypeScript</Highlight>,{' '}
              <Highlight>Terraform</Highlight>,{' '}
              <Highlight>Kubernetes</Highlight>, <Highlight>ReactJS</Highlight>,
              and more.
            </Text>
            <Text>
              I am a <Highlight>fast learner</Highlight> and an effective{' '}
              <Highlight>team player</Highlight>.
            </Text>
            <Text>
              I'm dedicated to pushing the envelope in tech, blending a solid
              technical base with a keen interest in emerging technologies.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default IndexAbout
