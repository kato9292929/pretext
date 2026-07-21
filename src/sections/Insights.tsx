import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionEyebrow } from '../primitives'
import { FEATURED_ARTICLES } from '../articles'

export function Insights() {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28 border-t border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <SectionEyebrow label="Insights" tag="Research" heading />
          <p className="mt-4 text-white/60 text-base leading-[1.7] max-w-xl">
            エージェント決済の「現在地」を、一次情報から読み解く。委任付き自律決済から market
            の拡大まで、直近のトピックを深掘りしています。
          </p>
        </div>
        <a
          href="/research.html"
          className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-[#E8C338] transition-colors"
        >
          考察・調査をすべて見る
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </motion.div>

      <div className="mt-12 grid md:grid-cols-3 gap-5">
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
            <span className="text-xs font-medium tracking-wide text-[#E8C338]">{article.tag}</span>
            <h3 className="mt-4 text-base font-semibold text-white leading-[1.5] flex-1">
              {article.title}
            </h3>
            <p className="mt-3 text-sm text-white/55 leading-[1.7]">{article.blurb}</p>
            <span className="mt-5 pt-4 border-t border-white/10 inline-flex items-center gap-1 text-xs text-white/60 group-hover:text-[#E8C338] transition-colors">
              note で読む
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
