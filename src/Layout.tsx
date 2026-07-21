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

      {/* Fixed fullscreen background video, recolored into a multicolor aurora ribbon */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ isolation: 'isolate' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none"
          style={{
            // Grayscale keeps only the flowing shape; heavy blur + low contrast make it soft & airy.
            filter: 'grayscale(1) brightness(1.04) contrast(0.9) blur(22px)',
            transform: 'scale(1.12)',
          }}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
        />
        {/* Soft, translucent pastel iridescence painted onto the ribbon */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, #E7A6C8 0%, #F3C08A 20%, #F7E39C 38%, #B9E6B0 56%, #A9DCEC 74%, #B7B4EC 100%)',
            mixBlendMode: 'color',
            opacity: 0.85,
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

      <Navbar />
      {children}
      <Contact />
    </div>
  )
}
