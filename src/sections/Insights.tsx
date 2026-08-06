import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionEyebrow } from '../primitives'
import { FEATURED_ARTICLES } from '../articles'
import { useLang, type Localized } from '../i18n'

const COPY = {
  ja: {
    subtext:
      'エージェント決済の「現在地」を、一次情報から読み解く。用途別の細分化から market の拡大まで、直近のトピックを深掘りしています。',
    picks: 'ピックアップ',
    seeAll: '考察・調査をすべて見る',
    read: 'note で読む',
  },
  en: {
    subtext:
      'Reading the current state of agent payments from primary sources — from use-case segmentation to market expansion, we dig into the latest topics.',
    picks: 'Selected',
    seeAll: 'See all research',
    read: 'Read on note',
  },
}

const RANKED: { title: Localized; href: string }[] = [
  {
    title: {
      ja: '社内AIエージェントの3つの提供形態：実行費用の出どころと統制の置き場所（Class 1〜3）',
      en: 'Three deployment models for in-house AI agents: where run costs come from and where control sits (Class 1–3)',
    },
    href: 'https://note.com/x402inc/n/n8b1822d72ed2',
  },
  {
    title: {
      ja: 'バックオフィス × AIエージェント：Y CombinatorのqmとStripe Approvalsで起案と承認を分ける実装記録',
      en: 'Back office × AI agents: separating drafting from approval with Y Combinator’s qm and Stripe Approvals — an implementation log',
    },
    href: 'https://note.com/x402inc/n/n15fbfb8b90a6',
  },
  {
    title: {
      ja: 'Agent Economy Classes｜サマリー：決済が発生するのは5つのうち2つだけという結論と、各Classに残る未確認',
      en: 'Agent Economy Classes | Summary: payment occurs in only 2 of the 5, and what stays unverified in each Class',
    },
    href: 'https://note.com/x402inc/n/n7114e5139b4c',
  },
  {
    title: {
      ja: 'Agentic Commerce 6事例の決済経路整理：選択肢としてのx402によるH to A市場の拡大',
      en: 'Mapping the payment paths of six Agentic Commerce cases: expanding the H-to-A market with x402 as an option',
    },
    href: 'https://note.com/x402inc/n/n75db170cdf58',
  },
  {
    title: {
      ja: 'x402 × The Agentic Economy（第8回）agent-to-agent laborの現在地',
      en: 'x402 × The Agentic Economy (Part 8): the current state of agent-to-agent labor',
    },
    href: 'https://note.com/x402inc/n/n3832d071a4ee',
  },
  {
    title: {
      ja: 'エージェント経済とオンチェーン経済の同一性——x402 Inc.のMAP・CONSUME・PRODUCE',
      en: 'The sameness of the agent economy and the on-chain economy — x402 Inc.’s MAP / CONSUME / PRODUCE',
    },
    href: 'https://note.com/x402inc/n/n2c3c515b750a',
  },
]

export function Insights() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-14 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <SectionEyebrow label="Insights" tag="Research" heading />
          <p className="mt-4 text-fg/60 text-base leading-[1.7] max-w-xl">{t.subtext}</p>
        </div>
        <a
          href="/research.html"
          className="inline-flex items-center gap-1.5 text-sm text-fg/70 hover:text-gold transition-colors"
        >
          {t.seeAll}
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </motion.div>

      {/* Ranked picks (above the three cards) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8"
      >
        <p className="text-xs uppercase tracking-widest text-fg/40">{t.picks}</p>
        <ol className="mt-3 liquid-glass rounded-2xl px-1.5 py-1 sm:px-2">
          {RANKED.map((a, i) => (
            <li key={a.href}>
              <a
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline gap-4 border-b border-fg/10 px-3 py-3 last:border-0 rounded-lg hover:bg-fg/[0.03] transition-colors"
              >
                <span className="w-5 shrink-0 font-mono text-sm tabular-nums text-gold">
                  {i + 1}
                </span>
                <span className="flex-1 text-sm text-fg/80 leading-[1.55] group-hover:text-fg transition-colors">
                  {a.title[lang]}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0 translate-y-0.5 text-fg/30 group-hover:text-gold transition-colors" />
              </a>
            </li>
          ))}
        </ol>
      </motion.div>

      <div className="mt-10 grid md:grid-cols-3 gap-5">
        {FEATURED_ARTICLES.map((article, i) => (
          <motion.a
            key={article.href}
            href={article.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
            className="liquid-glass rounded-2xl p-6 flex flex-col group"
          >
            <span className="text-xs font-medium tracking-wide text-gold">
              {article.tag[lang]}
            </span>
            <h3 className="mt-4 text-base font-semibold text-fg leading-[1.5] flex-1">
              {article.title[lang]}
            </h3>
            <p className="mt-3 text-sm text-fg/55 leading-[1.7]">{article.blurb[lang]}</p>
            <span className="mt-5 pt-4 border-t border-fg/10 inline-flex items-center gap-1 text-xs text-fg/60 group-hover:text-gold transition-colors">
              {t.read}
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
