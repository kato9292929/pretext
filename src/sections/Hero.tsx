import { motion } from 'motion/react'
import { CONTACT_EMAIL, Pill, gradientStyle } from '../primitives'

export function Hero() {
  return (
    <section className="relative z-10 pt-16 md:pt-28 pb-20 text-center flex flex-col items-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl md:text-7xl font-semibold tracking-tight leading-[0.9]"
      >
        <span className="block text-white">The agentic economy</span>
        <span className="block animate-shiny" style={gradientStyle}>
          runs on x402.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 text-white/60 max-w-xl text-base leading-[1.7]"
      >
        委任付き自律決済から per-call 自律決済へ——Human → AI から AI ↔ AI
        への移行とともに、x402 Inc.はそのインフラを構築していきます。
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 flex flex-col sm:flex-row items-center gap-3"
      >
        <Pill label="お問い合わせ" href={`mailto:${CONTACT_EMAIL}`} gold />
        <Pill label="プロダクトを見る" href="/products.html" />
      </motion.div>
    </section>
  )
}
