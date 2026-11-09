import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useLang, type Localized } from '../i18n'

/* Home: x402 docs from Stripe, Cloudflare and the x402 Foundation, side by
   side under the x402 Endpoint lead-in. Images are each page's share image
   (public/docs-links/). */

type Doc = { img: string; title: string; desc: Localized; host: string; href: string }

const DOCS: Doc[] = [
  {
    img: '/docs-links/stripe-x402.png',
    title: 'Stripe Docs — x402',
    desc: { ja: 'x402 でエージェントからの支払いを受け付ける', en: 'Use x402 to accept payments from agents' },
    host: 'docs.stripe.com',
    href: 'https://docs.stripe.com/payments/machine/x402',
  },
  {
    img: '/docs-links/cloudflare-x402.png',
    title: 'Cloudflare Agents — x402',
    desc: { ja: 'Cloudflare の Agents で x402 の支払いを扱う', en: 'Handle x402 payments with Cloudflare Agents' },
    host: 'developers.cloudflare.com',
    href: 'https://developers.cloudflare.com/agents/tools/payments/x402/',
  },
  {
    img: '/docs-links/x402-foundation.jpg',
    title: 'x402 Foundation',
    desc: { ja: 'x402 の仕様と、Linux Foundation 傘下の x402 Foundation', en: 'The x402 standard and the x402 Foundation under the Linux Foundation' },
    host: 'x402.org',
    href: 'https://x402.org/',
  },
]

export function DocsLinks() {
  const { lang } = useLang()
  return (
    <div className="relative max-w-5xl mx-auto px-6 mt-16 md:mt-20">
      <p className="text-xs tracking-widest text-gold">{lang === 'ja' ? 'x402 のドキュメント' : 'x402 docs'}</p>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {DOCS.map((d, k) => (
          <motion.a
            key={d.href}
            href={d.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: k * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="liquid-glass group block overflow-hidden rounded-2xl"
          >
            <div className="aspect-[1200/630] overflow-hidden bg-white">
              <img src={d.img} alt={d.title} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
            </div>
            <div className="p-4">
              <p className="flex items-center justify-between gap-2 text-sm font-semibold text-fg">
                {d.title}
                <ArrowUpRight className="h-4 w-4 shrink-0 text-fg/50 transition-colors group-hover:text-gold" />
              </p>
              <p className="mt-1 text-xs text-fg/55 leading-[1.7]">{d.desc[lang]}</p>
              <p className="mt-2 font-mono text-[11px] text-fg/40">{d.host}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  )
}
