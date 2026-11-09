import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useLang } from '../i18n'

/* Home: "How to pay on x402", above the x402 docs links (moved out of the
   Ecosystem section). */

const COPY = {
  ja: {
    label: 'How to pay on x402',
    intro: '無料のエンドポイントは、そのまま叩ける。有料のものは最初のリクエストで402が返り、USDCで支払って同じURLへ再リクエストするだけ。',
    link: 'エンドポイント一覧を見る',
  },
  en: {
    label: 'How to pay on x402',
    intro: 'Free endpoints can be called directly. Paid ones return 402 on the first request; pay in USDC and re-request the same URL.',
    link: 'See all endpoints',
  },
}

export function HowToPay() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative max-w-5xl mx-auto px-6 mt-16 md:mt-20"
    >
      <p className="text-xs tracking-widest text-gold">{t.label}</p>
      <p className="mt-3 text-fg/60 text-base leading-[1.7] max-w-2xl">{t.intro}</p>
      <pre className="mt-5 liquid-glass rounded-xl p-4 text-xs md:text-sm font-mono text-fg/80 overflow-x-auto max-w-2xl">
        <span className="text-fg/40">$ </span>curl https://jin.x402jp.com/api/jin/latest
      </pre>
      <a href="/products.html" className="mt-5 inline-flex items-center gap-1.5 text-sm text-fg/70 hover:text-gold transition-colors">
        {t.link}
        <ArrowUpRight className="w-4 h-4" />
      </a>
    </motion.div>
  )
}
