import { _ping } from '@/types/_ping'

const App = () => {
  return (
    <div className="bg-themeLight-500 min-h-screen flex items-center justify-center">
      <p className="text-themeDark-900 text-2xl">
        sennett-lau (Vite scaffold) — alias ping: {String(_ping)}
      </p>
    </div>
  )
}

export default App
