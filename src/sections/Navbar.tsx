import { motion } from 'motion/react'
import { Menu } from 'lucide-react'
import { CONTACT_EMAIL, NAV_LINKS, Pill, Wordmark } from '../primitives'

export function Navbar() {
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
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 + i * 0.05 }}
              className="text-white/70 text-sm font-medium hover:text-white transition-colors"
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        <div className="hidden md:block">
          <Pill label="お問い合わせ" href={`mailto:${CONTACT_EMAIL}`} gold />
        </div>

        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5"
          aria-label="Menu"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>
    </motion.nav>
  )
}
