import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useLang } from '../i18n'

/* Home: "Market issues" — the per-call (E4) payment flow in 8 steps and where
   each reported problem happens, above the x402 Endpoint lead-in. The diagram
   is our own report (public/market-issues/), shown as an image with the PDF. */

const IMG = '/market-issues/x402-market-issues.webp'
const PDF = '/market-issues/x402-market-issues.pdf'

const COPY = {
  ja: {
    eyebrow: 'Market issues',
    title: '仕様が守るのは署名の再送防止まで。決済しても届かない問題は外側の4層にある',
    lead: 'x402 v2 仕様の Security Considerations が定めるのは、再送の防止（nonce・有効期限・署名の検証）と認証との組み合わせだけ。予算管理やセッションは仕様の対象外で、受領より先に決済が終わり、返金・再取得の定めもない。1回の支払いを8つの段階に分け、課題が起きる段階と層に置いた。',
    alt: 'x402 per-call 調達の市場課題：1回の支払いの8段階と、buyer・seller・facilitator・チェーン・SDK の各層で起きている課題の図',
    open: '図を拡大して見る',
    pdf: 'PDF',
  },
  en: {
    eyebrow: 'Market issues',
    title: 'The spec only protects against signature replay. Paid-but-not-delivered problems live in the four layers outside it',
    lead: 'The Security Considerations of the x402 v2 spec cover only replay protection (nonce, expiry, signature checks) and how it combines with authentication. Budgets and sessions are out of scope; payment settles before delivery, and there is no rule for refunds or re-fetching. We split one payment into 8 steps and placed each issue at the step and layer where it happens.',
    alt: 'Market issues of x402 per-call procurement: the 8 steps of one payment and the issues at the buyer, seller, facilitator, chain and SDK layers',
    open: 'Open the full-size diagram',
    pdf: 'PDF',
  },
}

export function MarketIssues() {
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
      <p className="text-xs tracking-widest text-gold">{t.eyebrow}</p>
      <h3 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight text-fg leading-[1.4]">{t.title}</h3>
      <p className="mt-3 max-w-3xl text-sm text-fg/60 leading-[1.8]">{t.lead}</p>

      <a href={IMG} target="_blank" rel="noopener noreferrer" className="group mt-6 block overflow-hidden rounded-2xl border border-fg/10 bg-white">
        <img src={IMG} alt={t.alt} width={2400} height={2342} loading="lazy" className="w-full transition-transform duration-500 group-hover:scale-[1.01]" />
      </a>
      <div className="mt-3 flex flex-wrap gap-4 text-sm">
        <a href={IMG} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-fg/75 hover:text-gold transition-colors">
          {t.open}
          <ArrowUpRight className="h-4 w-4" />
        </a>
        <a href={PDF} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-fg/75 hover:text-gold transition-colors">
          {t.pdf}
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </motion.div>
  )
}
