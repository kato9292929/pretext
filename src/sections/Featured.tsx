import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionEyebrow } from '../primitives'
import { useLang, type Localized } from '../i18n'

type ProductLink = { label: string; href: string }

type Product = {
  tag: Localized
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
    tag: { ja: '01 · MAP（発見）', en: '01 · MAP (Discovery)' },
    name: 'x402 Endpoint',
    badge: 'HTTP/1.1 402 ✓',
    desc: {
      ja: 'x402 Endpoint は、x402エコシステムに関連した公開カタログを毎日取得し、エンドポイント・ホスト・カテゴリ・価格帯・取引ランキングを日次スナップショットとして保存しています。現在は104,682エンドポイント・7,921ホストの全量を対象としており、最近ではホスト名が企業の管理ドメイン配下にあるかを判定し、その企業自身の出品と、他社名を掲げた再販・ラッパーを区別しています。\n\n毎週、出品側（カタログ）と利用側（取引・ランキング）の両方から推移を分析し、数値の出所、取得方法、インサイトを発信。2026年6月上旬からの件数、カテゴリ、ホスト構成の推移を時系列で確認できるほか、REST APIとMCPサーバーを通じて配信しており、AIエージェントが直接データを読み取れます。',
      en: 'x402 Endpoint pulls the public catalogs of the x402 ecosystem every day and stores endpoints, hosts, categories, price ranges and transaction rankings as daily snapshots. It now covers the full set of 104,682 endpoints across 7,921 hosts. Recently it has started checking whether a hostname sits under a company’s own managed domain, separating a company’s own listings from resellers and wrappers that carry another company’s name.\n\nEvery week we analyze the trends from both the supply side (catalog) and the demand side (transactions and rankings), and publish where the numbers come from, how they were collected, and what they show. You can follow counts, categories and host composition as a time series from early June 2026, and the data is served over a REST API and an MCP server so AI agents can read it directly.',
    },
    image: '/products/endpoint.png',
    live: 'https://endpoint.x402jp.com/',
    links: [
      { label: 'note', href: 'https://note.com/x402inc/n/nb30efb0e7e92' },
      { label: 'GitHub', href: 'https://github.com/kato9292929/endpoint' },
    ],
  },
  {
    tag: { ja: '02 · CONSUME（消費）', en: '02 · CONSUME (Consumption)' },
    name: 'x402 Autonomous Agent',
    badge: 'Railway ✓',
    desc: {
      ja: 'オンチェーンID（ERC-8004 agentId：55560 on Base／845265 on Arc Testnet）を持つ自律エージェントです。毎朝06:00 JSTにデータをper-callで購入し、その日の判断を追記専用の記録として残しています。決済はSolanaおよびBase上のUSDCで1コールごとにオンチェーン完結し、署名は両チェーンともCircle Developer-Controlled Walletsが行います。\n\n自社エンドポイントの日次購入に加え、週次では第三者のx402売り手からも実際に購入しています。2026年第39週には4社・5コールに対しBase上で実決済を行いました。前者は決済スタックが日次でend-to-endに稼働することの実証であり、後者は境界をまたいで実際に買えることの確認です。いずれも当社が買い手であり、外部需要の観測ではありません。売買執行には接続せず、週次の高額データ購入前にはWorld IDによる人間の承認を必須とするなど、エージェントへの委任範囲を人間が管理する設計も実装しています。Arc Testnetでは、ERC-8004のReputationとValidationも記録済みです。',
      en: 'An autonomous agent with an on-chain identity (ERC-8004 agentId: 55560 on Base / 845265 on Arc Testnet). Every morning at 06:00 JST it buys data per-call and records the day’s decision as an append-only log. Each call settles on-chain in USDC on Solana and Base, and Circle Developer-Controlled Wallets sign on both chains.\n\nOn top of daily purchases from our own endpoints, it also makes real weekly purchases from third-party x402 sellers — in week 39 of 2026 it settled 5 calls with 4 sellers on Base. The former shows the payment stack running end-to-end every day; the latter confirms it can actually buy across the boundary. In both cases we are the buyer, so this is not a measure of external demand. It is not connected to trade execution, and humans control the scope delegated to the agent — for example, a World ID human approval is required before weekly high-value data purchases. On Arc Testnet, ERC-8004 Reputation and Validation have also been recorded.',
    },
    image: '/products/aa.png',
    live: 'https://aa.x402jp.com/',
    links: [
      { label: 'note', href: 'https://note.com/x402inc/n/nfe50d4acfcd8' },
      { label: 'GitHub', href: 'https://github.com/kato9292929/x402-Autonomous-Agent-' },
    ],
  },
  {
    tag: { ja: '03 · PRODUCE（データ生成）', en: '03 · PRODUCE (Data production)' },
    name: 'Onchain Stock Data',
    badge: 'HTTP/1.1 402 ✓',
    desc: {
      ja: 'Claudeを用いて毎週、米国株・日本株を10銘柄ずつ選定し、各銘柄に期限を定めた1か月のカタリスト（検証可能な予測条件）を付与しています。期限到来後には、決算・適時開示などの一次情報と突き合わせ、hit / partial / miss を機械的に採点します。現在までに83件の判定が確定しており、内訳は hit 39 / partial 28 / miss 16 です。記録は上書き・削除せずGitに追記し、積み上がるtrack recordそのものが希少性の高いデータとなるよう設計しています。\n\n日本株では、EDINETで開示を行う企業約4,000社を母集団に197社を選定しました。このうち13社には日付と成立条件を確定させたカタリストを付与済みで、per-callで取得できる形で提供しています。MCP経由ではClaudeやChatGPTから自然言語で参照でき、x402のper-call決済ではエージェントが自律的にデータを購入できます。\n\n本サービスはファンドではなく、リサーチおよびセレクションのためのデータサービスです。本データはAIの予測精度を検証する記録であり、投資助言を目的とするものではありません。投資判断は利用者自身の責任で行ってください。',
      en: 'Each week we use Claude to select 10 US and 10 Japanese stocks and attach a one-month, time-boxed catalyst (a verifiable forecast condition) to each. Once the deadline passes, the catalyst is checked against primary sources such as earnings and timely disclosures and mechanically scored hit / partial / miss. 83 verdicts have been finalized so far: hit 39 / partial 28 / miss 16. Records are never overwritten or deleted but appended to Git, so the growing track record itself becomes scarce, high-value data.\n\nFor Japanese stocks, we selected 197 companies from a universe of roughly 4,000 that file on EDINET. 13 of them already carry catalysts with a fixed date and success condition, available per-call. Via MCP, Claude and ChatGPT can query it in natural language, and with x402 per-call payments agents can buy the data autonomously.\n\nThis service is not a fund; it is a data service for research and selection. The data is a record for verifying AI forecast accuracy and is not investment advice. Investment decisions are your own responsibility.',
    },
    image: '/products/osd.png',
    live: 'https://osd.x402jp.com/',
    links: [
      { label: 'note', href: 'https://note.com/x402inc/n/n28686d262552' },
      { label: 'GitHub', href: 'https://github.com/kato9292929/onchain-stock-data' },
    ],
  },
  {
    tag: { ja: '03 · PRODUCE（データ生成）', en: '03 · PRODUCE (Data production)' },
    name: 'Japan Inflation Nowcast',
    badge: 'HTTP/1.1 402 ✓',
    desc: {
      ja: '東京の中堅スーパーマーケット1店舗の店頭価格を定点で記録し、独自の食品物価指数として提供するサービスです。指数は固定基準日（2026-06-04 = 100）に対する同一SKUの価格相対を取り、中分類ごとにJevons幾何平均で基礎集計したうえで、10カテゴリを等加重して上位集計します。価格はパックサイズや単位の違いを吸収した正準単価（¥/100g・¥/100ml・¥/個）に揃えてから比較するため、内容量の変更は値上げとして正しく拾われます。\n\n特売の扱いは2系列に分けており、基調となる excl_promo は基準日または当日に特売フラグの付いたSKUを除外し、incl_promo は特売を含めたまま集計します。配信はx402（Solana / USDC）です。latest は無料で、指数値・matched数・カバレッジ注記・方法論を返します。series は全履歴、movers はその日に動いた品目の内訳で、いずれも per-call で購入できます。価格は series が $0.01、movers が $0.02 です。',
      en: 'A proprietary food price index built from fixed-point records of shelf prices at one mid-sized Tokyo supermarket. The index takes same-SKU price relatives against a fixed base date (2026-06-04 = 100), aggregates them per sub-category with a Jevons geometric mean, then combines 10 categories with equal weights. Prices are first normalized to canonical unit prices (¥/100g, ¥/100ml, ¥/item) that absorb differences in pack size and unit, so shrinkflation is correctly captured as a price increase.\n\nSales are handled as two series: the core excl_promo excludes SKUs flagged as on sale on the base date or the current day, while incl_promo keeps sales in. Delivery is via x402 (Solana / USDC). latest is free and returns the index value, matched count, coverage notes and methodology. series (full history) and movers (the items that moved that day) are purchasable per-call at $0.01 and $0.02 respectively.',
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
                  <span className="text-xs font-medium tracking-wide text-gold">{product.tag[lang]}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-fg/10 text-fg/50">
                    {product.badge}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-fg">{product.name}</h3>
                <p className="mt-3 text-sm text-fg/60 leading-[1.7] flex-1 whitespace-pre-line">
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
