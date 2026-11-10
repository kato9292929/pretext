import { motion } from 'motion/react'
import { ArrowDown, ShieldCheck } from 'lucide-react'
import { SectionEyebrow } from '../primitives'
import { useLang } from '../i18n'

/* Home: how x402 Inc. runs — one priority queue, a chief-of-staff agent
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
    lead: '代表1人と、Agent Stack の4層で常時稼働するエージェントで会社を動かしています。',
    queueTitle: '一つの優先キュー',
    queueBody: ['決めること・レビューすることのすべてがここに集まる', '各レビューには成果物（データ・分析・決済記録）が付く'],
    queueNote: '4層ごとに散らばっていた確認事項を一つに集約し、切り替えの負担を減らす',
    cosLabel: 'チーフ・オブ・スタッフ・エージェント',
    cosBody: 'Muse：MAP・CONSUME・PRODUCE・MARKET の4層を統括する',
    toQueue: '案件はキューへ集約',
    oversee: '統括する',
    leadsLabel: 'リードエージェント（Agent Stack の4層ごとに常時稼働／ChatGPT・Claude Code）',
    brainTitle: '学習ループ：「x402 Agentic Brain」',
    brainBody: ['システムは代表の好みを学び続け、代表の判断を「x402 Agentic Brain」に蒸留する', 'そのため、推薦と初稿は代表に届く前に良くなる', '目標：変更1件あたりの修正回数を減らす'],
    review: 'すべての変更は、人間のレビューとセキュリティチェックを通る',
    ceoNote: '決断・レビューの依頼はバッチでさばく。リードは、代表が考えていなかった論点も持ち帰る',
  },
  en: {
    lead: 'One founder and agents running around the clock on each of the four Agent Stack layers run the company.',
    queueTitle: 'One priority queue',
    queueBody: ['Everything to decide or review lands here', 'Each review comes with its output (data, analysis, payment records)'],
    queueNote: 'Checks once scattered across four layers sit in one place, cutting the cost of switching',
    cosLabel: 'Chief-of-staff agent',
    cosBody: 'Muse: oversees the four layers — MAP, CONSUME, PRODUCE and MARKET',
    toQueue: 'Items go to the queue',
    oversee: 'Oversees',
    leadsLabel: 'Lead agents (always on, one per Agent Stack layer / ChatGPT · Claude Code)',
    brainTitle: 'Learning loop: “x402 Agentic Brain”',
    brainBody: ['The system keeps learning the founder’s preferences and distills the founder’s judgment into the “x402 Agentic Brain”', 'So recommendations and first drafts improve before they reach the founder', 'Goal: fewer revisions per change'],
    review: 'Every change goes through human review and a security check',
    ceoNote: 'Decisions and review requests are handled in batches. Leads also bring back points the founder had not considered',
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

export function Team() {
  const { lang } = useLang()
  const t = COPY[lang]
  const layers = LAYERS[lang]
  return (
    <section id="team" className="relative z-10 max-w-6xl mx-auto px-6 py-14 md:py-20">
      <motion.div {...fade()} className="max-w-2xl">
        <SectionEyebrow label="Team" tag="x402 Inc." heading />
        <p className="mt-6 text-fg/60 text-base leading-[1.7]">{t.lead}</p>
      </motion.div>

      <div className="mt-10">
        {/* priority queue */}
        <motion.div {...fade()} className="liquid-glass mx-auto max-w-2xl rounded-2xl p-5 text-center">
          <p className="text-lg font-semibold text-fg">{t.queueTitle}</p>
          {t.queueBody.map((l) => (
            <p key={l} className="mt-1 text-sm text-fg/60">{l}</p>
          ))}
        </motion.div>
        <p className="mt-3 text-center text-xs text-fg/45">{t.queueNote}</p>
        <div className="flex items-center justify-center gap-2 py-3 text-xs text-fg/45">
          <ArrowDown className="h-4 w-4 rotate-180" />
          {t.toQueue}
        </div>

        {/* chief of staff */}
        <motion.div {...fade(0.05)} className="liquid-glass mx-auto flex max-w-2xl items-center gap-5 rounded-2xl p-5">
          <img src="/team/muse.webp" alt="Muse" width={88} height={88} className="h-20 w-20 shrink-0 rounded-2xl object-cover md:h-[88px] md:w-[88px]" />
          <div>
            <p className="text-xs tracking-widest text-gold">{t.cosLabel}</p>
            <p className="mt-1 text-lg font-semibold text-fg">Muse</p>
            <p className="mt-1 text-sm text-fg/60">{t.cosBody}</p>
          </div>
        </motion.div>
        <Down label={t.oversee} />

        {/* lead agents per layer */}
        <p className="text-center text-sm font-medium text-fg/75">{t.leadsLabel}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {layers.map((l, k) => (
            <motion.div key={l.name} {...fade(k * 0.06)} className="liquid-glass rounded-2xl p-4 text-center">
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
        <motion.div {...fade()} className="mt-6 rounded-2xl border border-gold/40 bg-gold/[0.06] p-5 text-center">
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
        <motion.div {...fade()} className="mx-auto flex max-w-md items-center gap-5 rounded-2xl bg-fg p-5 text-bg">
          <img src="/team/ceo.webp" alt="Katomasa" width={88} height={88} className="h-20 w-20 shrink-0 rounded-2xl object-cover md:h-[88px] md:w-[88px]" />
          <div>
            <p className="text-xs tracking-widest opacity-60">CEO</p>
            <p className="text-2xl font-semibold">Katomasa</p>
          </div>
        </motion.div>
        <p className="mx-auto mt-3 max-w-md text-center text-xs text-fg/45 leading-[1.7]">{t.ceoNote}</p>
      </div>
    </section>
  )
}
