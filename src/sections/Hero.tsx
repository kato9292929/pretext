import { motion } from 'motion/react'
import { Pill, gradientStyle } from '../primitives'

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
        System of IntelligenceがAPIレイヤーでデータを消費する時代の決済オーケストレーション。Human
        → AI から AI ↔ AI への移行とともに、x402 Inc.はそのインフラを構築していきます。
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 flex flex-col items-center gap-3"
      >
        <Pill label="x402 Directory" href="https://x402-directory.vercel.app/" gold />
        <span className="text-xs text-white/40">エコシステム全体を見る</span>
      </motion.div>
    </section>
  )
}
