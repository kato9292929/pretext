import { motion } from 'motion/react'
import { SectionEyebrow } from '../primitives'

const CHIPS = ['Auto-categorize', 'Snooze for later', 'Silent newsletters', 'One-tap unsubscribe']

const SUBCARDS = [
  {
    title: 'Priority',
    count: 4,
    color: '#ffffff',
    items: ['Sophia Chen — Q3 review', 'David Lim — contract signoff'],
  },
  {
    title: 'Follow-up',
    count: 7,
    color: '#e5e5e5',
    items: ['Marcus — design review', 'Figma — comment thread'],
  },
  {
    title: 'Updates',
    count: 18,
    color: '#a3a3a3',
    items: ['Vercel — deploy ready', 'GitHub — PR #482 merged'],
  },
  {
    title: 'Archived',
    count: 13,
    color: '#525252',
    items: ['Stripe payout · Newsletter · Receipts'],
  },
]

export function FeatureTriage() {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionEyebrow label="Triage" tag="AI-native" />
          <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02]">
            Clear your inbox
            <br />
            in a single pass.
          </h2>
          <p className="mt-6 text-white/60 text-base leading-[1.6] max-w-md">
            Aura reads every message, understands intent, and routes the noise away from the signal.
            Focus on what moves your day forward — the rest handles itself.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {CHIPS.map((chip) => (
              <span
                key={chip}
                className="text-xs text-white/70 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]"
              >
                {chip}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right column */}
        <div className="liquid-glass rounded-2xl p-5">
          <p className="text-xs text-white/50">Today · 42 messages triaged</p>
          <div className="mt-4 grid gap-3">
            {SUBCARDS.map((card) => (
              <div key={card.title} className="liquid-glass rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: card.color }} />
                  <span className="text-sm font-medium text-white">{card.title}</span>
                  <span className="text-xs text-white/40">({card.count})</span>
                </div>
                <div className="mt-2 space-y-1">
                  {card.items.map((item) => (
                    <p key={item} className="text-xs text-white/50">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
