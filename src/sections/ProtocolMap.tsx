import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import type { Lang, Localized } from '../i18n'

/* Agent-commerce standards placed along a purchase: find → authorize → pay.
   Content is what the earlier about page said about each standard (who runs
   it, what it does, what it changes); nothing new is claimed here. */

type Proto = { name: string; gov: Localized; func: Localized; value: Localized }

const UCP: Proto = {
  name: 'UCP',
  gov: { ja: 'Tech Council（10社）', en: 'Tech Council (10 firms)' },
  func: { ja: '商品の発見・プロファイル・カート', en: 'Product discovery, profiles, cart' },
  value: { ja: '出店を許可制でなくす。Shopify 等が対応', en: 'Removes permission gates on listing. Supported by Shopify and others' },
}
const AP2: Proto = {
  name: 'AP2',
  gov: { ja: 'FIDO Alliance', en: 'FIDO Alliance' },
  func: { ja: '誰が支払いを許可したかの証明', en: 'Proving who authorized the payment' },
  value: { ja: 'Intent・Cart・Payment の3つの委任を W3C の形式で残す', en: 'Keeps the Intent, Cart and Payment mandates in W3C format' },
}
const ACP: Proto = {
  name: 'ACP（OpenAI）',
  gov: { ja: 'OpenAI / Stripe', en: 'OpenAI / Stripe' },
  func: { ja: 'チャット内での支払いの実行', en: 'Executing payment inside a chat' },
  value: { ja: '人の名義で買う取引。既存のカード網を使う', en: 'Purchases under a person’s name. Uses existing card networks' },
}
const X402: Proto = {
  name: 'x402',
  gov: { ja: 'Linux Foundation', en: 'Linux Foundation' },
  func: { ja: 'HTTP 402 でリクエスト単位に支払う', en: 'Pay per request over HTTP 402' },
  value: { ja: 'ステーブルコインで送金が確定すれば取り消せない', en: 'Once a stablecoin transfer settles, it cannot be reversed' },
}
const ADYEN: Proto = {
  name: 'Adyen Agentic',
  gov: { ja: 'Adyen（単一企業）', en: 'Adyen (single company)' },
  func: { ja: 'Feed / Cart / Pay の API', en: 'Feed / Cart / Pay APIs' },
  value: { ja: '既存のトークン化と不正対策をそのまま AI に適用', en: 'Applies existing tokenization and fraud controls directly to AI' },
}

const COPY = {
  ja: {
    eyebrow: '標準の地図',
    title: 'UCP・AP2・ACP・x402 は、買い物のどこを受け持つか',
    lead: 'エージェントと EC や API をつなぐ部分は、各社が独自に作る段階を過ぎ、規格を選んで使う段階になった。買い物を「見つける → 許可する → 払う」に分けると、それぞれの規格の受け持ちが見える。',
    steps: ['見つける・カート', '許可する', '払う'],
    rails: ['人の名義・カード網', 'リクエスト単位・ステーブルコイン'],
    span: '3つの段階をまとめて1社で提供',
    acpTitle: '略称「ACP」は2つある',
    acp: [
      ['Agentic Commerce Protocol（OpenAI × Stripe）', '人の名義で買う。承認は人に残り、既存のカード網で決済する。'],
      ['Agent Commerce Protocol（Virtuals Protocol）', 'エージェント同士の受発注。エスクローと評価の段階を内蔵し、ステーブルコインで決済する。'],
    ],
  },
  en: {
    eyebrow: 'Standards map',
    title: 'Which part of a purchase UCP, AP2, ACP and x402 each handle',
    lead: 'Connecting agents to stores and APIs has moved past every company building its own, to choosing a standard. Split a purchase into “find → authorize → pay” and each standard’s part becomes clear.',
    steps: ['Find · cart', 'Authorize', 'Pay'],
    rails: ['Person’s name · card networks', 'Per request · stablecoins'],
    span: 'All three steps from a single company',
    acpTitle: 'There are two “ACP”s',
    acp: [
      ['Agentic Commerce Protocol (OpenAI × Stripe)', 'Buys under a person’s name. The person keeps approval; settles on existing card networks.'],
      ['Agent Commerce Protocol (Virtuals Protocol)', 'Orders between agents. Built-in escrow and evaluation; settles in stablecoins.'],
    ],
  },
}

function Node({ p, lang, small }: { p: Proto; lang: Lang; small?: string }) {
  return (
    <div className="rounded-2xl border border-fg/15 bg-bg/60 p-4 backdrop-blur-sm">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-lg font-semibold tracking-tight text-fg">{p.name}</p>
        <p className="text-[11px] text-fg/45">{p.gov[lang]}</p>
      </div>
      {small && <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-fg/40">{small}</p>}
      <p className="mt-2 text-sm text-fg/80">{p.func[lang]}</p>
      <p className="mt-1 text-xs leading-[1.7] text-fg/50">{p.value[lang]}</p>
    </div>
  )
}

function StepHead({ n, label }: { n: number; label: string }) {
  return (
    <p className="flex items-center gap-2 text-xs tracking-widest text-fg/55">
      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-fg/30 font-mono text-[10px] text-fg">{n}</span>
      {label}
    </p>
  )
}

function Arrow() {
  return (
    <div aria-hidden="true" className="hidden items-center justify-center lg:flex">
      <ArrowRight className="h-5 w-5 text-fg/35" />
    </div>
  )
}

export function ProtocolMap({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <p className="text-xs uppercase tracking-widest text-gold">{t.eyebrow}</p>
        <h2 className="mt-3 text-2xl md:text-4xl font-semibold tracking-tight text-fg">{t.title}</h2>
        <p className="mt-4 max-w-3xl text-sm md:text-base text-fg/60 leading-[1.8]">{t.lead}</p>
      </motion.div>

      <div className="mt-10 rounded-3xl border border-fg/10 bg-fg/[0.02] p-5 md:p-8">
        {/* find → authorize → pay */}
        <div className="grid gap-5 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
          <div className="flex flex-col gap-3">
            <StepHead n={1} label={t.steps[0]} />
            <Node p={UCP} lang={lang} />
          </div>
          <Arrow />
          <div className="flex flex-col gap-3">
            <StepHead n={2} label={t.steps[1]} />
            <Node p={AP2} lang={lang} />
          </div>
          <Arrow />
          <div className="flex flex-col gap-3">
            <StepHead n={3} label={t.steps[2]} />
            <Node p={ACP} lang={lang} small={t.rails[0]} />
            <Node p={X402} lang={lang} small={t.rails[1]} />
          </div>
        </div>

        {/* Adyen spans all three steps */}
        <div className="mt-6">
          <div aria-hidden="true" className="relative mb-3 hidden h-3 lg:block">
            <span className="absolute inset-x-[8%] top-1.5 h-px bg-fg/25" />
            <span className="absolute left-[8%] top-0 h-3 w-px bg-fg/25" />
            <span className="absolute left-1/2 top-0 h-3 w-px bg-fg/25" />
            <span className="absolute right-[8%] top-0 h-3 w-px bg-fg/25" />
          </div>
          <p className="mb-2 text-[11px] tracking-widest text-fg/45">{t.span}</p>
          <Node p={ADYEN} lang={lang} />
        </div>
      </div>

      {/* two ACPs */}
      <div className="mt-6 rounded-2xl border border-dashed border-fg/20 p-5">
        <p className="text-sm font-semibold text-fg">{t.acpTitle}</p>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {t.acp.map(([name, body]) => (
            <div key={name}>
              <p className="text-sm text-fg/85">{name}</p>
              <p className="mt-1 text-xs leading-[1.7] text-fg/50">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
