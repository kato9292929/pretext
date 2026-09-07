import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, Moon, Sun, X, ArrowUpRight } from 'lucide-react'
import { CONTACT_EMAIL, NAV_LINKS, Wordmark } from '../primitives'
import { useLang, useTheme, type Lang } from '../i18n'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center justify-center w-8 h-8 rounded-full border border-fg/15 text-fg/70 hover:text-fg transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  )
}

function LangToggle() {
  const { lang, setLang } = useLang()
  const opt = (l: Lang, label: string) => (
    <button
      key={l}
      onClick={() => setLang(l)}
      className={`px-2.5 py-1 rounded-full transition-colors ${
        lang === l ? 'bg-fg/15 text-fg' : 'text-fg/50 hover:text-fg/80'
      }`}
      aria-pressed={lang === l}
    >
      {label}
    </button>
  )
  return (
    <div className="flex items-center gap-0.5 rounded-full border border-fg/15 p-0.5 text-xs font-medium">
      {opt('ja', 'JP')}
      {opt('en', 'EN')}
    </div>
  )
}

export function Navbar() {
  const { lang } = useLang()
  const [open, setOpen] = useState(false)
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative z-30 max-w-6xl mx-auto px-6"
    >
      <div className="relative flex items-center justify-between py-5">
        <a href="/" className="flex items-center">
          <Wordmark className="text-xl" />
        </a>

        {/* Centered nav links (desktop) */}
        <div className="hidden md:flex gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 + i * 0.05 }}
              className="text-fg/70 text-sm font-medium hover:text-fg transition-colors"
            >
              {link.label[lang]}
            </motion.a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <LangToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <LangToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-fg/10 bg-fg/5 text-fg"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden absolute left-6 right-6 top-full origin-top liquid-glass rounded-2xl p-2 shadow-xl"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl text-fg/80 text-base font-medium hover:bg-fg/5 hover:text-fg transition-colors"
              >
                {link.label[lang]}
              </a>
            ))}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-gold text-base font-semibold hover:bg-fg/5 transition-colors"
            >
              {lang === 'ja' ? 'お問い合わせ' : 'Contact'}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
