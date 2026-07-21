import { motion } from 'motion/react'
import { CONTACT_EMAIL, Pill, gradientStyle } from '../primitives'
import { useLang } from '../i18n'

export function Hero() {
  const { lang } = useLang()
  return (
    <section className="relative z-10 min-h-[80vh] pb-16 text-center flex flex-col items-center justify-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl md:text-7xl font-semibold tracking-tight leading-[0.9]"
      >
        <span className="block text-white">The agentic economy</span>
        <span className="block animate-shiny" style={gradientStyle}>
          runs on x402.
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 flex flex-col sm:flex-row items-center gap-3"
      >
        <Pill
          label={lang === 'ja' ? 'お問い合わせ' : 'Contact'}
          href={`mailto:${CONTACT_EMAIL}`}
          gold
        />
      </motion.div>
    </section>
  )
}
