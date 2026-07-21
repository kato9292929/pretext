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
            // Grayscale keeps only the flowing shape/motion; the gradient below paints the color.
            filter: 'grayscale(1) brightness(1.08) contrast(1.18) blur(14px)',
            transform: 'scale(1.1)',
          }}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
        />
        {/* Paint the reference palette onto the moving ribbon (warm-led, gold center, blue minority) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, #C85AA8 0%, #E8632E 20%, #F2A63C 35%, #F4D24A 50%, #7FC96B 64%, #34B9C2 80%, #3B82E6 100%)',
            mixBlendMode: 'color',
            opacity: 0.95,
          }}
        />
        {/* Gentle gold sheen to keep gold prominent and luminous */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1100px circle at 55% 45%, rgba(253, 246, 208, 0.22), transparent 62%)',
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
