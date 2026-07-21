import { motion } from 'motion/react'
import { Pill } from '../primitives'

export function Contact() {
  return (
    <section id="contact" className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="liquid-glass relative overflow-hidden rounded-3xl px-8 py-16 md:py-24 text-center"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: 0.3,
            background:
              'radial-gradient(600px circle at 50% 0%, rgba(232,195,56,0.18), transparent 70%)',
          }}
        />
        <div className="relative">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.15]">
            Human → AI から AI ↔ AI へ——
            <br />
            新しいビジネス機会を、一緒に。
          </h2>
          <p className="mt-6 text-white/60 max-w-md mx-auto text-sm leading-[1.7]">
            この移行とともに、新しいビジネス機会を一緒に探求しませんか。お気軽にご連絡ください。
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Pill label="hello@x402jp.com" href="mailto:hello@x402jp.com" gold />
            <Pill label="x402 Directory" href="https://x402-directory.vercel.app/" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
