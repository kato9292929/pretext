import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useLang } from '../i18n'
import { ENDPOINT } from '../data/services'

/* Home: a lead-in to x402 Endpoint, below the phone showcase. A snapshot of
   the top of its "Services the market already uses" list (catalog updated
   2026-11-08); logos are the ones the Endpoint site serves (public/endpoint-logos/).
   1P = the company's own domain, 3P = resold through a payment gateway. */

type Row = { name: string; logo?: string; mono?: string; party: '1P' | '3P'; via?: string; cat: string; price: string; count: number }

const ROWS: Row[] = [
  { name: 'QuickNode', logo: 'quicknode.ico', party: '1P', via: 'quicknode.com', cat: 'Other', price: 'From $0.001', count: 142 },
  { name: 'Apify', logo: 'apify-via.ico', party: '3P', cat: 'Messaging', price: 'From $0.005', count: 97 },
  { name: 'OpenAI', mono: 'OP', party: '3P', cat: 'Messaging', price: 'From $0.001', count: 60 },
  { name: 'Messari', logo: 'messari.svg', party: '1P', via: 'messari.io', cat: 'Media', price: 'Free', count: 47 },
  { name: 'Google', logo: 'google-via.ico', party: '3P', via: 'via fetcher.sh', cat: 'Messaging', price: 'From $0.003', count: 45 },
  { name: 'Replicate', logo: 'replicate-via.png', party: '3P', via: 'via Locus', cat: 'Messaging', price: 'From $0.003', count: 44 },
  { name: 'Vybe Network', logo: 'vybe-network.ico', party: '1P', via: 'vybenetwork.xyz', cat: 'Data', price: 'From $0.012', count: 44 },
  { name: 'Exa', logo: 'exa.png', party: '1P', via: 'exa.ai', cat: 'Search', price: 'Free', count: 43 },
  { name: 'Nansen', logo: 'nansen.png', party: '1P', via: 'nansen.ai', cat: 'Trading', price: 'From $0.01', count: 41 },
  { name: 'Polymarket', logo: 'polymarket-via.png', party: '3P', cat: 'Trading', price: 'From $0.001', count: 34 },
]

const COPY = {
  ja: {
    eyebrow: 'x402 Endpoint',
    title: 'エージェントが安全に払える API を、ひとつのカタログで',
    lead: '市場ですでに使われている 356 サービス（33,881 エンドポイント）から、上位を抜粋（2026年11月8日更新）。',
    endpoints: 'エンドポイント',
    note: '1P は自社ドメインでの提供、3P は決済ゲートウェイ経由の提供です。',
    cta: 'x402 Endpoint で全部見る',
  },
  en: {
    eyebrow: 'x402 Endpoint',
    title: 'APIs your agent can pay for safely, in one catalog',
    lead: 'The top of 356 services (33,881 endpoints) the market already uses (updated Nov 8, 2026).',
    endpoints: 'endpoints',
    note: '1P is served from the company’s own domain; 3P is resold through a payment gateway.',
    cta: 'See everything on x402 Endpoint',
  },
}

function Logo({ r }: { r: Row }) {
  if (r.logo) {
    return <img src={`/endpoint-logos/${r.logo}`} alt="" width={36} height={36} loading="lazy" className="h-9 w-9 shrink-0 rounded-lg bg-white object-contain p-1" />
  }
  return <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e9e7fb] text-[11px] font-bold text-[#3b2f9e]">{r.mono}</span>
}

export function EndpointTeaser() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative max-w-5xl mx-auto px-6 mt-16 md:mt-20"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-gold">{t.eyebrow}</p>
          <h3 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight text-fg">{t.title}</h3>
          <p className="mt-2 text-sm text-fg/55">{t.lead}</p>
        </div>
        <a href={ENDPOINT} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-fg/80 hover:text-gold transition-colors">
          {t.cta}
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <a
        href={ENDPOINT}
        target="_blank"
        rel="noopener noreferrer"
        className="liquid-glass mt-6 grid overflow-hidden rounded-2xl md:grid-cols-2 md:divide-x md:divide-fg/10"
      >
        {[ROWS.slice(0, 5), ROWS.slice(5, 10)].map((col, c) => (
          <ul key={c} className="divide-y divide-fg/10">
            {col.map((r) => (
              <li key={r.name} className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-fg/[0.04]">
                <Logo r={r} />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-sm font-medium text-fg">
                    <span className="truncate">{r.name}</span>
                    <span className={`rounded border px-1 font-mono text-[10px] ${r.party === '3P' ? 'border-fg/20 bg-fg/10 text-fg/80' : 'border-fg/25 text-fg/60'}`}>{r.party}</span>
                  </p>
                  <p className="truncate text-xs text-fg/45">{r.via ? `${r.via} · ${r.cat}` : r.cat}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm text-fg">{r.price}</p>
                  <p className="text-[11px] text-fg/45">
                    {r.count} {t.endpoints}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ))}
      </a>
      <p className="mt-3 text-[11px] text-fg/40">{t.note}</p>
    </motion.div>
  )
}
