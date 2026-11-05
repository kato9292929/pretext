import type { ReactNode } from 'react'
import { LanguageProvider, ThemeProvider } from './i18n'
import { Navbar } from './sections/Navbar'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { NumberRain } from './sections/NumberRain'

export function Layout({
  children,
  preFooter,
}: {
  children: ReactNode
  /** Optional section rendered directly above the footer (e.g. home Services). */
  preFooter?: ReactNode
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-bg text-fg">
      {/* Root SVG noise filter (subtle grain, multiply blend) for the shiny headline */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="c3-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={2}
            stitchTiles="stitch"
          />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
        </filter>
      </svg>

      {/* Light-theme background: colourful digits streaming down (Matrix-style
          rain). Shown only in the light theme. */}
      <NumberRain />

      {/* Fixed fullscreen background video, recolored into a multicolor aurora ribbon (dark theme) */}
      <div className="bg-media fixed inset-0 z-0 pointer-events-none" style={{ isolation: 'isolate' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none"
          style={{
            // Grayscale keeps only the flowing shape; heavy blur + low contrast make it soft & airy.
            filter: 'grayscale(1) brightness(1.3) contrast(0.95) blur(22px)',
            transform: 'scale(1.12)',
          }}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
        />
        {/* Holographic palette from the Update visuals (periwinkle, lavender, pink, peach, butter, mint, cyan) painted onto the ribbon */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, #8FB0F7 0%, #B48CF5 14%, #F27CD6 30%, #FFB9A3 44%, #F4E08A 56%, #8EF0B4 70%, #7EE2F2 84%, #9DBDF5 100%)',
            // multiply tints only the bright ribbon; the dark background stays dark
            mixBlendMode: 'multiply',
            opacity: 1,
          }}
        />
        {/* Airy white sheen for a frosted, see-through glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1200px circle at 60% 42%, rgba(255, 255, 255, 0.14), transparent 60%)',
            mixBlendMode: 'soft-light',
            opacity: 0.9,
          }}
        />
      </div>

      <ThemeProvider>
        <LanguageProvider>
          <Navbar />
          {children}
          <Contact />
          {preFooter}
          <Footer />
        </LanguageProvider>
      </ThemeProvider>
    </div>
  )
}
