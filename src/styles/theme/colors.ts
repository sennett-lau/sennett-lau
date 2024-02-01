import type { DeepPartial, Theme } from '@chakra-ui/react'

/** extend additional color here */
export const extendedColors: DeepPartial<
  Record<string, Theme['colors']['blackAlpha']>
> = {
  blanc: {
    100: '#E7F2FF',
    200: '#054491',
  },
  themeDark: {
    500: '#2E2A2A',
    900: '#1F1F1F',
  },
  themeLight: {
    500: '#EFE8DB',
    900: '#DAD6CB',
  },
}

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme['colors']> = {}

export const colors = {
  ...overridenChakraColors,
  ...extendedColors,
}
