import { useState } from 'react'
import { Check } from 'lucide-react'

type Plan = {
  tier: string
  monthly: string
  yearly?: string
  desc: string
  features: string[]
  pro?: boolean
}

const PLANS: Plan[] = [
  {
    tier: 'Free',
    monthly: 'Free',
    desc: 'For creators taking their first steps with Forma.',
    features: [
      'Up to 3 projects in the cloud',
      'Image export up to 1080p',
      'Basic editing tools',
      'Free templates and icons',
      'Access via web and mobile app',
    ],
  },
  {
    tier: 'Standard',
    monthly: '$9,99/m',
    yearly: '$99,99/y',
    desc: 'For freelancers and small teams who need more freedom and flexibility.',
    features: [
      'Up to 50 projects in the cloud',
      'Export up to 4K',
      'Advanced editing toolkit',
      'Team collaboration (up to 5 members)',
      'Access to premium template library',
    ],
  },
  {
    tier: 'Pro',
    monthly: '$19,99/m',
    yearly: '$199,99/y',
    pro: true,
    desc: 'For studios, agencies, and professional creators working with brands.',
    features: [
      'Unlimited projects',
      'Export up to 8K + animations',
      'AI-powered content generation tools',
      'Unlimited team members',
      'Brand customization',
    ],
  },
]

export function Pricing() {
  const [yearly, setYearly] = useState(false)

  return (
    <section className="c3-pricing-section relative z-10">
      {/* Pricing noise filter */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="c3-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.5"
            numOctaves={2}
            stitchTiles="stitch"
          />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.075" />
          </feComponentTransfer>
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
        </filter>
      </svg>

      {/* Watermark */}
      <div className="c3-watermark-container">
        <div className="c3-watermark-main">
          <span className="c3-watermark-line-1">Your email.</span>
          <span className="c3-watermark-line-2">Revitalized</span>
        </div>
      </div>

      {/* Cards */}
      <div className="c3-grid">
        {PLANS.map((plan) => (
          <div key={plan.tier} className={`c3-card ${plan.pro ? 'c3-card-pro' : ''}`}>
            <div className="c3-tier-small">{plan.tier}</div>
            <div className="c3-tier-large">
              {yearly && plan.yearly ? plan.yearly : plan.monthly}
            </div>
            <p className="c3-desc">{plan.desc}</p>
            <ul className="c3-list">
              {plan.features.map((feature) => (
                <li key={feature}>
                  <span className="c3-check">
                    <Check width={16} height={16} stroke="#fff" strokeWidth={2.5} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="c3-btn">Choose Plan</button>
          </div>
        ))}
      </div>

      {/* Toggle */}
      <div className="c3-toggle-wrap">
        <span className="text-sm text-white/70">Yearly</span>
        <button
          className={`c3-toggle ${yearly ? 'active' : ''}`}
          onClick={() => setYearly((v) => !v)}
          aria-pressed={yearly}
          aria-label="Toggle yearly billing"
        >
          <span className="c3-toggle-knob" />
        </button>
      </div>
    </section>
  )
}
