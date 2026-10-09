// Figlet "Big Money-ne" renders of the name, generated once with
// `figlet.textSync(word, { font: 'Big Money-ne' })` (figlet@1.12) and trimmed.
// ASCII-only on purpose: the font subsets have no box-drawing glyphs (DR-4).
export const FIGLET_FIRST = [
  '  /$$$$$$                                            /$$     /$$',
  ' /$$__  $$                                          | $$    | $$',
  '| $$  \\__/  /$$$$$$  /$$$$$$$  /$$$$$$$   /$$$$$$  /$$$$$$ /$$$$$$',
  '|  $$$$$$  /$$__  $$| $$__  $$| $$__  $$ /$$__  $$|_  $$_/|_  $$_/',
  ' \\____  $$| $$$$$$$$| $$  \\ $$| $$  \\ $$| $$$$$$$$  | $$    | $$',
  ' /$$  \\ $$| $$_____/| $$  | $$| $$  | $$| $$_____/  | $$ /$$| $$ /$$',
  '|  $$$$$$/|  $$$$$$$| $$  | $$| $$  | $$|  $$$$$$$  |  $$$$/|  $$$$/',
  ' \\______/  \\_______/|__/  |__/|__/  |__/ \\_______/   \\___/   \\___/',
].join('\n')

export const FIGLET_LAST = [
  ' /$$',
  '| $$',
  '| $$        /$$$$$$  /$$   /$$',
  '| $$       |____  $$| $$  | $$',
  '| $$        /$$$$$$$| $$  | $$',
  '| $$       /$$__  $$| $$  | $$',
  '| $$$$$$$$|  $$$$$$$|  $$$$$$/',
  '|________/ \\_______/ \\______/',
].join('\n')

// Widest figlet line, in glyphs. Drives the fit-to-width font size.
export const FIGLET_COLS = 68

export const ROLE = 'Full-stack developer'
export const LOCATION = 'Hong Kong & Tokyo'
export const FOCUS = ['AI-driven development', 'cloud edge', 'web3']

export const BOOT_LOG = [
  { verb: 'mount', target: '/experience', result: '4 roles since 2021' },
  { verb: 'verify', target: '/education', result: 'Master of AI @ HKU' },
  { verb: 'load', target: '/projects', result: 'typelite, cityuge, dklm.io' },
]
