import type { ReactNode } from 'react'
import { Navbar } from './sections/Navbar'
import { Contact } from './sections/Contact'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0c0c0c] text-white">
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

      {/* Fixed fullscreen background video — tinted to brand gold */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none"
          style={{ filter: 'sepia(1) saturate(2.1) hue-rotate(5deg) brightness(1.04) contrast(1.1)' }}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
        />
        {/* Rich, lustrous satin-gold wash */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(120deg, #6B5310 0%, #C99A24 26%, #FDF6D0 50%, #E8C338 68%, #A67C10 86%, #6B5310 100%)',
            mixBlendMode: 'overlay',
            opacity: 0.5,
          }}
        />
        {/* Soft specular sheen for a luminous gold highlight */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1200px circle at 72% 28%, rgba(253, 246, 208, 0.3), transparent 62%)',
            mixBlendMode: 'soft-light',
            opacity: 0.85,
          }}
        />
      </div>

      {/* Vertical guide lines at the 36rem container edges */}
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 -translate-x-[calc(50%+36rem)] w-px bg-white/10 z-[5]" />
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 translate-x-[calc(-50%+36rem)] w-px bg-white/10 z-[5]" />

      <Navbar />
      {children}
      <Contact />
    </div>
  )
}
