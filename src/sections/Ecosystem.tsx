import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionEyebrow } from '../primitives'
import { useLang, type Localized } from '../i18n'

const COPY = {
  ja: {
    intro:
      'エージェント決済は、単一の方向へ移行するのではありません。用途ごとに異なる経済へ細分化していきます。Classは「支払い相手との間柄」で分かれ、そこに局面（誰が起案し、誰が承認するか）と経済形（カード網か、per-callのA to Aか）が重なります。',
    closing:
      'それぞれ粒度も成熟度も決済形式も違います。私たちは、この細分化を、AIとの詳細なリサーチと自社の観測を突き合わせて分析し続けます。',
    compositeLabel: '複合｜局面 × 経済形',
    compositeIntro:
      '単一のClassに収まらず、局面と経済形が交差するケース。境界に位置する実装をここに収容します。',
    axisLabel: '分岐の軸と残る空白',
    axisIntro: '4段の分岐でClassを切り分けます。まだ実装の薄い空白も、同じ軸で位置づけます。',
    payLabel: 'How to pay on x402',
    payIntro:
      '無料のエンドポイントは、そのまま叩ける。有料のものは最初のリクエストで402が返り、USDCで支払って同じURLへ再リクエストするだけ。',
    payLink: 'エンドポイント一覧を見る',
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
    compositeIntro:
      'Cases that do not fit a single class, where context and economic form intersect. Implementations sitting on the boundary go here.',
    axisLabel: 'Axes of divergence & remaining gaps',
    axisIntro:
      'Four splits separate the classes. Thinly-implemented gaps are placed along the same axes.',
    payLabel: 'How to pay on x402',
    payIntro:
      'Free endpoints can be called directly. Paid ones return 402 on the first request; pay in USDC and re-request the same URL.',
    payLink: 'See all endpoints',
    taxNote: 'Segments follow our Agent Economy Classes taxonomy',
    disclaimer:
      'Classes split by the relationship with the counterparty. This is an organization by four splits, not an empirically validated taxonomy.',
  },
}

type Link = { label: string; href: string; note?: Localized }
type Group = { sub: Localized; links: Link[] }
type Block = { badge: string; cls: string; name: Localized; desc: Localized; groups: Group[] }

const CLASSES: Block[] = [
  {
    badge: 'E0',
    cls: 'Class 1 · 2',
    name: { ja: '社内エージェント / 決済なし', en: 'Internal agents / no settlement' },
    desc: {
      ja: '決済が発生しない側。予算の上限管理と、起案と承認の分離で統制する。',
      en: 'The side where no payment occurs: budget caps, and separating proposal from approval.',
    },
    groups: [
      {
        sub: { ja: '予算上限型', en: 'Budget-capped' },
        links: [
          { label: 'qm', href: 'https://note.com/x402inc/n/naab6a0b3e1e2' },
          { label: 'Cloudflare OS', href: 'https://note.com/x402inc/n/naab6a0b3e1e2' },
        ],
      },
      {
        sub: { ja: '起案・承認分離', en: 'Proposal / approval split' },
        links: [
          {
            label: 'Stripe Approvals',
            href: 'https://docs.stripe.com/account/approvals',
            note: { ja: '社内承認ワークフロー', en: 'internal approval workflow' },
          },
        ],
      },
    ],
  },
  {
    badge: 'E3',
    cls: 'Class 3',
    name: { ja: 'カード / 承認制チェックアウト', en: 'Cards / approval-based checkout' },
    desc: {
      ja: '人間の委任でエージェントが代わりに買う。名義と承認は人間に残り、カード網と決済事業者が受け入れ側を広げている。',
      en: 'An agent buys on a human’s behalf. The name and approval stay with the human; card networks and payment providers are expanding acceptance.',
    },
    groups: [
      {
        sub: { ja: '3a｜都度承認', en: '3a | per-transaction approval' },
        links: [
          { label: 'Crossmint', href: 'https://note.com/x402inc/n/n7c2b66d48d4e' },
          { label: 'Stripe Approvals', href: 'https://docs.stripe.com/account/approvals' },
        ],
      },
      {
        sub: { ja: '3b｜委任枠内で自律', en: '3b | autonomous within a delegated limit' },
        links: [
          {
            label: 'Visa',
            href: 'https://note.com/x402inc/n/n56e14388db20',
            note: { ja: 'カード', en: 'card' },
          },
          { label: 'Mastercard', href: 'https://note.com/x402inc/n/n471143ea5674' },
          { label: 'Lobster.cash', href: 'https://note.com/x402inc/n/n471143ea5674' },
          { label: 'Robinhood', href: 'https://note.com/x402inc/n/nbd206694bc41' },
        ],
      },
      {
        sub: { ja: '基盤・信頼', en: 'Infrastructure & trust' },
        links: [
          {
            label: 'American Express',
            href: 'https://note.com/x402inc/n/n4e44009a2987',
            note: { ja: '責任の肩代わり', en: 'liability assumption' },
          },
          { label: 'Stripe Issuing', href: 'https://note.com/x402inc/n/na798062b2b1a' },
          {
            label: 'Meow',
            href: 'https://note.com/x402inc/n/nd3c05cc59104',
            note: { ja: '非x402', en: 'non-x402' },
          },
        ],
      },
    ],
  },
  {
    badge: 'E4',
    cls: 'Class 4',
    name: { ja: 'x402 A to A｜per-call調達', en: 'x402 A-to-A | per-call procurement' },
    desc: {
      ja: 'アカウントのない相手から、仕事の単位ごとにper-callで調達する。受け口は実装・設定・配布の三つの形で広がる。',
      en: 'Procuring per-call from parties without accounts, per unit of work. Acceptance spreads in three forms: implemented, configured, distributed.',
    },
    groups: [
      {
        sub: { ja: '4a｜実装型', en: '4a | implemented' },
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
        sub: { ja: '4b｜設定型', en: '4b | configured' },
        links: [
          {
            label: 'Cloudflare Monetization Gateway',
            href: 'https://blog.cloudflare.com/monetization-gateway/',
          },
        ],
      },
      {
        sub: { ja: '4c｜配布型', en: '4c | distributed' },
        links: [
          { label: 'AgentCash', href: 'https://note.com/x402inc/n/nd3c05cc59104' },
          { label: 'Agentic.market', href: 'https://note.com/x402inc/n/n5f1f1c6ae0cf' },
          { label: 'Nevermined', href: 'https://note.com/x402inc/n/nd3c05cc59104' },
        ],
      },
      {
        sub: { ja: '買い手側基盤', en: 'Buyer-side infrastructure' },
        links: [{ label: 'Cloudflare Wallets', href: 'https://blog.cloudflare.com/wallets/' }],
      },
    ],
  },
  {
    badge: 'E5',
    cls: 'Class 5',
    name: { ja: 'x402 A to A｜エージェント間市場', en: 'x402 A-to-A | agent-to-agent market' },
    desc: {
      ja: 'エージェントがエージェントに、仕事の単位ごとに支払う。escrowと評価を内蔵する市場と、単一identityへ集約する形がある。',
      en: 'Agents pay other agents per unit of work. Some markets embed escrow and reputation; others consolidate onto a single identity.',
    },
    groups: [
      {
        sub: { ja: '5a｜escrow・評価内蔵', en: '5a | embedded escrow & reputation' },
        links: [
          {
            label: 'Virtuals ACP',
            href: 'https://whitepaper.virtuals.io/about-virtuals/agent-commerce-protocol-acp',
          },
          { label: 'AgenC', href: 'https://agenc.ag/' },
        ],
      },
      {
        sub: { ja: '5b｜単一identityへ集約', en: '5b | consolidated onto one identity' },
        links: [{ label: 'OKX AI', href: 'https://www.okx.com/en-us/learn/okx-ai' }],
      },
    ],
  },
]

const COMPOSITE: Block[] = [
  {
    badge: '型α',
    cls: 'Class 1 + 4',
    name: { ja: '内部起点・外部決済', en: 'Internal origin, external settlement' },
    desc: {
      ja: '起案は社内エージェント、決済は外部へper-callで抜ける。',
      en: 'An internal agent originates; settlement leaves externally, per-call.',
    },
    groups: [{ sub: { ja: '', en: '' }, links: [{ label: 'Hermes Agent', href: 'https://note.com/x402inc/n/nb69d33331327' }] }],
  },
  {
    badge: '型β',
    cls: 'Class 3 / 4 境界',
    name: { ja: '機械主体・カード', en: 'Machine-led, on a card' },
    desc: {
      ja: '機械が主体的に動くが、決済はカード網に載る。3と4の境界。',
      en: 'The machine acts autonomously, but settlement rides card rails — the 3/4 boundary.',
    },
    groups: [{ sub: { ja: '', en: '' }, links: [{ label: 'Oobit', href: 'https://note.com/x402inc/n/na798062b2b1a' }] }],
  },
  {
    badge: '型P',
    cls: 'Class 3 + 4',
    name: { ja: '決済オプション併設', en: 'x402 as a payment option' },
    desc: {
      ja: '既存のcheckoutに、決済オプションの一つとしてx402を併設する。',
      en: 'x402 offered alongside an existing checkout as one payment option.',
    },
    groups: [
      {
        sub: { ja: '', en: '' },
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
    axis: { ja: '4c｜配布型の反復', en: '4c | distributed, repeated' },
    gap: { ja: '反復のper-callが継続する受け口', en: 'endpoints where repeated per-call persists' },
  },
  {
    axis: { ja: '5b｜単一identity集約', en: '5b | consolidated identity' },
    gap: { ja: '外部の実需を受発注につなぐ層', en: 'a layer wiring external demand into order flow' },
  },
]

function Chip({ link, lang }: { link: Link; lang: 'ja' | 'en' }) {
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

function BlockCard({ block, i }: { block: Block; i: number }) {
  const { lang } = useLang()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.08 }}
      className="liquid-glass rounded-2xl p-6"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span
          className="text-[11px] font-mono px-2 py-0.5 rounded-full"
          style={{ color: 'rgb(var(--bg))', background: 'rgb(var(--gold))' }}
        >
          {block.badge}
        </span>
        <p className="font-mono text-sm text-gold">{block.name[lang]}</p>
        <span
          className="text-[11px] font-mono px-2 py-0.5 rounded-full border"
          style={{ color: 'rgb(var(--gold))', borderColor: 'rgb(var(--gold) / 0.4)' }}
        >
          {block.cls}
        </span>
      </div>
      <p className="mt-3 text-sm text-fg/70 leading-[1.7]">{block.desc[lang]}</p>
      {block.groups.map((g, gi) => (
        <div key={gi} className="mt-4">
          {g.sub[lang] && (
            <p className="mb-1.5 text-[11px] uppercase tracking-widest text-fg/40">{g.sub[lang]}</p>
          )}
          <div className="flex flex-wrap gap-x-2 gap-y-1.5">
            {g.links.map((l) => (
              <Chip key={l.label} link={l} lang={lang} />
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  )
}

export function Ecosystem() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-14 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl"
      >
        <SectionEyebrow label="Ecosystem" tag="segmentation" heading />
        <p className="mt-6 text-fg/60 text-base leading-[1.7]">{t.intro}</p>
      </motion.div>

      {/* Class blocks E0 / E3 / E4 / E5 */}
      <div className="mt-10 grid sm:grid-cols-2 gap-5">
        {CLASSES.map((b, i) => (
          <BlockCard key={b.cls} block={b} i={i} />
        ))}
      </div>

      {/* Composite: context × economy (型α / 型β / 型P) */}
      <div className="mt-12 pt-10 border-t border-fg/10">
        <p className="text-xs uppercase tracking-widest text-gold">{t.compositeLabel}</p>
        <p className="mt-3 text-fg/60 text-sm leading-[1.7] max-w-2xl">{t.compositeIntro}</p>
        <div className="mt-6 grid md:grid-cols-3 gap-5">
          {COMPOSITE.map((b, i) => (
            <BlockCard key={b.badge} block={b} i={i} />
          ))}
        </div>
      </div>

      {/* Axes of divergence & remaining gaps */}
      <div className="mt-12 pt-10 border-t border-fg/10">
        <p className="text-xs uppercase tracking-widest text-gold">{t.axisLabel}</p>
        <p className="mt-3 text-fg/60 text-sm leading-[1.7] max-w-2xl">{t.axisIntro}</p>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {GAPS.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              className="rounded-xl border border-dashed border-fg/15 p-5"
            >
              <p className="font-mono text-xs text-fg/45">{g.axis[lang]}</p>
              <p className="mt-2 text-sm text-fg/70 leading-[1.7]">{g.gap[lang]}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <a
        href="https://note.com/x402inc/n/n7beb8aba2e6a"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-1.5 text-xs text-fg/45 hover:text-gold transition-colors"
      >
        {t.taxNote}
        <ArrowUpRight className="w-3 h-3" />
      </a>

      <p className="mt-6 text-fg/50 text-sm leading-[1.7] max-w-3xl">{t.closing}</p>
      <p className="mt-3 text-fg/40 text-xs leading-[1.7] max-w-3xl">{t.disclaimer}</p>

      {/* How to pay on x402 — integrated here */}
      <div className="mt-12 pt-10 border-t border-fg/10">
        <p className="text-xs uppercase tracking-widest text-gold">{t.payLabel}</p>
        <p className="mt-3 text-fg/60 text-base leading-[1.7] max-w-2xl">{t.payIntro}</p>
        <pre className="mt-5 liquid-glass rounded-xl p-4 text-xs md:text-sm font-mono text-fg/80 overflow-x-auto max-w-2xl">
          <span className="text-fg/40">$ </span>curl https://jin.x402jp.com/api/jin/latest
        </pre>
        <a
          href="/products.html"
          className="mt-5 inline-flex items-center gap-1.5 text-sm text-fg/70 hover:text-gold transition-colors"
        >
          {t.payLink}
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  )
}
