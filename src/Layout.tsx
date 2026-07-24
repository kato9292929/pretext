import type { ReactNode } from 'react'
import { LanguageProvider, ThemeProvider } from './i18n'
import { Navbar } from './sections/Navbar'
import { Contact } from './sections/Contact'

export function Layout({ children }: { children: ReactNode }) {
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

      {/* Light-theme background: an undulating ribbon that mirrors the dark
          video's flowing curve — gold on the two sides, pastel in the middle. */}
      <div className="bg-light pointer-events-none">
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            {/* Runs down the ribbon (top → bottom): gold at both ends, pastel
                through the middle, echoing the dark overlay's palette. */}
            <linearGradient id="ribbonGrad" x1="0.35" y1="0" x2="0.65" y2="1">
              <stop offset="0" stopColor="#b98d28" />
              <stop offset="0.13" stopColor="#e4cd80" />
              <stop offset="0.3" stopColor="#8fd0a8" />
              <stop offset="0.46" stopColor="#3ac6c6" />
              <stop offset="0.6" stopColor="#57b8ea" />
              <stop offset="0.74" stopColor="#9aa9ec" />
              <stop offset="0.88" stopColor="#e4cd80" />
              <stop offset="1" stopColor="#b98d28" />
            </linearGradient>
          </defs>
          <path
            className="ribbon-path"
            fill="none"
            stroke="url(#ribbonGrad)"
            strokeWidth="340"
            strokeLinecap="round"
            d="M 820,-180 C 600,180 1140,380 940,640 C 820,800 900,1000 1040,1180"
          >
            <animate
              attributeName="d"
              dur="18s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
              values="M 820,-180 C 600,180 1140,380 940,640 C 820,800 900,1000 1040,1180;M 900,-180 C 1160,220 620,420 980,680 C 1120,840 880,1020 960,1180;M 820,-180 C 600,180 1140,380 940,640 C 820,800 900,1000 1040,1180"
            />
          </path>
        </svg>
      </div>

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

      <ThemeProvider>
        <LanguageProvider>
          <Navbar />
          {children}
          <Contact />
        </LanguageProvider>
      </ThemeProvider>
    </div>
  )
}
