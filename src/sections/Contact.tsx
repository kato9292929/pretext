import { motion } from 'motion/react'
import { CONTACT_EMAIL, Pill } from '../primitives'
import { useLang } from '../i18n'

const COPY = {
  ja: {
    body: 'エージェント決済エコシステムの分析、実装・検証のご相談、事業連携やデータ提供のお問い合わせは、お気軽にご連絡ください。',
  },
  en: {
    body: 'For analysis of the agent-payments ecosystem, implementation and verification inquiries, partnerships, or data access, feel free to reach out.',
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
          <p className="text-fg/60 max-w-lg mx-auto text-sm leading-[1.7]">{t.body}</p>
          <div className="mt-8 flex justify-center">
            <Pill label={CONTACT_EMAIL} href={`mailto:${CONTACT_EMAIL}`} gold />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
