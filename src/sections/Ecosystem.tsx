import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionEyebrow } from '../primitives'
import { useLang, type Localized } from '../i18n'

const COPY = {
  ja: {
    intro:
      'エージェント決済は、単一の方向へ移行するのではありません。用途ごとに異なる経済へ細分化していきます。',
    closing:
      'それぞれ粒度も成熟度も決済形式も違います。私たちは、この細分化を、AIとの詳細なリサーチと自社の観測を突き合わせて分析し続けます。',
    payLabel: 'How to pay on x402',
    payIntro:
      '無料のエンドポイントは、そのまま叩ける。有料のものは最初のリクエストで402が返り、USDCで支払って同じURLへ再リクエストするだけ。',
    payLink: 'エンドポイント一覧を見る',
    taxNote: '分類は Agent Economy Classes に基づく',
  },
  en: {
    intro:
      'Agent payments do not migrate in a single direction. They segment into different economies by use case.',
    closing:
      'Each differs in granularity, maturity and payment form. We keep analyzing this segmentation by cross-checking detailed research with AI against our own observations.',
    payLabel: 'How to pay on x402',
    payIntro:
      'Free endpoints can be called directly. Paid ones return 402 on the first request; pay in USDC and re-request the same URL.',
    payLink: 'See all endpoints',
    taxNote: 'Segments follow our Agent Economy Classes taxonomy',
  },
}

type Link = { label: string; href: string }
type Group = { sub?: string; links: Link[] }
type Segment = { name: string; cls: string; desc: Localized; groups: Group[] }

const SEGMENTS: Segment[] = [
  {
    name: 'cards / approval-based checkout',
    cls: 'Class 3',
    desc: {
      ja: '人間の委任でエージェントが代わりに買う。名義と承認は人間に残り、クレジットカード事業者と決済事業者が受け入れ側を広げている。',
      en: 'An agent buys on a human’s behalf. The name and approval stay with the human; card networks and payment providers are expanding acceptance.',
    },
    groups: [
      {
        links: [
          { label: 'Visa', href: 'https://note.com/x402inc/n/n56e14388db20' },
          { label: 'Mastercard', href: 'https://note.com/x402inc/n/n471143ea5674' },
          { label: 'American Express', href: 'https://note.com/x402inc/n/n4e44009a2987' },
          { label: 'Crossmint', href: 'https://note.com/x402inc/n/n7c2b66d48d4e' },
          { label: 'Oobit', href: 'https://note.com/x402inc/n/na798062b2b1a' },
          { label: 'Stripe Issuing', href: 'https://note.com/x402inc/n/na798062b2b1a' },
          { label: 'Lobster.cash', href: 'https://note.com/x402inc/n/n471143ea5674' },
          { label: 'Robinhood', href: 'https://note.com/x402inc/n/nbd206694bc41' },
          { label: 'Meow', href: 'https://note.com/x402inc/n/nd3c05cc59104' },
          { label: 'WalletConnect agent-sdk', href: 'https://github.com/WalletConnect/agent-sdk' },
        ],
      },
    ],
  },
  {
    name: 'x402 as a payment option',
    cls: 'Class 3 · 4',
    desc: {
      ja: '既存のcheckoutに、決済オプションの一つとしてx402が追加される。受け口は実装・設定・配布の三つの形で広がっている。',
      en: 'x402 is added to existing checkouts as one payment option. Acceptance spreads in three forms: implemented, configured, or distributed.',
    },
    groups: [
      {
        links: [
          { label: 'Stripe Machine Payments', href: 'https://docs.stripe.com/agentic-commerce' },
          { label: 'Coinbase Business', href: 'https://docs.cdp.coinbase.com/x402/welcome' },
          {
            label: 'Visa Intelligent Commerce',
            href: 'https://developer.visa.com/capabilities/visa-intelligent-commerce',
          },
          {
            label: 'Cloudflare Monetization Gateway',
            href: 'https://blog.cloudflare.com/monetization-gateway/',
          },
        ],
      },
    ],
  },
  {
    name: 'x402 A to A',
    cls: 'Class 4 · 5',
    desc: {
      ja: 'アカウントのない相手からper-callで調達する（Class 4）。エージェントがエージェントに、仕事の単位ごとに支払う（Class 5）。',
      en: 'Agents procure per-call from parties without accounts (Class 4). Agents pay other agents per unit of work (Class 5).',
    },
    groups: [
      {
        sub: 'Class 4',
        links: [
          {
            label: 'Glassnode',
            href: 'https://research.glassnode.com/agentic-payments-glassnode-data-for-your-ai-agent/',
          },
          {
            label: 'You.com',
            href: 'https://you.com/resources/your-trading-agent-should-read-before-it-buys-accessing-ydc-over-x402-on-base',
          },
          { label: 'AgentCash', href: 'https://note.com/x402inc/n/nd3c05cc59104' },
          { label: 'Nevermined', href: 'https://note.com/x402inc/n/nd3c05cc59104' },
          { label: 'Agentic.market', href: 'https://note.com/x402inc/n/n5f1f1c6ae0cf' },
          { label: 'Cloudflare Wallets', href: 'https://blog.cloudflare.com/wallets/' },
        ],
      },
      {
        sub: 'Class 5',
        links: [
          {
            label: 'Virtuals Protocol ACP',
            href: 'https://whitepaper.virtuals.io/about-virtuals/agent-commerce-protocol-acp',
          },
          { label: 'OKX AI', href: 'https://www.okx.com/en-us/learn/okx-ai' },
          { label: 'AgenC', href: 'https://agenc.ag/' },
        ],
      },
    ],
  },
  {
    name: 'internal agents / approvals',
    cls: 'Class 1 · 2',
    desc: {
      ja: '決済が発生しない側。予算の上限管理と、起案と承認の分離で統制する。',
      en: 'The side where no payment occurs: budget caps, and separating proposal from approval.',
    },
    groups: [
      {
        links: [
          { label: 'qm', href: 'https://note.com/x402inc/n/naab6a0b3e1e2' },
          { label: 'Hermes Agent', href: 'https://note.com/x402inc/n/nb69d33331327' },
          { label: 'Cloudflare OS', href: 'https://note.com/x402inc/n/naab6a0b3e1e2' },
          { label: 'Stripe Approvals', href: 'https://docs.stripe.com/account/approvals' },
        ],
      },
    ],
  },
]

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
        className="max-w-2xl"
      >
        <SectionEyebrow label="Ecosystem" tag="segmentation" heading />
        <p className="mt-6 text-fg/60 text-base leading-[1.7]">{t.intro}</p>
      </motion.div>

      <div className="mt-10 grid sm:grid-cols-2 gap-5">
        {SEGMENTS.map((seg, i) => (
          <motion.div
            key={seg.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.08 }}
            className="liquid-glass rounded-2xl p-6"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <p className="font-mono text-sm text-gold">{seg.name}</p>
              <span
                className="text-[11px] font-mono px-2 py-0.5 rounded-full border"
                style={{ color: 'rgb(var(--gold))', borderColor: 'rgb(var(--gold) / 0.4)' }}
              >
                {seg.cls}
              </span>
            </div>
            <p className="mt-3 text-sm text-fg/70 leading-[1.7]">{seg.desc[lang]}</p>
            {seg.groups.map((g, gi) => (
              <div key={g.sub ?? gi} className="mt-4">
                {g.sub && (
                  <p className="mb-1.5 text-[11px] uppercase tracking-widest text-fg/40">{g.sub}</p>
                )}
                <div className="flex flex-wrap gap-x-2 gap-y-1.5">
                  {g.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-fg/10 px-2.5 py-1 text-xs text-fg/70 hover:text-gold hover:border-gold/40 transition-colors"
                    >
                      {l.label}
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      <a
        href="https://note.com/x402inc/n/n7114e5139b4c"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-1.5 text-xs text-fg/45 hover:text-gold transition-colors"
      >
        {t.taxNote}
        <ArrowUpRight className="w-3 h-3" />
      </a>

      <p className="mt-6 text-fg/50 text-sm leading-[1.7] max-w-3xl">{t.closing}</p>

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
