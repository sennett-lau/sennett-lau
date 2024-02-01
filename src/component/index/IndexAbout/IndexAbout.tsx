import Highlight from '@/component/common/Highlight'
import { RootState } from '@/store'
import {
  getBackgroundColorScheme,
  getContentColorScheme,
  getIconColorScheme,
  range,
} from '@/utils'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const IndexAbout: React.FC = () => {
  const colorScheme = useSelector(
    (state: RootState) => state.controlSlice.colorScheme,
  )
  const currSectionId = useSelector(
    (state: RootState) => state.controlSlice.currSectionId,
  )

  const [isAnimationTriggered, setIsAnimationTriggered] = useState(false)
  const [transitionStep, setTransitionStep] = useState(0)

  useEffect(() => {
    if (currSectionId === 'about' && !isAnimationTriggered) {
      setIsAnimationTriggered(true)

      // 1 - 3: 3x 'About.' display
      // 2 - 9: content display
      // 10: bottom right 'About.' display - 'A'
      // for bottom right 'About.' display
      // 11 - 15: for bottom right 'About.' display - b o u t .

      setTransitionStep(1)

      for (let i = 2; i <= 6; i++) {
        setTimeout(() => {
          setTransitionStep(i)
        }, 20 * (i - 1))
      }
    }
  }, [currSectionId, isAnimationTriggered])

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
        h={{
          base: 'fit-content',
          lg: '780px',
        }}
        position={'relative'}
        flexDir={'column'}
        px={{
          base: '20px',
          lg: '0',
        }}
      >
        <Box
          w={'44px'}
          h={'44px'}
          borderRight={'1px solid'}
          borderTop={'1px solid'}
          borderColor={getContentColorScheme(colorScheme)}
          position={'absolute'}
          top={'0'}
          right={{
            base: '20px',
            lg: '0',
          }}
        />
        <Image
          src={getIconColorScheme('square', colorScheme)}
          position={'absolute'}
          bottom={{
            base: '-22px',
            lg: '0',
          }}
          left={{
            base: '20px',
            lg: '0',
          }}
        />
        <Flex
          display={{
            base: 'none',
            lg: 'flex',
          }}
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
          <Text fontSize={'96px'} fontWeight={700} h={'106px'} mr={'30px'}>
            {'About'.split('').map((c, i) => (
              <Text
                as={'span'}
                key={i}
                opacity={transitionStep >= i + 1 ? 1 : 0}
                transition={'all 0.3s ease-in-out'}
              >
                {c}
              </Text>
            ))}
          </Text>
          <Image
            src={getIconColorScheme('square', colorScheme)}
            opacity={transitionStep >= 6 ? 1 : 0}
            transition={'all 0.3s ease-in-out'}
          />
        </Flex>
        <Flex gap={'22px'} h={'fit-content'}>
          {range(0, 3).map((i) => (
            <Flex
              key={i}
              gap={'33px'}
              alignItems={'end'}
              opacity={transitionStep >= i + 1 ? 1 : 0}
              transition={'all 0.5s ease-in-out'}
              display={{
                base: i === 0 ? 'flex' : 'none',
                lg: 'flex',
              }}
            >
              <Text
                fontSize={{
                  base: '64px',
                  lg: '96px',
                }}
                fontWeight={700}
                h={{
                  base: '70px',
                  lg: '106px',
                }}
              >
                About
              </Text>
              <Image src={getIconColorScheme('square', colorScheme)} />
            </Flex>
          ))}
        </Flex>
        <Flex
          position={'relative'}
          h={'100%'}
          alignItems={'end'}
          pb={{
            base: '24px',
            lg: '44px',
          }}
          pl={{
            base: '0',
            lg: '54px',
          }}
          pt={{
            base: '24px',
            lg: '0',
          }}
        >
          <Flex
            flex={1}
            maxW={'772px'}
            flexDir={'column'}
            fontSize={{
              base: '16px',
              lg: '24px',
            }}
            lineHeight={{
              base: '24px',
              lg: '28px',
            }}
            gap={'24px'}
          >
            <Text
              h={{
                base: 'fit-content',
                lg: '28px',
              }}
              opacity={transitionStep >= 1 ? 1 : 0}
              transform={transitionStep >= 1 ? 'none' : 'translateX(-20px)'}
              transition={'all 0.5s ease-in-out'}
            >
              I&apos;m <Highlight>Sennett Lau</Highlight>, a full-stack developer
              based in Hong Kong.
            </Text>
            <Text
              h={{
                base: 'fit-content',
                lg: '84px',
              }}
              opacity={transitionStep >= 2 ? 1 : 0}
              transform={transitionStep >= 2 ? 'none' : 'translateX(-20px)'}
              transition={'all 0.5s ease-in-out'}
            >
              Holding a Bachelor of Science in{' '}
              <Highlight>Computer Science</Highlight> with a focus on Artificial
              Intelligence and Data Science from the{' '}
              <Highlight>City University of Hong Kong</Highlight>, graduated on{' '}
              <Highlight>June, 2022</Highlight>.
            </Text>
            <Text
              h={{
                base: 'fit-content',
                lg: '112px',
              }}
              opacity={transitionStep >= 3 ? 1 : 0}
              transform={transitionStep >= 3 ? 'none' : 'translateX(-20px)'}
              transition={'all 0.5s ease-in-out'}
            >
              With a strong foundation in <Highlight>web development</Highlight>{' '}
              specialized in <Highlight>JavaScript</Highlight>, a year of
              experience in <Highlight>Solidity</Highlight> and{' '}
              <Highlight>Web3</Highlight>, and growing proficiency in{' '}
              <Highlight>cloud computing</Highlight>, particularly{' '}
              <Highlight>AWS</Highlight>, <Highlight>GoLang</Highlight> backend
              application and <Highlight>system design</Highlight>.
            </Text>
            <Text
              h={{
                base: 'fit-content',
                lg: '56px',
              }}
              opacity={transitionStep >= 4 ? 1 : 0}
              transform={transitionStep >= 4 ? 'none' : 'translateX(-20px)'}
              transition={'all 0.5s ease-in-out'}
            >
              Technically proficient in <Highlight>TypeScript</Highlight>,{' '}
              <Highlight>Terraform</Highlight>,{' '}
              <Highlight>Kubernetes</Highlight>, <Highlight>ReactJS</Highlight>,
              and more.
            </Text>
            <Text
              h={{
                base: 'fit-content',
                lg: '28px',
              }}
              opacity={transitionStep >= 5 ? 1 : 0}
              transform={transitionStep >= 5 ? 'none' : 'translateX(-20px)'}
              transition={'all 0.5s ease-in-out'}
            >
              I am a <Highlight>fast learner</Highlight> and an effective{' '}
              <Highlight>team player</Highlight>.
            </Text>
            <Text
              h={{
                base: 'fit-content',
                lg: '56px',
              }}
              opacity={transitionStep >= 6 ? 1 : 0}
              transform={transitionStep >= 6 ? 'none' : 'translateX(-20px)'}
              transition={'all 0.5s ease-in-out'}
            >
              I&apos;m dedicated to pushing the envelope in tech, blending a solid
              technical base with a keen interest in emerging technologies.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default IndexAbout
