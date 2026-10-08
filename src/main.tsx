import { MotionConfig } from 'framer-motion'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/ibm-plex-mono/latin-400-italic.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import '@fontsource/ibm-plex-mono/latin-600.css'
import '@fontsource-variable/martian-mono/wdth.css'

import App from '@/App'
import '@/index.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    {/* Honour prefers-reduced-motion: keep fades, drop slides and transforms. */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
)
