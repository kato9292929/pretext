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
          style={{
            // Strong blur smooths the grainy texture into a silky gold flow.
            filter: 'saturate(1.7) brightness(1.05) contrast(1.05) blur(16px)',
            transform: 'scale(1.1)',
          }}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
        />
        {/* Gold stays the dominant cast across the whole frame */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(120deg, #6B5310 0%, #C99A24 26%, #FDF6D0 50%, #E8C338 68%, #A67C10 86%, #6B5310 100%)',
            mixBlendMode: 'overlay',
            opacity: 0.4,
          }}
        />
        {/* Aurora color accents — warm-led (orange / gold / pink); blue kept subtle */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(950px circle at 22% 90%, rgba(255, 140, 45, 0.36), transparent 55%), radial-gradient(820px circle at 2% 60%, rgba(232, 95, 180, 0.30), transparent 55%), radial-gradient(760px circle at 58% 82%, rgba(245, 205, 80, 0.26), transparent 55%), radial-gradient(1000px circle at 99% 34%, rgba(48, 120, 235, 0.18), transparent 52%), radial-gradient(880px circle at 92% 99%, rgba(30, 195, 200, 0.18), transparent 55%)',
            mixBlendMode: 'screen',
            opacity: 0.9,
          }}
        />
        {/* Soft specular sheen for a luminous gold highlight */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1200px circle at 72% 28%, rgba(253, 246, 208, 0.28), transparent 62%)',
            mixBlendMode: 'soft-light',
            opacity: 0.85,
          }}
        />
      </div>

      <Navbar />
      {children}
      <Contact />
    </div>
  )
}
