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

/* Home hero version: the notes sit around the image (top and bottom
   corners) with thin diagonal leader lines to each phone's edge. Below
   lg the notes fall back to two columns under the image.
   Geometry is in % of a 10:9 box; the image fills x 6–86, y 21.3–78.7. */
const NOTE_POS = [
  // [box classes, line start (x, y), point on the phone's edge (x, y)]
  { box: 'left-0 top-0 w-[36%]', from: [20, 17], to: [27.8, 36] }, // Agentic Commerce, top-left
  { box: 'left-0 top-[85%] w-[36%]', from: [14, 83], to: [13.4, 67.3] }, // Agentic Commerce, bottom-left
  { box: 'right-0 top-0 w-[34%]', from: [74, 17], to: [65.5, 34.9] }, // x402, top-right
  { box: 'right-0 top-[85%] w-[34%]', from: [80, 83], to: [65.5, 65.3] }, // x402, bottom-right
] as const

function Note({ label, title, body }: { label?: string; title: string; body: string }) {
  return (
    <div>
      {label && <span className="mb-2 inline-block rounded-full border border-fg/30 px-2.5 py-0.5 font-mono text-[10px] text-fg/80">{label}</span>}
      <p className="text-xs font-semibold text-fg">{title}</p>
      <p className="mt-0.5 text-[11px] text-fg/50 leading-[1.6]">{body}</p>
    </div>
  )
}

export function ShowcaseCompact() {
  const { lang } = useLang()
  const t = COPY[lang]
  // order matches NOTE_POS: left phone top, left phone bottom, right phone top, right phone bottom
  const notes = [
    { label: t.sideLeft, item: t.callouts[0] },
    { item: t.callouts[1] },
    { label: t.sideRight, item: t.callouts[2] },
    { item: t.callouts[3] },
  ]
  const img = (
    <img
      src={`/showcase/phones-${lang}.webp`}
      alt={t.alt}
      width={1600}
      height={1034}
      className="w-full select-none"
      draggable={false}
      fetchPriority="high"
    />
  )
  return (
    <>
      {/* lg and up: notes around the image with leader lines */}
      <div className="relative hidden aspect-[10/9] w-full lg:block">
        <div className="absolute left-[6%] top-[21.3%] w-[80%]">{img}</div>
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {NOTE_POS.map((n, k) => (
            <line
              key={k}
              x1={n.from[0]}
              y1={n.from[1]}
              x2={n.to[0]}
              y2={n.to[1]}
              stroke="rgb(var(--fg))"
              strokeOpacity={0.45}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        {NOTE_POS.map((n, k) => (
          <span
            key={k}
            aria-hidden="true"
            className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0b2a5c] ring-[3px] ring-white/80 shadow-[0_0_0_6px_rgba(255,255,255,0.18)]"
            style={{ left: `${n.to[0]}%`, top: `${n.to[1]}%` }}
          />
        ))}
        {NOTE_POS.map((n, k) => (
          <div key={k} className={`absolute ${n.box}`}>
            <Note label={notes[k].label} title={notes[k].item[0]} body={notes[k].item[1]} />
          </div>
        ))}
      </div>

      {/* below lg: image, then the notes in two columns */}
      <div className="lg:hidden">
        {img}
        <div className="mt-4 grid grid-cols-2 gap-5 text-left">
          {[notes.slice(0, 2), notes.slice(2, 4)].map((col, c) => (
            <div key={c} className="space-y-3">
              {col.map((n) => (
                <Note key={n.item[0]} label={n.label} title={n.item[0]} body={n.item[1]} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
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
