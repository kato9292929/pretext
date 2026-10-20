import { createContext, useContext, useEffect, useLayoutEffect, useState, type ReactNode } from 'react'

// Pages are rendered to HTML at build time in the defaults (ja / dark) and then
// hydrated. Saved preferences are applied right after hydration, before paint.
const useClientLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export type Lang = 'ja' | 'en'

const KEY = 'x402-lang'

function storedLang(): Lang {
  try {
    const v = localStorage.getItem(KEY)
    if (v === 'en' || v === 'ja') return v
  } catch {
    /* ignore */
  }
  return 'ja'
}

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: 'ja',
  setLang: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ja')

  useClientLayoutEffect(() => {
    setLangState(storedLang())
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(KEY, l)
    } catch {
      /* ignore */
    }
  }

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}

/* ── Theme (light / dark) ────────────────────────────────────── */
export type Theme = 'dark' | 'light'

const THEME_KEY = 'x402-theme'

function storedTheme(): Theme {
  try {
    const v = localStorage.getItem(THEME_KEY)
    if (v === 'light' || v === 'dark') return v
  } catch {
    /* ignore */
  }
  return 'dark'
}

const ThemeContext = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({
  theme: 'dark',
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark')

  useClientLayoutEffect(() => {
    setThemeState(storedTheme())
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const setTheme = (t: Theme) => {
    setThemeState(t)
    try {
      localStorage.setItem(THEME_KEY, t)
    } catch {
      /* ignore */
    }
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}

/** Pick a value by the current language. */
export type Localized<T = string> = { ja: T; en: T }
