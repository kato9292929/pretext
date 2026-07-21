import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionEyebrow } from '../primitives'

type ProductLink = { label: string; href: string }

type Product = {
  tag: string
  name: string
  badge: string
  desc: string
  price?: string
  links: ProductLink[]
}

const PRODUCTS: Product[] = [
  {
    tag: '01 · MAP',
    name: 'x402 Endpoint',
    badge: 'HTTP/1.1 402 ✓',
    desc: 'x402対応の課金エンドポイントを集めた一覧。約19,000件超を毎日記録し、推移を時系列で追える。x402scan・agentic-market・ampersend・visa-cli・circle-marketplace など複数ソースを毎日cronで集約・正規化し、日次スナップショットとして保存。カテゴリ分類と利用頻度ランキングを持ち、REST と MCP の両方で配信するのでエージェントが直接読める。',
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
    desc: 'オンチェーンの身元(ERC-8004, agentId 55560)を持つエージェントが、毎朝データをper-callで購入し日次の判断を記録。identityはCircleのDeveloper-Controlled Wallet経由でオンチェーン登録。Base mainnetのUSDCで実際にper-call決済し、自社のx402エンドポイントを自社エージェントが消費する自己完結の検証ループ。Railwayで毎日定刻に稼働。重要な判断の前にはWorld IDで本人性を確認し、人間が承認を挟む。',
    links: [
      { label: 'note', href: 'https://note.com/x402inc/n/nfe50d4acfcd8' },
      { label: 'GitHub', href: 'https://github.com/kato9292929/x402-Autonomous-Agent-' },
    ],
  },
  {
    tag: '03 · PRODUCE',
    name: 'Onchain Stock Data',
    badge: 'HTTP/1.1 402 ✓',
    desc: 'Claude(Opus)が毎週、米国株と日本株を10銘柄ずつ選んで予想。各銘柄に判定日付きの数値カタリストを付け、GitHub Actionsのcronで週次ファイルをgit commit、Vercelが配信。判定日後に決算短信・適時開示と突き合わせてscorecardに採点を残す。記録は消さずにgitへ残す設計で、このtrack recordがmoat。配信は /api/alpha/* の REST と MCP。',
    price: '$0.01/コール・Analyst $0.50〜$3.00',
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
    desc: '東京のあるスーパーの店頭価格を毎日記録して作る独自の物価指数。10カテゴリ等加重のJevons幾何平均で日次指数化(基準日2026-06-04)、上流のCGPI(企業物価, Shift-JIS処理に対応)も取り込み、上流から店頭までを接続して観測。x402エンドポイントとして配信し、per-callで購入できる。',
    links: [{ label: 'URL', href: 'https://jin-orcin-pi.vercel.app/' }],
  },
]

export function Featured() {
  return (
    <section id="products" className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionEyebrow label="Featured" tag="Products" />
        <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02]">
          Products Research and Development
        </h2>
        <p className="mt-6 text-white/60 text-base leading-[1.7] max-w-3xl">
          x402
          Inc.は、x402規格に対応したエンドポイントと独自データを作り、それを使う自律エージェントを動かしています。HTTP
          402を共通の決済レールに、Base/Solana上のオンチェーン決済とERC-8004のエージェントidentityを土台にしています。事業は発見(MAP)・自律消費(CONSUME)・データ生成(PRODUCE)の3層で構成されます。
        </p>
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
              <span className="text-xs font-medium tracking-wide text-[#E8C338]">{product.tag}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/10 text-white/50">
                {product.badge}
              </span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">{product.name}</h3>
            <p className="mt-3 text-sm text-white/60 leading-[1.7] flex-1">{product.desc}</p>
            {product.price && (
              <p className="mt-4 text-sm text-white/80">
                <span className="text-[#E8C338] font-semibold">
                  {product.price.split('・')[0]}
                </span>
                {product.price.includes('・') && (
                  <span className="text-white/50"> · {product.price.split('・').slice(1).join('・')}</span>
                )}
              </p>
            )}
            <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap gap-4">
              {product.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-white/60 hover:text-[#E8C338] transition-colors"
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
