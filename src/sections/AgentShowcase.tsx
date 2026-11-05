import { useEffect, useState } from 'react'
import { Check, CreditCard, Zap } from 'lucide-react'
import { useLang, type Lang, type Localized } from '../i18n'

/* Agent payment panel: one flat app window (no phone frame) showing an agent
   chat on the left and what was paid on the right. Two payment methods —
   Agentic Commerce (Stripe Link) and x402 — switch automatically or by tab.
   Used in the home hero (bleeding off the right edge) and on about.html.
   Everything shown is from the site's existing copy; no new figures. */

type Method = {
  key: 'link' | 'x402'
  tab: string
  icon: typeof CreditCard
  budget: Localized
  ask: Localized
  found: Localized
  answer: Localized
  rows: [Localized, Localized][]
  done: Localized
}

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
      [L('リクエスト', 'Request'), L('GET jin.x402jp.com/api/jin/movers', 'GET jin.x402jp.com/api/jin/movers')],
      [L('応答', 'Response'), L('402 → 200 OK', '402 → 200 OK')],
      [L('ネットワーク', 'Network'), L('Solana・USDC', 'Solana · USDC')],
      [L('金額', 'Price'), L('$0.02 per call', '$0.02 per call')],
    ],
    done: L('200 OK・データ受け取り', '200 OK · data received'),
  },
]

const COPY = {
  ja: { steps: ['依頼', '支払い', '完了'], payWith: '支払い方法', summary: '支払いの内容' },
  en: { steps: ['Ask', 'Pay', 'Done'], payWith: 'Pay with', summary: 'Payment' },
}

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

function Chat({ m, lang }: { m: Method; lang: Lang }) {
  return (
    <div className="space-y-3">
      <div className="ml-10 rounded-2xl rounded-tr-md bg-[#0b2a5c] px-4 py-3 text-[14px] leading-[1.5] text-white">{m.ask[lang]}</div>
      <div className="mr-10 rounded-2xl rounded-tl-md border border-[#e3e8f0] bg-white px-4 py-3 text-[13px] leading-[1.55]">{m.found[lang]}</div>
      <div className="mr-10 rounded-2xl border border-[#e3e8f0] bg-white px-4 py-3 text-[13px] leading-[1.55]">{m.answer[lang]}</div>
    </div>
  )
}

/* bleed: the panel runs 6rem past the window edge (home hero), so the right
   column keeps its content clear of the cut. */
export function AgentPanel({ className = '', bleed = false }: { className?: string; bleed?: boolean }) {
  const { lang } = useLang()
  const t = COPY[lang]
  const { i, pick } = useRotation(METHODS.length)
  const m = METHODS[i]

  return (
    <div className={`overflow-hidden rounded-2xl bg-white text-[#0b1a33] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] ${className}`}>
      {/* window header */}
      <div className={`flex items-center justify-between border-b border-[#eef1f6] px-6 py-4 md:px-8 md:py-5 ${bleed ? 'lg:pr-[8rem]' : ''}`}>
        <div className="flex items-center gap-3">
          <img src="/about/agent-avatar.jpg" alt="" width={36} height={36} className="h-9 w-9 rounded-xl object-cover" />
          <div>
            <p className="text-sm font-semibold leading-tight">{m.tab}</p>
            <p className="text-[11px] text-[#5b6b85]">{m.budget[lang]}</p>
          </div>
        </div>
        <ol className="hidden items-center gap-2 text-[12px] sm:flex">
          {t.steps.map((s, k) => (
            <li key={s} className="flex items-center gap-2">
              {k > 0 && <span className="text-[#c3cad6]">›</span>}
              <span className={k === 2 ? 'font-semibold text-[#0b1a33]' : 'text-[#5b6b85]'}>{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid md:grid-cols-[1.15fr_1fr]">
        {/* left: method tabs + chat */}
        <div className="px-6 py-6 md:px-8 md:py-7">
          <p className="text-[13px] font-semibold">{t.payWith}</p>
          <div className="mt-3 flex gap-2" role="tablist">
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
                  className={`flex min-w-[8.5rem] flex-col items-start gap-1 rounded-lg border px-3 py-2 text-left text-[12px] transition-colors ${
                    on ? 'border-[#0b2a5c] text-[#0b1a33] ring-1 ring-[#0b2a5c]' : 'border-[#e3e8f0] text-[#5b6b85] hover:border-[#c3cad6]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {x.tab}
                </button>
              )
            })}
          </div>
          <div key={m.key} className="panel-fade mt-6">
            <Chat m={m} lang={lang} />
          </div>
        </div>

        {/* right: what was paid */}
        <div className={`border-t border-[#eef1f6] bg-[#f7f8fb] px-6 py-6 md:border-l md:border-t-0 md:px-8 md:py-7 ${bleed ? 'lg:pr-[8rem]' : ''}`}>
          <p className="text-[13px] font-semibold">{t.summary}</p>
          <dl key={m.key} className="panel-fade mt-4 divide-y divide-[#e8ecf2] text-[12px]">
            {m.rows.map(([k, v]) => (
              <div key={k.en} className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="shrink-0 text-[#5b6b85]">{k[lang]}</dt>
                <dd className="break-all text-right font-medium">{v[lang]}</dd>
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
