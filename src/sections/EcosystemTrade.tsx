import { ArrowUpRight } from 'lucide-react'
import { useLang, type Lang, type Localized } from '../i18n'
import { DNode, DiagramProvider, PLACED, place } from '../components/Diagram'

type Chip = { name: string; note?: Localized; href?: string; ended?: boolean }
type Group = { sub?: Localized; chips: Chip[]; foot?: Localized }
type Card = { badge: string; title: Localized; tag: Localized; desc: Localized; groups: Group[] }
type Block = { label: Localized; intro: Localized; cards: Card[] }

const INTRO: Localized = {
  ja: 'エージェント取引も、単一の方向へ移行するわけではない。Tierは「誰の資金を、誰の名義で動かすか」で分かれ、そこに検証の置き場所（何が執行前に止めるか）が重なる。',
  en: 'Agent trading does not migrate in a single direction either. Tiers split on “whose funds move, under whose name,” and on top of that sits where verification lives (what stops a trade before execution).',
}

const TIERS: Card[] = [
  {
    badge: 'T0',
    title: { ja: '助言・シミュレーション', en: 'Advice & simulation' },
    tag: { ja: '自律なし', en: 'No autonomy' },
    desc: {
      ja: '資金を預からない側。提案と分析までを担い、執行は人間が行う。調査対象10社のうち5社がここに留まる。',
      en: 'The side that holds no funds. It handles proposals and analysis; humans execute. 5 of the 10 companies surveyed stay here.',
    },
    groups: [
      { sub: { ja: '提案型', en: 'Proposal' }, chips: [{ name: 'AIXBT' }, { name: 'Olas Predict' }] },
      {
        sub: { ja: '提案＋執行の仲介', en: 'Proposal + execution brokering' },
        chips: [{ name: 'TrueNorth', note: { ja: 'ユーザーウォレット経由', en: 'via user wallet' } }],
      },
    ],
  },
  {
    badge: 'T1',
    title: { ja: '受動的配分', en: 'Passive allocation' },
    tag: { ja: 'プール資金', en: 'Pooled funds' },
    desc: {
      ja: '資金は預かるが、動かすのはvault配分とステーキングのみ。板に対して能動的な注文は出さない。',
      en: 'Holds funds, but only moves them into vault allocations and staking. It places no active orders on the book.',
    },
    groups: [
      { sub: { ja: 'vault配分・ステーキング', en: 'Vault allocation & staking' }, chips: [{ name: 'Axal' }, { name: 'Giza' }] },
      {
        sub: { ja: '終了', en: 'Ended' },
        chips: [{ name: 'Giza ARMA', note: { ja: '2026/3 資金返還', en: 'funds returned 2026/3' }, ended: true }],
      },
    ],
  },
  {
    badge: 'T2',
    title: { ja: 'プール資金で自律執行', en: 'Autonomous execution with pooled funds' },
    tag: { ja: '3 / 10 社', en: '3 / 10 cos.' },
    desc: {
      ja: '集めた資金を自前のトレジャリーで運用し、注文まで自ら出す。第一世代で実際にここに到達したのは3社。',
      en: 'Runs pooled funds from its own treasury and places orders itself. Only 3 first-generation projects actually reached this tier.',
    },
    groups: [
      {
        sub: { ja: 'トークン調達型', en: 'Token-funded' },
        chips: [
          { name: 'Axelrod', note: { ja: 'Virtuals / Base', en: 'Virtuals / Base' } },
          { name: 'Eliza', note: { ja: 'ElizaOS / Solana', en: 'ElizaOS / Solana' } },
        ],
      },
      {
        sub: { ja: '自己資金型', en: 'Self-funded' },
        chips: [{ name: 'Alpha Arena', note: { ja: 'Nof1 / Hyperliquid', en: 'Nof1 / Hyperliquid' } }],
      },
    ],
  },
  {
    badge: 'T3',
    title: { ja: '委任枠内で執行', en: 'Execution within a delegated scope' },
    tag: { ja: 'ユーザー資金', en: 'User funds' },
    desc: {
      ja: '名義はユーザーに残し、権限だけをエージェントへ渡す。上限とallowlistの内側で自律的に注文を出す。',
      en: 'The name stays with the user; only authority is handed to the agent. It places orders autonomously inside caps and an allowlist.',
    },
    groups: [
      {
        sub: { ja: 'エージェントウォレット', en: 'Agent wallets' },
        chips: [{ name: 'MetaMask Agent Wallet' }, { name: 'Coinbase' }, { name: 'Cobo' }],
      },
      {
        sub: { ja: '資金隔離型', en: 'Fund isolation' },
        chips: [{ name: 'Almanak', note: { ja: 'Safe / Eulith', en: 'Safe / Eulith' } }],
      },
    ],
  },
]

const BLOCKS: Block[] = [
  {
    label: { ja: '検証｜何が執行前に止めるか', en: 'Verification | What stops a trade before execution' },
    intro: {
      ja: 'Tierを横断して、提案された取引を実行前に検証する層がある。置き場所が4つに分かれている。',
      en: 'Across all tiers there is a layer that verifies a proposed trade before it executes. It lives in four places.',
    },
    cards: [
      {
        badge: '型W',
        title: { ja: 'ウォレット内・実行時', en: 'In-wallet, at execution' },
        tag: { ja: '実行時ポリシー', en: 'Runtime policy' },
        desc: {
          ja: '署名の直前にウォレットがルールを評価する。柔軟だが、評価する主体を信頼する必要がある。',
          en: 'The wallet evaluates rules right before signing. Flexible, but you must trust whoever does the evaluating.',
        },
        groups: [
          {
            chips: [
              { name: 'MetaMask', note: { ja: '3段階・上書き不可', en: '3 levels, non-overridable' } },
              { name: 'Cobo Rulebooks' },
              { name: 'Coinbase' },
            ],
          },
        ],
      },
      {
        badge: '型S',
        title: { ja: '署名スコープ・署名時', en: 'Signature scope, at signing' },
        tag: { ja: '署名時スコープ', en: 'Signing-time scope' },
        desc: {
          ja: '制約を署名自体に埋め込み、第三者が償還する。検証しやすいが、事前に書ける制約に限界がある。',
          en: 'Constraints are embedded in the signature itself and redeemed by a third party. Easy to verify, but there are limits to what can be written in advance.',
        },
        groups: [
          {
            chips: [
              { name: 'ERC-7710 / 7715' },
              { name: 'EIP-3009', note: { ja: 'x402 exact', en: 'x402 exact' } },
              { name: 'RePermit', note: { ja: 'Orbs Spot', en: 'Orbs Spot' } },
            ],
          },
        ],
      },
      {
        badge: '型O',
        title: { ja: '外部オラクル・執行直前', en: 'External oracle, just before execution' },
        tag: { ja: '第三者検証', en: 'Third-party check' },
        desc: {
          ja: '参照価格・スリッページ・経路を独立した主体が確認し、通ればcosignする。提案と検証を別主体に分ける。',
          en: 'An independent party checks reference price, slippage and route, and cosigns if it passes. Proposal and verification are split between different parties.',
        },
        groups: [
          { chips: [{ name: 'Orbs Agentic', note: { ja: 'cosigned oracle', en: 'cosigned oracle' } }] },
        ],
      },
      {
        badge: '型M',
        title: { ja: '口座・鍵で隔離', en: 'Isolation by account & key' },
        tag: { ja: '資金隔離', en: 'Fund isolation' },
        desc: {
          ja: 'そもそも触れる資金を絞る。検証というより、失敗したときの上限を口座の構造で決める。',
          en: 'Limits which funds can be touched in the first place. Less verification than capping the downside through account structure.',
        },
        groups: [
          {
            chips: [
              { name: 'Giza', note: { ja: 'セッションキー', en: 'session keys' } },
              { name: 'Almanak', note: { ja: 'マルチシグ', en: 'multisig' } },
            ],
          },
        ],
      },
    ],
  },
  {
    label: { ja: '接続｜MCP・Agent Skill', en: 'Access | MCP & Agent Skills' },
    intro: {
      ja: 'どのTierも、エージェント側からの入口はMCPサーバーかAgent Skillとして配られる。公式に提供されているものと、コミュニティ実装に分かれる。',
      en: 'In every tier, the agent-side entry point ships as an MCP server or an Agent Skill. These split into official offerings and community implementations.',
    },
    cards: [
      {
        badge: 'C1',
        title: { ja: '公式提供', en: 'Official' },
        tag: { ja: 'ベンダー配布', en: 'Vendor-distributed' },
        desc: {
          ja: 'プロトコル運営者自身がMCPサーバーまたはSKILL.mdを配布しているもの。認証と実行権限が製品側の規約に紐づく。',
          en: 'The protocol operator itself ships the MCP server or SKILL.md. Authentication and execution rights are tied to the product’s own terms.',
        },
        groups: [
          {
            sub: { ja: '1INCH', en: '1INCH' },
            chips: [
              { name: '1inch MCP Server', note: { ja: 'Fusion / Orderbook', en: 'Fusion / Orderbook' } },
              { name: '1inch/1inch-ai', note: { ja: 'Agent Skills', en: 'Agent Skills' } },
              { name: 'Cursor Marketplace' },
            ],
          },
          {
            sub: { ja: 'ORBS', en: 'ORBS' },
            chips: [{ name: 'Spot Advanced Swap Orders' }, { name: 'SKILL.md' }],
          },
        ],
      },
      {
        badge: 'C2',
        title: { ja: 'コミュニティ実装', en: 'Community' },
        tag: { ja: '第三者配布', en: 'Third-party' },
        desc: {
          ja: '運営者ではなく第三者がSDKを包んで公開しているもの。秘密鍵をローカルの環境変数に置く構成が多く、権限の制限は利用者側の責任になる。',
          en: 'Published by third parties wrapping the SDK, not by the operator. Many keep private keys in local environment variables, leaving permission limits to the user.',
        },
        groups: [
          {
            sub: { ja: 'HYPERLIQUID', en: 'HYPERLIQUID' },
            chips: [{ name: 'hyperliquid-mcp', note: { ja: 'EIP-712 / agent mode', en: 'EIP-712 / agent mode' } }],
          },
          {
            sub: { ja: 'DEX 横断', en: 'Cross-DEX' },
            chips: [{ name: 'awesome-web3-mcp-servers' }],
            foot: {
              ja: 'Uniswapは公式MCPを確認できていない。uniswap-trader-mcp、uniswap-poolspy-mcp などコミュニティ実装が上記の一覧に収録されている。',
              en: 'We could not confirm an official Uniswap MCP. Community implementations such as uniswap-trader-mcp and uniswap-poolspy-mcp are listed above.',
            },
          },
        ],
      },
    ],
  },
]

const GAPS: { label: Localized; text: Localized }[] = [
  {
    label: { ja: 'T2 ×｜検証可能な自律執行', en: 'T2 × | Verifiable autonomous execution' },
    text: {
      ja: '執行が自律だったことを外部から判定する手段',
      en: 'A way to tell from outside that execution was actually autonomous',
    },
  },
  {
    label: { ja: '型S ×｜権限記述の標準', en: 'Type S × | A standard for describing permissions' },
    text: {
      ja: '3フォーマットが並立したまま収束していない層',
      en: 'A layer where three formats coexist without converging',
    },
  },
]

const COPY = {
  ja: {
    gapLabel: '分岐の軸と残る空白',
    tierLabel: 'Tier｜誰の資金を、誰の名義で動かすか',
    hint: '各 Tier・型にカーソルを合わせる（タップする）と、詳細と事例が表示されます',
    gapIntro: 'Tierは資金の名義で、型は検証の置き場所で切り分ける。実装の薄い空白も、同じ軸で位置づける。',
    closing:
      'Tierごとに預かる資金も、名義も、検証の強度も違う。私たちは、この細分化を、AIとの詳細なリサーチと自社の観測を突き合わせて分析し続ける。',
    note: 'Tierは資金の名義と執行主体で分かれる。これは2軸による整理であり、実証された分類ではない。所属の判定は各社の公開情報にもとづく時点情報。',
    taxPre: '分類は ',
    taxLink: '4層モデル＋権限の記述層',
    taxPost: ' に基づく',
  },
  en: {
    gapLabel: 'Axes of divergence & remaining gaps',
    tierLabel: 'Tier | whose funds move, under whose name',
    hint: 'Hover (or tap) a tier or type to see its details and examples',
    gapIntro:
      'Tiers split on whose name the funds are in; types split on where verification lives. Thinly implemented gaps are placed on the same axes.',
    closing:
      'Each tier differs in the funds it holds, whose name they are in, and how strong verification is. We keep analyzing this segmentation by cross-checking detailed research with AI against our own observations.',
    note: 'Tiers split by whose name the funds are in and who executes. This is a two-axis framing, not a proven taxonomy. Placement is point-in-time, based on each company’s public information.',
    taxPre: 'Classification follows the ',
    taxLink: '4-layer model + permission description layer',
    taxPost: '',
  },
}

function ChipView({ chip }: { chip: Chip }) {
  const { lang } = useLang()
  const cls = `inline-flex items-center gap-2 rounded-lg border border-fg/10 bg-fg/[0.03] px-3 py-1.5 text-sm ${
    chip.ended ? 'text-fg/40' : 'text-fg/85'
  }`
  const body = (
    <>
      <span>{chip.name}</span>
      {chip.note && <span className="text-xs text-fg/40">（{chip.note[lang]}）</span>}
      {chip.href && <ArrowUpRight className="w-3 h-3 text-fg/40" />}
    </>
  )
  return chip.href ? (
    <a
      href={chip.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cls} hover:text-gold hover:border-gold/40 transition-colors`}
    >
      {body}
    </a>
  ) : (
    <span className={cls}>{body}</span>
  )
}

function CardDetail({ card, lang }: { card: Card; lang: Lang }) {
  return (
    <div className="p-5">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
        <span className="rounded-full bg-gold px-2 py-0.5 text-xs font-semibold text-black">{card.badge}</span>
        <span className="rounded-md border border-fg/15 px-2 py-0.5 text-[11px] text-fg/60">{card.tag[lang]}</span>
      </div>
      <h3 className="mt-3 text-base font-semibold text-gold">{card.title[lang]}</h3>
      <p className="mt-2 text-sm text-fg/75 leading-[1.8]">{card.desc[lang]}</p>
      {card.groups.map((g, gi) => (
        <div key={gi} className="mt-4">
          {g.sub && <p className="mb-2 text-xs tracking-widest text-fg/40">{g.sub[lang]}</p>}
          <div className="flex flex-wrap gap-2">
            {g.chips.map((c) => (
              <ChipView key={c.name} chip={c} />
            ))}
          </div>
          {g.foot && <p className="mt-3 text-xs text-fg/40 leading-[1.7]">{g.foot[lang]}</p>}
        </div>
      ))}
    </div>
  )
}

function CardFace({ card, lang }: { card: Card; lang: Lang }) {
  return (
    <span className="flex h-full flex-col items-center justify-center gap-1">
      <span className="flex items-center gap-1.5">
        <span className="text-[11px] font-mono font-semibold text-gold">{card.badge}</span>
        <span className="text-[10px] text-fg/45">{card.tag[lang]}</span>
      </span>
      <span className="text-[13px] font-semibold leading-[1.4] text-fg">{card.title[lang]}</span>
    </span>
  )
}

/* Trade map (lg+ positions in a 1100 × 500 frame; stacked below lg). */
const TW = 1100
const TH = 500
const COL_X = [0, 285, 570, 855]

export function EcosystemTrade() {
  const { lang } = useLang()
  const t = COPY[lang]
  const [verify, access] = BLOCKS
  const label = (text: string, x: number, y: number, w: number) => (
    <p
      className={`mt-5 lg:mt-0 text-[11px] font-mono tracking-widest text-gold lg:flex lg:items-center lg:justify-center ${PLACED}`}
      style={place(x, y, w, 22, TW, TH)}
    >
      {text}
    </p>
  )
  const node = (card: Card, x: number, y: number, w: number, h: number, align: 'left' | 'right' | 'center') => (
    <DNode
      key={card.badge}
      id={`trade-${card.badge}`}
      label={`${card.badge} ${card.title[lang]}`}
      align={align}
      className={PLACED}
      style={place(x, y, w, h, TW, TH)}
      face={<CardFace card={card} lang={lang} />}
      detail={<CardDetail card={card} lang={lang} />}
    />
  )
  return (
    <>
      <p className="mt-6 text-fg/60 text-base leading-[1.7] max-w-2xl">{INTRO[lang]}</p>

      <DiagramProvider className="mt-10">
        <div className="relative flex flex-col gap-2 lg:block lg:aspect-[1100/500]">
          <svg viewBox={`0 0 ${TW} ${TH}`} className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" aria-hidden="true">
            <defs>
              <marker id="tr-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 z" fill="rgb(var(--gold) / 0.8)" />
              </marker>
            </defs>
            {/* Tier progression */}
            <g fill="none" stroke="rgb(var(--gold) / 0.55)" strokeWidth={1.2} markerEnd="url(#tr-arrow)">
              <path d="M249 78 L281 78" />
              <path d="M534 78 L566 78" />
              <path d="M819 78 L851 78" />
            </g>
            {/* verification spans every tier */}
            <path d="M0 166 L1100 166" stroke="rgb(var(--fg) / 0.15)" strokeDasharray="3 5" />
            <path d="M0 302 L1100 302" stroke="rgb(var(--fg) / 0.15)" strokeDasharray="3 5" />
          </svg>

          {label(t.tierLabel, 0, 4, 1100)}
          {TIERS.map((c, i) => node(c, COL_X[i], 32, 245, 92, i < 2 ? 'left' : 'right'))}

          {label(verify.label[lang], 0, 140, 1100)}
          {verify.cards.map((c, i) => node(c, COL_X[i], 174, 245, 84, i < 2 ? 'left' : 'right'))}

          {label(access.label[lang], 0, 276, 1100)}
          {access.cards.map((c, i) => node(c, i === 0 ? 0 : 570, 310, 530, 72, i === 0 ? 'left' : 'right'))}

          {label(t.gapLabel, 0, 404, 1100)}
          {GAPS.map((g, i) => (
            <div
              key={g.label.en}
              className={`rounded-xl border border-dashed border-fg/25 px-3 py-2.5 text-center flex flex-col items-center justify-center ${PLACED}`}
              style={place(i === 0 ? 570 : 285, 432, 245, 64, TW, TH)}
            >
              <span className="text-[11px] text-fg/50">{g.label[lang]}</span>
              <span className="mt-1 text-xs text-fg/75 leading-[1.5]">{g.text[lang]}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-[11px] text-fg/40">{t.hint}</p>
      </DiagramProvider>

      <div className="mt-8 grid gap-3 md:grid-cols-2 max-w-4xl">
        {BLOCKS.map((b) => (
          <p key={b.label.en} className="text-xs text-fg/55 leading-[1.7]">
            <span className="text-gold/80">{b.label[lang]}</span>　{b.intro[lang]}
          </p>
        ))}
      </div>
      <p className="mt-4 text-xs text-fg/55 leading-[1.7] max-w-4xl">{t.gapIntro}</p>

      <p className="mt-10 text-fg/60 text-sm leading-[1.8] max-w-2xl">{t.closing}</p>
      <p className="mt-4 text-fg/40 text-xs leading-[1.8] max-w-2xl">{t.note}</p>
      <p className="mt-6 text-xs text-fg/45">
        {t.taxPre}
        {t.taxLink}
        {t.taxPost}
      </p>
    </>
  )
}
