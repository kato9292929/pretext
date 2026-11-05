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
    done: L('200 OK・受け取り完了', '200 OK · received'),
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

/* The phone: a messaging app where the person asks the agent. Thin
   titanium-like frame, small island, header with the agent, a payment card
   in the thread and an input bar, so the screen is full top to bottom. */
const PAY_CARD: Record<Method['key'], { title: Localized; meta: Localized }> = {
  link: { title: L('Stripe Link で支払い', 'Paid with Stripe Link'), meta: L('単回利用カード・承認済み', 'Single-use card · approved') },
  x402: { title: L('x402 で支払い', 'Paid over x402'), meta: L('$0.02・Solana・USDC', '$0.02 · Solana · USDC') },
}

function Phone({ m, lang }: { m: Method; lang: Lang }) {
  const card = PAY_CARD[m.key]
  return (
    <div className="rounded-[2.6rem] bg-gradient-to-b from-[#9aa0aa] via-[#4a4f58] to-[#2a2d33] p-[3px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
      <div className="rounded-[2.45rem] bg-black p-[6px]">
        <div className="relative flex h-[27rem] flex-col overflow-hidden rounded-[2.1rem] bg-white text-[#0b1a33]">
          {/* status bar + island */}
          <div className="relative flex h-10 shrink-0 items-center justify-between px-6 text-[11px] font-semibold">
            <span>9:41</span>
            <span aria-hidden="true" className="absolute left-1/2 top-2 h-[22px] w-[74px] -translate-x-1/2 rounded-full bg-black" />
            <span aria-hidden="true" className="flex items-end gap-[2px]">
              <span className="h-[4px] w-[3px] rounded-[1px] bg-[#0b1a33]" />
              <span className="h-[6px] w-[3px] rounded-[1px] bg-[#0b1a33]" />
              <span className="h-[8px] w-[3px] rounded-[1px] bg-[#0b1a33]" />
              <span className="ml-1 h-[9px] w-[18px] rounded-[3px] border border-[#0b1a33] p-[1px]">
                <span className="block h-full w-3/4 rounded-[1px] bg-[#0b1a33]" />
              </span>
            </span>
          </div>

          {/* app header */}
          <div className="flex shrink-0 items-center gap-2.5 border-b border-[#eef1f6] px-4 pb-2.5 pt-1">
            <img src="/about/agent-avatar.jpg" alt="" width={30} height={30} className="h-[30px] w-[30px] rounded-full object-cover" />
            <div className="min-w-0">
              <p className="truncate text-[12.5px] font-semibold leading-tight">{m.tab}</p>
              <p className="truncate text-[10px] text-[#7a879b]">{m.budget[lang]}</p>
            </div>
          </div>

          {/* thread */}
          <div key={m.key} className="panel-fade flex-1 space-y-2 bg-[#f6f7f9] px-3 py-3">
            <div className="ml-auto max-w-[82%] rounded-[18px] rounded-br-[6px] bg-[#0b2a5c] px-3 py-2 text-[11.5px] leading-[1.45] text-white">{m.ask[lang]}</div>
            <div className="max-w-[86%] rounded-[18px] rounded-bl-[6px] bg-white px-3 py-2 text-[11.5px] leading-[1.45] shadow-[0_1px_2px_rgba(11,26,51,0.08)]">{m.found[lang]}</div>
            <div className="max-w-[86%] rounded-[14px] border border-[#e3e8f0] bg-white p-2.5 shadow-[0_1px_2px_rgba(11,26,51,0.08)]">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e8f6ee] text-[#1a9b5b]">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold leading-tight">{card.title[lang]}</p>
                  <p className="text-[10px] text-[#7a879b]">{card.meta[lang]}</p>
                </div>
              </div>
            </div>
            <div className="max-w-[86%] rounded-[18px] rounded-bl-[6px] bg-white px-3 py-2 text-[11.5px] leading-[1.45] shadow-[0_1px_2px_rgba(11,26,51,0.08)]">{m.answer[lang]}</div>
          </div>

          {/* input bar + home indicator */}
          <div className="shrink-0 border-t border-[#eef1f6] bg-white px-3 pb-2 pt-2">
            <div className="flex items-center gap-2">
              <div className="h-8 flex-1 rounded-full border border-[#e3e8f0] px-3 text-[11px] leading-8 text-[#a3adbd]">{lang === 'ja' ? 'メッセージ' : 'Message'}</div>
              <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0b2a5c] text-[13px] text-white">↑</span>
            </div>
            <div aria-hidden="true" className="mx-auto mt-2 h-1 w-24 rounded-full bg-[#0b1a33]" />
          </div>
        </div>
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
      <div className={`flex items-center justify-between border-b border-[#eef1f6] px-6 py-4 md:px-8 ${bleed ? 'xl:pr-[5.5rem]' : ''}`}>
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

      <div className="grid md:grid-cols-[1fr_1fr]">
        {/* left: tabs + request log */}
        <div className={`px-6 py-6 md:px-8 md:py-7 ${inset ? 'xl:pl-[6rem]' : ''}`}>
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
                  className={`flex min-w-[6.5rem] flex-col whitespace-nowrap items-start gap-1 rounded-lg border px-3 py-2 text-left text-[12px] transition-colors ${
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
        <div className={`border-t border-[#eef1f6] bg-[#f7f8fb] px-6 py-6 md:border-l md:border-t-0 md:px-8 md:py-7 ${bleed ? 'xl:pr-[5.5rem]' : ''}`}>
          <p className="text-[13px] font-semibold">{t.summary}</p>
          <dl key={m.key} className="panel-fade mt-4 divide-y divide-[#e8ecf2] text-[12px]">
            {m.rows.map(([k, v]) => (
              <div key={k.en} className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="shrink-0 text-[#5b6b85]">{k[lang]}</dt>
                <dd className="text-right font-medium">{v[lang]}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-[#0b2a5c] px-4 py-3 text-[13px] font-semibold whitespace-nowrap text-white">
            <Check className="h-4 w-4" />
            {m.done[lang]}
          </div>
        </div>
      </div>
    </div>
  )
}

/* Phone in front of the PC window. On xl the phone overlaps the window's
   lower-left and hangs below it; below xl the phone comes first and the
   window follows. bleed: the window runs 4rem past the browser edge. */
export function AgentDuo({ bleed = false }: { bleed?: boolean }) {
  const { lang } = useLang()
  const { i, pick } = useRotation(METHODS.length)
  const m = METHODS[i]
  return (
    // min-h keeps the phone hanging below the window clear of what follows
    <div className="relative xl:min-h-[33rem]">
      <div className="mx-auto mb-8 w-[15.5rem] xl:absolute xl:left-0 xl:top-20 xl:z-10 xl:mb-0">
        <Phone m={m} lang={lang} />
      </div>
      <div className="xl:ml-[10rem]">
        <Window m={m} lang={lang} i={i} pick={pick} bleed={bleed} inset />
      </div>
    </div>
  )
}
