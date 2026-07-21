import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '../primitives'

type Link = { label: string; href: string }
type Product = { name: string; badge: string; desc: string; price?: string; links: Link[] }
type Category = { title?: string; items: Product[] }
type Phase = { phase: string; phaseTitle: string; categories: Category[] }

const HTTP402 = 'HTTP/1.1 402 ✓'

const PHASES: Phase[] = [
  {
    phase: 'Phase 0',
    phaseTitle: 'Autonomous Agent × Nansen',
    categories: [
      {
        title: '▸ Nansen × Claude',
        items: [
          {
            name: 'Smart Money Screener',
            badge: HTTP402,
            desc: 'Nansenのスマートマネーデータをx402でゲート。STRONG BUYシグナルを検知してエージェントに返す。Base・Polygon・Solana対応。',
            price: '$0.05/クエリ',
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/nc828f649314c' },
              { label: 'URL', href: 'https://smartmoneyscreener.vercel.app/' },
            ],
          },
          {
            name: 'Onchain Intelligence Feed',
            badge: HTTP402,
            desc: 'NansenのオンチェーンデータをClaudeが日本語で解析。APACの取引所フロー・クジラ動向・週次レポートを従量課金で配信。',
            price: '$0.10〜$0.50',
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/nbbfaf4e22b72' },
              { label: 'URL', href: 'https://x402oif.vercel.app' },
            ],
          },
          {
            name: 'Whale Intent Decoder',
            badge: HTTP402,
            desc: '$100K以上の大口移動を検知し、ウォレットの過去90日の行動履歴からClaudeが意図を5分類。「移動の事実」ではなく「移動の意図」を返す。',
            price: '$0.10〜$0.50',
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/nb88bead73385' },
              { label: 'URL', href: 'https://x402wid.vercel.app' },
            ],
          },
          {
            name: 'Alpha Memo Protocol',
            badge: HTTP402,
            desc: 'Nansen×Claudeが生成したオンチェーンリサーチレポートを購入・転売できる市場。転売時に80%が転売者の収益に、20%がプロトコルへ還元。',
            price: '$1〜$5',
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/n841d12f0964d' },
              { label: 'URL', href: 'https://x402amp.vercel.app' },
            ],
          },
          {
            name: 'Smart Money Copy Terminal',
            badge: HTTP402,
            desc: 'スマートマネーのシグナル検知からCoinbase AgentKitによる自動執行まで一体化。Screenerが「見る」ツールなら、これは「動く」ツール。',
            price: '$0.05/シグナル・$0.10/執行',
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/n54c97cc1fc6b' },
              { label: 'URL', href: 'https://x402smct.vercel.app' },
            ],
          },
          {
            name: 'APAC Compliance Agent',
            badge: HTTP402,
            desc: 'World AgentKit × x402でAPAC5カ国のKYB・AMLスクリーニングを実装。執行前のコンプライアンス確認をエージェントが自律実行。',
            price: '$1〜$3/審査',
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/n745c6b5d746f' },
              { label: 'URL', href: 'https://x402aca.vercel.app' },
            ],
          },
        ],
      },
      {
        title: '▸ Trading',
        items: [
          {
            name: 'Nansen × Polymarket Divergence Analyzer',
            badge: HTTP402,
            desc: 'Nansenのスマートマネーデータ×Polymarketの予測市場データを統合分析。「オンチェーンとオフチェーンの予測が乖離しているトークン」を検出。',
            price: '$0.15〜$1.00',
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/n17e5b11860fa' },
              { label: 'URL', href: 'https://x402nansenpolymarket.vercel.app' },
            ],
          },
          {
            name: 'Hyperliquid Intelligence',
            badge: HTTP402,
            desc: 'HyperliquidのPerpDEXスマートマネーポジション×Polymarket予測市場の乖離を検出。Base・Solana対応。',
            price: '$0.15〜$2.00',
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/n948ccdeeef37' },
              { label: 'URL', href: 'https://x402-hl.vercel.app' },
            ],
          },
          {
            name: 'Private Market Intelligence',
            badge: HTTP402,
            desc: '未上場企業のバリュエーション予測市場をリアルタイムで追跡。Base・Solana対応。',
            price: '$0.15〜$2.00',
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/n0cb2e862630b' },
              { label: 'URL', href: 'https://x402pmi.vercel.app' },
            ],
          },
          {
            name: 'TradingView Signal Bridge',
            badge: HTTP402,
            desc: 'TradingViewのPine Scriptアラートをx402スタックに流すブリッジ。Base・Solana対応。',
            links: [
              { label: 'GitHub', href: 'https://github.com/kato9292929/tradingview' },
              { label: 'URL', href: 'https://tradingview-three.vercel.app' },
            ],
          },
        ],
      },
      {
        title: '▸ Asset Management',
        items: [
          {
            name: 'Portfolio Intelligence',
            badge: HTTP402,
            desc: 'ウォレットのポートフォリオをHelius・Alchemy・Nansenデータで自動分析・リバランス提案。Base・Solana・Polygon・BNB対応。',
            price: '$0.30〜$0.50',
            links: [
              { label: 'URL', href: 'https://x402pi.vercel.app' },
              { label: 'GitHub', href: 'https://github.com/kato9292929/x402-Portfolio-Intelligence' },
            ],
          },
          {
            name: 'Yield Intelligence',
            badge: HTTP402,
            desc: 'Solana DeFi（Kamino・Drift・Jupiter Lend）×Nansenスマートマネーのプール分析。Base・Solana・Polygon・BNB対応。',
            price: '$0.20〜$2.00',
            links: [
              { label: 'URL', href: 'https://x402yi.vercel.app' },
              { label: 'GitHub', href: 'https://github.com/kato9292929/x402-Yield-Intelligence' },
            ],
          },
          {
            name: 'APAC Macro Dashboard',
            badge: HTTP402,
            desc: 'Japan Data・e-Stat・Polymarket・Nansen・x402 Oracleを統合したAPACマクロ環境ダッシュボード。日銀政策金利・USD/JPY・APAC不動産・コアCPIを4パネルで構造化。',
            price: '$0.20〜$3.00',
            links: [
              { label: 'URL', href: 'https://x402amd.vercel.app' },
              { label: 'GitHub', href: 'https://github.com/kato9292929/x402-APAC-Macro-Dashboard' },
            ],
          },
          {
            name: 'Japan Real Estate Yield',
            badge: HTTP402,
            desc: '日本不動産の利回り・空室・将来予測を国土交通省・e-Stat統合で提供。Base・Solana・Polygon・BNB対応。',
            price: '$0.30〜$2.00',
            links: [
              { label: 'URL', href: 'https://x402-jrey.vercel.app' },
              { label: 'GitHub', href: 'https://github.com/kato9292929/x402-Japan-Real-Estate-Yield' },
            ],
          },
        ],
      },
    ],
  },
  {
    phase: 'Phase 1',
    phaseTitle: 'データインフラ層',
    categories: [
      {
        items: [
          {
            name: 'Japan x402 APIs',
            badge: HTTP402,
            desc: '日本のデータAPIにAIエージェント向け自律決済を実装。18本のエンドポイント（気象・地震・不動産・法人・人口統計等）をx402対応で提供。',
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/ncf3a3c9aed6f' },
              { label: 'URL', href: 'https://apijapan.vercel.app' },
            ],
          },
          {
            name: 'x402 Oracle',
            badge: HTTP402,
            desc: 'APACの不動産地価データをChainlink・Pyth互換のprice feed形式でオンチェーンに提供。日本・シンガポール・香港・オーストラリア・韓国の5カ国対応。',
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/n08beb0054097' },
              { label: 'GitHub', href: 'https://github.com/kato9292929/x402-Oracle' },
            ],
          },
          {
            name: 'APAC KYC API',
            badge: HTTP402,
            desc: 'APAC5カ国の公的法人データベースを横断するx402対応KYC API。AMLスクリーニング・制裁リスト照合付き。$1〜$3/call。',
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/n3eb83f96b787' },
              { label: 'GitHub', href: 'https://github.com/kato9292929/APAC_KYC_API' },
            ],
          },
          {
            name: 'Japan Market Bot',
            badge: HTTP402,
            desc: 'エージェントがエージェントに情報を売る—— AI ↔ AI 経済の最初のデモ。Japan Data APIを毎時自動取得してブリーフを生成・x402で販売。',
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/n6bb52ac9481b' },
              { label: 'GitHub', href: 'https://github.com/kato9292929/japanmarket_bot' },
            ],
          },
          {
            name: 'Japan Real Estate Agent',
            badge: HTTP402,
            desc: '複数APIを束ねてリサーチレポートを生成・販売するエージェント。x402エコシステムの「統合層」として機能。',
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/nbb0a47440083' },
              { label: 'GitHub', href: 'https://github.com/kato9292929/japan_rwa' },
            ],
          },
        ],
      },
    ],
  },
  {
    phase: 'Phase 2',
    phaseTitle: 'エコシステム層',
    categories: [
      {
        items: [
          {
            name: 'x402 Directory',
            badge: HTTP402,
            desc: 'AIには課金されるx402エコシステム日本語解説サイト。人間は無料・AIエージェントはBase上のUSDCで自動課金。',
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/n69a461b4023d' },
              { label: 'GitHub', href: 'https://github.com/kato9292929/x402-directory' },
            ],
          },
          {
            name: 'x402 Ecosystem Loop',
            badge: HTTP402,
            desc: '自分のプロダクト群を互いに叩き合わせるCronジョブ。x402エコシステム内でtxを循環させる設計。',
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/nc55c57044046' },
              { label: 'GitHub', href: 'https://github.com/kato9292929/x402-ecosystem-loop' },
            ],
          },
          {
            name: 'APAC Digital Commerce API',
            badge: HTTP402,
            desc: '月額SaaSをリクエスト単位に分解するx402の実験。ドメイン確認・SMS・翻訳・メール検証を従量課金で提供。',
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/nb1d1ddcd488a' },
              { label: 'GitHub', href: 'https://github.com/kato9292929/apac-digital-commerce' },
            ],
          },
        ],
      },
    ],
  },
  {
    phase: 'Phase 3',
    phaseTitle: 'プライバシー・決済出口',
    categories: [
      {
        items: [
          {
            name: 'x402 Private Gateway',
            badge: HTTP402,
            desc: 'Arcium MPCを使ったx402の決済検証プライバシーレイヤー。ウォレット・金額・エンドポイントを秘匿化。Colosseum Frontier提出済み。',
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/nac47800af431' },
              { label: 'GitHub', href: 'https://github.com/kato9292929/Arcium' },
            ],
          },
          {
            name: 'x402 Crypto Card',
            badge: HTTP402,
            desc: 'AIエージェントがUSDCを稼いでVisaカードで使うデモ。Solana → Nevermined Agent Card → Visa（150M+加盟店）のループ。',
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/nc7dd6f929186' },
              { label: 'GitHub', href: 'https://github.com/kato9292929/x402cryptocard' },
            ],
          },
        ],
      },
    ],
  },
]

function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="liquid-glass rounded-2xl p-5 flex flex-col"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-white">{product.name}</h3>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/10 text-white/50 whitespace-nowrap">
          {product.badge}
        </span>
      </div>
      <p className="mt-3 text-sm text-white/60 leading-[1.7] flex-1">{product.desc}</p>
      {product.price && <p className="mt-3 text-sm text-[#E8C338] font-semibold">{product.price}</p>}
      <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-4">
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
  )
}

export function Products() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        tag="プロダクト"
        title="Endpoint and Next Vision"
        intro="x402 Inc.のプロダクトはすべて、実装しながら市場を検証するためにあります。今 Human → AI で動くインフラが、やがて AI ↔ AI の決済層に転用される——その連続性を証明するために、プロダクトを動かし続けています。Phase 1（データインフラ）→ Phase 2（エコシステム）→ Phase 3（プライバシー・決済出口）の3フェーズで設計されています。"
      />

      {PHASES.map((phase) => (
        <section
          key={phase.phase}
          className="relative z-10 max-w-6xl mx-auto px-6 py-8 md:py-12"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#E8C338] text-black font-semibold">
              {phase.phase}
            </span>
            <span className="text-lg font-semibold tracking-tight text-white">
              {phase.phaseTitle}
            </span>
          </div>

          {phase.categories.map((cat, ci) => (
            <div key={cat.title ?? ci} className="mt-6">
              {cat.title && (
                <p className="text-sm font-medium text-white/50 mb-4">{cat.title}</p>
              )}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {cat.items.map((product) => (
                  <ProductCard key={product.name} product={product} />
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
    </>
  )
}
