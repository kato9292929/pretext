import { motion } from 'motion/react'
import { SectionEyebrow } from '../primitives'
import { useLang, type Lang, type Localized } from '../i18n'

const CHIPS: Localized<string[]> = {
  ja: ['委任付き自律決済', 'per-call 自律決済', 'HTTP 402', 'Base / Solana', 'ERC-8004 identity', 'REST + MCP'],
  en: ['Delegated payments', 'Per-call payments', 'HTTP 402', 'Base / Solana', 'ERC-8004 identity', 'REST + MCP'],
}

const INTRO: Localized = {
  ja: '発見(MAP)・自律消費(CONSUME)・データ生成(PRODUCE)。人間の委任による「委任付き自律決済」から、エージェントが都度支払う per-call 自律決済へ。HTTP 402を共通の決済レールに、Base/Solana上のオンチェーン決済とエージェントidentityを土台として、需要と観測の往復を検証し続けています。',
  en: 'Discovery (MAP), autonomous consumption (CONSUME), data production (PRODUCE). From human-delegated “delegated autonomous payment” to per-call autonomous payment where the agent pays each time. With HTTP 402 as the shared rail and on-chain settlement on Base/Solana plus agent identity as the foundation, we keep validating the loop between demand and observation.',
}

const LOOP_LABEL: Localized = {
  ja: 'MAP → CONSUME → PRODUCE の自己完結ループ',
  en: 'The self-contained MAP → CONSUME → PRODUCE loop',
}

type Layer = { key: string; label: Localized; color: string; title: Localized; items: Localized<string[]> }

const LAYERS: Layer[] = [
  {
    key: 'MAP',
    label: { ja: '発見', en: 'Discovery' },
    color: '#E8C338',
    title: { ja: 'エンドポイントを集約・正規化', en: 'Aggregate & normalize endpoints' },
    items: {
      ja: ['約19,000件超を日次記録', 'REST と MCP で配信'],
      en: ['~19,000+ recorded daily', 'Served over REST and MCP'],
    },
  },
  {
    key: 'CONSUME',
    label: { ja: '自律消費', en: 'Autonomous use' },
    color: '#F5D84E',
    title: { ja: 'エージェントがper-callで購入', en: 'Agents buy per-call' },
    items: {
      ja: ['オンチェーンidentity (ERC-8004)', 'Base mainnet USDC決済'],
      en: ['On-chain identity (ERC-8004)', 'USDC settlement on Base mainnet'],
    },
  },
  {
    key: 'PRODUCE',
    label: { ja: 'データ生成', en: 'Data production' },
    color: '#B8901A',
    title: { ja: '独自データを生成し販売', en: 'Generate & sell proprietary data' },
    items: {
      ja: ['株価予想・物価指数など', 'gitに残すtrack recordがmoat'],
      en: ['Stock forecasts, price indices, etc.', 'Track record kept in git is the moat'],
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
          <SectionEyebrow label="Architecture" tag="3-layer" heading />
          <p className="mt-6 text-white/60 text-base leading-[1.7] max-w-md">{INTRO[lang]}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {CHIPS[lang].map((chip) => (
              <span
                key={chip}
                className="text-xs text-white/70 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]"
              >
                {chip}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right column */}
        <div className="liquid-glass rounded-2xl p-5">
          <p className="text-xs text-white/50">{LOOP_LABEL[lang]}</p>
          <div className="mt-4 grid gap-3">
            {LAYERS.map((layer) => (
              <div key={layer.key} className="liquid-glass rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: layer.color }} />
                  <span className="text-sm font-semibold text-white">{layer.key}</span>
                  <span className="text-xs text-white/40">（{layer.label[lang]}）</span>
                </div>
                <p className="mt-2 text-sm text-white/80">{layer.title[lang]}</p>
                <div className="mt-2 space-y-1">
                  {layer.items[lang].map((item) => (
                    <p key={item} className="text-xs text-white/50">
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
