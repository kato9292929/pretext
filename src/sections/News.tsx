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

// Text-only articles listed below the image articles. Newest first.
type TextItem = { href: string; tag: string; title: Localized }

const TEXT_ITEMS: TextItem[] = [
  {
    href: 'https://note.com/x402inc/n/n724349b09132',
    tag: 'Stripe / Card',
    title: {
      ja: 'Stripe Crypto × Link単回利用カード：クリプトカードを通じたエージェント決済におけるステーブルコインの利活用',
      en: 'Stripe Crypto × Link single-use cards: using stablecoins for agent payments through crypto cards',
    },
  },
  {
    href: 'https://note.com/x402inc/n/n7599f46ae293',
    tag: 'Market',
    title: {
      ja: 'AIエージェントは「使う」から「何を買わせるか」へ——2026年の経営論点から見える次の調達市場',
      en: 'AI agents shift from “using them” to “what to let them buy” — the next procurement market seen through 2026 management issues',
    },
  },
  {
    href: 'https://note.com/x402inc/n/nef92962033bc',
    tag: 'Class 3 / 4',
    title: {
      ja: 'カードはエージェントを自律化しない——委任を安全に設計するClass 3と、x402が入るClass 4の境界',
      en: 'Cards don’t make agents autonomous — the boundary between Class 3 (safe delegation) and Class 4 (where x402 enters)',
    },
  },
  {
    href: 'https://note.com/x402inc/n/nfe72adaf9b89',
    tag: 'x402 Data',
    title: {
      ja: 'x402の出来高52.7Mの分解：スクリーニング後の商取引25.62Mとエージェント由来0.6〜7.5%（TRM Labs, 2026-09）',
      en: 'Breaking down x402’s 52.7M volume: 25.62M in commerce after screening, 0.6–7.5% agent-originated (TRM Labs, 2026-09)',
    },
  },
  {
    href: 'https://note.com/x402inc/n/n3fb3ec112b4d',
    tag: 'OSD / Japan',
    title: {
      ja: '日本株 Weekly Selection：Q2決算に集中する半導体サプライチェーン10銘柄のdated catalyst',
      en: 'Japan stocks Weekly Selection: dated catalysts for 10 semiconductor supply-chain names reporting Q2',
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

      {/* Text-only articles */}
      {TEXT_ITEMS.length > 0 && (
        <ul className="mt-12 grid md:grid-cols-2 gap-x-10 border-t border-fg/10">
          {TEXT_ITEMS.map((n) => (
            <li key={n.href} className="border-b border-fg/10">
              <a
                href={n.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 py-4"
              >
                <span className="flex-1">
                  <span
                    className="text-[11px] font-mono"
                    style={{ color: 'rgb(var(--gold))' }}
                  >
                    {n.tag}
                  </span>
                  <span className="mt-1 block text-sm text-fg/80 leading-[1.7] group-hover:text-gold transition-colors">
                    {n.title[lang]}
                  </span>
                </span>
                <ArrowUpRight className="mt-1 w-4 h-4 shrink-0 text-fg/35 group-hover:text-gold transition-colors" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
