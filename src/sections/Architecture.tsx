import { motion } from 'motion/react'
import { SectionEyebrow } from '../primitives'
import { useLang, type Lang, type Localized } from '../i18n'

const CHIPS: Localized<string[]> = {
  ja: ['per-callオンチェーン決済', '検証可能な実績', 'HTTP 402', 'Solana / Base / Arc', 'ERC-8004 identity', 'REST + MCP'],
  en: ['Per-call on-chain settlement', 'Verifiable track record', 'HTTP 402', 'Solana / Base / Arc', 'ERC-8004 identity', 'REST + MCP'],
}

const INTRO: Localized = {
  ja: '事業は発見(MAP)・消費(CONSUME)・データ生成(PRODUCE)の3層の instruments で構成されます。いずれも、エコシステムを外から論じるためでなく、内側から観測・検証するために動かしています。',
  en: 'The business is made up of three layers of instruments — discovery (MAP), consumption (CONSUME) and data production (PRODUCE). We run all of them not to comment on the ecosystem from outside, but to observe and verify it from within.',
}

const LOOP_LABEL: Localized = {
  ja: 'MAP → CONSUME → PRODUCE の instruments',
  en: 'MAP → CONSUME → PRODUCE instruments',
}

type Layer = { key: string; label: Localized; color: string; title: Localized; items: Localized<string[]> }

const LAYERS: Layer[] = [
  {
    key: 'MAP',
    label: { ja: '発見', en: 'Discovery' },
    color: '#E8C338',
    title: { ja: 'エンドポイントを日次で収集・正規化', en: 'Collect & normalize endpoints daily' },
    items: {
      ja: ['x402対応エンドポイントのカタログ', '何が・いくらで買えるかを観測する'],
      en: ['A catalog of x402-compatible endpoints', 'Observes what can be bought and at what price'],
    },
  },
  {
    key: 'CONSUME',
    label: { ja: '消費', en: 'Consumption' },
    color: '#F5D84E',
    title: { ja: 'per-callでオンチェーン決済し記録する', en: 'Settle per-call on-chain and record' },
    items: {
      ja: ['ERC-8004 identity を持つエージェント', '取引の形式を検証する instrument'],
      en: ['An agent with an ERC-8004 identity', 'An instrument to verify the form of a transaction'],
    },
  },
  {
    key: 'PRODUCE',
    label: { ja: 'データ生成', en: 'Data production' },
    color: '#B8901A',
    title: { ja: '独自データと検証可能な実績を作る', en: 'Produce proprietary data & verifiable records' },
    items: {
      ja: ['エージェント向けのデータ', '叩かれる側を観測する'],
      en: ['Data built for agents', 'Observes the side being called'],
    },
  },
]

export function Architecture() {
  const { lang }: { lang: Lang } = useLang()
  return (
    <section id="architecture" className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionEyebrow label="Architecture" tag="instruments" heading />
          <p className="mt-6 text-fg/60 text-base leading-[1.7] max-w-md">{INTRO[lang]}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {CHIPS[lang].map((chip) => (
              <span
                key={chip}
                className="text-xs text-fg/70 px-3 py-1.5 rounded-full border border-fg/10 bg-fg/[0.03]"
              >
                {chip}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right column */}
        <div className="liquid-glass rounded-2xl p-5">
          <p className="text-xs text-fg/50">{LOOP_LABEL[lang]}</p>
          <div className="mt-4 grid gap-3">
            {LAYERS.map((layer) => (
              <div key={layer.key} className="liquid-glass rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: layer.color }} />
                  <span className="text-sm font-semibold text-fg">{layer.key}</span>
                  <span className="text-xs text-fg/40">（{layer.label[lang]}）</span>
                </div>
                <p className="mt-2 text-sm text-fg/80">{layer.title[lang]}</p>
                <div className="mt-2 space-y-1">
                  {layer.items[lang].map((item) => (
                    <p key={item} className="text-xs text-fg/50">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
