import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  safelist: [
    // color.ts surface is PINNED: getBackgroundColorScheme returns bg-*,
    // getContentColorScheme returns text-*. Any new prefix MUST update both
    // this safelist AND the build-artifact grep gate in P11.
    'bg-blanc-100',
    'bg-blanc-200',
    'bg-themeDark-500',
    'bg-themeDark-900',
    'bg-themeLight-500',
    'bg-themeLight-900',
    'text-blanc-100',
    'text-blanc-200',
    'text-themeDark-500',
    'text-themeDark-900',
    'text-themeLight-500',
    'text-themeLight-900',
  ],
  theme: {
    extend: {
      colors: {
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
      },
      fontFamily: {
        raleway: ['Raleway', 'system-ui', 'sans-serif'],
        zarathustra: ['Zarathustra', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
