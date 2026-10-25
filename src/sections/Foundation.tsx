import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionEyebrow } from '../primitives'
import { useLang } from '../i18n'

const COPY = {
  ja: {
    lead: 'x402は、Coinbaseが開発したHTTPペイメント・プロトコルで、現在はLinux Foundation傘下のx402 Foundationが中立的に管理するオープンスタンダードです。x402 Foundationは当初Coinbase・Cloudflare・Stripeの3社が立ち上げ、2026年7月14日にLinux Foundationの下で40組織を擁して正式ローンチしました。プロトコルはCoinbaseが寄贈しましたが、その進化は単一企業ではなくFoundationが統括しています。',
    shotAlt: 'x402 Foundation 公式サイト x402.org のトップページ',
  },
  en: {
    lead: 'x402 is an HTTP payment protocol created by Coinbase, now an open standard neutrally stewarded by the x402 Foundation under the Linux Foundation. The x402 Foundation was first started by Coinbase, Cloudflare and Stripe, and formally launched on July 14, 2026 under the Linux Foundation with 40 organizations. Coinbase donated the protocol, but its evolution is governed by the Foundation rather than any single company.',
    shotAlt: 'Top page of x402.org, the x402 Foundation’s official site',
  },
} satisfies Record<'ja' | 'en', { lead: string; shotAlt: string }>

const LINKS = [
  { label: 'x402.org', href: 'https://x402.org/' },
  { label: 'GitHub (Apache 2.0)', href: 'https://github.com/x402-foundation/x402' },
]

export function Foundation() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <section
      id="foundation"
      className="relative z-10 max-w-6xl mx-auto px-6 py-14 md:py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionEyebrow label="Foundation" tag="Open standard" heading />
      </motion.div>

      {/* Same proportions as the Update lead: screenshot left, text right */}
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-10 lg:items-center">
        <motion.a
          href="https://x402.org/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="group block overflow-hidden rounded-xl border border-fg/10 bg-white"
        >
          <img
            src="/foundation/x402-org.jpg"
            alt={t.shotAlt}
            width={1600}
            height={874}
            loading="lazy"
            className="block w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </motion.a>

        <div>
          <p className="text-fg/60 text-sm md:text-base leading-[1.8]">{t.lead}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-fg/70 px-4 py-2 rounded-full border border-fg/15 hover:bg-fg/5 transition-colors"
              >
                {link.label}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
