import { useState } from 'react'

import { Flex, Text } from '@chakra-ui/react'

import { ColorScheme } from '@/types'
import { getContentColorScheme } from '@/utils'

type Props = {
  colorScheme: ColorScheme
  text: string
  href: string
  fontSize?: string
  display?: string | { base?: string; sm?: string; md?: string; lg?: string }
}

const CustomLink = (props: Props) => {
  const { colorScheme, text, href, fontSize = '18px', display = 'flex' } = props

  const [isHover, setIsHover] = useState(false)

  const onClickHandler = () => {
    const element = document.getElementById(href)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Flex
      w={'fit-content'}
      color={getContentColorScheme(colorScheme)}
      py={'8px'}
      px={'12px'}
      cursor={'pointer'}
      onClick={onClickHandler}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      display={display}
    >
      <Flex
        w={'fit-content'}
        h={fontSize}
        overflow={'hidden'}
        position={'relative'}
        flexDir={'column'}
        flexWrap={'nowrap'}
      >
        <Text
          fontSize={'18px'}
          fontWeight={'400'}
          lineHeight={fontSize}
          transform={isHover ? 'translateY(-100%)' : 'translateY(0%)'}
          transition={'all 0.3s ease-in-out'}
        >
          {text}
        </Text>
        <Text
          fontSize={'18px'}
          fontWeight={'400'}
          lineHeight={fontSize}
          transform={isHover ? 'translateY(-100%)' : 'translateY(0%)'}
          transition={'all 0.3s ease-in-out'}
        >
          {text}
        </Text>
      </Flex>
    </Flex>
  )
}

export default CustomLink
