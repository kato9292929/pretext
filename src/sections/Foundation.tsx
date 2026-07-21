import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionEyebrow } from '../primitives'

const MEMBERS = [
  'Visa',
  'Mastercard',
  'American Express',
  'Coinbase',
  'Stripe',
  'Google',
  'Amazon Web Services',
  'Microsoft',
  'Cloudflare',
  'Circle',
  'Base',
  'Solana Foundation',
  'Polygon Labs',
  'Shopify',
  'Ant International',
  'Adyen',
  'Fiserv',
  'KakaoPay',
  'PPRO',
  'Sierra',
  'Thirdweb',
  'Merit Systems',
  'Ampersend.ai',
]

const LINKS = [
  { label: 'x402.org', href: 'https://www.x402.org/' },
  { label: 'GitHub (Apache 2.0)', href: 'https://github.com/x402-foundation/x402' },
]

export function Foundation() {
  return (
    <section
      id="foundation"
      className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28 border-t border-white/10"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl"
      >
        <SectionEyebrow label="Foundation" tag="Open standard" heading />
        <p className="mt-6 text-white/60 text-base leading-[1.7]">
          x402は、Coinbaseが開発したHTTPペイメント・プロトコルで、現在はLinux
          Foundation傘下のx402
          Foundationが中立的に管理するオープンスタンダードです。x402
          Foundationは当初Coinbase・Cloudflare・Stripeの3社が立ち上げ、2026年7月14日にLinux
          Foundationの下で40組織を擁して正式ローンチしました。プロトコルはCoinbaseが寄贈しましたが、その進化は単一企業ではなくFoundationが統括しています。
        </p>
      </motion.div>

      <div className="mt-12">
        <p className="text-xs uppercase tracking-widest text-white/40">創設メンバー</p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
          {MEMBERS.map((member, i) => (
            <motion.span
              key={member}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
              className="text-sm font-medium text-white/50 hover:text-white transition-colors"
            >
              {member}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="mt-12 liquid-glass rounded-2xl p-6 max-w-3xl">
        <p className="text-xs uppercase tracking-widest text-white/40">Momentum</p>
        <p className="mt-3 text-sm text-white/70 leading-[1.8]">
          7月14日の x402 Foundation 発足、Stripe が A to A で MPP経由の受け入れと x402
          の両方を担ぐ構造、そして AWS・Cloudflare の x402対応——CloudFront/Cloudflare
          を使う全事業者の参入で、市場は「x402を知っている開発者」から一気に広がりつつあります。
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-white/70 px-4 py-2 rounded-full border border-white/15 hover:bg-white/5 transition-colors"
          >
            {link.label}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        ))}
      </div>
    </section>
  )
}
