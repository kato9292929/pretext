import { useLang } from '../i18n'

/* Two phones (Agentic Commerce on the left, x402 on the right) as one still
   image, with a short note on each screen beside it. The images are built
   from the site's own chat screens set into a phone mockup
   (public/showcase/phones-{ja,en}.webp). Used at the top of about.html; the
   home hero uses ShowcaseCompact. */

const COPY = {
  ja: {
    alt: 'Agentic Commerce と x402 で、エージェントが支払うチャット画面',
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
    alt: 'Chat screens of an agent paying with Agentic Commerce and with x402',
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

function Callouts({ side, label, items }: { side: 'left' | 'right'; label: string; items: string[][] }) {
  const right = side === 'right'
  return (
    <div className={`flex flex-col items-start gap-5 ${right ? 'lg:items-start lg:text-left' : 'lg:items-end lg:text-right'}`}>
      <span className="rounded-full border border-fg/30 px-3 py-1 font-mono text-[11px] text-fg/80">{label}</span>
      {items.map(([title, body]) => (
        <div key={title} className="relative max-w-[15rem]">
          {/* connector toward the phone */}
          <span aria-hidden="true" className={`absolute top-2.5 hidden h-px w-8 bg-fg/30 lg:block ${right ? '-left-10' : '-right-10'}`} />
          <span aria-hidden="true" className={`absolute top-[7px] hidden h-1.5 w-1.5 rounded-full bg-fg/60 lg:block ${right ? '-left-[43px]' : '-right-[43px]'}`} />
          <p className="text-sm font-semibold text-fg">{title}</p>
          <p className="mt-1 text-xs text-fg/55 leading-[1.7]">{body}</p>
        </div>
      ))}
    </div>
  )
}

/* Compact version for the home hero: the image, then the notes in two
   columns (left phone / right phone) under it. */
export function ShowcaseCompact() {
  const { lang } = useLang()
  const t = COPY[lang]
  const cols: [string, string[][]][] = [
    [t.sideLeft, t.callouts.slice(0, 2)],
    [t.sideRight, t.callouts.slice(2, 4)],
  ]
  return (
    <div className="w-full">
      <img
        src={`/showcase/phones-${lang}.webp`}
        alt={t.alt}
        width={1600}
        height={1034}
        className="mx-auto w-full select-none"
        draggable={false}
        fetchPriority="high"
      />
      <div className="mt-4 grid grid-cols-2 gap-5 text-left">
        {cols.map(([label, items]) => (
          <div key={label}>
            <span className="rounded-full border border-fg/30 px-2.5 py-0.5 font-mono text-[10px] text-fg/80">{label}</span>
            {items.map(([title, body]) => (
              <div key={title} className="mt-3">
                <p className="text-xs font-semibold text-fg">{title}</p>
                <p className="mt-0.5 text-[11px] text-fg/50 leading-[1.6]">{body}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function AgentShowcase() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <div className="relative max-w-7xl mx-auto px-6 grid gap-10 lg:grid-cols-[1fr_minmax(0,46rem)_1fr] lg:items-center lg:gap-10">
      <Callouts side="left" label={t.sideLeft} items={t.callouts.slice(0, 2)} />
      <div className="order-first lg:order-none">
        <img
          src={`/showcase/phones-${lang}.webp`}
          alt={t.alt}
          width={1600}
          height={1034}
          className="mx-auto w-full max-w-[46rem] select-none"
          draggable={false}
        />
      </div>
      <Callouts side="right" label={t.sideRight} items={t.callouts.slice(2, 4)} />
    </div>
  )
}
