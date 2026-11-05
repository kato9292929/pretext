import { motion } from 'motion/react'
import { CONTACT_EMAIL, Pill, gradientStyle } from '../primitives'
import { useLang } from '../i18n'
import { ShowcaseCompact } from './AgentShowcase'
// LogoMarquee is hidden for now; logos will move into Products.

export function Hero() {
  const { lang } = useLang()
  return (
    <section className="relative z-10 min-h-[80vh] max-w-7xl mx-auto px-6 pt-28 pb-16 grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,46rem)] lg:gap-10">
      {/* headline, left-aligned */}
      <div className="flex flex-col items-start text-left">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl font-semibold tracking-tight leading-[0.9]"
        >
          <span className="block text-fg">The agentic economy</span>
          <span className="block animate-shiny" style={gradientStyle}>
            runs on x402.
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex items-center gap-3"
        >
          <Pill label={lang === 'ja' ? 'お問い合わせ' : 'Contact'} href={`mailto:${CONTACT_EMAIL}`} gold />
        </motion.div>
      </div>

      {/* two phones (Agentic Commerce / x402) with short notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <ShowcaseCompact />
      </motion.div>
    </section>
  )
}
