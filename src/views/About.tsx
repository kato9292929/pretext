import { Fragment, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, ArrowUpRight, Check, Copy, CreditCard, Gauge, Gavel, Search, Wallet, Zap } from 'lucide-react'
import { useLang, type Lang, type Localized } from '../i18n'
import { AgentShowcase } from '../sections/AgentShowcase'

/* about.html — agent payments.
   1. Hero: phone with side callouts on top, headline and CTAs below
   2. Two ways agents pay: card × Stripe Link, and x402 per-call
   3. Five stages before an agent buys, mapped to our products
   4. Service catalog (filterable cards, real prices and URLs)
   5. For sellers: score / listing links and a ticker of paid calls
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

    logLabel: '実際のやりとり',
    waysEyebrow: '2つの払い方',
    waysTitle: 'カードで払うか、1コールずつ払うか',
    cardTitle: 'カード × Stripe Link',
    cardWho: 'Muse・Grok などのパーソナルエージェント',
    cardSteps: ['人が、買ってほしいものと条件を伝える', 'エージェントが店を探し、カートを作る', 'Stripe Link で支払う。単回利用カードや都度承認で人が統制する'],
    cardLink: 'Grok Bot の Stripe Link 決済（note）',
    x402Title: 'x402 × per-call',
    x402Who: 'API を叩くエージェント',
    x402Steps: ['API に GET すると、402 Payment Required が返る', '402 が示す金額・チェーンで、USDC の支払いに署名する', '署名を付けて同じ URL へ再リクエストし、200 OK とデータを受け取る'],
    x402Link: '支払いの手順（How to pay）',
    waysBoth: 'どちらも、エージェントが人の代わりに払う',

    stagesEyebrow: '買うまでの5つの段階',
    stagesTitle: '探して、測って、競わせて、払って、使う',
    stages: [
      ['探す', 'x402 Endpoint', '支払える API を毎日集めたカタログから、売り手を見つける。'],
      ['測る', 'x402 Seller Probe', '払う前に、402・決済・納品が本当に動くかをスコアで確かめる。'],
      ['競わせる', 'x402 RFQ Market', '条件を出し、売り手に見積もりを競わせる（devnet）。'],
      ['払う', 'x402 Autonomous Agent', '当社の買い手が、毎朝 06:00 JST に per-call で実際に払っている。'],
      ['使う', 'OSD・JIN・Intelligence', '買ったデータで判断する。自社のデータも同じ方法で売っている。'],
    ],

    catalogEyebrow: 'サービス',
    catalogTitle: 'いま払って使える API',
    filterAll: 'すべて',
    filterOwn: '自社のデータと市場',
    filterIntel: 'Intelligence API',
    from: 'から',
    perCall: '/ コール',
    free: '無料',
    open: '開く',
    copy: 'URL をコピー',
    copied: 'コピーしました',
    explore: 'x402 Endpoint で全件を見る',

    sellEyebrow: '売る側へ',
    sellTitle: 'あなたの API も、そのまま売り場になる',
    sellLead: 'エージェントはチェックアウト画面なしで API の1コールに支払えます。登録フローを足さずに、エンドポイントを収入の1行に変えられます。',
    sellScore: 'API のスコアを見る',
    sellList: 'カタログに載る',
    tickerNote: '当社のエンドポイントの価格（per-call）',
  },
  en: {
    eyebrow: 'Agent payments',
    title: ['When agents can pay,', 'the work gets done'],
    lead: 'Personal agents such as Muse and Grok have started paying on people’s behalf with Stripe Link. APIs get paid one call at a time over x402. x402 Inc. runs the catalog to find who to pay, and runs the buyer, the sellers and the market itself.',
    ctaPrimary: 'Find endpoints',
    ctaSecondary: 'See the products',

    logLabel: 'What actually goes over the wire',
    waysEyebrow: 'Two ways to pay',
    waysTitle: 'Pay by card, or one call at a time',
    cardTitle: 'Card × Stripe Link',
    cardWho: 'Personal agents such as Muse and Grok',
    cardSteps: ['A person says what to buy and the conditions', 'The agent finds the shop and builds the cart', 'It pays with Stripe Link; single-use cards and per-purchase approval keep the person in control'],
    cardLink: 'Grok Bot paying with Stripe Link (note)',
    x402Title: 'x402 × per-call',
    x402Who: 'Agents calling APIs',
    x402Steps: ['A GET to the API returns 402 Payment Required', 'Sign a USDC payment for the amount and chain the 402 names', 'Re-request the same URL with the signature and receive 200 OK with the data'],
    x402Link: 'The payment steps (How to pay)',
    waysBoth: 'Either way, the agent pays on a person’s behalf',

    stagesEyebrow: 'Five stages before buying',
    stagesTitle: 'Find, measure, compete, pay, use',
    stages: [
      ['Find', 'x402 Endpoint', 'Find sellers in a catalog of payable APIs collected every day.'],
      ['Measure', 'x402 Seller Probe', 'Before paying, check with a score that the 402, payment and delivery actually work.'],
      ['Compete', 'x402 RFQ Market', 'Post conditions and have sellers compete on quotes (devnet).'],
      ['Pay', 'x402 Autonomous Agent', 'Our own buyer really pays per-call every morning at 06:00 JST.'],
      ['Use', 'OSD · JIN · Intelligence', 'Decide with the data you bought. We sell our own data the same way.'],
    ],

    catalogEyebrow: 'Services',
    catalogTitle: 'APIs you can pay for and use now',
    filterAll: 'All',
    filterOwn: 'Our data and markets',
    filterIntel: 'Intelligence APIs',
    from: 'From',
    perCall: 'per call',
    free: 'Free',
    open: 'Open',
    copy: 'Copy URL',
    copied: 'Copied',
    explore: 'See everything on x402 Endpoint',

    sellEyebrow: 'For sellers',
    sellTitle: 'Your API can be a storefront too',
    sellLead: 'Agents can pay for an API call without a checkout page. Turn an endpoint into a line of revenue without adding a signup flow.',
    sellScore: 'Check your API’s score',
    sellList: 'Get listed',
    tickerNote: 'Prices of our endpoints (per call)',
  },
}

/* ── Hero: request log ────────────────────────────────────────────────────── */

type Line = { dir: '→' | '←' | '✓' | '·'; text: Localized; tone?: 'warn' | 'ok' | 'dim' }
type Run = { rail: 'Stripe Link' | 'x402'; agent: string; lines: Line[] }

const RUNS: Run[] = [
  {
    rail: 'x402',
    agent: 'your agent',
    lines: [
      { dir: '→', text: { ja: 'GET jin.x402jp.com/api/jin/movers', en: 'GET jin.x402jp.com/api/jin/movers' } },
      { dir: '←', text: { ja: '402 Payment Required  $0.02 · USDC · solana', en: '402 Payment Required  $0.02 · USDC · solana' }, tone: 'warn' },
      { dir: '·', text: { ja: '残高から署名（per-call）', en: 'sign from the balance (per call)' }, tone: 'dim' },
      { dir: '→', text: { ja: 'GET …/api/jin/movers  + X-PAYMENT', en: 'GET …/api/jin/movers  + X-PAYMENT' } },
      { dir: '←', text: { ja: '200 OK  その日に動いた品目', en: '200 OK  items that moved today' }, tone: 'ok' },
    ],
  },
  {
    rail: 'Stripe Link',
    agent: 'Grok',
    lines: [
      { dir: '·', text: { ja: '依頼：イベントのチケットを2枚', en: 'task: two tickets for the event' }, tone: 'dim' },
      { dir: '→', text: { ja: 'ブラウザで購入ページを開く', en: 'open the checkout in the browser' } },
      { dir: '←', text: { ja: 'Stripe Link：承認を待っています', en: 'Stripe Link: waiting for approval' }, tone: 'warn' },
      { dir: '·', text: { ja: '人が承認 → 単回利用カードを発行', en: 'person approves → single-use card issued' }, tone: 'dim' },
      { dir: '✓', text: { ja: '支払い完了', en: 'payment complete' }, tone: 'ok' },
    ],
  },
  {
    rail: 'x402',
    agent: 'your agent',
    lines: [
      { dir: '→', text: { ja: 'GET osd.x402jp.com/api/alpha/jp/catalysts', en: 'GET osd.x402jp.com/api/alpha/jp/catalysts' } },
      { dir: '←', text: { ja: '402 Payment Required  $0.01 · USDC · base | solana', en: '402 Payment Required  $0.01 · USDC · base | solana' }, tone: 'warn' },
      { dir: '·', text: { ja: '402 が示すチェーンから選んで署名', en: 'pick a chain the 402 offers and sign' }, tone: 'dim' },
      { dir: '→', text: { ja: 'GET …/jp/catalysts  + X-PAYMENT', en: 'GET …/jp/catalysts  + X-PAYMENT' } },
      { dir: '←', text: { ja: '200 OK  日本株の dated catalysts', en: '200 OK  dated catalysts for Japanese stocks' }, tone: 'ok' },
    ],
  },
  {
    rail: 'Stripe Link',
    agent: 'Muse',
    lines: [
      { dir: '·', text: { ja: '依頼：来週分の買い物', en: 'task: next week’s groceries' }, tone: 'dim' },
      { dir: '→', text: { ja: 'カートを作り、チェックアウトへ', en: 'build the cart, go to checkout' } },
      { dir: '←', text: { ja: 'Stripe Link：登録したカードで支払い', en: 'Stripe Link: pay with the saved card' }, tone: 'warn' },
      { dir: '✓', text: { ja: '注文完了', en: 'order placed' }, tone: 'ok' },
    ],
  },
]

const TONE = { warn: 'text-gold', ok: 'text-[#4ade80]', dim: 'text-fg/45' } as const

function RequestLog({ lang }: { lang: Lang }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((n) => (n + 1) % RUNS.length), 6500)
    return () => clearInterval(t)
  }, [])
  const run = RUNS[i]
  return (
    <div className="liquid-glass rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2 border-b border-fg/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
        <div className="ml-auto flex rounded-full border border-fg/15 p-0.5 text-[11px]">
          {(['Stripe Link', 'x402'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                // next run on that rail, after the current one
                for (let d = 1; d <= RUNS.length; d++) {
                  const k = (i + d) % RUNS.length
                  if (RUNS[k].rail === r) return setI(k)
                }
              }}
              className={`rounded-full px-2.5 py-1 transition-colors ${run.rail === r ? 'bg-fg text-bg' : 'text-fg/55 hover:text-fg'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="px-5 py-5 font-mono text-[12.5px] leading-[1.9] min-h-[236px]">
        <p className="text-fg/40">
          agent: <span className="text-fg/80">{run.agent}</span>
        </p>
        {run.lines.map((l, k) => (
          <p key={`${i}-${k}`} className={`log-line ${l.tone ? TONE[l.tone] : 'text-fg/85'}`} style={{ animationDelay: `${k * 0.7}s` }}>
            <span className="mr-2 inline-block w-3 text-fg/40">{l.dir}</span>
            {l.text[lang]}
          </p>
        ))}
      </div>
      <div className="flex gap-1.5 border-t border-fg/10 px-4 py-3">
        {RUNS.map((r, k) => (
          <button
            key={k}
            type="button"
            aria-label={`${r.rail} · ${r.agent}`}
            onClick={() => setI(k)}
            className={`h-1 flex-1 rounded-full transition-colors ${k === i ? 'bg-gold' : 'bg-fg/15 hover:bg-fg/30'}`}
          />
        ))}
      </div>
    </div>
  )
}

/* ── Services ─────────────────────────────────────────────────────────────── */

type Service = {
  group: 'own' | 'intel'
  mark: string
  color: string
  name: string
  desc: Localized
  price: { free?: boolean; from?: string; label?: Localized }
  url: string
}

const SERVICES: Service[] = [
  { group: 'own', mark: 'J', color: '#2f7d6d', name: 'Japan Inflation Nowcall', desc: { ja: '東京の店頭価格から作る食品物価指数', en: 'A food price index built from Tokyo shelf prices' }, price: { from: '$0.01' }, url: 'https://jin.x402jp.com/api/jin/latest' },
  { group: 'own', mark: 'O', color: '#2563eb', name: 'Onchain Stock Data', desc: { ja: '米国株・日本株のカタリストと採点の記録', en: 'Catalysts and scoring records for US and Japanese stocks' }, price: { from: '$0.01' }, url: 'https://osd.x402jp.com/api/alpha/portfolio/current' },
  { group: 'own', mark: 'R', color: '#7c3aed', name: 'x402 RFQ Market', desc: { ja: '条件を出し、売り手に見積もりを競わせる市場（devnet）', en: 'Post conditions and let sellers compete on quotes (devnet)' }, price: { label: { ja: '落札価格の1%', en: '1% of the winning price' } }, url: 'https://rfq.x402jp.com/' },
  { group: 'own', mark: 'P', color: '#0f766e', name: 'x402 Seller Probe', desc: { ja: '売り手の 402・決済・納品を外から測ったスコア', en: 'Scores from measuring sellers’ 402, payment and delivery' }, price: { free: true }, url: 'https://probe.x402jp.com/' },
  { group: 'own', mark: 'E', color: '#b45309', name: 'x402 Endpoint', desc: { ja: '161,826 エンドポイントの日次カタログ（2026年10月19日時点）', en: 'A daily catalog of 161,826 endpoints (as of Oct 19, 2026)' }, price: { free: true }, url: ENDPOINT },
  { group: 'intel', mark: 'M', color: '#1d4ed8', name: 'APAC Macro Dashboard', desc: { ja: 'APAC マクロ：金利・為替・フロー・リスク', en: 'APAC macro: rates, FX, flows and risk regime' }, price: { from: '$0.30' }, url: 'https://x402amd.vercel.app/api/macro/dashboard' },
  { group: 'intel', mark: 'Y', color: '#0891b2', name: 'Yield Intelligence', desc: { ja: 'DeFi の利回りとスマートマネー残高', en: 'DeFi yields and smart-money balances' }, price: { from: '$0.20' }, url: 'https://x402yi.vercel.app/api/yield/scan' },
  { group: 'intel', mark: 'R', color: '#be185d', name: 'Japan Real Estate Yield', desc: { ja: '日本の不動産利回り（エリア指定）', en: 'Japanese real estate yields by area' }, price: { from: '$0.30' }, url: 'https://x402-jrey.vercel.app/api/realestate/yield?area=tokyo' },
  { group: 'intel', mark: 'D', color: '#9333ea', name: 'Divergence Analyzer', desc: { ja: '予測市場とオンチェーンフローの乖離', en: 'Divergence between prediction markets and on-chain flows' }, price: { from: '$0.15' }, url: 'https://x402nansenpolymarket.vercel.app/api/divergence/scan' },
  { group: 'intel', mark: 'S', color: '#ca8a04', name: 'Smart Money Screener', desc: { ja: 'スマートマネーが買っているトークン', en: 'Tokens that smart money is buying' }, price: { from: '$0.05' }, url: 'https://smartmoneyscreener.vercel.app/api/screener/smart-money' },
]

function priceText(s: Service, lang: Lang) {
  const t = COPY[lang]
  if (s.price.free) return t.free
  if (s.price.label) return s.price.label[lang]
  return lang === 'ja' ? `${s.price.from} ${t.from}` : `${t.from} ${s.price.from}`
}

function ServiceCard({ s, lang }: { s: Service; lang: Lang }) {
  const t = COPY[lang]
  const [copied, setCopied] = useState(false)
  return (
    <motion.div layout className="liquid-glass rounded-2xl p-5 flex flex-col">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-bold text-white" style={{ background: s.color }} aria-hidden="true">
          {s.mark}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-fg">{s.name}</p>
          <p className="mt-0.5 text-xs text-gold">
            {priceText(s, lang)}
            {s.price.from && <span className="ml-1 text-fg/40">{t.perCall}</span>}
          </p>
        </div>
      </div>
      <p className="mt-3 flex-1 text-sm text-fg/60 leading-[1.6]">{s.desc[lang]}</p>
      <div className="mt-4 flex items-center gap-2 border-t border-fg/10 pt-3">
        <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-fg/75 hover:text-gold transition-colors">
          {t.open}
          <ArrowUpRight className="h-3 w-3" />
        </a>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(s.url).then(() => {
              setCopied(true)
              setTimeout(() => setCopied(false), 1400)
            })
          }}
          className="ml-auto inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-fg/50 hover:bg-fg/5 hover:text-fg transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? t.copied : t.copy}
        </button>
      </div>
    </motion.div>
  )
}

/* ── Stage links (same order as COPY.stages) ──────────────────────────────── */

const STAGE_META = [
  { icon: Search, href: ENDPOINT },
  { icon: Gauge, href: 'https://probe.x402jp.com/' },
  { icon: Gavel, href: 'https://rfq.x402jp.com/' },
  { icon: Wallet, href: 'https://aa.x402jp.com/' },
  { icon: Zap, href: '/#products' },
]

/* ── Page ─────────────────────────────────────────────────────────────────── */

export function About() {
  const { lang } = useLang()
  const t = COPY[lang]
  const [filter, setFilter] = useState<'all' | 'own' | 'intel'>('all')
  const shown = SERVICES.filter((s) => filter === 'all' || s.group === filter)
  const ticker = [
    ['jin.x402jp.com', '/api/jin/series', '$0.01'],
    ['jin.x402jp.com', '/api/jin/movers', '$0.02'],
    ['osd.x402jp.com', '/api/alpha/portfolio/current', '$0.01'],
    ['osd.x402jp.com', '/api/alpha/jp/catalysts', '$0.01'],
    ['osd.x402jp.com', '/api/alpha/portfolio/scorecard', '$0.01'],
    ['osd.x402jp.com', '/api/alpha/catalyst/submit', '$0.01'],
  ]

  return (
    <>
      {/* 1. Hero — the phone in the middle with features on both sides and a big message behind; headline and CTAs below */}
      <section className="relative z-10 overflow-hidden pt-10 md:pt-16 pb-16">
        <AgentShowcase />
        <motion.div {...fadeUp} className="relative z-10 mt-16 md:mt-20 max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-gold">{t.eyebrow}</p>
          <h1 className="mt-5 text-[1.7rem] sm:text-4xl md:text-6xl font-semibold tracking-tight leading-[1.15] text-fg">
            {t.title[0]}
            <br />
            {t.title[1]}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-fg/60 leading-[1.75]">{t.lead}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={ENDPOINT} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black hover:brightness-110 transition">
              {t.ctaPrimary}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="/#products" className="inline-flex items-center gap-2 rounded-full border border-fg/20 px-6 py-3 text-sm text-fg hover:bg-fg/5 transition">
              {t.ctaSecondary}
            </a>
          </div>
        </motion.div>

      </section>

      {/* 2. Two ways to pay */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
        <motion.div {...fadeUp}>
          <p className="text-xs uppercase tracking-widest text-gold">{t.waysEyebrow}</p>
          <h2 className="mt-3 text-2xl md:text-4xl font-semibold tracking-tight text-fg">{t.waysTitle}</h2>
        </motion.div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {[
            { icon: CreditCard, title: t.cardTitle, who: t.cardWho, steps: t.cardSteps, link: { label: t.cardLink, href: 'https://note.com/x402inc/n/nc3cc50a8d048', ext: true } },
            { icon: Zap, title: t.x402Title, who: t.x402Who, steps: t.x402Steps, link: { label: t.x402Link, href: '/products.html', ext: false } },
          ].map((w, k) => (
            <motion.div key={w.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: k * 0.1 }} className="liquid-glass rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/40 text-gold">
                  <w.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-lg font-semibold text-fg">{w.title}</p>
                  <p className="text-xs text-fg/50">{w.who}</p>
                </div>
              </div>
              <ol className="mt-6 space-y-4">
                {w.steps.map((s, i) => (
                  <li key={s} className="flex gap-3 text-sm text-fg/75 leading-[1.7]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fg/[0.06] font-mono text-xs text-gold">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
              <a
                href={w.link.href}
                {...(w.link.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="mt-6 inline-flex items-center gap-1 text-xs text-fg/55 hover:text-gold transition-colors"
              >
                {w.link.label}
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-fg/55">{t.waysBoth}</p>
        <motion.div {...fadeUp} className="mx-auto mt-12 max-w-2xl">
          <p className="mb-3 text-center text-[11px] uppercase tracking-widest text-fg/45">{t.logLabel}</p>
          <RequestLog lang={lang} />
        </motion.div>
      </section>

      {/* 3. Five stages */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
        <motion.div {...fadeUp}>
          <p className="text-xs uppercase tracking-widest text-gold">{t.stagesEyebrow}</p>
          <h2 className="mt-3 text-2xl md:text-4xl font-semibold tracking-tight text-fg">{t.stagesTitle}</h2>
        </motion.div>
        <ol className="relative mt-12 grid gap-8 lg:grid-cols-5 lg:gap-4">
          <span className="absolute left-[19px] top-5 bottom-5 w-px bg-gold/30 lg:left-[10%] lg:right-[10%] lg:top-5 lg:bottom-auto lg:h-px lg:w-auto" aria-hidden="true" />
          {t.stages.map(([verb, product, desc], k) => {
            const { icon: Icon, href } = STAGE_META[k]
            const internal = href.startsWith('/')
            return (
              <motion.li key={verb} {...fadeUp} transition={{ ...fadeUp.transition, delay: k * 0.08 }} className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center">
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-bg text-gold">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-mono text-[11px] text-fg/40">0{k + 1}</p>
                  <p className="mt-1 text-xl font-semibold text-fg">{verb}</p>
                  <a
                    href={href}
                    {...(internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    className="mt-1 inline-flex items-center gap-1 text-sm text-gold hover:brightness-110"
                  >
                    {product}
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                  <p className="mt-2 text-xs text-fg/55 leading-[1.7]">{desc}</p>
                </div>
              </motion.li>
            )
          })}
        </ol>
      </section>

      {/* 4. Catalog */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <motion.div {...fadeUp}>
            <p className="text-xs uppercase tracking-widest text-gold">{t.catalogEyebrow}</p>
            <h2 className="mt-3 text-2xl md:text-4xl font-semibold tracking-tight text-fg">{t.catalogTitle}</h2>
          </motion.div>
          <div className="flex rounded-full border border-fg/15 p-1 text-xs" role="tablist">
            {([['all', t.filterAll], ['own', t.filterOwn], ['intel', t.filterIntel]] as const).map(([k, label]) => (
              <button
                key={k}
                type="button"
                role="tab"
                aria-selected={filter === k}
                onClick={() => setFilter(k)}
                className={`rounded-full px-3 py-1.5 transition-colors ${filter === k ? 'bg-fg text-bg' : 'text-fg/60 hover:text-fg'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((s) => (
            <ServiceCard key={s.name} s={s} lang={lang} />
          ))}
        </div>
        <div className="mt-8">
          <a href={ENDPOINT} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-fg/75 hover:text-gold transition-colors">
            {t.explore}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* 5. For sellers */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-20 md:pb-28">
        <motion.div {...fadeUp} className="liquid-glass rounded-3xl overflow-hidden">
          <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-gold">{t.sellEyebrow}</p>
              <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-fg">{t.sellTitle}</h2>
              <p className="mt-4 text-sm md:text-base text-fg/60 leading-[1.75]">{t.sellLead}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a href="https://probe.x402jp.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-semibold text-bg hover:opacity-90 transition">
                <Gauge className="h-4 w-4" />
                {t.sellScore}
              </a>
              <a href={ENDPOINT} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-fg/20 px-5 py-2.5 text-sm text-fg hover:bg-fg/5 transition">
                <Search className="h-4 w-4" />
                {t.sellList}
              </a>
            </div>
          </div>
          <div className="border-t border-fg/10 py-4">
            <p className="sr-only">{t.tickerNote}</p>
            <div className="marquee" aria-hidden="true">
              <div className="marquee-track">
                {[0, 1].map((copy) => (
                  <ul key={copy} className={`flex items-center ${copy ? 'marquee-dup' : ''}`}>
                    {ticker.map(([host, path, amt], k) => (
                      <Fragment key={k}>
                        <li className="mx-2 flex shrink-0 items-center gap-2 rounded-full border border-fg/10 px-3 py-1.5 font-mono text-xs">
                          <span className="text-fg/45">paid ·</span>
                          <span className="text-fg/80">{host}{path}</span>
                          <span className="text-[#60a5fa]">+{amt}</span>
                        </li>
                      </Fragment>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
            <p className="mt-3 px-6 text-[11px] text-fg/35 md:px-10">{t.tickerNote}</p>
          </div>
        </motion.div>
      </section>
    </>
  )
}
