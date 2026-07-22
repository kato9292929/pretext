import { motion } from 'motion/react'
import { CONTACT_EMAIL, Pill, gradientStyle } from '../primitives'
import { useLang } from '../i18n'

/* pretext-style reveal: each word blurs & fades in, streaming left→right */
function PretextText({
  text,
  className,
  startDelay = 0,
  stagger = 0.03,
}: {
  text: string
  className?: string
  startDelay?: number
  stagger?: number
}) {
  const words = text.split(' ')
  return (
    <p className={className}>
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          initial={{ opacity: 0, filter: 'blur(8px)', y: 6 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.5, delay: startDelay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
          style={{ marginRight: '0.28em' }}
        >
          {w}
        </motion.span>
      ))}
    </p>
  )
}

const MANIFESTO =
  "The agentic economy doesn't sleep, doesn't explain itself, and doesn't wait for us to catch up. Millions of autonomous transactions clear every day with no one watching. We watch. We measure the demand no human placed, map the markets no human entered, and hand the machines the one thing they can't generate themselves: ground truth. When historians write how the agent economy actually worked, they'll be reading our numbers."

export function Hero() {
  const { lang } = useLang()
  return (
    <section className="relative z-10 min-h-[80vh] pb-16 pt-24 md:pt-28 text-center flex flex-col items-center justify-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl md:text-7xl font-semibold tracking-tight leading-[0.9]"
      >
        <span className="block text-fg">The agentic economy</span>
        <span className="block animate-shiny" style={gradientStyle}>
          runs on x402.
        </span>
      </motion.h1>

      <PretextText
        text={MANIFESTO}
        startDelay={0.9}
        className="mt-10 max-w-2xl text-sm md:text-base text-fg/70 leading-[1.9]"
      />
      <PretextText
        text="x402. On the record."
        startDelay={2.6}
        stagger={0.08}
        className="mt-4 text-base md:text-lg font-semibold text-fg"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 flex items-center gap-3"
      >
        <Pill label={lang === 'ja' ? 'お問い合わせ' : 'Contact'} href={`mailto:${CONTACT_EMAIL}`} gold />
      </motion.div>
    </section>
  )
}
