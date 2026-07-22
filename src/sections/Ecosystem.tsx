import { motion } from 'motion/react'
import { SectionEyebrow } from '../primitives'
import { useLang, type Localized } from '../i18n'

const COPY = {
  ja: {
    intro:
      'エージェント決済は、単一の方向へ移行するのではありません。用途ごとに異なる経済へ細分化していきます。',
    closing:
      'それぞれ粒度も成熟度も決済形式も違います。私たちは、この細分化を、AIとの詳細なリサーチと自社の観測を突き合わせて分析し続けます。',
  },
  en: {
    intro:
      'Agent payments do not migrate in a single direction. They segment into different economies by use case.',
    closing:
      'Each differs in granularity, maturity and payment form. We keep analyzing this segmentation by cross-checking detailed research with AI against our own observations.',
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
        <p className="mt-6 text-white/60 text-base leading-[1.7]">{t.intro}</p>
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
            <p className="font-mono text-sm text-[#E8C338]">{seg.name}</p>
            <p className="mt-3 text-sm text-white/70 leading-[1.7]">{seg.desc[lang]}</p>
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-white/50 text-sm leading-[1.7] max-w-3xl">{t.closing}</p>
    </section>
  )
}
