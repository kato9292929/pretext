import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionEyebrow } from '../primitives'
import { useLang, type Localized } from '../i18n'

type NewsItem = {
  href: string
  image: string // put the file in public/news/
  tag: Localized
  title: Localized
  date?: string // e.g. '2026-09-01'
  summary?: Localized // shown only on the lead (first) item
}

// Newest first. The first item is the large lead; the rest (up to 4) list on the right.
const NEWS: NewsItem[] = [
  {
    href: 'https://prtimes.jp/main/html/rd/p/000000004.000188987.html',
    image: '/news/jba.jpg',
    tag: { ja: 'プレスリリース', en: 'Press release' },
    title: {
      ja: 'x402株式会社、一般社団法人日本ブロックチェーン協会（JBA）にシルバー会員として入会',
      en: 'x402 Inc. joins the Japan Blockchain Association (JBA) as a silver member',
    },
  },
  {
    href: 'https://prtimes.jp/main/html/rd/p/000000002.000188987.html',
    image: '/news/jcba.jpg',
    tag: { ja: 'プレスリリース', en: 'Press release' },
    title: {
      ja: 'x402株式会社、一般社団法人日本暗号資産ビジネス協会（JCBA）に準会員として入会',
      en: 'x402 Inc. joins the Japan Cryptoasset Business Association (JCBA) as an associate member',
    },
  },
]

const MAX_ITEMS = 5
const ease = [0.22, 1, 0.36, 1] as const

function Tag({ label }: { label: string }) {
  return (
    <span
      className="inline-block text-[11px] px-2 py-0.5 rounded border"
      style={{ color: 'rgb(var(--gold))', borderColor: 'rgb(var(--gold) / 0.4)' }}
    >
      {label}
    </span>
  )
}

function formatDate(date: string, lang: 'ja' | 'en') {
  const d = new Date(`${date}T00:00:00+09:00`)
  return lang === 'ja'
    ? `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
    : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function News() {
  const { lang } = useLang()
  const [lead, ...rest] = NEWS.slice(0, MAX_ITEMS)
  if (!lead) return null
  return (
    <section id="updates" className="relative z-10 max-w-6xl mx-auto px-6 py-14 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
      >
        <SectionEyebrow label="Update" tag={lang === 'ja' ? '最新情報' : 'Latest'} heading />
      </motion.div>

      <div className="mt-10 grid gap-10 md:grid-cols-[1.15fr_1fr]">
        {/* Lead article */}
        <motion.a
          href={lead.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="group block"
        >
          <div className="overflow-hidden rounded-xl border border-fg/10">
            <img
              src={lead.image}
              alt=""
              className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
          <div className="mt-5">
            <Tag label={lead.tag[lang]} />
          </div>
          <h3 className="mt-4 border-l-2 border-gold pl-4 text-xl md:text-2xl font-semibold leading-[1.5] text-fg group-hover:text-gold transition-colors">
            {lead.title[lang]}
          </h3>
          {lead.date && <p className="mt-3 text-xs text-fg/45">{formatDate(lead.date, lang)}</p>}
          {lead.summary && (
            <p className="mt-4 text-sm text-fg/60 leading-[1.8]">{lead.summary[lang]}</p>
          )}
          <span className="mt-4 inline-flex items-center gap-1 text-xs text-fg/50 group-hover:text-gold transition-colors">
            PR TIMES
            <ArrowUpRight className="w-3 h-3" />
          </span>
        </motion.a>

        {/* Other articles */}
        <div className="flex flex-col divide-y divide-fg/10">
          {rest.map((n, i) => (
            <motion.a
              key={n.href}
              href={n.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.06 }}
              className="group grid grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr] gap-4 py-5 first:pt-0"
            >
              <div className="self-start overflow-hidden rounded-lg border border-fg/10">
                <img
                  src={n.image}
                  alt=""
                  className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div>
                <Tag label={n.tag[lang]} />
                <p className="mt-2 border-l-2 border-gold/70 pl-3 text-sm font-semibold leading-[1.6] text-fg group-hover:text-gold transition-colors">
                  {n.title[lang]}
                </p>
                {n.date && <p className="mt-2 text-xs text-fg/45">{formatDate(n.date, lang)}</p>}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
