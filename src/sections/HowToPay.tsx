import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionEyebrow } from '../primitives'
import { useLang } from '../i18n'

const COPY = {
  ja: {
    intro:
      '無料のエンドポイントは、そのまま叩ける。有料のものは最初のリクエストで402が返り、USDCで支払って同じURLへ再リクエストするだけ。',
    link: 'エンドポイント一覧を見る',
  },
  en: {
    intro:
      'Free endpoints can be called directly. Paid ones return 402 on the first request; pay in USDC and re-request the same URL.',
    link: 'See all endpoints',
  },
}

export function HowToPay() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl"
      >
        <SectionEyebrow label="How to pay" tag="on x402" heading />
        <p className="mt-6 text-fg/60 text-base leading-[1.7]">{t.intro}</p>
      </motion.div>

      <pre className="mt-8 liquid-glass rounded-xl p-4 text-xs md:text-sm font-mono text-fg/80 overflow-x-auto">
        <span className="text-fg/40">$ </span>curl https://jin-orcin-pi.vercel.app/api/jin/latest
      </pre>

      <a
        href="/products.html"
        className="mt-6 inline-flex items-center gap-1.5 text-sm text-fg/70 hover:text-gold transition-colors"
      >
        {t.link}
        <ArrowUpRight className="w-4 h-4" />
      </a>
    </section>
  )
}
