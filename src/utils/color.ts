import { ColorScheme } from '@/types'

export const getBackgroundColorScheme = (theme: ColorScheme): string => {
  switch (theme) {
    case 'light':
      return 'themeLight.500'
    case 'dark':
      return 'themeDark.500'
    case 'ultraDark':
      return 'themeDark.900'
  }
}

export const getContentColorScheme = (theme: ColorScheme): string => {
  switch (theme) {
    case 'light':
      return 'themeDark.500'
    case 'dark':
      return 'themeLight.500'
    case 'ultraDark':
      return 'themeLight.500'
  }
}

export const getIconColorScheme = (
  icon: string,
  theme: ColorScheme,
): string => {
  switch (theme) {
    case 'light':
      return `/assets/icons/${icon}-dark.svg`
    case 'dark':
      return `/assets/icons/${icon}.svg`
    case 'ultraDark':
      return `/assets/icons/${icon}.svg`
  }
}
