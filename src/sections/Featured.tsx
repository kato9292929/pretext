import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionEyebrow } from '../primitives'
import { useLang, type Lang, type Localized } from '../i18n'
import { DNode, DiagramProvider, PLACED, place } from '../components/Diagram'

type ProductLink = { label: string; href: string }

type Key = 'endpoint' | 'osd' | 'jin' | 'rfq' | 'aa' | 'probe'

type Product = {
  key: Key
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
  ja: 'x402 Inc.は、エージェント決済に関するリサーチと関連インフラ・データの開発提供を行う会社です。x402対応エンドポイントのデータカタログ、自律エージェントによるステーブルコイン決済、オルタナティブデータ生成の3事業を展開。クレジットカードやステーブルコインなど各市場セグメントにおける市場調査を日次で公開し、エージェンティックコマース市場の形成に貢献することを目指しています。',
  en: 'x402 Inc. researches agent payments and develops the related infrastructure and data. We run three businesses: a data catalog of x402-enabled endpoints, stablecoin settlement by autonomous agents, and alternative-data generation. We publish daily market research across segments — credit cards, stablecoins and more — aiming to help form the agentic-commerce market.',
}

const LABELS = {
  ja: { visit: 'サイトを見る', soon: '準備中', hint: '各プロダクトにカーソルを合わせると詳細が表示されます' },
  en: { visit: 'Visit site', soon: 'Coming soon', hint: 'Hover a product to see its details' },
}

const PRODUCTS: Product[] = [
  {
    key: 'rfq',
    tag: { ja: '04 · MARKET（E5）', en: '04 · MARKET (E5)' },
    name: 'x402 RFQ Market',
    badge: 'Solana devnet',
    desc: {
      ja: '1つのエージェントが依頼し、複数の売り手が見積もりを返し、最適な1社が選ばれる見積もり依頼（RFQ）市場です。x402 Endpoint の売り手、自社データ商品、x402 Autonomous Agent の間に置き、買い手が売り手を比べて選べるようにします。\n\n買い手は欲しいデータ・上限価格・必要な速さを提示し、売り手が価格を返します。十分に速い中で最も安い売り手が落札し、Solana上のUSDCで支払われます。結果は「配信済み」か「何が失敗したか」としてSolana上に記録され、その記録が売り手を選ぶ基準になります。手数料は落札価格の1%です。現在はSolana devnetで稼働しており、参加者はすべて当社のエージェントです。mainnet 公開は Solana の rent 引き下げ（Agave 4.4）後の2026年11月です。',
      en: 'A request-for-quote (RFQ) market: one agent asks, many sellers answer, and the best one wins. It sits between the sellers in x402 Endpoint, our own data products and x402 Autonomous Agent, so buyers can compare sellers instead of paying whatever price is listed.\n\nThe buyer posts what data it wants, the most it will pay and how fast it needs it; sellers quote a price. The cheapest seller that is fast enough wins and is paid in USDC on Solana. The result — delivered, or what went wrong — is recorded on Solana, and that record is how agents choose who to buy from. The market takes 1% of the winning price. It runs on Solana devnet today, and every buyer and seller is one of our own agents. Mainnet launch is in November 2026, after Solana’s rent reduction (Agave 4.4).',
    },
    image: '/products/rfq.jpg',
    live: 'https://rfq.x402jp.com/',
    links: [{ label: 'GitHub', href: 'https://github.com/kato9292929/RFQ' }],
  },
  {
    key: 'endpoint',
    tag: { ja: '01 · MAP（発見）', en: '01 · MAP (Discovery)' },
    name: 'x402 Endpoint',
    badge: 'HTTP/1.1 402 ✓',
    desc: {
      ja: 'x402 Endpoint は、x402エコシステムに関連した公開カタログを毎日取得し、エンドポイント・ホスト・カテゴリ・価格帯・取引ランキングを日次スナップショットとして保存しています。2026年10月19日時点で161,826エンドポイント・13,701ホストを対象としており、最近ではホスト名が企業の管理ドメイン配下にあるかを判定し、その企業自身の出品と、他社名を掲げた再販・ラッパーを区別しています。\n\n毎週、出品側（カタログ）と利用側（取引・ランキング）の両方から推移を分析し、数値の出所、取得方法、インサイトを発信。2026年6月上旬からの件数、カテゴリ、ホスト構成の推移を時系列で確認できるほか、REST APIとMCPサーバーを通じて配信しており、AIエージェントが直接データを読み取れます。',
      en: 'x402 Endpoint pulls the public catalogs of the x402 ecosystem every day and stores endpoints, hosts, categories, price ranges and transaction rankings as daily snapshots. As of Oct 19, 2026 it covers 161,826 endpoints across 13,701 hosts. Recently it has started checking whether a hostname sits under a company’s own managed domain, separating a company’s own listings from resellers and wrappers that carry another company’s name.\n\nEvery week we analyze the trends from both the supply side (catalog) and the demand side (transactions and rankings), and publish where the numbers come from, how they were collected, and what they show. You can follow counts, categories and host composition as a time series from early June 2026, and the data is served over a REST API and an MCP server so AI agents can read it directly.',
    },
    image: '/products/endpoint.jpg',
    live: 'https://endpoint.x402jp.com/',
    links: [
      { label: 'note', href: 'https://note.com/x402inc/n/nb30efb0e7e92' },
      { label: 'GitHub', href: 'https://github.com/kato9292929/endpoint' },
    ],
  },
  {
    key: 'aa',
    tag: { ja: '02 · CONSUME（消費）', en: '02 · CONSUME (Consumption)' },
    name: 'x402 Autonomous Agent',
    badge: 'Railway ✓',
    desc: {
      ja: 'オンチェーンID（ERC-8004 agentId：55560 on Base／845265 on Arc Testnet）を持つ自律エージェントです。毎朝06:00 JSTにデータをper-callで購入し、その日の判断を追記専用の記録として残しています。決済はSolanaおよびBase上のUSDCで1コールごとにオンチェーン完結し、署名は両チェーンともCircle Developer-Controlled Walletsが行います。\n\n自社エンドポイントの日次購入に加え、週次で外部売り手にも実払いしており、現在の支払い先は外部6先です。前者は決済スタックが日次でend-to-endに稼働することの実証であり、後者は境界をまたいで実際に買えることの確認です。いずれも当社が買い手であり、外部需要の観測ではありません。売買執行には接続せず、週次の高額データ購入前にはWorld IDによる人間の承認を必須とするなど、エージェントへの委任範囲を人間が管理する設計も実装しています。Arc Testnetでは、ERC-8004のReputationとValidationも記録済みです。',
      en: 'An autonomous agent with an on-chain identity (ERC-8004 agentId: 55560 on Base / 845265 on Arc Testnet). Every morning at 06:00 JST it buys data per-call and records the day’s decision as an append-only log. Each call settles on-chain in USDC on Solana and Base, and Circle Developer-Controlled Wallets sign on both chains.\n\nOn top of daily purchases from our own endpoints, it also makes real weekly payments to external sellers — currently 6 of them. The former shows the payment stack running end-to-end every day; the latter confirms it can actually buy across the boundary. In both cases we are the buyer, so this is not a measure of external demand. It is not connected to trade execution, and humans control the scope delegated to the agent — for example, a World ID human approval is required before weekly high-value data purchases. On Arc Testnet, ERC-8004 Reputation and Validation have also been recorded.',
    },
    image: '/products/aa.png',
    live: 'https://aa.x402jp.com/',
    links: [
      { label: 'note', href: 'https://note.com/x402inc/n/nfe50d4acfcd8' },
      { label: 'GitHub', href: 'https://github.com/kato9292929/x402-Autonomous-Agent-' },
    ],
  },
  {
    key: 'osd',
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
    key: 'jin',
    tag: { ja: '03 · PRODUCE（データ生成）', en: '03 · PRODUCE (Data production)' },
    name: 'Japan Inflation Nowcall',
    badge: 'HTTP/1.1 402 ✓',
    desc: {
      ja: '東京の中堅スーパーマーケット1店舗の店頭価格を定点で記録し、独自の食品物価指数として提供するサービスです。指数は固定基準日（2026-06-04 = 100）に対する同一SKUの価格相対を取り、中分類ごとにJevons幾何平均で基礎集計したうえで、10カテゴリを等加重して上位集計します。価格はパックサイズや単位の違いを吸収した正準単価（¥/100g・¥/100ml・¥/個）に揃えてから比較するため、内容量の変更は値上げとして正しく拾われます。\n\n特売の扱いは2系列に分けており、基調となる excl_promo は基準日または当日に特売フラグの付いたSKUを除外し、incl_promo は特売を含めたまま集計します。配信はx402（Solana / USDC）です。latest は無料で、指数値・matched数・カバレッジ注記・方法論を返します。series は全履歴、movers はその日に動いた品目の内訳で、いずれも per-call で購入できます。価格は series が $0.01、movers が $0.02 です。',
      en: 'A proprietary food price index built from fixed-point records of shelf prices at one mid-sized Tokyo supermarket. The index takes same-SKU price relatives against a fixed base date (2026-06-04 = 100), aggregates them per sub-category with a Jevons geometric mean, then combines 10 categories with equal weights. Prices are first normalized to canonical unit prices (¥/100g, ¥/100ml, ¥/item) that absorb differences in pack size and unit, so shrinkflation is correctly captured as a price increase.\n\nSales are handled as two series: the core excl_promo excludes SKUs flagged as on sale on the base date or the current day, while incl_promo keeps sales in. Delivery is via x402 (Solana / USDC). latest is free and returns the index value, matched count, coverage notes and methodology. series (full history) and movers (the items that moved that day) are purchasable per-call at $0.01 and $0.02 respectively.',
    },
    image: '/products/jin.png',
    live: 'https://jin.x402jp.com/',
    links: [],
  },
  {
    key: 'probe',
    tag: { ja: '04 · MARKET（E4）', en: '04 · MARKET (E4)' },
    name: 'x402 Seller Probe',
    badge: 'probe.x402jp.com',
    desc: {
      ja: 'x402 の売り手が本当に動くかを、当社のエージェントが毎日外から測っています。402 の形式から決済、納品まで。結果はホストごとのスコアとして、算出式ごと公開します。スコアは x402 RFQ Market で売り手を比べる材料になります。',
      en: 'Our agents measure, every day and from the outside, whether x402 sellers actually work — from the shape of the 402 to payment and delivery. Results are published as a per-host score, together with the formula. The score feeds into comparing sellers on x402 RFQ Market.',
    },
    image: '/products/probe.jpg',
    live: 'https://probe.x402jp.com/',
    links: [{ label: 'GitHub', href: 'https://github.com/kato9292929/seller-probe' }],
  },
]
/* ── Node faces (short lines shown inside the diagram boxes) ─────────────── */

const FACE: Record<Key, { sub: Localized[] }> = {
  endpoint: { sub: [{ ja: '161,826 エンドポイント・13,701 ホスト', en: '161,826 endpoints · 13,701 hosts' }] },
  aa: { sub: [{ ja: '毎朝 06:00 JST に per-call で購入する買い手', en: 'A buyer that pays per-call every morning at 06:00 JST' }] },
  osd: { sub: [{ ja: 'x402 で売る自社データ：カタリスト採点', en: 'Our data on x402: catalyst scoring' }] },
  jin: { sub: [{ ja: 'x402 で売る自社データ：食品物価指数', en: 'Our data on x402: food price index' }] },
  rfq: {
    sub: [
      { ja: '買い手が条件を出し売り手が競う市場（E5）', en: 'Buyers post conditions, sellers compete (E5)' },
      { ja: 'devnet 稼働中・2026 年 11 月 mainnet', en: 'Live on devnet · mainnet Nov 2026' },
    ],
  },
  probe: {
    sub: [
      { ja: '売り手の 402・決済・納品を外から測る（E4）', en: 'Measures sellers’ 402, payment and delivery from outside (E4)' },
      { ja: 'probe.x402jp.com 公開・本番測定開始', en: 'probe.x402jp.com live · production measurement started' },
    ],
  },
}

/* ── Proofs of concept (dashed boxes) ─────────────────────────────────────── */

// Status words are fixed to this set.
type Status = '完了' | '稼働中' | '準備完了' | '計測準備' | '計測設計' | '実証案' | '基準案' | '整理' | '導入中'
const STATUS_EN: Record<Status, string> = {
  完了: 'Done',
  稼働中: 'Running',
  準備完了: 'Ready',
  計測準備: 'Preparing measurement',
  計測設計: 'Designing measurement',
  実証案: 'Proposed',
  基準案: 'Draft criteria',
  整理: 'Mapped',
  導入中: 'Rolling out',
}

type Poc = {
  id: string
  name: Localized
  sub: Localized // line shown in the diagram box
  status: Status
  note: Localized // one-liner from the PoC list
  links: ProductLink[]
}
type PocGroup = { title: Localized; align: 'left' | 'center' | 'right'; rows: Poc[] }

const note = (href: string): ProductLink => ({ label: 'note', href })
const gh = (repo: string): ProductLink => ({ label: `GitHub · ${repo}`, href: `https://github.com/kato9292929/${repo}` })

const POCS: PocGroup[] = [
  {
    title: { ja: 'x402 Autonomous Agent に組み込む実証', en: 'Built into x402 Autonomous Agent' },
    align: 'left',
    rows: [
      {
        id: 'sweep',
        name: { ja: '外部売り手への週次 sweep', en: 'Weekly sweep of external sellers' },
        sub: { ja: '外部6先・第43週 $0.014', en: '6 external sellers · week 43: $0.014' },
        status: '稼働中',
        note: { ja: '外部6先・第43週 $0.014', en: '6 external sellers · week 43: $0.014' },
        links: [note('https://note.com/x402inc/n/n35a9a3fd25de')],
      },
      {
        id: 'hermes',
        name: { ja: 'Hermes mpp-agent × Exa（MPP）', en: 'Hermes mpp-agent × Exa (MPP)' },
        sub: { ja: '$0.007 の支払いに4つの上限判定位置', en: 'Four limit-check points on a $0.007 payment' },
        status: '準備完了',
        note: { ja: '$0.007 の支払いに4つの上限判定', en: 'Four limit checks on a $0.007 payment' },
        links: [note('https://note.com/x402inc/n/n9bf4a3157b21'), gh('mpp-budget-guard'), gh('Hermes-Agent')],
      },
      {
        id: 'agentcore',
        name: { ja: 'AWS AgentCore Payments ハーネス', en: 'AWS AgentCore Payments harness' },
        sub: { ja: 'AC-1〜AC-4・実証案', en: 'AC-1 to AC-4 · proposed' },
        status: '実証案',
        note: { ja: 'AC-1〜AC-4', en: 'AC-1 to AC-4' },
        links: [note('https://note.com/x402inc/n/n1593a2538d4a')],
      },
      {
        id: 'arcium',
        name: { ja: 'Arcium MXE 秘匿取引', en: 'Arcium MXE confidential trades' },
        sub: { ja: '5種類の秘匿取引・計測設計', en: '5 kinds of confidential trades · designing measurement' },
        status: '計測設計',
        note: { ja: '5種類の秘匿取引', en: '5 kinds of confidential trades' },
        links: [note('https://note.com/x402inc/n/na418a03844e9')],
      },
    ],
  },
  {
    title: { ja: '横断（統制・確認基準・開発体制）', en: 'Cross-cutting (controls, criteria, development)' },
    align: 'center',
    rows: [
      {
        id: 'stripe',
        name: { ja: 'Stripe Approvals デモ', en: 'Stripe Approvals demo' },
        sub: { ja: '起案と承認の分離（E0）', en: 'Separating proposal and approval (E0)' },
        status: '整理',
        note: { ja: '支出統制9方式の中の位置', en: 'Where it sits among 9 spend-control methods' },
        links: [note('https://note.com/x402inc/n/na18368ec5f8c'), gh('ai_backoffice')],
      },
      {
        id: 'wallet',
        name: { ja: 'ウォレット間決済の確認基準案', en: 'Draft criteria for wallet-to-wallet payments' },
        sub: { ja: '7製品・8項目', en: '7 products · 8 items' },
        status: '基準案',
        note: { ja: '7製品・8項目', en: '7 products · 8 items' },
        links: [note('https://note.com/x402inc/n/n07bd1b08bccf')],
      },
      {
        id: 'security',
        name: { ja: '開発セキュリティ体制', en: 'Development security setup' },
        sub: { ja: 'Claude Security スキャン〜段階リリース', en: 'Claude Security scans to staged releases' },
        status: '導入中',
        note: { ja: 'Claude Security〜段階リリース', en: 'From Claude Security to staged releases' },
        links: [note('https://note.com/x402inc/n/nfd0e6d606ddf')],
      },
    ],
  },
  {
    title: { ja: 'OSD・JIN の販売経路の実証', en: 'Sales channels for OSD and JIN' },
    align: 'right',
    rows: [
      {
        id: 'nevermined',
        name: { ja: 'Nevermined カード払い 実証1・2', en: 'Nevermined card payments, PoC 1 & 2' },
        sub: { ja: 'USDC・カードの併売、$0.01 の商品別集計', en: 'USDC and card side by side, $0.01 per-product tally' },
        status: '計測準備',
        note: { ja: 'USDC・カードの併売', en: 'Selling with both USDC and card' },
        links: [note('https://note.com/x402inc/n/n183c24390c12'), gh('poc-dual-checkout'), gh('poc-card-credits')],
      },
      {
        id: 'jpyc',
        name: { ja: 'JPYC × x402（Polygon）', en: 'JPYC × x402 (Polygon)' },
        sub: { ja: '円建て per-call 決済', en: 'Yen-denominated per-call payments' },
        status: '完了',
        note: { ja: '円建て per-call 決済2件（Polygon mainnet）', en: '2 yen-denominated per-call payments (Polygon mainnet)' },
        links: [note('https://note.com/x402inc/n/n6baddc090c6a'), gh('poc-jpyc-x402')],
      },
      {
        id: 'crossmint',
        name: { ja: 'Crossmint 2経路の購入', en: 'Crossmint purchases via 2 routes' },
        sub: { ja: 'エージェント用ウォレットとカード・実証案', en: 'Agent wallet and card · proposed' },
        status: '実証案',
        note: { ja: 'ウォレットとカードの2経路', en: 'Wallet and card routes' },
        links: [note('https://note.com/x402inc/n/n832fe623f599'), gh('poc-crossmint-buyer')],
      },
    ],
  },
]

/* ── Agent Stack (formerly the Architecture section) ──────────────────────── */

const STACK_INTRO: Localized = {
  ja: '事業は発見（MAP）・消費（CONSUME）・データ生成（PRODUCE）・市場（MARKET）の4層の instruments で構成されます。いずれも、エコシステムを外から論じるためでなく、内側から観測・検証するために動かしています。',
  en: 'The business is made up of four layers of instruments — discovery (MAP), consumption (CONSUME), data production (PRODUCE) and market (MARKET). We run all of them not to comment on the ecosystem from outside, but to observe and verify it from within.',
}

const STACK_CHIPS: Localized<string[]> = {
  ja: ['per-callオンチェーン決済', '検証可能な実績', 'HTTP 402', 'Solana / Base / Arc', 'ERC-8004 identity', 'REST + MCP'],
  en: ['Per-call on-chain settlement', 'Verifiable track record', 'HTTP 402', 'Solana / Base / Arc', 'ERC-8004 identity', 'REST + MCP'],
}

const STACK: { key: string; label: Localized; title: Localized; items: Localized<string[]> }[] = [
  {
    key: 'MAP',
    label: { ja: '発見', en: 'Discovery' },
    title: { ja: 'エンドポイントを日次で収集・正規化', en: 'Collect & normalize endpoints daily' },
    items: {
      ja: ['x402対応エンドポイントのカタログ', '何が・いくらで買えるかを観測する'],
      en: ['A catalog of x402-compatible endpoints', 'Observes what can be bought and at what price'],
    },
  },
  {
    key: 'CONSUME',
    label: { ja: '消費', en: 'Consumption' },
    title: { ja: 'per-callでオンチェーン決済し記録する', en: 'Settle per-call on-chain and record' },
    items: {
      ja: ['ERC-8004 identity を持つエージェント', '取引の形式を検証する instrument'],
      en: ['An agent with an ERC-8004 identity', 'An instrument to verify the form of a transaction'],
    },
  },
  {
    key: 'PRODUCE',
    label: { ja: 'データ生成', en: 'Data production' },
    title: { ja: '独自データと検証可能な実績を作る', en: 'Produce proprietary data & verifiable records' },
    items: {
      ja: ['エージェント向けのデータ', '叩かれる側を観測する'],
      en: ['Data built for agents', 'Observes the side being called'],
    },
  },
  {
    key: 'MARKET',
    label: { ja: '市場', en: 'Market' },
    title: { ja: '売り手を比べ、測る場を作る', en: 'Build the place where sellers are compared and measured' },
    items: {
      ja: ['買い手が条件を出し、売り手が競う（E5）', '売り手の402・決済・納品を外から測る（E4）'],
      en: ['Buyers post conditions, sellers compete (E5)', 'Measures sellers’ 402, payment and delivery from outside (E4)'],
    },
  },
]

const COPY = {
  ja: {
    hint: '各プロダクト・実証にカーソルを合わせる（タップする）と詳細が表示されます',
    score: 'スコア',
    legend: '実線：稼働中のプロダクトの接続　点線枠：実証（PoC）',
    pocs: '実証',
    stack: 'Agent Stack',
    stackTag: 'instruments',
  },
  en: {
    hint: 'Hover (or tap) a product or proof of concept to see its details',
    score: 'score',
    legend: 'Solid lines: live product connections · Dashed boxes: proofs of concept',
    pocs: 'Proofs of concept',
    stack: 'Agent Stack',
    stackTag: 'instruments',
  },
}

/* ── Detail cards ─────────────────────────────────────────────────────────── */

function Preview({ src, name }: { src?: string; name: string }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return null
  return (
    <div className="aspect-[16/10] w-full overflow-hidden border-b border-fg/10 bg-fg/[0.03]">
      <img src={src} alt={name} loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover" />
    </div>
  )
}

function LinkRow({ links, live, lang }: { links: ProductLink[]; live?: string; lang: Lang }) {
  return (
    <div className="mt-4 pt-3 border-t border-fg/10 flex flex-wrap items-center gap-x-4 gap-y-2">
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-gold hover:brightness-110 transition"
        >
          {LABELS[lang].visit}
          <ArrowUpRight className="w-3 h-3" />
        </a>
      )}
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-fg/65 hover:text-gold transition-colors"
        >
          {link.label}
          <ArrowUpRight className="w-3 h-3" />
        </a>
      ))}
    </div>
  )
}

function ProductDetail({ product, lang }: { product: Product; lang: Lang }) {
  return (
    <div>
      <Preview src={product.image} name={product.name} />
      <div className="p-5">
        <span className="text-xs font-medium tracking-wide text-gold">{product.tag[lang]}</span>
        <h3 className="mt-2 text-lg font-semibold text-fg">{product.name}</h3>
        <p className="mt-2 text-sm text-fg/65 leading-[1.75] whitespace-pre-line">{product.desc[lang]}</p>
        <LinkRow links={product.links} live={product.live} lang={lang} />
      </div>
    </div>
  )
}

function PocDetail({ poc, lang }: { poc: Poc; lang: Lang }) {
  return (
    <div className="p-5">
      <span className="inline-flex rounded-full border border-gold/40 px-2 py-0.5 text-[11px] text-gold">
        {lang === 'ja' ? poc.status : STATUS_EN[poc.status]}
      </span>
      <h3 className="mt-3 text-base font-semibold text-fg">{poc.name[lang]}</h3>
      <p className="mt-2 text-sm text-fg/65 leading-[1.7]">{poc.note[lang]}</p>
      <LinkRow links={poc.links} lang={lang} />
    </div>
  )
}

/* ── Product map (lg+: positioned like the ecosystem map; below lg: stacked) ── */

const W = 1100
const H = 330

const NODES: { key: Key; x: number; y: number; w: number; h: number; align: 'left' | 'right' }[] = [
  { key: 'endpoint', x: 0, y: 30, w: 260, h: 86, align: 'left' },
  { key: 'aa', x: 280, y: 30, w: 260, h: 86, align: 'left' },
  { key: 'osd', x: 560, y: 30, w: 260, h: 86, align: 'left' },
  { key: 'jin', x: 840, y: 30, w: 260, h: 86, align: 'right' },
  { key: 'rfq', x: 110, y: 226, w: 400, h: 96, align: 'left' },
  { key: 'probe', x: 590, y: 226, w: 400, h: 96, align: 'right' },
]

const GROUP_LABELS: { before: Key; text: Localized; x: number; y: number; w: number }[] = [
  { before: 'endpoint', text: { ja: 'MAP（発見）', en: 'MAP (Discovery)' }, x: 0, y: 4, w: 260 },
  { before: 'aa', text: { ja: 'CONSUME（消費）', en: 'CONSUME (Consumption)' }, x: 280, y: 4, w: 260 },
  { before: 'osd', text: { ja: 'PRODUCE（データ生成）', en: 'PRODUCE (Data production)' }, x: 560, y: 4, w: 540 },
  { before: 'rfq', text: { ja: 'MARKET（市場）', en: 'MARKET' }, x: 0, y: 190, w: 105 },
]

function Label({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    <p
      className={`mt-4 first:mt-0 lg:mt-0 text-[11px] font-mono tracking-widest text-gold lg:flex lg:items-center lg:justify-center ${PLACED}`}
      style={style}
    >
      {text}
    </p>
  )
}

function Lines({ score }: { score: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      aria-hidden="true"
    >
      <defs>
        <marker id="pm-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="rgb(var(--gold) / 0.8)" />
        </marker>
      </defs>
      <g fill="none" stroke="rgb(var(--gold) / 0.55)" strokeWidth={1.25}>
        <path d="M100 116 L230 224" markerEnd="url(#pm-arrow)" />
        <path d="M170 116 L680 224" markerEnd="url(#pm-arrow)" />
        <path d="M410 116 L380 224" markerEnd="url(#pm-arrow)" />
        <path d="M690 116 L830 158 M970 116 L830 158" />
        <path d="M830 158 L470 224" markerEnd="url(#pm-arrow)" />
        <path d="M830 158 L800 224" markerEnd="url(#pm-arrow)" />
        <path d="M588 274 L514 274" markerEnd="url(#pm-arrow)" />
      </g>
      <text x={551} y={264} textAnchor="middle" fontSize={12} fill="rgb(var(--gold))">
        {score}
      </text>
    </svg>
  )
}

export function Featured() {
  const { lang } = useLang()
  const t = COPY[lang]
  const byKey = Object.fromEntries(PRODUCTS.map((p) => [p.key, p])) as Record<Key, Product>
  return (
    <section id="products" className="relative z-20 max-w-6xl mx-auto px-6 py-14 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionEyebrow label="Products" tag="Automatic" heading />
        <p className="mt-6 text-fg/60 text-base leading-[1.7] max-w-3xl">{INTRO[lang]}</p>
      </motion.div>

      <DiagramProvider className="mt-10">
        {/* Products */}
        <div className="relative flex flex-col gap-2 lg:block lg:aspect-[1100/330]">
          <Lines score={t.score} />
          {NODES.map((n) => {
            const p = byKey[n.key]
            const label = GROUP_LABELS.find((g) => g.before === n.key)
            return (
              <div key={n.key} className="contents">
                {label && <Label text={label.text[lang]} style={place(label.x, label.y, label.w, 22, W, H)} />}
                <DNode
                  id={n.key}
                  label={p.name}
                  align={n.align}
                  strong={n.key === 'rfq' || n.key === 'probe'}
                  className={PLACED}
                  style={place(n.x, n.y, n.w, n.h, W, H)}
                  face={
                    <span className="flex h-full flex-col items-center justify-center gap-1">
                      <span className="text-sm md:text-base font-semibold text-fg">{p.name}</span>
                      {FACE[n.key].sub.map((s) => (
                        <span key={s.ja} className="text-[11px] leading-[1.45] text-fg/55">
                          {s[lang]}
                        </span>
                      ))}
                    </span>
                  }
                  detail={<ProductDetail product={p} lang={lang} />}
                />
              </div>
            )
          })}
        </div>

        {/* Proofs of concept */}
        <h3 className="mt-12 text-xs uppercase tracking-widest text-gold lg:sr-only">{t.pocs}</h3>
        <div className="mt-4 lg:mt-10 grid gap-8 lg:grid-cols-3 lg:gap-5">
          {POCS.map((g) => (
            <div key={g.title.ja}>
              <p className="mb-3 text-center text-[11px] font-mono tracking-wider text-gold">{g.title[lang]}</p>
              <div className="flex flex-col gap-2">
                {g.rows.map((poc) => (
                  <DNode
                    key={poc.id}
                    id={poc.id}
                    label={poc.name[lang]}
                    align={g.align}
                    dashed
                    face={
                      <span className="flex flex-col items-center gap-0.5">
                        <span className="text-[13px] font-semibold text-fg">{poc.name[lang]}</span>
                        <span className="text-[11px] leading-[1.45] text-fg/55">{poc.sub[lang]}</span>
                      </span>
                    }
                    detail={<PocDetail poc={poc} lang={lang} />}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center gap-1 text-center text-[11px] text-fg/40 lg:flex-row lg:justify-between lg:text-left">
          <span>{t.hint}</span>
          <span>{t.legend}</span>
        </div>
      </DiagramProvider>

      {/* Agent Stack (formerly Architecture) */}
      <div id="architecture" className="mt-16 pt-10 border-t border-fg/10">
        <div className="flex items-center gap-3">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-fg">{t.stack}</h3>
          <span
            className="text-xs px-2.5 py-1 rounded-full border"
            style={{ color: 'rgb(var(--gold))', borderColor: 'rgb(var(--gold) / 0.45)', backgroundColor: 'rgb(var(--gold) / 0.08)' }}
          >
            {t.stackTag}
          </span>
        </div>
        <p className="mt-4 text-fg/60 text-sm md:text-base leading-[1.7] max-w-3xl">{STACK_INTRO[lang]}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {STACK_CHIPS[lang].map((chip) => (
            <span key={chip} className="text-xs text-fg/70 px-3 py-1.5 rounded-full border border-fg/10 bg-fg/[0.03]">
              {chip}
            </span>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STACK.map((layer) => (
            <div key={layer.key} className="liquid-glass rounded-xl p-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
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
    </section>
  )
}
