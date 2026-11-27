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
      ['Seller Probe から厳選されたエンドポイントを探す', 'Seller Probe が実際に買って確かめたエンドポイントから、エージェントが売り手を選ぶ。'],
    ],
  },
  en: {
    sideLeft: 'Agentic Commerce',
    sideRight: 'x402',
    callouts: [
      ['Pays with Stripe Link for you', 'Personal agents such as Muse and Grok finish purchases from a browser or a chat.'],
      ['Single-use cards, approve each time', 'A person approves every payment, and a disposable card pays.'],
      ['Pays APIs one call at a time', 'When an API returns 402, sign in USDC and re-request the same URL.'],
      ['Find curated endpoints on Seller Probe', 'Agents pick sellers from endpoints Seller Probe has actually bought from and checked.'],
    ],
  },
  zh: {
    sideLeft: 'Agentic Commerce',
    sideRight: 'x402',
    callouts: [
      ['通过 Stripe Link 代人支付', 'Muse、Grok 等个人智能体在浏览器或聊天中完成购买。'],
      ['一次性卡与逐笔授权', '每次支付都由人授权，并使用一次性卡支付。'],
      ['API 按次支付', 'API 返回 402 后，用 USDC 签名并向同一 URL 再次请求。'],
      ['从 Seller Probe 精选的端点中查找', '智能体从 Seller Probe 实际购买并验证过的端点中选择卖方。'],
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
    budget: { ja: '単回利用カード・都度承認', en: 'Single-use card · approve each time', zh: '一次性卡・逐笔授权' },
    ask: { ja: 'このイベントのチケットを2枚買っておいて', en: 'Buy two tickets for this event', zh: '帮我买两张这场活动的门票' },
    found: { ja: 'ブラウザで購入ページを開き、Stripe Link で支払います', en: 'Opening the checkout in the browser; paying with Stripe Link', zh: '正在浏览器中打开购买页面，将通过 Stripe Link 支付' },
    answer: { ja: '承認をいただいたので、購入を完了しました。', en: 'You approved it, so the purchase is done.', zh: '已获得您的授权，购买已完成。' },
    paid: { ja: 'Stripe Link で支払い（単回利用カード）', en: 'Paid with Stripe Link (single-use card)', zh: '已通过 Stripe Link 支付（一次性卡）' },
    rail: 'Link',
  },
  {
    agent: 'x402',
    budget: { ja: 'AgentPay402・Phantom で承認', en: 'AgentPay402 · approve in Phantom', zh: 'AgentPay402・在 Phantom 中授权' },
    ask: { ja: 'AgentPay402で、Nansen の smart money netflow を買って', en: 'With AgentPay402, buy Nansen’s smart money netflow', zh: '用 AgentPay402 购买 Nansen 的 smart money netflow' },
    found: { ja: 'Seller Probe：delivered（スコア 97.1）', en: 'Seller Probe: delivered (score 97.1)', zh: 'Seller Probe：delivered（评分 97.1）' },
    answer: { ja: '承認リンクを用意しました。承認するまで支払われません。', en: 'Approval link ready. Nothing is paid until you approve.', zh: '已准备好授权链接。授权前不会支付。' },
    paid: { ja: '$0.05・Solana（USDC）・承認後に支払い', en: '$0.05 · Solana (USDC) · paid on approval', zh: '$0.05・Solana（USDC）・授权后支付' },
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
    <div className="relative mx-auto w-full max-w-[300px]">
      {/* frame: translucent glass tinted with the background palette, with a gradient rim */}
      <div
        className="relative rounded-[44px] p-[1.5px] shadow-2xl"
        style={{ background: 'linear-gradient(135deg, rgba(126,139,240,0.9), rgba(155,123,242,0.8) 20%, rgba(245,124,230,0.85) 40%, rgba(94,227,236,0.8) 62%, rgba(126,240,168,0.75) 78%, rgba(242,213,122,0.8) 90%, rgba(245,169,142,0.85))' }}
      >
      <div
        className="relative rounded-[42.5px] p-3 backdrop-blur-md"
        style={{ background: 'linear-gradient(135deg, rgba(126,139,240,0.32), rgba(155,123,242,0.26) 22%, rgba(245,124,230,0.28) 42%, rgba(94,227,236,0.24) 64%, rgba(126,240,168,0.22) 80%, rgba(242,213,122,0.24) 92%, rgba(245,169,142,0.28))' }}
      >
        <div className="relative overflow-hidden rounded-[34px] bg-[#f4f5f8] text-[#0b1a33]" style={{ height: 470 }}>
          {/* status bar */}
          <div className="flex items-center justify-between px-6 pt-4 text-[12px] font-semibold">
            <span>4:02</span>
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
                <img src="/about/agent-avatar.jpg" alt="" width={40} height={40} className="h-10 w-10 rounded-2xl object-cover" />
                <div className="mt-2 rounded-2xl bg-white px-4 py-2 text-center shadow-sm">
                  <p className="text-sm font-semibold">{s.agent}</p>
                  <p className="text-[11px] text-[#5b6b85]">{s.budget[lang]}</p>
                </div>
              </div>
              <div className="mt-4 ml-6 rounded-2xl rounded-tr-md bg-[#0b2a5c] px-3.5 py-2.5 text-[13px] leading-[1.5] text-white">
                {s.ask[lang]}
              </div>
              <div className="mt-3 mr-6 rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 text-[12px] leading-[1.55] shadow-sm">
                {s.found[lang]}
              </div>
              <div className="mt-2 mr-6 rounded-2xl bg-white px-3.5 py-2.5 text-[12px] leading-[1.55] shadow-sm">
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
    title: 'x402 × パーソナルエージェント',
    body: 'Coinbase の Payments MCP（Agentic Wallet MCP）を Claude Desktop・Claude Code・Codex CLI・Gemini CLI などにつなぐと、メールで作ったウォレットから x402 で払えます。入金は Coinbase Onramp（USDC）、上限は1回・1セッションごとに設定でき、Base・Polygon・Solana に対応しています。',
    docs: 'ドキュメント',
    note: '外部サービス（Coinbase 提供）',
  },
  en: {
    title: 'x402 × personal agents',
    body: 'Connect Coinbase’s Payments MCP (Agentic Wallet MCP) to Claude Desktop, Claude Code, Codex CLI, Gemini CLI and others, and the agent pays over x402 from a wallet created with your email. Fund it with Coinbase Onramp (USDC), set limits per call and per session; Base, Polygon and Solana are supported.',
    docs: 'Docs',
    note: 'External service (by Coinbase)',
  },
  zh: {
    title: 'x402 × 个人智能体',
    body: '将 Coinbase 的 Payments MCP（Agentic Wallet MCP）接入 Claude Desktop、Claude Code、Codex CLI、Gemini CLI 等，即可从用邮箱创建的钱包通过 x402 支付。通过 Coinbase Onramp（USDC）充值，可按单次和单个会话设置上限，支持 Base、Polygon 和 Solana。',
    docs: '文档',
    note: '外部服务（由 Coinbase 提供）',
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
        <div className="order-first w-full max-w-[290px] mx-auto lg:order-none lg:w-[280px]">
          <Phone lang={lang} {...slides} />
        </div>
        <Callouts side="right" label={t.sideRight} items={t.callouts.slice(2, 4)} active={rail === 'x402'} extra={showPayMcp ? <PayMcpNote lang={lang} /> : undefined} />
      </div>
    </div>
  )
}
