import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionEyebrow } from '../primitives'
import { useLang, type Lang, type Localized } from '../i18n'
import { DocsLinks } from '../sections/DocsLinks'

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
    catalogListHead: 'Product catalog（プロトタイプ）',
    x402Eyebrow: 'Protocol',
    x402Tag: 'x402とは',
    x402Title: 'x402とは',
    x402Intro:
      'HTTP 402 “Payment Required” ステータスコードは、1997年から予約されていましたが、30年近く未使用のままでした。x402はこれを再活性化し、AIエージェントがHTTPネイティブに支払えるようにするプロトコルです。',
    x402Body:
      'サーバーが402を返すと、クライアントは支払いを完了して同じリクエストを再試行します。以下は、そのx402を私たち自身のプロダクトで実装したものです。',
    readSpec: '仕様を読む',
    stanceTag: 'x402 Inc. の立ち位置',
    stance: [
      'x402 Inc. はリサーチ会社です。x402対応のエンドポイント、独自データ、それを叩くエージェントを自ら作り、観測と検証の instruments として使います。',
      '固有データを外部有料フィードとしてper-callで売っても価値を捕まえる回路がない——だから Onchain Stock Data や Japan Inflation Nowcall は「データ供給事業」ではなく、リサーチ・観測の装置として置きます。自社の閉域で回すものは「内部経済」であり、検証できるのは形式と記録であって実需ではありません。',
    ],
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
    catalogListHead: 'Product catalog (prototype)',
    x402Eyebrow: 'Protocol',
    x402Tag: 'What is x402',
    x402Title: 'What is x402?',
    x402Intro:
      'The HTTP 402 “Payment Required” status code has been reserved since 1997, yet sat unused for nearly 30 years. x402 revives it so AI agents can pay HTTP-natively.',
    x402Body:
      'When a server returns 402, the client completes payment and retries the same request. Below is that protocol, implemented across our own products.',
    readSpec: 'Read the spec',
    stanceTag: 'x402 Inc.',
    stance: [
      'x402 Inc. is a research company. We build x402-enabled endpoints, proprietary data, and the agents that call them, and use them as instruments for observation and verification.',
      'Selling proprietary data as an external paid feed per-call has no circuit to capture value — so Onchain Stock Data and Japan Inflation Nowcall are placed as instruments for research and observation, not a “data supply business.” What we run in our own closed loop is an internal economy; what can be verified is the form and the records, not real demand.',
    ],
  },
  zh: {
    payHead: 'How to Pay',
    payFreeLabel: '免费的端点可以直接调用。',
    payPaidLabel:
      '付费的端点在首次请求时返回402。402的响应头中载有收款方・金额・链。',
    steps: [
      '向目标 URL 发送 GET（或 POST）',
      '返回 402 Payment Required（PAYMENT-REQUIRED 响应头中含收款方・金额・链）',
      '签署 USDC 支付（Base: EIP-3009 TransferWithAuthorization / Solana: SPL TransferChecked。手续费由 facilitator 承担，因此无需 SOL）',
      '将签名放入 X-PAYMENT 请求头，向同一 URL 重新请求',
      '返回 200 OK 与数据（PAYMENT-RESPONSE 响应头中含结算交易）',
    ],
    payNote:
      '金额・链・手续费支付方不要写死，应使用402提供的值。若提供多条链，由客户端选择。使用支持 x402 的客户端（@x402/fetch 等）即可自动完成往返。机器可读的定义位于各主机的 /.well-known/x402.json。',
    endpointsHead: 'Endpoints',
    agentHead: '每天调用这些端点的智能体',
    agentDesc:
      '本公司的自主智能体（AA）在 Base mainnet 上拥有链上 identity（ERC-8004，agentId 55560），每天06:00 JST 调用上述端点，逐次以 USDC 支付。支付签名由 Circle Developer-Controlled Wallet 完成。',
    agentRunHead: '最近一次运行（2026年7月23日 06:00 JST）',
    agentVerify:
      '所有支付均记录在链上，可在 Basescan / Solscan 上验证。任何人都可以按相同步骤调用相同的端点。',
    catalogHead: 'Products',
    catalogIntro:
      'x402 Inc. 的所有产品，都是为了在实现的同时验证市场而存在。按 Phase 1（数据基础设施）→ Phase 2（生态）→ Phase 3（隐私・支付出口）三个阶段设计。',
    catalogListHead: 'Product catalog（原型）',
    x402Eyebrow: 'Protocol',
    x402Tag: '什么是 x402',
    x402Title: '什么是 x402',
    x402Intro:
      'HTTP 402 “Payment Required” 状态码自1997年起就已被预留，但近30年来一直未被使用。x402 重新启用了它，是一种让 AI 智能体能够以 HTTP 原生方式进行支付的协议。',
    x402Body:
      '当服务器返回402时，客户端完成支付并重试同一请求。以下是我们在自己的产品中对 x402 的实现。',
    readSpec: '阅读规范',
    stanceTag: 'x402 Inc. 的定位',
    stance: [
      'x402 Inc. 是一家研究公司。我们亲自构建支持 x402 的端点、独有数据以及调用它们的智能体，并将其用作观测与验证的 instruments。',
      '即使把独有数据作为外部付费数据源按次调用出售，也没有获取价值的回路——因此 Onchain Stock Data 和 Japan Inflation Nowcall 不是“数据供应业务”，而是定位为研究・观测的装置。在本公司闭环内运转的是“内部经济”，能够验证的是形式与记录，而非真实需求。',
    ],
  },
} satisfies Record<Lang, Record<string, unknown>>

const GROUPS: Group[] = [
  {
    name: 'Japan Inflation Nowcall',
    host: 'jin.x402jp.com',
    note: { ja: '決済は Solana USDC（x402 v2）。discovery は /.well-known/x402.json。', en: 'Payment in Solana USDC (x402 v2). Discovery at /.well-known/x402.json.', zh: '支付使用 Solana USDC（x402 v2）。discovery 位于 /.well-known/x402.json。' },
    eps: [
      { method: 'GET', path: '/api/jin/latest', free: true, desc: { ja: '最新観測日の指数（excl_promo / incl_promo・matched・base_date・coverage・passthrough_gap）。', en: 'Index for the latest observation date (excl_promo / incl_promo, matched, base_date, coverage, passthrough_gap).', zh: '最新观测日的指数（excl_promo / incl_promo・matched・base_date・coverage・passthrough_gap）。' } },
      { method: 'GET', path: '/api/jin/series', price: '$0.01', desc: { ja: '指数の時系列（from / to は任意）。', en: 'Time series of the index (from / to optional).', zh: '指数的时间序列（from / to 可选）。' } },
      { method: 'GET', path: '/api/jin/movers', price: '$0.02', desc: { ja: 'その日動いた品目（特売タグ付き。date は任意）。', en: 'Items that moved that day (with sale tags; date optional).', zh: '当天价格变动的品类（附特价标签。date 可选）。' } },
    ],
  },
  {
    name: 'Onchain Stock Data',
    host: 'osd.x402jp.com',
    note: { ja: '決済は Base または Solana USDC（dual）。402が両方のチェーンを提示するので、クライアントがどちらかを選ぶ。discovery は /.well-known/x402.json。', en: 'Payment in Base or Solana USDC (dual). The 402 offers both chains, so the client picks one. Discovery at /.well-known/x402.json.', zh: '支付使用 Base 或 Solana USDC（dual）。402 会同时提供两条链，由客户端选择其一。discovery 位于 /.well-known/x402.json。' },
    eps: [
      { method: 'GET', path: '/api/alpha/catalysts/physical-ai', free: true, desc: { ja: 'Physical-AI スコアボード（hit-rate・全86条件・記事別、機械可読 JSON）。', en: 'Physical-AI scoreboard (hit-rate, all 86 conditions, per article; machine-readable JSON).', zh: 'Physical-AI 记分板（hit-rate・全部86项条件・按文章，机器可读 JSON）。' } },
      { method: 'GET', path: '/api/alpha/portfolio/current', price: '$0.01', desc: { ja: '米ポートフォリオ 現在10銘柄（ticker / weight / thesis）。', en: 'US portfolio, current 10 names (ticker / weight / thesis).', zh: '美国投资组合 当前10只股票（ticker / weight / thesis）。' } },
      { method: 'GET', path: '/api/alpha/portfolio/scorecard', price: '$0.01', desc: { ja: '米 catalyst hit-rate ＋ SPY / QQQ 累積リターン。', en: 'US catalyst hit-rate + SPY / QQQ cumulative return.', zh: '美国 catalyst hit-rate ＋ SPY / QQQ 累计收益。' } },
      { method: 'GET', path: '/api/alpha/jp/portfolio/current', price: '$0.01', desc: { ja: '日本ポートフォリオ 現在10銘柄。', en: 'Japan portfolio, current 10 names.', zh: '日本投资组合 当前10只股票。' } },
      { method: 'GET', path: '/api/alpha/jp/scorecard', price: '$0.01', desc: { ja: '日本 hit-rate（ベンチ指数なし）。', en: 'Japan hit-rate (no benchmark index).', zh: '日本 hit-rate（无基准指数）。' } },
      { method: 'GET', path: '/api/alpha/jp/catalysts', price: '$0.01', desc: { ja: '日本 dated catalysts 一覧。', en: 'Japanese dated catalysts.', zh: '日本 dated catalysts 列表。' } },
      { method: 'POST', path: '/api/alpha/catalyst/submit', price: '$0.01', desc: { ja: '外部 catalyst 投稿（→ id ＋ score_lookup）。', en: 'Submit an external catalyst (→ id + score_lookup).', zh: '提交外部 catalyst（→ id ＋ score_lookup）。' } },
      { method: 'GET', path: '/api/alpha/catalyst/:catalyst_id/score', price: '$0.01', desc: { ja: '投稿 catalyst の Claude 判定（pending / hit / partial / miss / na）。', en: 'Claude verdict for a submitted catalyst (pending / hit / partial / miss / na).', zh: '已提交 catalyst 的 Claude 判定（pending / hit / partial / miss / na）。' } },
    ],
  },
  {
    name: 'Intelligence',
    note: { ja: '決済は Base USDC。', en: 'Payment in Base USDC.', zh: '支付使用 Base USDC。' },
    eps: [
      { method: 'GET', path: 'x402amd.vercel.app/api/macro/dashboard', price: '$0.30', desc: { ja: 'APACマクロ。金利・為替・フロー・リスク regime。', en: 'APAC macro. Rates, FX, flows, risk regime.', zh: 'APAC 宏观。利率・汇率・资金流・风险 regime。' } },
      { method: 'GET', path: 'x402yi.vercel.app/api/yield/scan', price: '$0.20', desc: { ja: 'DeFiの利回りスキャン。プール別のAPYとスマートマネー残高。', en: 'DeFi yield scan. Per-pool APY and smart-money balances.', zh: 'DeFi 收益率扫描。各资金池的 APY 与聪明钱持仓。' } },
      { method: 'POST', path: 'x402pi.vercel.app/api/portfolio/analyze', price: '$0.50', desc: { ja: 'ウォレットアドレスを渡すとポートフォリオを分析。', en: 'Pass a wallet address to analyze its portfolio.', zh: '传入钱包地址即可分析其投资组合。' } },
      { method: 'GET', path: 'x402-jrey.vercel.app/api/realestate/yield?area=tokyo', price: '$0.30', desc: { ja: '日本の不動産利回り。エリア指定。', en: 'Japanese real estate yield. Specify an area.', zh: '日本房地产收益率。可指定区域。' } },
      { method: 'GET', path: 'x402nansenpolymarket.vercel.app/api/divergence/scan', price: '$0.15', desc: { ja: '予測市場とオンチェーンフローの乖離スキャン。', en: 'Divergence scan between prediction markets and on-chain flows.', zh: '预测市场与链上资金流的背离扫描。' } },
      { method: 'GET', path: 'x402-hl.vercel.app/api/hyperliquid/scan', price: '$0.20', desc: { ja: 'Hyperliquidの建玉・ファンディングとスマートマネーの偏り。', en: 'Hyperliquid open interest / funding and smart-money skew.', zh: 'Hyperliquid 的持仓量・资金费率与聪明钱的偏向。' } },
      { method: 'GET', path: 'smartmoneyscreener.vercel.app/api/screener/smart-money', price: '$0.05', desc: { ja: 'スマートマネーが買っているトークンのスクリーニング。', en: 'Screen tokens that smart money is buying.', zh: '筛选聪明钱正在买入的代币。' } },
      { method: 'GET', path: 'x402oif.vercel.app/api/feed/apac-daily', price: '$0.10', desc: { ja: 'APACの日次オンチェーンサマリー。', en: 'Daily APAC on-chain summary.', zh: 'APAC 每日链上摘要。' } },
      { method: 'GET', path: 'x402oif.vercel.app/api/feed/whale-alert', price: '$0.20', desc: { ja: '大口転送のアラート。', en: 'Alerts on large transfers.', zh: '大额转账警报。' } },
      { method: 'GET', path: 'odo-gamma.vercel.app/funding/nowcast/current', price: '$0.01', desc: { ja: 'perpのファンディング・ナウキャスト。バスケット別。', en: 'Perp funding nowcast, by basket.', zh: 'perp 资金费率即时预测。按篮子分类。' } },
    ],
  },
]

const RUN: { label: Localized; detail: Localized }[] = [
  {
    label: { ja: '市況の取得', en: 'Market fetch', zh: '获取市场行情' },
    detail: {
      ja: '15エンドポイントを順に叩く。決済 $1.85 USDC / 9トランザクション / 40秒。',
      en: 'Calls 15 endpoints in order. Paid $1.85 USDC / 9 transactions / 40s.',
      zh: '依次调用15个端点。支付 $1.85 USDC / 9笔交易 / 40秒。',
    },
  },
  {
    label: { ja: '日次の判断', en: 'Daily decision', zh: '每日判断' },
    detail: {
      ja: '取得したデータからその日の判断を1件記録。',
      en: 'Records one decision for the day.',
      zh: '根据获取的数据记录当天的1项判断。',
    },
  },
  {
    label: { ja: '実績データの購入', en: 'Buying record data', zh: '购买实绩数据' },
    detail: {
      ja: 'OSDのalpha 5本を1コールずつ購入し、取得したスナップショットを追記型で保存。各 $0.01、5本すべて200。',
      en: 'Buys the 5 alpha endpoints one call each and appends each snapshot. $0.01 each, all 5 returned 200.',
      zh: '逐次调用购买 OSD 的5个 alpha 端点，并以追加方式保存获取的快照。每个 $0.01，5个全部返回200。',
    },
  },
  {
    label: { ja: '追加の購入', en: 'Extra purchases', zh: '追加购买' },
    detail: {
      ja: '銘柄データとオンチェーンデータを追加取得。この回の支出 $0.03（上限 $0.20）。',
      en: 'Fetches extra stock and on-chain data. Spend $0.03 this run (cap $0.20).',
      zh: '追加获取个股数据与链上数据。本次支出 $0.03（上限 $0.20）。',
    },
  },
]

const PHASES: Phase[] = [
  {
    phase: 'Phase 0',
    phaseTitle: { ja: 'Autonomous Agent × Nansen', en: 'Autonomous Agent × Nansen', zh: 'Autonomous Agent × Nansen' },
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
              zh: '用 x402 为 Nansen 的聪明钱数据设置付费门槛。检测 STRONG BUY 信号并返回给智能体。支持 Base・Polygon・Solana。',
            },
            price: { ja: '$0.05/クエリ', en: '$0.05/query', zh: '$0.05/次查询' },
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
              zh: '由 Claude 用日语解析 Nansen 的链上数据。按用量计费提供 APAC 交易所资金流・巨鲸动向・周报。',
            },
            price: { ja: '$0.10〜$0.50', en: '$0.10–$0.50', zh: '$0.10〜$0.50' },
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
              zh: '检测 $100K 以上的大额转移，由 Claude 根据钱包过去90天的行为记录将意图分为5类。返回的不是“转移的事实”，而是“转移的意图”。',
            },
            price: { ja: '$0.10〜$0.50', en: '$0.10–$0.50', zh: '$0.10〜$0.50' },
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
              zh: '可购买和转售由 Nansen×Claude 生成的链上研究报告的市场。转售时80%归转售者，20%返还给协议。',
            },
            price: { ja: '$1〜$5', en: '$1–$5', zh: '$1〜$5' },
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
              zh: '将聪明钱信号检测与通过 Coinbase AgentKit 的自动执行整合为一体。如果说 Screener 是“看”的工具，那么这就是“动”的工具。',
            },
            price: { ja: '$0.05/シグナル・$0.10/執行', en: '$0.05/signal · $0.10/execution', zh: '$0.05/信号・$0.10/执行' },
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
              zh: '通过 World AgentKit × x402 实现 APAC 5国的 KYB・AML 筛查。执行前的合规确认由智能体当场完成。',
            },
            price: { ja: '$1〜$3/審査', en: '$1–$3/review', zh: '$1〜$3/次审查' },
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
              zh: '对 Nansen 的聪明钱数据与 Polymarket 的预测市场数据进行综合分析。检测“链上与链下预测出现背离的代币”。',
            },
            price: { ja: '$0.15〜$1.00', en: '$0.15–$1.00', zh: '$0.15〜$1.00' },
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
              zh: '检测 Hyperliquid PerpDEX 聪明钱持仓与 Polymarket 预测市场之间的背离。支持 Base・Solana。',
            },
            price: { ja: '$0.15〜$2.00', en: '$0.15–$2.00', zh: '$0.15〜$2.00' },
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
              zh: '实时追踪未上市公司的估值预测市场。支持 Base・Solana。',
            },
            price: { ja: '$0.15〜$2.00', en: '$0.15–$2.00', zh: '$0.15〜$2.00' },
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
              zh: '将 TradingView 的 Pine Script 警报接入 x402 技术栈的桥接工具。支持 Base・Solana。',
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
              zh: '利用 Helius・Alchemy・Nansen 数据自动分析钱包的投资组合并提出再平衡建议。支持 Base・Solana・Polygon・BNB。',
            },
            price: { ja: '$0.30〜$0.50', en: '$0.30–$0.50', zh: '$0.30〜$0.50' },
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
              zh: 'Solana DeFi（Kamino・Drift・Jupiter Lend）×Nansen 聪明钱的资金池分析。支持 Base・Solana・Polygon・BNB。',
            },
            price: { ja: '$0.20〜$2.00', en: '$0.20–$2.00', zh: '$0.20〜$2.00' },
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
              zh: '整合 Japan Data・e-Stat・Polymarket・Nansen・x402 Oracle 的 APAC 宏观环境仪表盘。以4个面板结构化呈现日本央行政策利率・USD/JPY・APAC 房地产・核心 CPI。',
            },
            price: { ja: '$0.20〜$3.00', en: '$0.20–$3.00', zh: '$0.20〜$3.00' },
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
              zh: '整合日本国土交通省・e-Stat 数据，提供日本房地产的收益率・空置率・未来预测。支持 Base・Solana・Polygon・BNB。',
            },
            price: { ja: '$0.30〜$2.00', en: '$0.30–$2.00', zh: '$0.30〜$2.00' },
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
    phaseTitle: { ja: 'データインフラ層', en: 'Data infrastructure layer', zh: '数据基础设施层' },
    categories: [
      {
        items: [
          {
            name: 'Japan x402 APIs',
            badge: HTTP402,
            desc: {
              ja: '日本のデータAPIにAIエージェント向けのper-callオンチェーン決済を実装。18本のエンドポイント（気象・地震・不動産・法人・人口統計等）をx402対応で提供。',
              en: 'Adds agent-native per-call on-chain payments to Japanese data APIs. Provides 18 x402-enabled endpoints (weather, earthquakes, real estate, corporate, demographics, etc.).',
              zh: '为日本的数据 API 实现面向 AI 智能体的按次调用链上支付。以 x402 方式提供18个端点（气象・地震・房地产・法人・人口统计等）。',
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
              zh: '以兼容 Chainlink・Pyth 的 price feed 格式在链上提供 APAC 房地产地价数据。覆盖日本・新加坡・香港・澳大利亚・韩国5国。',
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
              zh: '横跨 APAC 5国公共法人数据库的 x402 KYC API。附带 AML 筛查・制裁名单比对。$1〜$3/call。',
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
              zh: '智能体向智能体出售信息——AI ↔ AI 经济的首个演示。每小时自动获取 Japan Data API 生成简报，并通过 x402 出售。',
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
              zh: '整合多个 API 生成并出售研究报告的智能体。作为 x402 生态的“整合层”发挥作用。',
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
    phaseTitle: { ja: 'エコシステム層', en: 'Ecosystem layer', zh: '生态层' },
    categories: [
      {
        items: [
          {
            name: 'x402 Directory',
            badge: HTTP402,
            desc: {
              ja: 'AIには課金されるx402エコシステム日本語解説サイト。人間は無料・AIエージェントはBase上のUSDCで自動課金。',
              en: 'A Japanese-language guide to the x402 ecosystem that charges AI. Free for humans; AI agents are auto-charged in USDC on Base.',
              zh: '向 AI 收费的 x402 生态日语解说网站。人类免费，AI 智能体以 Base 上的 USDC 自动付费。',
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
              zh: '让我们自己的产品相互调用的 Cron 任务。设计用于在 x402 生态内循环 tx。',
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
              zh: '将月费 SaaS 拆分为按请求计费的 x402 实验。按用量计费提供域名确认・SMS・翻译・邮箱验证。',
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
    phaseTitle: { ja: 'プライバシー・決済出口', en: 'Privacy & payment exit', zh: '隐私・支付出口' },
    categories: [
      {
        items: [
          {
            name: 'x402 Private Gateway',
            badge: HTTP402,
            desc: {
              ja: 'Arcium MPCを使ったx402の決済検証プライバシーレイヤー。ウォレット・金額・エンドポイントを秘匿化。Colosseum Frontier提出済み。',
              en: 'A payment-verification privacy layer for x402 using Arcium MPC. Conceals wallet, amount and endpoint. Submitted to Colosseum Frontier.',
              zh: '使用 Arcium MPC 的 x402 支付验证隐私层。对钱包・金额・端点进行隐匿处理。已提交至 Colosseum Frontier。',
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
              zh: 'AI 智能体赚取 USDC 并通过 Visa 卡消费的演示。Solana → Nevermined Agent Card → Visa（1.5亿+商户）的循环。',
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
      <h3 className="text-base font-semibold text-fg">{product.name}</h3>
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
      {/* What is x402 — the protocol, front and center on the product page */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-20 md:pt-28 pb-2">
        <SectionEyebrow label={t.x402Eyebrow} tag={t.x402Tag} />
        <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.02] text-fg">
          {t.x402Title}
        </h1>
        <p className="mt-6 text-fg/60 max-w-2xl text-base leading-[1.7]">{t.x402Intro}</p>
        <div className="mt-8 grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-fg/70 text-base leading-[1.8]">{t.x402Body}</p>
            <a
              href="https://www.x402.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm text-fg/70 px-4 py-2 rounded-full border border-fg/15 hover:bg-fg/5 transition-colors"
            >
              {t.readSpec}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="liquid-glass rounded-2xl overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 h-10 border-b border-fg/10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-xs text-fg/50">HTTP Flow</span>
            </div>
            <pre className="p-4 text-[11px] md:text-xs leading-[1.7] overflow-x-auto font-mono text-fg/70">
              <code>
                <span className="text-fg/30">→</span> GET /api/data HTTP/1.1{'\n'}
                {'  '}Host: api.example.com{'\n\n'}
                <span className="text-gold">← HTTP/1.1 402 Payment Required</span>
                {'\n'}
                {'  '}X-Payment-Amount: 0.001{'\n'}
                {'  '}X-Payment-Token: USDC{'\n\n'}
                <span className="text-fg/30">→</span> GET /api/data{'  '}X-Payment: &lt;signed&gt;{'\n\n'}
                <span className="text-[#28c840]">← HTTP/1.1 200 OK</span>
              </code>
            </pre>
          </motion.div>
        </div>

        {/* x402 Inc. stance */}
        <div className="mt-10 liquid-glass rounded-2xl p-6 md:p-7 max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-gold">{t.stanceTag}</p>
          <div className="mt-4 space-y-4">
            {t.stance.map((p) => (
              <p key={p} className="text-sm text-fg/70 leading-[1.9]">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Products intro */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-10 md:pt-14 pb-2 border-t border-fg/10">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-fg">{t.catalogHead}</h2>
        <p className="mt-6 text-sm md:text-base text-fg/70 leading-[1.8] max-w-3xl">{t.catalogIntro}</p>
      </section>

      {/* How to Pay */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-fg">{t.payHead}</h2>
        <p className="mt-6 text-sm text-fg/70 leading-[1.7]">{t.payFreeLabel}</p>
        <pre className="mt-3 liquid-glass rounded-xl p-4 text-xs md:text-sm font-mono text-fg/80 overflow-x-auto">
          <span className="text-fg/40">$ </span>curl https://jin.x402jp.com/api/jin/latest
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

      {/* x402 docs (Stripe, Cloudflare, x402 Foundation) */}
      <DocsLinks width="max-w-4xl mt-2 pb-6" />

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
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-gold text-bg font-semibold">
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
