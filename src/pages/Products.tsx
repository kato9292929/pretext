import { motion } from 'motion/react'
import { PageHero } from '../primitives'
import { useLang, type Lang, type Localized } from '../i18n'

type Ep = { method: string; path: string; free?: boolean; price?: string; desc: Localized }
type Group = { name: string; host?: string; note: Localized; eps: Ep[] }

const COPY = {
  ja: {
    pageTag: 'endpoints',
    title: 'API Endpoints',
    intro:
      '人間向けの、叩けるエンドポイント一覧です。各行は「メソッド＋パス」「ステータス」「一行説明」。無料のものはそのまま、有料のものは402が返ってUSDCで支払います。',
    payHead: '叩き方',
    payFreeLabel: '無料のものは、そのまま叩ける。',
    payPaidLabel: '有料のものは、最初のリクエストで402が返る。402のヘッダに、支払い先・金額・チェーンが載っている。',
    steps: [
      '対象URLにGET（またはPOST）',
      '402 Payment Required が返る（PAYMENT-REQUIRED ヘッダに 支払い先・金額・チェーン）',
      'USDCの支払いを署名する（Base: EIP-3009 TransferWithAuthorization / Solana: SPL TransferChecked。facilitatorが手数料を持つので SOLは要らない）',
      '署名を X-PAYMENT ヘッダに載せて、同じURLへ再リクエスト',
      '200 OK とデータ（PAYMENT-RESPONSE ヘッダに決済トランザクション）',
    ],
    payNote:
      '金額・チェーン・手数料支払い者は決め打ちにせず、402が提示する値を使う。複数チェーンを提示する場合はクライアント側で選ぶ。x402対応クライアント（@x402/fetch など）を使えば往復は自動。機械可読な定義は各ホストの /.well-known/x402.json にある。',
    agentHead: 'これらを毎日叩いているエージェント',
    agentDesc:
      '当社の自律エージェント（AA）は、Base mainnet上のオンチェーンidentity（ERC-8004、agentId 55560）を持ち、毎日06:00 JSTに上記のエンドポイントを叩いて、1コールずつUSDCで決済している。決済の署名は Circle Developer-Controlled Wallet が行う。',
    agentRunHead: '直近の稼働（2026年7月23日 06:00 JST）',
    agentVerify:
      '支払いはすべてオンチェーンに記録され、Basescan / Solscan で検証できる。同じエンドポイントは、誰でも同じ手順で叩ける。',
  },
  en: {
    pageTag: 'endpoints',
    title: 'API Endpoints',
    intro:
      'A human-facing list of endpoints you can call. Each row is “method + path”, a status, and a one-line description. Free ones work directly; paid ones return 402 and are paid in USDC.',
    payHead: 'How to pay',
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
    agentHead: 'The agent that calls these every day',
    agentDesc:
      'Our autonomous agent (AA) has an on-chain identity on Base mainnet (ERC-8004, agentId 55560). Every day at 06:00 JST it calls the endpoints above, settling in USDC one call at a time. Circle’s Developer-Controlled Wallet signs the payments.',
    agentRunHead: 'Most recent run (2026-07-23, 06:00 JST)',
    agentVerify:
      'Every payment is recorded on-chain and verifiable on Basescan / Solscan. Anyone can call the same endpoints with the same steps.',
  },
} satisfies Record<Lang, Record<string, unknown>>

const GROUPS: Group[] = [
  {
    name: 'JIN — 日本インフレ・ナウキャスト',
    host: 'jin-orcin-pi.vercel.app',
    note: { ja: '決済は Solana USDC。discovery は /.well-known/x402.json。', en: 'Payment in Solana USDC. Discovery at /.well-known/x402.json.' },
    eps: [
      { method: 'GET', path: '/api/jin/latest', free: true, desc: { ja: '最新観測日の指数。観測値 + matched + 方法論。', en: 'Index for the latest observation date. Value + matched + methodology.' } },
      { method: 'GET', path: '/api/jin/series', price: '$0.01', desc: { ja: '指数の時系列。機械向け。', en: 'Time series of the index. For machines.' } },
      { method: 'GET', path: '/api/jin/movers', price: '$0.02', desc: { ja: 'その日動いた品目。特売タグ付き。機械向け。', en: 'Items that moved that day, with sale tags. For machines.' } },
    ],
  },
  {
    name: 'OSD — Onchain Stock Data',
    host: 'osd-coral.vercel.app',
    note: { ja: '決済は Base または Solana USDC。402が両方のチェーンを提示するので、クライアントがどちらかを選ぶ。', en: 'Payment in Base or Solana USDC. The 402 offers both chains, so the client picks one.' },
    eps: [
      { method: 'GET', path: '/api/alpha/portfolio/current', price: '$0.01', desc: { ja: '米国ポートフォリオ。現在の10銘柄と各社のthesis・判定期日。', en: 'US portfolio. Current 10 names with each thesis and decision date.' } },
      { method: 'GET', path: '/api/alpha/portfolio/scorecard', price: '$0.01', desc: { ja: '米国の的中実績。hit / partial / miss と SPY・QQQ 比。', en: 'US hit record. hit / partial / miss vs SPY / QQQ.' } },
      { method: 'GET', path: '/api/alpha/jp/portfolio/current', price: '$0.01', desc: { ja: '日本ポートフォリオ。現在の10銘柄。', en: 'Japan portfolio. Current 10 names.' } },
      { method: 'GET', path: '/api/alpha/jp/scorecard', price: '$0.01', desc: { ja: '日本の的中実績。ベンチマーク比。', en: 'Japan hit record vs benchmark.' } },
      { method: 'GET', path: '/api/alpha/jp/catalysts', price: '$0.01', desc: { ja: '日本株のカタリスト一覧。期日到来後に判定。', en: 'Catalysts for Japanese stocks. Scored after the date passes.' } },
      { method: 'GET', path: '/api/stocks/:ticker', price: '$0.01', desc: { ja: '銘柄データ。ticker指定。', en: 'Per-name data. Specify a ticker.' } },
    ],
  },
  {
    name: 'Intelligence — 市況・オンチェーン分析',
    note: { ja: '決済は Base USDC。', en: 'Payment in Base USDC.' },
    eps: [
      { method: 'GET', path: 'x402amd.vercel.app/api/macro/dashboard', price: '$0.30', desc: { ja: 'APACマクロ。金利・為替・フロー・リスク regime。', en: 'APAC macro. Rates, FX, flows, risk regime.' } },
      { method: 'GET', path: 'x402yi.vercel.app/api/yield/scan', price: '$0.20', desc: { ja: 'DeFiの利回りスキャン。プール別のAPYとスマートマネー残高。', en: 'DeFi yield scan. Per-pool APY and smart-money balances.' } },
      { method: 'POST', path: 'x402pi.vercel.app/api/portfolio/analyze', price: '$0.50', desc: { ja: 'ウォレットアドレスを渡すとポートフォリオを分析。', en: 'Pass a wallet address to analyze its portfolio.' } },
      { method: 'GET', path: 'x402-jrey.vercel.app/api/realestate/yield?area=tokyo', price: '$0.30', desc: { ja: '日本の不動産利回り。エリア指定。', en: 'Japanese real estate yield. Specify an area.' } },
      { method: 'GET', path: 'x402nansenpolymarket.vercel.app/api/divergence/scan', price: '$0.15', desc: { ja: '予測市場とオンチェーンフローの乖離スキャン。', en: 'Divergence scan between prediction markets and on-chain flows.' } },
      { method: 'GET', path: 'x402-hl.vercel.app/api/hyperliquid/scan', price: '$0.20', desc: { ja: 'Hyperliquidの建玉・ファンディングとスマートマネーの偏り。', en: 'Hyperliquid open interest / funding and smart-money skew.' } },
      { method: 'GET', path: 'smartmoneyscreener.vercel.app/api/screener/smart-money', price: '$0.05', desc: { ja: 'スマートマネーが買っているトークンのスクリーニング。', en: 'Screen tokens that smart money is buying.' } },
      { method: 'GET', path: 'x402oif.vercel.app/api/feed/apac-daily', price: '$0.10', desc: { ja: 'APACの日次オンチェーンサマリー。', en: 'Daily APAC on-chain summary.' } },
      { method: 'GET', path: 'x402oif.vercel.app/api/feed/whale-alert', price: '$0.20', desc: { ja: '大口転送のアラート。', en: 'Alerts on large transfers.' } },
      { method: 'GET', path: 'odo-gamma.vercel.app/funding/nowcast/current', price: '$0.01', desc: { ja: 'perpのファンディング・ナウキャスト。バスケット別。', en: 'Perp funding nowcast, by basket.' } },
    ],
  },
]

const RUN: { label: Localized; detail: Localized }[] = [
  {
    label: { ja: '市況の取得', en: 'Market fetch' },
    detail: {
      ja: '15エンドポイントを順に叩く。9本が正常、4本がデータ源の劣化、2本がエラー。決済 $1.85 USDC / 9トランザクション / 40秒。',
      en: 'Calls 15 endpoints in order. 9 OK, 4 degraded data source, 2 errors. Paid $1.85 USDC / 9 transactions / 40s.',
    },
  },
  {
    label: { ja: '日次の判断', en: 'Daily decision' },
    detail: {
      ja: '取得したデータからその日の判断を1件記録。この日は SKIP（判断の記録のみ。売買は執行しない）。',
      en: 'Records one decision for the day. SKIP this day (decision recorded only; no trade executed).',
    },
  },
  {
    label: { ja: '実績データの購入', en: 'Buying record data' },
    detail: {
      ja: 'OSDのalpha 5本を1コールずつ購入し、取得したスナップショットを追記型で保存。各 $0.01、5本すべて200。',
      en: 'Buys OSD’s 5 alpha endpoints one call each and appends each snapshot. $0.01 each, all 5 returned 200.',
    },
  },
  {
    label: { ja: '追加の購入', en: 'Extra purchases' },
    detail: {
      ja: '銘柄データとオンチェーンデータを追加取得。この回の支出 $0.03（上限 $0.20）。',
      en: 'Fetches extra stock and on-chain data. Spend $0.03 this run (cap $0.20).',
    },
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

export function Products() {
  const { lang } = useLang()
  const t = COPY[lang] as (typeof COPY)['ja']
  return (
    <>
      <PageHero eyebrow="API" tag={t.pageTag} title={t.title} intro={t.intro} />

      {/* Endpoint groups */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-6 md:py-10 space-y-6">
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
              <h2 className="text-base md:text-lg font-semibold text-fg">{g.name}</h2>
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
      </section>

      {/* How to pay */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-fg">{t.payHead}</h2>
        <p className="mt-4 text-sm text-fg/70 leading-[1.7]">{t.payFreeLabel}</p>
        <pre className="mt-3 liquid-glass rounded-xl p-4 text-xs md:text-sm font-mono text-fg/80 overflow-x-auto">
          curl https://jin-orcin-pi.vercel.app/api/jin/latest
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
    </>
  )
}
