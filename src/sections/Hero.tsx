import { motion } from 'motion/react'
import { CONTACT_EMAIL, Pill, gradientStyle } from '../primitives'
import { useLang } from '../i18n'
import { ShowcaseCompact } from './AgentShowcase'
// LogoMarquee is hidden for now; logos will move into Products.

const ease = [0.22, 1, 0.36, 1] as const

const LEAD = {
  ja: 'パーソナルエージェントは Stripe Link で人の代わりに払い、API には x402 で1コールずつ払う。x402 Inc. は、その支払い先を探せるカタログと、買い手・売り手・市場を自社で動かしています。',
  en: 'Personal agents pay for people with Stripe Link, and pay APIs one call at a time over x402. x402 Inc. runs the catalog to find who to pay, and runs the buyer, the sellers and the market itself.',
}

/* Stripe-like balance: a large left-aligned headline, a lead and CTAs on the
   left; the phones with notes on the right, running to the window's edge. */
export function Hero() {
  const { lang } = useLang()
  return (
    <section className="relative z-10 overflow-hidden pt-28 pb-16 md:pt-32 lg:min-h-[86vh] lg:flex lg:items-center">
      <div className="w-full grid items-center gap-12 px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-6 lg:pr-4 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
        <div className="flex flex-col items-start text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="text-5xl md:text-6xl xl:text-7xl 2xl:text-[5.5rem] font-semibold tracking-tight leading-[0.95]"
          >
            <span className="block text-fg">The agentic</span>
            <span className="block text-fg">economy</span>
            <span className="block animate-shiny" style={gradientStyle}>
              runs on x402.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease }}
            className="mt-8 max-w-xl text-base md:text-lg text-fg/65 leading-[1.8]"
          >
            {LEAD[lang]}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Pill label={lang === 'ja' ? 'お問い合わせ' : 'Contact'} href={`mailto:${CONTACT_EMAIL}`} />
            <Pill label={lang === 'ja' ? 'エンドポイントを探す' : 'Find endpoints'} href="https://endpoint.x402jp.com/" gold />
          </motion.div>
        </div>

        {/* two phones (Agentic Commerce / x402) with short notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
        >
          <ShowcaseCompact />
        </motion.div>
      </div>
    </section>
  )
}
