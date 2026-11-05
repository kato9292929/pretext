import { useEffect, useState } from 'react'
import { Check, CreditCard, Zap } from 'lucide-react'
import { useLang, type Lang, type Localized } from '../i18n'

/* Agent payments shown on two screens, Stripe-style: a PC window (what
   goes over the wire and what was paid) with a phone in front of it (the
   person's chat with the agent). Both switch together between Agentic
   Commerce (Stripe Link) and x402, automatically or by tab.
   Used in the home hero (the PC window runs past the right edge) and on
   about.html. Everything shown is the site's existing copy; no new figures. */

type Method = {
  key: 'link' | 'x402'
  tab: string
  icon: typeof CreditCard
  budget: Localized
  ask: Localized
  found: Localized
  answer: Localized
  rows: [Localized, Localized][]
  log: [string, Localized, Tone?][]
  done: Localized
}

type Tone = 'warn' | 'ok' | 'dim'
const L = (ja: string, en: string): Localized => ({ ja, en })

const METHODS: Method[] = [
  {
    key: 'link',
    tab: 'Agentic Commerce',
    icon: CreditCard,
    budget: L('単回利用カード・都度承認', 'Single-use card · approve each time'),
    ask: L('このイベントのチケットを2枚買っておいて', 'Buy two tickets for this event'),
    found: L('ブラウザで購入ページを開き、Stripe Link で支払います', 'Opening the checkout in the browser; paying with Stripe Link'),
    answer: L('承認をいただいたので、購入を完了しました。', 'You approved it, so the purchase is done.'),
    rows: [
      [L('支払い方法', 'Pay with'), L('Stripe Link', 'Stripe Link')],
      [L('カード', 'Card'), L('単回利用カード', 'Single-use card')],
      [L('承認', 'Approval'), L('支払いのたびに人が承認', 'A person approves each payment')],
      [L('主なエージェント', 'Agents'), L('Muse・Grok など', 'Muse, Grok and others')],
    ],
    log: [
      ['·', L('依頼：イベントのチケットを2枚', 'task: two tickets for the event'), 'dim'],
      ['→', L('ブラウザで購入ページを開く', 'open the checkout in the browser')],
      ['←', L('Stripe Link：承認を待っています', 'Stripe Link: waiting for approval'), 'warn'],
      ['·', L('人が承認 → 単回利用カードを発行', 'person approves → single-use card issued'), 'dim'],
      ['✓', L('支払い完了', 'payment complete'), 'ok'],
    ],
    done: L('購入完了', 'Purchase complete'),
  },
  {
    key: 'x402',
    tab: 'x402',
    icon: Zap,
    budget: L('USDC 残高から per-call', 'Per-call from a USDC balance'),
    ask: L('今日、東京の食品で値段が動いたのは？', 'Which food prices in Tokyo moved today?'),
    found: L('x402 Endpoint で Japan Inflation Nowcall を見つけました', 'Found Japan Inflation Nowcall on x402 Endpoint'),
    answer: L('movers を1コール買い、その日に動いた品目を取得しました。', 'Bought one call to movers and got the items that moved today.'),
    rows: [
      [L('エンドポイント', 'Endpoint'), L('/api/jin/movers', '/api/jin/movers')],
      [L('応答', 'Response'), L('402 → 200 OK', '402 → 200 OK')],
      [L('ネットワーク', 'Network'), L('Solana・USDC', 'Solana · USDC')],
      [L('金額', 'Price'), L('$0.02 per call', '$0.02 per call')],
    ],
    log: [
      ['→', L('GET jin.x402jp.com/api/jin/movers', 'GET jin.x402jp.com/api/jin/movers')],
      ['←', L('402 Payment Required  $0.02 · USDC · solana', '402 Payment Required  $0.02 · USDC · solana'), 'warn'],
      ['·', L('残高から署名（per-call）', 'sign from the balance (per call)'), 'dim'],
      ['→', L('GET …/api/jin/movers  + X-PAYMENT', 'GET …/api/jin/movers  + X-PAYMENT')],
      ['←', L('200 OK  その日に動いた品目', '200 OK  items that moved today'), 'ok'],
    ],
    done: L('200 OK・データ受け取り', '200 OK · data received'),
  },
]

const COPY = {
  ja: { steps: ['依頼', '支払い', '完了'], payWith: '支払い方法', summary: '支払いの内容', log: 'やりとり' },
  en: { steps: ['Ask', 'Pay', 'Done'], payWith: 'Pay with', summary: 'Payment', log: 'Over the wire' },
}

const TONE: Record<Tone, string> = { warn: 'text-[#b26a00]', ok: 'text-[#1a9b5b]', dim: 'text-[#8a96aa]' }

function useRotation(n: number) {
  const [i, setI] = useState(0)
  const [hold, setHold] = useState(false)
  useEffect(() => {
    if (hold || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((k) => (k + 1) % n), 6000)
    return () => clearInterval(t)
  }, [n, hold])
  const pick = (k: number) => {
    setI(k)
    setHold(true)
  }
  return { i, pick }
}

/* The phone: the person's chat with the agent (no notch, flat frame). */
function Phone({ m, lang }: { m: Method; lang: Lang }) {
  return (
    <div className="rounded-[40px] border border-white/25 bg-[#0b0d12] p-2.5 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.75)]">
      <div className="relative overflow-hidden rounded-[32px] bg-[#f4f5f8] text-[#0b1a33]" style={{ height: 500 }}>
        <div className="flex items-center justify-between px-5 pt-3.5 text-[11px] font-semibold">
          <span>9:41</span>
          <span className="tracking-widest">•••</span>
        </div>
        <div key={m.key} className="panel-fade px-3.5">
          <div className="mt-3 flex flex-col items-center">
            <img src="/about/agent-avatar.jpg" alt="" width={44} height={44} className="h-11 w-11 rounded-2xl object-cover" />
            <div className="mt-2 rounded-2xl bg-white px-4 py-1.5 text-center shadow-sm">
              <p className="text-[13px] font-semibold">{m.tab}</p>
              <p className="text-[10px] text-[#5b6b85]">{m.budget[lang]}</p>
            </div>
          </div>
          <div className="mt-4 ml-6 rounded-2xl rounded-tr-md bg-[#0b2a5c] px-3.5 py-2.5 text-[12.5px] leading-[1.5] text-white">{m.ask[lang]}</div>
          <div className="mt-2.5 mr-6 rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 text-[12px] leading-[1.55] shadow-sm">{m.found[lang]}</div>
          <div className="mt-2 mr-6 rounded-2xl bg-white px-3.5 py-2.5 text-[12px] leading-[1.55] shadow-sm">{m.answer[lang]}</div>
          <p className="mt-3 flex items-center gap-1.5 px-1 text-[11px] text-[#5b6b85]">
            <Check className="h-3.5 w-3.5 shrink-0 text-[#1a9b5b]" />
            {m.done[lang]}
          </p>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f4f5f8] to-transparent" />
      </div>
    </div>
  )
}

/* The PC window: method tabs and the request log on the left, what was paid
   on the right. `inset` leaves room on the left for the phone in front. */
function Window({ m, lang, i, pick, bleed, inset }: { m: Method; lang: Lang; i: number; pick: (k: number) => void; bleed: boolean; inset: boolean }) {
  const t = COPY[lang]
  return (
    <div className="overflow-hidden rounded-2xl bg-white text-[#0b1a33] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
      {/* window header */}
      <div className={`flex items-center justify-between border-b border-[#eef1f6] px-6 py-4 md:px-8 ${bleed ? 'lg:pr-[5.5rem]' : ''}`}>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e3e8f0]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e3e8f0]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e3e8f0]" />
        </div>
        <ol className="flex items-center gap-2 text-[12px]">
          {t.steps.map((s, k) => (
            <li key={s} className="flex items-center gap-2">
              {k > 0 && <span className="text-[#c3cad6]">›</span>}
              <span className={k === 2 ? 'font-semibold text-[#0b1a33]' : 'text-[#5b6b85]'}>{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid md:grid-cols-[1.35fr_1fr]">
        {/* left: tabs + request log */}
        <div className={`px-6 py-6 md:px-8 md:py-7 ${inset ? 'lg:pl-[5.5rem]' : ''}`}>
          <p className="text-[13px] font-semibold">{t.payWith}</p>
          <div className="mt-3 flex flex-wrap gap-2" role="tablist">
            {METHODS.map((x, k) => {
              const Icon = x.icon
              const on = k === i
              return (
                <button
                  key={x.key}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => pick(k)}
                  className={`flex min-w-[7.5rem] flex-col items-start gap-1 rounded-lg border px-3 py-2 text-left text-[12px] transition-colors ${
                    on ? 'border-[#0b2a5c] text-[#0b1a33] ring-1 ring-[#0b2a5c]' : 'border-[#e3e8f0] text-[#5b6b85] hover:border-[#c3cad6]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {x.tab}
                </button>
              )
            })}
          </div>
          <p className="mt-6 text-[13px] font-semibold">{t.log}</p>
          <ol key={m.key} className="panel-fade mt-3 space-y-1.5 rounded-lg border border-[#eef1f6] bg-[#fafbfd] p-3 font-mono text-[10.5px] leading-[1.6]">
            {m.log.map(([dir, text, tone], k) => (
              <li key={k} className={`flex gap-2 ${tone ? TONE[tone] : 'text-[#0b1a33]'}`}>
                <span className="w-3 shrink-0 text-center">{dir}</span>
                <span className="break-words">{text[lang]}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* right: what was paid */}
        <div className={`border-t border-[#eef1f6] bg-[#f7f8fb] px-6 py-6 md:border-l md:border-t-0 md:px-8 md:py-7 ${bleed ? 'lg:pr-[5.5rem]' : ''}`}>
          <p className="text-[13px] font-semibold">{t.summary}</p>
          <dl key={m.key} className="panel-fade mt-4 divide-y divide-[#e8ecf2] text-[12px]">
            {m.rows.map(([k, v]) => (
              <div key={k.en} className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="shrink-0 text-[#5b6b85]">{k[lang]}</dt>
                <dd className="break-words text-right font-medium">{v[lang]}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-[#0b2a5c] px-4 py-3 text-[13px] font-semibold text-white">
            <Check className="h-4 w-4" />
            {m.done[lang]}
          </div>
        </div>
      </div>
    </div>
  )
}

/* Phone in front of the PC window. On lg the phone overlaps the window's
   lower-left; below lg the phone comes first and the window follows.
   bleed: the window runs 4rem past the browser edge (home hero). */
export function AgentDuo({ bleed = false }: { bleed?: boolean }) {
  const { lang } = useLang()
  const { i, pick } = useRotation(METHODS.length)
  const m = METHODS[i]
  return (
    // min-h keeps the taller phone from running into what follows
    <div className="relative lg:min-h-[37rem]">
      <div className="mx-auto mb-8 w-[15rem] lg:absolute lg:left-0 lg:top-14 lg:z-10 lg:mb-0">
        <Phone m={m} lang={lang} />
      </div>
      <div className="lg:ml-[11rem]">
        <Window m={m} lang={lang} i={i} pick={pick} bleed={bleed} inset />
      </div>
    </div>
  )
}
