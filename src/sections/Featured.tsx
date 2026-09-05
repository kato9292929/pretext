import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionEyebrow } from '../primitives'
import { useLang, type Localized } from '../i18n'

type ProductLink = { label: string; href: string }

type Product = {
  tag: string
  name: string
  badge: string
  desc: Localized
  image?: string // drop a file into public/products/ to show a preview
  live?: string // public site URL (custom domain)
  comingSoon?: boolean
  links: ProductLink[]
}

const INTRO: Localized = {
  ja: 'x402 Inc.は、エージェント経済とエージェント決済のエコシステムを、AIとの詳細なリサーチで分析するリサーチ会社です。x402対応のエンドポイント、独自データ、それを叩くエージェントを自ら作り、観測と検証の instruments として使います。HTTP 402を共通の決済レールに、Base/Solana上のper-callオンチェーン決済とERC-8004のエージェントidentityを土台にしています。',
  en: 'x402 Inc. is a research company that analyzes the agent economy and the agent-payments ecosystem through detailed research with AI. We build x402-compatible endpoints, proprietary data and the agents that call them, and use them as instruments for observation and verification. With HTTP 402 as the shared payment rail, we build on per-call on-chain settlement across Base/Solana and ERC-8004 agent identity.',
}

const LABELS = {
  ja: { visit: 'サイトを見る', soon: '準備中', hint: '横にスライド' },
  en: { visit: 'Visit site', soon: 'Coming soon', hint: 'Slide' },
}

const PRODUCTS: Product[] = [
  {
    tag: '01 · MAP',
    name: 'x402 Endpoint',
    badge: 'HTTP/1.1 402 ✓',
    desc: {
      ja: 'x402対応の課金エンドポイントを集めた一覧。約19,000件超を毎日記録し、推移を時系列で追える。複数ソースを毎日cronで集約・正規化し、日次スナップショットとして保存。REST と MCP の両方で配信するのでエージェントが直接読める。',
      en: 'A directory of x402-enabled paid endpoints. Over ~19,000 are recorded daily so you can track the trend over time. Multiple sources are aggregated and normalized by a daily cron and stored as daily snapshots. Served over both REST and MCP so agents can read it directly.',
    },
    image: '/products/endpoint.png',
    live: 'https://endpoint.x402jp.com/',
    links: [
      { label: 'note', href: 'https://note.com/x402inc/n/nb30efb0e7e92' },
      { label: 'GitHub', href: 'https://github.com/kato9292929/endpoint' },
    ],
  },
  {
    tag: '02 · CONSUME',
    name: 'x402 Autonomous Agent',
    badge: 'Railway ✓',
    desc: {
      ja: 'オンチェーンの身元(ERC-8004, agentId 55560)を持つエージェントが、毎朝データをper-callで購入し日次の判断を記録。Base mainnetのUSDCで実際にper-call決済し、自社のx402エンドポイントを自社エージェントが消費する自己完結の検証ループ。重要な判断の前にはWorld IDで本人性を確認し、人間が承認を挟む。',
      en: 'An agent with an on-chain identity (ERC-8004, agentId 55560) buys data per-call every morning and records its daily decisions. It settles per-call in real USDC on Base mainnet — a self-contained validation loop where our own agent consumes our own x402 endpoints. Before important decisions it verifies personhood with World ID, with a human in the approval loop.',
    },
    image: '/products/aa.png',
    live: 'https://aa.x402jp.com/',
    links: [
      { label: 'note', href: 'https://note.com/x402inc/n/nfe50d4acfcd8' },
      { label: 'GitHub', href: 'https://github.com/kato9292929/x402-Autonomous-Agent-' },
    ],
  },
  {
    tag: '03 · PRODUCE',
    name: 'Onchain Stock Data',
    badge: 'HTTP/1.1 402 ✓',
    desc: {
      ja: 'Claude(Opus)が毎週、米国株と日本株を10銘柄ずつ選んで予想。各銘柄に判定日付きの数値カタリストを付け、判定日後に決算・適時開示と突き合わせてscorecardに採点を残す。記録は消さずにgitへ残す設計で、このtrack recordがmoat。配信は REST と MCP。',
      en: 'Each week Claude (Opus) picks 10 US and 10 Japanese stocks and forecasts them. Each gets a numeric catalyst with a decision date; after the date, results are checked against earnings and disclosures and scored on a scorecard. Records are never deleted — kept in git — and this track record is the moat. Served over REST and MCP.',
    },
    image: '/products/osd.png',
    live: 'https://osd.x402jp.com/',
    links: [
      { label: 'note', href: 'https://note.com/x402inc/n/n28686d262552' },
      { label: 'GitHub', href: 'https://github.com/kato9292929/onchain-stock-data' },
    ],
  },
  {
    tag: '03 · PRODUCE',
    name: 'Japan Inflation Nowcast',
    badge: 'HTTP/1.1 402 ✓',
    desc: {
      ja: '東京のあるスーパーの店頭価格を毎日記録して作る独自の物価指数。10カテゴリ等加重のJevons幾何平均で日次指数化し、上流のCGPI(企業物価)も取り込み、上流から店頭までを接続して観測。x402エンドポイントとして配信し、per-callで購入できる。',
      en: 'A proprietary price index built from daily in-store prices at a Tokyo supermarket. Indexed daily as an equal-weighted Jevons geometric mean across 10 categories, also incorporating upstream CGPI (corporate goods prices) to connect upstream to the shelf. Served as an x402 endpoint and purchasable per-call.',
    },
    image: '/products/jin.png',
    live: 'https://jin.x402jp.com/',
    links: [],
  },
]

function Preview({ src, name }: { src?: string; name: string }) {
  const [ok, setOk] = useState(false)
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-fg/10 bg-fg/[0.03]">
      {src && (
        <img
          src={src}
          alt={name}
          onLoad={() => setOk(true)}
          onError={() => setOk(false)}
          className={`h-full w-full object-cover ${ok ? '' : 'hidden'}`}
        />
      )}
      {!ok && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background:
              'radial-gradient(130% 130% at 15% 0%, rgba(232,195,56,0.14), transparent 55%)',
          }}
        >
          <span className="font-mono text-sm text-fg/40">{name}</span>
        </div>
      )}
    </div>
  )
}

export function Featured() {
  const { lang } = useLang()
  const lab = LABELS[lang]
  return (
    <section id="products" className="relative z-10 max-w-6xl mx-auto px-6 py-14 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionEyebrow label="Products" tag="Automatic" heading />
        <p className="mt-6 text-fg/60 text-base leading-[1.7] max-w-3xl">{INTRO[lang]}</p>
      </motion.div>

      <div className="mt-10 grid sm:grid-cols-2 gap-5">
        {PRODUCTS.map((product, i) => (
          <motion.article
            key={product.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.08 }}
            className="liquid-glass rounded-2xl overflow-hidden flex flex-col"
          >
              <Preview src={product.image} name={product.name} />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium tracking-wide text-gold">{product.tag}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-fg/10 text-fg/50">
                    {product.badge}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-fg">{product.name}</h3>
                <p className="mt-3 text-sm text-fg/60 leading-[1.7] flex-1 line-clamp-4">
                  {product.desc[lang]}
                </p>
                <div className="mt-5 pt-4 border-t border-fg/10 flex flex-wrap items-center gap-x-4 gap-y-2">
                  {product.live ? (
                    <a
                      href={product.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-gold hover:brightness-110 transition"
                    >
                      {lab.visit}
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  ) : product.comingSoon ? (
                    <span className="inline-flex items-center rounded-full border border-fg/15 px-2.5 py-1 text-[11px] text-fg/50">
                      {lab.soon}
                    </span>
                  ) : null}
                  {product.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-fg/60 hover:text-gold transition-colors"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
