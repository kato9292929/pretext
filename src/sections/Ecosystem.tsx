import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionEyebrow } from '../primitives'
import { useLang, type Lang, type Localized } from '../i18n'
import { DNode, DiagramProvider, PLACED, place } from '../components/Diagram'
import { EcosystemTrade } from './EcosystemTrade'

type Tab = 'payment' | 'trade'
const TABS: { key: Tab; label: string }[] = [
  { key: 'payment', label: 'Payment' },
  { key: 'trade', label: 'Trade' },
]

const COPY = {
  ja: {
    intro:
      'エージェント決済は、単一の方向へ移行するのではありません。用途ごとに異なる経済へ細分化していきます。Classは「支払い相手との間柄」で分かれ、そこに局面（誰が起案し、誰が承認するか）と経済形（カード網か、per-callのA to Aか）が重なります。',
    closing:
      'それぞれ粒度も成熟度も決済形式も違います。私たちは、この細分化を、AIとの詳細なリサーチと自社の観測を突き合わせて分析し続けます。',
    compositeLabel: '複合｜局面 × 経済形',
    gapLabel: '残る空白',
    cols: ['決済なし', 'カード網', 'per-call 調達', 'エージェント間市場'],
    hint: '各 Class にカーソルを合わせる（タップする）と、詳細と事例が表示されます',
    compositeIntro:
      '単一のClassに収まらず、局面と経済形が交差するケース。境界に位置する実装をここに収容します。',
    axisLabel: '分岐の軸と残る空白',
    axisIntro: '4段の分岐でClassを切り分けます。まだ実装の薄い空白も、同じ軸で位置づけます。',
    taxNote: '分類は Agent Economy Classes に基づく',
    disclaimer:
      'Classは支払い相手との間柄で分かれる。これは4段の分岐による整理であり、実証された分類ではありません。',
  },
  en: {
    intro:
      'Agent payments do not migrate in a single direction. They segment into different economies by use case. Classes split by the relationship with the counterparty, overlaid with context (who proposes, who approves) and economic form (card networks, or per-call A-to-A).',
    closing:
      'Each differs in granularity, maturity and payment form. We keep analyzing this segmentation by cross-checking detailed research with AI against our own observations.',
    compositeLabel: 'Composite | context × economy',
    gapLabel: 'Remaining gaps',
    cols: ['No settlement', 'Card networks', 'Per-call procurement', 'Agent-to-agent market'],
    hint: 'Hover (or tap) a class to see its details and examples',
    compositeIntro:
      'Cases that do not fit a single class, where context and economic form intersect. Implementations sitting on the boundary go here.',
    axisLabel: 'Axes of divergence & remaining gaps',
    axisIntro:
      'Four splits separate the classes. Thinly-implemented gaps are placed along the same axes.',
    taxNote: 'Segments follow our Agent Economy Classes taxonomy',
    disclaimer:
      'Classes split by the relationship with the counterparty. This is an organization by four splits, not an empirically validated taxonomy.',
  },
  zh: {
    intro:
      '智能体支付并不会朝单一方向迁移，而是按用途细分为不同的经济形态。Class 按“与支付对象的关系”划分，其上再叠加场景（由谁发起、由谁审批）与经济形态（银行卡网络，还是 per-call 的 A to A）。',
    closing:
      '它们的粒度、成熟度与支付形式各不相同。我们将持续把与 AI 进行的深入研究同自身的观测相互对照，分析这种细分。',
    compositeLabel: '复合｜场景 × 经济形态',
    gapLabel: '尚存的空白',
    cols: ['无支付', '银行卡网络', 'per-call 采购', '智能体间市场'],
    hint: '将光标移至（或点按）各 Class，即可查看详情与案例',
    compositeIntro:
      '无法归入单一 Class、场景与经济形态相互交叉的情形。位于边界上的实现收录于此。',
    axisLabel: '分化的轴线与尚存的空白',
    axisIntro: '以四级分支划分各 Class。实现尚少的空白，也以同样的轴线定位。',
    taxNote: '分类基于 Agent Economy Classes',
    disclaimer:
      'Class 按与支付对象的关系划分。这是基于四级分支的梳理，并非经过验证的分类。',
  },
}

type Link = { label: string; href: string; note?: Localized }
type Group = { sub: Localized; links: Link[] }
// The one Japanese word in a class label (境界 = boundary), per language
const clsLabel = (cls: string, lang: Lang) => cls.replace('境界', { ja: '境界', en: 'boundary', zh: '边界' }[lang])

type Block = { badge: string; cls: string; name: Localized; desc: Localized; groups: Group[] }

const CLASSES: Block[] = [
  {
    badge: 'E0',
    cls: 'Class 1 · 2',
    name: { ja: '社内エージェント / 決済なし', en: 'Internal agents / no settlement', zh: '内部智能体 / 无支付' },
    desc: {
      ja: '決済が発生しない側。予算の上限管理と、起案と承認の分離で統制する。',
      en: 'The side where no payment occurs: budget caps, and separating proposal from approval.',
      zh: '不产生支付的一方。通过预算上限管理以及发起与审批的分离进行管控。',
    },
    groups: [
      {
        sub: { ja: '予算上限型', en: 'Budget-capped', zh: '预算上限型' },
        links: [
          { label: 'qm', href: 'https://note.com/x402inc/n/naab6a0b3e1e2' },
          { label: 'Cloudflare OS', href: 'https://note.com/x402inc/n/naab6a0b3e1e2' },
        ],
      },
      {
        sub: { ja: '起案・承認分離', en: 'Proposal / approval split', zh: '发起・审批分离' },
        links: [
          {
            label: 'Stripe Approvals',
            href: 'https://docs.stripe.com/account/approvals',
            note: { ja: '社内承認ワークフロー', en: 'internal approval workflow', zh: '内部审批工作流' },
          },
        ],
      },
    ],
  },
  {
    badge: 'E3',
    cls: 'Class 3',
    name: { ja: 'カード / 承認制チェックアウト', en: 'Cards / approval-based checkout', zh: '银行卡 / 授权制结账' },
    desc: {
      ja: '人間の委任でエージェントが代わりに買う。名義と承認は人間に残り、カード網と決済事業者が受け入れ側を広げている。',
      en: 'An agent buys on a human’s behalf. The name and approval stay with the human; card networks and payment providers are expanding acceptance.',
      zh: '在人的委托下，由智能体代为购买。名义与授权仍归于人，银行卡网络与支付服务商正在扩大受理范围。',
    },
    groups: [
      {
        sub: { ja: '3a｜都度承認', en: '3a | per-transaction approval', zh: '3a｜逐笔授权' },
        links: [
          { label: 'Crossmint', href: 'https://note.com/x402inc/n/n7c2b66d48d4e' },
          { label: 'Stripe Approvals', href: 'https://docs.stripe.com/account/approvals' },
        ],
      },
      {
        sub: { ja: '3b｜委任枠内で自律', en: '3b | autonomous within a delegated limit', zh: '3b｜在委托额度内自主' },
        links: [
          {
            label: 'Visa',
            href: 'https://note.com/x402inc/n/n56e14388db20',
            note: { ja: 'カード', en: 'card', zh: '银行卡' },
          },
          { label: 'Mastercard', href: 'https://note.com/x402inc/n/n471143ea5674' },
          { label: 'Lobster.cash', href: 'https://note.com/x402inc/n/n471143ea5674' },
          { label: 'Robinhood', href: 'https://note.com/x402inc/n/nbd206694bc41' },
        ],
      },
      {
        sub: { ja: '基盤・信頼', en: 'Infrastructure & trust', zh: '基础设施・信任' },
        links: [
          {
            label: 'American Express',
            href: 'https://note.com/x402inc/n/n4e44009a2987',
            note: { ja: '責任の肩代わり', en: 'liability assumption', zh: '代为承担责任' },
          },
          { label: 'Stripe Issuing', href: 'https://note.com/x402inc/n/na798062b2b1a' },
          {
            label: 'Meow',
            href: 'https://note.com/x402inc/n/nd3c05cc59104',
            note: { ja: '非x402', en: 'non-x402', zh: '非 x402' },
          },
        ],
      },
    ],
  },
  {
    badge: 'E4',
    cls: 'Class 4',
    name: { ja: 'x402 A to A｜per-call調達', en: 'x402 A-to-A | per-call procurement', zh: 'x402 A to A｜per-call 采购' },
    desc: {
      ja: 'アカウントのない相手から、仕事の単位ごとにper-callで調達する。受け口は実装・設定・配布の三つの形で広がる。',
      en: 'Procuring per-call from parties without accounts, per unit of work. Acceptance spreads in three forms: implemented, configured, distributed.',
      zh: '以工作单位为粒度，按次调用向没有账户关系的对象采购。受理端以实现、配置、分发三种形式扩展。',
    },
    groups: [
      {
        sub: { ja: '4a｜実装型', en: '4a | implemented', zh: '4a｜实现型' },
        links: [
          {
            label: 'Glassnode',
            href: 'https://research.glassnode.com/agentic-payments-glassnode-data-for-your-ai-agent/',
          },
          {
            label: 'You.com',
            href: 'https://you.com/resources/your-trading-agent-should-read-before-it-buys-accessing-ydc-over-x402-on-base',
          },
        ],
      },
      {
        sub: { ja: '4b｜設定型', en: '4b | configured', zh: '4b｜配置型' },
        links: [
          {
            label: 'Cloudflare Monetization Gateway',
            href: 'https://blog.cloudflare.com/monetization-gateway/',
          },
        ],
      },
      {
        sub: { ja: '4c｜配布型', en: '4c | distributed', zh: '4c｜分发型' },
        links: [
          { label: 'AgentCash', href: 'https://note.com/x402inc/n/nd3c05cc59104' },
          { label: 'Agentic.market', href: 'https://note.com/x402inc/n/n5f1f1c6ae0cf' },
          { label: 'Nevermined', href: 'https://note.com/x402inc/n/nd3c05cc59104' },
        ],
      },
      {
        sub: { ja: '買い手側基盤', en: 'Buyer-side infrastructure', zh: '买方侧基础设施' },
        links: [{ label: 'Cloudflare Wallets', href: 'https://blog.cloudflare.com/wallets/' }],
      },
    ],
  },
  {
    badge: 'E5',
    cls: 'Class 5',
    name: { ja: 'x402 A to A｜エージェント間市場', en: 'x402 A-to-A | agent-to-agent market', zh: 'x402 A to A｜智能体间市场' },
    desc: {
      ja: 'エージェントがエージェントに、仕事の単位ごとに支払う。escrowと評価を内蔵する市場と、単一identityへ集約する形がある。',
      en: 'Agents pay other agents per unit of work. Some markets embed escrow and reputation; others consolidate onto a single identity.',
      zh: '智能体以工作单位为粒度向智能体支付。有内置 escrow 与评价的市场，也有汇聚到单一 identity 的形态。',
    },
    groups: [
      {
        sub: { ja: '5a｜escrow・評価内蔵', en: '5a | embedded escrow & reputation', zh: '5a｜内置 escrow・评价' },
        links: [
          {
            label: 'Virtuals ACP',
            href: 'https://whitepaper.virtuals.io/about-virtuals/agent-commerce-protocol-acp',
          },
          { label: 'AgenC', href: 'https://agenc.ag/' },
        ],
      },
      {
        sub: { ja: '5b｜単一identityへ集約', en: '5b | consolidated onto one identity', zh: '5b｜汇聚到单一 identity' },
        links: [{ label: 'OKX AI', href: 'https://www.okx.com/en-us/learn/okx-ai' }],
      },
    ],
  },
]

const COMPOSITE: Block[] = [
  {
    badge: '型α',
    cls: 'Class 1 + 4',
    name: { ja: '内部起点・外部決済', en: 'Internal origin, external settlement', zh: '内部发起・外部支付' },
    desc: {
      ja: '起案は社内エージェント、決済は外部へper-callで抜ける。',
      en: 'An internal agent originates; settlement leaves externally, per-call.',
      zh: '由内部智能体发起，支付则以 per-call 方式流向外部。',
    },
    groups: [{ sub: { ja: '', en: '', zh: '' }, links: [{ label: 'Hermes Agent', href: 'https://note.com/x402inc/n/nb69d33331327' }] }],
  },
  {
    badge: '型β',
    cls: 'Class 3 / 4 境界',
    name: { ja: '機械主体・カード', en: 'Machine-led, on a card', zh: '机器主导・银行卡' },
    desc: {
      ja: '機械が主体的に動くが、決済はカード網に載る。3と4の境界。',
      en: 'The machine acts autonomously, but settlement rides card rails — the 3/4 boundary.',
      zh: '机器自主行动，但支付走银行卡网络。处于3与4的边界。',
    },
    groups: [{ sub: { ja: '', en: '', zh: '' }, links: [{ label: 'Oobit', href: 'https://note.com/x402inc/n/na798062b2b1a' }] }],
  },
  {
    badge: '型P',
    cls: 'Class 3 + 4',
    name: { ja: '決済オプション併設', en: 'x402 as a payment option', zh: '并设支付选项' },
    desc: {
      ja: '既存のcheckoutに、決済オプションの一つとしてx402を併設する。',
      en: 'x402 offered alongside an existing checkout as one payment option.',
      zh: '在现有 checkout 中，将 x402 作为支付选项之一并行提供。',
    },
    groups: [
      {
        sub: { ja: '', en: '', zh: '' },
        links: [
          { label: 'Stripe Machine Payments', href: 'https://docs.stripe.com/agentic-commerce' },
          {
            label: 'Visa Intelligent Commerce',
            href: 'https://developer.visa.com/capabilities/visa-intelligent-commerce',
          },
          { label: 'Coinbase Business', href: 'https://docs.cdp.coinbase.com/x402/welcome' },
          { label: 'Adyen Agentic', href: 'https://www.adyen.com/' },
        ],
      },
    ],
  },
]

const GAPS: { axis: Localized; gap: Localized }[] = [
  {
    axis: { ja: '4c｜配布型の反復', en: '4c | distributed, repeated', zh: '4c｜分发型的重复调用' },
    gap: { ja: '反復のper-callが継続する受け口', en: 'endpoints where repeated per-call persists', zh: '重复 per-call 得以持续的受理端' },
  },
  {
    axis: { ja: '5b｜単一identity集約', en: '5b | consolidated identity', zh: '5b｜单一 identity 汇聚' },
    gap: { ja: '外部の実需を受発注につなぐ層', en: 'a layer wiring external demand into order flow', zh: '将外部实际需求对接到订单收发的层' },
  },
]

function Chip({ link, lang }: { link: Link; lang: Lang }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-full border border-fg/10 px-2.5 py-1 text-xs text-fg/70 hover:text-gold hover:border-gold/40 transition-colors"
    >
      {link.label}
      {link.note && <span className="text-fg/35">({link.note[lang]})</span>}
      <ArrowUpRight className="w-3 h-3" />
    </a>
  )
}

function BlockDetail({ block, lang }: { block: Block; lang: Lang }) {
  return (
    <div className="p-5">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
        <span
          className="text-[11px] font-mono px-2 py-0.5 rounded-full"
          style={{ color: 'rgb(var(--bg))', background: 'rgb(var(--gold))' }}
        >
          {block.badge}
        </span>
        <span
          className="text-[11px] font-mono px-2 py-0.5 rounded-full border"
          style={{ color: 'rgb(var(--gold))', borderColor: 'rgb(var(--gold) / 0.4)' }}
        >
          {clsLabel(block.cls, lang)}
        </span>
      </div>
      <h3 className="mt-3 text-base font-semibold text-fg">{block.name[lang]}</h3>
      <p className="mt-2 text-sm text-fg/70 leading-[1.7]">{block.desc[lang]}</p>
      {block.groups.map((g, gi) => (
        <div key={gi} className="mt-4">
          {g.sub[lang] && <p className="mb-1.5 text-[11px] uppercase tracking-widest text-fg/40">{g.sub[lang]}</p>}
          <div className="flex flex-wrap gap-x-2 gap-y-1.5">
            {g.links.map((l) => (
              <Chip key={l.label} link={l} lang={lang} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function BlockFace({ block, lang }: { block: Block; lang: Lang }) {
  return (
    <span className="flex h-full flex-col items-center justify-center gap-1">
      <span className="flex items-center gap-1.5">
        <span className="text-[11px] font-mono font-semibold text-gold">{block.badge}</span>
        <span className="text-[10px] font-mono text-fg/45">{clsLabel(block.cls, lang)}</span>
      </span>
      <span className="text-[13px] font-semibold leading-[1.4] text-fg">{block.name[lang]}</span>
    </span>
  )
}

/* Payment map (lg+ positions in a 1100 × 330 frame; stacked below lg). */
const PW = 1100
const PH = 330
const CLASS_X = [0, 285, 570, 855]
const COMPOSITE_POS = [
  { x: 0, w: 200 },
  { x: 215, w: 200 },
  { x: 430, w: 200 },
]
const GAP_POS = [
  { x: 650, w: 215 },
  { x: 885, w: 215 },
]

function PaymentMap({ t, lang }: { t: (typeof COPY)['ja']; lang: Lang }) {
  const label = (text: string, x: number, y: number, w: number, extra = '') => (
    <p
      className={`mt-4 first:mt-0 lg:mt-0 text-[11px] font-mono tracking-widest text-gold lg:flex lg:items-center lg:justify-center ${PLACED} ${extra}`}
      style={place(x, y, w, 22, PW, PH)}
    >
      {text}
    </p>
  )
  return (
    <DiagramProvider className="mt-10">
      <div className="relative flex flex-col gap-2 lg:block lg:aspect-[1100/330]">
        <svg viewBox={`0 0 ${PW} ${PH}`} className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" aria-hidden="true">
          <g fill="none" stroke="rgb(var(--gold) / 0.5)" strokeWidth={1.1}>
            {/* composites → the classes they straddle */}
            <path d="M100 212 L122 132 M150 212 L620 132" />
            <path d="M300 212 L390 132 M350 212 L600 132" />
            <path d="M510 212 L450 132 M570 212 L650 132" />
          </g>
          <g fill="none" stroke="rgb(var(--fg) / 0.35)" strokeWidth={1} strokeDasharray="4 4">
            {/* classes → remaining gaps */}
            <path d="M735 132 L757 212 M985 132 L992 212" />
          </g>
        </svg>

        {CLASSES.map((c, i) => (
          <div key={c.badge} className="contents">
            {label(t.cols[i], CLASS_X[i], 4, 245)}
            <DNode
              id={`pay-${c.badge}`}
              label={`${c.badge} ${c.name[lang]}`}
              align={i < 2 ? 'left' : 'right'}
              className={PLACED}
              style={place(CLASS_X[i], 34, 245, 98, PW, PH)}
              face={<BlockFace block={c} lang={lang} />}
              detail={<BlockDetail block={c} lang={lang} />}
            />
          </div>
        ))}

        {label(t.compositeLabel, 0, 300, 630)}
        {COMPOSITE.map((c, i) => (
          <DNode
            key={c.badge}
            id={`pay-${c.badge}`}
            label={`${c.badge} ${c.name[lang]}`}
            align={i === 0 ? 'left' : 'center'}
            className={PLACED}
            style={place(COMPOSITE_POS[i].x, 212, COMPOSITE_POS[i].w, 80, PW, PH)}
            face={<BlockFace block={c} lang={lang} />}
            detail={<BlockDetail block={c} lang={lang} />}
          />
        ))}

        {label(t.gapLabel, 650, 300, 450)}
        {GAPS.map((g, i) => (
          <div
            key={g.axis.ja}
            className={`rounded-xl border border-dashed border-fg/25 px-3 py-2.5 text-center flex flex-col items-center justify-center ${PLACED}`}
            style={place(GAP_POS[i].x, 212, GAP_POS[i].w, 80, PW, PH)}
          >
            <span className="font-mono text-[11px] text-fg/50">{g.axis[lang]}</span>
            <span className="mt-1 text-xs text-fg/70 leading-[1.5]">{g.gap[lang]}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-[11px] text-fg/40">{t.hint}</p>
    </DiagramProvider>
  )
}

export function Ecosystem() {
  const { lang } = useLang()
  const t = COPY[lang]
  const [tab, setTab] = useState<Tab>('payment')
  return (
    <section className="relative z-20 max-w-6xl mx-auto px-6 py-14 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl"
      >
        <SectionEyebrow label="Ecosystem" tag="segmentation" heading />
        <div role="tablist" className="mt-6 inline-flex rounded-full border border-fg/15 p-1">
          {TABS.map((tb) => (
            <button
              key={tb.key}
              type="button"
              role="tab"
              aria-selected={tab === tb.key}
              onClick={() => setTab(tb.key)}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                tab === tb.key ? 'bg-gold text-bg font-semibold' : 'text-fg/60 hover:text-fg'
              }`}
            >
              {tb.label}
            </button>
          ))}
        </div>
      </motion.div>

      {tab === 'trade' ? (
        <EcosystemTrade />
      ) : (
        <>
          <p className="mt-6 text-fg/60 text-base leading-[1.7] max-w-3xl">{t.intro}</p>

          <PaymentMap t={t} lang={lang} />

          <a
            href="https://note.com/x402inc/n/n7beb8aba2e6a"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-xs text-fg/45 hover:text-gold transition-colors"
          >
            {t.taxNote}
            <ArrowUpRight className="w-3 h-3" />
          </a>

          <p className="mt-6 text-fg/50 text-sm leading-[1.7] max-w-3xl">{t.closing}</p>
          <p className="mt-3 text-fg/40 text-xs leading-[1.7] max-w-3xl">{t.disclaimer}</p>

        </>
      )}
    </section>
  )
}
