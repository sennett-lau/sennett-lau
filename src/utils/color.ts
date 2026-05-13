import type { ColorScheme } from '@/types'

// Returns a Tailwind `bg-*` class fragment (literal strings — JIT scanner detects them).
// Surface PINNED: bg-blanc-{100,200}, bg-themeDark-{500,900}, bg-themeLight-{500,900}.
// Any change MUST update tailwind.config.ts safelist AND the build-artifact grep gate.
export const getBackgroundColorScheme = (theme: ColorScheme): string => {
  switch (theme) {
    case 'light':
      return 'bg-themeLight-500'
    case 'dark':
      return 'bg-themeDark-500'
    case 'ultraDark':
      return 'bg-themeDark-900'
  }
}

// Returns a Tailwind `text-*` class fragment.
export const getContentColorScheme = (theme: ColorScheme): string => {
  switch (theme) {
    case 'light':
      return 'text-themeDark-500'
    case 'dark':
      return 'text-themeLight-500'
    case 'ultraDark':
      return 'text-themeLight-500'
  }
}

// Returns an SVG path. Not a Tailwind class — purely a runtime asset lookup.
export const getIconColorScheme = (icon: string, theme: ColorScheme): string => {
  switch (theme) {
    case 'light':
      return `/assets/icons/${icon}-dark.svg`
    case 'dark':
    case 'ultraDark':
      return `/assets/icons/${icon}.svg`
  }
}
