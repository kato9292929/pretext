import type { CSSProperties, ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'

/* Rich, lustrous brand gold — deep antique → warm gold → bright highlight → gold → antique */
export const GOLD_GRADIENT =
  'linear-gradient(120deg, #8A6D10 0%, #C99A24 20%, #F3DE8E 42%, #FDF6D0 52%, #E8C338 66%, #B8901A 88%, #8A6D10 100%)'

/* ── AppleLogo ───────────────────────────────────────────────── */
export function AppleLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" fill="currentColor" className={className} aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  )
}

/* ── LogoMark ────────────────────────────────────────────────── */
export function LogoMark({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="#fff" className={className} aria-hidden="true">
      <path d="M 0 128 C 70.692 128 128 185.308 128 256 L 64 256 C 64 220.654 35.346 192 0 192 Z M 256 192 C 220.654 192 192 220.654 192 256 L 128 256 C 128 185.308 185.308 128 256 128 Z M 128 0 C 128 70.692 70.692 128 0 128 L 0 64 C 35.346 64 64 35.346 64 0 Z M 192 0 C 192 35.346 220.654 64 256 64 L 256 128 C 185.308 128 128 70.692 128 0 Z" />
    </svg>
  )
}

/* ── Pill (link-capable CTA) ─────────────────────────────────── */
export function Pill({
  label,
  href = '#',
  gold = false,
  full = false,
}: {
  label: string
  href?: string
  gold?: boolean
  full?: boolean
}) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group inline-flex items-center justify-center gap-2 rounded-full font-medium text-sm px-5 py-3 transition-all active:scale-[0.98] ${
        gold
          ? 'liquid-glass text-white hover:brightness-125'
          : 'bg-white text-black hover:bg-white/90'
      } ${full ? 'w-full' : ''}`}
    >
      {label}
      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-[1px]" />
    </a>
  )
}

/* ── SectionEyebrow ──────────────────────────────────────────── */
export function SectionEyebrow({
  label,
  tag,
  heading = false,
}: {
  label: string
  tag?: string
  heading?: boolean
}) {
  const tagStyle = {
    color: '#E8C338',
    borderColor: 'rgba(232, 195, 56, 0.45)',
    backgroundColor: 'rgba(232, 195, 56, 0.08)',
  }
  if (heading) {
    return (
      <div className="inline-flex items-center gap-3">
        <span className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
          {label}
        </span>
        {tag && (
          <span
            className="text-xs md:text-sm px-2.5 py-1 rounded-full border"
            style={tagStyle}
          >
            {tag}
          </span>
        )}
      </div>
    )
  }
  return (
    <div className="inline-flex items-center gap-2 text-sm text-white/70">
      <span>{label}</span>
      {tag && (
        <span className="px-2 py-0.5 rounded-full border text-xs" style={tagStyle}>
          {tag}
        </span>
      )}
    </div>
  )
}

/* ── Shared shiny-gradient style ─────────────────────────────── */
export const gradientStyle: CSSProperties = {
  backgroundImage:
    'linear-gradient(to right, #6B5310 0%, #A67C10 12.5%, #FDF6D0 32.5%, #E8C338 50%, #A67C10 67.5%, #6B5310 87.5%, #6B5310 100%)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  WebkitTextFillColor: 'transparent',
  filter: 'url(#c3-noise)',
}

/* ── Wordmark (x402 white + Inc. gold gradient) ──────────────── */
export function Wordmark({ className = 'text-xl' }: { className?: string }) {
  return (
    <span
      className={`font-bold tracking-tight ${className}`}
      style={{ fontFamily: 'Outfit, Inter, sans-serif' }}
    >
      <span style={{ color: '#fff' }}>x402</span>
      <span
        style={{
          backgroundImage: GOLD_GRADIENT,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {' '}
        Inc.
      </span>
    </span>
  )
}

/* ── Shared navigation ───────────────────────────────────────── */
export const NAV_LINKS = [
  { label: { ja: 'x402とは', en: 'About' }, href: '/about.html' },
  { label: { ja: 'プロダクト', en: 'Products' }, href: '/products.html' },
  { label: { ja: '考察・調査', en: 'Research' }, href: '/research.html' },
]

export const CONTACT_EMAIL = 'hello@x402jp.com'

/* ── PageHero (sub-page header) ──────────────────────────────── */
export function PageHero({
  eyebrow,
  tag,
  title,
  intro,
}: {
  eyebrow: string
  tag?: string
  title: string
  intro?: ReactNode
}) {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 pt-14 md:pt-24 pb-6">
      <SectionEyebrow label={eyebrow} tag={tag} />
      <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.02]">
        {title}
      </h1>
      {intro && (
        <p className="mt-6 text-white/60 max-w-2xl text-base leading-[1.7]">{intro}</p>
      )}
    </section>
  )
}

/* helper wrapper so children typing stays tidy */
export type WithChildren = { children?: ReactNode }
