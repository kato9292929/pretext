import { motion } from 'motion/react'
import { CONTACT_EMAIL, Pill, gradientStyle } from '../primitives'
import { useLang } from '../i18n'
import { AgentDuo } from './AgentShowcase'
// LogoMarquee is hidden for now; logos will move into Products.

const ease = [0.22, 1, 0.36, 1] as const

/* Stripe-like balance: a large left-aligned headline and CTAs on the left;
   the phone and PC window on the right, cut off by the browser's edge (xl). */
export function Hero() {
  const { lang } = useLang()
  return (
    <section className="relative z-10 overflow-hidden pt-28 pb-16 md:pt-32 xl:min-h-[86vh] xl:flex xl:items-center">
      <div className="w-full grid items-center gap-12 px-6 xl:grid-cols-[32rem_minmax(0,1fr)] xl:gap-12 xl:pr-0 xl:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
        <div className="flex flex-col items-start text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="text-5xl md:text-6xl xl:text-7xl font-semibold tracking-tight leading-[0.95]"
          >
            <span className="block text-fg">The agentic</span>
            <span className="block text-fg">economy</span>
            <span className="block animate-shiny" style={gradientStyle}>
              runs on x402.
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Pill label={lang === 'ja' ? 'お問い合わせ' : 'Contact'} href={`mailto:${CONTACT_EMAIL}`} />
            <Pill label={lang === 'ja' ? 'エンドポイントを探す' : 'Find endpoints'} href="https://endpoint.x402jp.com/" gold />
          </motion.div>
        </div>

        {/* phone in front of a PC window; on lg the window runs past the right edge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="mx-auto w-full max-w-4xl xl:mx-0 xl:max-w-none xl:w-[calc(100%+4rem)]"
        >
          <AgentDuo bleed />
        </motion.div>
      </div>
    </section>
  )
}
