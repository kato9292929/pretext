import { createRef, useEffect, useRef, useState, type RefObject } from 'react'
import { motion } from 'motion/react'
import { ArrowDown, ShieldCheck } from 'lucide-react'
import { SectionEyebrow } from '../primitives'
import { useLang } from '../i18n'

/* Home: how x402 Inc. runs — a chief-of-staff agent
   (Muse), lead agents on each Agent Stack layer (ChatGPT / Claude Code),
   the "x402 Agentic Brain" learning loop, and the CEO. From the team diagram
   (x402_team.pdf); images in public/team/. */

const LAYERS = {
  ja: [
    { name: 'MAP', role: '発見', head: 'エンドポイントを日次で収集・正規化', items: ['x402対応エンドポイントのカタログ', '何が・いくらで買えるかを観測する'] },
    { name: 'CONSUME', role: '消費', head: 'per-callでオンチェーン決済し記録する', items: ['ERC-8004 identity を持つエージェント', '取引の形式を検証する instrument'] },
    { name: 'PRODUCE', role: 'データ生成', head: '独自データと検証可能な実績を作る', items: ['エージェント向けのデータ', '叩かれる側を観測する'] },
    { name: 'MARKET', role: '市場', head: '売り手を比べ、測る場を作る', items: ['買い手が条件を出し、売り手が競う（E5）', '売り手の402・決済・納品を外から測る（E4）'] },
  ],
  en: [
    { name: 'MAP', role: 'Discover', head: 'Collect and normalize endpoints daily', items: ['A catalog of x402 endpoints', 'Observe what can be bought, at what price'] },
    { name: 'CONSUME', role: 'Consume', head: 'Pay per call on-chain and record it', items: ['Agents with an ERC-8004 identity', 'An instrument that checks how trades are formed'] },
    { name: 'PRODUCE', role: 'Produce data', head: 'Build our own data and a verifiable record', items: ['Data made for agents', 'Observe the side that gets called'] },
    { name: 'MARKET', role: 'Market', head: 'Build a place to compare and measure sellers', items: ['Buyers post conditions; sellers compete (E5)', 'Measure sellers’ 402, payment and delivery from outside (E4)'] },
  ],
}

const COPY = {
  ja: {
    lead: 'Agent Stack の4層で常時稼働するエージェントで会社を動かしています。',
    cosLabel: 'チーフ・オブ・スタッフ・エージェント',
    cosBody: 'Muse：MAP・CONSUME・PRODUCE・MARKET の4層を統括する',
    cosItems: ['4層の決めること・レビューすることを、優先順位をつけて1か所にまとめる', '各レビューに成果物（データ・分析・決済記録）を付けて代表に渡す'],
    oversee: '統括する',
    leadsLabel: 'リードエージェント（Agent Stack の4層ごとに常時稼働／ChatGPT・Claude Code）',
    brainTitle: '学習ループ：「x402 Agentic Brain」',
    brainBody: ['システムは代表の好みを学び続け、代表の判断を「x402 Agentic Brain」に蒸留する', 'そのため、推薦と初稿は代表に届く前に良くなる', '目標：変更1件あたりの修正回数を減らす'],
    review: 'すべての変更は、人間のレビューとセキュリティチェックを通る',
    ceoNote: '決断・レビューの依頼はバッチでさばく。リードは、代表が考えていなかった論点も持ち帰る',
    arrowAsk: ['決断・レビューの依頼', 'バッチでさばく'],
    arrowBack: ['リードは、代表が考えていなかった', '論点も持ち帰る'],
    arrowLearn: ['代表の判断・好みを学習', '改善された推薦・初稿が戻る'],
  },
  en: {
    lead: 'Agents running around the clock on each of the four Agent Stack layers run the company.',
    cosLabel: 'Chief-of-staff agent',
    cosBody: 'Muse: oversees the four layers — MAP, CONSUME, PRODUCE and MARKET',
    cosItems: ['Gathers everything to decide or review across the four layers into one prioritized place', 'Hands each review to the founder with its output (data, analysis, payment records)'],
    oversee: 'Oversees',
    leadsLabel: 'Lead agents (always on, one per Agent Stack layer / ChatGPT · Claude Code)',
    brainTitle: 'Learning loop: “x402 Agentic Brain”',
    brainBody: ['The system keeps learning the founder’s preferences and distills the founder’s judgment into the “x402 Agentic Brain”', 'So recommendations and first drafts improve before they reach the founder', 'Goal: fewer revisions per change'],
    review: 'Every change goes through human review and a security check',
    ceoNote: 'Decisions and review requests are handled in batches. Leads also bring back points the founder had not considered',
    arrowAsk: ['Decision and review requests', 'handled in batches'],
    arrowBack: ['Leads also bring back points', 'the founder had not considered'],
    arrowLearn: ['Learns the founder’s judgment and taste', 'Better recommendations and drafts come back'],
  },
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
})

function Down({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-3 text-xs text-fg/45">
      <ArrowDown className="h-4 w-4" />
      {label}
    </div>
  )
}

type Box = { left: number; right: number; top: number; bottom: number; cy: number; h: number }

/* Measures the boxes the arrows connect, relative to the diagram container,
   and keeps them current as the layout or images change. */
function useBoxes(container: RefObject<HTMLDivElement>, refs: Record<string, RefObject<HTMLDivElement>>) {
  const [boxes, setBoxes] = useState<Record<string, Box> | null>(null)
  useEffect(() => {
    const root = container.current
    if (!root) return
    const measure = () => {
      const c = root.getBoundingClientRect()
      const out: Record<string, Box> = {}
      for (const [k, r] of Object.entries(refs)) {
        const el = r.current
        if (!el) return
        const b = el.getBoundingClientRect()
        out[k] = { left: b.left - c.left, right: b.right - c.left, top: b.top - c.top, bottom: b.bottom - c.top, cy: b.top - c.top + b.height / 2, h: b.height }
      }
      out.root = { left: 0, right: c.width, top: 0, bottom: c.height, cy: c.height / 2, h: c.height }
      setBoxes(out)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(root)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [container, refs])
  return boxes
}

/* The diagram's loops, drawn on lg screens:
   Muse ⇄ CEO (requests in batches), MAP lead → CEO (points brought back),
   Muse → learning loop → Muse (the founder's judgment is learned; better
   drafts come back). */
function Arrows({ b, t }: { b: Record<string, Box>; t: (typeof COPY)['ja'] }) {
  const { m, l, brain, ceo, root } = b
  const q = m
  const W = root.right
  const outer = 14
  const inner = 40
  const paths = {
    ask: `M ${q.left} ${q.cy} H ${inner} V ${ceo.top + ceo.h * 0.35} H ${ceo.left}`,
    back: `M ${l.left} ${l.cy} H ${outer} V ${ceo.top + ceo.h * 0.68} H ${ceo.left}`,
    learn: `M ${q.right} ${q.top + q.h * 0.35} H ${W - outer} V ${brain.top + brain.h * 0.68} H ${brain.right}`,
    give: `M ${brain.right} ${brain.top + brain.h * 0.32} H ${W - inner} V ${q.top + q.h * 0.68} H ${q.right}`,
  }
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
      <svg className="absolute inset-0 h-full w-full overflow-visible" fill="none">
        <defs>
          <marker id="team-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="rgb(var(--fg) / 0.6)" />
          </marker>
          <marker id="team-arrow-gold" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="#E0A63A" />
          </marker>
        </defs>
        <path d={paths.ask} stroke="rgb(var(--fg) / 0.45)" strokeWidth="1.5" markerStart="url(#team-arrow)" markerEnd="url(#team-arrow)" />
        <path d={paths.back} stroke="rgb(var(--fg) / 0.45)" strokeWidth="1.5" markerEnd="url(#team-arrow)" />
        <path d={paths.learn} stroke="#E0A63A" strokeOpacity="0.85" strokeWidth="1.5" markerEnd="url(#team-arrow-gold)" />
        <path d={paths.give} stroke="#E0A63A" strokeOpacity="0.85" strokeWidth="1.5" markerEnd="url(#team-arrow-gold)" />
      </svg>
      <div className="absolute text-[11px] leading-[1.5] text-fg/55" style={{ left: inner + 8, top: q.cy - 40, width: q.left - inner - 16 }}>
        {t.arrowAsk.map((x) => <p key={x}>{x}</p>)}
      </div>
      <div className="absolute text-[11px] leading-[1.5] text-fg/55" style={{ left: outer + 8, top: ceo.top + ceo.h * 0.68 + 8, width: ceo.left - outer - 16 }}>
        {t.arrowBack.map((x) => <p key={x}>{x}</p>)}
      </div>
      <div className="absolute text-right text-[11px] leading-[1.5] text-[#E0A63A]" style={{ right: inner + 8, top: m.bottom + 10, width: W - m.right - inner - 16 + 120 }}>
        {t.arrowLearn.map((x) => <p key={x}>{x}</p>)}
      </div>
    </div>
  )
}

export function Team() {
  const { lang } = useLang()
  const t = COPY[lang]
  const layers = LAYERS[lang]
  const root = useRef<HTMLDivElement>(null)
  const [refs] = useState(() => ({
    m: createRef<HTMLDivElement>(),
    l: createRef<HTMLDivElement>(),
    brain: createRef<HTMLDivElement>(),
    ceo: createRef<HTMLDivElement>(),
  }))
  const boxes = useBoxes(root, refs)
  return (
    <section id="team" className="relative z-10 max-w-6xl mx-auto px-6 py-14 md:py-20">
      <motion.div {...fade()} className="max-w-2xl">
        <SectionEyebrow label="Team" tag="x402 Inc." heading />
        <p className="mt-6 text-fg/60 text-base leading-[1.7]">{t.lead}</p>
      </motion.div>

      {/* lg: side padding leaves room for the loop arrows */}
      <div ref={root} className="relative mt-10 lg:px-24">
        {boxes && <Arrows b={boxes} t={t} />}
        {/* chief of staff */}
        <motion.div ref={refs.m} {...fade(0.05)} className="liquid-glass mx-auto flex max-w-2xl items-center gap-5 rounded-2xl p-5">
          <img src="/team/muse.webp" alt="Muse" width={88} height={88} className="h-20 w-20 shrink-0 rounded-2xl object-cover md:h-[88px] md:w-[88px]" />
          <div>
            <p className="text-xs tracking-widest text-gold">{t.cosLabel}</p>
            <p className="mt-1 text-lg font-semibold text-fg">Muse</p>
            <p className="mt-1 text-sm text-fg/60">{t.cosBody}</p>
            <ul className="mt-2 space-y-1">
              {t.cosItems.map((x) => (
                <li key={x} className="flex gap-2 text-xs text-fg/50 leading-[1.6]">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-fg/40" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
        <Down label={t.oversee} />

        {/* lead agents per layer */}
        <p className="text-center text-sm font-medium text-fg/75">{t.leadsLabel}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {layers.map((l, k) => (
            <motion.div key={l.name} ref={k === 0 ? refs.l : undefined} {...fade(k * 0.06)} className="liquid-glass rounded-2xl p-4 text-center">
              <div className="flex justify-center gap-2">
                <img src="/team/lead-chatgpt.webp" alt="ChatGPT" width={64} height={64} loading="lazy" className="h-16 w-16 rounded-xl object-cover" />
                <img src="/team/lead-claude-code.webp" alt="Claude Code" width={64} height={64} loading="lazy" className="h-16 w-16 rounded-xl object-cover" />
              </div>
              <p className="mt-3 text-sm font-semibold text-fg">
                {l.name}
                <span className="ml-1 text-fg/50">（{l.role}）</span>
              </p>
              <p className="mt-1 text-sm text-fg/80">{l.head}</p>
              {l.items.map((i) => (
                <p key={i} className="mt-1 text-xs text-fg/50 leading-[1.6]">{i}</p>
              ))}
            </motion.div>
          ))}
        </div>

        {/* learning loop + review */}
        <motion.div ref={refs.brain} {...fade()} className="mt-6 rounded-2xl border border-gold/40 bg-gold/[0.06] p-5 text-center">
          <p className="text-lg font-semibold text-fg">{t.brainTitle}</p>
          {t.brainBody.map((l) => (
            <p key={l} className="mt-1 text-sm text-fg/65">{l}</p>
          ))}
        </motion.div>
        <motion.div {...fade()} className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-fg/15 p-4 text-sm text-fg/75">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          {t.review}
        </motion.div>
        <Down label="" />

        {/* CEO */}
        <motion.div ref={refs.ceo} {...fade()} className="liquid-glass mx-auto flex max-w-xs items-center gap-4 rounded-2xl p-4">
          <img src="/team/ceo.webp" alt="Katomasa" width={56} height={56} className="h-14 w-14 shrink-0 rounded-xl object-cover" />
          <div>
            <p className="text-xs tracking-widest text-gold">CEO</p>
            <p className="mt-0.5 text-lg font-semibold text-fg">Katomasa</p>
          </div>
        </motion.div>
        {/* below lg the arrows are not drawn, so their meaning is spelled out */}
        <p className="mx-auto mt-3 max-w-md text-center text-xs text-fg/45 leading-[1.7] lg:hidden">{t.ceoNote}</p>
      </div>
    </section>
  )
}
