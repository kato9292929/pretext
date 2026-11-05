import { motion } from 'motion/react'
import { Pill } from '../primitives'
import { useLang } from '../i18n'

/* Home: short "What's Agentic Commerce?" intro above the phone showcase,
   with a link to the About page. */

const COPY = {
  ja: {
    title: 'What’s Agentic Commerce?',
    body: 'Muse や Grok などのパーソナルエージェントは、Stripe Link で人の代わりに支払いを済ませはじめています。API には x402 で1コールずつ払う。x402 Inc. は、その支払い先を探せるカタログと、買い手・売り手・市場を自社で動かしています。',
    cta: 'About を見る',
  },
  en: {
    title: 'What’s Agentic Commerce?',
    body: 'Personal agents such as Muse and Grok have started paying on people’s behalf with Stripe Link. APIs get paid one call at a time over x402. x402 Inc. runs the catalog to find who to pay, and runs the buyer, the sellers and the market itself.',
    cta: 'Read About',
  },
}

export function AgenticIntro() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative max-w-6xl mx-auto px-6 mb-12 md:mb-16"
    >
      <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-fg">{t.title}</h2>
      <p className="mt-4 max-w-2xl text-sm md:text-base text-fg/65 leading-[1.85]">{t.body}</p>
      <div className="mt-6">
        <Pill label={t.cta} href="/about.html" gold />
      </div>
    </motion.div>
  )
}
