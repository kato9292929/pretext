import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useLang, type Lang, type Localized } from '../i18n'

type Ep = { method: string; path: string; free?: boolean; price?: string; desc: Localized }
type Group = { name: string; host?: string; note: Localized; eps: Ep[] }

type Link = { label: string; href: string }
type Product = { name: string; badge: string; desc: Localized; price?: Localized; links: Link[] }
type Category = { title?: string; items: Product[] }
type Phase = { phase: string; phaseTitle: Localized; categories: Category[] }

const HTTP402 = 'HTTP/1.1 402 ✓'

const COPY = {
  ja: {
    payHead: 'How to Pay',
    payFreeLabel: '無料のものは、そのまま叩ける。',
    payPaidLabel:
      '有料のものは、最初のリクエストで402が返る。402のヘッダに、支払い先・金額・チェーンが載っている。',
    steps: [
      '対象URLにGET（またはPOST）',
      '402 Payment Required が返る（PAYMENT-REQUIRED ヘッダに 支払い先・金額・チェーン）',
      'USDCの支払いを署名する（Base: EIP-3009 TransferWithAuthorization / Solana: SPL TransferChecked。facilitatorが手数料を持つので SOLは要らない）',
      '署名を X-PAYMENT ヘッダに載せて、同じURLへ再リクエスト',
      '200 OK とデータ（PAYMENT-RESPONSE ヘッダに決済トランザクション）',
    ],
    payNote:
      '金額・チェーン・手数料支払い者は決め打ちにせず、402が提示する値を使う。複数チェーンを提示する場合はクライアント側で選ぶ。x402対応クライアント（@x402/fetch など）を使えば往復は自動。機械可読な定義は各ホストの /.well-known/x402.json にある。',
    endpointsHead: 'Endpoints',
    agentHead: 'これらを毎日叩いているエージェント',
    agentDesc:
      '当社の自律エージェント（AA）は、Base mainnet上のオンチェーンidentity（ERC-8004、agentId 55560）を持ち、毎日06:00 JSTに上記のエンドポイントを叩いて、1コールずつUSDCで決済している。決済の署名は Circle Developer-Controlled Wallet が行う。',
    agentRunHead: '直近の稼働（2026年7月23日 06:00 JST）',
    agentVerify:
      '支払いはすべてオンチェーンに記録され、Basescan / Solscan で検証できる。同じエンドポイントは、誰でも同じ手順で叩ける。',
    catalogHead: 'Products',
    catalogIntro:
      'x402 Inc.のプロダクトはすべて、実装しながら市場を検証するためにあります。Phase 1（データインフラ）→ Phase 2（エコシステム）→ Phase 3（プライバシー・決済出口）の3フェーズで設計されています。',
    catalogListHead: 'Product catalog',
  },
  en: {
    payHead: 'How to Pay',
    payFreeLabel: 'Free endpoints can be called directly.',
    payPaidLabel:
      'Paid ones return 402 on the first request; the 402 header carries the payee, amount, and chain.',
    steps: [
      'GET (or POST) the target URL',
      '402 Payment Required returns (PAYMENT-REQUIRED header has payee / amount / chain)',
      'Sign the USDC payment (Base: EIP-3009 TransferWithAuthorization / Solana: SPL TransferChecked; the facilitator covers the fee, so no SOL needed)',
      'Re-request the same URL with the signature in the X-PAYMENT header',
      '200 OK with data (PAYMENT-RESPONSE header has the settlement transaction)',
    ],
    payNote:
      'Don’t hardcode amount / chain / fee-payer — use the values the 402 offers. If it presents multiple chains, the client chooses. An x402-capable client (@x402/fetch, etc.) handles the round-trip automatically. Machine-readable definitions live at each host’s /.well-known/x402.json.',
    endpointsHead: 'Endpoints',
    agentHead: 'The agent that calls these every day',
    agentDesc:
      'Our autonomous agent (AA) has an on-chain identity on Base mainnet (ERC-8004, agentId 55560). Every day at 06:00 JST it calls the endpoints above, settling in USDC one call at a time. Circle’s Developer-Controlled Wallet signs the payments.',
    agentRunHead: 'Most recent run (2026-07-23, 06:00 JST)',
    agentVerify:
      'Every payment is recorded on-chain and verifiable on Basescan / Solscan. Anyone can call the same endpoints with the same steps.',
    catalogHead: 'Products',
    catalogIntro:
      'Every x402 Inc. product exists to validate the market while building it. Designed in three phases: Phase 1 (data infrastructure) → Phase 2 (ecosystem) → Phase 3 (privacy & payment exit).',
    catalogListHead: 'Product catalog',
  },
} satisfies Record<Lang, Record<string, unknown>>

const GROUPS: Group[] = [
  {
    name: 'Japan Inflation Nowcast',
    host: 'jin-orcin-pi.vercel.app',
    note: { ja: '決済は Solana USDC。discovery は /.well-known/x402.json。', en: 'Payment in Solana USDC. Discovery at /.well-known/x402.json.' },
    eps: [
      { method: 'GET', path: '/api/jin/latest', free: true, desc: { ja: '最新観測日の指数。観測値 + matched + 方法論。', en: 'Index for the latest observation date. Value + matched + methodology.' } },
      { method: 'GET', path: '/api/jin/series', price: '$0.01', desc: { ja: '指数の時系列。機械向け。', en: 'Time series of the index. For machines.' } },
      { method: 'GET', path: '/api/jin/movers', price: '$0.02', desc: { ja: 'その日動いた品目。特売タグ付き。機械向け。', en: 'Items that moved that day, with sale tags. For machines.' } },
    ],
  },
  {
    name: 'Onchain Stock Data',
    host: 'osd-coral.vercel.app',
    note: { ja: '決済は Base または Solana USDC。402が両方のチェーンを提示するので、クライアントがどちらかを選ぶ。', en: 'Payment in Base or Solana USDC. The 402 offers both chains, so the client picks one.' },
    eps: [
      { method: 'GET', path: '/api/alpha/portfolio/current', price: '$0.01', desc: { ja: '米国ポートフォリオ。現在の10銘柄と各社のthesis・判定期日。', en: 'US portfolio. Current 10 names with each thesis and decision date.' } },
      { method: 'GET', path: '/api/alpha/portfolio/scorecard', price: '$0.01', desc: { ja: '米国の的中実績。hit / partial / miss と SPY・QQQ 比。', en: 'US hit record. hit / partial / miss vs SPY / QQQ.' } },
      { method: 'GET', path: '/api/alpha/jp/portfolio/current', price: '$0.01', desc: { ja: '日本ポートフォリオ。現在の10銘柄。', en: 'Japan portfolio. Current 10 names.' } },
      { method: 'GET', path: '/api/alpha/jp/scorecard', price: '$0.01', desc: { ja: '日本の的中実績。ベンチマーク比。', en: 'Japan hit record vs benchmark.' } },
      { method: 'GET', path: '/api/alpha/jp/catalysts', price: '$0.01', desc: { ja: '日本株のカタリスト一覧。期日到来後に判定。', en: 'Catalysts for Japanese stocks. Scored after the date passes.' } },
      { method: 'GET', path: '/api/stocks/:ticker', price: '$0.01', desc: { ja: '銘柄データ。ticker指定。', en: 'Per-name data. Specify a ticker.' } },
    ],
  },
  {
    name: 'Intelligence',
    note: { ja: '決済は Base USDC。', en: 'Payment in Base USDC.' },
    eps: [
      { method: 'GET', path: 'x402amd.vercel.app/api/macro/dashboard', price: '$0.30', desc: { ja: 'APACマクロ。金利・為替・フロー・リスク regime。', en: 'APAC macro. Rates, FX, flows, risk regime.' } },
      { method: 'GET', path: 'x402yi.vercel.app/api/yield/scan', price: '$0.20', desc: { ja: 'DeFiの利回りスキャン。プール別のAPYとスマートマネー残高。', en: 'DeFi yield scan. Per-pool APY and smart-money balances.' } },
      { method: 'POST', path: 'x402pi.vercel.app/api/portfolio/analyze', price: '$0.50', desc: { ja: 'ウォレットアドレスを渡すとポートフォリオを分析。', en: 'Pass a wallet address to analyze its portfolio.' } },
      { method: 'GET', path: 'x402-jrey.vercel.app/api/realestate/yield?area=tokyo', price: '$0.30', desc: { ja: '日本の不動産利回り。エリア指定。', en: 'Japanese real estate yield. Specify an area.' } },
      { method: 'GET', path: 'x402nansenpolymarket.vercel.app/api/divergence/scan', price: '$0.15', desc: { ja: '予測市場とオンチェーンフローの乖離スキャン。', en: 'Divergence scan between prediction markets and on-chain flows.' } },
      { method: 'GET', path: 'x402-hl.vercel.app/api/hyperliquid/scan', price: '$0.20', desc: { ja: 'Hyperliquidの建玉・ファンディングとスマートマネーの偏り。', en: 'Hyperliquid open interest / funding and smart-money skew.' } },
      { method: 'GET', path: 'smartmoneyscreener.vercel.app/api/screener/smart-money', price: '$0.05', desc: { ja: 'スマートマネーが買っているトークンのスクリーニング。', en: 'Screen tokens that smart money is buying.' } },
      { method: 'GET', path: 'x402oif.vercel.app/api/feed/apac-daily', price: '$0.10', desc: { ja: 'APACの日次オンチェーンサマリー。', en: 'Daily APAC on-chain summary.' } },
      { method: 'GET', path: 'x402oif.vercel.app/api/feed/whale-alert', price: '$0.20', desc: { ja: '大口転送のアラート。', en: 'Alerts on large transfers.' } },
      { method: 'GET', path: 'odo-gamma.vercel.app/funding/nowcast/current', price: '$0.01', desc: { ja: 'perpのファンディング・ナウキャスト。バスケット別。', en: 'Perp funding nowcast, by basket.' } },
    ],
  },
]

const RUN: { label: Localized; detail: Localized }[] = [
  {
    label: { ja: '市況の取得', en: 'Market fetch' },
    detail: {
      ja: '15エンドポイントを順に叩く。決済 $1.85 USDC / 9トランザクション / 40秒。',
      en: 'Calls 15 endpoints in order. Paid $1.85 USDC / 9 transactions / 40s.',
    },
  },
  {
    label: { ja: '日次の判断', en: 'Daily decision' },
    detail: {
      ja: '取得したデータからその日の判断を1件記録。',
      en: 'Records one decision for the day.',
    },
  },
  {
    label: { ja: '実績データの購入', en: 'Buying record data' },
    detail: {
      ja: 'OSDのalpha 5本を1コールずつ購入し、取得したスナップショットを追記型で保存。各 $0.01、5本すべて200。',
      en: 'Buys the 5 alpha endpoints one call each and appends each snapshot. $0.01 each, all 5 returned 200.',
    },
  },
  {
    label: { ja: '追加の購入', en: 'Extra purchases' },
    detail: {
      ja: '銘柄データとオンチェーンデータを追加取得。この回の支出 $0.03（上限 $0.20）。',
      en: 'Fetches extra stock and on-chain data. Spend $0.03 this run (cap $0.20).',
    },
  },
]

const PHASES: Phase[] = [
  {
    phase: 'Phase 0',
    phaseTitle: { ja: 'Autonomous Agent × Nansen', en: 'Autonomous Agent × Nansen' },
    categories: [
      {
        title: '▸ Nansen × Claude',
        items: [
          {
            name: 'Smart Money Screener',
            badge: HTTP402,
            desc: {
              ja: 'Nansenのスマートマネーデータをx402でゲート。STRONG BUYシグナルを検知してエージェントに返す。Base・Polygon・Solana対応。',
              en: 'Gates Nansen smart-money data behind x402. Detects STRONG BUY signals and returns them to agents. Base / Polygon / Solana.',
            },
            price: { ja: '$0.05/クエリ', en: '$0.05/query' },
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/nc828f649314c' },
              { label: 'URL', href: 'https://smartmoneyscreener.vercel.app/' },
            ],
          },
          {
            name: 'Onchain Intelligence Feed',
            badge: HTTP402,
            desc: {
              ja: 'NansenのオンチェーンデータをClaudeが日本語で解析。APACの取引所フロー・クジラ動向・週次レポートを従量課金で配信。',
              en: 'Claude analyzes Nansen on-chain data. Delivers APAC exchange flows, whale moves and weekly reports on a pay-per-use basis.',
            },
            price: { ja: '$0.10〜$0.50', en: '$0.10–$0.50' },
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/nbbfaf4e22b72' },
              { label: 'URL', href: 'https://x402oif.vercel.app' },
            ],
          },
          {
            name: 'Whale Intent Decoder',
            badge: HTTP402,
            desc: {
              ja: '$100K以上の大口移動を検知し、ウォレットの過去90日の行動履歴からClaudeが意図を5分類。「移動の事実」ではなく「移動の意図」を返す。',
              en: 'Detects moves over $100K and classifies intent into five categories from the wallet’s 90-day history. Returns the intent behind a move, not just the fact of it.',
            },
            price: { ja: '$0.10〜$0.50', en: '$0.10–$0.50' },
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/nb88bead73385' },
              { label: 'URL', href: 'https://x402wid.vercel.app' },
            ],
          },
          {
            name: 'Alpha Memo Protocol',
            badge: HTTP402,
            desc: {
              ja: 'Nansen×Claudeが生成したオンチェーンリサーチレポートを購入・転売できる市場。転売時に80%が転売者の収益に、20%がプロトコルへ還元。',
              en: 'A marketplace to buy and resell on-chain research reports generated by Nansen × Claude. On resale, 80% goes to the reseller and 20% back to the protocol.',
            },
            price: { ja: '$1〜$5', en: '$1–$5' },
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/n841d12f0964d' },
              { label: 'URL', href: 'https://x402amp.vercel.app' },
            ],
          },
          {
            name: 'Smart Money Copy Terminal',
            badge: HTTP402,
            desc: {
              ja: 'スマートマネーのシグナル検知からCoinbase AgentKitによる自動執行まで一体化。Screenerが「見る」ツールなら、これは「動く」ツール。',
              en: 'Unifies smart-money signal detection with automated execution via Coinbase AgentKit. If the Screener is the “watch” tool, this is the “act” tool.',
            },
            price: { ja: '$0.05/シグナル・$0.10/執行', en: '$0.05/signal · $0.10/execution' },
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/n54c97cc1fc6b' },
              { label: 'URL', href: 'https://x402smct.vercel.app' },
            ],
          },
          {
            name: 'APAC Compliance Agent',
            badge: HTTP402,
            desc: {
              ja: 'World AgentKit × x402でAPAC5カ国のKYB・AMLスクリーニングを実装。執行前のコンプライアンス確認をエージェントがその場で実行。',
              en: 'KYB/AML screening across 5 APAC countries via World AgentKit × x402. Agents run pre-execution compliance checks per-call.',
            },
            price: { ja: '$1〜$3/審査', en: '$1–$3/review' },
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
            desc: {
              ja: 'Nansenのスマートマネーデータ×Polymarketの予測市場データを統合分析。「オンチェーンとオフチェーンの予測が乖離しているトークン」を検出。',
              en: 'Combines Nansen smart-money data with Polymarket prediction markets to detect tokens where on-chain and off-chain expectations diverge.',
            },
            price: { ja: '$0.15〜$1.00', en: '$0.15–$1.00' },
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/n17e5b11860fa' },
              { label: 'URL', href: 'https://x402nansenpolymarket.vercel.app' },
            ],
          },
          {
            name: 'Hyperliquid Intelligence',
            badge: HTTP402,
            desc: {
              ja: 'HyperliquidのPerpDEXスマートマネーポジション×Polymarket予測市場の乖離を検出。Base・Solana対応。',
              en: 'Detects divergence between Hyperliquid PerpDEX smart-money positions and Polymarket prediction markets. Base / Solana.',
            },
            price: { ja: '$0.15〜$2.00', en: '$0.15–$2.00' },
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/n948ccdeeef37' },
              { label: 'URL', href: 'https://x402-hl.vercel.app' },
            ],
          },
          {
            name: 'Private Market Intelligence',
            badge: HTTP402,
            desc: {
              ja: '未上場企業のバリュエーション予測市場をリアルタイムで追跡。Base・Solana対応。',
              en: 'Tracks valuation prediction markets for private companies in real time. Base / Solana.',
            },
            price: { ja: '$0.15〜$2.00', en: '$0.15–$2.00' },
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/n0cb2e862630b' },
              { label: 'URL', href: 'https://x402pmi.vercel.app' },
            ],
          },
          {
            name: 'TradingView Signal Bridge',
            badge: HTTP402,
            desc: {
              ja: 'TradingViewのPine Scriptアラートをx402スタックに流すブリッジ。Base・Solana対応。',
              en: 'A bridge that pipes TradingView Pine Script alerts into the x402 stack. Base / Solana.',
            },
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
            desc: {
              ja: 'ウォレットのポートフォリオをHelius・Alchemy・Nansenデータで自動分析・リバランス提案。Base・Solana・Polygon・BNB対応。',
              en: 'Auto-analyzes a wallet’s portfolio using Helius, Alchemy and Nansen data and suggests rebalancing. Base / Solana / Polygon / BNB.',
            },
            price: { ja: '$0.30〜$0.50', en: '$0.30–$0.50' },
            links: [
              { label: 'URL', href: 'https://x402pi.vercel.app' },
              { label: 'GitHub', href: 'https://github.com/kato9292929/x402-Portfolio-Intelligence' },
            ],
          },
          {
            name: 'Yield Intelligence',
            badge: HTTP402,
            desc: {
              ja: 'Solana DeFi（Kamino・Drift・Jupiter Lend）×Nansenスマートマネーのプール分析。Base・Solana・Polygon・BNB対応。',
              en: 'Pool analysis across Solana DeFi (Kamino, Drift, Jupiter Lend) × Nansen smart money. Base / Solana / Polygon / BNB.',
            },
            price: { ja: '$0.20〜$2.00', en: '$0.20–$2.00' },
            links: [
              { label: 'URL', href: 'https://x402yi.vercel.app' },
              { label: 'GitHub', href: 'https://github.com/kato9292929/x402-Yield-Intelligence' },
            ],
          },
          {
            name: 'APAC Macro Dashboard',
            badge: HTTP402,
            desc: {
              ja: 'Japan Data・e-Stat・Polymarket・Nansen・x402 Oracleを統合したAPACマクロ環境ダッシュボード。日銀政策金利・USD/JPY・APAC不動産・コアCPIを4パネルで構造化。',
              en: 'An APAC macro dashboard integrating Japan Data, e-Stat, Polymarket, Nansen and x402 Oracle. Structures BoJ policy rate, USD/JPY, APAC real estate and core CPI into four panels.',
            },
            price: { ja: '$0.20〜$3.00', en: '$0.20–$3.00' },
            links: [
              { label: 'URL', href: 'https://x402amd.vercel.app' },
              { label: 'GitHub', href: 'https://github.com/kato9292929/x402-APAC-Macro-Dashboard' },
            ],
          },
          {
            name: 'Japan Real Estate Yield',
            badge: HTTP402,
            desc: {
              ja: '日本不動産の利回り・空室・将来予測を国土交通省・e-Stat統合で提供。Base・Solana・Polygon・BNB対応。',
              en: 'Japanese real estate yields, vacancy and forecasts, integrating MLIT and e-Stat data. Base / Solana / Polygon / BNB.',
            },
            price: { ja: '$0.30〜$2.00', en: '$0.30–$2.00' },
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
    phaseTitle: { ja: 'データインフラ層', en: 'Data infrastructure layer' },
    categories: [
      {
        items: [
          {
            name: 'Japan x402 APIs',
            badge: HTTP402,
            desc: {
              ja: '日本のデータAPIにAIエージェント向けのper-callオンチェーン決済を実装。18本のエンドポイント（気象・地震・不動産・法人・人口統計等）をx402対応で提供。',
              en: 'Adds agent-native per-call on-chain payments to Japanese data APIs. Provides 18 x402-enabled endpoints (weather, earthquakes, real estate, corporate, demographics, etc.).',
            },
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/ncf3a3c9aed6f' },
              { label: 'URL', href: 'https://apijapan.vercel.app' },
            ],
          },
          {
            name: 'x402 Oracle',
            badge: HTTP402,
            desc: {
              ja: 'APACの不動産地価データをChainlink・Pyth互換のprice feed形式でオンチェーンに提供。日本・シンガポール・香港・オーストラリア・韓国の5カ国対応。',
              en: 'Delivers APAC real estate land-price data on-chain in a Chainlink/Pyth-compatible price-feed format. Covers Japan, Singapore, Hong Kong, Australia and Korea.',
            },
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/n08beb0054097' },
              { label: 'GitHub', href: 'https://github.com/kato9292929/x402-Oracle' },
            ],
          },
          {
            name: 'APAC KYC API',
            badge: HTTP402,
            desc: {
              ja: 'APAC5カ国の公的法人データベースを横断するx402対応KYC API。AMLスクリーニング・制裁リスト照合付き。$1〜$3/call。',
              en: 'An x402-enabled KYC API spanning public corporate databases in 5 APAC countries, with AML screening and sanctions-list matching. $1–$3/call.',
            },
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/n3eb83f96b787' },
              { label: 'GitHub', href: 'https://github.com/kato9292929/APAC_KYC_API' },
            ],
          },
          {
            name: 'Japan Market Bot',
            badge: HTTP402,
            desc: {
              ja: 'エージェントがエージェントに情報を売る—— AI ↔ AI 経済の最初のデモ。Japan Data APIを毎時自動取得してブリーフを生成・x402で販売。',
              en: 'An agent selling information to agents — the first demo of the AI ↔ AI economy. Pulls the Japan Data API hourly to generate briefs and sells them via x402.',
            },
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/n6bb52ac9481b' },
              { label: 'GitHub', href: 'https://github.com/kato9292929/japanmarket_bot' },
            ],
          },
          {
            name: 'Japan Real Estate Agent',
            badge: HTTP402,
            desc: {
              ja: '複数APIを束ねてリサーチレポートを生成・販売するエージェント。x402エコシステムの「統合層」として機能。',
              en: 'An agent that bundles multiple APIs to generate and sell research reports. Acts as the “integration layer” of the x402 ecosystem.',
            },
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
    phaseTitle: { ja: 'エコシステム層', en: 'Ecosystem layer' },
    categories: [
      {
        items: [
          {
            name: 'x402 Directory',
            badge: HTTP402,
            desc: {
              ja: 'AIには課金されるx402エコシステム日本語解説サイト。人間は無料・AIエージェントはBase上のUSDCで自動課金。',
              en: 'A Japanese-language guide to the x402 ecosystem that charges AI. Free for humans; AI agents are auto-charged in USDC on Base.',
            },
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/n69a461b4023d' },
              { label: 'GitHub', href: 'https://github.com/kato9292929/x402-directory' },
            ],
          },
          {
            name: 'x402 Ecosystem Loop',
            badge: HTTP402,
            desc: {
              ja: '自分のプロダクト群を互いに叩き合わせるCronジョブ。x402エコシステム内でtxを循環させる設計。',
              en: 'A cron job that has our products call each other, circulating transactions within the x402 ecosystem.',
            },
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/nc55c57044046' },
              { label: 'GitHub', href: 'https://github.com/kato9292929/x402-ecosystem-loop' },
            ],
          },
          {
            name: 'APAC Digital Commerce API',
            badge: HTTP402,
            desc: {
              ja: '月額SaaSをリクエスト単位に分解するx402の実験。ドメイン確認・SMS・翻訳・メール検証を従量課金で提供。',
              en: 'An x402 experiment that decomposes monthly SaaS into per-request units. Domain checks, SMS, translation and email verification on a pay-per-use basis.',
            },
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
    phaseTitle: { ja: 'プライバシー・決済出口', en: 'Privacy & payment exit' },
    categories: [
      {
        items: [
          {
            name: 'x402 Private Gateway',
            badge: HTTP402,
            desc: {
              ja: 'Arcium MPCを使ったx402の決済検証プライバシーレイヤー。ウォレット・金額・エンドポイントを秘匿化。Colosseum Frontier提出済み。',
              en: 'A payment-verification privacy layer for x402 using Arcium MPC. Conceals wallet, amount and endpoint. Submitted to Colosseum Frontier.',
            },
            links: [
              { label: 'note', href: 'https://note.com/x402inc/n/nac47800af431' },
              { label: 'GitHub', href: 'https://github.com/kato9292929/Arcium' },
            ],
          },
          {
            name: 'x402 Crypto Card',
            badge: HTTP402,
            desc: {
              ja: 'AIエージェントがUSDCを稼いでVisaカードで使うデモ。Solana → Nevermined Agent Card → Visa（150M+加盟店）のループ。',
              en: 'A demo where an AI agent earns USDC and spends it on a Visa card. Solana → Nevermined Agent Card → Visa (150M+ merchants) loop.',
            },
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

function EndpointRow({ ep, lang }: { ep: Ep; lang: Lang }) {
  return (
    <div className="py-3 border-b border-fg/10 last:border-0">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <code className="font-mono text-[13px] break-all">
          <span className="text-fg/40">{ep.method}</span>{' '}
          <span className="text-fg/90">{ep.path}</span>
        </code>
        <span
          className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
            ep.free ? 'border-[#28c840]/40 text-[#28c840]' : 'border-fg/15'
          }`}
          style={ep.free ? undefined : { color: 'rgb(var(--gold))', borderColor: 'rgb(var(--gold) / 0.4)' }}
        >
          {ep.free ? '200 ✓' : '402 ✓'}
        </span>
        <span className="text-xs font-semibold text-gold">{ep.free ? 'free' : ep.price}</span>
      </div>
      <p className="mt-1 text-xs text-fg/50 leading-[1.6]">{ep.desc[lang]}</p>
    </div>
  )
}

function ProductCard({ product, lang }: { product: Product; lang: Lang }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="liquid-glass rounded-2xl p-5 flex flex-col"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-fg">{product.name}</h3>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-fg/10 text-fg/50 whitespace-nowrap">
          {product.badge}
        </span>
      </div>
      <p className="mt-3 text-sm text-fg/60 leading-[1.7] flex-1">{product.desc[lang]}</p>
      {product.price && (
        <p className="mt-3 text-sm text-gold font-semibold">{product.price[lang]}</p>
      )}
      <div className="mt-4 pt-3 border-t border-fg/10 flex flex-wrap gap-4">
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
  )
}

export function Products() {
  const { lang } = useLang()
  const t = COPY[lang] as (typeof COPY)['ja']
  return (
    <>
      {/* Products intro — top of the page */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-24 md:pt-32 pb-2">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-fg">{t.catalogHead}</h1>
        <p className="mt-6 text-sm md:text-base text-fg/70 leading-[1.8] max-w-3xl">{t.catalogIntro}</p>
      </section>

      {/* How to Pay */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-fg">{t.payHead}</h2>
        <p className="mt-6 text-sm text-fg/70 leading-[1.7]">{t.payFreeLabel}</p>
        <pre className="mt-3 liquid-glass rounded-xl p-4 text-xs md:text-sm font-mono text-fg/80 overflow-x-auto">
          <span className="text-fg/40">$ </span>curl https://jin-orcin-pi.vercel.app/api/jin/latest
        </pre>
        <p className="mt-6 text-sm text-fg/70 leading-[1.7]">{t.payPaidLabel}</p>
        <ol className="mt-4 space-y-3">
          {t.steps.map((s, i) => (
            <li key={i} className="flex gap-3 text-sm text-fg/70 leading-[1.6]">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-fg/[0.06] border border-fg/10 flex items-center justify-center text-xs font-mono text-gold">
                {i + 1}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-xs text-fg/50 leading-[1.7]">{t.payNote}</p>
      </section>

      {/* Endpoints */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-6 md:py-10">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-fg">
          {t.endpointsHead}
        </h2>
        <div className="mt-6 space-y-6">
          {GROUPS.map((g) => (
            <motion.div
              key={g.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="liquid-glass rounded-2xl p-5 md:p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base md:text-lg font-semibold text-fg">{g.name}</h3>
                {g.host && <code className="font-mono text-xs text-fg/50">host: {g.host}</code>}
              </div>
              <div className="mt-3">
                {g.eps.map((ep) => (
                  <EndpointRow key={ep.path} ep={ep} lang={lang} />
                ))}
              </div>
              <p className="mt-3 text-xs text-fg/50">{g.note[lang]}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Daily agent */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-fg">{t.agentHead}</h2>
        <p className="mt-4 text-sm text-fg/70 leading-[1.7]">{t.agentDesc}</p>
        <p className="mt-6 text-xs uppercase tracking-widest text-fg/40">{t.agentRunHead}</p>
        <div className="mt-4 grid gap-3">
          {RUN.map((r) => (
            <div key={r.label.en} className="liquid-glass rounded-xl p-4">
              <p className="text-sm font-semibold text-fg">{r.label[lang]}</p>
              <p className="mt-1 text-xs text-fg/60 leading-[1.7]">{r.detail[lang]}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-fg/50 leading-[1.7]">{t.agentVerify}</p>
      </section>

      {/* Product catalog (Phase 0–3) */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-14 md:py-20 border-t border-fg/10">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-fg">{t.catalogListHead}</h2>

        {PHASES.map((phase) => (
          <div key={phase.phase} className="mt-10">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-gold text-black font-semibold">
                {phase.phase}
              </span>
              <span className="text-lg font-semibold tracking-tight text-fg">
                {phase.phaseTitle[lang]}
              </span>
            </div>
            {phase.categories.map((cat, ci) => (
              <div key={cat.title ?? ci} className="mt-6">
                {cat.title && <p className="text-sm font-medium text-fg/50 mb-4">{cat.title}</p>}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {cat.items.map((product) => (
                    <ProductCard key={product.name} product={product} lang={lang} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
    </>
  )
}
