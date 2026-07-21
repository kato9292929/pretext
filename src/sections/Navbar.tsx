import { motion } from 'motion/react'
import { Menu } from 'lucide-react'
import { CONTACT_EMAIL, NAV_LINKS, Pill, Wordmark } from '../primitives'
import { useLang, type Lang } from '../i18n'

function LangToggle() {
  const { lang, setLang } = useLang()
  const opt = (l: Lang, label: string) => (
    <button
      key={l}
      onClick={() => setLang(l)}
      className={`px-2.5 py-1 rounded-full transition-colors ${
        lang === l ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white/80'
      }`}
      aria-pressed={lang === l}
    >
      {label}
    </button>
  )
  return (
    <div className="flex items-center gap-0.5 rounded-full border border-white/15 p-0.5 text-xs font-medium">
      {opt('ja', 'JP')}
      {opt('en', 'EN')}
    </div>
  )
}

export function Navbar() {
  const { lang } = useLang()
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative z-10 max-w-6xl mx-auto px-6"
    >
      <div className="flex items-center justify-between py-5">
        <a href="/" className="flex items-center">
          <Wordmark className="text-xl" />
        </a>

        <div className="hidden md:flex gap-8">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 + i * 0.05 }}
              className="text-white/70 text-sm font-medium hover:text-white transition-colors"
            >
              {link.label[lang]}
            </motion.a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <LangToggle />
          <Pill
            label={lang === 'ja' ? 'お問い合わせ' : 'Contact'}
            href={`mailto:${CONTACT_EMAIL}`}
            gold
          />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LangToggle />
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5"
            aria-label="Menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.nav>
  )
}
