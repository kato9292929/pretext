import { motion } from 'motion/react'
import { CONTACT_EMAIL, Pill, gradientStyle } from '../primitives'
import { useLang } from '../i18n'

const COPY = {
  ja: {
    lead: 'x402 Inc.は、エージェント経済とエージェント決済のエコシステムを、AIとの詳細なリサーチで分析するリサーチ会社です。x402対応のエンドポイント、独自データ、それを叩くエージェントを自ら作り、観測と検証の instruments として使います。HTTP 402を共通の決済レールに、Base/Solana上のper-callオンチェーン決済とERC-8004のエージェントidentityを土台にしています。',
    contact: 'お問い合わせ',
  },
  en: {
    lead: 'x402 Inc. is a research company that analyzes the agent economy and the agent-payments ecosystem through detailed research with AI. We build x402-compatible endpoints, proprietary data, and the agents that call them, and use them as instruments for observation and verification. With HTTP 402 as the shared payment rail, we build on per-call on-chain settlement across Base/Solana and ERC-8004 agent identity.',
    contact: 'Contact',
  },
}

export function Hero() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <section className="relative z-10 min-h-[80vh] pb-16 text-center flex flex-col items-center justify-center px-6">
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
        className="mt-8 text-white/60 max-w-2xl text-sm md:text-base leading-[1.8]"
      >
        {t.lead}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 flex items-center gap-3"
      >
        <Pill label={t.contact} href={`mailto:${CONTACT_EMAIL}`} gold />
      </motion.div>
    </section>
  )
}
