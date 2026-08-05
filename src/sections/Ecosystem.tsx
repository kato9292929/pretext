import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionEyebrow } from '../primitives'
import { useLang, type Localized } from '../i18n'

const COPY = {
  ja: {
    intro:
      'エージェント決済は、単一の方向へ移行するのではありません。用途ごとに異なる経済へ細分化していきます。',
    closing:
      'それぞれ粒度も成熟度も決済形式も違います。私たちは、この細分化を、AIとの詳細なリサーチと自社の観測を突き合わせて分析し続けます。',
    payLabel: 'How to pay on x402',
    payIntro:
      '無料のエンドポイントは、そのまま叩ける。有料のものは最初のリクエストで402が返り、USDCで支払って同じURLへ再リクエストするだけ。',
    payLink: 'エンドポイント一覧を見る',
  },
  en: {
    intro:
      'Agent payments do not migrate in a single direction. They segment into different economies by use case.',
    closing:
      'Each differs in granularity, maturity and payment form. We keep analyzing this segmentation by cross-checking detailed research with AI against our own observations.',
    payLabel: 'How to pay on x402',
    payIntro:
      'Free endpoints can be called directly. Paid ones return 402 on the first request; pay in USDC and re-request the same URL.',
    payLink: 'See all endpoints',
  },
}

type Segment = { name: string; desc: Localized }

const SEGMENTS: Segment[] = [
  {
    name: 'commerce / checkout',
    desc: {
      ja: '人間の委任でエージェントが代わりに買う（クレカ × AIエージェント、EC・小売・代行購入）。',
      en: 'An agent buys on a human’s behalf via delegation (credit card × AI agent; e-commerce, retail, proxy purchasing).',
    },
  },
  {
    name: 'data procurement',
    desc: {
      ja: 'エージェントがAPIリソースをper-callで調達する。',
      en: 'Agents procure API resources per-call.',
    },
  },
  {
    name: 'agent-to-agent labor',
    desc: {
      ja: 'エージェントがエージェントに、仕事の単位ごとに支払う。',
      en: 'Agents pay other agents per unit of work.',
    },
  },
  {
    name: 'delegated budget',
    desc: {
      ja: '委任された予算枠が、委任の連鎖を下っていく。',
      en: 'A delegated budget flows down a chain of delegation.',
    },
  },
]

export function Ecosystem() {
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
        <SectionEyebrow label="Ecosystem" tag="segmentation" heading />
        <p className="mt-6 text-fg/60 text-base leading-[1.7]">{t.intro}</p>
      </motion.div>

      <div className="mt-10 grid sm:grid-cols-2 gap-5">
        {SEGMENTS.map((seg, i) => (
          <motion.div
            key={seg.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.08 }}
            className="liquid-glass rounded-2xl p-6"
          >
            <p className="font-mono text-sm text-gold">{seg.name}</p>
            <p className="mt-3 text-sm text-fg/70 leading-[1.7]">{seg.desc[lang]}</p>
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-fg/50 text-sm leading-[1.7] max-w-3xl">{t.closing}</p>

      {/* How to pay on x402 — integrated here */}
      <div className="mt-12 pt-10 border-t border-fg/10">
        <p className="text-xs uppercase tracking-widest text-gold">{t.payLabel}</p>
        <p className="mt-3 text-fg/60 text-base leading-[1.7] max-w-2xl">{t.payIntro}</p>
        <pre className="mt-5 liquid-glass rounded-xl p-4 text-xs md:text-sm font-mono text-fg/80 overflow-x-auto max-w-2xl">
          <span className="text-fg/40">$ </span>curl https://jin-orcin-pi.vercel.app/api/jin/latest
        </pre>
        <a
          href="/products.html"
          className="mt-5 inline-flex items-center gap-1.5 text-sm text-fg/70 hover:text-gold transition-colors"
        >
          {t.payLink}
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  )
}
