import { useEffect, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import {
  ArrowUpRight,
  ArrowRight,
  Bot,
  Check,
  Copy,
  Gauge,
  Gavel,
  Pause,
  Play,
  Search,
  Sparkles,
  Terminal,
} from 'lucide-react'
import { useLang, type Lang, type Localized } from '../i18n'

/* about.html — agent payments, laid out like agents.circle.com:
   hero with a phone (rotating agent chats) → one balance, many endpoints →
   your API is a storefront → discover services → everything you need.
   Prices and URLs are the real ones from the products page; nothing here is
   an estimate. */

const ENDPOINT = 'https://endpoint.x402jp.com/'
const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease },
}

const COPY = {
  ja: {
    eyebrow: 'Agent payments',
    title: ['エージェントが払えば、', '仕事は最後まで進む'],
    lead: 'Muse や Grok などのパーソナルエージェントは、Stripe Link で人の代わりに支払いを済ませはじめています。API には x402 で1コールずつ払う。x402 Inc. は、その支払い先を探せるカタログと、買い手・売り手・市場を自社で動かしています。',
    ctaPrimary: 'エンドポイントを探す',
    ctaSecondary: 'プロダクトを見る',
    noteLink: 'Grok Bot の Stripe Link 決済（note）',

    flowTitle: '1つの残高で、いくつものエンドポイントへ',
    flowLead: 'アカウント登録も月額契約もコネクタの設定も要りません。402 が返ってきたら、その場で1コール分を払って先へ進みます。',
    flowAgent: 'エージェント',
    flowBalance: '残高（USDC）',

    sellTitle: ['あなたの API が、', 'そのまま売り場になる'],
    sellLead: 'エージェントはチェックアウト画面なしで API の1コールに支払えます。登録フローを足さずに、エンドポイントを収入の1行に変えられます。',
    sellScore: 'API のスコアを見る',
    sellList: 'カタログに載る',
    sellCardLabel: 'USDC で受け取り',
    sellCardNote: 'エージェントからの支払い（1コールごと）',
    sellCardFoot: '価格は実際の設定。行は表示例です。',

    discoverTitle: 'サービスを探す・エージェントに売る',
    colOwn: '自社のデータと市場',
    colIntel: 'Intelligence API',
    from: 'から',
    perCall: '/ コール',
    free: '無料',
    copy: 'URL をコピー',
    copied: 'コピーしました',
    explore: 'x402 Endpoint で全件を見る',

    needTitle: 'エージェント決済に必要なもの',
  },
  en: {
    eyebrow: 'Agent payments',
    title: ['When agents can pay,', 'the work gets done'],
    lead: 'Personal agents such as Muse and Grok have started paying on people’s behalf with Stripe Link. APIs get paid one call at a time over x402. x402 Inc. runs the catalog to find who to pay, and runs the buyer, the sellers and the market itself.',
    ctaPrimary: 'Find endpoints',
    ctaSecondary: 'See the products',
    noteLink: 'Grok Bot paying with Stripe Link (note)',

    flowTitle: 'One balance, many endpoints',
    flowLead: 'No accounts, subscriptions or connectors to set up. When a 402 comes back, the agent pays for that one call on the spot and carries on.',
    flowAgent: 'Agent',
    flowBalance: 'Balance (USDC)',

    sellTitle: ['Your API is', 'a storefront'],
    sellLead: 'Agents can pay for an API call without a checkout page. Turn an endpoint into a line of revenue without adding a signup flow.',
    sellScore: 'Check your API’s score',
    sellList: 'Get listed',
    sellCardLabel: 'Settled in USDC',
    sellCardNote: 'Payments from agents (per call)',
    sellCardFoot: 'Prices are the real ones; the rows are an illustration.',

    discoverTitle: 'Discover services and sell to agents',
    colOwn: 'Our data and markets',
    colIntel: 'Intelligence APIs',
    from: 'From',
    perCall: 'per call',
    free: 'Free',
    copy: 'Copy URL',
    copied: 'Copied',
    explore: 'See everything on x402 Endpoint',

    needTitle: 'Everything you need for agent payments',
  },
} satisfies Record<Lang, Record<string, unknown>>

/* ── Hero phone: rotating agent chats ─────────────────────────────────────── */

type Slide = {
  agent: string
  budget: Localized
  ask: Localized
  found: Localized
  answer: Localized
  paid: Localized
  rail: string
}

const SLIDES: Slide[] = [
  {
    agent: 'Grok',
    budget: { ja: '単回利用カード・都度承認', en: 'Single-use card · approve each time' },
    ask: { ja: 'このイベントのチケットを2枚買っておいて', en: 'Buy two tickets for this event' },
    found: { ja: 'ブラウザで購入ページを開き、Stripe Link で支払います', en: 'Opening the checkout in the browser; paying with Stripe Link' },
    answer: { ja: '承認をいただいたので、購入を完了しました。', en: 'You approved it, so the purchase is done.' },
    paid: { ja: 'Stripe Link で支払い（単回利用カード）', en: 'Paid with Stripe Link (single-use card)' },
    rail: 'Link',
  },
  {
    agent: 'Muse',
    budget: { ja: 'Link に登録したカード', en: 'Card saved in Link' },
    ask: { ja: 'いつもの店で来週分の買い物を頼める？', en: 'Can you order next week’s groceries from the usual shop?' },
    found: { ja: 'カートを作り、Stripe Link のチェックアウトに進みます', en: 'Building the cart and going to the Stripe Link checkout' },
    answer: { ja: '注文しました。届く日時はメールで届きます。', en: 'Ordered. The delivery time will arrive by email.' },
    paid: { ja: 'Stripe Link で支払い', en: 'Paid with Stripe Link' },
    rail: 'Link',
  },
  {
    agent: 'Your agent',
    budget: { ja: 'USDC 残高から per-call', en: 'Per-call from a USDC balance' },
    ask: { ja: '今日、東京の食品で値段が動いたのは？', en: 'Which food prices in Tokyo moved today?' },
    found: { ja: 'x402 Endpoint で Japan Inflation Nowcall を見つけました', en: 'Found Japan Inflation Nowcall on x402 Endpoint' },
    answer: { ja: 'movers を1コール買い、その日に動いた品目を取得しました。', en: 'Bought one call to movers and got the items that moved today.' },
    paid: { ja: '$0.02 per call を残高から支払い（Solana・USDC）', en: 'Paid $0.02 per call from the balance (Solana · USDC)' },
    rail: 'x402',
  },
]

function Phone({ lang }: { lang: Lang }) {
  const [i, setI] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!playing || reduce) return
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 5200)
    return () => clearInterval(t)
  }, [playing])

  return (
    <div className="relative mx-auto w-full max-w-[360px]">
      <div className="relative rounded-[44px] border border-fg/20 bg-fg/[0.04] p-3 shadow-2xl">
        <div className="relative overflow-hidden rounded-[34px] bg-[#f4f5f8] text-[#0b1a33]" style={{ height: 560 }}>
          {/* status bar */}
          <div className="flex items-center justify-between px-6 pt-4 text-[12px] font-semibold">
            <span>9:41</span>
            <span className="h-6 w-24 rounded-full bg-[#0b1a33]" />
            <span className="tracking-widest">•••</span>
          </div>

          {SLIDES.map((s, k) => (
            <div
              key={s.agent}
              aria-hidden={k !== i}
              className={`absolute inset-x-0 top-12 bottom-0 px-4 transition-all duration-700 ${
                k === i ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-3'
              }`}
            >
              <div className="mt-3 flex flex-col items-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#b9a2f0] to-[#8b6fe0] text-white">
                  <Bot className="h-6 w-6" />
                </span>
                <div className="mt-2 rounded-2xl bg-white px-4 py-2 text-center shadow-sm">
                  <p className="text-sm font-semibold">{s.agent}</p>
                  <p className="text-[11px] text-[#5b6b85]">{s.budget[lang]}</p>
                </div>
              </div>
              <div className="mt-5 ml-8 rounded-2xl rounded-tr-md bg-[#0b2a5c] px-4 py-3 text-[14px] leading-[1.5] text-white">
                {s.ask[lang]}
              </div>
              <div className="mt-3 mr-8 rounded-2xl rounded-tl-md bg-white px-4 py-3 text-[13px] leading-[1.55] shadow-sm">
                {s.found[lang]}
              </div>
              <div className="mt-2 mr-8 rounded-2xl bg-white px-4 py-3 text-[13px] leading-[1.55] shadow-sm">
                {s.answer[lang]}
              </div>
              <p className="mt-3 flex items-center gap-1.5 px-1 text-[12px] text-[#5b6b85]">
                <Check className="h-3.5 w-3.5 text-[#1a9b5b]" />
                {s.paid[lang]}
                <span className="ml-auto rounded-md border border-[#c9d1e0] px-1.5 font-mono text-[10px]">{s.rail}</span>
              </p>
            </div>
          ))}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#f4f5f8] to-transparent" />
        </div>
      </div>

      {/* dots + pause */}
      <div className="mt-5 flex items-center justify-center gap-3">
        {SLIDES.map((s, k) => (
          <button
            key={s.agent}
            type="button"
            aria-label={s.agent}
            onClick={() => setI(k)}
            className={`h-2 rounded-full transition-all ${k === i ? 'w-6 bg-fg' : 'w-2 bg-fg/30 hover:bg-fg/50'}`}
          />
        ))}
        <button
          type="button"
          aria-label={playing ? 'Pause' : 'Play'}
          onClick={() => setPlaying((p) => !p)}
          className="ml-2 text-fg/50 hover:text-fg"
        >
          {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  )
}

/* ── Services ──────────────────────────────────────────────────────────────── */

type Service = {
  mark: string
  color: string
  name: string
  desc: Localized
  price: { free?: boolean; from?: string; label?: Localized }
  url: string
}

const OWN: Service[] = [
  {
    mark: 'J',
    color: '#2f7d6d',
    name: 'Japan Inflation Nowcall',
    desc: { ja: '東京の店頭価格から作る食品物価指数', en: 'A food price index built from Tokyo shelf prices' },
    price: { from: '$0.01' },
    url: 'https://jin.x402jp.com/api/jin/latest',
  },
  {
    mark: 'O',
    color: '#2563eb',
    name: 'Onchain Stock Data',
    desc: { ja: '米国株・日本株のカタリストと採点の記録', en: 'Catalysts and scoring records for US and Japanese stocks' },
    price: { from: '$0.01' },
    url: 'https://osd.x402jp.com/api/alpha/portfolio/current',
  },
  {
    mark: 'R',
    color: '#7c3aed',
    name: 'x402 RFQ Market',
    desc: { ja: '条件を出し、売り手に見積もりを競わせる市場（devnet）', en: 'Post conditions and let sellers compete on quotes (devnet)' },
    price: { label: { ja: '落札価格の1%', en: '1% of the winning price' } },
    url: 'https://rfq.x402jp.com/',
  },
  {
    mark: 'P',
    color: '#0f766e',
    name: 'x402 Seller Probe',
    desc: { ja: '売り手の 402・決済・納品を外から測ったスコア', en: 'Scores from measuring sellers’ 402, payment and delivery' },
    price: { free: true },
    url: 'https://probe.x402jp.com/',
  },
  {
    mark: 'E',
    color: '#b45309',
    name: 'x402 Endpoint',
    desc: { ja: '161,826 エンドポイントの日次カタログ（2026年10月19日時点）', en: 'A daily catalog of 161,826 endpoints (as of Oct 19, 2026)' },
    price: { free: true },
    url: ENDPOINT,
  },
]

const INTEL: Service[] = [
  {
    mark: 'M',
    color: '#1d4ed8',
    name: 'APAC Macro Dashboard',
    desc: { ja: 'APAC マクロ：金利・為替・フロー・リスク', en: 'APAC macro: rates, FX, flows and risk regime' },
    price: { from: '$0.30' },
    url: 'https://x402amd.vercel.app/api/macro/dashboard',
  },
  {
    mark: 'Y',
    color: '#0891b2',
    name: 'Yield Intelligence',
    desc: { ja: 'DeFi の利回りとスマートマネー残高', en: 'DeFi yields and smart-money balances' },
    price: { from: '$0.20' },
    url: 'https://x402yi.vercel.app/api/yield/scan',
  },
  {
    mark: 'R',
    color: '#be185d',
    name: 'Japan Real Estate Yield',
    desc: { ja: '日本の不動産利回り（エリア指定）', en: 'Japanese real estate yields by area' },
    price: { from: '$0.30' },
    url: 'https://x402-jrey.vercel.app/api/realestate/yield?area=tokyo',
  },
  {
    mark: 'D',
    color: '#9333ea',
    name: 'Divergence Analyzer',
    desc: { ja: '予測市場とオンチェーンフローの乖離', en: 'Divergence between prediction markets and on-chain flows' },
    price: { from: '$0.15' },
    url: 'https://x402nansenpolymarket.vercel.app/api/divergence/scan',
  },
  {
    mark: 'S',
    color: '#ca8a04',
    name: 'Smart Money Screener',
    desc: { ja: 'スマートマネーが買っているトークン', en: 'Tokens that smart money is buying' },
    price: { from: '$0.05' },
    url: 'https://smartmoneyscreener.vercel.app/api/screener/smart-money',
  },
]

function Mark({ s, size = 'h-11 w-11 text-lg' }: { s: Pick<Service, 'mark' | 'color'>; size?: string }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-xl font-bold text-white ${size}`}
      style={{ background: s.color }}
      aria-hidden="true"
    >
      {s.mark}
    </span>
  )
}

function ServiceRow({ s, lang }: { s: Service; lang: Lang }) {
  const t = COPY[lang]
  const [copied, setCopied] = useState(false)
  const price = s.price.free
    ? t.free
    : s.price.label
      ? s.price.label[lang]
      : lang === 'ja'
        ? `${s.price.from} ${t.from}`
        : `${t.from} ${s.price.from}`
  return (
    <li className="flex items-center gap-4 py-3">
      <Mark s={s} />
      <a href={s.url} target="_blank" rel="noopener noreferrer" className="group min-w-0 flex-1">
        <p className="text-base text-fg group-hover:text-gold transition-colors">{s.name}</p>
        <p className="truncate text-sm text-fg/50">{s.desc[lang]}</p>
      </a>
      <div className="hidden text-right sm:block">
        <p className="text-sm text-fg">{price}</p>
        {s.price.from && <p className="text-xs text-fg/45">{t.perCall}</p>}
      </div>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard?.writeText(s.url).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 1400)
          })
        }}
        aria-label={copied ? t.copied : t.copy}
        title={copied ? t.copied : t.copy}
        className="rounded-lg p-2 text-fg/45 hover:bg-fg/5 hover:text-fg transition-colors"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </li>
  )
}

/* ── Everything you need ──────────────────────────────────────────────────── */

const NEEDS: { icon: ReactNode; name: string; desc: Localized; href: string; internal?: boolean }[] = [
  {
    icon: <Search className="h-7 w-7" />,
    name: 'x402 Endpoint',
    desc: { ja: 'エージェントが支払える API を、毎日集めたカタログ。', en: 'A catalog, collected daily, of the APIs agents can pay for.' },
    href: ENDPOINT,
  },
  {
    icon: <Bot className="h-7 w-7" />,
    name: 'x402 Autonomous Agent',
    desc: { ja: '毎朝 06:00 JST に per-call で買う、当社の買い手。', en: 'Our own buyer, paying per-call every morning at 06:00 JST.' },
    href: 'https://aa.x402jp.com/',
  },
  {
    icon: <Gavel className="h-7 w-7" />,
    name: 'x402 RFQ Market',
    desc: { ja: '買い手が条件を出し、売り手が見積もりで競う市場。', en: 'Buyers post conditions; sellers compete on quotes.' },
    href: 'https://rfq.x402jp.com/',
  },
  {
    icon: <Gauge className="h-7 w-7" />,
    name: 'x402 Seller Probe',
    desc: { ja: '払う前に、売り手が本当に動くかを測る。', en: 'Measure whether a seller actually works before you pay.' },
    href: 'https://probe.x402jp.com/',
  },
  {
    icon: <Terminal className="h-7 w-7" />,
    name: 'How to pay',
    desc: { ja: '402 → 署名 → 同じ URL へ再リクエスト。支払いの手順。', en: '402 → sign → re-request the same URL. The payment steps.' },
    href: '/products.html',
    internal: true,
  },
]

/* ── Page ─────────────────────────────────────────────────────────────────── */

export function About() {
  const { lang } = useLang()
  const t = COPY[lang]
  const flowTargets = [...OWN.slice(0, 4), INTEL[0], INTEL[2]]

  return (
    <>
      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-14 md:pt-24 pb-16 grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <motion.div {...fadeUp}>
          <p className="text-xs uppercase tracking-widest text-gold">{t.eyebrow}</p>
          <h1 className="mt-5 text-[1.7rem] sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.15] text-fg">
            {t.title[0]}
            <br />
            {t.title[1]}
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg text-fg/60 leading-[1.75]">{t.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={ENDPOINT}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-semibold text-bg hover:opacity-90 transition"
            >
              <Sparkles className="h-4 w-4" />
              {t.ctaPrimary}
            </a>
            <a
              href="/#products"
              className="inline-flex items-center gap-2 rounded-full border border-fg/20 px-6 py-3 text-sm text-fg hover:bg-fg/5 transition"
            >
              {t.ctaSecondary}
            </a>
          </div>
          <a
            href="https://note.com/x402inc/n/nc3cc50a8d048"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1 text-xs text-fg/45 hover:text-gold transition-colors"
          >
            {t.noteLink}
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </motion.div>
        <Phone lang={lang} />
      </section>

      {/* One balance, many endpoints */}
      <section className="relative z-10 border-y border-fg/10 bg-fg/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 text-center">
          <motion.h2 {...fadeUp} className="text-3xl md:text-5xl font-light tracking-tight text-fg">
            {t.flowTitle}
          </motion.h2>
          <motion.p {...fadeUp} className="mx-auto mt-5 max-w-2xl text-fg/60 leading-[1.75]">
            {t.flowLead}
          </motion.p>

          <div className="mt-14 flex flex-col items-center gap-6 lg:flex-row lg:justify-center lg:gap-0">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-fg/15 bg-fg/[0.04]">
              <Sparkles className="h-7 w-7 text-fg/70" />
              <span className="sr-only">{t.flowAgent}</span>
            </div>
            <span className="hidden h-px w-24 bg-gold/50 lg:block" />
            <div className="relative flex items-center gap-3 rounded-full border border-fg/15 bg-fg/[0.04] px-5 py-3">
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 font-mono text-sm text-gold balance-tick">−$0.01</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#3b82f6] text-[13px] font-bold text-[#3b82f6]">$</span>
              <span className="text-sm text-fg/70">{t.flowBalance}</span>
              <span className="font-mono text-sm text-fg">USDC</span>
            </div>
            <span className="hidden h-px w-24 bg-gold/50 lg:block" />
            <div className="grid grid-cols-3 gap-3 lg:gap-4">
              {flowTargets.map((s, k) => (
                <motion.a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease, delay: 0.1 + k * 0.06 }}
                  className={k % 2 ? 'lg:translate-y-6' : ''}
                >
                  <Mark s={s} size="h-14 w-14 text-xl" />
                  <span className="sr-only">{s.name}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Your API is a storefront */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28 grid gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div {...fadeUp}>
          <h2 className="text-[1.7rem] sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.15] text-fg">
            {t.sellTitle[0]}
            <br />
            {t.sellTitle[1]}
          </h2>
          <p className="mt-6 max-w-lg text-fg/60 leading-[1.75]">{t.sellLead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://probe.x402jp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-fg px-6 py-3 text-sm font-semibold text-bg hover:opacity-90 transition"
            >
              {t.sellScore}
            </a>
            <a
              href={ENDPOINT}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-fg/20 px-6 py-3 text-sm text-fg hover:bg-fg/5 transition"
            >
              {t.sellList}
            </a>
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="liquid-glass rounded-3xl p-5 md:p-8">
          <div className="rounded-2xl border border-fg/10 bg-fg/[0.03] p-5">
            <div className="flex items-start justify-between">
              <p className="font-mono text-sm text-fg/80">jin.x402jp.com</p>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#3b82f6] text-sm font-bold text-[#3b82f6]">$</span>
            </div>
            <p className="mt-4 font-mono text-[11px] tracking-widest text-fg/45">{t.sellCardLabel}</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-fg/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]" />
              {t.sellCardNote}
            </p>
          </div>
          <ul className="mt-4 space-y-2.5">
            {[
              ['/api/jin/series', '+$0.01'],
              ['/api/jin/movers', '+$0.02'],
              ['/api/alpha/portfolio/current', '+$0.01'],
              ['/api/alpha/jp/catalysts', '+$0.01'],
              ['/api/jin/movers', '+$0.02'],
            ].map(([path, amt], k) => (
              <motion.li
                key={k}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: 0.15 + k * 0.12 }}
                className="flex items-center gap-3 rounded-xl border border-fg/10 px-4 py-3"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-fg/10">
                  <Bot className="h-3.5 w-3.5 text-fg/70" />
                </span>
                <span className="min-w-0 flex-1 truncate text-sm text-fg/85">paid · {path}</span>
                <span className="font-mono text-sm text-[#60a5fa]">{amt}</span>
              </motion.li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] text-fg/35">{t.sellCardFoot}</p>
        </motion.div>
      </section>

      {/* Discover services */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
        <motion.h2 {...fadeUp} className="text-3xl md:text-5xl font-light tracking-tight text-fg">
          {t.discoverTitle}
        </motion.h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          {[
            [t.colOwn, OWN],
            [t.colIntel, INTEL],
          ].map(([title, list]) => (
            <div key={title as string}>
              <p className="text-xl text-fg">{title as string}</p>
              <ul className="mt-3 divide-y divide-fg/10">
                {(list as Service[]).map((s) => (
                  <ServiceRow key={s.name} s={s} lang={lang} />
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <a
            href={ENDPOINT}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-fg/15 bg-fg/[0.04] px-6 py-3 text-sm text-fg hover:bg-fg/[0.08] transition"
          >
            {t.explore}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Everything you need */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
        <motion.h2 {...fadeUp} className="text-3xl md:text-5xl font-light tracking-tight text-fg">
          {t.needTitle}
        </motion.h2>
        <ul className="mt-10 border-t border-fg/10">
          {NEEDS.map((n) => (
            <li key={n.name} className="border-b border-fg/10">
              <a
                href={n.href}
                {...(n.internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-7 md:grid-cols-[auto_1fr_1.2fr_auto] md:gap-8"
              >
                <span className="text-gold">{n.icon}</span>
                <span className="text-2xl md:text-4xl font-light tracking-tight text-fg group-hover:text-gold transition-colors">
                  {n.name}
                </span>
                <span className="col-span-3 row-start-2 text-sm text-fg/55 leading-[1.7] md:col-span-1 md:row-start-auto">
                  {n.desc[lang]}
                </span>
                <ArrowUpRight className="h-5 w-5 text-fg/50 group-hover:text-gold transition-colors md:col-start-4" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
