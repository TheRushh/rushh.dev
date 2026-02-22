import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ThemeContext } from './ThemeContext.context'

type Theme = 'dark' | 'light'

function getStorage(): Storage | null {
  try {
    const storage = window.localStorage
    if (storage && typeof storage.getItem === 'function' && typeof storage.setItem === 'function') {
      return storage
    }
  } catch {
    // Access can fail in restricted/browserless environments.
  }

  return null
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = getStorage()?.getItem('theme') as Theme | null
    return savedTheme || 'dark'
  })

  useEffect(() => {
    getStorage()?.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
