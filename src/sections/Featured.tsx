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
  price?: Localized
  links: ProductLink[]
}

const INTRO: Localized = {
  ja: 'x402 Inc.は、エージェント経済とエージェント決済のエコシステムを、AIとの詳細なリサーチで分析するリサーチ会社です。x402対応のエンドポイント、独自データ、それを叩くエージェントを自ら作り、観測と検証の instruments として使います。HTTP 402を共通の決済レールに、Base/Solana上のper-callオンチェーン決済とERC-8004のエージェントidentityを土台にしています。',
  en: 'x402 Inc. is a research company that analyzes the agent economy and the agent-payments ecosystem through detailed research with AI. We build x402-compatible endpoints, proprietary data and the agents that call them, and use them as instruments for observation and verification. With HTTP 402 as the shared payment rail, we build on per-call on-chain settlement across Base/Solana and ERC-8004 agent identity.',
}

const PRODUCTS: Product[] = [
  {
    tag: '01 · MAP',
    name: 'x402 Endpoint',
    badge: 'HTTP/1.1 402 ✓',
    desc: {
      ja: 'x402対応の課金エンドポイントを集めた一覧。約19,000件超を毎日記録し、推移を時系列で追える。x402scan・agentic-market・ampersend・visa-cli・circle-marketplace など複数ソースを毎日cronで集約・正規化し、日次スナップショットとして保存。カテゴリ分類と利用頻度ランキングを持ち、REST と MCP の両方で配信するのでエージェントが直接読める。',
      en: 'A directory of x402-enabled paid endpoints. Over ~19,000 are recorded daily so you can track the trend over time. Multiple sources (x402scan, agentic-market, ampersend, visa-cli, circle-marketplace and more) are aggregated and normalized by a daily cron and stored as daily snapshots. It carries category classification and usage-frequency rankings, and is served over both REST and MCP so agents can read it directly.',
    },
    links: [
      { label: 'note', href: 'https://note.com/x402inc/n/nb30efb0e7e92' },
      { label: 'URL', href: 'https://x402endpoint.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/kato9292929/endpoint' },
    ],
  },
  {
    tag: '02 · CONSUME',
    name: 'x402 Autonomous Agent',
    badge: 'Railway ✓',
    desc: {
      ja: 'オンチェーンの身元(ERC-8004, agentId 55560)を持つエージェントが、毎朝データをper-callで購入し日次の判断を記録。identityはCircleのDeveloper-Controlled Wallet経由でオンチェーン登録。Base mainnetのUSDCで実際にper-call決済し、自社のx402エンドポイントを自社エージェントが消費する自己完結の検証ループ。Railwayで毎日定刻に稼働。重要な判断の前にはWorld IDで本人性を確認し、人間が承認を挟む。',
      en: 'An agent with an on-chain identity (ERC-8004, agentId 55560) buys data per-call every morning and records its daily decisions. The identity is registered on-chain via Circle’s Developer-Controlled Wallet. It settles per-call in real USDC on Base mainnet — a self-contained validation loop where our own agent consumes our own x402 endpoints. It runs on schedule every day on Railway. Before important decisions it verifies personhood with World ID, with a human in the approval loop.',
    },
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
      ja: 'Claude(Opus)が毎週、米国株と日本株を10銘柄ずつ選んで予想。各銘柄に判定日付きの数値カタリストを付け、GitHub Actionsのcronで週次ファイルをgit commit、Vercelが配信。判定日後に決算短信・適時開示と突き合わせてscorecardに採点を残す。記録は消さずにgitへ残す設計で、このtrack recordがmoat。配信は /api/alpha/* の REST と MCP。',
      en: 'Each week Claude (Opus) picks 10 US and 10 Japanese stocks and forecasts them. Each gets a numeric catalyst with a decision date; a GitHub Actions cron git-commits the weekly file and Vercel serves it. After the decision date, results are checked against earnings and timely disclosures and scored on a scorecard. Records are never deleted — kept in git — and this track record is the moat. Served over REST and MCP at /api/alpha/*.',
    },
    price: { ja: '$0.01/コール・Analyst $0.50〜$3.00', en: '$0.01/call · Analyst $0.50–$3.00' },
    links: [
      { label: 'note', href: 'https://note.com/x402inc/n/n28686d262552' },
      { label: 'URL', href: 'https://osd-coral.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/kato9292929/onchain-stock-data' },
    ],
  },
  {
    tag: '03 · PRODUCE',
    name: 'Japan Inflation Nowcast',
    badge: 'HTTP/1.1 402 ✓',
    desc: {
      ja: '東京のあるスーパーの店頭価格を毎日記録して作る独自の物価指数。10カテゴリ等加重のJevons幾何平均で日次指数化(基準日2026-06-04)、上流のCGPI(企業物価, Shift-JIS処理に対応)も取り込み、上流から店頭までを接続して観測。x402エンドポイントとして配信し、per-callで購入できる。',
      en: 'A proprietary price index built from daily in-store prices at a Tokyo supermarket. Indexed daily as an equal-weighted Jevons geometric mean across 10 categories (base date 2026-06-04), also incorporating upstream CGPI (corporate goods prices, with Shift-JIS handling) to connect upstream to the shelf. Served as an x402 endpoint and purchasable per-call.',
    },
    links: [{ label: 'URL', href: 'https://jin-orcin-pi.vercel.app/' }],
  },
]

export function Featured() {
  const { lang } = useLang()
  return (
    <section id="products" className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionEyebrow label="Featured" tag="Products" heading />
        <p className="mt-6 text-fg/60 text-base leading-[1.7] max-w-3xl">{INTRO[lang]}</p>
      </motion.div>

      <div className="mt-12 grid md:grid-cols-2 gap-5">
        {PRODUCTS.map((product, i) => (
          <motion.article
            key={product.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.08 }}
            className="liquid-glass rounded-2xl p-6 flex flex-col"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium tracking-wide text-gold">{product.tag}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-fg/10 text-fg/50">
                {product.badge}
              </span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-fg">{product.name}</h3>
            <p className="mt-3 text-sm text-fg/60 leading-[1.7] flex-1">{product.desc[lang]}</p>
            {product.price && (
              <p className="mt-4 text-sm text-gold font-semibold">{product.price[lang]}</p>
            )}
            <div className="mt-5 pt-4 border-t border-fg/10 flex flex-wrap gap-4">
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
          </motion.article>
        ))}
      </div>
    </section>
  )
}
