import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'ja' | 'en'

const KEY = 'x402-lang'

function initialLang(): Lang {
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
  const [lang, setLangState] = useState<Lang>(initialLang)

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

/** Pick a value by the current language. */
export type Localized<T = string> = { ja: T; en: T }
