import type { Config } from 'tailwindcss'

// Dark-only terminal theme. Colours are static utilities — nothing builds class
// names at runtime, so no safelist is needed.
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0b0b0a',
        panel: '#121210',
        line: '#2a2823',
        dim: '#858075', // 5.0:1 on bg (WCAG AA)
        ink: '#e9e4d6',
        amber: {
          DEFAULT: '#ffb000',
          dim: '#a87400',
        },
        ok: '#9fd36b',
        err: '#ff6b57',
      },
      fontFamily: {
        display: ['"Martian Mono Variable"', 'ui-monospace', 'monospace'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        blink: 'blink 1.1s steps(1) infinite',
      },
    },
  },
  plugins: [],
}

export default config
