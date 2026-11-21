import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionEyebrow } from '../primitives'
import { useLang, type Lang, type Localized } from '../i18n'
import { DNode, DiagramProvider } from '../components/Diagram'

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
  ja: 'AI エージェントが払う瞬間の安全性のためのプロダクト。買い手のお金は守られるか、払った後に売り手は届けるか。',
  en: 'Products for the moment an AI agent pays: is the buyer’s money safe, and does the seller deliver after being paid?',
  zh: '为 AI 智能体付款那一刻的安全而做的产品：买方的钱是否安全，卖方收款后是否交付。',
}

const LABELS = {
  ja: { visit: 'サイトを見る', soon: '準備中', hint: '各プロダクトにカーソルを合わせると詳細が表示されます' },
  en: { visit: 'Visit site', soon: 'Coming soon', hint: 'Hover a product to see its details' },
  zh: { visit: '访问网站', soon: '筹备中', hint: '将光标悬停在各产品上即可查看详情' },
}

const PRODUCTS: Product[] = [
  {
    key: 'rfq',
    tag: { ja: '04 · MARKET（E5）', en: '04 · MARKET (E5)', zh: '04 · MARKET（E5）' },
    name: 'x402 RFQ Market',
    badge: 'Solana devnet',
    desc: {
      ja: '1つのエージェントが依頼し、複数の売り手が見積もりを返し、最適な1社が選ばれる見積もり依頼（RFQ）市場です。x402 Endpoint の売り手、自社データ商品、x402 Autonomous Agent の間に置き、買い手が売り手を比べて選べるようにします。\n\n買い手は欲しいデータ・上限価格・必要な速さを提示し、売り手が価格を返します。十分に速い中で最も安い売り手が落札し、Solana上のUSDCで支払われます。結果は「配信済み」か「何が失敗したか」としてSolana上に記録され、その記録が売り手を選ぶ基準になります。手数料は落札価格の1%です。現在はSolana devnetで稼働しており、参加者はすべて当社のエージェントです。mainnet 公開は Solana の rent 引き下げ（Agave 4.4）後の2026年11月です。',
      en: 'A request-for-quote (RFQ) market: one agent asks, many sellers answer, and the best one wins. It sits between the sellers in x402 Endpoint, our own data products and x402 Autonomous Agent, so buyers can compare sellers instead of paying whatever price is listed.\n\nThe buyer posts what data it wants, the most it will pay and how fast it needs it; sellers quote a price. The cheapest seller that is fast enough wins and is paid in USDC on Solana. The result — delivered, or what went wrong — is recorded on Solana, and that record is how agents choose who to buy from. The market takes 1% of the winning price. It runs on Solana devnet today, and every buyer and seller is one of our own agents. Mainnet launch is in November 2026, after Solana’s rent reduction (Agave 4.4).',
      zh: '这是一个询价（RFQ）市场：由一个智能体发出请求，多个卖方返回报价，并从中选出最优的一家。它位于 x402 Endpoint 的卖方、自有数据产品与 x402 Autonomous Agent 之间，使买方能够比较并选择卖方。\n\n买方提出所需数据、价格上限和所需速度，卖方报价。在速度足够快的卖方中报价最低者中标，并以 Solana 上的 USDC 获得支付。结果以“已交付”或“哪里失败”的形式记录在 Solana 上，该记录将成为选择卖方的依据。手续费为中标价格的 1%。目前在 Solana devnet 上运行，参与者均为本公司的智能体。mainnet 将在 Solana 下调 rent（Agave 4.4）之后，于2026年11月上线。',
    },
    image: '/products/rfq.jpg',
    live: 'https://rfq.x402jp.com/',
    links: [{ label: 'GitHub', href: 'https://github.com/kato9292929/RFQ' }],
  },
  {
    key: 'endpoint',
    tag: { ja: '01 · MAP（発見）', en: '01 · MAP (Discovery)', zh: '01 · MAP（发现）' },
    name: 'x402 Endpoint',
    badge: 'HTTP/1.1 402 ✓',
    desc: {
      ja: 'x402 Endpoint は、x402エコシステムに関連した公開カタログを毎日取得し、エンドポイント・ホスト・カテゴリ・価格帯・取引ランキングを日次スナップショットとして保存しています。2026年10月19日時点で161,826エンドポイント・13,701ホストを対象としており、最近ではホスト名が企業の管理ドメイン配下にあるかを判定し、その企業自身の出品と、他社名を掲げた再販・ラッパーを区別しています。\n\n毎週、出品側（カタログ）と利用側（取引・ランキング）の両方から推移を分析し、数値の出所、取得方法、インサイトを発信。2026年6月上旬からの件数、カテゴリ、ホスト構成の推移を時系列で確認できるほか、REST APIとMCPサーバーを通じて配信しており、AIエージェントが直接データを読み取れます。',
      en: 'x402 Endpoint pulls the public catalogs of the x402 ecosystem every day and stores endpoints, hosts, categories, price ranges and transaction rankings as daily snapshots. As of Oct 19, 2026 it covers 161,826 endpoints across 13,701 hosts. Recently it has started checking whether a hostname sits under a company’s own managed domain, separating a company’s own listings from resellers and wrappers that carry another company’s name.\n\nEvery week we analyze the trends from both the supply side (catalog) and the demand side (transactions and rankings), and publish where the numbers come from, how they were collected, and what they show. You can follow counts, categories and host composition as a time series from early June 2026, and the data is served over a REST API and an MCP server so AI agents can read it directly.',
      zh: 'x402 Endpoint 每天抓取 x402 生态相关的公开目录，并将端点、主机、类别、价格区间和交易排名保存为每日快照。截至2026年10月19日，覆盖 161,826 个端点、13,701 个主机。近期开始判断主机名是否位于企业自有管理域名之下，从而区分企业自身的上架与打着其他公司名义的转售和封装（wrapper）。\n\n我们每周从供给侧（目录）和需求侧（交易与排名）两方面分析变化趋势，并发布数据来源、获取方法和洞察。可按时间序列查看自2026年6月上旬以来的数量、类别和主机构成的变化；数据还通过 REST API 和 MCP 服务器提供，AI 智能体可直接读取。',
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
    tag: { ja: '02 · CONSUME（消費）', en: '02 · CONSUME (Consumption)', zh: '02 · CONSUME（消费）' },
    name: 'x402 Autonomous Agent',
    badge: 'Railway ✓',
    desc: {
      ja: 'オンチェーンID（ERC-8004 agentId：55560 on Base／845265 on Arc Testnet）を持つ自律エージェントです。毎朝06:00 JSTにデータをper-callで購入し、その日の判断を追記専用の記録として残しています。決済はSolanaおよびBase上のUSDCで1コールごとにオンチェーン完結し、署名は両チェーンともCircle Developer-Controlled Walletsが行います。\n\n自社エンドポイントの日次購入に加え、週次で外部売り手にも実払いしており、現在の支払い先は外部6先です。前者は決済スタックが日次でend-to-endに稼働することの実証であり、後者は境界をまたいで実際に買えることの確認です。いずれも当社が買い手であり、外部需要の観測ではありません。売買執行には接続せず、週次の高額データ購入前にはWorld IDによる人間の承認を必須とするなど、エージェントへの委任範囲を人間が管理する設計も実装しています。Arc Testnetでは、ERC-8004のReputationとValidationも記録済みです。',
      en: 'An autonomous agent with an on-chain identity (ERC-8004 agentId: 55560 on Base / 845265 on Arc Testnet). Every morning at 06:00 JST it buys data per-call and records the day’s decision as an append-only log. Each call settles on-chain in USDC on Solana and Base, and Circle Developer-Controlled Wallets sign on both chains.\n\nOn top of daily purchases from our own endpoints, it also makes real weekly payments to external sellers — currently 6 of them. The former shows the payment stack running end-to-end every day; the latter confirms it can actually buy across the boundary. In both cases we are the buyer, so this is not a measure of external demand. It is not connected to trade execution, and humans control the scope delegated to the agent — for example, a World ID human approval is required before weekly high-value data purchases. On Arc Testnet, ERC-8004 Reputation and Validation have also been recorded.',
      zh: '这是一个拥有链上身份（ERC-8004 agentId：Base 上为 55560／Arc Testnet 上为 845265）的自主智能体。它每天早上 06:00 JST 以 per-call 方式购买数据，并将当天的判断记录为仅追加的日志。支付以 Solana 和 Base 上的 USDC 逐次在链上完成，两条链上的签名均由 Circle Developer-Controlled Wallets 执行。\n\n除每日从自有端点购买外，它每周还向外部卖方进行真实支付，目前支付对象为 6 家外部卖方。前者验证支付栈每天端到端运行，后者确认其能够跨越边界实际完成购买。两种情况下买方都是本公司，因此并非对外部需求的观测。它不接入交易执行，并实现了由人类管理委托给智能体范围的设计，例如在每周购买高价数据前，必须通过 World ID 获得人类授权。在 Arc Testnet 上，ERC-8004 的 Reputation 与 Validation 也已完成记录。',
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
    tag: { ja: '03 · PRODUCE（データ生成）', en: '03 · PRODUCE (Data production)', zh: '03 · PRODUCE（数据生成）' },
    name: 'Onchain Stock Data',
    badge: 'HTTP/1.1 402 ✓',
    desc: {
      ja: 'Claudeを用いて毎週、米国株・日本株を10銘柄ずつ選定し、各銘柄に期限を定めた1か月のカタリスト（検証可能な予測条件）を付与しています。期限到来後には、決算・適時開示などの一次情報と突き合わせ、hit / partial / miss を機械的に採点します。現在までに83件の判定が確定しており、内訳は hit 39 / partial 28 / miss 16 です。記録は上書き・削除せずGitに追記し、積み上がるtrack recordそのものが希少性の高いデータとなるよう設計しています。\n\n日本株では、EDINETで開示を行う企業約4,000社を母集団に197社を選定しました。このうち13社には日付と成立条件を確定させたカタリストを付与済みで、per-callで取得できる形で提供しています。MCP経由ではClaudeやChatGPTから自然言語で参照でき、x402のper-call決済ではエージェントが自律的にデータを購入できます。\n\n本サービスはファンドではなく、リサーチおよびセレクションのためのデータサービスです。本データはAIの予測精度を検証する記録であり、投資助言を目的とするものではありません。投資判断は利用者自身の責任で行ってください。',
      en: 'Each week we use Claude to select 10 US and 10 Japanese stocks and attach a one-month, time-boxed catalyst (a verifiable forecast condition) to each. Once the deadline passes, the catalyst is checked against primary sources such as earnings and timely disclosures and mechanically scored hit / partial / miss. 83 verdicts have been finalized so far: hit 39 / partial 28 / miss 16. Records are never overwritten or deleted but appended to Git, so the growing track record itself becomes scarce, high-value data.\n\nFor Japanese stocks, we selected 197 companies from a universe of roughly 4,000 that file on EDINET. 13 of them already carry catalysts with a fixed date and success condition, available per-call. Via MCP, Claude and ChatGPT can query it in natural language, and with x402 per-call payments agents can buy the data autonomously.\n\nThis service is not a fund; it is a data service for research and selection. The data is a record for verifying AI forecast accuracy and is not investment advice. Investment decisions are your own responsibility.',
      zh: '我们每周使用 Claude 分别选出 10 只美股和 10 只日股，并为每只股票设定一个有明确期限的一个月催化剂（可验证的预测条件）。到期后，将其与财报、适时披露等一手信息进行比对，按 hit / partial / miss 机械评分。迄今已确定 83 项判定，其中 hit 39 / partial 28 / miss 16。记录不覆盖、不删除，而是追加到 Git 中，使不断积累的 track record 本身成为高稀缺性的数据。\n\n日股方面，以在 EDINET 进行披露的约 4,000 家企业为总体，选出 197 家。其中 13 家已设定日期和成立条件均已确定的催化剂，并以可按 per-call 获取的形式提供。通过 MCP 可从 Claude 或 ChatGPT 以自然语言查询，借助 x402 的 per-call 支付，智能体可自主购买数据。\n\n本服务并非基金，而是用于研究和选股的数据服务。本数据是用于验证 AI 预测准确度的记录，并非以投资建议为目的。投资决策请由用户自行负责。',
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
    tag: { ja: '03 · PRODUCE（データ生成）', en: '03 · PRODUCE (Data production)', zh: '03 · PRODUCE（数据生成）' },
    name: 'Japan Inflation Nowcall',
    badge: 'HTTP/1.1 402 ✓',
    desc: {
      ja: '東京の中堅スーパーマーケット1店舗の店頭価格を定点で記録し、独自の食品物価指数として提供するサービスです。指数は固定基準日（2026-06-04 = 100）に対する同一SKUの価格相対を取り、中分類ごとにJevons幾何平均で基礎集計したうえで、10カテゴリを等加重して上位集計します。価格はパックサイズや単位の違いを吸収した正準単価（¥/100g・¥/100ml・¥/個）に揃えてから比較するため、内容量の変更は値上げとして正しく拾われます。\n\n特売の扱いは2系列に分けており、基調となる excl_promo は基準日または当日に特売フラグの付いたSKUを除外し、incl_promo は特売を含めたまま集計します。配信はx402（Solana / USDC）です。latest は無料で、指数値・matched数・カバレッジ注記・方法論を返します。series は全履歴、movers はその日に動いた品目の内訳で、いずれも per-call で購入できます。価格は series が $0.01、movers が $0.02 です。',
      en: 'A proprietary food price index built from fixed-point records of shelf prices at one mid-sized Tokyo supermarket. The index takes same-SKU price relatives against a fixed base date (2026-06-04 = 100), aggregates them per sub-category with a Jevons geometric mean, then combines 10 categories with equal weights. Prices are first normalized to canonical unit prices (¥/100g, ¥/100ml, ¥/item) that absorb differences in pack size and unit, so shrinkflation is correctly captured as a price increase.\n\nSales are handled as two series: the core excl_promo excludes SKUs flagged as on sale on the base date or the current day, while incl_promo keeps sales in. Delivery is via x402 (Solana / USDC). latest is free and returns the index value, matched count, coverage notes and methodology. series (full history) and movers (the items that moved that day) are purchasable per-call at $0.01 and $0.02 respectively.',
      zh: '这是一项在东京一家中型超市定点记录货架价格，并作为独有食品物价指数提供的服务。指数以固定基准日（2026-06-04 = 100）为基准，取同一 SKU 的价格比，按中类以 Jevons 几何平均进行基础汇总，再对 10 个类别等权重进行上层汇总。价格先统一为消除包装规格和单位差异的标准单价（¥/100g・¥/100ml・¥/个）再进行比较，因此内容量的减少会被正确识别为涨价。\n\n促销分为两个系列处理：作为基础趋势的 excl_promo 剔除在基准日或当天带有促销标记的 SKU，incl_promo 则包含促销进行汇总。通过 x402（Solana / USDC）提供。latest 免费，返回指数值、matched 数、覆盖说明和方法论。series 为全部历史数据，movers 为当天发生变动的品目明细，二者均可按 per-call 购买。价格为 series $0.01、movers $0.02。',
    },
    image: '/products/jin.png',
    live: 'https://jin.x402jp.com/',
    links: [],
  },
  {
    key: 'probe',
    tag: { ja: '04 · MARKET（E4）', en: '04 · MARKET (E4)', zh: '04 · MARKET（E4）' },
    name: 'x402 Seller Probe',
    badge: 'probe.x402jp.com',
    desc: {
      ja: 'x402 の売り手が本当に動くかを、当社のエージェントが毎日外から測っています。402 の形式から決済、納品まで。結果はホストごとのスコアとして、算出式ごと公開します。スコアは x402 RFQ Market で売り手を比べる材料になります。',
      en: 'Our agents measure, every day and from the outside, whether x402 sellers actually work — from the shape of the 402 to payment and delivery. Results are published as a per-host score, together with the formula. The score feeds into comparing sellers on x402 RFQ Market.',
      zh: '本公司的智能体每天从外部检测 x402 卖方是否真正可用：从 402 的格式到支付、交付。结果以每个主机的评分形式连同计算公式一并公开。该评分将作为在 x402 RFQ Market 上比较卖方的依据。',
    },
    image: '/products/probe.jpg',
    live: 'https://probe.x402jp.com/',
    links: [{ label: 'GitHub', href: 'https://github.com/kato9292929/seller-probe' }],
  },
]
/* ── Node faces (short lines shown inside the diagram boxes) ─────────────── */

const FACE: Record<Key, { sub: Localized[] }> = {
  endpoint: { sub: [{ ja: '161,826 エンドポイント・13,701 ホスト', en: '161,826 endpoints · 13,701 hosts', zh: '161,826 个端点・13,701 个主机' }] },
  aa: { sub: [{ ja: '毎朝 06:00 JST に per-call で購入する買い手', en: 'A buyer that pays per-call every morning at 06:00 JST', zh: '每天早上 06:00 JST 以 per-call 方式购买的买方' }] },
  osd: { sub: [{ ja: 'x402 で売る自社データ：カタリスト採点', en: 'Our data on x402: catalyst scoring', zh: '在 x402 上出售的自有数据：催化剂评分' }] },
  jin: { sub: [{ ja: 'x402 で売る自社データ：食品物価指数', en: 'Our data on x402: food price index', zh: '在 x402 上出售的自有数据：食品物价指数' }] },
  rfq: {
    sub: [
      { ja: '買い手が条件を出し売り手が競う市場（E5）', en: 'Buyers post conditions, sellers compete (E5)', zh: '买方提出条件、卖方竞争的市场（E5）' },
      { ja: 'devnet 稼働中・2026 年 11 月 mainnet', en: 'Live on devnet · mainnet Nov 2026', zh: 'devnet 运行中・2026年11月上线 mainnet' },
    ],
  },
  probe: {
    sub: [
      { ja: '売り手の 402・決済・納品を外から測る（E4）', en: 'Measures sellers’ 402, payment and delivery from outside (E4)', zh: '从外部检测卖方的 402・支付・交付（E4）' },
      { ja: 'probe.x402jp.com 公開・本番測定開始', en: 'probe.x402jp.com live · production measurement started', zh: 'probe.x402jp.com 已公开・正式检测已开始' },
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
const STATUS_ZH: Record<Status, string> = {
  完了: '已完成',
  稼働中: '运行中',
  準備完了: '准备就绪',
  計測準備: '检测准备中',
  計測設計: '检测设计中',
  実証案: '试点方案',
  基準案: '标准草案',
  整理: '已梳理',
  導入中: '导入中',
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
    title: { ja: 'x402 Autonomous Agent に組み込む実証', en: 'Built into x402 Autonomous Agent', zh: '嵌入 x402 Autonomous Agent 的验证试点' },
    align: 'left',
    rows: [
      {
        id: 'sweep',
        name: { ja: '外部売り手への週次 sweep', en: 'Weekly sweep of external sellers', zh: '对外部卖方的每周 sweep' },
        sub: { ja: '外部6先・第43週 $0.014', en: '6 external sellers · week 43: $0.014', zh: '外部6家・第43周 $0.014' },
        status: '稼働中',
        note: { ja: '外部6先・第43週 $0.014', en: '6 external sellers · week 43: $0.014', zh: '外部6家・第43周 $0.014' },
        links: [note('https://note.com/x402inc/n/n35a9a3fd25de')],
      },
      {
        id: 'hermes',
        name: { ja: 'Hermes mpp-agent × Exa（MPP）', en: 'Hermes mpp-agent × Exa (MPP)', zh: 'Hermes mpp-agent × Exa（MPP）' },
        sub: { ja: '$0.007 の支払いに4つの上限判定位置', en: 'Four limit-check points on a $0.007 payment', zh: '$0.007 的支付设有4个上限判定点' },
        status: '準備完了',
        note: { ja: '$0.007 の支払いに4つの上限判定', en: 'Four limit checks on a $0.007 payment', zh: '$0.007 的支付设有4项上限判定' },
        links: [note('https://note.com/x402inc/n/n9bf4a3157b21'), gh('mpp-budget-guard'), gh('Hermes-Agent')],
      },
      {
        id: 'agentcore',
        name: { ja: 'AWS AgentCore Payments ハーネス', en: 'AWS AgentCore Payments harness', zh: 'AWS AgentCore Payments 测试框架' },
        sub: { ja: 'AC-1〜AC-4・実証案', en: 'AC-1 to AC-4 · proposed', zh: 'AC-1〜AC-4・试点方案' },
        status: '実証案',
        note: { ja: 'AC-1〜AC-4', en: 'AC-1 to AC-4', zh: 'AC-1〜AC-4' },
        links: [note('https://note.com/x402inc/n/n1593a2538d4a')],
      },
      {
        id: 'arcium',
        name: { ja: 'Arcium MXE 秘匿取引', en: 'Arcium MXE confidential trades', zh: 'Arcium MXE 隐私交易' },
        sub: { ja: '5種類の秘匿取引・計測設計', en: '5 kinds of confidential trades · designing measurement', zh: '5种隐私交易・检测设计中' },
        status: '計測設計',
        note: { ja: '5種類の秘匿取引', en: '5 kinds of confidential trades', zh: '5种隐私交易' },
        links: [note('https://note.com/x402inc/n/na418a03844e9')],
      },
    ],
  },
  {
    title: { ja: '横断（統制・確認基準・開発体制）', en: 'Cross-cutting (controls, criteria, development)', zh: '横向（管控・确认标准・开发体系）' },
    align: 'center',
    rows: [
      {
        id: 'stripe',
        name: { ja: 'Stripe Approvals デモ', en: 'Stripe Approvals demo', zh: 'Stripe Approvals 演示' },
        sub: { ja: '起案と承認の分離（E0）', en: 'Separating proposal and approval (E0)', zh: '发起与审批的分离（E0）' },
        status: '整理',
        note: { ja: '支出統制9方式の中の位置', en: 'Where it sits among 9 spend-control methods', zh: '在9种支出管控方式中的定位' },
        links: [note('https://note.com/x402inc/n/na18368ec5f8c'), gh('ai_backoffice')],
      },
      {
        id: 'wallet',
        name: { ja: 'ウォレット間決済の確認基準案', en: 'Draft criteria for wallet-to-wallet payments', zh: '钱包间支付的确认标准草案' },
        sub: { ja: '7製品・8項目', en: '7 products · 8 items', zh: '7款产品・8个项目' },
        status: '基準案',
        note: { ja: '7製品・8項目', en: '7 products · 8 items', zh: '7款产品・8个项目' },
        links: [note('https://note.com/x402inc/n/n07bd1b08bccf')],
      },
      {
        id: 'security',
        name: { ja: '開発セキュリティ体制', en: 'Development security setup', zh: '开发安全体系' },
        sub: { ja: 'Claude Security スキャン〜段階リリース', en: 'Claude Security scans to staged releases', zh: 'Claude Security 扫描〜分阶段发布' },
        status: '導入中',
        note: { ja: 'Claude Security〜段階リリース', en: 'From Claude Security to staged releases', zh: 'Claude Security〜分阶段发布' },
        links: [note('https://note.com/x402inc/n/nfd0e6d606ddf')],
      },
    ],
  },
  {
    title: { ja: 'OSD・JIN の販売経路の実証', en: 'Sales channels for OSD and JIN', zh: 'OSD・JIN 销售渠道的验证试点' },
    align: 'right',
    rows: [
      {
        id: 'nevermined',
        name: { ja: 'Nevermined カード払い 実証1・2', en: 'Nevermined card payments, PoC 1 & 2', zh: 'Nevermined 信用卡支付 验证试点1・2' },
        sub: { ja: 'USDC・カードの併売、$0.01 の商品別集計', en: 'USDC and card side by side, $0.01 per-product tally', zh: 'USDC・信用卡并行销售，$0.01 的按商品统计' },
        status: '計測準備',
        note: { ja: 'USDC・カードの併売', en: 'Selling with both USDC and card', zh: 'USDC・信用卡并行销售' },
        links: [note('https://note.com/x402inc/n/n183c24390c12'), gh('poc-dual-checkout'), gh('poc-card-credits')],
      },
      {
        id: 'jpyc',
        name: { ja: 'JPYC × x402（Polygon）', en: 'JPYC × x402 (Polygon)', zh: 'JPYC × x402（Polygon）' },
        sub: { ja: '円建て per-call 決済', en: 'Yen-denominated per-call payments', zh: '日元计价的 per-call 支付' },
        status: '完了',
        note: { ja: '円建て per-call 決済2件（Polygon mainnet）', en: '2 yen-denominated per-call payments (Polygon mainnet)', zh: '日元计价的 per-call 支付2笔（Polygon mainnet）' },
        links: [note('https://note.com/x402inc/n/n6baddc090c6a'), gh('poc-jpyc-x402')],
      },
      {
        id: 'crossmint',
        name: { ja: 'Crossmint 2経路の購入', en: 'Crossmint purchases via 2 routes', zh: 'Crossmint 两种途径的购买' },
        sub: { ja: 'エージェント用ウォレットとカード・実証案', en: 'Agent wallet and card · proposed', zh: '智能体专用钱包与信用卡・试点方案' },
        status: '実証案',
        note: { ja: 'ウォレットとカードの2経路', en: 'Wallet and card routes', zh: '钱包与信用卡两种途径' },
        links: [note('https://note.com/x402inc/n/n832fe623f599'), gh('poc-crossmint-buyer')],
      },
    ],
  },
]

/* ── Agent Stack (formerly the Architecture section) ──────────────────────── */

const STACK_INTRO: Localized = {
  ja: '事業は発見（MAP）・消費（CONSUME）・データ生成（PRODUCE）・市場（MARKET）の4層の instruments で構成されます。いずれも、エコシステムを外から論じるためでなく、内側から観測・検証するために動かしています。',
  en: 'The business is made up of four layers of instruments — discovery (MAP), consumption (CONSUME), data production (PRODUCE) and market (MARKET). We run all of them not to comment on the ecosystem from outside, but to observe and verify it from within.',
  zh: '业务由发现（MAP）・消费（CONSUME）・数据生成（PRODUCE）・市场（MARKET）四层 instruments 构成。运行它们并非为了从外部评论生态，而是为了从内部观测和验证生态。',
}

const STACK_CHIPS: Localized<string[]> = {
  ja: ['per-callオンチェーン決済', '検証可能な実績', 'HTTP 402', 'Solana / Base / Arc', 'ERC-8004 identity', 'REST + MCP'],
  en: ['Per-call on-chain settlement', 'Verifiable track record', 'HTTP 402', 'Solana / Base / Arc', 'ERC-8004 identity', 'REST + MCP'],
  zh: ['per-call 链上支付', '可验证的业绩记录', 'HTTP 402', 'Solana / Base / Arc', 'ERC-8004 identity', 'REST + MCP'],
}

const STACK: { key: string; label: Localized; title: Localized; items: Localized<string[]> }[] = [
  {
    key: 'MAP',
    label: { ja: '発見', en: 'Discovery', zh: '发现' },
    title: { ja: 'エンドポイントを日次で収集・正規化', en: 'Collect & normalize endpoints daily', zh: '每日收集并规范化端点' },
    items: {
      ja: ['x402対応エンドポイントのカタログ', '何が・いくらで買えるかを観測する'],
      en: ['A catalog of x402-compatible endpoints', 'Observes what can be bought and at what price'],
      zh: ['x402 兼容端点的目录', '观测能以什么价格买到什么'],
    },
  },
  {
    key: 'CONSUME',
    label: { ja: '消費', en: 'Consumption', zh: '消费' },
    title: { ja: 'per-callでオンチェーン決済し記録する', en: 'Settle per-call on-chain and record', zh: '以 per-call 方式链上支付并记录' },
    items: {
      ja: ['ERC-8004 identity を持つエージェント', '取引の形式を検証する instrument'],
      en: ['An agent with an ERC-8004 identity', 'An instrument to verify the form of a transaction'],
      zh: ['拥有 ERC-8004 identity 的智能体', '验证交易形式的 instrument'],
    },
  },
  {
    key: 'PRODUCE',
    label: { ja: 'データ生成', en: 'Data production', zh: '数据生成' },
    title: { ja: '独自データと検証可能な実績を作る', en: 'Produce proprietary data & verifiable records', zh: '生成独有数据与可验证的业绩记录' },
    items: {
      ja: ['エージェント向けのデータ', '叩かれる側を観測する'],
      en: ['Data built for agents', 'Observes the side being called'],
      zh: ['面向智能体的数据', '观测被调用的一方'],
    },
  },
  {
    key: 'MARKET',
    label: { ja: '市場', en: 'Market', zh: '市场' },
    title: { ja: '売り手を比べ、測る場を作る', en: 'Build the place where sellers are compared and measured', zh: '打造比较和衡量卖方的场所' },
    items: {
      ja: ['買い手が条件を出し、売り手が競う（E5）', '売り手の402・決済・納品を外から測る（E4）'],
      en: ['Buyers post conditions, sellers compete (E5)', 'Measures sellers’ 402, payment and delivery from outside (E4)'],
      zh: ['买方提出条件，卖方竞争（E5）', '从外部检测卖方的 402・支付・交付（E4）'],
    },
  },
]

const COPY = {
  ja: {
    hint: '各実証にカーソルを合わせる（タップする）と詳細が表示されます',
    pocs: '実証',
    pocIntro: 'これまでの実証は続けています。エンドポイントのカタログ（MAP）、自社データ（PRODUCE）、市場（MARKET）、自律エージェント（CONSUME）も、ここで実証として動かしています。',
    stack: 'Agent Stack',
    stackTag: 'instruments',
  },
  en: {
    hint: 'Hover (or tap) a proof of concept to see its details',
    pocs: 'Proofs of concept',
    pocIntro: 'Our proofs of concept continue. The endpoint catalog (MAP), our own data (PRODUCE), the market (MARKET) and the autonomous agent (CONSUME) run here as proofs of concept.',
    stack: 'Agent Stack',
    stackTag: 'instruments',
  },
  zh: {
    hint: '将光标悬停（或点按）在各验证试点上即可查看详情',
    pocs: '验证试点',
    pocIntro: '此前的验证试点仍在继续。端点目录（MAP）、自有数据（PRODUCE）、市场（MARKET）与自主智能体（CONSUME）也在这里作为验证试点运行。',
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
        {lang === 'ja' ? poc.status : lang === 'zh' ? STATUS_ZH[poc.status] : STATUS_EN[poc.status]}
      </span>
      <h3 className="mt-3 text-base font-semibold text-fg">{poc.name[lang]}</h3>
      <p className="mt-2 text-sm text-fg/65 leading-[1.7]">{poc.note[lang]}</p>
      <LinkRow links={poc.links} lang={lang} />
    </div>
  )
}

/* ── Product map (lg+: positioned like the ecosystem map; below lg: stacked) ── */

/* ── Tech stack logos (official marks, public/logos/stack/) ──────────────── */

const LOGO = {
  'Claude Code': '/logos/claude-mark.svg',
  Claude: '/logos/claude-mark.svg',
  Railway: '/logos/stack/railway.png',
  'Circle Wallets': '/logos/stack/circle.svg',
  'Coinbase CDP': '/logos/stack/coinbase.png',
  Privy: '/logos/stack/privy.png',
  Crossmint: '/logos/stack/crossmint.png',
  'World ID': '/logos/stack/world.png',
  Base: '/logos/stack/base.png',
  Solana: '/logos/stack/solana.svg',
  Arc: '/logos/stack/arc.png',
  USDC: '/logos/stack/usdc.svg',
} as const
type Tech = keyof typeof LOGO

// What each product runs on / pays with, as stated in our product pages and notes
const TECH: Record<string, Tech[]> = {
  probe: ['Base', 'Solana', 'USDC'],
  mcp: ['Claude Code', 'Coinbase CDP', 'Privy', 'Crossmint', 'Base', 'Solana', 'USDC'],
  security: ['Claude Code'],
  aa: ['Railway', 'Circle Wallets', 'Base', 'Solana', 'USDC', 'World ID', 'Arc'],
  osd: ['Claude', 'Base', 'Solana', 'USDC'],
  jin: ['Solana', 'USDC'],
  rfq: ['Solana', 'USDC'],
}

/* Logos on a dark tile so white marks (USDC) read on both themes */
function TechIcons({ items, size = 'sm', names = false }: { items?: Tech[]; size?: 'sm' | 'md'; names?: boolean }) {
  if (!items?.length) return null
  const box = size === 'md' ? 'h-6 w-6' : 'h-5 w-5'
  return (
    <span className="flex flex-wrap items-center justify-center gap-1.5">
      {items.map((n) => (
        <span key={n} title={n} className={`inline-flex items-center gap-1.5 ${names ? 'rounded-full bg-black/45 py-0.5 pl-0.5 pr-2 text-[11px] text-white/85' : ''}`}>
          <span className={`inline-flex ${box} shrink-0 items-center justify-center overflow-hidden rounded-md p-[3px] ring-1 ring-white/10 ${n === 'World ID' ? 'bg-white' : 'bg-[#0b0b0f]'}`}>
            <img src={LOGO[n]} alt={n} className="h-full w-full object-contain" loading="lazy" />
          </span>
          {names && n}
        </span>
      ))}
    </span>
  )
}

/* ── Main products: four image cards ─────────────────────────────────────── */

type Main = {
  key: string
  name: string
  line: Localized
  status: Localized
  href: string
  cta: Localized
  image?: string // screenshot of a live site
  art?: { bg: string; lines: string[] } // gradient while the product images are being made (lines unused for now)
}

const SITE = { ja: 'サイトを見る', en: 'Visit site', zh: '访问网站' }
const GITHUB = { ja: 'GitHub', en: 'GitHub', zh: 'GitHub' }

const MAIN: Main[] = [
  {
    key: 'probe',
    name: 'x402 Seller Probe',
    line: { ja: '毎週実際に買って、届くかを測る', en: 'Buys every week and measures what gets delivered', zh: '每周实际购买，检测是否交付' },
    status: { ja: '稼働中', en: 'Live', zh: '运行中' },
    href: 'https://probe.x402jp.com/',
    cta: SITE,
    art: {
      bg: 'linear-gradient(150deg, #3b1230 0%, #a8406e 50%, #f2a65a 100%)',
      lines: ['curated.json', 'verdict: delivered', 'verdict: not_delivered', 'every Monday'],
    },
  },
  {
    key: 'mcp',
    name: 'AgentPay402 MCP',
    line: { ja: '払う前に売り手を確かめ、払った後に届いたかを確かめる', en: 'Checks the seller before paying, and the delivery after', zh: '付款前核查卖方，付款后确认交付' },
    status: { ja: 'Claude Code プラグイン', en: 'Claude Code plugin', zh: 'Claude Code 插件' },
    href: 'https://github.com/kato9292929/x402-wallet-mcp',
    cta: GITHUB,
    art: {
      bg: 'linear-gradient(150deg, #2a1660 0%, #7a2c9e 45%, #e0569f 100%)',
      lines: ['> check_seller', '  probe: delivered', '> make_x402_request', '  status: fulfilled'],
    },
  },
  {
    key: 'security',
    name: 'x402 Security Check',
    line: { ja: 'seller の x402 決済コードを11項目で点検', en: 'Reviews a seller’s x402 payment code on 11 items', zh: '从 11 项检查卖方的 x402 支付代码' },
    status: { ja: '開発中', en: 'In development', zh: '开发中' },
    href: 'https://github.com/kato9292929/x402-security-check',
    cta: GITHUB,
    art: {
      bg: 'linear-gradient(150deg, #0d3b4f 0%, #1f7f8c 50%, #6fd6a8 100%)',
      lines: ['11 checks', 'S1  K1  S7  K2  S9  S8', 'F1  F3  F2  K3', 'severity · file · line'],
    },
  },
]

function MainCard({ m, lang, k }: { m: Main; lang: Lang; k: number }) {
  return (
    <motion.a
      href={m.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: k * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-fg/10 sm:aspect-[4/5] lg:aspect-[1/1]"
    >
      {/* visual */}
      {m.image ? (
        <img src={m.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.04]" />
      ) : (
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]" style={{ background: m.art!.bg }}>
        </div>
      )}
      {/* readable overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/85" />

      <div className="relative flex h-full flex-col justify-between p-6 text-white">
        <div>
          <p className="text-xl font-semibold tracking-tight">{m.name}</p>
          <span className="mt-2 inline-block rounded-full border border-white/30 px-2.5 py-0.5 text-[11px] text-white/85">{m.status[lang]}</span>
        </div>
        <div>
          <p className="text-[15px] font-medium leading-[1.55]">{m.line[lang]}</p>
          {TECH[m.key] && (
            <div className="mt-3 [&>span]:justify-start">
              <TechIcons items={TECH[m.key]} names />
            </div>
          )}
          <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-white/85 group-hover:text-white">
            {m.cta[lang]}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </p>
        </div>
      </div>
    </motion.a>
  )
}

/* PoC products, shown as diagram nodes above the other PoCs */
const POC_PRODUCTS: { key: Key; group: Localized }[] = [
  { key: 'endpoint', group: { ja: 'MAP（発見）', en: 'MAP', zh: 'MAP（发现）' } },
  { key: 'osd', group: { ja: 'PRODUCE（データ生成）', en: 'PRODUCE (data)', zh: 'PRODUCE（数据生成）' } },
  { key: 'jin', group: { ja: 'PRODUCE（データ生成）', en: 'PRODUCE (data)', zh: 'PRODUCE（数据生成）' } },
  { key: 'rfq', group: { ja: 'MARKET（市場）', en: 'MARKET', zh: 'MARKET（市场）' } },
  { key: 'aa', group: { ja: 'CONSUME（消費）', en: 'CONSUME', zh: 'CONSUME（消费）' } },
]

export function Featured() {
  const { lang } = useLang()
  const t = COPY[lang]
  const byKey = Object.fromEntries(PRODUCTS.map((p) => [p.key, p])) as Record<Key, Product>
  return (
    <section id="products" className="relative z-30 max-w-6xl mx-auto px-6 py-14 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionEyebrow label="Products" tag="Security for Agent Payments" heading />
        <p className="mt-6 text-fg/60 text-base leading-[1.7] max-w-3xl">{INTRO[lang]}</p>
      </motion.div>

      {/* Main products */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {MAIN.map((m, k) => (
          <MainCard key={m.name} m={m} lang={lang} k={k} />
        ))}
      </div>

      {/* PoC: continuing proofs of concept, kept separate from the products */}
      <div id="poc" className="mt-16 pt-10 border-t border-fg/10">
        <div className="flex items-center gap-3">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-fg">PoC</h3>
          <span
            className="text-xs px-2.5 py-1 rounded-full border"
            style={{ color: 'rgb(var(--gold))', borderColor: 'rgb(var(--gold) / 0.45)', backgroundColor: 'rgb(var(--gold) / 0.08)' }}
          >
            {t.pocs}
          </span>
        </div>
        <p className="mt-4 text-fg/60 text-sm md:text-base leading-[1.7] max-w-3xl">{t.pocIntro}</p>

        <DiagramProvider className="mt-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {POC_PRODUCTS.map(({ key, group }, i) => {
              const p = byKey[key]
              return (
                <div key={key}>
                  <p className="mb-2 text-center text-[11px] font-mono tracking-wider text-gold">{group[lang]}</p>
                  <DNode
                    id={key}
                    label={p.name}
                    align={i < 3 ? 'left' : 'right'}
                    dashed
                    face={
                      <span className="flex flex-col items-center gap-0.5 py-1">
                        <span className="text-sm font-semibold text-fg">{p.name}</span>
                        {FACE[key].sub.map((s) => (
                          <span key={s.ja} className="text-[11px] leading-[1.45] text-fg/55">
                            {s[lang]}
                          </span>
                        ))}
                        <span className="mt-2">
                          <TechIcons items={TECH[key]} names />
                        </span>
                      </span>
                    }
                    detail={<ProductDetail product={p} lang={lang} />}
                  />
                </div>
              )
            })}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3 lg:gap-5">
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

          <p className="mt-6 text-center text-[11px] text-fg/40 lg:text-left">{t.hint}</p>
        </DiagramProvider>
      </div>

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
