import { useEffect, useState, type ReactNode } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { useLang, type Lang, type Localized } from '../i18n'

/* Phone in the middle with what each payment rail does on either side.
   Used at the top of about.html and on the home page above Update. */

const COPY = {
  ja: {
    sideLeft: 'Agentic Commerce',
    sideRight: 'x402',
    callouts: [
      ['人の代わりに Stripe Link で払う', 'Muse・Grok などのパーソナルエージェントが、ブラウザやチャットから購入を済ませる。'],
      ['単回利用カードと都度承認', '支払いのたびに人が承認し、使い捨てのカードで払う。'],
      ['API には1コールずつ払う', 'API が 402 を返したら、USDC で署名して同じ URL に再リクエストする。'],
      ['払える先は x402 Endpoint で探す', '161,826 のエンドポイントから、エージェントが売り手を見つける（2026年10月19日時点）。'],
    ],
  },
  en: {
    sideLeft: 'Agentic Commerce',
    sideRight: 'x402',
    callouts: [
      ['Pays with Stripe Link for you', 'Personal agents such as Muse and Grok finish purchases from a browser or a chat.'],
      ['Single-use cards, approve each time', 'A person approves every payment, and a disposable card pays.'],
      ['Pays APIs one call at a time', 'When an API returns 402, sign in USDC and re-request the same URL.'],
      ['Find who to pay on x402 Endpoint', 'Agents find sellers among 161,826 endpoints (as of Oct 19, 2026).'],
    ],
  },
}

type Slide = {
  agent: string
  budget: Localized
  ask: Localized
  found: Localized
  answer: Localized
  paid: Localized
  rail: 'Link' | 'x402'
}

const SLIDES: Slide[] = [
  {
    agent: 'Agentic Commerce',
    budget: { ja: '単回利用カード・都度承認', en: 'Single-use card · approve each time' },
    ask: { ja: 'このイベントのチケットを2枚買っておいて', en: 'Buy two tickets for this event' },
    found: { ja: 'ブラウザで購入ページを開き、Stripe Link で支払います', en: 'Opening the checkout in the browser; paying with Stripe Link' },
    answer: { ja: '承認をいただいたので、購入を完了しました。', en: 'You approved it, so the purchase is done.' },
    paid: { ja: 'Stripe Link で支払い（単回利用カード）', en: 'Paid with Stripe Link (single-use card)' },
    rail: 'Link',
  },
  {
    agent: 'x402',
    budget: { ja: 'USDC 残高から per-call', en: 'Per-call from a USDC balance' },
    ask: { ja: '今日、東京の食品で値段が動いたのは？', en: 'Which food prices in Tokyo moved today?' },
    found: { ja: 'x402 Endpoint で Japan Inflation Nowcall を見つけました', en: 'Found Japan Inflation Nowcall on x402 Endpoint' },
    answer: { ja: 'movers を1コール買い、その日に動いた品目を取得しました。', en: 'Bought one call to movers and got the items that moved today.' },
    paid: { ja: '$0.02 per call を残高から支払い（Solana・USDC）', en: 'Paid $0.02 per call from the balance (Solana · USDC)' },
    rail: 'x402',
  },
]

function useSlides() {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 5200)
    return () => clearInterval(t)
  }, [])
  return { i, setI }
}

function Phone({ lang, i, setI }: { lang: Lang } & ReturnType<typeof useSlides>) {
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
                <img src="/about/agent-avatar.jpg" alt="" width={48} height={48} className="h-12 w-12 rounded-2xl object-cover" />
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

      {/* slide dots */}
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
      </div>
    </div>
  )
}

function Callouts({ side, label, items, active, extra }: { side: 'left' | 'right'; label: string; items: string[][]; active: boolean; extra?: ReactNode }) {
  const right = side === 'right'
  return (
    <div className={`flex flex-col items-start gap-6 ${right ? 'lg:items-start lg:text-left' : 'lg:items-end lg:text-right'}`}>
      <span className={`rounded-full border px-3 py-1 font-mono text-[11px] transition-colors ${active ? 'border-gold/60 text-gold' : 'border-fg/15 text-fg/45'}`}>
        {label}
      </span>
      {items.map(([title, body]) => (
        <div key={title} className={`relative max-w-xs transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-55'}`}>
          {/* connector toward the phone */}
          <span
            aria-hidden="true"
            className={`absolute top-3 hidden h-px w-10 lg:block ${right ? '-left-12' : '-right-12'} ${active ? 'bg-gold/70' : 'bg-fg/20'}`}
          />
          <span
            aria-hidden="true"
            className={`absolute top-[9px] hidden h-2 w-2 rounded-full lg:block ${right ? '-left-[54px]' : '-right-[54px]'} ${active ? 'bg-gold' : 'bg-fg/25'}`}
          />
          <p className="text-base font-semibold text-fg">{title}</p>
          <p className="mt-1.5 text-sm text-fg/55 leading-[1.7]">{body}</p>
        </div>
      ))}
      {extra}
    </div>
  )
}

/* How a personal agent can pay over x402 today: Coinbase Payments MCP
   (external; facts checked against its docs on 2026-11-05). */
const PAY_MCP = {
  ja: {
    title: 'パーソナルエージェントから x402 で払うには',
    body: 'Coinbase の Payments MCP（Agentic Wallet MCP）を Claude Desktop・Claude Code・Codex CLI・Gemini CLI などにつなぐと、メールで作ったウォレットから x402 で払えます。入金は Coinbase Onramp（USDC）、上限は1回・1セッションごとに設定でき、Base・Polygon・Solana に対応しています。',
    docs: 'ドキュメント',
    note: '外部サービス（Coinbase 提供）',
  },
  en: {
    title: 'Paying over x402 from a personal agent',
    body: 'Connect Coinbase’s Payments MCP (Agentic Wallet MCP) to Claude Desktop, Claude Code, Codex CLI, Gemini CLI and others, and the agent pays over x402 from a wallet created with your email. Fund it with Coinbase Onramp (USDC), set limits per call and per session; Base, Polygon and Solana are supported.',
    docs: 'Docs',
    note: 'External service (by Coinbase)',
  },
}

function PayMcpNote({ lang }: { lang: Lang }) {
  const t = PAY_MCP[lang]
  return (
    <div className="max-w-xs rounded-xl border border-fg/15 bg-fg/[0.04] p-4 backdrop-blur-sm">
      <p className="text-sm font-semibold text-fg">{t.title}</p>
      <p className="mt-2 text-xs text-fg/60 leading-[1.8]">{t.body}</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
        <a href="https://docs.cdp.coinbase.com/payments-mcp/welcome" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-fg/75 hover:text-gold transition-colors">
          Payments MCP {t.docs}
          <ArrowUpRight className="h-3 w-3" />
        </a>
        <a href="https://github.com/coinbase/payments-mcp" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-fg/75 hover:text-gold transition-colors">
          GitHub
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
      <p className="mt-2 text-[11px] text-fg/40">{t.note}</p>
    </div>
  )
}

/* showPayMcp: add the Payments MCP note under the x402 callouts (home page) */
export function AgentShowcase({ showPayMcp = false }: { showPayMcp?: boolean }) {
  const { lang } = useLang()
  const t = COPY[lang]
  const slides = useSlides()
  const rail = SLIDES[slides.i].rail
  return (
    <div className="relative">
      <div className="relative max-w-6xl mx-auto px-6 grid gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-12">
        <Callouts side="left" label={t.sideLeft} items={t.callouts.slice(0, 2)} active={rail === 'Link'} />
        <div className="order-first w-full max-w-[340px] mx-auto lg:order-none lg:w-[320px]">
          <Phone lang={lang} {...slides} />
        </div>
        <Callouts side="right" label={t.sideRight} items={t.callouts.slice(2, 4)} active={rail === 'x402'} extra={showPayMcp ? <PayMcpNote lang={lang} /> : undefined} />
      </div>
    </div>
  )
}
