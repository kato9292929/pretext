import { motion } from 'motion/react'
import { CONTACT_EMAIL, Pill } from '../primitives'
import { useLang } from '../i18n'

const COPY = {
  ja: {
    heading: 'AIエージェント × 決済市場の発展に向けて',
    body: '委任付き自律決済から per-call 自律決済まで——実装・検証のご相談、事業連携やデータ提供のお問い合わせは、お気軽にご連絡ください。',
  },
  en: {
    heading: 'Toward the growth of the AI-agent × payments market',
    body: 'From delegated autonomous payments to per-call autonomous payments — for implementation, validation, partnerships, or data access, feel free to reach out.',
  },
}

export function Contact() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <section id="contact" className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="liquid-glass relative overflow-hidden rounded-3xl px-8 py-16 md:py-20 text-center"
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
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.2]">
            {t.heading}
          </h2>
          <p className="mt-6 text-white/60 max-w-lg mx-auto text-sm leading-[1.7]">{t.body}</p>
          <div className="mt-8 flex justify-center">
            <Pill label={CONTACT_EMAIL} href={`mailto:${CONTACT_EMAIL}`} gold />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
